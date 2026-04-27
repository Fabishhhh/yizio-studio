document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".navbar nav");
  const navLinks = document.querySelectorAll(".navbar nav a");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      nav.classList.remove("active");
    });
  });
});


// --- FORMULAIRE CONTACT (EmailJS) ---
const form = document.getElementById("contact-form");

const SERVICE_ID = "service_em5osgp";
const TEMPLATE_ID = "template_m93nmci";
const PUBLIC_KEY = "dY0WJ9yPACVvpd4K_";

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this, PUBLIC_KEY)
      .then(() => {
        alert("Message envoyé ! ✅");
        form.reset();
      })
      .catch((err) => {
        alert("Erreur, message non envoyé... ❌");
        console.error(err);
      });
  });
}


// FORMULAIRE PAGE CONTACT
const formContactPage = document.getElementById("contact-form-page");

if (formContactPage) {
  formContactPage.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this, PUBLIC_KEY)
      .then(() => {
        alert("Message envoyé ! ✅");
        this.reset();
      })
      .catch((err) => {
        alert("Erreur, message non envoyé... ❌");
        console.error(err);
      });
  });
}

// --- FAQ ACCORDÉON OFFRES ---
const faqItems = document.querySelectorAll(".faq-item");

if (faqItems.length > 0) {
  faqItems.forEach((item) => {
    const question = item.querySelector("h3");
    const answer = item.querySelector(".faq-answer");

    // état initial propre
    if (answer) {
      answer.style.display = "none";
    }

    question.addEventListener("click", () => {
      const isOpen = answer.style.display === "block";

      // ferme toutes les autres FAQ
      document.querySelectorAll(".faq-answer").forEach((a) => {
        a.style.display = "none";
      });

      // toggle celle cliquée
      answer.style.display = isOpen ? "none" : "block";
    });
  });
}