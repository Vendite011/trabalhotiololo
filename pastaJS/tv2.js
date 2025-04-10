document.addEventListener("DOMContentLoaded", () => {
    const tabela = document.getElementById("corpoTabela"); // id novo aqui
  
    const fila = JSON.parse(localStorage.getItem("fila")) || [];
  
    fila.forEach(pessoa => {
      const linha = tabela.insertRow();
      const celulaNome = linha.insertCell(0);
      const celulaModalidade = linha.insertCell(1);
  
      celulaNome.textContent = pessoa.nome;
      celulaModalidade.textContent = pessoa.modalidade;
    });
  });
  