

let modalidadeSelecionada =""; // ele começa vazio pra mostrar que a pessoa ainda não escolheu
function selecionarModalidade(modalidade){
  modalidadeSelecionada = modalidade;
}

function enviar() {
  const nome = document.getElementById("nome").value;

  if (nome === "" || modalidadeSelecionada === "") {
    alert("Preencha o nome e escolha uma modalidade.");
    return;
  }

  // Recupera ou inicia a fila
  let fila = JSON.parse(localStorage.getItem("fila")) || [];

  // Recupera ou inicia o contador de fichas
  let numeroFicha = parseInt(localStorage.getItem("numeroFicha") || "0");
  numeroFicha++; // incrementa

  // Cria o objeto da pessoa com número de ficha
  const pessoa = {
    nome: nome,
    modalidade: modalidadeSelecionada,
    ficha: numeroFicha
  };

  // Salva na fila e atualiza contador
  fila.push(pessoa);
  localStorage.setItem("fila", JSON.stringify(fila));
  localStorage.setItem("numeroFicha", numeroFicha.toString());

}


// Deixa o botão da modalidade selecionado
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn-fut, .btn-vly, .btn-bsk");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active")); // remove de todos
        button.classList.add("active"); // adiciona no clicado
      });
    });
  });

