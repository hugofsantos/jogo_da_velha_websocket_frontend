const GAMEBOARD_SIZE = 3;
let player = 'X';
let turn = 'X';

function setupGameInfo() {
  const roundTextEl = document.querySelector("#game-info > span.round-text");
  roundTextEl.innerText = `Vez do Jogador ${turn}`;
  roundTextEl.classList.add(`player${turn == 'X' ? 1 : 2}-color`);

  const playerIdentificationText = document.querySelector("#game-info > span.player-identification");
  playerIdentificationText.innerText = `Jogador ${player}`;
  playerIdentificationText.classList.add(`player${player == 'X' ? 1 : 2}-color`);
}

function showPopup(title, content, buttonText="", onClickButton = () => {}) {
  document.getElementById('popup-title').textContent = title;
  document.getElementById('popup-text').textContent = content;
  document.getElementById('popup').style.display = 'flex';

  if(buttonText) {
    const mainButton = document.getElementById('popup-main-btn');
    
    document.getElementById('popup-btns').style.display='block';
    mainButton.textContent = buttonText;
    mainButton.addEventListener('click', onClickButton);
  }
}

function closePopup() {
  document.getElementById('popup-title').textContent = "";
  document.getElementById('popup-text').textContent = "";
  document.getElementById('popup').style.display = 'none';

  const mainButton = document.getElementById('popup-main-btn');

  document.getElementById('popup-btns').style.display = 'none';
  mainButton.textContent = "";
}

function renderGameboard(size) {
  const boardEl = document.getElementById('gameboard');

  const gridValue = new Array(size).fill('1fr').join(' '); // Ex: 1fr 1fr 1fr (Se o tamanho for 3)

  boardEl.style.gridTemplateRows = gridValue;
  boardEl.style.gridTemplateColumns = gridValue;

  const cells = Array.from({ length: size * size }, (_, index) => {
    const el = document.createElement('button');
    el.className = 'cell';
    el.tabIndex = index + 1;

    el.addEventListener('click', onClickCell);

    el.id = `cell-${index + 1}`;
    return el;
  });

  boardEl.append(...cells);
}

function onClickCell(event) {
  const element = event.srcElement;

  const cellIndex = element.id.replace('cell-', '');
  const position = Number(cellIndex);

  console.log(`CLICOU NA CÉLULA ${position}`)
}

setupGameInfo();
renderGameboard(3);