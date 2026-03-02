# Estructura de Estilos SCSS

Este proyecto ha sido refactorizado de un único archivo CSS monolítico (716 líneas) a una arquitectura modular SCSS organizada por componentes.

## 📁 Estructura de Archivos

```
src/
├── styles/
│   ├── _variables.scss    # Variables de tema (colores, breakpoints)
│   ├── _base.scss          # Reset CSS y estilos base (html, body)
│   ├── _utilities.scss     # Clases de utilidad (.wrap, .grid, .btn, .card, etc.)
│   └── globals.scss        # Punto de entrada global (importa base y utilities)
│
├── ui/
│   ├── Navbar.jsx
│   ├── Navbar.scss         # Estilos específicos del Navbar
│   ├── LoadingScreen.jsx
│   └── LoadingScreen.scss  # Estilos del loading screen
│
└── sections/
    ├── Hero.jsx
    ├── Hero.scss           # Estilos de la sección Hero
    ├── Supplements.jsx
    ├── Supplements.scss    # Estilos del grid de suplementos y flip cards
    ├── Catalog.jsx         # (usa utilities compartidas)
    ├── Testimonials.jsx
    ├── Testimonials.scss   # Estilos del carousel y dots
    ├── Join.jsx
    ├── Join.scss           # Estilos del formulario y Mailchimp overrides
    ├── Footer.jsx
    └── Footer.scss         # Estilos del footer
```

## 🎨 Archivos Principales

### `_variables.scss`

Define todas las variables SCSS del tema:

- Colores: `$bg`, `$text`, `$a`, `$b`, `$c`
- Espaciado: `$r` (border-radius)
- Breakpoints: `$breakpoint-tablet`

### `_base.scss`

- CSS custom properties (`:root`)
- Reset y estilos base (`*`, `html`, `body`)
- Layout principal (`main`)

### `_utilities.scss`

- Utilidades de layout: `.wrap`, `.section`, `.grid`, `.split`
- Componentes genéricos: `.btn`, `.card`, `.pill`, `.link`
- Sistema de grid responsivo

### Archivos por Componente

Cada componente React importa su propio archivo SCSS con el patrón:

```jsx
import "./ComponentName.scss";
```

## 🚀 Beneficios de la Nueva Estructura

✅ **Colocación:** Estilos junto a sus componentes  
✅ **Mantenibilidad:** Archivos pequeños y enfocados  
✅ **Reutilización:** Variables SCSS compartidas con `@use`  
✅ **Nesting:** Aprovecha las características de SCSS  
✅ **Escalabilidad:** Fácil agregar nuevos componentes  
✅ **Legibilidad:** Estructura clara y predecible

## 📝 Cómo Agregar un Nuevo Componente

1. Crear el componente React: `src/sections/NewSection.jsx`
2. Crear su archivo SCSS: `src/sections/NewSection.scss`
3. Importar variables si las necesitas:
   ```scss
   @use "../styles/variables" as *;
   ```
4. Importar el SCSS en el componente:
   ```jsx
   import "./NewSection.scss";
   ```

## 🔧 Configuración

- **Sass:** Instalado como devDependency (`npm install -D sass`)
- **Vite:** Procesa automáticamente archivos `.scss` sin configuración adicional
- **Import Global:** `main.jsx` importa `styles/globals.scss` para estilos base

## 📦 Archivos Eliminados

- ❌ `src/styles.css` (716 líneas) → Refactorizado a SCSS modular
