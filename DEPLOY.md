# Déploiement de French Verb Lab

## Vue d'ensemble

French Verb Lab est une application purement statique (HTML + CSS + JavaScript ES modules). Elle ne nécessite aucun serveur d'application, aucune compilation, et aucune dépendance à l'exécution. Le déploiement consiste à copier les fichiers source dans un bucket S3 configuré pour héberger un site web statique, éventuellement fronté par CloudFront.

## Fichiers à déployer

```
index.html
css/style.css
js/data.js
js/engine.js
js/storage.js
js/ui.js
```

**Ne pas déployer** : `node_modules/`, `tests/`, `package.json`, `package-lock.json`, `DEPLOY.md`.

## Taille du bundle de production

| Fichier | Taille |
|---|---|
| index.html | 3 284 octets |
| css/style.css | 10 875 octets |
| js/data.js | 11 116 octets |
| js/engine.js | 2 654 octets |
| js/storage.js | 1 219 octets |
| js/ui.js | 6 964 octets |
| **Total** | **~35 KB** |

Temps de chargement estimé sur Fast 3G (~1,5 Mbps) : **< 0,2 seconde**. Aucun risque de dépasser le seuil de 5 secondes d'interactivité.

---

## Déploiement sur S3 (hébergement de site web statique)

### 1. Créer un bucket S3

```bash
aws s3 mb s3://VOTRE-NOM-DE-BUCKET --region eu-west-1
```

Remplacez `VOTRE-NOM-DE-BUCKET` par un nom unique globalement et `eu-west-1` par la région de votre choix.

### 2. Activer l'hébergement de site web statique

```bash
aws s3 website s3://VOTRE-NOM-DE-BUCKET \
    --index-document index.html \
    --error-document index.html
```

### 3. Configurer la politique de bucket (accès public en lecture)

Créez un fichier `bucket-policy.json` (ne le committez pas dans le dépôt) :

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::VOTRE-NOM-DE-BUCKET/*"
    }
  ]
}
```

Appliquez la politique :

```bash
aws s3api put-bucket-policy \
    --bucket VOTRE-NOM-DE-BUCKET \
    --policy file://bucket-policy.json
```

Supprimez `bucket-policy.json` après usage ou ne le versionnez pas.

### 4. Uploader les fichiers

```bash
aws s3 sync . s3://VOTRE-NOM-DE-BUCKET \
    --exclude "node_modules/*" \
    --exclude "tests/*" \
    --exclude "package*.json" \
    --exclude "DEPLOY.md" \
    --exclude ".kiro/*" \
    --delete
```

### 5. Vérifier le déploiement

L'URL du site sera de la forme :

```
http://VOTRE-NOM-DE-BUCKET.s3-website-eu-west-1.amazonaws.com
```

---

## Distribution CloudFront (optionnel mais recommandé)

CloudFront apporte HTTPS, la mise en cache aux points de présence (PoP), et une URL personnalisable.

### 1. Créer une distribution CloudFront

```bash
aws cloudfront create-distribution \
    --origin-domain-name VOTRE-NOM-DE-BUCKET.s3-website-eu-west-1.amazonaws.com \
    --default-root-object index.html
```

> **Note** : pour un bucket S3 en mode hébergement de site web statique, utilisez l'endpoint HTTP du site web comme origin (pas l'endpoint S3 REST), afin que `index.html` soit servi par défaut à la racine.

### 2. Invalidation du cache après mise à jour

```bash
aws cloudfront create-invalidation \
    --distribution-id VOTRE-ID-DISTRIBUTION \
    --paths "/*"
```

---

## Vérification de sécurité

Avant tout déploiement, confirmez qu'aucun des fichiers source ne contient :

- Clés d'accès AWS (`AKIA...`)
- Secrets AWS (`aws_secret_access_key`)
- Clés d'API tierces
- Mots de passe
- Tokens

Commande de vérification rapide :

```bash
grep -r -i "AKIA\|aws_secret\|api_key\|password\|secret\|token" \
    index.html css/ js/ --include="*.html" --include="*.css" --include="*.js"
```

Résultat attendu : **aucune correspondance**.

---

## Ouverture locale (sans serveur)

L'application fonctionne correctement ouverte directement depuis le système de fichiers via `file:///` dans un navigateur moderne, sans aucun serveur HTTP. Toutes les dépendances sont relatives et chargées via ES modules natifs.

> **Attention** : certains navigateurs bloquent les imports de modules ES depuis `file:///` par politique CORS. Dans ce cas, utilisez un serveur local léger pour le développement : `npx serve .` ou l'extension Live Server de VS Code. Pour la production, S3/CloudFront n'a pas cette limitation.

---

## Checklist de déploiement

- [ ] `npm test` passe (0 échecs)
- [ ] Aucun secret dans les fichiers source (voir vérification ci-dessus)
- [ ] `index.html` défini comme document racine par défaut sur S3
- [ ] Politique de bucket configurée pour l'accès public en lecture
- [ ] Tous les fichiers statiques (`index.html`, `css/`, `js/`) uploadés
- [ ] URL de déploiement vérifiée dans un navigateur (aucune erreur console)
- [ ] Interactivité < 5 secondes vérifiée (35 KB total, négligeable sur toute connexion)
