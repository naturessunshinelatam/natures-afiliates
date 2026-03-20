# 🏗️ AGENT.md - Guía de Desarrollo Profesional

**Natures Afiliates Landing Page - Multi-País**

**Última actualización:** Marzo 3, 2026  
**Versión:** 1.0  
**Propósito:** Mantener consistencia, escalabilidad y profesionalismo en todo desarrollo futuro

---

## 📋 Tabla de Contenidos

1. [Solicitudes Pendientes a Cumplir](#solicitudes-pendientes)
2. [Principios SOLID](#principios-solid)
3. [Clean Code](#clean-code)
4. [Testing - Estrategia](#testing--estrategia)
5. [Estructura y Arquitectura](#estructura-y-arquitectura)
6. [Git & Workflow](#git--workflow)
7. [Performance & Optimización](#performance--optimizacion)
8. [Seguridad](#seguridad)
9. [Checklist Pre-Deploy](#checklist-pre-deploy)

---

## 🎯 Solicitudes Pendientes a Cumplir

### **FASE 1: Backend & Database (Próximas 3-4 semanas)**

- [ ] Decidir entre Strapi vs Node.js custom
- [ ] Setup Strapi o Node.js + PostgreSQL
- [ ] Crear Collections/Modelos:
  - [ ] Countries (GT, MX, CO, SV, HN, PA, DO, EC, LATAM)
  - [ ] LandingContent (hero, supplements, testimonials, etc. por país)
  - [ ] Testimonials (tabla principal con status: pending/approved/rejected)
  - [ ] Contacts (formulario Join + mensajes)
  - [ ] AdminUsers (autenticación para panel)
- [ ] Migrar datos from `/public/mock/landing/*.json` → PostgreSQL
- [ ] Crear endpoints API:
  - [ ] `GET /api/landing/:country` (reemplaza mocks)
  - [ ] `POST /api/testimonials` (crear nuevo)
  - [ ] `GET /api/testimonials/:country` (top 7 aprobados)
  - [ ] `POST /api/contacts` (guardar formularios Join)
  - [ ] `POST /api/admin/login` (JWT authentication)
- [ ] Dashboard Admin (React o Strapi nativo):
  - [ ] Ver/Editar contenido por país
  - [ ] Aprobar/rechazar testimonios
  - [ ] Ver historial de contactos

### **FASE 2: Frontend Integration (Semana 4)**

- [ ] Actualizar `contentSlice.js` para usar API en lugar de mocks
  - OLD: `GET /mock/landing/GT.json`
  - NEW: `GET http://localhost:3001/api/landing/GT`
- [ ] Cambiar `TestimonialForm.jsx` para POST a `/api/testimonials`
- [ ] Actualizar `JoinForm.jsx` para guardar contacto en `/api/contacts` además de Mailchimp
- [ ] Testing de endpoints en Postman/Insomnia

### **FASE 3: Testing (Semana 5)**

- [ ] Suite de tests unitarios (Jest)
- [ ] Suite de tests de integración (API)
- [ ] Coverage mínimo: 80% crítico
- [ ] CI/CD pipeline (GitHub Actions)

### **FASE 4: Deployment (Semana 6)**

- [ ] Hosting Backend (Railway, Render, Heroku)
- [ ] Hosting Frontend (Vercel, Netlify)
- [ ] HTTPS, DNS, CDN
- [ ] Monitoreo (Sentry, LogRocket)

---

## 🏛️ Principios SOLID

### **S - Single Responsibility Principle**

Cada componente/función debe tener UNA razón para cambiar.

**❌ MALO:**

```javascript
// Demasiadas responsabilidades
const TestimonialCard = ({ testimonial }) => {
  const [likes, setLikes] = useState(0);
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({});

  const submitForm = async () => {
    // Validar
    // Hacer fetch
    // Guardar en Redux
    // Mostrar error
    // Animar
  };

  return <div>...</div>;
};
```

**✅ BUENO:**

```javascript
// TestimonialCard - Solo renderizar
const TestimonialCard = ({ testimonial }) => {
  return <div className="testimonial-card">...</div>;
};

// useTestimonialSubmit - Lógica de submit separada
const useTestimonialSubmit = () => {
  const dispatch = useDispatch();
  const submitTestimonial = async (data) => {
    // Validar
    // Fetch
    // Dispatch
  };
  return { submitTestimonial };
};

// En componente que lo usa:
const TestimonialForm = () => {
  const { submitTestimonial } = useTestimonialSubmit();
  // ...usar submitTestimonial
};
```

### **O - Open/Closed Principle**

Abierto para extensión, cerrado para modificación.

**❌ MALO:**

```javascript
// Hero.jsx - Hardcoded para 1 país
const Hero = () => {
  if (country === "MX") return <HeroMX />;
  if (country === "GT") return <HeroGT />;
  if (country === "CO") return <HeroCO />;
  // 9 condicionales = CAMBIO CONSTANTE
};
```

**✅ BUENO:**

```javascript
// Hero.jsx - Consume contenido dinámico
const Hero = () => {
  const content = useActiveContent(); // Redux
  return (
    <section className="hero">
      <h1>{content.hero.title}</h1>
      <p>{content.hero.subtitle}</p>
    </section>
  );
};
// Agregar país nuevo = Solo agregar JSON, sin tocar código React
```

### **L - Liskov Substitution Principle**

Las referencias a clase base deben poder usar subclases sin romper.

**✅ CORRECTO:**

```javascript
// Interface: Cualquier componente Section debe cumplir esto
const Section = ({ content, country }) => {
  return <div>{/* render based on content */}</div>;
};

// Implementaciones:
<Hero content={content} country={country} /> // Works
<Supplements content={content} country={country} /> // Works
<Testimonials content={content} country={country} /> // Works
```

### **I - Interface Segregation Principle**

No obligar a depender de métodos que no usan.

**❌ MALO:**

```javascript
// TestimonialForm recibe TODO el contenido
<TestimonialForm
  testimonials={}
  hero={}
  supplements={}
  catalog={}
  footer={}
/>
// Usa solo testimonials, desperdicia props
```

**✅ BUENO:**

```javascript
// TestimonialForm recibe solo lo que necesita
<TestimonialForm onSubmit={handleSubmit} initialRating={0} />
```

### **D - Dependency Inversion Principle**

Depender de abstracciones, no de implementaciones concretas.

**✅ CORRECTO:**

```javascript
// useActiveContent es abstracción
const Hero = () => {
  const content = useActiveContent(); // No importa si es mock o API
  return <h1>{content.hero.title}</h1>;
};

// En el slice, puedes cambiar:
// OLD: fetch('./mock/landing/GT.json')
// NEW: fetch('http://api.com/landing/GT')
// Hero.jsx NO SE ENTERA, sigue funcionando igual
```

---

## 📝 Clean Code - Reglas Aplicadas

### **Naming Conventions**

```javascript
// ✅ Nombres claros y descriptivos
const useActiveContent = () => {}; // hook
const StarRating = () => {}; // componente
const TeststimonialForm = () => {}; // componente form
const fetchLandingContent = () => {}; // async thunk
const validateEmail = (email) => {}; // función pura
const FILE_KEY = "geo_cache_v1"; // constante

// ❌ Nombres genéricos
const getData = () => {};
const doStuff = () => {};
const x = 5;
const fn = () => {};
```

### **Funciones Pequeñas y Foco Único**

```javascript
// ✅ Una función = Una tarea
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone) => {
  return /^[\d\s+\-()]+$/.test(phone);
};

const validateTestimonial = (data) => {
  return {
    isNameValid: data.name.trim().length > 0,
    isEmailValid: validateEmail(data.email),
    isTextValid: data.text.trim().length > 20,
    isRatingValid: data.rating > 0,
  };
};

// ❌ Función que hace TODO
const validate = (data, type) => {
  if (type === "email") {
    /* 20 líneas */
  } else if (type === "phone") {
    /* 30 líneas */
  } else if (type === "testimonial") {
    /* 50 líneas */
  }
};
```

### **Evitar Efectos Secundarios**

```javascript
// ✅ Función pura
const calculateDiscount = (price, percentage) => {
  return price * (1 - percentage / 100);
};

// ❌ Efecto secundario
let discountedPrice = 0;
const applyDiscount = (price, percentage) => {
  discountedPrice = price * (1 - percentage / 100); // MODIFICA GLOBAL
  console.log(discountedPrice);
  sendAnalytics(discountedPrice);
};
```

### **DRY (Don't Repeat Yourself)**

```javascript
// ❌ REPETIDO (en cada país)
const MXForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return <form>...</form>;
};

const GTForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return <form>...</form>;
};

// ✅ REUTILIZABLE
const useFormState = (initialData = {}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return { formData, errors, handleChange, setErrors };
};

// Usar en cualquier formulario
const TestimonialForm = () => {
  const { formData, handleChange } = useFormState({ name: "", email: "" });
  return <form onChange={handleChange}>...</form>;
};
```

### **Comments = "Por qué", no "Qué"**

```javascript
// ❌ Comenta lo obvio
const user = getUserById(id); // Obtener usuario por ID
const email = user.email; // Obtener email del usuario

// ✅ Comenta la LÓGICA
// Validar que el país sea de LATAM permitido, sino fallback a LATAM
const clamp = (c) => (allowed.includes(norm(c)) ? norm(c) : "LATAM");

// Cachear por 6 horas para reducir llamadas a API de geolocalización
const TTL_MS = 1000 * 60 * 60 * 6;
```

---

## 🧪 Testing - Estrategia

### **1. Testing Unitario (Jest)**

**Regla:** Todo hook/función pura debe tener test.

```bash
# Setup (si no está hecho)
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

**Archivo: `src/lib/useActiveContent.test.js`**

```javascript
import { useActiveContent } from "./useActiveContent";
import { renderHook, selectFromState } from "@testing-library/react";

describe("useActiveContent", () => {
  it("should return content when country is ready", () => {
    // Arrange
    const mockState = {
      geo: { countryCode: "MX" },
      content: {
        byCountry: {
          MX: { status: "ready", data: { hero: { title: "Test" } } },
        },
      },
    };

    // Act
    const { result } = renderHook(() => useActiveContent());

    // Assert
    expect(result.current).toEqual({ hero: { title: "Test" } });
  });

  it("should fallback to LATAM when country content not ready", () => {
    // Arrange
    const mockState = {
      geo: { countryCode: "PE" },
      content: {
        byCountry: {
          PE: { status: "loading" },
          LATAM: { status: "ready", data: { hero: { title: "Fallback" } } },
        },
      },
    };

    // Act
    const { result } = renderHook(() => useActiveContent());

    // Assert
    expect(result.current).toEqual({ hero: { title: "Fallback" } });
  });

  it("should return null when no content available", () => {
    // Arrange
    const mockState = {
      geo: { countryCode: "MX" },
      content: { byCountry: { MX: { status: "loading" } } },
    };

    // Act
    const { result } = renderHook(() => useActiveContent());

    // Assert
    expect(result.current).toBeNull();
  });
});
```

**Archivo: `src/lib/validators.test.js`**

```javascript
import { validateEmail, validatePhone } from "./validators";

describe("Email Validator", () => {
  it("should validate correct emails", () => {
    expect(validateEmail("user@example.com")).toBe(true);
    expect(validateEmail("admin+tag@domain.co")).toBe(true);
  });

  it("should reject invalid emails", () => {
    expect(validateEmail("invalid")).toBe(false);
    expect(validateEmail("user@")).toBe(false);
    expect(validateEmail("")).toBe(false);
  });
});

describe("Phone Validator", () => {
  it("should validate phone numbers with different formats", () => {
    expect(validatePhone("+1234567890")).toBe(true);
    expect(validatePhone("(123) 456-7890")).toBe(true);
    expect(validatePhone("123 456 7890")).toBe(true);
  });

  it("should reject invalid phones", () => {
    expect(validatePhone("abc")).toBe(false);
    expect(validatePhone("")).toBe(false);
  });
});
```

### **2. Testing de Integración (API)**

**Archivo: `tests/integration/api.test.js`**

```javascript
// Requiere backend corriendo
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001/api" });

describe("Landing Content API", () => {
  it("should fetch GT landing content", async () => {
    const { data } = await API.get("/landing/GT");

    expect(data).toHaveProperty("country", "GT");
    expect(data).toHaveProperty("hero.title");
    expect(data).toHaveProperty("testimonials");
    expect(Array.isArray(data.testimonials)).toBe(true);
  });

  it("should fallback to LATAM for unknown country", async () => {
    const { data } = await API.get("/landing/INVALID");

    expect(data).toHaveProperty("country", "LATAM");
  });

  it("should return 404 if both country and LATAM content not found", async () => {
    try {
      await API.get("/landing/NONEXISTENT");
      fail("Should have thrown");
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});

describe("Testimonials API", () => {
  it("should create new testimonial", async () => {
    const newTestimonial = {
      name: "Test User",
      role: "Tester",
      email: "test@example.com",
      text: "This is a test testimonial",
      rating: 5,
      country: "GT",
    };

    const { data } = await API.post("/testimonials", newTestimonial);

    expect(data).toHaveProperty("id");
    expect(data.status).toBe("pending");
    expect(data.name).toBe("Test User");
  });

  it("should validate required fields", async () => {
    try {
      await API.post("/testimonials", { name: "Test" }); // Falta email, text, rating
      fail("Should have thrown");
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  it("should return top 7 approved testimonials for country", async () => {
    const { data } = await API.get("/testimonials/GT?status=approved");

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeLessThanOrEqual(7);
    expect(data.every((t) => t.status === "approved")).toBe(true);
  });
});
```

### **3. Testing de Componentes (React Testing Library)**

**Archivo: `src/sections/TestimonialForm.test.jsx`**

```javascript
import { render, screen, fireEvent } from "@testing-library/react";
import { TestimonialForm } from "./TestimonialForm";

describe("TestimonialForm", () => {
  it("should render form fields", () => {
    render(<TestimonialForm />);

    expect(screen.getByPlaceholderText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/enviar/i)).toBeInTheDocument();
  });

  it("should show validation errors on submit with empty fields", async () => {
    render(<TestimonialForm />);

    const submitBtn = screen.getByText(/enviar/i);
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/nombre requerido/i)).toBeInTheDocument();
    expect(await screen.findByText(/email requerido/i)).toBeInTheDocument();
  });

  it("should submit form with valid data", async () => {
    const mockSubmit = jest.fn();
    render(<TestimonialForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByPlaceholderText(/nombre/i), {
      target: { value: "Juan" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "juan@example.com" },
    });

    fireEvent.click(screen.getByText(/enviar/i));

    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Juan",
        email: "juan@example.com",
      }),
    );
  });
});
```

### **4. Coverage Target**

```bash
# Ejecutar con coverage
npm test -- --coverage

# Target mínimo:
# ├─ Statements: 80%
# ├─ Branches: 75%
# ├─ Functions: 80%
# └─ Lines: 80%
```

### **5. CI/CD - Ejecutar tests en cada push**

**Archivo: `.github/workflows/test.yml`**

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm test -- --coverage
      - run: npm run lint
```

---

## 🏗️ Estructura y Arquitectura

### **Jerarquía de Carpetas (Respetada)**

```
src/
├─ pages/
│  └─ Landing.jsx                     # Página principal
├─ sections/
│  ├─ Hero.jsx                        # Component + Hook
│  ├─ Supplements.jsx
│  ├─ Testimonials.jsx
│  ├─ TestimonialForm.jsx            # Formulario separado
│  ├─ Join.jsx
│  ├─ JoinForm.jsx                   # Formulario separado
│  ├─ Catalog.jsx
│  ├─ FeatureSection.jsx
│  └─ Footer.jsx
├─ ui/
│  ├─ Navbar.jsx                      # Componentes reutilizables
│  ├─ LoadingScreen.jsx
│  └─ StarRating.jsx
├─ lib/
│  ├─ api.js                          # Axios config
│  ├─ themes.js                       # Color palettes
│  ├─ validators.js                   # Funciones puras de validación
│  ├─ useActiveContent.js             # Custom hook
│  ├─ useImagePreload.js              # Custom hook
│  ├─ useReveal.js                    # Custom hook
│  └─ useAlternativeContent.js        # (si aplica) Custom hook
├─ store/
│  ├─ store.js                        # Redux store config
│  ├─ geoSlice.js                     # Estado de geolocalización
│  ├─ contentSlice.js                 # Estado de contenido
│  └─ uiSlice.js                      # Estado de UI
├─ styles/
│  ├─ globals.scss                    # Estilos globales
│  ├─ variables.scss                  # Variables SCSS
│  └─ components/
│     ├─ Hero.scss
│     ├─ Supplements.scss
│     └─ ... (1:1 con componentes)
├─ App.jsx
├─ App.css
├─ main.jsx
└─ index.css

tests/
├─ unit/
│  ├─ lib.validators.test.js
│  └─ hooks.useActiveContent.test.js
├─ integration/
│  ├─ api.landing.test.js
│  └─ api.testimonials.test.js
└─ components/
   ├─ TestimonialForm.test.jsx
   └─ Hero.test.jsx

public/
├─ mock/
│  └─ landing/
│     ├─ GT.json
│     ├─ MX.json
│     └─ ... (9 países)
└─ index.html

config/
├─ tailwind.config.js                 # (si se agrega)
├─ postcss.config.js                  # (si se agrega)
└─ jest.config.js                     # Test config
```

### **Regla: No cruzar fronteras de carpetas**

```javascript
// ❌ MALO
import { fetchGeo } from "../../../store/geoSlice";
import { useReveal } from "../../../lib/useReveal";

// ✅ BUENO - Imports relativos cortos
import { useActiveContent } from "../../lib/useActiveContent";
import { StarRating } from "../../ui/StarRating";
```

---

## 🔄 Git & Workflow

### **Commit Message Format (Commitizen)**

```bash
# Setup
npm install --save-dev commitizen cz-conventional-changelog

# Hacer commits interactivos:
npm run commit
# en lugar de: git commit -m "..."

# Format esperado:
# feat(auth): add JWT validation
# fix(hero): fix layout shift on mobile
# docs(readme): update setup instructions
# test(testimonials): add integration tests
# refactor(contentSlice): simplify error handling
# style(footer): update spacing constants
# perf(loading): lazy load images below fold
```

### **Commit Scope (Qué módulo afecta)**

```
Types:
- feat     (nueva feature)
- fix      (bug fix)
- docs     (cambios documentación)
- style    (formato, espacios, etc)
- refactor (reescribir sin cambiar función)
- perf     (optimización)
- test     (agregar/modificar tests)
- chore    (deps, tooling, config)

Scopes:
- auth     (autenticación)
- geo      (geolocalización)
- content  (contenido pages/sections)
- ui       (componentes reutilizables)
- store    (Redux state)
- api      (integraciones HTTP)
- styles   (SCSS/CSS)
- tests    (testing)
```

**Ejemplo buen commit:**

```bash
git commit -m "feat(testimonials): add approval workflow for admin

- Add status field (pending/approved/rejected) to testimonial model
- Create admin endpoint to approve testimonials
- Add pending testimonials display in admin panel
- Update top 7 logic to only show approved testimonials

Fixes #123"
```

### **Branch Naming**

```
feature/testimonial-approval
feature/strapi-integration
fix/hero-layout-mobile
docs/api-integration-guide
refactor/reduce-bundle-size
```

### **Pre-commit Hooks (Prevenir malos commits)**

```bash
npm install --save-dev husky lint-staged

# Setup
npx husky install

# Create hook
npx husky add .husky/pre-commit "npm run lint-staged"

# .lintstagedrc.json
{
  "*.{js,jsx}": ["eslint --fix", "jest --bail --findRelatedTests"],
  "*.scss": ["stylelint --fix"],
  "*.md": ["prettier --write"]
}
```

---

## ⚡ Performance & Optimización

### **Bundle Size (Target: < 250KB gzipped)**

```bash
# Analizar
npm install --save-dev webpack-bundle-analyzer
npm run build -- --analyze

# Checklist:
- [ ] React.lazy() para code-splitting de pages
- [ ] useMemo() para cálculos pesados
- [ ] useCallback() para passes a children
- [ ] Lazy load imágenes (IntersectionObserver)
- [ ] Tree-shake unused code (revisar imports)
```

### **Lighthouse Score (Mínimo 90)**

```
✅ Performance: 90+
✅ Accessibility: 95+
✅ Best Practices: 90+
✅ SEO: 95+
```

**Cosas a validar:**

- [ ] Imágenes optimizadas (WebP, src menor a 100KB)
- [ ] Next-gen image formats
- [ ] CSS crítico inline
- [ ] Fonts optimizados (@font-face con font-display: swap)
- [ ] Mobile-first responsive
- [ ] Contraste de colores (WCAG AA)
- [ ] ARIA labels donde sea necesario
- [ ] Meta tags (Open Graph, Twitter Card)

### **Core Web Vitals**

```
LCP (Largest Contentful Paint): < 2.5s
FID (First Input Delay): < 100ms
CLS (Cumulative Layout Shift): < 0.1
```

---

## 🔒 Seguridad

### **Frontend Security Checklist**

- [ ] No guardar tokens sensibles en localStorage (usar httpOnly cookies)
- [ ] Validar TODOS los inputs (cliente + servidor)
- [ ] Sanitizar HTML user-generated (DOMPurify)
- [ ] CSRF protection (tokens en forms)
- [ ] CSP headers configurados
- [ ] Dependencias actualizadas (`npm audit`)
- [ ] Secrets NO en código (usar .env)
- [ ] XSS prevention (escapar data dinámicamente)
- [ ] Rate limiting en forms

### **Archivo: `.env.example`**

```
VITE_API_URL=http://localhost:3001
VITE_GEO_IPAPI_URL=https://ipapi.co/json
VITE_MAILCHIMP_URL=https://naturessunshinelatam.us12.list-manage.com/subscribe/post
VITE_APP_VERSION=1.0.0
```

### **Nunca hacer esto:**

```javascript
// ❌ NUNCA
fetch("http://localhost:3001/api/..."); // URL hardcoded
const API_KEY = "sk_live_abc123"; // Secret en código
<input value={userInput} />; // Sin sanitize

// ✅ SIEMPRE
fetch(import.meta.env.VITE_API_URL); // Desde .env
const token = getTokenFromCookie(); // De httpOnly cookie
<input value={sanitize(userInput)} />; // Con DOMPurify
```

---

## ✅ Checklist Pre-Deploy

### **Frontend**

```
Code Quality:
- [ ] npm run lint (0 errores)
- [ ] npm test (cobertura > 80%)
- [ ] npm run build (sin warnings)

Performance:
- [ ] Lighthouse score > 90
- [ ] Bundle size < 250KB gzipped
- [ ] Images optimizadas
- [ ] Lazy loading implementado

Security:
- [ ] npm audit (0 vulnerabilidades críticas)
- [ ] Env vars cambiados (production)
- [ ] Secrets removidos de código
- [ ] HTTPS activado

Funcionalidad:
- [ ] Testing manual en 3 navegadores
- [ ] Mobile responsivo
- [ ] Geolocalización funciona (9 países)
- [ ] Formularios submit correctamente
- [ ] Mailchimp integrado funciona

SEO:
- [ ] Meta tags correctos
- [ ] Open Graph tags
- [ ] sitemap.xml generado
- [ ] robots.txt configurado
```

### **Backend (cuando agregues)**

```
API:
- [ ] npm test (integration tests pasen)
- [ ] npm run lint (0 errores)
- [ ] npm audit (0 vulnerabilidades críticas)
- [ ] Validaciones en TODO endpoint
- [ ] Error handling robusto
- [ ] Rate limiting activado

Database:
- [ ] Backup estrategia
- [ ] Índices creados
- [ ] Foreign keys Ok
- [ ] Backups probados

Deployment:
- [ ] Variables de entorno production
- [ ] Database prod separada de dev
- [ ] SSL/TLS certificado
- [ ] Logs centralizados (Sentry/LogRocket)
- [ ] Monitoreo activado
```

### **Deployment Script**

```bash
#!/bin/bash

echo "🔍 Running linter..."
npm run lint || exit 1

echo "🧪 Running tests..."
npm test -- --coverage || exit 1

echo "📦 Building..."
npm run build || exit 1

echo "✅ All checks passed! Ready to deploy."
```

---

## 📊 Métricas a Monitorear

### **Post-Deployment**

```
✅ Error Rate: < 1%
✅ Load Time (p95): < 3s
✅ Uptime: > 99.9%
✅ User Engagement:
   - Bounce rate: < 40%
   - Avg session: > 2 min
   - Conversion: Track en Mailchimp

Herramientas:
- Sentry (error tracking)
- LogRocket (replay sessions)
- Google Analytics (user behavior)
- Mailchimp (email metrics)
```

---

## 🎓 Recursos & Referencias

**Clean Code:**

- Robert C. Martin - "Clean Code"
- Kent C. Dodds - "Testing JavaScript"

**SOLID:**

- Bob Martin - SOLID Principles
- https://dev.to/thawkin3/solid-principles-in-react-1

**React Best Practices:**

- https://react.dev/learn
- https://overreacted.io/ (Dan Abramov blog)

**Testing:**

- https://testing-library.com/docs/react-testing-library/intro/
- Jest official docs

**Performance:**

- https://web.dev/performance/
- https://react.dev/reference/react/useMemo

---

## 📝 Notas Finales

1. **Este documento es vivo**: Actualizar cuando nuevos patrones emerjan
2. **Revisar en cada PR**: Usar como checklist en code reviews
3. **Enseñar al equipo**: Si agregás personas, compartir este documento
4. **Medir métricas**: Tracking de coverage, performance, errores
5. **Iterar**: Si algo no funciona en la práctica, ajustar aquí

---

**Mantengamos esto profesional, escalable y consistente. 🚀**

---

_Creado: Marzo 3, 2026_  
_Responsable: Equipo de Desarrollo_  
_Próxima revisión: 30 días_
