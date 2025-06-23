document.addEventListener("DOMContentLoaded", () => {
  const totalFilaSpan = document.getElementById("totalFila");
  const contagemModalidadesDiv = document.getElementById("contagemModalidades");
  const listaFichasUl = document.getElementById("listaFichas");
  const proximaPessoaInfo = document.getElementById("proximaPessoaADM");

  function atualizarPainel() {
    const fila = JSON.parse(localStorage.getItem("fila")) || [];

    totalFilaSpan.textContent = fila.length;

    // Contagem por modalidade
    const contagem = { Futebol: 0, Vôlei: 0, Basquete: 0 };
    fila.forEach(p => {
      if (contagem[p.modalidade] !== undefined) {
        contagem[p.modalidade]++;
      }
    });

    contagemModalidadesDiv.innerHTML = `
      <div class="modalidades">Futebol <p class="contagem-futebol">${contagem.Futebol}</p></div>
      <div class="modalidades">Vôlei <p class="contagem-volei">${contagem.Vôlei}</p></div>
      <div class="modalidades">Basquete <p class="contagem-basquete">${contagem.Basquete}</p></div>
    `;

    // Lista de fichas
    listaFichasUl.innerHTML = fila
      .map(p => `<li>Ficha ${p.ficha.toString().padStart(3, '0')}: ${p.nome} (${p.modalidade})</li>`)
      .join("");

    // Exibir próxima pessoa
    if (fila.length > 0) {
      const proxima = fila[0];
      proximaPessoaInfo.innerHTML = `
        <p><strong>Ficha:</strong> ${proxima.ficha.toString().padStart(3, '0')}
        <p><strong>Nome:</strong> ${proxima.nome}
        <p><strong>Modalidade:</strong> ${proxima.modalidade}
      `;
    } else {
      proximaPessoaInfo.innerHTML = `<p>Nenhuma pessoa na fila</p>`;
    }
  }

  // Botão limpar
  document.getElementById("btnLimparFila").addEventListener("click", () => {
    if (confirm("Tem certeza que deseja limpar a fila?")) {
      localStorage.removeItem("fila");
      atualizarPainel();
    }
  });

  // Botão chamar próxima
  const clickSound = new Audio("https://www.soundjay.com/button/beep-07.mp3");
  document.getElementById("btnChamarProxima").addEventListener("click", () => {
  clickSound.currentTime = 0; // reinicia se clicar várias vezes rápido
  clickSound.play();

  let fila = JSON.parse(localStorage.getItem("fila")) || [];
  let historico = JSON.parse(localStorage.getItem("historicoChamadas")) || [];

  if (fila.length === 0) {
    alert("Nenhuma pessoa na fila!");
    return;
    }
      
    const chamada = fila.shift(); // remove primeira
    historico.unshift(chamada); // adiciona como objeto
    historico = historico.slice(0, 10);

    localStorage.setItem("fila", JSON.stringify(fila));
    localStorage.setItem("historicoChamadas", JSON.stringify(historico));

    atualizarPainel();
  });

  setInterval(atualizarPainel, 3000);
  atualizarPainel();

});
