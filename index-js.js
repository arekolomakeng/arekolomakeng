// Fade-in on scroll
const fadeInElems = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Animate once
    }
  });
}, { threshold: 0.2 });

fadeInElems.forEach(el => observer.observe(el));

// Modal logic
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalCloseBtn = document.getElementById("modalCloseBtn");

document.querySelectorAll('.clickable-img').forEach(img => {
  img.addEventListener('click', () => {
    modal.removeAttribute('hidden');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modal.focus();
  });
});

// Close on close button
modalCloseBtn.addEventListener('click', () => {
  modal.setAttribute('hidden', '');
  modalImg.src = "";
});

// Close when clicking background (outside .modal-content)
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.setAttribute('hidden', '');
    modalImg.src = "";
  }
});

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape" && !modal.hasAttribute('hidden')) {
    modal.setAttribute('hidden', '');
    modalImg.src = "";
  }
});

// Geolocation greeting
window.addEventListener('load', () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const greet = document.createElement('p');
        greet.textContent = `Welcome! You're joining us from somewhere near: ${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`;
        greet.style.textAlign = "center";
        greet.style.marginTop = "1em";
        document.body.insertBefore(greet, document.querySelector('footer'));
      },
      () => console.log("Geolocation permission denied or unavailable.")
    );
  }
});