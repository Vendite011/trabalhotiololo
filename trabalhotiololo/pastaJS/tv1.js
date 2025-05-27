// Atualiza hora atual
function atualizarHora() {
    const agora = new Date();
    const hora = agora.toLocaleTimeString("pt-br");
    document.getElementById("hora").textContent = hora;
  }
  setInterval(atualizarHora, 1000);
  atualizarHora();
  
  // Carrossel automático
  function iniciarCarrossel(id) {
    const carrossel = document.getElementById(id);
    const imagens = carrossel.querySelectorAll("img");
    let index = 0;
  
    setInterval(() => {
      index = (index + 1) % imagens.length;
      carrossel.style.transform = `translateX(-${index * 100}%)`;
    }, 10000);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    iniciarCarrossel("carrossel1");
    iniciarCarrossel("carrossel2");
  });
  
