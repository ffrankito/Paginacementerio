# Aires de Paz — Cotizador Online

Cotizador de servicios de cremación de mascotas para **Aires de Paz — Cementerio Parque · Crematorio Privado**.
Construido con React + Vite. Se integra al sitio principal [airesdepaz.com](https://www.airesdepaz.com/) mediante un botón o widget embebido.

---

## Stack

| Tecnología | Uso |
|---|---|
| React 19 + Vite 8 | Frontend |
| lucide-react | Íconos |
| Supabase | Base de datos — pendiente de conexión |
| Vercel | Deploy — pendiente |

---

## Cómo correr en local

```bash
npm install
npm run dev
```

---

## Flujo del cotizador

```
1. Mascota     → Canino / Felino / Otro (+ subtipos)
2. Tamaño      → Pequeño / Mediano / Grande / Extra grande
3. Servicio    → Huellitas / Amigos para siempre / Amigos de verdad
4. Retiro      → Sucursal Córdoba / Sucursal Cucha Cucha / A domicilio
5. Cenizas     → En sucursal / A domicilio
6. Zona        → Solo si eligió retiro a domicilio
7. Datos       → Nombre, teléfono, email, nombre de mascota
8. Éxito       → Resumen + datos de pago + botón WhatsApp
```

---

## Versiones del proyecto

### Versión 1 — MVP funcional ✅ COMPLETADA

El cotizador está construido y funciona en local. Todo el flujo de pasos está operativo.

**Lo que se hizo:**
- [x] Flujo completo de 7/8 pasos con navegación ← →
- [x] Paso de zona se salta automáticamente si el retiro es en sucursal
- [x] Header sticky con logo real de Aires de Paz
- [x] Step indicator con labels (Mascota · Tamaño · Servicio · ...)
- [x] Validación por paso — no avanza sin selección
- [x] Cards con hover states y colores por tipo de mascota
- [x] Servicios con lista de features expandible
- [x] Animación de entrada entre pasos
- [x] Pantalla de éxito con resumen y botón WhatsApp
- [x] Paleta verde oficial de Aires de Paz (`#1a4a3c` / `#2d6a4f`)
- [x] Responsive mobile
- [x] Estructura de datos separada en `/data`

---

### Versión 2 — Producción 🔧 EN PROGRESO

El cotizador se conecta a datos reales, se publica online y empieza a recibir leads.

**Tareas pendientes:**

- [ ] **Datos reales del cliente**
  - Reemplazar teléfono `341 000 0000` en `Header.jsx` y `QuotePage.jsx`
  - Reemplazar CBU, alias y datos bancarios en la pantalla de éxito (`QuotePage.jsx`)

- [ ] **Título y favicon**
  - En `index.html`: cambiar `<title>paginacementerio</title>` por `Aires de Paz — Cotizador`
  - Reemplazar `public/favicon.svg` con el ícono de Aires de Paz

- [ ] **Supabase — guardar leads**
  1. Crear proyecto en [supabase.com](https://supabase.com) → región South America (São Paulo)
  2. Ejecutar el SQL de creación de tabla `quotes` (ver sección Setup Supabase)
  3. Crear `.env` con `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`
  4. Instalar `npm install @supabase/supabase-js@2.39.0`
  5. Reemplazar el mock en `src/lib/supabase.js` por el cliente real

- [ ] **Deploy en Vercel**
  1. Ir a [vercel.com](https://vercel.com) → importar repo de GitHub
  2. Agregar las variables de entorno de Supabase en el panel de Vercel
  3. El deploy es automático — cada push a `main` actualiza la página

- [ ] **Integración con Wix**
  - En el sitio de Wix agregar un botón "Cotizá online"
  - El botón apunta a la URL de Vercel (recomendado: abrir en nueva pestaña)
  - Alternativa: incrustar via iFrame con el componente HTML Embed de Wix

---

### Versión 3 — Profesional completa 🚀 PRÓXIMA ETAPA

El cotizador tiene panel de administración, notificaciones automáticas y métricas.

**Tareas planificadas:**

- [ ] **Panel admin de leads**
  - Vista en Supabase de todas las cotizaciones recibidas
  - Filtros por fecha, servicio, zona y estado
  - Marcar leads como contactado / confirmado / cancelado

- [ ] **Notificaciones automáticas**
  - Email automático al cliente cuando completa el formulario (via Supabase Edge Functions + Resend)
  - Notificación interna a Aires de Paz por cada lead nuevo (WhatsApp o email)

- [ ] **Precios reales**
  - Agregar campo `price` en `src/data/services.js`
  - Mostrar precio en el paso 3 y en la pantalla de éxito
  - Los precios varían según tamaño de mascota — lógica de cálculo en `QuotePage.jsx`

- [ ] **Validaciones avanzadas**
  - Validar formato de email (regex)
  - Validar teléfono argentino (10 dígitos con código de área)
  - Mensaje claro si la zona está fuera de cobertura

- [ ] **Analytics**
  - Integrar Vercel Analytics para ver cuántos usuarios completan el cotizador
  - Medir tasa de abandono por paso

- [ ] **Widget embebido**
  - Versión compacta del cotizador para incrustar directo en cualquier página de Wix
  - Se activa con un botón flotante y abre como modal

- [ ] **SEO y accesibilidad**
  - Meta tags correctos en `index.html`
  - `aria-label` en todos los botones interactivos
  - Soporte completo de navegación por teclado

---

## Setup Supabase (para Versión 2)

### Crear la tabla de cotizaciones

En el **SQL Editor** de Supabase, ejecutar:

```sql
create table quotes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  pet_type text not null,
  pet_size text not null,
  pet_name text not null,
  service text not null,
  pickup_method text not null,
  ashes_delivery text not null,
  zone text,
  owner_name text not null,
  phone text not null,
  email text not null,
  status text default 'pending'
);

alter table quotes enable row level security;

create policy "Allow public inserts"
  on quotes for insert to anon
  with check (true);

create policy "Allow admin reads"
  on quotes for select to authenticated
  using (true);
```

### Variables de entorno

Crear `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ El archivo `.env` está en `.gitignore` — nunca subir las keys a GitHub.

---

## Paleta de colores

| Variable | Valor | Uso |
|---|---|---|
| `--green-dark` | `#1a4a3c` | Header, botones hover |
| `--green` | `#2d6a4f` | Botón primario, bordes activos |
| `--green-light` | `#edf7ef` | Fondo cards seleccionadas |
| `--border` | `#e0dbd5` | Bordes neutros |
| `--text` | `#1a1a1a` | Texto principal |
| `--text-soft` | `#555` | Texto secundario |

---

## Repositorio

[github.com/ffrankito/Paginacementerio](https://github.com/ffrankito/Paginacementerio)