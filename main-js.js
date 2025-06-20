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

if (modal && modalImg && modalCloseBtn) {
  document.querySelectorAll('.clickable-img').forEach(img => {
    img.addEventListener('click', () => {
      if (img.src) {
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modal.removeAttribute('hidden');
        modal.focus();
      }
    });
  });

  modalCloseBtn.addEventListener('click', () => {
    modal.setAttribute('hidden', '');
    modalImg.src = "";
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.setAttribute('hidden', '');
      modalImg.src = "";
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && !modal.hasAttribute('hidden')) {
      modal.setAttribute('hidden', '');
      modalImg.src = "";
    }
  });
}

// Helper validation functions
function validateEmail(email) {
  // Basic email regex
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  // Accepts numbers, spaces, dashes, and optional leading +
  const re = /^\+?[0-9\s\-]{7,15}$/;
  return re.test(phone);
}

function validateName(name) {
  return name.trim().length > 1;
}

function validateMessage(msg) {
  return msg.trim().length > 5;
}

// Show error message
function showError(input, errorElem, message) {
  errorElem.textContent = message;
  input.setAttribute('aria-invalid', 'true');
}

// Clear error message
function clearError(input, errorElem) {
  errorElem.textContent = '';
  input.removeAttribute('aria-invalid');
}

// Validation for one form
function validateForm(formIdPrefix) {
  let isValid = true;

  const nameInput = document.getElementById(formIdPrefix + 'Name');
  const emailInput = document.getElementById(formIdPrefix + 'Email');
  const phoneInput = document.getElementById(formIdPrefix + 'Phone');
  const messageInput = document.getElementById(formIdPrefix + 'Message');

  const nameError = document.getElementById(formIdPrefix + 'NameError');
  const emailError = document.getElementById(formIdPrefix + 'EmailError');
  const phoneError = document.getElementById(formIdPrefix + 'PhoneError');
  const messageError = document.getElementById(formIdPrefix + 'MessageError');

  // Validate Name
  if (!validateName(nameInput.value)) {
    showError(nameInput, nameError, 'Please enter your name (at least 2 characters).');
    isValid = false;
  } else {
    clearError(nameInput, nameError);
  }

  // Validate Email
  if (!validateEmail(emailInput.value)) {
    showError(emailInput, emailError, 'Please enter a valid email address.');
    isValid = false;
  } else {
    clearError(emailInput, emailError);
  }

  // Validate Phone
  if (!validatePhone(phoneInput.value)) {
    showError(phoneInput, phoneError, 'Please enter a valid phone number.');
    isValid = false;
  } else {
    clearError(phoneInput, phoneError);
  }

  // Validate Message
  if (!validateMessage(messageInput.value)) {
    showError(messageInput, messageError, 'Please enter a message (at least 6 characters).');
    isValid = false;
  } else {
    clearError(messageInput, messageError);
  }

  return isValid;
}

// Form submit handlers
document.getElementById('enquiryForm').addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateForm('enquiry')) {
    alert('Enquiry sent successfully!');
    e.target.reset();
  }
});

document.getElementById('volunteerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateForm('volunteer')) {
    alert('Volunteer signup sent successfully!');
    e.target.reset();
  }
});