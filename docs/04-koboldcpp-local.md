# 4. KoboldCpp local (opcional, más adelante)

KoboldCpp te deja correr un modelo **en tu propia PC**, sin internet ni límites
de OpenRouter y con **privacidad total**. Ideal para RP sin filtros. Necesitás
un modelo en formato **GGUF** y, ojalá, una **GPU NVIDIA** (anda en CPU también,
pero más lento).

## 4.1 ¿Anda en tu PC? (guía rápida de VRAM)

Elegí el tamaño del modelo según tu VRAM (memoria de la placa de video):

| VRAM | Modelo sugerido | Cuantización |
|------|-----------------|--------------|
| 6 GB | 7–8B (ej. Llama 3.1 8B RP) | Q4_K_M |
| 8–10 GB | 8–12B (ej. Mistral Nemo 12B) | Q4_K_M / Q5_K_M |
| 12–16 GB | 12–22B | Q4_K_M / Q5_K_M |
| 24 GB | 22–34B | Q4_K_M |

Sin GPU: podés correr un 7–8B en CPU, pero esperá varios segundos por respuesta.

## 4.2 Descargar KoboldCpp

Releases oficiales: <https://github.com/LostRuins/koboldcpp/releases>

- **Windows + NVIDIA:** `koboldcpp.exe` (trae CUDA incluido).
- **Windows sin GPU / GPU vieja:** `koboldcpp_nocuda.exe`.
- **Linux:** `koboldcpp-linux-x64`, después `chmod +x koboldcpp-linux-x64`.

Es un solo ejecutable, no instala nada.

## 4.3 Bajar un modelo GGUF

De Hugging Face. Buscá cuantizaciones GGUF (el usuario **bartowski** sube muchas
al día). Ejemplos buenos para roleplay:

- **Mistral Nemo 12B** (variantes RP tipo *NemoMix* / *Rocinante*) — muy usado
  para RP, buen tamaño para 8–12 GB de VRAM.
- **Llama 3.1 8B** afinado para RP (ej. *Stheno*, *Lunaris*).

Bajá un solo archivo `.gguf` (ej: `...Q4_K_M.gguf`).

## 4.4 Iniciar KoboldCpp

1. Doble clic en `koboldcpp.exe` → se abre la ventana de launcher.
2. En **Model**, seleccioná tu archivo `.gguf`.
3. **GPU Layers:** subilo alto (ej. 99 para que meta todo en la GPU si entra).
   Si te queda sin VRAM/crashea, bajalo.
4. **Context Size:** 8192 para arrancar (subilo si tenés VRAM de sobra).
5. **Launch**. Cuando termine de cargar, sirve en `http://localhost:5001`.

Por línea de comandos (Linux o quien prefiera):
```bash
./koboldcpp-linux-x64 --model modelo.Q4_K_M.gguf --gpulayers 99 --contextsize 8192
```

## 4.5 Conectar SillyTavern a KoboldCpp

1. En SillyTavern → **API Connections** (enchufe).
2. **API:** elegí **Text Completion**.
3. **API Type:** **KoboldCpp**.
4. **Server URL:** `http://localhost:5001`.
5. **Connect**. Debería detectar el modelo cargado.

> **Text Completion vs Chat Completion:** con KoboldCpp usás *Text Completion*,
> así que conviene cargar un **Context Template** y un **Instruct Template** que
> matcheen el modelo (ej. plantilla "Llama 3" o "Mistral"/"ChatML" según el
> modelo). SillyTavern trae varios prearmados en el panel de la izquierda.

## 4.6 Y desde el celu igual funciona

El celu se conecta a **SillyTavern** (paso 3), y SillyTavern se conecta a
KoboldCpp en la misma PC (`localhost:5001`). No hace falta tocar nada en el celu:
seguís entrando a `http://IP-DE-TU-PC:8000`. Solo asegurate de tener KoboldCpp
abierto en la PC cuando quieras usar el modelo local.
