/* =========================
   GIDI CUTS JAVASCRIPT
========================= */


/* =========================
   MOBILE NAVIGATION
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

  menuBtn.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuBtn.setAttribute(
      "aria-expanded",
      isOpen
    );

    menuBtn.textContent = isOpen ? "×" : "☰";

  });


  // Close menu when a link is clicked

  navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

      menuBtn.textContent = "☰";

    });

  });

}


/* =========================
   BOOKING DATE
========================= */

const dateInput = document.getElementById("date");

if (dateInput) {

  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  dateInput.min = `${year}-${month}-${day}`;

}


/* =========================
   TOAST
========================= */

const toast = document.getElementById("toast");

function showToast(message) {

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);

}


/* =========================
   WHATSAPP BOOKING
========================= */

const bookingForm =
  document.getElementById("bookingForm");


if (bookingForm) {

  bookingForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      const name =
        document.getElementById("name").value.trim();

      const phone =
        document.getElementById("phone").value.trim();

      const style =
        document.getElementById("style").value;

      const date =
        document.getElementById("date").value;


      if (!name || !phone || !style || !date) {

        showToast(
          "Please complete all fields."
        );

        return;

      }


      // Convert YYYY-MM-DD into a nicer format

      const selectedDate =
        new Date(`${date}T00:00:00`);

      const formattedDate =
        selectedDate.toLocaleDateString(
          "en-NG",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          }
        );


      const message =
`Hello GIDI CUTS! 👋

I'd like to book a haircut.

Name: ${name}
My WhatsApp: ${phone}
Style: ${style}
Preferred Date: ${formattedDate}

Please confirm my booking. Thank you!`;


      /*
        IMPORTANT:

        Replace the number below with the
        real GIDI CUTS WhatsApp number.

        Format:
        Country code + number
        without + or spaces.

        Example:
        2348129989266
      */

      const barberNumber =
        "2348129989266";


      const whatsappURL =
        `https://wa.me/${barberNumber}?text=${encodeURIComponent(message)}`;


      showToast(
        "Opening WhatsApp..."
      );


      setTimeout(() => {

        window.open(
          whatsappURL,
          "_blank",
          "noopener,noreferrer"
        );

      }, 500);

    }
  );

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
  document.querySelectorAll(
    ".price-card, .review-card, .gallery-card, .booking-box, .location-box"
  );


const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "revealed"
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold:0.12
    }
  );


revealElements.forEach(element => {

  element.classList.add("reveal");

  revealObserver.observe(element);

});


/* =========================
   ADD REVEAL STYLES
========================= */

const revealStyle =
document.createElement("style");

revealStyle.textContent = `

.reveal {
  opacity: 0;
  transform: translateY(25px);
  transition:
    opacity .7s ease,
    transform .7s ease;
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

`;

document.head.appendChild(
  revealStyle
);


/* =========================
   CURRENT YEAR
========================= */

const footerYear =
  document.querySelector(".footer small");

if (footerYear) {

  footerYear.textContent =
    `© ${new Date().getFullYear()} GIDI CUTS • Built by Enimoney`;

}


/* =========================
   PREVENT EMPTY LINKS
========================= */

document
  .querySelectorAll('a[href="#"]')
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        event.preventDefault();

      }
    );

  });


console.log(
  "GIDI CUTS website loaded successfully."
);