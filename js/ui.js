import { IMAGES } from "./images.js";
import { state, steps } from "./state.js";

export function render() {
  renderLeft();
  renderRight();
}

function renderLeft() {
  const left = document.getElementById("left");
  const leftTitle = document.getElementById("leftStage");

  if (leftTitle) {
    leftTitle.textContent = steps[state.step].stage;
  }

  let imgs = [];

  if (state.step === 1) {
    imgs = [
      [IMAGES.red, "Vermelho"],
      [IMAGES.blue, "Azul"],
      [IMAGES.toy, "Com um chaveiro"]
    ];
  }

  if (state.step === 2 || state.step === 4) {
    imgs = [[IMAGES.black, "Test"]];
  }

  if (state.step === 3) {
    imgs = [
      [IMAGES.red,"Vermelho"],
      [IMAGES.blue,"Azul"],
      [IMAGES.toy,"Com um chaveiro"],
      [IMAGES.black,"Preto"],
      [IMAGES.sport,"Esporte"],
      [IMAGES.kid,"Infantil"]
    ];
  }

  if (state.step === 5) {
    imgs = [[IMAGES.bag, "Bag"]];
  }

  document.getElementById("imageGrid").innerHTML = `
    ${imgs.map(([src,label]) => `
      <div class="img-card">
        <img src="${src}">
        <div>${label}</div>
      </div>
    `).join("")}
  `;
}

function renderRight() {
  const r = document.getElementById("right");
  const s = steps[state.step];

  r.innerHTML = `
    <div class="chat-block">

      <div class="msg bitik">
        <div class="avatar">🤖</div>
        <div class="bubble">${s.bitik}</div>
      </div>

      <div class="msg ai">
        <div class="avatar ai-avatar">🧠</div>
        <div class="bubble ai-bubble">
          <div id="aiText">${s.ai}</div>
          <div id="aiStatus" class="ai-status">${s.aiStatus}</div>
        </div>
      </div>

    </div>

    <div class="controls">
      <button class="btn btn-main" id="btnTrain">✨ Ação</button>
      <button class="btn btn-next" id="btnNext" style="display:none;">Próximo ▶</button>
    </div>
  `;
}
