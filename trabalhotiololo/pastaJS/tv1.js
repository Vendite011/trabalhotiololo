// Atualiza hora atual
function atualizarHora() {
    const agora = new Date();
    const hora = agora.toLocaleTimeString("pt-br");
    document.getElementById("hora").textContent = hora;
  }
  setInterval(atualizarHora, 1000);
  atualizarHora();
  
  const carrossel = document.getElementById('carrossel');
  const totalSlides = carrossel.children.length;
  let index = 0;

  function showSlide() {
    carrossel.style.transform = `translateX(-${index * 100}vw)`;
  }

  function nextSlide() {
    index = (index + 1) % totalSlides;
    showSlide();
  }

  function prevSlide() {
    index = (index - 1 + totalSlides) % totalSlides;
    showSlide();
  }

  // ⏱️ Avanço automático opcional:
  setInterval(nextSlide, 50000); // troca a cada 10 segundos