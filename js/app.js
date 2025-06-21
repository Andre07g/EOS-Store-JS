function scrollSuaveConstante(elementoObjetivo, duracion = 2000) {
    const inicioY = window.scrollY;
    const destinoY = elementoObjetivo.offsetTop;
    const distancia = destinoY - inicioY;
    const inicioTiempo = performance.now();
  
    const logo = document.getElementById("logo");
    const frase = document.getElementById("fraseIntro");
    const boton = document.getElementById("botonConoceMas");
  
    function pasoScroll(tiempoActual) {
      const transcurrido = tiempoActual - inicioTiempo;
      const progreso = Math.min(transcurrido / duracion, 1);

      window.scrollTo(0, inicioY + distancia * progreso);
  

      const scale = 1 + progreso * 3; 
      logo.style.transform = `scale(${scale})`;
      logo.style.opacity = 1 - progreso;
  
      frase.style.opacity = 0.5 - progreso;
      boton.style.opacity = 0.5 - progreso;
  
      if (progreso < 1) {
        requestAnimationFrame(pasoScroll);
      }
    }
  
    requestAnimationFrame(pasoScroll);
  }
  
  document.getElementById("botonConoceMas").addEventListener("click", (e) => {
    e.preventDefault();
    const destino = document.getElementById("navbar");
    scrollSuaveConstante(destino, 1500);
    setTimeout(() => {
        document.getElementsByClassName("pagina-inicio")[0].classList.toggle("oculto");
    }, 1600);
    
  });
  