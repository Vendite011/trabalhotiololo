document.addEventListener("DOMContentLoaded", () => {
  const tabela = document.getElementById("corpoTabela");
  const historicoDiv = document.createElement("div");

  function carregarFila() {
    tabela.innerHTML = ''; // limpa a tabela antes de recarregar
    const fila = JSON.parse(localStorage.getItem("fila")) || [];
  
    fila.forEach(pessoa => {
      const linha = tabela.insertRow();
      const celulaFicha = linha.insertCell(0);
      const celulaNome = linha.insertCell(1);
      const celulaModalidade = linha.insertCell(2);

      celulaFicha.textContent = pessoa.ficha.toString().padStart(3, '0');
      celulaNome.textContent = pessoa.nome;
      celulaModalidade.textContent = pessoa.modalidade;
    });
  }

  function atualizarHistorico(pessoa) {
    let historico = JSON.parse(localStorage.getItem("historicoChamadas")) || [];
    historico.unshift(`Ficha ${pessoa.ficha.toString().padStart(3, '0')} - ${pessoa.nome} (${pessoa.modalidade})`);
    historico = historico.slice(0, 10); // mantém só os últimos 10
    localStorage.setItem("historicoChamadas", JSON.stringify(historico));
  }

  function exibirHistorico() {
    const historico = JSON.parse(localStorage.getItem("historicoChamadas")) || [];
    historicoDiv.innerHTML = "<h3>Últimas 10 chamadas:</h3><ul>" +
      historico.map(item => `<li>${item}</li>`).join("") +
      "</ul>";
  }

  function chamarProximaPessoa() {
    let fila = JSON.parse(localStorage.getItem("fila")) || [];

    if (fila.length === 0) {
      alert("Nenhuma pessoa na fila!");
      return;
    }

    let pessoa = fila[0];

    // Garante que a contagem exista
    if (!pessoa.chamadas) {
      pessoa.chamadas = 0;
    }

    // Fala a chamada
    const mensagem = new SpeechSynthesisUtterance(
      `Chamar ficha número ${pessoa.ficha}, ${pessoa.nome}, da modalidade ${pessoa.modalidade}`
    );
    mensagem.lang = 'pt-BR';
    window.speechSynthesis.speak(mensagem);

    // Atualiza número de chamadas
    pessoa.chamadas += 1;

    if (pessoa.chamadas >= 2) {
      atualizarHistorico(pessoa);
      fila.shift(); // remove da fila
    } else {
      fila[0] = pessoa; // só atualiza a contagem
    }

    localStorage.setItem("fila", JSON.stringify(fila));
    carregarFila();
    exibirHistorico();
  }

  // Criar botão de chamada
  const botaoChamar = document.createElement("button");
  botaoChamar.textContent = "Chamar próxima pessoa";
  botaoChamar.style.marginTop = "20px";
  botaoChamar.addEventListener("click", chamarProximaPessoa);

  document.body.appendChild(botaoChamar);
  document.body.appendChild(historicoDiv);

  carregarFila();
  exibirHistorico();
});
