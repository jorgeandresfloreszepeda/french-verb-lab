# Requirements Document

## Introduction

**French Verb Lab** es una aplicación web estática para practicar la conjugación de verbos en francés. Permite al estudiante seleccionar un verbo y un tiempo verbal, recibir preguntas de conjugación de forma aleatoria, introducir su respuesta, obtener retroalimentación inmediata y consultar su puntuación acumulada. No requiere backend ni autenticación; el progreso se persiste en `localStorage`. La aplicación se puede desplegar directamente en S3 + CloudFront o cualquier servidor de archivos estáticos.

---

## Glossary

- **App**: La aplicación web French Verb Lab en su conjunto.
- **Motor** (`engine.js`): Módulo JavaScript que contiene la lógica de selección de ejercicios y validación de respuestas, sin dependencias del DOM.
- **Datos** (`data.js`): Módulo que exporta el catálogo de verbos y sus conjugaciones.
- **Almacenamiento** (`storage.js`): Módulo que encapsula todas las operaciones de lectura y escritura en `localStorage`.
- **UI** (`ui.js`): Módulo que gestiona el renderizado del DOM y los eventos de usuario.
- **Ejercicio**: Un ítem de práctica compuesto por un verbo, un tiempo verbal y un pronombre sujeto, para el que el estudiante debe introducir la forma conjugada correcta.
- **Sesión**: El ciclo de uso continuo de la aplicación desde que se carga la página hasta que se recarga o cierra.
- **Puntuación**: Contador numérico de respuestas correctas e intentos totales persistido en `localStorage`.
- **Tiempo verbal**: Uno de los cuatro tiempos disponibles: _présent_, _passé composé_, _imparfait_, _futur simple_.
- **Verbo**: Uno de los doce verbos del catálogo inicial: _être, avoir, aller, faire, parler, finir, prendre, venir, pouvoir, vouloir, devoir, savoir_.
- **Pronombre sujeto**: Uno de los seis pronombres personales: _je, tu, il/elle, nous, vous, ils/elles_.
- **Respuesta correcta**: La forma conjugada esperada para un verbo, tiempo verbal y pronombre dados, según el catálogo `data.js`.

---

## Requirements

### Requisito 1: Catálogo de conjugaciones

**Historia de usuario:** Como desarrollador, quiero que los datos de conjugación estén separados de la lógica de interfaz y del motor, para poder actualizar el catálogo sin tocar el resto del código.

#### Criterios de aceptación

1. THE **Datos** SHALL exportar las conjugaciones de exactamente 12 verbos del catálogo para exactamente 4 tiempos verbales (présent, passé composé, imparfait, futur simple), identificando cada verbo por su forma infinitiva.
2. THE **Datos** SHALL incluir exactamente 6 formas personales (_je, tu, il/elle, nous, vous, ils/elles_) para cada combinación de verbo y tiempo verbal, sin omisiones ni formas adicionales.
3. THE **Datos** SHALL ser importable por el **Motor** sin cargar ningún módulo de DOM ni de `localStorage`.
4. IF una combinación de verbo y tiempo verbal carece de alguna de las 6 formas personales en el catálogo, THEN THE **Datos** SHALL emitir un error en tiempo de carga que identifique el verbo y el tiempo verbal afectados.

---

### Requisito 2: Selección de ejercicio

**Historia de usuario:** Como estudiante, quiero seleccionar el verbo y el tiempo verbal que quiero practicar, para centrar mi estudio en lo que necesito.

#### Criterios de aceptación

1. THE **UI** SHALL presentar un selector (_dropdown_) con los doce verbos del catálogo y otro selector con los cuatro tiempos verbales, ambos con una opción vacía seleccionada por defecto.
2. WHEN el estudiante selecciona un verbo y un tiempo verbal y confirma el inicio, THE **Motor** SHALL generar un **Ejercicio** eligiendo aleatoriamente uno de los seis pronombres sujeto disponibles para esa combinación, sin repetir un pronombre hasta que los seis hayan aparecido en el ciclo actual.
3. WHEN todos los pronombres de la combinación seleccionada ya han aparecido en la sesión actual, THE **Motor** SHALL reiniciar el ciclo generando una nueva secuencia aleatoria de los seis pronombres de esa combinación, sin que el primer pronombre del nuevo ciclo coincida con el último del ciclo anterior.
4. IF el estudiante confirma el inicio sin haber seleccionado verbo, tiempo verbal, o ambos, THEN THE **UI** SHALL mostrar un mensaje de error indicando los campos requeridos, mantener los selectores en su estado actual y no iniciar el ejercicio.

---

### Requisito 3: Presentación de la pregunta

**Historia de usuario:** Como estudiante, quiero ver claramente cuál es el pronombre y el tiempo verbal que debo conjugar, para saber exactamente qué se me está preguntando.

#### Criterios de aceptación

1. WHEN se genera un **Ejercicio**, THE **UI** SHALL mostrar el verbo en infinitivo, el tiempo verbal y el pronombre sujeto del ejercicio en una zona de enunciado situada por encima del campo de entrada, con cada uno de los tres elementos visualmente distinguibles entre sí.
2. THE **UI** SHALL presentar un campo de texto (`<input type="text">`) con una `<label>` asociada que indique el verbo en infinitivo, el tiempo verbal y el pronombre sujeto del **Ejercicio** activo, con un atributo `aria-label` en francés.
3. THE **UI** SHALL incluir un botón de envío con texto en francés que permita al estudiante confirmar su respuesta.
4. WHEN el campo de texto tiene el foco y el estudiante pulsa la tecla Intro, THE **UI** SHALL enviar la respuesta del mismo modo que si el estudiante hubiera pulsado el botón de envío.
5. IF el campo de texto está vacío cuando el estudiante intenta enviar la respuesta, THEN THE **UI** SHALL mantener el foco en el campo de texto sin procesar el envío.

---

### Requisito 4: Validación de respuesta

**Historia de usuario:** Como estudiante, quiero que la aplicación compare mi respuesta con la forma correcta de manera justa, para no penalizarme por espacios o capitalización irrelevantes.

#### Criterios de aceptación

1. WHEN el estudiante envía una respuesta, THE **Motor** SHALL normalizar la respuesta eliminando espacios iniciales y finales y convirtiendo todos los caracteres a minúsculas antes de realizar la comparación.
2. THE **Motor** SHALL preservar los caracteres acentuados (_é, è, ê, à, û_, etc.) durante la normalización; una respuesta que difiera de la forma correcta únicamente en la presencia o ausencia de un acento requerido SHALL ser tratada como incorrecta.
3. WHEN la respuesta normalizada del estudiante coincide exactamente con la forma correcta normalizada, THE **Motor** SHALL devolver el resultado `correcto`.
4. WHEN la respuesta normalizada del estudiante no coincide con la forma correcta normalizada, THE **Motor** SHALL devolver el resultado `incorrecto` junto con la forma correcta esperada sin modificar.
5. IF la respuesta del estudiante está vacía o contiene únicamente espacios en blanco, THEN THE **Motor** SHALL devolver el resultado `incorrecto` sin realizar la comparación, junto con la forma correcta esperada sin modificar.

---

### Requisito 5: Retroalimentación inmediata

**Historia de usuario:** Como estudiante, quiero recibir retroalimentación inmediata tras enviar mi respuesta, para aprender en el momento si me equivoqué.

#### Criterios de aceptación

1. WHEN el **Motor** devuelve el resultado `correcto`, THE **UI** SHALL mostrar un mensaje de confirmación en francés y actualizar el contador de respuestas correctas en 1 antes de cargar el siguiente ejercicio.
2. WHEN el **Motor** devuelve el resultado `incorrecto`, THE **UI** SHALL mostrar la forma correcta esperada y la respuesta introducida por el estudiante simultáneamente, en elementos visualmente separados dentro del área de retroalimentación.
3. WHEN se muestra retroalimentación de cualquier tipo, THE **UI** SHALL cargar el siguiente ejercicio automáticamente tras 1 500 ms, o de forma inmediata cuando el estudiante active el botón de continuar, lo que ocurra primero.
4. THE **UI** SHALL aplicar un indicador visual diferenciado según el resultado: un icono con `aria-label` en francés que indique éxito o error, y color de fondo o borde con ratio de contraste mínimo de 4,5:1 entre el texto y su fondo inmediato, conforme a WCAG AA.
5. IF el **Motor** devuelve un resultado distinto de `correcto` o `incorrecto`, THEN THE **UI** SHALL mantener el estado actual del ejercicio sin actualizar la puntuación ni avanzar al siguiente ejercicio.

---

### Requisito 6: Puntuación y progreso

**Historia de usuario:** Como estudiante, quiero que la aplicación recuerde mi progreso entre sesiones, para ver mi evolución a lo largo del tiempo.

#### Criterios de aceptación

1. WHILE la sesión de práctica está activa, THE **App** SHALL mostrar un contador en formato "X correctas / Y intentos" visible en todo momento en la interfaz.
2. WHEN el estudiante envía una respuesta, THE **Almacenamiento** SHALL actualizar la puntuación en `localStorage` de forma inmediata.
3. WHEN la aplicación se carga, THE **Almacenamiento** SHALL leer la puntuación almacenada en `localStorage`.
4. WHEN la aplicación se carga, THE **UI** SHALL inicializar los contadores con los valores leídos de `localStorage`.
5. IF no existe ningún dato previo en `localStorage`, THEN THE **Almacenamiento** SHALL devolver una puntuación inicial de 0 correctas y 0 intentos.
6. WHEN el estudiante pulsa el botón de reinicio de puntuación, THE **UI** SHALL mostrar una confirmación explícita antes de realizar cualquier acción.
7. WHEN el estudiante confirma el reinicio, THE **Almacenamiento** SHALL escribir 0 correctas y 0 intentos en `localStorage` y THE **UI** SHALL actualizar los contadores mostrando "0 correctas / 0 intentos".

---

### Requisito 7: Accesibilidad y diseño responsivo

**Historia de usuario:** Como estudiante, quiero usar la aplicación desde cualquier dispositivo y con tecnologías de asistencia, para que sea inclusiva y cómoda.

#### Criterios de aceptación

1. THE **UI** SHALL utilizar exactamente un elemento `<main>` por página y elementos semánticos (`<header>`, `<section>`, `<button>`, `<label>`, `<select>`, etc.) para estructurar el contenido.
2. THE **UI** SHALL asignar un atributo `aria-label` o texto visible en francés a cada control interactivo (`<button>`, `<input>`, `<select>`, `<a>`), sin dejar ningún control sin etiqueta accesible.
3. THE **UI** SHALL presentar un orden de tabulación de arriba a abajo y de izquierda a derecha, y el indicador de foco de cada elemento interactivo SHALL tener un ratio de contraste mínimo de 3:1 respecto a su fondo.
4. THE **UI** SHALL presentar un diseño fluido que sea funcional y legible en pantallas de al menos 320 px de ancho hasta pantallas de escritorio de 1 440 px, sin desbordamiento horizontal ni texto truncado.
5. THE **UI** SHALL mostrar todo el texto orientado al usuario (etiquetas, instrucciones, mensajes de error, retroalimentación) en francés.
6. THE **UI** SHALL garantizar que todos los textos normales tengan un ratio de contraste mínimo de 4,5:1 y los textos grandes un ratio de 3:1, conforme a WCAG 2.1 AA.

---

### Requisito 8: Despliegue estático

**Historia de usuario:** Como operador, quiero desplegar la aplicación como un sitio web estático en AWS, para minimizar los costes de infraestructura y la complejidad operativa.

#### Criterios de aceptación

1. THE **App** SHALL estar compuesta exclusivamente por archivos estáticos (`index.html`, CSS, JavaScript) que puedan abrirse y desplegarse directamente en un navegador o servidor de archivos sin requerir ningún proceso de compilación ni transpilación.
2. THE **App** SHALL poder desplegarse en un bucket de S3 con _static website hosting_ habilitado; WHEN CloudFront recibe una solicitud a una ruta no encontrada, THE **App** SHALL redirigir al `index.html` mediante la configuración de error de CloudFront.
3. WHEN la aplicación se carga desde el origen S3/CloudFront, THE **App** SHALL completar la carga sin errores en la consola del navegador, con todos los recursos estáticos devolviendo HTTP 200 y la página siendo interactiva en menos de 5 segundos en una conexión de 10 Mbps.
4. IF el código fuente de la aplicación contiene credenciales de AWS, claves de API o secretos, THEN THE **App** SHALL ser rechazada en revisión de código y no desplegada.

---

### Requisito 9: Testabilidad del motor

**Historia de usuario:** Como desarrollador, quiero poder probar la lógica de conjugación y validación sin un DOM de navegador, para automatizar las pruebas con un runner estándar.

#### Criterios de aceptación

1. THE **Motor** SHALL exportar únicamente funciones puras, sin referencias a `document`, `window`, ni a ningún objeto del DOM del navegador.
2. THE **Motor** SHALL poder importarse en un entorno Node.js 18 o superior sin lanzar errores de importación ni errores de referencia a objetos del DOM.
3. WHEN se invoca la función de validación del **Motor** con una respuesta correcta en texto plano, con espaciado y capitalización arbitrarios, THE **Motor** SHALL devolver un objeto con el campo `resultado` igual a `"correcto"` para el mismo conjunto de entradas.
4. WHEN se invoca la función de validación del **Motor** con una respuesta incorrecta, THE **Motor** SHALL devolver un objeto con el campo `resultado` igual a `"incorrecto"` y el campo `esperado` igual a la forma conjugada canónica, conservando tildes y caracteres especiales del francés, para el mismo conjunto de entradas.
5. IF se invoca la función de validación del **Motor** con una entrada que contenga únicamente espacios en blanco, THEN THE **Motor** SHALL devolver un objeto con el campo `resultado` igual a `"incorrecto"` y el campo `esperado` igual a la forma conjugada canónica.
