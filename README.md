# Prolog API Engine - Motor de Inferencia Legislativo

Este proyecto es una API REST construida con Node.js y Express que integra un motor de inferencia lógica utilizando Tau Prolog. Su objetivo es evaluar condiciones de contratos y determinar penalizaciones de forma automatizada.

## Requisitos Previos

Node.js (Versión 14 o superior)

npm (Incluido con Node.js)

VS Code (Recomendado)

Thunder Client o Postman (Para realizar pruebas)

## Pasos para la Instalación y Configuración

Como este proyecto ya cuenta con los archivos necesarios, solo debes seguir estos pasos para levantarlo:

1. Clonar o descargar el repositorio:

Asegúrate de estar dentro de la carpeta raíz del proyecto en tu terminal.

2. Preparación de la Terminal (Solo Windows):

Si tienes errores de permisos al ejecutar comandos en PowerShell, corre esto:

    PowerShell
    Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser

3. Instalar Dependencias:
Ejecuta el siguiente comando para descargar automáticamente las librerías necesarias (express y tau-prolog) definidas en el package.json:

    Bash
    npm install

## Ejecución del Servidor

Para encender el motor, corre el siguiente comando en la terminal:

    Bash
    node src/server.js

Si todo es correcto, verás el mensaje: 🚀 Motor de Inferencia listo en <http://localhost:3000>.

## Pruebas (Cómo usar la API)

La API no responde a peticiones de navegador (GET). Se debe usar Thunder Client o Postman para enviar consultas lógicas.

    Endpoint de Consulta
    URL: http://localhost:3000/query

Método: POST

Body (JSON):

    JSON
    {
    "query": "penalizacion_aplicable(X)."
    }
Respuesta Esperada
Si el motor encuentra una coincidencia lógica, responderá:

    JSON
    {
    "status": "success",
    "query": "penalizacion_aplicable(X).",
    "results": [
        "X = c102"
        ]
    }

## Cómo detener el servidor

Para apagar el motor, presiona Ctrl + C en la terminal o usa el icono del bote de basura en VS Code.

## Notas Adicionales

Archivos Base: La lógica de negocio reside en src/base_conocimiento.pl y el servidor en src/server.js.

Git: La carpeta node_modules/ está excluida del repositorio mediante .gitignore para mantener el proyecto ligero.
