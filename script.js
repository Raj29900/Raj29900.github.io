// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// ===== Projects dropdown toggle (click) =====
const projectsLink = document.getElementById("projectsLink");
const projectsSub  = document.getElementById("projectsSub");
const projectsDrop = document.getElementById("projectsDropdown");

// Close nav on link click (mobile) — BUT not for Projects toggle
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    // If clicking PROJECTS, don't close the menu (we want submenu to open)
    if (link === projectsLink) {
      e.preventDefault();
      return;
    }
    navLinks.classList.remove('open');
  });
});

// Only attach dropdown logic if elements exist
if (projectsLink && projectsSub && projectsDrop) {
  projectsLink.addEventListener("click", (e) => {
    e.preventDefault(); // stop scrolling to #Projects

    if (projectsSub.hasAttribute("hidden")) {
      projectsSub.removeAttribute("hidden");
      projectsLink.setAttribute("aria-expanded", "true");
    } else {
      projectsSub.setAttribute("hidden", "");
      projectsLink.setAttribute("aria-expanded", "false");
    }
  });

  // close dropdown if you click outside
  document.addEventListener("click", (e) => {
    if (!projectsDrop.contains(e.target)) {
      projectsSub.setAttribute("hidden", "");
      projectsLink.setAttribute("aria-expanded", "false");
    }
  });

  // close dropdown after clicking submenu (then it navigates)
  projectsSub.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      projectsSub.setAttribute("hidden", "");
      projectsLink.setAttribute("aria-expanded", "false");
      navLinks.classList.remove('open'); // close mobile menu after selection
    });
  });
}

// Contact form -> open email client with filled content
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    formStatus.style.color = '#ff8080';
    formStatus.textContent = 'Please fill in all fields.';
    return;
  }

  formStatus.style.color = '#72e3a1';
  formStatus.textContent = 'Opening your email app…';

  const subject = encodeURIComponent(`Portfolio Contact – ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  const mailTo = 'kprrahul2018@gmail.com';
  window.location.href = `mailto:${mailTo}?subject=${subject}&body=${body}`;

  contactForm.reset();
});
