# Aires de Paz — Cotizador Online

Cotizador de servicios de cremación de mascotas para **Aires de Paz — Cementerio Parque · Crematorio Privado**.

Construido con **React + Vite**. Se accede desde un botón en el sitio principal [airesdepaz.com](https://www.airesdepaz.com/).

---

## Stack

| Tecnología | Uso |
|---|---|
| React 19 + Vite 8 | Frontend |
| lucide-react | Íconos |
| Supabase | Base de datos (pendiente — ver abajo) |

---

## Estructura del proyecto

```
src/
├── assets/
│   └── logo-aires-de-paz.png     # Logo oficial (fondo verde #1a4a3c)
├── components/
│   ├── Header.jsx                # Barra superior sticky con logo y teléfono
│   ├── StepIndicator.jsx         # Indicador de pasos (Mascota → Resumen)
│   └── NavigationButtons.jsx     # Botones ← Volver / Siguiente →
├── data/
│   ├── petTypes.js               # Canino, Felino, Otro + subtipos
│   ├── sizes.js                  # Pequeño / Mediano / Grande / Extra grande
│   ├── services.js               # Huellitas / Amigos para siempre / Amigos de verdad
│   ├── pickupMethods.js          # Sucursal Córdoba / Cucha Cucha / Domicilio
│   ├── ashesDelivery.js          # Retiro en sucursal / Entrega a domicilio
│   └── zones.js                  # Rosario / Pueblo Esther / Funes / Roldán / etc.
├── pages/
│   └── QuotePage.jsx             # Página principal del cotizador (8 pasos)
├── App.jsx                       # Entrada — monta Header + QuotePage
└── index.css                     # Estilos globales (paleta verde Aires de Paz)
```

---

## Flujo de pasos

```
1. Mascota     → Canino / Felino / Otro (+ sub-tipos si elige Otro)
2. Tamaño      → Pequeño / Mediano / Grande / Extra grande
3. Servicio    → Huellitas / Amigos para siempre / Amigos de verdad
4. Retiro      → Sucursal Córdoba / Sucursal Cucha Cucha / A domicilio
5. Cenizas     → En sucursal / A domicilio
6. Zona        → Solo si eligió retiro a domicilio (se salta si es sucursal)
7. Datos       → Nombre mascota, nombre dueño, teléfono, email
8. Éxito       → Resumen + botón WhatsApp
```

---

## Correr en local

```bash
npm install
npm run dev
```

---

## ✅ Lo que ya funciona

- [x] Flujo completo de 7/8 pasos con navegación ← →
- [x] Paso de zona se salta automáticamente si el retiro es en sucursal
- [x] Header sticky con logo real y teléfono de contacto
- [x] Step indicator con labels (Mascota · Tamaño · Servicio...)
- [x] Validación por paso (no avanza si no hay selección)
- [x] Animación de entrada entre pasos
- [x] Pantalla de éxito con resumen y botón WhatsApp
- [x] Responsive mobile
- [x] Paleta verde oficial de Aires de Paz (#1a4a3c / #2d6a4f)

---

## ❌ Lo que falta para que sea 100% usable en producción

### 1. Supabase — guardar cotizaciones (PRIORITARIO)

Actualmente cuando el usuario completa el formulario, los datos **no se guardan en ningún lado**. Hay que integrar Supabase para:

- Guardar cada cotización completada en la tabla `quotes`
- Poder ver los leads desde el panel de Supabase
- (Futuro) Panel admin para gestionar cotizaciones

**Ver sección "Setup Supabase" más abajo.**

### 2. Precios reales

Los servicios (`src/data/services.js`) no tienen precios. Hay que definirlos y mostrarlos en el paso 3 y en la pantalla de éxito.

### 3. Teléfono real

En `Header.jsx` y en `QuotePage.jsx` (botón WhatsApp) el número es de ejemplo `341 000 0000`. Reemplazar con el número real.

### 4. Deploy

El proyecto todavía no está deployado. Opciones recomendadas:
- **Vercel** (recomendado — gratis, conecta directo con GitHub)
- **Netlify**

### 5. Validación de email y teléfono

El paso 7 (datos) valida que los campos no estén vacíos pero no valida formato. Agregar validación de email y teléfono argentino.

### 6. Zonas fuera de cobertura

Si el usuario elige "Otra zona", mostrar un mensaje de que se comuniquen por WhatsApp en lugar de continuar el flujo.

---

## 🗄️ Setup Supabase

### Paso 1 — Crear proyecto

1. Ir a [supabase.com](https://supabase.com) → **New project**
2. Nombre: `aires-de-paz`
3. Región: **South America (São Paulo)** — la más cercana a Rosario
4. Guardá la **URL** y la **anon key** que te da al crear

### Paso 2 — Crear la tabla `quotes`

En el **SQL Editor** de Supabase, ejecutar:

```sql
create table quotes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),

  -- Mascota
  pet_type text not null,
  pet_size text not null,
  pet_name text not null,

  -- Servicio
  service text not null,

  -- Logística
  pickup_method text not null,
  ashes_delivery text not null,
  zone text,

  -- Contacto
  owner_name text not null,
  phone text not null,
  email text not null,

  -- Estado
  status text default 'pending'
);

-- Permitir inserts desde el frontend (sin autenticación)
alter table quotes enable row level security;

create policy "Allow public inserts"
  on quotes for insert
  to anon
  with check (true);

-- Solo el admin puede leer (proteger datos de contacto)
create policy "Allow admin reads"
  on quotes for select
  to authenticated
  using (true);
```

### Paso 3 — Variables de entorno

Crear el archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ Agregar `.env` al `.gitignore` — nunca subir las keys a GitHub.

### Paso 4 — Instalar cliente

```bash
npm install @supabase/supabase-js
```

### Paso 5 — Crear el cliente

Crear `src/lib/supabase.js`:

```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

### Paso 6 — Guardar la cotización al completar

En `QuotePage.jsx`, en la función `handleNext` cuando llega al paso final, agregar:

```js
import { supabase } from '../lib/supabase'

// Dentro de handleNext, cuando step === dataStep (último paso antes del éxito):
const saveQuote = async () => {
  const { error } = await supabase.from('quotes').insert({
    pet_type:       formData.petType,
    pet_size:       formData.size,
    pet_name:       formData.petName,
    service:        formData.service,
    pickup_method:  formData.pickupMethod,
    ashes_delivery: formData.ashesDelivery,
    zone:           formData.zone || null,
    owner_name:     formData.ownerName,
    phone:          formData.phone,
    email:          formData.email,
  })

  if (error) {
    console.error('Error guardando cotización:', error)
    // Igual avanzar al paso de éxito — no bloquear al usuario
  }
}

await saveQuote()
goTo(step + 1)
```

---

## Paleta de colores

| Variable | Color | Uso |
|---|---|---|
| `--green-dark` | `#1a4a3c` | Header, hover botones |
| `--green` | `#2d6a4f` | Botón primario, bordes activos |
| `--green-light` | `#edf7ef` | Fondo cards seleccionadas |
| `--border` | `#e0dbd5` | Bordes neutros |
| `--text` | `#1a1a1a` | Texto principal |
| `--text-soft` | `#555` | Texto secundario |

---

## Contacto / Deploy

- Sitio principal: [airesdepaz.com](https://www.airesdepaz.com/)
- Repositorio: [github.com/ffrankito/Paginacementerio](https://github.com/ffrankito/Paginacementerio)