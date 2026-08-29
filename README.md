# Corona Estelar — El Frente Eterno

Un **shooter táctico top-down** de guerra galáctica que mezcla **D&D**, **Helldivers 2** y **el peso real de
cada decisión**. Tomas el mando de un *Vindicado*, desciendes a un sector infestado y **lo mueves tú mismo**
por el campo de batalla contra los enjambres de la Plaga. Cada bala cuenta; los compañeros que caen no vuelven.

## Cómo jugar

Abre `index.html` en cualquier navegador. Un solo archivo, sin dependencias ni servidor. La partida se guarda
sola en tu navegador (`localStorage`).

**Controles (escritorio):** `WASD`/flechas mover · **ratón** apuntar · **clic** disparar · `Q` cambiar arma ·
`R` recargar · `ESPACIO` esquivar · `1`-`4` estimulantes · `C` refuerzos SEAF · `P`/`ESC` pausa.
En el puente: `WASD` para caminar y `E` para hablar con la tripulación.
**Táctil:** joystick + botón **FUEGO** (auto-apuntado), y botones de arma, estim y SEAF.

## Qué hay dentro

- **El Puente "La Supertierra"** — un lobby **caminable**: mueve a tu Vindicado por la nave insignia, con una
  holomesa central que muestra el estado del frente y **NPCs con los que hablas** (Comandante Valen / Mando,
  Intendenta Roska / Armería & Estims, Sargento Kell / Sala de héroes, Oficial Wren / Comms, Archivista Sib /
  Bestiario). Cada uno tiene retrato, personalidad y abre su función.
- **Bases de personaje pre-hechas** — 6 Vindicados listos (Centinela del Trono, Rompemuros de Karr, Cazador de
  Sombraverde, Coloso de Piedra, Marcado, Autómata del Gremio), cada uno con **temperamento y frases propias**.
  Eliges uno, le pones nombre y un arma secundaria. La base define vida, velocidad, arma primaria y un rasgo pasivo.
- **Estimulantes** — 4 cargas limitadas por despliegue (teclas 1-4): **Combate** (cura), **Furia** (+daño/cadencia),
  **Vigor** (+velocidad) y **Coraza** (−daño recibido).
- **Refuerzos SEAF** — llama al Ejército del Trono (tecla C, con enfriamiento): soldados aliados equilibrados que
  aguantan, disparan y se repliegan tras un tiempo. Ni rotos ni inútiles.
- **Escuadra que se apoya** — tus compañeros tienen personalidad, usan sus propios estims para curarse y te
  cubren cuando flaqueas, con mensajes de radio contextuales durante la batalla.
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
