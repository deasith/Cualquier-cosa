# Cualquier-cosa — Setup SillyTavern (roleplay isekai)

Guía completa para instalar **SillyTavern** para roleplay isekai, conectarlo a
**OpenRouter** con modelos gratis, entrar desde el **celular por la red local**
con **auth básica**, y más adelante probar **KoboldCpp** local.

> **SO recomendado: Windows** (por la facilidad de KoboldCpp con GPU y los
> ejecutables "un clic"). Cada paso incluye notas para Linux igual.

## Índice

1. [Instalar SillyTavern](docs/01-instalar-sillytavern.md)
2. [Conectar OpenRouter con modelos gratis](docs/02-openrouter-modelos-gratis.md)
3. [Entrar desde el celu por red local + auth básica](docs/03-acceso-celular-red-local.md)
4. [KoboldCpp local (opcional, más adelante)](docs/04-koboldcpp-local.md)

## Archivos útiles

- [`config/config.yaml.ejemplo`](config/config.yaml.ejemplo) — plantilla de
  configuración de SillyTavern lista para red local + auth básica.

## Ruta rápida (TL;DR)

1. Instalá **Git** y **Node.js LTS**.
2. `git clone https://github.com/SillyTavern/SillyTavern` y corré `Start.bat`
   (Windows) o `./start.sh` (Linux).
3. Sacá tu API key en <https://openrouter.ai> → en SillyTavern elegí
   *Chat Completion → OpenRouter* y pegá la key.
4. Editá `config.yaml`: `listen: true`, `basicAuthMode: true`, poné
   usuario/contraseña, `whitelistMode: false`.
5. Desde el celu (misma WiFi): entrá a `http://IP-DE-TU-PC:8000`.

> ⚠️ **Seguridad:** activá auth básica **antes** de exponer el puerto a la red.
> Nunca abras SillyTavern a internet sin auth. Ver el paso 3.
