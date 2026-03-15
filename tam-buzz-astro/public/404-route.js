(function () {
  const isListen = window.location.pathname.startsWith("/listen");
  document.body.classList.add(isListen ? "listen" : "tam");
  document.title = isListen
    ? "Page Not Found - Tam Listen"
    : "Page Not Found - Tam";
  const link = document.getElementById("back-link");
  const text = document.getElementById("back-text");
  link.href = isListen ? "/listen" : "/";
  text.textContent = isListen ? "Back to Tam Listen" : "Back to tam.buzz";
})();
