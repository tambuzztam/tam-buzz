// Put your custom JS code here

// Function to run our animation code
function runAnimations() {
  console.log('Running animations, document ready state:', document.readyState);
  
  // Hero animation logic
  const divs = document.querySelectorAll(".message");
  console.log('Found message divs:', divs.length);
  
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
}

// Run immediately if the DOM is already loaded
if (document.readyState === "complete" || document.readyState === "interactive") {
  console.log('Document already loaded, running animations directly');
  setTimeout(runAnimations, 1); // Slight delay to ensure everything is ready
} else {
  // Otherwise wait for DOMContentLoaded
  console.log('Document not yet loaded, waiting for DOMContentLoaded');
  document.addEventListener("DOMContentLoaded", runAnimations);
}
