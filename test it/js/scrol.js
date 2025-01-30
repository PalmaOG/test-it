document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const nav = document.querySelector("nav");
  const hat = document.querySelector(".hat");

  function adjustPositions() {
    const headerHeight = header.offsetHeight;
    nav.style.top = `${headerHeight}px`;
    hat.style.top = `${headerHeight}px`;
  }

  adjustPositions();

  window.addEventListener("resize", adjustPositions);
});
document.addEventListener("DOMContentLoaded", function () {
  const hat = document.querySelector(".hat");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      hat.classList.add("shadow");
    } else {
      hat.classList.remove("shadow");
    }
  });
});
