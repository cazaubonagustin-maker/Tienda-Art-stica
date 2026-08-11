document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("revealed"));
  }

  const backTop = document.getElementById("backTop");
  if (backTop) {
    window.addEventListener("scroll", () => {
      backTop.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });

    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;
      galleryItems.forEach((item) => {
        item.classList.toggle(
          "is-hidden",
          filter !== "all" && item.dataset.category !== filter
        );
      });
    });
  });

  const form = document.getElementById("contactForm");
  const message = document.getElementById("formMessage");

  if (form && message) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        message.textContent = "Completá los campos obligatorios para enviar la consulta.";
        return;
      }

      message.textContent = "¡Gracias! Tu consulta fue preparada correctamente. En una web real, este formulario se conectaría a un servicio de envío.";
      form.reset();
      form.classList.remove("was-validated");
    });
  }
});