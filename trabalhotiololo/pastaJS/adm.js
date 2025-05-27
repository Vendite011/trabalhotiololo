document.addEventListener("DOMContentLoaded", () => {
    const totalFilaSpan = document.getElementById("totalFila");
    const contagemModalidadesDiv = document.getElementById("contagemModalidades");
    const listaFichasUl = document.getElementById("listaFichas");
  
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
        
        <div class="modalidades">
        Futebol <p class="contagem-futebol">${contagem.Futebol}</p>
        </div>
        <div class="modalidades">
        Vôlei <p class="contagem-volei">${contagem.Vôlei}</p>
        </div>
        <div class="modalidades">
        Basquete <p class="contagem-basquete">${contagem.Basquete}</p>
        </div>
      `;
  
      // Lista de fichas
      listaFichasUl.innerHTML = fila
        .map(p => `<li>Ficha ${p.ficha.toString().padStart(3, '0')}: ${p.nome} (${p.modalidade})</li>`)
        .join("");
    }
  
    // Limpar fila
    document.getElementById("btnLimparFila").addEventListener("click", () => {
      if (confirm("Tem certeza que deseja limpar a fila?")) {
        localStorage.removeItem("fila");
        atualizarPainel();
      }
    });
  
    // Atualização automática
    setInterval(atualizarPainel, 3000);
    atualizarPainel();
  });
  