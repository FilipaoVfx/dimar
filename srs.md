# 📄 SRS — DIMAR PRODUCCIÓN DE EVENTOS

## 1. 📌 INTRODUCCIÓN

### 1.1 Propósito
Definir los requisitos funcionales y técnicos del sistema web.

---

## 2. 🧩 REQUISITOS FUNCIONALES

### RF1 — Home
El sistema debe:
- Mostrar hero multimedia
- Mostrar servicios
- Incluir CTA visible

---

### RF2 — Portafolio

El sistema debe:
- Mostrar imágenes en grid
- Permitir filtrado por categoría

---

### RF3 — Formulario de Cotización

Inputs:
- Nombre
- Teléfono
- Tipo de evento
- Número de personas
- Fecha
- Ubicación
- Servicios requeridos

Debe:
- Validar datos
- Guardar en base de datos

---

### RF4 — WhatsApp

El sistema debe:
- Redirigir a WhatsApp con mensaje prellenado

Formato:
https://wa.me/<numero>?text=<mensaje>

---

### RF5 — Simulador

Debe permitir:
- Seleccionar tipo de evento
- Mostrar resultados visuales

---

### RF6 — SEO

El sistema debe:
- Generar meta tags dinámicos
- Incluir sitemap.xml
- Incluir robots.txt

---

## 3. ⚙️ REQUISITOS NO FUNCIONALES

### RNF1 — Performance
- Carga menor a 2 segundos
- Lighthouse > 90

---

### RNF2 — Seguridad
- Validación de inputs
- Protección anti-spam (honeypot o captcha)

---

### RNF3 — Escalabilidad
- CDN (Cloudflare)
- Backend escalable (Supabase)

---

### RNF4 — Responsive
- Mobile-first obligatorio

---

## 4. 🧠 MODELO DE DATOS

### Tabla: leads

```sql
id uuid primary key
nombre text
telefono text
tipo_evento text
num_personas int
fecha date
ubicacion text
servicios jsonb
created_at timestamp