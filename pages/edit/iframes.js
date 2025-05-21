//<!-- iframe resizing logic -->
function scaleIframes() {
    try {
      const desktopContainers = document.querySelectorAll(".desktop-container");
      const mobileContainers = document.querySelectorAll(
        ".iframe-container.mobile-container"
      );
  
      desktopContainers.forEach((container) => {
        const iframe = container.querySelector(".desktop-iframe");
        const scale = container.offsetWidth / 1440;
        iframe.style.transform = `scale(${scale})`;
        container.style.height = `${810 * scale}px`;
      });
  
      mobileContainers.forEach((container) => {
        const iframe = container.querySelector(".mobile-iframe");
        const scale = container.offsetWidth / 393;
        iframe.style.transform = `scale(${scale})`;
        container.style.height = "auto"; // Let the container height define the iframe
      });
    } catch (err) {
      console.error(err);
    }
  }
  // Initial scale
  scaleIframes();
  // Scale on window resize
  window.addEventListener("resize", scaleIframes);
  // Scale on container resize
  const resizeObserver = new ResizeObserver(scaleIframes);
  document
    .querySelectorAll(".desktop-container, .iframe-container.mobile-container")
    .forEach((container) => {
      resizeObserver.observe(container);
    });
  //<!-- END OF iframe resizing logic -->