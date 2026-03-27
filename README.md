# Documentación completa del proyecto
## Página web tipo cotizador funerario para mascotas

## 1. Objetivo del proyecto
Desarrollar una página web interactiva, visualmente similar a la referencia `funeralpets.com.ar/cotizador`, implementada sobre un repositorio de GitHub y desarrollada en Visual Studio Code, con foco en:

- experiencia de usuario moderna
- cotizador paso a paso
- selección visual mediante tarjetas/botones interactivos
- animaciones hover donde los botones se agrandan al pasar el cursor
- flujo completo hasta reserva final
- arquitectura mantenible y escalable

El sistema deberá replicar la lógica general de la referencia:

1. selección del tipo de mascota
2. selección de tamaño
3. selección del servicio
4. selección de modalidad de retiro
5. selección de entrega de cenizas
6. selección de zona/localidad/barrio si aplica
7. carga de datos del cliente
8. recomendación o selección final del servicio
9. confirmación de reserva
10. pantalla final con mensaje y datos de pago/contacto

---

## 2. Referencia funcional analizada
La página de referencia contiene las siguientes secciones y comportamientos observables:

### 2.1 Flujo principal detectado
- Hero inicial con título principal
- Selección de tipo de mascota:
  - Canino
  - Felino
  - Otro
  - Mamífero pequeño
  - Mamífero grande
  - Reptil
  - Ave o pez
- Selección de tamaño:
  - Pequeño
  - Mediano
  - Grande
  - Extra grande
- Selección de servicio:
  - Huellitas
  - Amigos para siempre
  - Amigos de verdad
- Selección de modalidad de recepción:
  - llevar a sucursal Córdoba
  - llevar a sucursal Cucha Cucha
  - retiro a domicilio
- Selección de entrega de cenizas:
  - sucursal
  - domicilio
- Selección de zona:
  - Capital Federal
  - Zona Norte
  - Zona Oeste
  - Zona Sur
  - Zona La Plata
- Selección posterior de localidad y barrio
- Formulario de datos del usuario
- Pantalla de recomendación de servicios
- Confirmación de reserva
- Pantalla final con agradecimiento

### 2.2 Elementos visuales importantes a replicar
- tarjetas grandes y claras
- iconografía o imágenes por categoría
- pasos secuenciales
- botón “Siguiente” y “Volver atrás”
- tarjetas con hover y sensación de profundidad
- bloques con información de servicios
- diseño limpio, emocional y profesional

### 2.3 Efecto solicitado explícitamente
Los botones/tarjetas deben agrandarse al pasar el cursor. La recomendación técnica es:

```css
transition: transform 0.25s ease, box-shadow 0.25s ease;
```

```css
:hover {
  transform: scale(1.04);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}
```

---

## 3. Alcance del proyecto

## 3.1 Alcance incluido
- frontend completo del cotizador
- estructura escalable
- responsive design
- navegación por fases
- resumen lateral o interno
- componentes reutilizables
- animaciones hover
- documentación técnica completa
- despliegue en GitHub y opcionalmente Vercel

## 3.2 Alcance opcional para fase posterior
- panel administrador
- integración con WhatsApp
- integración con email
- persistencia en base de datos
- dashboard de reservas
- validación por SMS
- sistema de pagos online

## 3.3 Fuera de alcance inicial
- backoffice completo
- ERP
- CRM avanzado
- autenticación de usuarios finales
- app móvil nativa

---

## 4. Stack tecnológico recomendado

## 4.1 Frontend
- React
- Vite
- CSS modular o CSS global ordenado
- opcional: Tailwind CSS

## 4.2 Control de versiones
- Git
- GitHub

## 4.3 Entorno de desarrollo
- Visual Studio Code

## 4.4 Despliegue
- Vercel recomendado
- GitHub Pages como alternativa

## 4.5 Motivo técnico de elección
React + Vite es la mejor opción para este proyecto porque:
- permite manejar estados por pasos
- facilita validaciones
- permite reutilizar tarjetas y componentes
- separa lógica, datos y presentación
- es ideal para una interfaz dinámica tipo cotizador

---

## 5. Arquitectura funcional del sistema

## 5.1 Módulos principales
1. **Landing/Hero**
2. **Step Indicator**
3. **Selector de tipo de mascota**
4. **Selector de tamaño**
5. **Selector de servicio**
6. **Selector de retiro**
7. **Selector de cenizas/zona/localidad**
8. **Formulario de datos**
9. **Recomendación o resumen final**
10. **Confirmación de reserva**
11. **Pantalla final de éxito**

## 5.2 Modelo lógico simplificado
```text
Usuario entra
→ elige tipo de mascota
→ elige tamaño
→ elige servicio
→ elige retiro
→ si retiro = domicilio, elige zona/localidad/barrio
→ elige entrega de cenizas
→ completa datos
→ revisa resumen
→ confirma reserva
→ ve pantalla final
```

---

## 6. Estructura recomendada de carpetas
```text
Paginacementerio/
├─ public/
│  ├─ images/
│  └─ icons/
├─ src/
│  ├─ components/
│  │  ├─ Hero.jsx
│  │  ├─ StepIndicator.jsx
│  │  ├─ OptionCard.jsx
│  │  ├─ ServiceCard.jsx
│  │  ├─ SummaryCard.jsx
│  │  ├─ NavigationButtons.jsx
│  │  └─ FormSection.jsx
│  ├─ data/
│  │  ├─ petTypes.js
│  │  ├─ sizes.js
│  │  ├─ services.js
│  │  ├─ zones.js
│  │  ├─ localities.js
│  │  └─ neighborhoods.js
│  ├─ pages/
│  │  └─ QuotePage.jsx
│  ├─ styles/
│  │  ├─ app.css
│  │  ├─ cards.css
│  │  ├─ buttons.css
│  │  └─ forms.css
│  ├─ App.jsx
│  └─ main.jsx
├─ package.json
├─ vite.config.js
└─ README.md
```

---

## 7. Fases del proyecto

# FASE 0 — Preparación del entorno
## Objetivo
Dejar listo el entorno de trabajo sobre GitHub y Visual Studio Code.

## Tareas
1. clonar el repositorio existente
2. abrir el proyecto en VS Code
3. inicializar proyecto con Vite + React
4. instalar dependencias
5. hacer primer commit técnico

## Paso a paso
```bash
git clone https://github.com/ffrankito/Paginacementerio.git
cd Paginacementerio
npm create vite@latest . -- --template react
npm install
npm run dev
```

## Entregable
- proyecto React funcionando en local
- repo vinculado a GitHub

---

# FASE 1 — Definición de requerimientos
## Objetivo
Documentar exactamente qué debe hacer la página.

## Requerimientos funcionales
- el usuario debe poder recorrer un flujo paso a paso
- cada opción debe seleccionarse visualmente con tarjetas
- debe existir retroceso entre pasos
- debe mostrarse recomendación o resumen final
- debe existir formulario de contacto
- debe existir pantalla final de confirmación

## Requerimientos no funcionales
- diseño responsive
- buen rendimiento
- código mantenible
- interfaz clara
- efectos hover suaves
- accesibilidad básica

## Entregable
- lista cerrada de funcionalidades
- mapa completo del flujo

---

# FASE 2 — Diseño UX/UI
## Objetivo
Diseñar una interfaz lo más parecida posible a la referencia.

## Lineamientos visuales
- fondo claro
- tarjetas grandes
- bordes redondeados
- tipografía moderna
- alto contraste
- botones llamativos
- uso de sombras suaves
- interacciones con `scale()` en hover

## Comportamiento hover obligatorio
Todas las tarjetas y botones principales deben tener:
- crecimiento leve al pasar cursor
- sombra más marcada
- transición suave

## CSS base recomendado
```css
.option-card,
.service-card,
.action-button {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.option-card:hover,
.service-card:hover,
.action-button:hover {
  transform: scale(1.04);
  box-shadow: 0 14px 32px rgba(0,0,0,0.14);
}
```

## Entregable
- guía visual
- comportamiento hover definido

---

# FASE 3 — Maquetación base
## Objetivo
Construir el layout general de la página.

## Secciones a implementar
1. Hero principal
2. Indicador de pasos
3. Contenedor de selección principal
4. Navegación entre pasos
5. Resumen lateral o inferior
6. Footer o cierre

## Componentes mínimos
- `Hero.jsx`
- `StepIndicator.jsx`
- `OptionCard.jsx`
- `NavigationButtons.jsx`
- `SummaryCard.jsx`

## Entregable
- interfaz base navegable sin lógica completa

---

# FASE 4 — Implementación del flujo del cotizador
## Objetivo
Programar la lógica paso a paso.

## Estados principales
```js
const [step, setStep] = useState(1)
const [formData, setFormData] = useState({
  petType: '',
  size: '',
  service: '',
  pickupMethod: '',
  ashesDelivery: '',
  zone: '',
  locality: '',
  neighborhood: '',
  petName: '',
  ownerName: '',
  phone: '',
  email: ''
})
```

## Reglas funcionales
- no se avanza sin seleccionar la opción obligatoria
- si el usuario elige retiro a domicilio, deben aparecer zona/localidad/barrio
- si el usuario elige sucursal, no se muestra esa lógica extendida
- el formulario final debe validarse antes de reservar

## Entregable
- navegación funcional entre pasos
- persistencia del estado en memoria

---

# FASE 5 — Módulo de servicios
## Objetivo
Configurar los paquetes o servicios ofrecidos.

## Servicios detectados en referencia
- Huellitas
- Amigos para siempre
- Amigos de verdad

## Estructura de datos sugerida
```js
export const services = [
  {
    id: 'huellitas',
    title: 'Huellitas',
    subtitle: 'Un adiós sencillo, con respeto',
    features: [
      'Cremación colectiva',
      'Certificado de cremación',
      'Sin devolución de cenizas'
    ]
  }
]
```

## Entregable
- archivo de datos desacoplado
- tarjetas de servicio dinámicas

---

# FASE 6 — Módulo geográfico
## Objetivo
Implementar la selección de zona, localidad y barrio.

## Datos detectados
- Capital Federal
- Zona Norte
- Zona Oeste
- Zona Sur
- Zona La Plata

## Recomendación técnica
Usar archivos JS con arrays por zona.

## Ejemplo
```js
export const zones = [
  'Capital Federal',
  'Zona Norte',
  'Zona Oeste',
  'Zona Sur',
  'Zona La Plata'
]
```

Luego cada zona puede tener sus localidades asociadas.

## Entregable
- módulo escalable de cobertura geográfica

---

# FASE 7 — Formulario y validaciones
## Objetivo
Capturar los datos del cliente correctamente.

## Campos mínimos
- nombre de mascota
- nombre del responsable
- teléfono
- email
- observaciones opcionales

## Validaciones mínimas
- campos obligatorios no vacíos
- email con formato válido
- teléfono numérico
- longitud mínima razonable

## Entregable
- formulario usable
- validación frontend

---

# FASE 8 — Confirmación y cierre
## Objetivo
Mostrar un resumen de reserva y la pantalla final.

## Contenido final sugerido
- mensaje de agradecimiento
- resumen del servicio elegido
- próximos pasos
- medios de contacto
- datos de pago si aplica

## Entregable
- pantalla final funcional

---

# FASE 9 — Mejora visual y microinteracciones
## Objetivo
Elevar la calidad percibida del sistema.

## Mejoras
- hover scale en botones y tarjetas
- sombreado dinámico
- feedback visual de selección
- estados activos
- indicadores de progreso
- animaciones suaves de transición entre pasos

## Ejemplo CSS de selección
```css
.option-card.selected {
  border: 2px solid #111;
  transform: scale(1.02);
  box-shadow: 0 10px 24px rgba(0,0,0,0.10);
}
```

## Entregable
- interfaz más profesional
- sensación premium similar a la referencia

---

# FASE 10 — Testing
## Objetivo
Verificar que el sistema funcione correctamente.

## Casos de prueba
1. seleccionar tipo de mascota
2. retroceder y conservar selección
3. elegir retiro a domicilio y ver zonas
4. elegir sucursal y ocultar zonas
5. completar formulario con datos válidos
6. bloquear avance con datos inválidos
7. probar hover en desktop
8. probar responsive en mobile

## Entregable
- check de funcionamiento completo

---

# FASE 11 — Deploy y publicación
## Objetivo
Publicar la página para uso real.

## Método recomendado
Vercel conectado a GitHub.

## Flujo
1. push al repo
2. conectar repo en Vercel
3. desplegar automáticamente
4. revisar dominio y entorno productivo

## Entregable
- versión online pública

---

# FASE 12 — Evolución futura
## Objetivo
Preparar el sistema para crecer.

## Mejoras futuras
- integración con WhatsApp
- integración con Google Sheets
- backend con Node.js o Firebase
- panel administrador
- motor de precios
- login administrador
- analytics
- SEO

---

## 8. Plan de implementación técnico paso a paso

### Paso 1
Crear la base React en el repo.

### Paso 2
Ordenar carpetas en `components`, `data`, `styles`.

### Paso 3
Construir `OptionCard` con hover scale.

### Paso 4
Construir `StepIndicator`.

### Paso 5
Construir datos de mascota, tamaños y servicios.

### Paso 6
Programar la navegación por pasos en `App.jsx`.

### Paso 7
Agregar formulario y validaciones.

### Paso 8
Agregar resumen final y reserva.

### Paso 9
Aplicar mejoras visuales.

### Paso 10
Subir cambios a GitHub.

---

## 9. Componente crítico: tarjeta con efecto hover
```jsx
function OptionCard({ title, desc, selected, onClick }) {
  return (
    <button
      className={`option-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <h3>{title}</h3>
      <p>{desc}</p>
    </button>
  )
}
```

```css
.option-card {
  width: 100%;
  padding: 24px;
  border-radius: 18px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.option-card:hover {
  transform: scale(1.04);
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
}

.option-card.selected {
  border-color: #111;
  box-shadow: 0 12px 30px rgba(0,0,0,0.10);
}
```

---

## 10. Riesgos del proyecto
- querer copiar visualmente sin estructurar componentes
- mezclar lógica con estilos en un solo archivo
- no separar datos configurables
- no contemplar mobile
- no validar pasos obligatorios

## Mitigación
- usar arquitectura por componentes
- separar datos en archivos JS
- implementar fases cerradas
- testear cada fase antes de pasar a la siguiente

---

## 11. Criterios de aceptación
El proyecto se considera aceptado cuando:
- la página replica la experiencia de la referencia
- el flujo por pasos es completo
- los botones/tarjetas se agrandan al hover
- el usuario puede avanzar y retroceder correctamente
- el formulario final funciona
- la página puede subirse a GitHub y desplegarse

---

## 12. Orden real de ejecución recomendado
1. preparar repo y entorno
2. crear arquitectura base
3. maquetar cards y layout
4. programar pasos
5. cargar datos
6. validaciones
7. pantalla final
8. animaciones hover
9. testing
10. deploy

---

## 13. Conclusión técnica
Desde un enfoque de ingeniería en sistemas, este proyecto debe construirse como una aplicación frontend modular, escalable y mantenible, no como una sola página improvisada. La mejor estrategia es replicar primero la estructura funcional de la referencia, luego consolidar estilos y finalmente agregar lógica avanzada.

La prioridad es:
- clonar la experiencia del cotizador
- mantener el código ordenado
- asegurar una buena base para futuras integraciones

---

## 14. Próximo entregable recomendado
El siguiente entregable natural después de esta documentación es:

**Fase 0 + Fase 1 + Fase 2 convertidas en código base**, es decir:
- estructura de carpetas
- archivos iniciales
- componente `OptionCard`
- `StepIndicator`
- `App.jsx` inicial con navegación por pasos
- estilos hover ya implementados

Eso deja listo el proyecto para empezar a desarrollarlo dentro del repo.

