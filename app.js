// Set the year in the footer automatically
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Notify form logic
const notifyForm = document.getElementById("notifyForm");
const notifyEmailInput = document.getElementById("notifyEmail");
const notifyMessage = document.getElementById("notifyMessage");
const NOTIFY_API_URL = "https://ruf8xprpn6.execute-api.us-west-2.amazonaws.com/notify";


if (notifyForm && notifyEmailInput && notifyMessage) {
  notifyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    notifyMessage.textContent = "";
    notifyMessage.className = "notify-message";

    const email = notifyEmailInput.value.trim();

    if (!email || !email.includes("@")) {
      notifyMessage.textContent = "Please enter a valid email address.";
      notifyMessage.classList.add("error");
      return;
    }

    try {
      notifyMessage.textContent = "Sending...";
      const res = await fetch(NOTIFY_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        notifyMessage.textContent =
          data.message || "Something went wrong. Please try again.";
        notifyMessage.classList.add("error");
        return;
      }

      notifyMessage.textContent =
        data.message || "You’re on the list. Thank you.";
      notifyMessage.classList.add("success");
      notifyEmailInput.value = "";
    } catch (err) {
      console.error(err);
      notifyMessage.textContent =
        "Network error. Please try again in a moment.";
      notifyMessage.classList.add("error");
    }
  });
}
