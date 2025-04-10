document.addEventListener("DOMContentLoaded", () => {
  const tabela = document.getElementById("corpoTabela");

  function carregarFila() {
    tabela.innerHTML = ''; // limpa a tabela antes de recarregar
    const fila = JSON.parse(localStorage.getItem("fila")) || [];

    fila.forEach(pessoa => {
      const linha = tabela.insertRow();
      const celulaNome = linha.insertCell(0);
      const celulaModalidade = linha.insertCell(1);

      celulaNome.textContent = pessoa.nome;
      celulaModalidade.textContent = pessoa.modalidade;
    });
  }

  function chamarProximaPessoa() {
    let fila = JSON.parse(localStorage.getItem("fila")) || [];

    if (fila.length === 0) {
      alert("Nenhuma pessoa na fila!");
      return;
    }

    const proximaPessoa = fila.shift(); // pega e remove a primeira pessoa da fila
    localStorage.setItem("fila", JSON.stringify(fila)); // atualiza a fila no localStorage

    // Cria uma mensagem falando nome e modalidade
    const mensagem = new SpeechSynthesisUtterance(
      `Chamar ${proximaPessoa.nome}, da modalidade ${proximaPessoa.modalidade}`
    );
    mensagem.lang = 'pt-BR';

    // Fala
    window.speechSynthesis.speak(mensagem);

    // Atualiza a tabela
    carregarFila();
  }

  // Cria o botão e adiciona na tela
  const botaoChamar = document.createElement("button");
  botaoChamar.textContent = "Chamar próxima pessoa";
  botaoChamar.style.marginTop = "20px";
  botaoChamar.addEventListener("click", chamarProximaPessoa);

  document.body.appendChild(botaoChamar);

  // Carrega a fila inicialmente
  carregarFila();
});
