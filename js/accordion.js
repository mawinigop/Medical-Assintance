const acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");

    const panel = this.nextElementSibling;
    const icon = this.querySelector(".icon");

    if (panel.style.display === "block") {
      panel.style.display = "none";
      icon.textContent = "+";
    } else {
      panel.style.display = "block";
      icon.textContent = "–"; 
    }
  });
}
