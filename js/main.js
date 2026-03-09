import { render } from "./ui.js";
import { state, steps } from "./state.js";

let actionDone = false;
let isAnimating = false;

document.getElementById("startModal").classList.add("show");

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startModal").classList.remove("show");
  state.step = 1;
  render();
  updateProgress();
});

document.getElementById("restartBtn").addEventListener("click", () => {
  document.getElementById("endModal").classList.remove("show");
  state.step = 1;
  render();
  updateProgress();
});

document.body.addEventListener("click", (e) => {

  if (e.target.id === "btnTrain") {

    if (isAnimating) return;
    actionDone = true;
    isAnimating = true;

    const s = steps[state.step];
    const aiText = document.getElementById("aiText");
    const aiStatus = document.getElementById("aiStatus");
    const nextBtn = document.getElementById("btnNext");

    aiText.textContent = "…";
    aiStatus.textContent = "Pensando...";
    aiText.classList.add("ai-thinking");
    aiStatus.classList.add("ai-thinking");

    setTimeout(() => {
      aiText.classList.remove("ai-thinking");
      aiStatus.classList.remove("ai-thinking");

      aiText.textContent = s.aiAfter;
      aiStatus.textContent = s.aiStatusAfter;

      nextBtn.style.display = "inline-flex";
      isAnimating = false;
    }, 1000);
  }

  if (e.target.id === "btnNext") {
    if (!actionDone) return;

    state.step++;
    actionDone = false;

    if (state.step > 5) {
      document.getElementById("endModal").classList.add("show");
      return;
    }

    render();
    updateProgress();
  }
});

function updateProgress() {
  document.getElementById("progressBar").style.width =
    (state.step / 5 * 100) + "%";

  document.getElementById("stepCircle").textContent = state.step;
  document.getElementById("stepTitle").textContent = steps[state.step].title;
}
