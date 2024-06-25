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

function addNavigationToButton(buttonId, url) {
  document.getElementById(buttonId).addEventListener('click', function() {
      window.location.href = url;  // Substitua 'pagina.html' pela URL desejada
  });  
}

addDisabledToltip();
addNavigationToButton("find-match", "./views/tabuleiro/tabuleiro.html")