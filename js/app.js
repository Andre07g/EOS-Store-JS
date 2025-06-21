/*LLAMADOS*/

/*MAIN*/

document.getElementById("botonConoceMas").addEventListener("click", (e) => {
  e.preventDefault();
  const destino = document.getElementById("navbar");
  scrollSuaveConstante(destino, 1500);
  setTimeout(() => {
    document.getElementsByClassName("pagina-inicio")[0].classList.toggle("oculto");
  }, 1600);

});

/*CATEGORIAS*/


/*PRODUCTOS*/















/*FUNCIONES*/

/*PAGINA DE INICIO*/
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
let listaProductos = [];
const url = "https://fakestoreapi.com/products";


fetch(url)
  .then(res => res.json())
  .then(data => {
    listaProductos = data;
  });


function mostrarCategoria(nombreCategoria, nombreVisible, idBuscador) {
  const paginaCategoria = document.querySelector(".pagina-categorias");
  const paginaProductos = document.querySelector(".pagina-productos");

  paginaCategoria.classList.add("oculto");
  paginaProductos.classList.remove("oculto");

  paginaProductos.innerHTML = `
    <h1>${nombreVisible}</h1>
    <img src="./assets/sources/flecha.png" class="flecha-trasera">
    <div class="busqueda-filtro">
      <input type="text" id="${idBuscador}" class="buscador" placeholder="Buscar un producto...">
      <select id="select-orden" class="select-personalizado">
          <option value="orden">Ordenar</option>
          <option value="preciobajo">Precio más bajo</option>
          <option value="precioalto">Precio más alto</option>
      </select>
    </div>
    <div class="contenedor-productos"></div>
  `;

  const contenedor = document.querySelector(".contenedor-productos");
  const input = document.getElementById(idBuscador);
  const select = document.getElementById("select-orden");


  function renderizarProductos(filtrados) {

    const orden = select.value;
    if (orden === "preciobajo") {
      filtrados.sort((a, b) => a.price - b.price);
    } else if (orden === "precioalto") {
      filtrados.sort((a, b) => b.price - a.price);
    }

    contenedor.innerHTML = "";
    filtrados.forEach(producto => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
        <h3>${producto.title}</h3>
        <img src="${producto.image}" class="imagen-producto">
        <p>$${producto.price}</p>
        <button class="boton-ver-mas">Ver más</button>
        <div class="boton-marron"><img class="añadircarrito" src="./assets/sources/añadircarrito.png"></div>`;
      contenedor.appendChild(div);
    });
  }


  const productosCategoria = listaProductos.filter(p => p.category === nombreCategoria);

  function aplicarFiltrosYOrden() {
    const texto = input.value.toLowerCase();
    const filtrados = productosCategoria.filter(p => p.title.toLowerCase().includes(texto));
    renderizarProductos(filtrados);
  }

  input.addEventListener("input", aplicarFiltrosYOrden);
  select.addEventListener("change", aplicarFiltrosYOrden);


  renderizarProductos(productosCategoria);


  document.querySelector(".flecha-trasera").addEventListener("click", () => {
    paginaProductos.classList.add("oculto");
    paginaCategoria.classList.remove("oculto");
    paginaProductos.innerHTML = "";
  });
}


document.addEventListener("click", (e) => {
  const texto = e.target.textContent.trim();
  switch (texto) {
    case "HOMBRE":
      mostrarCategoria("men's clothing", "HOMBRE", "buscador");
      break;
    case "MUJER":
      mostrarCategoria("women's clothing", "MUJER", "buscador2");
      break;
    case "JOYERIA":
      mostrarCategoria("jewelery", "JOYERIA", "buscador1");
      break;
    case "TECNOLOGIA":
      mostrarCategoria("electronics", "TECNOLOGIA", "buscador3");
      break;
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("boton-ver-mas")) {
    const producto = e.target.closest(".producto");
    const titulo = producto.querySelector("h3").textContent;
    const dataProducto = listaProductos.find(p => p.title === titulo);
    mostrarDetalleProducto(dataProducto);
  }

  if (e.target.classList.contains("cerrar-detalle")) {
    document.getElementById("detalle-producto").classList.add("oculto");
    document.getElementById("detalle-producto").innerHTML = "";
  }
});

function mostrarDetalleProducto(producto) {
  const detalle = document.getElementById("detalle-producto");

  detalle.classList.remove("oculto");
  detalle.classList.add("visible");

  detalle.innerHTML = `
    <div class="fondo-detalle">
      <div class="tarjeta-detalle">
        <span class="cerrar-detalle">&times;</span>
        <img src="${producto.image}" alt="${producto.title}" class="imagen-detalle">
        <h2>${producto.title}</h2>
        <p><strong>Precio:</strong> $${producto.price}</p>
        <p><strong>Categoría:</strong> ${producto.category}</p>
        <p><strong>Descripción:</strong></p>
        <p>${producto.description}</p>
      </div>
    </div>
  `;
}
