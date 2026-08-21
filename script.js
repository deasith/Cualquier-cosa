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
// Cambia BASE por la ubicación real de Air Box [latitud, longitud].
const BASE = { lat: -12.0464, lng: -77.0428, nombre: "Base Air Box" }; // Ej.: Lima, Perú

if (window.L && document.getElementById("map")) {
  const map = L.map("map").setView([BASE.lat, BASE.lng], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap",
    maxZoom: 19,
  }).addTo(map);

  // Marcador de la base
  L.circleMarker([BASE.lat, BASE.lng], {
    radius: 9, color: "#0f4c81", fillColor: "#38b6ff", fillOpacity: 1, weight: 3,
  })
    .addTo(map)
    .bindPopup("<b>" + BASE.nombre + "</b><br>Salimos desde aquí");

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

  // Define plan según la distancia
  function calcularPlan(km) {
    if (km <= 5) {
      return {
        tier: "estandar",
        nombre: "Zona estándar",
        desc: "Zona de fácil acceso. Se aplica el precio base.",
      };
    }
    if (km <= 15) {
      return {
        tier: "intermedia",
        nombre: "Zona intermedia",
        desc: "Un poco más lejos. Precio base + un ajuste por traslado.",
      };
    }
    return {
      tier: "dificil",
      nombre: "Zona de difícil acceso",
      desc: "Zona apartada. El costo se ajusta por el acceso (cotización especial).",
    };
  }

  map.on("click", (e) => {
    const punto = { lat: e.latlng.lat, lng: e.latlng.lng };
    const km = distanciaKm(BASE, punto);

    // Tiempo estimado: 15 min de preparación + trayecto a ~30 km/h
    const minutos = Math.round(15 + (km / 30) * 60);
    const plan = calcularPlan(km);

    // Marcador del cliente
    if (clienteMarker) map.removeLayer(clienteMarker);
    clienteMarker = L.marker([punto.lat, punto.lng]).addTo(map).bindPopup("Tu ubicación").openPopup();

    // Línea entre base y cliente
    if (lineaRuta) map.removeLayer(lineaRuta);
    lineaRuta = L.polyline(
      [[BASE.lat, BASE.lng], [punto.lat, punto.lng]],
      { color: "#1f8ecf", weight: 3, dashArray: "6 8" }
    ).addTo(map);

    // Mostrar resultados
    empty.hidden = true;
    result.hidden = false;
    rDistance.textContent = km.toFixed(1) + " km";
    rTime.textContent = "~" + minutos + " min";
    rPlan.textContent = plan.nombre;
    rPlan.setAttribute("data-tier", plan.tier);
    rDesc.textContent = plan.desc;

    // Botón de WhatsApp con los datos
    const texto =
      `Hola Air Box, quiero solicitar una visita.%0A` +
      `Distancia aprox.: ${km.toFixed(1)} km%0A` +
      `Tiempo estimado: ~${minutos} min%0A` +
      `Plan: ${encodeURIComponent(plan.nombre)}%0A` +
      `Ubicación: https://maps.google.com/?q=${punto.lat.toFixed(5)},${punto.lng.toFixed(5)}`;
    rWa.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
  });

  // Recalcula el tamaño del mapa cuando entra en pantalla (evita el gris)
  const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) map.invalidateSize();
    });
  });
  mapObserver.observe(document.getElementById("map"));
}

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
