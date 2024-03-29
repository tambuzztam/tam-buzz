// Put your custom JS code here
document.addEventListener("DOMContentLoaded", function () {
  const divs = document.querySelectorAll(".message");
  const randomIndex = Math.floor(Math.random() * divs.length);
  divs[randomIndex].classList.remove("hidden");
});
