document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");
  const mobileNavLinks = document.querySelectorAll(".mobile-menu a");
  const icon = document.querySelector(".mobile-menu-button i");

  // Toggle mobile menu with smooth transition
  menuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");

    // Optional: Animate the hamburger icon to an X
    icon.classList.toggle("fa-xmark");
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      icon.classList.remove("fa-xmark");
    });
  });

  // Close mobile menu when clicking outside of it
  document.addEventListener("click", function (event) {
    if (
      !menuButton.contains(event.target) &&
      !mobileMenu.contains(event.target)
    ) {
      mobileMenu.classList.remove("active");
      icon.classList.remove("fa-xmark");
    }
  });

  // Function to set active nav item
  function setActiveNavItem() {
    let currentSection = "";

    // Find the section currently in view
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const sectionBottom = sectionTop + section.offsetHeight;

      const scrollPosition = window.scrollY + window.innerHeight * 0.5;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        currentSection = "#" + section.getAttribute("id");
      }
    });

    if (!currentSection && sections.length > 0) {
      currentSection = "#" + sections[0].getAttribute("id");
    }

    navLinks.forEach((link) => {
      link.classList.remove("!border-teal-500", "text-gray-900");
      link.classList.add("border-transparent", "text-gray-500");

      if (link.getAttribute("href") === currentSection) {
        link.classList.remove("border-transparent", "text-gray-500");
        link.classList.add("!border-teal-500", "text-gray-900");
      }
    });

    mobileNavLinks.forEach((link) => {
      link.classList.remove("bg-teal-50", "border-teal-500", "text-teal-700");
      link.classList.add("border-transparent", "text-gray-600");

      if (link.getAttribute("href") === currentSection) {
        link.classList.remove("border-transparent", "text-gray-600");
        link.classList.add("bg-teal-50", "border-teal-500", "text-teal-700");
      }
    });
  }

  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(function () {
      setActiveNavItem();
    });
  });

  window.addEventListener("resize", setActiveNavItem);

  setActiveNavItem();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 64,
          behavior: "smooth",
        });
      }
    });
  });

  // Set dynamic copyright year on footer
  const currentYear = new Date().getFullYear();
  const copyrightElement = document.getElementById("copyright-year");
  if (copyrightElement) {
    copyrightElement.textContent = currentYear;
  }

  // Chevron navigation for product slider
  const productSlider = document.getElementById("product-slider");
  const chevronLeft = document.getElementById("chevron-left");
  const chevronRight = document.getElementById("chevron-right");

  if (productSlider && chevronLeft && chevronRight) {
    chevronLeft.addEventListener("click", () => {
      productSlider.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    });

    chevronRight.addEventListener("click", () => {
      productSlider.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    });

    // hide chevrons when not needed
    const updateChevronVisibility = () => {
      const scrollLeft = productSlider.scrollLeft;
      const scrollWidth = productSlider.scrollWidth;
      const clientWidth = productSlider.clientWidth;

      chevronLeft.style.display = scrollLeft > 0 ? "flex" : "none";
      chevronRight.style.display =
        scrollLeft + clientWidth < scrollWidth ? "flex" : "none";
    };
    productSlider.addEventListener("scroll", updateChevronVisibility);
  }

  // Handle product item clicks
  const productItems = document.querySelectorAll(".product-item");
  const productDetails = document.querySelectorAll(".product-detail");

  productItems.forEach((item) => {
    item.addEventListener("click", () => {
      const productId = item.dataset.product;

      productItems.forEach((el) => {
        el.classList.remove("min-w-[300px]");
        el.classList.remove("md:min-w-[350px]");
      });
      item.classList.add("min-w-[300px]");
      item.classList.add("md:min-w-[350px]");

      productDetails.forEach((detail) => {
        detail.classList.add("hidden");
      });
      const selectedDetail = document.querySelector(
        `.product-detail[data-product="${productId}"]`
      );
      if (selectedDetail) {
        selectedDetail.classList.remove("hidden");
      }
    });
  });
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const company = document.getElementById("company").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  const mailtoLink = `mailto:marketing@aurateknologi.com?subject=${encodeURIComponent(
    subject
  )}&body=Name: ${name}%0D%0A%0D%0AEmail: ${email}%0D%0A%0D%0APhone: ${phone}%0D%0A%0D%0ACompany: ${company}%0D%0A%0D%0AMessage:%0D%0A${message}`;

  window.location.href = mailtoLink;
});
