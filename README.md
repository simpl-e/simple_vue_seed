
### Estándar
Este estándar está basado 'vue-cli webpack' para dejar abierta cualquier posibilidad de abstracción del front-end
Para escalar con herramientas webpack
https://webpack.js.org/guides/getting-started/


### Estructura

**src**:
- **libs**: Librerías incluuidas manualmente
- **modules**: Componentes Vue
  - **components**: Componentes para elementos repetitivos
  - **views**: Vistas funcionalmente independientes
- **router**: Manejador de rutas (https://github.com/vuejs-templates/webpack/issues/560)
