let clientId = "";

async function setupConnection() {
  clientId = await getClientId();
}

async function getClientId() {
  const host = 'localhost';
  const port = '8000'; 

  const response = await fetch(`http://${host}:${port}/register`, { method: 'POST' });
  return await response.text();
}

function addDisabledToltip() {
  const disabled_buttons = document.querySelectorAll('.button:disabled');
  const tooltip = document.getElementById('tooltip');

  disabled_buttons.forEach(button => {
    button.addEventListener('mouseenter', (event) => {
      const rect = event.target.getBoundingClientRect();
      tooltip.style.display = 'block';
      tooltip.style.left = `${rect.left}px`;
      tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
    });

    button.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  });  
}

addDisabledToltip();
setupConnection();

document.getElementById('find-match').addEventListener('click', () => {
  window.location.href = `./views/tabuleiro/tabuleiro.html?client=${clientId}`;
})