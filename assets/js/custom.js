// Put your custom JS code here

document.addEventListener("DOMContentLoaded", function () {
  // Hero animation logic
  const divs = document.querySelectorAll(".message");
  if (divs.length > 0) {
    divs.forEach((div) => div.classList.add("hidden"));
    const randomIndex = Math.floor(Math.random() * divs.length);
    const selectedDiv = divs[randomIndex];
    selectedDiv.classList.remove("hidden");
    
    // Trigger animation after element is visible and DOM has updated
    console.log('Selected div:', selectedDiv);
    console.log('Div classes before animation:', selectedDiv.classList.toString());
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        selectedDiv.classList.add("animate");
        console.log('Added animate class. Div classes now:', selectedDiv.classList.toString());
      });
    });
  }

  // Viewport height fix
  const initialViewportHeight = window.innerHeight + "px";
  document.documentElement.style.setProperty(
    "--viewport-height",
    initialViewportHeight,
  );
});
