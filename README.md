# Natures Afiliates - Landing Page

Una landing page moderna y responsive para el programa de afiliados de Natures, con soporte multi-país, detección geográfica automática, y componentes interactivos.

## 🎯 Características Principales

✨ **Geolocalización Automática**

- Detección automática del país del usuario
- Cache de sesión para optimizar rendimiento
- Selector manual de país con interfaz intuitiva
- Fallback a Cloudflare Trace si falla la API

📱 **Diseño Responsive**

- Mobile-first design con Vite + React
- Animaciones suaves con reveal effects
- Optimizado para todos los dispositivos

🎬 **Video Popup Inteligente**

- Soporte para YouTube shorts (9:16) y videos normales (16:9)
- Detector automático de tipo de video
- Indicador de carga con spinner
- Sandbox seguro con permisos optimizados

✍️ **Efecto Typewriter**

- Texto animado que escribe y borra automáticamente
- 3 quotes rotativos en la sección Feature
- Cursor parpadeante profesional

🎨 **Componentes Personalizables**

- Logo SVG (NSP) con color dinámico
- Paleta de colores variable por tema (`--a`, `--b`, `--c`)
- Dropdown de países con estilos optimizados

🌍 **Multi-País**

- Mock data para MX, CO, GT, EC, PA, SV, HN, DO, LATAM
- Contenido dinámico por país
- URLs de catálogo personalizables

## 🛠️ Stack Tecnológico

- **Frontend:** React 18 + Vite
- **State Management:** Redux Toolkit
- **Estilos:** CSS3 custom properties
- **Iconografía:** SVG vector
- **Geolocación:** IP API + Cloudflare Trace
- **Deploy:** Vercel

## 📁 Estructura del Proyecto

```
src/
├── App.jsx                 # Componente principal
├── main.jsx               # Entry point
├── pages/
│   └── Landing.jsx        # Página principal con todas las secciones
├── sections/
│   ├── Hero.jsx           # Sección hero
│   ├── Supplements.jsx    # Grid de suplementos
│   ├── Catalog.jsx        # Catálogo PDF
│   ├── FeatureSection.jsx # Sección video + typewriter
│   ├── Testimonials.jsx   # Carousel de testimonios
│   ├── Join.jsx           # Formulario de afiliación
│   └── Footer.jsx         # Footer
├── ui/
│   ├── Navbar.jsx         # Header con selector de país
│   ├── NSPLogo.jsx        # Logo SVG personalizable
│   ├── VideoPopup.jsx     # Modal de video
│   └── LoadingScreen.jsx  # Loading inicial
├── lib/
│   ├── api.js             # Cliente HTTP (Axios)
│   ├── themes.js          # Temas por país
│   ├── useReveal.js       # Hook para animation reveal
│   ├── useImagePreload.js # Precarga de imágenes
│   ├── useActiveContent.js# Hook para contenido dinámico
│   ├── useTypewriter.js   # Hook typewriter effect
│   └── uiSlice.js         # Redux slice UI
├── store/
│   ├── geoSlice.js        # Redux slice geolocalización
│   ├── contentSlice.js    # Redux slice contenido
│   └── store.js           # Configuración Redux
├── styles/
│   ├── VideoPopup.css
│   ├── FeatureSection.css
│   ├── App.css
│   └── styles.css         # Estilos principales
└── assets/
    └── nsp-logo-traced.svg # Logo SVG optimizado

public/
├── mock/
│   └── landing/
│       ├── MX.json        # Contenido México
│       ├── CO.json        # Contenido Colombia
│       ├── GT.json        # Contenido Guatemala
│       └── LATAM.json     # Contenido por defecto
└── [otros assets públicos]
```

## 🚀 Instalación y Setup

### Requisitos Previos

- Node.js 16+
- npm o yarn

### Pasos

1. **Clonar repositorio**

```bash
git clone https://github.com/tu-usuario/natures-afiliates.git
cd natures-afiliates
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Variables de entorno**
   Crear `.env.local` en la raíz:

```env
VITE_API_BASE_URL=https://tu-backend.com
VITE_GEO_APAPI_URL=https://ipapi.co/json
```

4. **Ejecutar en desarrollo**

```bash
npm run dev
```

La aplicación estará en `http://localhost:5173`

## 📦 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo con HMR
npm run build    # Construye para producción
npm run preview  # Previsualiza build localmente
npm run lint     # Ejecuta ESLint
```

## 🌍 Variables de Entorno

| Variable             | Descripción            | Ejemplo                   |
| -------------------- | ---------------------- | ------------------------- |
| `VITE_API_BASE_URL`  | URL base del backend   | `https://api.example.com` |
| `VITE_GEO_APAPI_URL` | API de geolocalización | `https://ipapi.co/json`   |

⚠️ **Importante:** Nunca pushear `.env.local` a git. Solo agregar a `.gitignore`.

## 🔄 Flujo de Geolocalización

```
1. App monta → fetchGeo() ejecuta
2. Lee cache de sesión
3. Si existe cache → muestra país cacheado
4. Si no existe → llama a IPAPI
5. Si IPAPI falla → fallback a Cloudflare Trace
6. Si todo falla → muestra LATAM (default)
7. Cachea resultado por 6 horas
```

## 🎬 Secciones de la Landing Page

### Hero

- Imagen principal
- Título y subtítulo dinámicos
- 2 CTAs (Afíliate, Descargar catálogo)

### Supplements

- Grid responsive de 4 productos
- Imagen, nombre, descripción
- Contenido variable por país

### Catalog

- Panel con imagen decorativa
- Link descargable a PDF
- Material de marketing profesional

### Feature Section ⭐

- Imagen con popup de video (1/3 ancho)
- Efecto typewriter con 3 quotes (2/3 ancho)
- Botón "Afíliate" que scrollea a formulario
- Soporte para YouTube (normal y shorts)

### Testimonials

- Carousel deslizable
- Opiniones dinámicas por país
- Navegación con botones

### Join (Afiliación)

- Formulario completo
- Selector de país
- Email de contacto
- Descarga de catálogo

### Footer

- Certificaciones (GMP, ISO 22000)
- Links a redes sociales
- Copyright dinámico

## 🎨 Temas por País

Cada país tiene su propia paleta de colores en `src/lib/themes.js`:

```javascript
MX: { a: '#2dd4bf', b: '#38bdf8', c: '#22c55e' }  // Teal, Sky, Green
CO: { a: '#ff6b6b', b: '#ffd93d', c: '#6bcf7f' }  // Red, Yellow, Green
GT: { a: '#667eea', b: '#764ba2', c: '#f093fb' }  // Purple shades
```

Se aplican automáticamente al cambiar de país.

## 📱 Breakpoints Responsivos

```css
Mobile:    < 480px
Tablet:    480px - 768px
Desktop:   768px - 1200px
Wide:      > 1200px
```

## 🔒 Seguridad

- ✅ Variables sensibles en `.env.local` (nunca en git)
- ✅ Sandbox seguro en iframes de YouTube
- ✅ Referrer Policy configurado
- ✅ CORS handling mejorado
- ✅ No se cachean datos sensibles

## 📈 Performance

- 🚀 Lazy loading de imágenes
- 🚀 Code splitting con Vite
- 🚀 Cache de geolocalización de 6 horas
- 🚀 Animaciones con CSS (no JS)
- 🚀 Preload de imágenes críticas

## 🚀 Deployment

### En Vercel (Recomendado)

1. Conectar repositorio GitHub a Vercel
2. Seleccionar rama `develop` para staging
3. Agregar variables de entorno en Settings → Environment Variables
4. Vercel desplegará automáticamente en cada push

```
# URL de staging (develop branch)
https://natures-afiliates-develop.vercel.app

# URL de production (main branch)
https://natures-afiliates.vercel.app
```

### En otros hosts

```bash
npm run build
# Subir carpeta 'dist' a tu hosting
```

## 🐛 Troubleshooting

### Video no se reproduce

- Verificar que `VITE_GEO_APAPI_URL` esté configurado
- Revisar console del navegador por errores CORS
- Los warnings de YouTube Trace son normales

### Geolocalización no funciona

- Comprobar conexión a internet
- IPAPI puede tener límite de requests sin API key
- El fallback a Cloudflare debería funcionar siempre

### Imágenes no cargan

- Revisar URLs en archivos JSON de mock
- Comprobar que los servidores de imágenes sean accesibles

## 🤝 Contribución

1. Crear rama feature: `git checkout -b feature/nueva-feature`
2. Commit: `git commit -m "Agregar nueva feature"`
3. Push: `git push origin feature/nueva-feature`
4. PR a rama `develop`

## 📄 Licencia

Propietario - Natures Afiliates © 2026

## 👨‍💻 Autor

Ricardo V - Consultores Landing Page

---

**Última actualización:** 27 de febrero de 2026  
**Versión:** 1.0.0
