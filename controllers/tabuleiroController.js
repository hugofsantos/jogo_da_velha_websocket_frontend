const GAMEBOARD_SIZE = 3;
let player = 'X';
let turn = 'X';
let started_game = false;

let socket = null;

function setupConnection() {
  const urlParams = new URLSearchParams(window.location.search);
  const client = urlParams.get('client');

  if (!client) {
    showPopup("Erro", "Não foi possível estabelecer conexão com o servidor", "OK", backToMenu)
  } else {
    setupWsConnection(client);

    setInterval(() => { // KeepAlive Websocket
      socket?.send("ping");
    }, 120 * 1000); // Enviar "ping" a cada 120 segundos
  }
}

function setupWsConnection(clientId) {
  const host = "localhost";
  const port = "8080";

  socket = new WebSocket(`ws://${host}:${port}/ws/${clientId}`);

  // Evento de conexão aberta
  socket.onopen = function (event) {
    console.log('Conexão aberta');
    showPopup("Aviso", "Buscando partida...")
    socket.send('join_game');
  };

  // Evento de recebimento de mensagem
  socket.onmessage = function (event) {
    const msg = event.data.trim().toUpperCase().replace(/\n/g, '');    

    console.log('Mensagem recebida do servidor:', msg);
    if (["X", "O"].includes(msg)) {
      turn = 'X';
      changeRoundText(turn);

      player = msg;
      changePlayerIdText(msg);
      started_game = false;
    }else if (msg === 'WAITING_PLAYERS') {
      started_game = false;
      showPopup("Aviso", "Esperando outro jogador se conectar...")
    } else if (msg === 'START_GAME') {
      started_game = true;
      closePopup();
    } else if (msg.startsWith("MARKED ")) {
      const [,symbol, position] = msg.split(" ");
      markCell(symbol.toUpperCase(), Number(position));
    } else if (msg.startsWith('WINNER')) {
      const [, winner] = msg.split(" ");
      showPopup("Fim de Jogo", winner === player ? 'Você venceu!' : `Você perdeu!`, 'OK', backToMenu);
    } else if (msg === 'DRAW') {
      showPopup("Empate", "O jogo deu empate!", 'OK', backToMenu);
    } 
  };

  // Evento de erro
  socket.onerror = function (event) {
    console.error('Erro no WebSocket:', event);
    showPopup("Erro", "Não foi possível estabelecer conexão com o servidor", "OK", backToMenu)
  };
  
  // Evento de conexão fechada
  socket.onclose = function (event) {
    showPopup("Aviso", "A conexão com o servidor foi encerrada", "OK", backToMenu)    
    console.log('Conexão fechada:', event);
  };  
}

function setupGameInfo() {
  changeRoundText(turn);
  changePlayerIdText(player);
}

function changeRoundText(round) {
  const roundTextEl = document.querySelector("#game-info > span.round-text");
  roundTextEl.innerText = `Vez do Jogador ${round}`;
  roundTextEl.classList.remove(getClassNameByPlayerSymbol(getInvertedPlayerSymbol(round)));
  roundTextEl.classList.add(getClassNameByPlayerSymbol(round));
}

function changePlayerIdText(playerSymbol) {
  const playerIdentificationText = document.querySelector("#game-info > span.player-identification");
  playerIdentificationText.innerText = `Jogador ${playerSymbol}`;
  playerIdentificationText.classList.remove(getClassNameByPlayerSymbol(getInvertedPlayerSymbol(playerSymbol)));
  playerIdentificationText.classList.add(getClassNameByPlayerSymbol(playerSymbol));
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

  make_play(position);
}

function make_play(position) {
  if (turn === player && started_game) {
    socket.send(`make_play ${position}`);
  }
}

function markCell(symbol, cellPosition) {
  const cellElement = document.getElementById(`cell-${cellPosition}`);
  
  cellElement.innerText = symbol;
  cellElement.classList.add(getClassNameByPlayerSymbol(symbol));

  turn = getInvertedPlayerSymbol(symbol);

  changeRoundText(turn);
}

function getClassNameByPlayerSymbol(symbol) {
  return `player${ symbol === 'X' ? 1 : 2 }-color`;
}

function getInvertedPlayerSymbol(symbol) {
  return symbol === 'X' ? 'O' : 'X';
} 

function backToMenu() {
  window.location.href = `../../index.html`;
}

setupConnection();
setupGameInfo();
renderGameboard(3);