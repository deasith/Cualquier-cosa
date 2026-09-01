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
4. **Sucursales (mapa):** en `script.js`, edita la lista `SUCURSALES` (nombre,
   `lat`, `lng`) para añadir, quitar o mover sucursales. La casa matriz lleva
   `base: true`. El mapa calcula todo respecto a la sucursal más cercana.

## Mapa interactivo

La sección **"Mapa"** usa [Leaflet](https://leafletjs.com/) con OpenStreetMap.
Hay sucursales en zonas estratégicas de Chile (Antofagasta, La Serena,
Valparaíso, Santiago, **Penco/Concepción** como casa matriz, Temuco y Puerto
Montt). Al hacer clic en cualquier punto, calcula respecto a la **sucursal más
cercana**:

- **Distancia** (fórmula de Haversine).
- **Tiempo estimado** (15 min de preparación + trayecto a ~40 km/h).
- **Plan sugerido:** ≤12 km estándar, ≤40 km intermedia, más lejos difícil acceso.

## Producto (ilustración interactiva)

La sección **"Producto"** muestra el purificador **horizontal** en vista de corte
(con patas y componentes internos). El aire entra por la izquierda y sale limpio
por la derecha, pasando por: 1) pre-filtro, 2) filtro HEPA, 3) carbón activado,
4) lámpara UV-C y 5) ventilador. Al pasar el cursor se resalta la pieza y, al
**hacer clic** en un componente (en el dibujo o en su botón), se abre una
**ficha detallada** con su descripción, qué elimina, su eficiencia y su
mantenimiento. El botón **Encender** anima el ventilador y el flujo de aire.
Además, al calcular una visita en el mapa se **resalta la tarjeta del plan**
correspondiente en "Zonas y precios".

## Otras funciones

- **Usar mi ubicación:** botón en el mapa que usa la geolocalización del
  navegador para ubicarte automáticamente (requiere HTTPS, p. ej. GitHub Pages).
- **Preguntas frecuentes:** sección con acordeón.
- **Partículas animadas** en el inicio (reaccionan al cursor).
- **Beneficios para la salud:** tarjetas con íconos.
- **Antes y después:** comparador deslizable del aire.
- **Comparación** con Air Box vs. sin Air Box.
- **Simulador:** calcula el tiempo de purificación según el tamaño de la sala y la
  velocidad del equipo.
- Animaciones al hacer scroll y menú responsivo para el celular.

## 🎮 Juego secreto (easter egg)

La página esconde un guiño al juego **Corona Estelar — El Frente Eterno**
(`corona-estelar.html`), un shooter táctico top-down. Se abre dentro de la
misma página, en una capa a pantalla completa. Para desbloquearlo:

- **Celular:** toca 5 veces seguidas el puntito `◦` que está al final del pie de
  página (junto a “Proyecto escolar”).
- **Computador:** ingresa el código Konami: ↑ ↑ ↓ ↓ ← → ← → B A.

Cierra el juego con el botón **✕ Cerrar** o la tecla `Esc`.

> Nota: el mapa necesita conexión a internet para cargar Leaflet y las calles.
