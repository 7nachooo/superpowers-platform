# Superpowers Platform

Dashboard/CRM en tiempo real con datos directamente desde **Google Sheets** — sin Supabase.

## Stack
- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** para estilos
- **SWR** para polling en tiempo real (cada 15s)
- **Google Sheets API** + Service Account
- **TanStack Table** para tablas con búsqueda/sort/paginación
- **Recharts** para gráficas

## Setup en 5 pasos

### 1. Clonar e instalar

```bash
git clone https://github.com/erophames/superpowers-platform.git
cd superpowers-platform
npm install
```

### 2. Configurar Google Cloud

1. Ve a [console.cloud.google.com](https://console.cloud.google.com)
2. Habilita **Google Sheets API**
3. Crea una **Service Account** con rol Viewer
4. Descarga la clave JSON
5. Copia el `client_email` y `private_key`

### 3. Variables de entorno

```bash
cp .env.example .env.local
# Edita .env.local con tus credenciales reales
```

### 4. Configurar tus hojas

Edita `lib/config.ts`:
```typescript
sheets: [
  { name: "NombreExactoDeHoja", range: "A:Z", displayName: "Mi Hoja" },
],
```

### 5. Compartir el Sheet

En Google Sheets → Compartir → pega el email de tu Service Account con permiso **Viewer**.

### Correr en desarrollo

```bash
npm run dev
# Abre http://localhost:3000
```

### Deploy en Vercel

1. Conecta este repo en [vercel.com](https://vercel.com)
2. Agrega las variables de entorno en el panel de Vercel
3. Deploy automático en cada push

## Estructura

```
app/
  api/sheets/[sheet]/  → API proxy a Google Sheets
  api/kpis/            → Métricas calculadas
  components/          → UI components
lib/
  sheets.ts            → Cliente Google Sheets
  cache.ts             → Cache en memoria (TTL = poll interval)
  config.ts            → Configuración de hojas y KPIs ← EDITA ESTO
hooks/
  useSheets.ts         → SWR hook con polling
types/
  sheets.ts            → Tipos TypeScript
```
