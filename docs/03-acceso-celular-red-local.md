# 3. Entrar desde el celu por red local + auth básica

La idea: SillyTavern corre en tu PC, y desde el celular (conectado a la **misma
WiFi**) entrás por el navegador. Como vas a exponer el puerto a la red de casa,
**activá auth básica sí o sí** para que nadie más en la red entre sin contraseña.

## 3.1 Editar `config.yaml`

El archivo está en la carpeta de SillyTavern (raíz del proyecto, o dentro de
`data/` según la versión). Cerrá SillyTavern, abrí `config.yaml` con un editor de
texto (Notepad, VS Code) y ajustá estos campos:

```yaml
# Escuchar en todas las interfaces de red (no solo localhost)
listen: true

# Puerto (dejá 8000 salvo que lo necesites cambiar)
port: 8000

# Desactivar el filtro por IP y protegerse con auth básica en su lugar
whitelistMode: false

# Activar usuario y contraseña
basicAuthMode: true
basicAuthUser:
  username: elusuarioquequieras
  password: unaContraseñaLargaYUnica
```

Tenés una plantilla completa lista para copiar en
[`config/config.yaml.ejemplo`](../config/config.yaml.ejemplo).

> **Alternativa más estricta:** en vez de `whitelistMode: false`, podés dejarlo
> en `true` y agregar la IP del celu a la lista `whitelist:`. Es más seguro pero
> más molesto (la IP del celu puede cambiar). Para casa, **auth básica con
> contraseña fuerte alcanza**.

Guardá y volvé a iniciar SillyTavern (`Start.bat` / `./start.sh`).

## 3.2 Averiguar la IP de tu PC en la red local

**Windows:**
```powershell
ipconfig
```
Buscá "Dirección IPv4" de tu adaptador WiFi/Ethernet (algo como `192.168.0.15`
o `192.168.1.20`).

**Linux:**
```bash
ip addr show | grep "inet "
# o
hostname -I
```

## 3.3 Entrar desde el celu

1. Conectá el celu a la **misma red WiFi** que la PC.
2. En el navegador del celu andá a: `http://LA-IP-DE-TU-PC:8000`
   (ej: `http://192.168.0.15:8000`).
3. Te va a pedir el **usuario y contraseña** que pusiste en `config.yaml`.
4. Listo, misma interfaz que en la compu.

> **Tip:** agregá esa dirección a la pantalla de inicio del celu (menú del
> navegador → "Agregar a pantalla de inicio") y queda como una "app".

## 3.4 Si no entra (troubleshooting)

- **El navegador no carga nada:** es el **Firewall de Windows**. La primera vez
  que iniciás con `listen: true`, Windows suele preguntar si permitís Node.js en
  redes **privadas** → decí que **sí**. Si no apareció, permitilo a mano:
  *Firewall de Windows Defender → Permitir una aplicación → Node.js* (red
  privada). En Linux, ajustá `ufw`: `sudo ufw allow 8000/tcp`.
- **Pide IP en whitelist / "Forbidden":** te faltó `whitelistMode: false`
  (o agregar la IP del celu a `whitelist`).
- **La IP de la PC cambia sola:** reservá una IP fija para la PC en el router
  (DHCP estático) así la dirección no se te mueve.
- **Estás en redes distintas:** si la PC está por Ethernet y el celu por WiFi
  pero es el mismo router, suele andar igual. Si tenés WiFi de "invitados",
  pasate a la principal (las de invitados aíslan los dispositivos).

## 3.5 Seguridad — leelo

- **Nunca** abras el puerto 8000 a **internet** (port forwarding) con solo auth
  básica. Auth básica sirve para tu red de casa, no para exponerte al mundo.
- Usá una **contraseña larga y única**, no `1234`.
- Si algún día querés acceso desde afuera de casa, hacelo con una **VPN**
  (ej: Tailscale) en vez de abrir el puerto. Es gratis y seguro.
