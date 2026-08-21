# Air Box · Página web

Página web para **Air Box**, un servicio de purificación de aire a domicilio.

## ¿Qué ofrece Air Box?

- **Servicio:** el cliente contacta por WhatsApp o desde la página, vamos a su
  ubicación (cualquier zona; el costo sube en zonas de difícil acceso) y
  realizamos el proceso de purificación del aire con nuestra máquina.
- **Producto:** el equipo purificador junto con las instrucciones de cómo
  funciona y cómo usarlo.

## Archivos

| Archivo       | Descripción                                  |
|---------------|----------------------------------------------|
| `index.html`  | Estructura y contenido de la página          |
| `styles.css`  | Estilos y diseño responsivo                  |
| `script.js`   | Menú móvil, formulario y pequeñas animaciones |

## Cómo verla

Abre `index.html` en cualquier navegador (doble clic). No necesita instalación.

## Personalizar antes de entregar

1. **Número de WhatsApp:** cámbialo en dos lugares:
   - `script.js` → constante `WHATSAPP_NUMBER` (solo dígitos, formato internacional, ej. `51987654321`).
   - `index.html` → enlace `https://wa.me/000000000000...` en la sección de contacto.
2. **Datos de contacto:** teléfono, correo y horario en la sección "Contacto".
3. **Precios:** ajusta los textos de la sección "Zonas y precios" si quieres montos concretos.
4. **Ubicación de la base (mapa):** en `script.js`, cambia la constante `BASE`
   (`lat`, `lng`) por las coordenadas reales desde donde sale Air Box. El mapa
   calcula la distancia, el tiempo estimado y el plan desde ese punto.

## Mapa interactivo

La sección **"Mapa"** usa [Leaflet](https://leafletjs.com/) con OpenStreetMap.
Al hacer clic en cualquier punto, calcula:

- **Distancia** desde la base (fórmula de Haversine).
- **Tiempo estimado** (15 min de preparación + trayecto a ~30 km/h).
- **Plan sugerido:** ≤5 km estándar, ≤15 km intermedia, más lejos difícil acceso.

> Nota: el mapa necesita conexión a internet para cargar Leaflet y las calles.
