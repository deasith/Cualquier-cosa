# 1. Instalar SillyTavern

SillyTavern es una interfaz (frontend) para chatear con modelos de IA. No trae
el modelo: vos lo conectás a un servicio (OpenRouter) o a un motor local
(KoboldCpp). Corre con **Node.js**.

## Requisitos previos

| Requisito | Versión | Link |
|-----------|---------|------|
| **Node.js** | 18 o superior (usá la LTS) | <https://nodejs.org> |
| **Git** | cualquiera reciente (opcional pero recomendado para actualizar) | <https://git-scm.com> |

En Windows, al instalar Node.js dejá tildado "Add to PATH". No hace falta el
componente de "herramientas de compilación de Chocolatey".

## Windows (recomendado)

### Opción A — Con Git (recomendada, se actualiza fácil)

1. Instalá **Git** y **Node.js LTS** (links arriba).
2. Abrí una carpeta donde quieras tener el programa (ej: `C:\IA`).
3. Click derecho → "Abrir en Terminal" (o abrí PowerShell y `cd C:\IA`).
4. Cloná el repo:
   ```powershell
   git clone https://github.com/SillyTavern/SillyTavern
   cd SillyTavern
   ```
5. Ejecutá **`Start.bat`** (doble clic o `.\Start.bat`). La primera vez instala
   dependencias solo; puede tardar un par de minutos.
6. Cuando veas `SillyTavern is listening on: http://localhost:8000`, abrí esa
   dirección en el navegador.

Para **actualizar** en el futuro: doble clic en `UpdateAndStart.bat`.

### Opción B — SillyTavern Launcher (todo automático)

Si no querés instalar nada a mano, existe el **SillyTavern Launcher**, que
instala Git, Node y SillyTavern por vos (y hasta KoboldCpp). Está en
<https://github.com/SillyTavern/SillyTavern-Launcher>. Bajás `installer.bat`,
lo corrés y seguís el menú. Buena opción si querés lo más "un clic" posible.

## Linux

```bash
# Instalar Node.js LTS y Git (ejemplo Debian/Ubuntu)
sudo apt update && sudo apt install -y git nodejs npm

# Verificá que Node sea 18+ ; si tu distro trae una versión vieja,
# usá nvm: https://github.com/nvm-sh/nvm

git clone https://github.com/SillyTavern/SillyTavern
cd SillyTavern
./start.sh
```

Si `start.sh` no tiene permisos: `chmod +x start.sh`.

## ¿Funcionó?

Cuando entrás a `http://localhost:8000` deberías ver la interfaz de SillyTavern.
Todavía no responde ningún personaje porque falta conectar un modelo: eso es el
[paso 2](02-openrouter-modelos-gratis.md).

> **Nota:** la primera vez SillyTavern crea la carpeta `data/` con tu config,
> personajes, chats, etc. Ahí también aparece el `config.yaml` que vas a editar
> en el [paso 3](03-acceso-celular-red-local.md).
