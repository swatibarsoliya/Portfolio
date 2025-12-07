// =========================
// 1. DOMContentLoaded Scripts
// =========================
document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // 1. AOS Animation Init
  // =========================
  if (AOS) {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });
  }

  // =========================
  // 2. Mobile Navigation
  // =========================
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const header = document.querySelector("header");

  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
    mobileMenuButton.innerHTML = mobileMenu.classList.contains("hidden")
      ? '<i class="ri-menu-line ri-lg"></i>'
      : '<i class="ri-close-line ri-lg"></i>';
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
      mobileMenuButton.innerHTML = '<i class="ri-menu-line ri-lg"></i>';
    });
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("py-2", "shadow-md");
    } else {
      header.classList.remove("py-2", "shadow-md");
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // =========================
  // 3. Back to Top Button
  // =========================
  const backToTopButton = document.getElementById("back-to-top");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopButton.classList.remove("opacity-0", "pointer-events-none");
    } else {
      backToTopButton.classList.add("opacity-0", "pointer-events-none");
    }
  });
  backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // =========================
  // 4. Skills Animation
  // =========================
  const skillBars = document.querySelectorAll(".skill-progress");
  const aboutSection = document.getElementById("about");

  const skillsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillBars.forEach((bar) => {
            const targetWidth = bar.getAttribute("data-width");
            bar.style.width = "0%";
            setTimeout(() => {
              bar.style.width = targetWidth;
            }, 200);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  if (aboutSection) skillsObserver.observe(aboutSection);

  // =========================
  // 5. Timeline Animation
  // =========================
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.2 }
  );
  timelineItems.forEach((item) => timelineObserver.observe(item));

  // =========================
  // 6. Portfolio Filter & Modal
  // =========================
  (function () {
    // Open modal when button with data-modal attribute clicked
    document.querySelectorAll('[data-modal]').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-modal');
        openModal(document.getElementById(id));
      });
    });

    // Close modal elements
    document.querySelectorAll('[data-modal-close]').forEach(el => {
      el.addEventListener('click', () => {
        const modal = el.closest('[id^="modal-"]') || document.querySelector('.modal-open');
        closeModal(modal);
      });
    });

    // openModal / closeModal functions
    function openModal(modal) {
      if (!modal) return;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      modal.setAttribute('aria-hidden', 'false');
      modal.querySelector('[data-modal-close]')?.focus();
      modal.classList.add('modal-open');
      // trap focus (basic)
      document.addEventListener('keydown', escHandler);
    }

    function closeModal(modal) {
      if (!modal) return;
      modal.classList.remove('flex');
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden', 'true');
      modal.classList.remove('modal-open');
      document.removeEventListener('keydown', escHandler);
    }

    function escHandler(e) {
      if (e.key === 'Escape') {
        const open = document.querySelector('.modal-open');
        if (open) closeModal(open);
      }
    }

    // Close when clicking overlay
    document.querySelectorAll('[data-modal-close]').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        const modal = overlay.closest('[id^="modal-"]');
        closeModal(modal);
      });
    });
  })();


  // =========================
  // 7. Contact Form Validation
  // =========================
  const contactForm = document.querySelector("form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;
      const fields = [
        { el: document.getElementById("name") },
        { el: document.getElementById("email"), email: true },
        { el: document.getElementById("subject") },
        { el: document.getElementById("message") },
      ];
      fields.forEach(({ el, email }) => {
        if (!el.value.trim() || (email && !el.value.includes("@"))) {
          el.style.borderColor = "#ef4444";
          isValid = false;
        } else {
          el.style.borderColor = "#d1d5db";
        }
      });

      const privacy = document.getElementById("privacy");
      if (!privacy.checked) {
        privacy.style.borderColor = "#ef4444";
        isValid = false;
      } else privacy.style.borderColor = "#d1d5db";

      if (isValid) {
        alert("Message sent successfully! I will get back to you soon.");
        contactForm.reset();
      }
    });
  }
});


