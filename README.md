# Corona Estelar — El Frente Eterno

Un **shooter táctico top-down** de guerra galáctica que mezcla **D&D**, **Helldivers 2** y **el peso real de
cada decisión**. Tomas el mando de un *Vindicado*, desciendes a un sector infestado y **lo mueves tú mismo**
por el campo de batalla contra los enjambres de la Plaga. Cada bala cuenta; los compañeros que caen no vuelven.

## Cómo jugar

Abre `index.html` en cualquier navegador. Un solo archivo, sin dependencias ni servidor. La partida se guarda
sola en tu navegador (`localStorage`).

**Controles (escritorio):** `WASD`/flechas mover · **ratón** apuntar · **clic** disparar · `Q` cambiar arma ·
`R` recargar · `ESPACIO` esquivar · `P`/`ESC` pausa.
**Táctil:** joystick izquierdo para moverte, botón **FUEGO** (auto-apuntado al enemigo más cercano) y `⟳` para cambiar de arma.

## Qué hay dentro

- **Bases de personaje pre-hechas** — 6 Vindicados listos (Centinela del Trono, Rompemuros de Karr, Cazador de
  Sombraverde, Coloso de Piedra, Marcado, Autómata del Gremio). Eliges uno, le pones nombre y un arma
  secundaria. Cada base define vida, velocidad, arma primaria y un rasgo pasivo.
- **Mapa jugable top-down** — arena en canvas con cámara que te sigue, coberturas y oleadas. Te mueves y
  disparas en tiempo real.
- **Personajes que aparecen** — tu token (con corona) y **compañeros de escuadra con IA** que te siguen,
  disparan y pueden **morir de forma permanente**.
- **Enemigos con comportamientos** — Esporling (enjambre), Escupidor (bombardeo a distancia), Bruto
  (acorazado), Reventón (explota al morir) e Infectado (hostigador que dispara en ráfagas).
- **Sistema de armas** — 6 armas con daño, cadencia, dispersión, munición y recarga reales: Fusil de Cadena,
  Escopeta de Asedio, Rifle de Precisión, Cañón Pesado (explosivo), Repetidor de Latón y Lanzaesporas (área).
- **Jefe de la Plaga** — la Reina, con **3 fases** (invoca crías, salvas radiales de esporas, cargas al
  enfurecerse). Derribarla libera el sector.
- **Guerra galáctica compartida** — 6 sectores con control imperial; ganar sube el control y baja la Plaga,
  perder la deja avanzar. **Permadeath** del héroe (entra en la lista de honor y la galaxia sigue sin él).
- **Códices y noticias** — Armería, Bestiario, partes de guerra, edictos del Trono y la lista de caídos.

## Estructura

- `index.html` — el juego completo (HTML + CSS + Canvas/JS, autónomo).

*Por la Corona. Por la galaxia. Ni un paso atrás.*
