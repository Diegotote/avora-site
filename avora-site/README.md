# AVORA Business Growth Website

Base React + Vite para la página premium de AVORA Business Growth.

## Estructura

```txt
app/
  api/send-lead.js              # Endpoint serverless para enviar leads con Resend
  public/images/
    avora-logo.png              # Logo oficial AVORA
    hero-hotel.jpg              # Imagen principal del hero
    marble-texture.jpg          # Textura oscura auxiliar
  src/
    components/                 # Navegación, logo, footer y efectos globales
    hooks/useScrollReveal.ts    # Animaciones suaves al hacer scroll
    sections/                   # Inicio, Metodología, Servicios, Membresías, Diagnóstico, FAQ
    App.tsx                     # Flujo intro -> transición -> web completa
    index.css                   # Tokens visuales, botones, cards, modales, texturas
```

## Logo

El logo se carga desde:

```txt
public/images/avora-logo.png
```

Para reemplazarlo, usa el mismo nombre de archivo o cambia la ruta en `src/components/Logo.tsx`. El logo del menú superior regresa siempre a la experiencia inicial de marca.

## Textos y membresías

Edita el contenido principal en:

- `src/sections/InicioPage.tsx`
- `src/sections/MetodologiaPage.tsx`
- `src/sections/ServiciosPage.tsx`
- `src/sections/MembresiasPage.tsx`
- `src/sections/DiagnosticoPage.tsx`
- `src/sections/FaqPage.tsx`

Las membresías viven como objetos dentro de `MembresiasPage.tsx`. Para agregar una, duplica una entrada y ajusta `name`, `badge`, `purpose`, `detail`, `includes` y `result`.

## Navegación, intro y modales

`App.tsx` controla tres fases:

1. `intro`: logo grande con “Haz clic para descubrir AVORA”.
2. `transition`: texto introductorio y botón “Entrar a AVORA”.
3. `main`: sitio completo con pestañas internas.

Las pestañas cambian con transición zoom/fade. Los modales de membresías oscurecen y desenfocan el fondo; al solicitar una membresía cierran el modal, abren Diagnóstico y dejan la membresía preseleccionada.

## Automatización de leads con Resend

Configura estas variables en Vercel o tu hosting serverless:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
LEAD_TO_EMAIL=avora.contacto@gmail.com
LEAD_FROM_EMAIL=AVORA Leads <onboarding@resend.dev>
```

Cuando verifiques tu dominio en Resend, cambia `LEAD_FROM_EMAIL` por un remitente del dominio oficial. El formulario envía un `POST` a `/api/send-lead`.

## Comandos

```bash
npm install
npm run dev
npm run build
```

En esta máquina de Codex no había `npm` disponible en el PATH, así que la compilación local depende de instalar o exponer Node/npm en el entorno.
