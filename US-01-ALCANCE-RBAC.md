# US-01 - Alcance del modulo admin y roles permitidos

## 1) Objetivo

Definir el alcance funcional del modulo admin, los roles permitidos y las reglas de acceso para evitar cambios ambiguos antes de la implementacion.

## 2) Alcance funcional

Incluye:

- Login de usuarios administrativos.
- Manejo de sesion con token en frontend.
- Control de acceso por rol.
- Control de acceso por pais para ContentManager.
- Uso de backend via `Authorization: Bearer <token>` en cada request.
- Configuracion de `baseURL` por entorno (local ahora, GCP despues).

No incluye en esta US:

- Implementacion completa de UI admin.
- Integracion E2E completa de todos los endpoints.
- Pruebas funcionales finales.

## 3) Roles y permisos

Roles habilitados:

- `0 = Admin`
- `1 = ContentManager`

Fuente de roles:

- El rol funcional es un enum en backend.
- En Firestore se almacena como valor numerico (`0` y `1`).

Permisos:

- `Admin`
  - Puede crear/editar/eliminar usuarios (endpoints `/api/User/*`).
  - Puede manejar contenido de todos los paises sin restriccion.
- `ContentManager`
  - Puede manejar contenido.
  - No puede crear usuarios.
  - Solo puede editar paises incluidos en `data.countries` del usuario.

## 4) Contrato de autenticacion

### 4.1 Login

Endpoint:

- `POST /api/Auth/login`

Respuesta esperada (resumen):

- `data.access_token`
- `data.token_type` (Bearer)
- `data.expires_in`

### 4.2 Uso de token

- El token se guarda en sesion del frontend.
- Cada request al backend debe enviar header:
  - `Authorization: Bearer <access_token>`

### 4.3 Expiracion de sesion

- Si backend responde `401` en una llamada autenticada:
  - Se hace logout.
  - Se redirecciona a login.

## 5) Contrato de usuario autenticado

Endpoint:

- `GET /api/User/user/{email}`

Schema final (sin datos sensibles):

```json
{
  "success": true,
  "status": "user",
  "data": {
    "roles": ["Admin"],
    "countries": ["EC", "MX"],
    "privilegies": ["Read", "Write", "Delete", "Update"]
  }
}
```

Campos funcionales:

- `data.roles`: roles del usuario.
- `data.countries`: paises permitidos para UI.
- `data.privilegies`: privilegios operativos.

Regla UI:

- `Admin`: muestra todos los paises.
- `ContentManager`: muestra solo `data.countries`.

Nota de seguridad:

- Backend debe retornar al frontend solo datos necesarios (sin datos sensibles).

## 6) Reglas de autorizacion por pais

- Frontend valida seleccion de paises permitidos para ContentManager.
- Backend valida nuevamente autorizacion por pais en cada operacion de contenido.
- Si se intenta operar un pais no permitido:
  - Debe responder error de autorizacion (schema pendiente por confirmar).

## 7) Base URL por entorno

- Local actual: `http://localhost:62053`
- Futuro: endpoint en GCP.
- El frontend debe resolver `baseURL` desde variable de entorno.

Sugerencia de variable:

- `VITE_API_BASE_URL`

## 8) Errores conocidos de autenticacion

Login puede responder `401` con variantes ya identificadas:

Caso A:

```json
{
  "status": "Failed",
  "success": false,
  "message": "User or Password invalid!"
}
```

Caso B:

```json
{
  "status": "failed",
  "success": false,
  "wrongAttempts": 2,
  "message": "Invalid User or Password"
}
```

Comportamiento esperado en UI:

- Mostrar mensaje de credenciales invalidas.
- Si viene `wrongAttempts`, mostrar contador cuando aplique.

## 9) Criterios de aceptacion (US-01)

- Alcance del modulo admin documentado y aprobado.
- Roles y permisos documentados (`Admin`, `ContentManager`).
- Restriccion por pais para ContentManager documentada.
- Flujo de token y sesion documentado.
- Regla de logout por `401` documentada.
- Estrategia `baseURL` por entorno documentada.

## 10) Pendientes para cerrar 100%

- Confirmar schema exacto de error cuando falla por pais no autorizado.
