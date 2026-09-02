// ===== Air Box · interacciones =====

// Año actual en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Menú móvil
const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

// Cerrar el menú al hacer clic en un enlace
links.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

// Formulario de contacto -> abre WhatsApp con el mensaje
const form = document.getElementById("form");
const hint = document.getElementById("form-hint");

// Cambia este número por el WhatsApp real de Air Box (formato internacional, solo dígitos)
const WHATSAPP_NUMBER = "000000000000";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const nombre = (data.get("nombre") || "").toString().trim();
  const telefono = (data.get("telefono") || "").toString().trim();
  const zona = (data.get("zona") || "").toString().trim();
  const mensaje = (data.get("mensaje") || "").toString().trim();

  const texto =
    `Hola Air Box, quiero solicitar el servicio de purificación de aire.%0A` +
    `Nombre: ${encodeURIComponent(nombre)}%0A` +
    `Teléfono: ${encodeURIComponent(telefono)}%0A` +
    `Zona: ${encodeURIComponent(zona)}` +
    (mensaje ? `%0AMensaje: ${encodeURIComponent(mensaje)}` : "");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
  window.open(url, "_blank", "noopener");

  hint.textContent = "¡Gracias! Te redirigimos a WhatsApp para completar tu solicitud.";
  form.reset();
});

// ===== Mapa interactivo (Leaflet) =====
// Sucursales de Air Box en zonas estratégicas de Chile.
// La casa matriz está en Penco (Concepción, Región del Biobío).
const SUCURSALES = [
  { nombre: "Antofagasta", lat: -23.6509, lng: -70.3975 },
  { nombre: "La Serena", lat: -29.9027, lng: -71.2519 },
  { nombre: "Valparaíso", lat: -33.0472, lng: -71.6127 },
  { nombre: "Santiago", lat: -33.4489, lng: -70.6693 },
  { nombre: "Penco · Casa matriz", lat: -36.7402, lng: -72.9954, base: true },
  { nombre: "Temuco", lat: -38.7359, lng: -72.5904 },
  { nombre: "Puerto Montt", lat: -41.4693, lng: -72.9424 },
];

if (window.L && document.getElementById("map")) {
  const map = L.map("map", { scrollWheelZoom: false });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap",
    maxZoom: 19,
  }).addTo(map);

  // Marcadores de las sucursales
  const puntosMapa = [];
  SUCURSALES.forEach((s) => {
    puntosMapa.push([s.lat, s.lng]);
    L.circleMarker([s.lat, s.lng], {
      radius: s.base ? 10 : 7,
      color: s.base ? "#0b2a4a" : "#0f4c81",
      fillColor: s.base ? "#38b6ff" : "#6fe3e1",
      fillOpacity: 1,
      weight: 3,
    })
      .addTo(map)
      .bindPopup("<b>Air Box " + s.nombre + "</b>");
  });
  map.fitBounds(L.latLngBounds(puntosMapa).pad(0.12));

  let clienteMarker = null;
  let lineaRuta = null;

  const empty = document.getElementById("map-empty");
  const result = document.getElementById("map-result");
  const rDistance = document.getElementById("r-distance");
  const rTime = document.getElementById("r-time");
  const rPlan = document.getElementById("r-plan");
  const rDesc = document.getElementById("r-desc");
  const rWa = document.getElementById("r-wa");

  // Distancia en km entre dos puntos (fórmula de Haversine)
  function distanciaKm(a, b) {
    const R = 6371;
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;
    const s =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((a.lat * Math.PI) / 180) *
        Math.cos((b.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
  }

  // Encuentra la sucursal más cercana al punto
  function sucursalMasCercana(punto) {
    let best = SUCURSALES[0];
    let min = Infinity;
    SUCURSALES.forEach((s) => {
      const d = distanciaKm(s, punto);
      if (d < min) { min = d; best = s; }
    });
    return { sucursal: best, km: min };
  }

  // Define plan según la distancia a la sucursal más cercana
  function calcularPlan(km) {
    if (km <= 12) {
      return {
        tier: "estandar",
        nombre: "Zona estándar",
        desc: "Estás cerca de una sucursal. Se aplica el precio base.",
      };
    }
    if (km <= 40) {
      return {
        tier: "intermedia",
        nombre: "Zona intermedia",
        desc: "Un poco más lejos de la sucursal: precio base + un ajuste por traslado.",
      };
    }
    return {
      tier: "dificil",
      nombre: "Zona de difícil acceso",
      desc: "Zona apartada de toda sucursal. El costo se ajusta por el acceso (cotización especial).",
    };
  }

  function evaluarPunto(punto, centrar) {
    const { sucursal, km } = sucursalMasCercana(punto);

    // Tiempo estimado: 15 min de preparación + trayecto a ~40 km/h
    const minutos = Math.round(15 + (km / 40) * 60);
    const plan = calcularPlan(km);

    // Marcador del cliente
    if (clienteMarker) map.removeLayer(clienteMarker);
    clienteMarker = L.marker([punto.lat, punto.lng]).addTo(map).bindPopup("Tu ubicación").openPopup();

    // Línea entre la sucursal más cercana y el cliente
    if (lineaRuta) map.removeLayer(lineaRuta);
    lineaRuta = L.polyline(
      [[sucursal.lat, sucursal.lng], [punto.lat, punto.lng]],
      { color: "#1f8ecf", weight: 3, dashArray: "6 8" }
    ).addTo(map);

    // Mostrar resultados
    empty.hidden = true;
    result.hidden = false;
    rDistance.textContent = km.toFixed(1) + " km";
    rTime.textContent = "~" + minutos + " min";
    rPlan.textContent = plan.nombre;
    rPlan.setAttribute("data-tier", plan.tier);
    rDesc.textContent = plan.desc + " Te atiende la sucursal de " + sucursal.nombre + ".";

    // Resalta la tarjeta de plan correspondiente en "Zonas y precios"
    document.querySelectorAll(".plan").forEach((p) =>
      p.classList.toggle("is-highlight", p.dataset.tier === plan.tier)
    );

    // Botón de WhatsApp con los datos
    const texto =
      `Hola Air Box, quiero solicitar una visita.%0A` +
      `Sucursal más cercana: ${encodeURIComponent(sucursal.nombre)}%0A` +
      `Distancia aprox.: ${km.toFixed(1)} km%0A` +
      `Tiempo estimado: ~${minutos} min%0A` +
      `Plan: ${encodeURIComponent(plan.nombre)}%0A` +
      `Ubicación: https://maps.google.com/?q=${punto.lat.toFixed(5)},${punto.lng.toFixed(5)}`;
    rWa.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;

    if (centrar) map.setView([punto.lat, punto.lng], Math.max(map.getZoom(), 11));
  }

  // Clic en el mapa
  map.on("click", (e) => evaluarPunto({ lat: e.latlng.lat, lng: e.latlng.lng }, false));

  // Botón "usar mi ubicación"
  const geoBtn = document.getElementById("geo-btn");
  if (geoBtn) {
    geoBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        alert("Tu navegador no permite geolocalización. Toca el mapa manualmente.");
        return;
      }
      const original = geoBtn.textContent;
      geoBtn.textContent = "📍 Buscando…";
      geoBtn.disabled = true;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          evaluarPunto({ lat: pos.coords.latitude, lng: pos.coords.longitude }, true);
          geoBtn.textContent = original;
          geoBtn.disabled = false;
        },
        () => {
          alert("No pudimos obtener tu ubicación. Puedes tocar el mapa manualmente.");
          geoBtn.textContent = original;
          geoBtn.disabled = false;
        }
      );
    });
  }

  // Recalcula el tamaño del mapa cuando entra en pantalla (evita el gris)
  const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) map.invalidateSize();
    });
  });
  mapObserver.observe(document.getElementById("map"));
}

// ===== Explorador de componentes del purificador =====
(function () {
  const svg = document.querySelector(".purifier");
  const detail = document.getElementById("comp-detail");
  if (!svg || !detail) return;

  const items = Array.from(document.querySelectorAll(".comp-item"));
  const groups = Array.from(svg.querySelectorAll(".comp"));
  const powerBtn = document.getElementById("power-btn");

  // Información detallada de cada componente
  const DATOS = {
    prefiltro: {
      n: 1, nombre: "Pre-filtro", tag: "Primera barrera",
      desc: "Es la primera malla por la que pasa el aire. Detiene las partículas más grandes para que los filtros finos no se saturen y duren más.",
      hace: ["Atrapa polvo grueso y tierra", "Retiene pelos y pelusas", "Protege al filtro HEPA"],
      eficiencia: "Partículas mayores a 10 micras",
      mantenimiento: "Lavable: enjuágalo cada 2 semanas",
    },
    hepa: {
      n: 2, nombre: "Filtro HEPA", tag: "El corazón del equipo",
      desc: "Filtro plegado de alta eficiencia. Sus miles de fibras retienen las partículas finas que flotan en el aire y que no se ven a simple vista.",
      hace: ["Polvo fino y polen", "Ácaros y caspa de mascotas", "Esporas de moho y humo fino"],
      eficiencia: "Hasta 99,97% de partículas de 0,3 micras",
      mantenimiento: "Reemplazar cada 6 a 12 meses",
    },
    carbon: {
      n: 3, nombre: "Carbón activado", tag: "Adiós a los olores",
      desc: "Capa de carbón con millones de poros microscópicos que absorben los gases y olores. Es lo que deja el ambiente con sensación de limpio.",
      hace: ["Olores de cocina y mascotas", "Humo de cigarro", "Gases y compuestos (VOC)"],
      eficiencia: "Absorbe gases y malos olores",
      mantenimiento: "Reemplazar cada 6 meses aprox.",
    },
    uv: {
      n: 4, nombre: "Lámpara UV-C", tag: "Desinfección",
      desc: "Luz ultravioleta germicida que actúa sobre los microorganismos que pasan por el equipo, inactivándolos para que no se reproduzcan.",
      hace: ["Bacterias", "Virus", "Hongos y moho"],
      eficiencia: "Luz UV-C germicida (254 nm)",
      mantenimiento: "Cambiar la lámpara cada ~1 año",
    },
    fan: {
      n: 5, nombre: "Ventilador", tag: "El motor del aire",
      desc: "Aspira el aire de la sala y lo empuja a través de todas las capas de filtros. Su velocidad define cuánto aire se limpia por hora.",
      hace: ["Hace circular el aire de la sala", "Varias velocidades", "Distribuye el aire ya limpio"],
      eficiencia: "Hasta ~3 renovaciones de aire por hora",
      mantenimiento: "Sin mantenimiento; solo mantener limpio",
    },
  };

  let selected = null;

  function highlight(comp) {
    svg.classList.toggle("has-active", !!comp);
    groups.forEach((g) => g.classList.toggle("is-on", g.dataset.comp === comp));
    items.forEach((it) => it.classList.toggle("is-on", it.dataset.comp === comp));
  }

  function renderDetail(comp) {
    const d = DATOS[comp];
    const lista = d.hace.map((t) => `<li>${t}</li>`).join("");
    detail.innerHTML =
      '<div class="comp-card">' +
        '<div class="comp-card__head">' +
          '<span class="comp-card__n">' + d.n + "</span>" +
          "<div><h3>" + d.nombre + '</h3><span class="comp-card__tag">' + d.tag + "</span></div>" +
        "</div>" +
        '<p class="comp-card__desc">' + d.desc + "</p>" +
        '<p class="comp-card__label">Qué elimina / hace</p>' +
        '<ul class="comp-card__list">' + lista + "</ul>" +
        '<div class="comp-card__stats">' +
          '<div class="comp-stat"><span>Eficiencia</span><strong>' + d.eficiencia + "</strong></div>" +
          '<div class="comp-stat"><span>Mantenimiento</span><strong>' + d.mantenimiento + "</strong></div>" +
        "</div>" +
      "</div>";
  }

  function select(comp) {
    selected = comp;
    highlight(comp);
    renderDetail(comp);
    items.forEach((it) => it.classList.toggle("is-selected", it.dataset.comp === comp));
    groups.forEach((g) => g.classList.toggle("is-selected", g.dataset.comp === comp));
  }

  function bind(el) {
    const comp = el.dataset.comp;
    el.addEventListener("mouseenter", () => highlight(comp));
    el.addEventListener("click", () => select(comp));
    el.addEventListener("focus", () => highlight(comp));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(comp); }
    });
  }
  items.forEach(bind);
  groups.forEach(bind);
  svg.addEventListener("mouseleave", () => highlight(selected));

  // Botón encender / apagar (anima ventilador y flujo de aire)
  if (powerBtn) {
    const txt = powerBtn.querySelector(".power-btn__txt");
    powerBtn.addEventListener("click", () => {
      const on = svg.classList.toggle("running");
      powerBtn.setAttribute("aria-pressed", String(on));
      powerBtn.classList.toggle("is-on", on);
      if (txt) txt.textContent = on ? "Apagar" : "Encender";
    });
  }
})();

// ===== Animaciones de aparición al hacer scroll =====
const revealEls = document.querySelectorAll(
  ".card, .timeline__item, .plan, .section__head, .product__text, .product__art, .contact__form, .mapinfo, .vs__card, .sim, .ba"
);
revealEls.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = (entry.target.dataset.delay || 0) + "ms";
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// Pequeño retardo escalonado dentro de cada grupo de tarjetas
document.querySelectorAll(".cards, .plans, .timeline").forEach((group) => {
  [...group.children].forEach((child, i) => {
    child.dataset.delay = i * 90;
  });
});

// Resaltar el enlace de navegación de la sección visible
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.style.color =
            link.getAttribute("href") === `#${id}` ? "var(--blue-700)" : "";
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((s) => observer.observe(s));

// ===== Partículas del hero =====
(function () {
  const canvas = document.querySelector(".hero__particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w = 0, h = 0, particles = [];
  const mouse = { x: -9999, y: -9999 };

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    const count = Math.min(70, Math.floor(w / 16));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.5 + 1,
      vy: -(Math.random() * 0.4 + 0.1),
      vx: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.5 + 0.2,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(180, 230, 255," + p.a + ")";
      ctx.fill();
    });
  }

  function tick() {
    particles.forEach((p) => {
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 6400) {
        const dist = Math.sqrt(d2) + 1;
        const f = ((6400 - d2) / 6400) * 0.8;
        p.x += (dx / dist) * f;
        p.y += (dy / dist) * f;
      }
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
    });
    draw();
    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener("resize", resize);
  const hero = canvas.closest(".hero");
  if (hero) {
    hero.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    hero.addEventListener("pointerleave", () => { mouse.x = -9999; mouse.y = -9999; });
  }
  if (reduce) draw();
  else tick();
})();

// ===== Antes y después (comparador) =====
(function () {
  const range = document.getElementById("ba-range");
  const before = document.getElementById("ba-before");
  const divider = document.getElementById("ba-divider");
  if (!range || !before || !divider) return;
  function update() {
    const v = range.value;
    before.style.width = v + "%";
    divider.style.left = v + "%";
  }
  range.addEventListener("input", update);
  update();
})();

// ===== Simulador de purificación =====
(function () {
  const m2 = document.getElementById("sim-m2");
  if (!m2) return;
  const m2out = document.getElementById("sim-m2out");
  const spds = Array.from(document.querySelectorAll(".sim__spd"));
  const outVol = document.getElementById("sim-vol");
  const outAch = document.getElementById("sim-ach");
  const outTime = document.getElementById("sim-time");
  let cadr = 220; // capacidad del equipo en m³/h

  function calc() {
    const area = Number(m2.value);
    const vol = area * 2.5;                       // volumen de aire (altura 2,5 m)
    const ach = cadr / vol;                       // renovaciones de aire por hora
    const minutos = Math.round((3 / ach) * 60);   // 3 renovaciones = purificación completa
    m2out.textContent = area + " m²";
    outVol.textContent = Math.round(vol) + " m³";
    outAch.textContent = ach.toFixed(1) + " /h";
    outTime.textContent = "≈ " + minutos + " min";
  }

  m2.addEventListener("input", calc);
  spds.forEach((b) =>
    b.addEventListener("click", () => {
      spds.forEach((x) => x.classList.remove("is-active"));
      b.classList.add("is-active");
      cadr = Number(b.dataset.cadr);
      calc();
    })
  );
  calc();
})();

// ===== Juego secreto (easter egg): Corona Estelar =====
(function () {
  const egg = document.getElementById("egg");
  const frame = document.getElementById("egg-frame");
  const closeBtn = document.getElementById("egg-close");
  const dot = document.getElementById("egg-trigger");
  const toast = document.getElementById("egg-toast");
  if (!egg || !frame) return;
  const SRC = "corona-estelar.html";
  let toastTimer;

  function showToast() {
    if (!toast) return;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2600);
  }
  function openGame() {
    if (frame.getAttribute("src") !== SRC) frame.setAttribute("src", SRC);
    egg.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeGame() {
    egg.hidden = true;
    document.body.style.overflow = "";
    frame.setAttribute("src", "about:blank"); // detiene el juego al cerrar
  }
  function unlock() { showToast(); openGame(); }

  if (closeBtn) closeBtn.addEventListener("click", closeGame);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !egg.hidden) closeGame();
  });

  // Disparador: al tocar el punto pide una contraseña
  const PASSWORD = "bruno";
  function pedirClave() {
    const clave = window.prompt("🔒 Ingresa la contraseña para el juego secreto:");
    if (clave === null) return; // canceló
    if (clave.trim().toLowerCase() === PASSWORD) {
      unlock();
    } else {
      alert("Contraseña incorrecta.");
    }
  }
  if (dot) {
    dot.addEventListener("click", pedirClave);
    dot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pedirClave(); }
    });
  }

  // Disparador de escritorio: código Konami (↑ ↑ ↓ ↓ ← → ← → B A)
  const KONAMI = ["arrowup","arrowup","arrowdown","arrowdown","arrowleft","arrowright","arrowleft","arrowright","b","a"];
  let idx = 0;
  document.addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    if (k === KONAMI[idx]) {
      idx++;
      if (idx === KONAMI.length) { idx = 0; unlock(); }
    } else {
      idx = (k === KONAMI[0]) ? 1 : 0;
    }
  });
})();
