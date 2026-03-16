document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll("#a11y-toolbar .a11y-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", function() {
      const action = btn.getAttribute("data-a11y");
      document.body.classList.remove(
        "a11y-high", "a11y-negative", "a11y-light", 
        "a11y-grayscale", "a11y-underline", "a11y-readable"
      );

      if(action !== "reset") {
        document.body.classList.add(`a11y-${action}`);
      }
    });
  });
});
