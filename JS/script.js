// =========================
// 0. Tailwind Custom Config
// =========================
tailwind.config = {
  theme: {
    extend: {
      colors: { primary: "#0A66C2", secondary: "#00A0DC" },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",
        button: "8px",
      },
    },
  },
};

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
  const filterButtons = document.querySelectorAll(".filter-button");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      const filter = this.getAttribute("data-filter");
      portfolioItems.forEach((item) => {
        item.style.display =
          filter === "all" || item.getAttribute("data-category") === filter
            ? "block"
            : "none";
      });
    });
  });

  const projectButtons = document.querySelectorAll(".view-project");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close");

  projectButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = document.getElementById(this.dataset.project + "Modal");
      if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal");
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });

  window.addEventListener("click", function (e) {
    modals.forEach((modal) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  });

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
