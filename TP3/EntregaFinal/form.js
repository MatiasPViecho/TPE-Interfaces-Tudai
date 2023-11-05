document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");
  const successMessage = document.getElementById("success-message");
  const loadingSpinner = document.getElementById("loading-spinner");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    loadingSpinner.style.display = "block";

    setTimeout(function () {
      loadingSpinner.style.display = "none";

      successMessage.style.display = "flex";

      setTimeout(function () {
        window.location.href = "index.html";
      }, 2000);
    }, 2000);
  });
});
