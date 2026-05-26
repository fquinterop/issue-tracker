# 🐛 Issue Tracker — Sistema de Gestión de Incidencias

Aplicación web SPA para que equipos de soporte técnico gestionen reportes de errores y bugs de manera eficiente.

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| React 18 + Vite | Framework y bundler |
| React Router DOM v6 | Enrutamiento SPA |
| Tailwind CSS | Estilos utilitarios |
| Axios | Peticiones HTTP |
| SweetAlert2 | Alertas y confirmaciones |
| LocalStorage | Persistencia de sesión simulada |
| MockAPI | API REST de pruebas |

## 🚀 Instalación y ejecución local

### Prerrequisitos
- Node.js ≥ 18
- npm ≥ 9

### Pasos

```bash
# 1. Clona el repositorio
git clone https://github.com/TU_USUARIO/issue-tracker.git
cd issue-tracker

# 2. Instala dependencias
npm install

# 3. Configura la API
# Crea tu proyecto en https://mockapi.io con el recurso "issues" y los campos:
# id, titulo, descripcion, estado, prioridad
# Luego reemplaza la URL en src/services/issuesService.js

# 4. Inicia el servidor de desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`

## 🔑 Autenticación simulada

Ingresa cualquier nombre y elige un rol. Los datos se guardan en **LocalStorage**. Para cerrar sesión usa el botón "Salir" en la barra de navegación.

## 📦 Build para producción

```bash
npm run build
# Los archivos quedan en /dist
```

## 🌐 Despliegue

🔗 **[Ver aplicación en vivo](https://issue-tracker-lyart-nine.vercel.app)**

Desplegado en **Vercel** (conectando el repositorio de GitHub directamente).

## 📁 Estructura del proyecto

```
src/
├── components/      # Componentes reutilizables
│   ├── Badges.jsx
│   ├── IssueCard.jsx
│   ├── IssueModal.jsx
│   ├── Navbar.jsx
│   ├── ProtectedRoute.jsx
│   ├── Spinner.jsx
│   └── StatsBar.jsx
├── hooks/           # Custom hooks
│   └── useIssues.js
├── pages/           # Vistas de la aplicación
│   ├── LoginPage.jsx
│   └── DashboardPage.jsx
├── services/        # Lógica de comunicación con la API
│   └── issuesService.js
├── utils/           # Utilidades y helpers
│   └── auth.js
├── App.jsx
├── main.jsx
└── index.css
```

## ✨ Funcionalidades

- ✅ Login simulado con LocalStorage
- ✅ Rutas protegidas (redirige a login si no hay sesión)
- ✅ Listado de incidencias con tarjetas responsivas
- ✅ Crear incidencia vía modal
- ✅ Editar incidencia existente
- ✅ Eliminar con confirmación SweetAlert2
- ✅ Filtros por estado, prioridad y búsqueda de texto
- ✅ Stats resumen en el dashboard
- ✅ Estados de carga (spinner) y manejo de errores
- ✅ Diseño responsivo (móvil y escritorio)
