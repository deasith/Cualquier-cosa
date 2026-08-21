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
  const desc = document.getElementById("comp-desc");
  if (!svg || !desc) return;

  const items = document.querySelectorAll(".comp-item");
  const groups = svg.querySelectorAll(".comp");
  const textos = {
    fan: "Ventilador — aspira el aire de la sala y lo hace circular por todos los filtros.",
    uv: "Lámpara UV-C — elimina bacterias, virus y hongos con luz ultravioleta.",
    carbon: "Carbón activado — atrapa olores, humo y gases del ambiente.",
    hepa: "Filtro HEPA — retiene hasta el 99,97% del polvo, polen y partículas finas.",
    prefiltro: "Pre-filtro — detiene el polvo grueso, los pelos y las pelusas más grandes.",
  };
  const base = "Pasa el cursor (o toca) un componente para ver qué hace.";

  function activar(comp) {
    svg.classList.toggle("has-active", !!comp);
    groups.forEach((g) => g.classList.toggle("is-on", g.dataset.comp === comp));
    items.forEach((it) => it.classList.toggle("is-on", it.dataset.comp === comp));
    desc.textContent = comp ? textos[comp] : base;
  }

  function bind(el) {
    const comp = el.dataset.comp;
    el.addEventListener("mouseenter", () => activar(comp));
    el.addEventListener("click", () => activar(comp));
    el.addEventListener("focus", () => activar(comp));
  }
  items.forEach(bind);
  groups.forEach(bind);
  svg.addEventListener("mouseleave", () => activar(null));
})();

// ===== Animaciones de aparición al hacer scroll =====
const revealEls = document.querySelectorAll(
  ".card, .timeline__item, .plan, .section__head, .product__text, .product__art, .contact__form, .mapinfo"
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
