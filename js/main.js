class Header {
  constructor() {
    this.header = document.getElementById("header");
    this.mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    this.navList = document.querySelector(".nav-list");
    this.isMobileMenuOpen = false;

    this.init();
  }

  addCTAScroll() {
    document.querySelectorAll(".btn-cta").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        // Прокрутка к верху страницы
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    });
  }

  init() {
    this.addScrollListener();
    this.addMobileMenuListener();
    this.addSmoothScroll();
    this.addCTAScroll();
  }

  addScrollListener() {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        this.header.classList.add("scrolled");
      } else {
        this.header.classList.remove("scrolled");
      }
    });
  }

  addMobileMenuListener() {
    this.mobileMenuBtn.addEventListener("click", () => {
      this.toggleMobileMenu();
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        if (this.isMobileMenuOpen) {
          this.toggleMobileMenu(false);
        }
      });
    });
  }

  toggleMobileMenu(force) {
    this.isMobileMenuOpen =
      force !== undefined ? force : !this.isMobileMenuOpen;

    const navMenu = document.querySelector(".nav-menu");
    this.mobileMenuBtn.classList.toggle("active", this.isMobileMenuOpen);

    if (navMenu) {
      navMenu.classList.toggle("active", this.isMobileMenuOpen);
    }

    document.body.style.overflow = this.isMobileMenuOpen ? "hidden" : "";

    // Добавляем/убираем класс для затемнения фона
    if (this.isMobileMenuOpen) {
      document.documentElement.classList.add("menu-open");
    } else {
      document.documentElement.classList.remove("menu-open");
    }
  }

  // МЕТОД ДЛЯ ПЛАВНОЙ ПРОКРУТКИ
  addSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");

        if (targetId === "#") return; // Игнорируем пустые якоря

        const target = document.querySelector(targetId);
        if (target) {
          // Плавная прокрутка к элементу
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
}

class TestimonialsSlider {
  constructor() {
    this.track = document.querySelector(".testimonials-track");
    this.cards = document.querySelectorAll(".testimonial-card");
    this.prevBtn = document.querySelector(".testimonial-prev");
    this.nextBtn = document.querySelector(".testimonial-next");
    this.dotsContainer = document.querySelector(".testimonials-dots");

    this.currentIndex = 0;
    this.cardWidth = this.cards[0].offsetWidth + 30; // width + gap
    this.totalCards = this.cards.length;

    this.init();
  }

  init() {
    this.createDots();
    this.addEventListeners();
    this.updateSlider();
  }

  createDots() {
    for (let i = 0; i < this.totalCards; i++) {
      const dot = document.createElement("div");
      dot.classList.add("testimonials-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  addEventListeners() {
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    window.addEventListener("resize", () => {
      this.cardWidth = this.cards[0].offsetWidth + 30;
      this.updateSlider();
    });
  }

  prevSlide() {
    this.currentIndex = Math.max(0, this.currentIndex - 1);
    this.updateSlider();
  }

  nextSlide() {
    this.currentIndex = Math.min(this.totalCards - 1, this.currentIndex + 1);
    this.updateSlider();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateSlider();
  }

  updateSlider() {
    const translateX = -this.currentIndex * this.cardWidth;
    this.track.style.transform = `translateX(${translateX}px)`;

    // Update dots
    document.querySelectorAll(".testimonials-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
    });

    // Update buttons state
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex === this.totalCards - 1;
  }
}

class PricingToggle {
  constructor() {
    this.toggle = document.getElementById("pricing-toggle");
    this.pricingSection = document.querySelector(".pricing");

    this.init();
  }

  init() {
    this.toggle.addEventListener("change", () => {
      this.updatePricing();
    });
  }

  updatePricing() {
    if (this.toggle.checked) {
      this.pricingSection.classList.add("annual-pricing");
    } else {
      this.pricingSection.classList.remove("annual-pricing");
    }
  }
}

class FAQAccordion {
  constructor() {
    this.faqItems = document.querySelectorAll(".faq-item");
    this.init();
  }

  init() {
    this.faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      question.addEventListener("click", () => {
        this.toggleItem(item);
      });
    });
  }

  toggleItem(item) {
    const isActive = item.classList.contains("active");

    // Закрываем все items
    this.faqItems.forEach((faqItem) => {
      faqItem.classList.remove("active");
    });

    // Открываем текущий, если он был закрыт
    if (!isActive) {
      item.classList.add("active");
    }
  }
}

class NewsletterForm {
  constructor() {
    this.form = document.querySelector(".newsletter-form");
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }
  }

  handleSubmit() {
    const input = this.form.querySelector('input[type="email"]');
    const email = input.value.trim();

    if (this.validateEmail(email)) {
      // Здесь можно добавить отправку на сервер
      console.log("Email submitted:", email);
      this.showSuccess();
      input.value = "";
    } else {
      this.showError();
    }
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  showSuccess() {
    // Временное уведомление
    const btn = this.form.querySelector("button");
    const originalHtml = btn.innerHTML;

    btn.innerHTML = "✓";
    btn.style.background = "#4CAF50";

    setTimeout(() => {
      btn.innerHTML = originalHtml;
      btn.style.background = "";
    }, 2000);
  }

  showError() {
    const input = this.form.querySelector("input");
    input.style.borderColor = "#ff4757";

    setTimeout(() => {
      input.style.borderColor = "";
    }, 2000);
  }
}

// Инициализация всех классов после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
  new Header();
  new TestimonialsSlider();
  new PricingToggle();
  new FAQAccordion();
  new NewsletterForm();
});
