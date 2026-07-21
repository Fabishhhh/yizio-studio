(function () {
  "use strict";

  const SERVICE_ID = "service_em5osgp";
  const TEMPLATE_ID = "template_m93nmci";
  const PUBLIC_KEY = "dY0WJ9yPACVvpd4K_";

  if (typeof emailjs !== "undefined") {
    emailjs.init(PUBLIC_KEY);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".navbar nav");
    const navLinks = document.querySelectorAll(".navbar nav a");

    const closeMenu = () => {
      if (!menuBtn || !nav) return;
      menuBtn.classList.remove("active");
      nav.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    };

    if (menuBtn && nav) {
      menuBtn.addEventListener("click", () => {
        const isOpen = menuBtn.classList.toggle("active");
        nav.classList.toggle("active", isOpen);
        menuBtn.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);
      });
    }

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1100) closeMenu();
    });

    const updateNavbar = () => {
      if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 30);
    };

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    // Apparitions progressives au scroll
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((element) => {
      const delay = element.dataset.delay;
      if (delay) element.style.setProperty("--delay", `${delay}ms`);
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.13 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    // Effet lumineux suivant le curseur sur les cartes services
    document.querySelectorAll(".spotlight-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
      });
    });

    // Inclinaison légère du mockup hero
    const tiltCard = document.querySelector(".tilt-card");
    if (tiltCard && window.matchMedia("(pointer: fine)").matches) {
      tiltCard.addEventListener("pointermove", (event) => {
        const rect = tiltCard.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        tiltCard.style.transform = `rotateY(${x * 10}deg) rotateX(${y * -8}deg)`;
      });

      tiltCard.addEventListener("pointerleave", () => {
        tiltCard.style.transform = "rotateY(-8deg) rotateX(4deg)";
      });
    }

    // Halo global discret
    const cursorGlow = document.querySelector(".cursor-glow");
    if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
        cursorGlow.style.opacity = "1";
      });

      document.documentElement.addEventListener("mouseleave", () => {
        cursorGlow.style.opacity = "0";
      });
    }

    // Boutons magnétiques
    document.querySelectorAll(".magnetic").forEach((button) => {
      if (!window.matchMedia("(pointer: fine)").matches) return;

      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
      });

      button.addEventListener("pointerleave", () => {
        button.style.transform = "translate(0, 0)";
      });
    });

    // Mise en avant automatique des étapes de la méthode
    const methodSteps = document.querySelectorAll(".method-step");
    const methodObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          methodSteps.forEach((step) => step.classList.remove("active"));
          entry.target.classList.add("active");
        });
      },
      { threshold: 0.65 }
    );

    methodSteps.forEach((step) => methodObserver.observe(step));

    // FAQ animée
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      if (!question || !answer) return;

      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");

        faqItems.forEach((otherItem) => {
          const otherQuestion = otherItem.querySelector(".faq-question");
          const otherAnswer = otherItem.querySelector(".faq-answer");
          otherItem.classList.remove("active");
          if (otherQuestion) otherQuestion.setAttribute("aria-expanded", "false");
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add("active");
          question.setAttribute("aria-expanded", "true");
          answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
      });
    });

    // Formulaire compact de l'accueil, conservé si présent sur une autre version
    const form = document.getElementById("contact-form");
    if (form && typeof emailjs !== "undefined") {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        emailjs
          .sendForm(SERVICE_ID, TEMPLATE_ID, this, PUBLIC_KEY)
          .then(() => {
            window.location.href = "merci.html";
          })
          .catch((error) => {
            alert("Erreur, message non envoyé... ❌");
            console.error(error);
          });
      });
    }

    // Formulaire complet de la page contact
    const formContactPage = document.getElementById("contact-form-page");
    if (formContactPage && typeof emailjs !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const offre = urlParams.get("offre");
      const projectSelect = document.getElementById("project_type");

      if (projectSelect) {
        const offers = {
          essentiel: "Pack Essentiel (590€)",
          business: "Pack Business (990€)",
          "sur-mesure": "Pack Premium (1390€)"
        };
        if (offers[offre]) projectSelect.value = offers[offre];
      }

      const submitButton = formContactPage.querySelector(".btn-primary");
      const formMessage = formContactPage.querySelector(".form-message");

      formContactPage.addEventListener("submit", function (event) {
        event.preventDefault();

        if (submitButton) {
          submitButton.textContent = "Envoi en cours...";
          submitButton.disabled = true;
        }

        emailjs
          .sendForm(SERVICE_ID, TEMPLATE_ID, this, PUBLIC_KEY)
          .then(() => {
            window.location.href = "merci.html";
          })
          .catch((error) => {
            if (submitButton) {
              submitButton.textContent = "Envoyer la demande";
              submitButton.disabled = false;
            }
            if (formMessage) {
              formMessage.style.color = "#dc2626";
              formMessage.textContent = "Une erreur est survenue, veuillez réessayer.";
            }
            console.error(error);
          });
      });
    }
  });
})();
