"use strict";

{
  class Panel {
    constructor() {
      const section = document.createElement("section");
      section.classList.add("panel");

      this.img = document.createElement("img");
      this.img.src = this.getRandomImage();
      this.img.classList.add("spinning");

      this.timeoutId = undefined;

      this.stop = document.createElement("div");
      this.stop.textContent = "STOP";
      this.stop.classList.add("stop", "inactive");
      this.stop.addEventListener("click", () => {
        if (this.stop.classList.contains("inactive")) {
          return;
        }
        this.stop.classList.add("inactive");

        clearTimeout(this.timeoutId);
        this.img.classList.remove("spinning");

        panelsLeft--;

        if (panelsLeft === 0) {
          checkResult();
          spin.classList.remove("inactive");
          panelsLeft = 3;
        }
      });

      section.appendChild(this.img);
      section.appendChild(this.stop);

      const main = document.querySelector("main");
      main.appendChild(section);
    }

    getRandomImage() {
      const images = ["seven.png", "bell.png", "cherry.png"];
      return images[Math.floor(Math.random() * images.length)];
    }

    spin() {
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 50);
    }

    isUnmatched(p1, p2) {
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    unmatch() {
      this.img.classList.add("unmatched");
      this.img.classList.add("shake");
      setTimeout(() => this.img.classList.remove("shake"), 500);
    }

    activate() {
      this.img.classList.remove("unmatched");
      this.stop.classList.remove("inactive");
    }
  }

  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }

    if (
      !panels[0].isUnmatched(panels[1], panels[2]) &&
      !panels[1].isUnmatched(panels[0], panels[2]) &&
      !panels[2].isUnmatched(panels[0], panels[1])
    ) {
      if (
        panels[0].img.src.includes("seven.png") &&
        panels[1].img.src.includes("seven.png") &&
        panels[2].img.src.includes("seven.png")
      ) {
        displaySpecialCelebration();
      } else {
        displayGeneralCelebration();
      }
    }
  }

  function displaySpecialCelebration() {
    const message = document.createElement("div");
    message.textContent = "🎉WOW! INCREDIBLE!🎉";
    message.classList.add("celebrate");
    document.body.appendChild(message);
    createFireworks(10);
    setTimeout(() => {
      message.remove();
      removeFireworks();
    }, 4000);
  }

  function displayGeneralCelebration() {
    const message = document.createElement("div");
    message.textContent = "Congratulations!🎉";
    message.classList.add("celebrate");
    document.body.appendChild(message);
    createFireworks(5);
    setTimeout(() => {
      message.remove();
      removeFireworks();
    }, 4000);
  }

  function createFireworks(count) {
    const container = document.createElement("div");
    container.classList.add("firework-container");
    for (let i = 0; i < count; i++) {
      const firework = document.createElement("div");
      firework.classList.add("firework");
      firework.style.top = `${Math.random() * 100}%`;
      firework.style.left = `${Math.random() * 100}%`;
      container.appendChild(firework);
    }
    document.body.appendChild(container);
  }

  function removeFireworks() {
    const container = document.querySelector(".firework-container");
    if (container) {
      container.remove();
    }
  }

  const panels = [new Panel(), new Panel(), new Panel()];

  let panelsLeft = 3;

  const spin = document.getElementById("spin");
  spin.addEventListener("click", () => {
    if (spin.classList.contains("inactive")) {
      return;
    }
    spin.classList.add("inactive");

    panels.forEach((panel) => {
      panel.activate();
      panel.spin();
    });
  });
}

// ページ読み込み時のアニメーション適用
window.addEventListener("load", () => {
  document.querySelectorAll(".panel").forEach((panel) => {
    panel.classList.add("fade-in");
  });
});
