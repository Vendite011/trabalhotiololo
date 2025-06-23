document.addEventListener("DOMContentLoaded", () => {
  const filaContainer = document.getElementById("filaContainer");
  const proximaPessoaDiv = document.getElementById("proximaPessoa");
  const historicoDiv = document.getElementById("historicoChamadas");

  function carregarFila() {
    const fila = JSON.parse(localStorage.getItem("fila")) || [];

    // Atualiza visual da fila (lado esquerdo)
    filaContainer.innerHTML = "<h3> Aguardando </h3>";
    fila.forEach(pessoa => {
      const card = document.createElement("div");
      // card.className = "ficha-card";
      card.innerHTML = `
        <p>${pessoa.ficha.toString().padStart(3, '0')}</p>
      `;
      filaContainer.appendChild(card);
    });
  }


  //Pessoas chamadas
  function exibirHistorico() {
    const historico = JSON.parse(localStorage.getItem("historicoChamadas")) || [];
  const ultimos5 = historico.slice(-5);

  historicoDiv.innerHTML = "<h3> Chamadas</h3><ul>" +
    ultimos5.map(pessoa => `
      <li>
        ${pessoa.ficha.toString().padStart(3, '0')}
      </li>`).join("") +
    "</ul>";
  }


  function adicionarAoHistorico(pessoa) {
    let historico = JSON.parse(localStorage.getItem("historicoChamadas")) || [];

    // Se já tem 5, remove a mais antiga
    if (historico.length >= 5) {
      historico.shift(); // remove o primeiro (mais antigo)
    }

    historico.push(pessoa); // adiciona o novo chamado
    localStorage.setItem("historicoChamadas", JSON.stringify(historico));
  }



  function chamarProximaPessoa() {
    let fila = JSON.parse(localStorage.getItem("fila")) || [];

    if (fila.length === 0) return;

    const proximaPessoa = fila.shift(); // remove a primeira da fila
    localStorage.setItem("fila", JSON.stringify(fila));

    adicionarAoHistorico(proximaPessoa); // atualiza o histórico com limite

    carregarFila();
    exibirHistorico();
  }

  carregarFila();
  exibirHistorico();

  // Atualiza a cada 3 segundos
  setInterval(() => {
    carregarFila();
    exibirHistorico();
  }, 3000);
});