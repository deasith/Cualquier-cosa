# 2. Conectar OpenRouter con modelos gratis

OpenRouter es un "router" que te da acceso a muchísimos modelos (incluyendo
varios **gratis**) con una sola API key. Ideal para roleplay sin gastar.

## 2.1 Sacar la API key

1. Creá cuenta en <https://openrouter.ai>.
2. Andá a **Keys** (<https://openrouter.ai/keys>) → **Create Key**.
3. Copiá la key (empieza con `sk-or-...`). **Guardala**, no se vuelve a mostrar.

> **Privacidad (importante para RP):** los modelos `:free` suelen requerir que
> actives el uso de tus prompts para entrenamiento. Revisá
> <https://openrouter.ai/settings/privacy>. Si el roleplay es personal/sensible,
> tenelo en cuenta o pasá a KoboldCpp local (paso 4).

## 2.2 Conectar en SillyTavern

1. En SillyTavern, arriba a la izquierda, ícono de **enchufe (API Connections)**.
2. **API:** elegí **Chat Completion**.
3. **Chat Completion Source:** elegí **OpenRouter**.
4. Pegá tu **API key** en el campo correspondiente y **Connect**.
5. En **Model**, elegí uno con el sufijo **`:free`**.

## 2.3 Modelos gratis recomendados para roleplay isekai

La lista cambia seguido. Filtrá por "free" en
<https://openrouter.ai/models?max_price=0>. Al momento de escribir esto, buenos
para RP eran:

| Modelo | Por qué |
|--------|---------|
| `deepseek/deepseek-r1:free` / `deepseek/deepseek-chat-v3-0324:free` | Muy buenos en narrativa y coherencia, gratis |
| `meta-llama/llama-3.3-70b-instruct:free` | Grande, sólido para diálogo y personajes |
| `google/gemini-2.0-flash-exp:free` | Rápido, contexto largo |
| `mistralai/mistral-small-3.2-24b-instruct:free` | Buen equilibrio, poco filtrado |

> ⚠️ **Límites del tier gratis:** OpenRouter limita los modelos `:free` (ej:
> ~20 pedidos/min y un tope diario que sube si cargás algo de crédito). Si te da
> error 429, esperá o cambiá de modelo. Cargar ~10 USD de crédito sube bastante
> el tope diario aunque sigas usando modelos gratis.

## 2.4 Ajustes para que el isekai quede bien

- **Personaje:** creá o importá una *character card* (menú de personajes). Para
  isekai te conviene un personaje "Narrador/Mundo" o el clásico protagonista +
  un World Info con las reglas del mundo.
- **Presets:** en el panel de la izquierda (sliders) podés cargar un preset de
  Chat Completion. Un buen punto de partida:
  - **Temperature:** 0.9–1.1 (creatividad sin desvariar).
  - **Top P:** 0.95.
  - **Context Size:** subilo a lo que el modelo permita (Llama 70B y DeepSeek
    aguantan 32k+); más contexto = el modelo "recuerda" más de la aventura.
- **World Info / Lorebook:** para isekai es oro. Cargá entradas con la geografía,
  el sistema de magia/niveles, NPCs recurrentes. Se activan por palabras clave y
  mantienen la consistencia del mundo sin gastar todo el contexto.
- **Instrucciones del sistema:** pedile explícitamente segunda persona, ritmo de
  novela, y que no avance por vos ("no controles las acciones de {{user}}").

Con esto ya podés chatear. El siguiente paso es entrar desde el celu:
[paso 3](03-acceso-celular-red-local.md).
