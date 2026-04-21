/* ============================================================
   script.js — Lumière Beauty Salon
   Содержит: мобильное меню, счётчик анимации, валидация формы,
   анимации при прокрутке, кнопка «Наверх», текущий год
   ============================================================ */

/* ======= 1. МОБИЛЬНОЕ МЕНЮ ======= */
function mobileMenu() {
    /* Переключает класс «open» у навигации */
    var nav = document.querySelector("nav");
    var hamburger = document.getElementById("hamburger");
    if (!nav) return;
    nav.classList.toggle("open");
    if (hamburger) {
        hamburger.classList.toggle("fa-bars");
        hamburger.classList.toggle("fa-xmark");
    }
}

document.addEventListener("DOMContentLoaded", function () {

    /* ======= 2. ЗАКРЫТИЕ МЕНЮ ПРИ КЛИКЕ НА ССЫЛКУ ======= */
    var navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            var nav = document.querySelector("nav");
            var hamburger = document.getElementById("hamburger");
            if (nav && window.innerWidth <= 800) {
                nav.classList.remove("open");
                if (hamburger) {
                    hamburger.classList.add("fa-bars");
                    hamburger.classList.remove("fa-xmark");
                }
            }
        });
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 800) {
            var nav = document.querySelector("nav");
            var hamburger = document.getElementById("hamburger");
            if (nav) nav.classList.remove("open");
            if (hamburger) {
                hamburger.classList.add("fa-bars");
                hamburger.classList.remove("fa-xmark");
            }
        }
    });

    /* ======= 3. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ ПРОКРУТКЕ ======= */
    var animTargets = document.querySelectorAll(
        ".dest-card, .tour-item, .info-block, .stat-item, .feature-item"
    );

    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        animTargets.forEach(function (el) { observer.observe(el); });
    } else {
        animTargets.forEach(function (el) { el.classList.add("visible"); });
    }

    /* ======= 4. АНИМИРОВАННЫЕ СЧЁТЧИКИ ======= */
    /* Находим все элементы с атрибутом data-count */
    var counters = document.querySelectorAll("[data-count]");

    function animateCounter(el) {
        var target = parseInt(el.getAttribute("data-count"), 10);
        var duration = 1800;
        var step = Math.ceil(duration / target);
        var current = 0;

        var timer = setInterval(function () {
            current += Math.ceil(target / 60);
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            /* Динамически обновляем текстовое содержимое */
            el.textContent = current.toLocaleString("ru-RU") + "+";
        }, step);
    }

    if ("IntersectionObserver" in window) {
        var counterObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        counters.forEach(function (el) { counterObserver.observe(el); });
    }

    /* ======= 5. ВАЛИДАЦИЯ ФОРМЫ ======= */
    var contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            var name  = document.getElementById("f-name").value.trim();
            var email = document.getElementById("f-email").value.trim();
            var phone = document.getElementById("f-phone").value.trim();
            var msg   = document.getElementById("f-msg").value.trim();
            var msgBox = document.getElementById("form-message");

            var errors = [];
            if (!name)  errors.push("Введите ваше имя");
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                errors.push("Введите корректный email");
            if (!phone) errors.push("Введите телефон");
            if (!msg)   errors.push("Напишите ваш вопрос или пожелания");

            if (errors.length > 0) {
                e.preventDefault();
                msgBox.innerHTML =
                    "<b>Пожалуйста, заполните обязательные поля:</b><ul><li>" +
                    errors.join("</li><li>") +
                    "</li></ul>";
                msgBox.className = "form-msg error";
                msgBox.style.display = "block";
                msgBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
                return;
            }

            var submitBtn = document.getElementById("submit-btn");
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Отправка...';
            }
        });
    }

    /* ======= 6. ФИЛЬТР КАРТОЧЕК ======= */
    var filterBtns = document.querySelectorAll(".filter-btn");
    var destCards  = document.querySelectorAll(".dest-card");

    filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            filterBtns.forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");

            var filter = btn.getAttribute("data-filter");

            destCards.forEach(function (card) {
                var tag = card.getAttribute("data-tag") || "";
                if (filter === "all" || tag === filter) {
                    card.style.display = "";
                    setTimeout(function () { card.classList.add("visible"); }, 50);
                } else {
                    card.classList.remove("visible");
                    setTimeout(function () { card.style.display = "none"; }, 300);
                }
            });
        });
    });

    /* ======= 7. КНОПКА «НАВЕРХ» ======= */
    var backTop = document.getElementById("back-top");
    if (backTop) {
        window.addEventListener("scroll", function () {
            backTop.style.opacity = window.scrollY > 400 ? "1" : "0";
            backTop.style.pointerEvents = window.scrollY > 400 ? "auto" : "none";
        });
        backTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ======= 8. ГОД В FOOTER ======= */
    var yearEl = document.getElementById("footer-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

}); /* конец DOMContentLoaded */
