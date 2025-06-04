document.addEventListener("DOMContentLoaded", () => { 
  const filaContainer = document.getElementById("filaContainer");
  const proximaPessoaDiv = document.getElementById("proximaPessoa");
  const historicoDiv = document.getElementById("historicoChamadas");

  function carregarFila() {
    const fila = JSON.parse(localStorage.getItem("fila")) || [];

    // Atualiza visual da fila (lado esquerdo)
    filaContainer.innerHTML = "";
    fila.forEach(pessoa => {
      const card = document.createElement("div");
      card.className = "ficha-card";
      card.innerHTML = `
        <p><strong>Ficha:</strong> ${pessoa.ficha.toString().padStart(3, '0')}</p>
        <p><strong>Nome:</strong> ${pessoa.nome}</p>
        <p><strong>Modalidade:</strong> ${pessoa.modalidade}</p>
      `;
      filaContainer.appendChild(card);
    });

    // Exibir a próxima pessoa
    if (fila.length > 0) {
      const proxima = fila[0];
      proximaPessoaDiv.innerHTML = `
        <h3 style="margin-bottom: 8px;">🔔 Próxima pessoa a ser chamada:</h3>
        <p><strong>Ficha:</strong> ${proxima.ficha.toString().padStart(3, '0')}</p>
        <p><strong>Nome:</strong> ${proxima.nome}</p>
        <p><strong>Modalidade:</strong> ${proxima.modalidade}</p>
        <hr style="margin-top: 20px;">
      `;
    } else {
      proximaPessoaDiv.innerHTML = `<p>Nenhuma pessoa na fila</p>`;
    }
  }

  function exibirHistorico() {
    const historico = JSON.parse(localStorage.getItem("historicoChamadas")) || [];

    historicoDiv.innerHTML = "<h3>✅ Pessoas já chamadas:</h3><ul>" +
      historico.map(pessoa => `
        <li>
          Ficha ${pessoa.ficha.toString().padStart(3, '0')} - ${pessoa.nome} (${pessoa.modalidade})
        </li>`).join("") +
      "</ul>";
  }

  carregarFila();
  exibirHistorico();

  // Atualiza a cada 3 segundos
  setInterval(() => {
    carregarFila();
    exibirHistorico();
  }, 3000);
});
