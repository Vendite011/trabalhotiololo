

let modalidadeSelecionada =""; // ele começa vazio pra mostrar que a pessoa ainda não escolheu
function selecionarModalidade(modalidade){
  modalidadeSelecionada = modalidade;
}

function enviar(){
  const nome =document.getElementById("nome").value;

  if(nome==="" || modalidadeSelecionada===""){
    alert("preencha o nome e escolha uma modalidade.");
    return;
  }
    // Recupera a lista atual (ou cria uma nova se não existir)

  let fila =JSON.parse(localStorage.getItem("fila")) || [];

  fila.push({nome: nome, modalidade: modalidadeSelecionada});
  
   localStorage.setItem("fila", JSON.stringify(fila));

   window.location.href = "tv2.html"
}
