// Set the year in the footer automatically
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Simple placeholder interaction for the notify button
const notifyButton = document.getElementById("notifyButton");
if (notifyButton) {
  notifyButton.addEventListener("click", () => {
    alert(
      "In a future version, this will let you sign up for updates.\nFor now, thanks for testing the early build!"
    );
  });
}
