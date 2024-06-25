const GAMEBOARD_SIZE = 3;
let player = 1;

const playerSimbols = {
  1: 'X',
  2: 'O'
}

function setupGameInfo() {
  const roundTextEl = document.querySelector("#game-info > span.round-text");
  roundTextEl.innerText = `Vez do Jogador ${player} (${playerSimbols[player]})`;
  roundTextEl.classList.add(`player${player}-color`);

  const playerIdentificationText = document.querySelector("#game-info > span.player-identification");
  playerIdentificationText.innerText = `Jogador ${player} (${playerSimbols[player]})`;
  playerIdentificationText.classList.add(`player${player}-color`);
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

    const row = Math.floor(index / size);
    const col = index % size;

    el.id = `cell-${row}-${col}`; // Ex: cell_0_2 (Para o elemento da linha 0 e coluna 2, isso vai facilitar na hora de pegar o click depois)
    return el;
  });

  boardEl.append(...cells);
}

function onClickCell(event) {
  const element = event.srcElement;

  const [rowStr, colStr] = element.id.replace('cell-', '').split('-');
  const row = Number(rowStr);
  const col = Number(colStr);

  console.log(`CLICOU NA CÉLULA (${row}, ${col})`)
}

setupGameInfo();
renderGameboard(3);