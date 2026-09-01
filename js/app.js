// MOBILE MENU

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

    });

}


// DARK MODE

const themeToggle = document.querySelector(".theme-toggle");


// CHECK SAVED THEME

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

    if (themeToggle) {
        themeToggle.textContent = "☀️";
    }

}


// THEME BUTTON

if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");


        // CHECK CURRENT MODE

        if (document.body.classList.contains("dark-mode")) {

            themeToggle.textContent = "☀️";

            localStorage.setItem("theme", "dark");

        } else {

            themeToggle.textContent = "🌙";

            localStorage.setItem("theme", "light");

        }

    });

}

// CONTACT FORM

const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

if (contactForm && formMessage) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // GET THE VALUES FROM THE FORM

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const subject = document.querySelector("#subject").value.trim();
        const message = document.querySelector("#message").value.trim();


        // CHECK NAME

        if (name === "") {

            formMessage.textContent = "❌ Please enter your full name.";

            return;
        }


        // CHECK EMAIL

        if (email === "") {

            formMessage.textContent = "❌ Please enter your email address.";

            return;
        }


        // CHECK SUBJECT

        if (subject === "") {

            formMessage.textContent = "❌ Please enter a subject.";

            return;
        }


        // CHECK MESSAGE

        if (message === "") {

            formMessage.textContent = "❌ Please enter your message.";

            return;
        }


        // CHECK MESSAGE LENGTH

        if (message.length < 10) {

            formMessage.textContent =
                "❌ Your message must be at least 10 characters.";

            return;
        }


        // SUCCESS

        formMessage.textContent =
            "✅ Message submitted successfully! Thank you for reaching out.";

    });

}

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

});


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});