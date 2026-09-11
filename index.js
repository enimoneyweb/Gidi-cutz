/* =========================================================
   GIDI CUTS — JAVASCRIPT
   ========================================================= */


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

  menuBtn.addEventListener("click", () => {

    const isOpen =
      navLinks.classList.toggle("open");

    menuBtn.classList.toggle(
      "active",
      isOpen
    );

    menuBtn.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuBtn.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation menu"
        : "Open navigation menu"
    );

  });


  navLinks
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          navLinks.classList.remove("open");

          menuBtn.classList.remove("active");

          menuBtn.setAttribute(
            "aria-expanded",
            "false"
          );

          menuBtn.setAttribute(
            "aria-label",
            "Open navigation menu"
          );

        }
      );

    });


  document.addEventListener(
    "click",
    event => {

      const clickedInsideNav =
        navLinks.contains(event.target);

      const clickedMenu =
        menuBtn.contains(event.target);

      if (
        !clickedInsideNav &&
        !clickedMenu &&
        navLinks.classList.contains("open")
      ) {

        navLinks.classList.remove("open");

        menuBtn.classList.remove("active");

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );

}


/* =========================================================
   BOOKING DATE
   ========================================================= */

const dateInput =
  document.getElementById("date");

if (dateInput) {

  const today =
    new Date();

  const year =
    today.getFullYear();

  const month =
    String(
      today.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      today.getDate()
    ).padStart(2, "0");

  dateInput.min =
    `${year}-${month}-${day}`;

}


/* =========================================================
   TOAST
   ========================================================= */

const toast =
  document.getElementById("toast");

let toastTimer;

function showToast(message) {

  if (!toast) return;

  clearTimeout(toastTimer);

  toast.textContent =
    message;

  toast.classList.add("show");

  toastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 3200);

}


/* =========================================================
   WHATSAPP BOOKING
   ========================================================= */

const bookingForm =
  document.getElementById("bookingForm");


if (bookingForm) {

  bookingForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        document
          .getElementById("name")
          .value
          .trim();

      const phone =
        document
          .getElementById("phone")
          .value
          .trim();

      const style =
        document
          .getElementById("style")
          .value;

      const date =
        document
          .getElementById("date")
          .value;


      if (
        !name ||
        !phone ||
        !style ||
        !date
      ) {

        showToast(
          "Please complete all fields."
        );

        return;

      }


      /* Basic phone validation */

      const cleanPhone =
        phone.replace(
          /[\s()-]/g,
          ""
        );

      if (
        cleanPhone.length < 10
      ) {

        showToast(
          "Please enter a valid WhatsApp number."
        );

        return;

      }


      /* Prevent selecting a past date */

      const selectedDate =
        new Date(
          `${date}T00:00:00`
        );

      const today =
        new Date();

      today.setHours(
        0,
        0,
        0,
        0
      );

      if (
        selectedDate < today
      ) {

        showToast(
          "Please choose today or a future date."
        );

        return;

      }


      /* Format date */

      const formattedDate =
        selectedDate.toLocaleDateString(
          "en-NG",
          {
            weekday:"long",
            year:"numeric",
            month:"long",
            day:"numeric"
          }
        );


      /*
        IMPORTANT:
        Replace this with the REAL
        GIDI CUTS WhatsApp number
        if it changes.

        Format:
        234XXXXXXXXXX
      */

      const barberNumber =
        "2348129989266";


      const message =
`Hello GIDI CUTS! 👋

I'd like to book a haircut.

Name: ${name}
My WhatsApp: ${phone}
Style: ${style}
Preferred Date: ${formattedDate}

Please confirm my booking. Thank you!`;


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

      }, 450);

    }
  );

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
  document.querySelectorAll(
    ".price-card, .review-card, .gallery-card, .booking-box, .location-box"
  );


const revealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "revealed"
                );

                revealObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold:0.12
        }
      )
    : null;


if (revealObserver) {

  revealElements.forEach(
    element => {

      element.classList.add(
        "reveal"
      );

      revealObserver.observe(
        element
      );

    }
  );

} else {

  revealElements.forEach(
    element => {

      element.classList.add(
        "revealed"
      );

    }
  );

}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

const footerYear =
  document.getElementById(
    "footerYear"
  );

if (footerYear) {

  footerYear.textContent =
    `© ${new Date().getFullYear()} GIDI CUTS • Built by Enimoney`;

}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      navLinks &&
      navLinks.classList.contains("open")
    ) {

      navLinks.classList.remove(
        "open"
      );

      if (menuBtn) {

        menuBtn.classList.remove(
          "active"
        );

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }

  }
);


/* =========================================================
   CONSOLE
   ========================================================= */

console.log(
  "GIDI CUTS — website loaded successfully."
);