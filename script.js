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
