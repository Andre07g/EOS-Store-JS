/*LLAMADOS*/

/*MAIN*/

document.getElementById("botonConoceMas").addEventListener("click", (e) => {
  e.preventDefault();
  const destino = document.getElementById("navbar");
  scrollSuaveConstante(destino, 1500);
  setTimeout(() => {
    document
      .getElementsByClassName("pagina-inicio")[0]
      .classList.toggle("oculto");
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
  .then((res) => res.json())
  .then((data) => {
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
    <div class="aviso oculto">
                <h2>Se ha añadido correctamente</h2>
            </div>
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
    filtrados.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.setAttribute("data", `${producto.id}`);
      console.log(div.attributes);
      div.innerHTML = `
        <h3>${producto.title}</h3>
        <img src="${producto.image}" class="imagen-producto">
        <p>$${producto.price}</p>
        <button class="boton-ver-mas">Ver más</button>
        <div class="boton-marron"><img class="añadircarrito" src="./assets/sources/añadircarrito.png" data-id="${producto.id}"></div>
        `;
      contenedor.appendChild(div);
    });
  }

  const productosCategoria = listaProductos.filter(
    (p) => p.category === nombreCategoria
  );

  function aplicarFiltrosYOrden() {
    const texto = input.value.toLowerCase();
    const filtrados = productosCategoria.filter((p) =>
      p.title.toLowerCase().includes(texto)
    );
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
    const dataProducto = listaProductos.find((p) => p.title === titulo);
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

/*FUNCION PAGINA CARRITO*/
console.log(document.getElementsByClassName("aviso"));
function agregarAlCarro(productoCarrito) {
  let carro = JSON.parse(localStorage.getItem("carro")) || [];
  const existe = carro.find((p) => p.id === productoCarrito.id);
  if (existe) {
    existe.cantidad++;
  } else {
    carro.push({ ...productoCarrito, cantidad: 1 });
  }
  localStorage.setItem("carro", JSON.stringify(carro));
  console.log("actualizado");
  const aviso = document.getElementsByClassName("aviso")[0];
  console.log("mostrando");
  aviso.classList.toggle("oculto");
  setTimeout(() => {
    aviso.classList.toggle("oculto");
    console.log("ocultando");
  }, 3300);
}

setTimeout(() => {
  const botonCarrito = document.getElementsByClassName("añadircarrito");
  console.log(botonCarrito);

  for (let i = 0; i < botonCarrito.length; i++) {
    botonCarrito[i].addEventListener("click", () => {
      console.log("aaaa");
      const idProducto = parseInt(botonCarrito[i].dataset.id);
      console.log(botonCarrito[i].dataset.id);
      const productoCarrito = listaProductos.find((p) => p.id === idProducto);
      console.log(productoCarrito);
      agregarAlCarro(productoCarrito);
    });
  }
}, 3000);



setTimeout(() => {
  mostrarCarro();
  mostrarFactura();
  eliminarProd();
}, 3000);

function mostrarCarro() {
  let carro = JSON.parse(localStorage.getItem("carro")) || [];
  const contenedorCarrito =
    document.getElementsByClassName("contenedor-carrito")[0];
    contenedorCarrito.innerHTML="";
  let numCarrito = 1;
  carro.forEach((carroElement) => {
    let productoContenedorCarro = document.createElement("div");
    productoContenedorCarro.classList.add("producto-carrito");
    productoContenedorCarro.innerHTML = `<div class="numero">
                     <h2>${numCarrito}</h2>
                 </div>
                 <div class="tarjeta-producto-carro" >
                     <div class="imgpro">
                         <img class="imagen-producto-carrito"
                             src=${carroElement.image}>
                         <div class="datos-producto-pedido">
                             <h2>${carroElement.title.slice(0, 15)}</h2>
                             <p>Precio: ${carroElement.price}</p>
                             <p>Cantidad: ${carroElement.cantidad}</p>
                         </div>
                     </div>
                     <div class="botones-producto">
                         <div class="boton-añadir" data-id=${
                           carroElement.id
                         }><img src="./assets/sources/añadircarrito.png">
                         </div>
                         <div class="boton-quitar"><img src="./assets/sources/basura.png"></div>
             </div>
      </div>`;
    contenedorCarrito.appendChild(productoContenedorCarro);
    numCarrito++;
  });
}

function mostrarFactura() {
  let carro = JSON.parse(localStorage.getItem("carro")) || [];
  const factura = document.getElementsByClassName("factura")[0];
  factura.innerHTML = `<p class="codigo">Codigo: ${Math.floor(
    Math.random() * 10000
  )}</p>
                    <h1>Factura</h1>
                    <hr>
                    <p class="subtitulo">Productos</p>
                    <hr>`;
  let totalPrecio = 0;
  carro.forEach((elementCarro) => {
    console.log(elementCarro.title.slice(0, 15));
    let divSub = document.createElement("div");
    divSub.classList.add("subtitulo-precio");
    divSub.innerHTML = `<p class="subsubtitulo">${elementCarro.title.slice(
      0,
      15
    )}---x${elementCarro.cantidad}</p>
    <p>${elementCarro.cantidad * elementCarro.price}</p>`;
    console.log(divSub);
    factura.append(divSub);
    totalPrecio += elementCarro.cantidad * elementCarro.price;
  });
  const ahora = new Date();

  const año = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, "0");
  const dia = String(ahora.getDate()).padStart(2, "0");

  const horas = String(ahora.getHours()).padStart(2, "0");
  const minutos = String(ahora.getMinutes()).padStart(2, "0");

  const fechaHora = `${año}-${mes}-${dia}       Hora:${horas}:${minutos}`;
  factura.innerHTML += `<hr>
                     <p class="subtitulo">Datos</p>
                     <hr>
                     <p class="subsubtitulo">Fecha: ${fechaHora}</p>
                     <p class="subsubtitulo">Cliente: Edgar Andres Leal Plata</p>
                     <p class="subsubtitulo">Correo: correo@hotmail.com</p>
                     <p class="subsubtitulo">Codigo de cliente: ${Math.floor(
                       Math.random() * 1000
                     )}</p>
                     <hr>
                     <p class="subtitulo">Medios de pago</p>
                     <hr>
                     <div class="pago">
                         <p>Mastercard</p><img src="./assets/sources/mastercard.webp">
                     </div>
                     <div class="pagar">
                     <h1>TOTAL: $${totalPrecio}</h1><button>PAGAR</button>
                     </div>
                     <div class="triangular-bottom">
                         <svg viewBox="0 0 360 20" width="100%" height="20" preserveAspectRatio="none">
                             <polygon
                                 points="0,0 10,20 20,0 30,20 40,0 50,20 60,0 70,20 80,0 90,20 100,0 110,20 120,0 130,20 140,0 150,20 160,0 170,20 180,0 190,20 200,0 210,20 220,0 230,20 240,0 250,20 260,0 270,20 280,0 290,20 300,0 310,20 320,0 330,20 340,0 350,20 360,0"
                                 fill="#EEEEEE" />
                         </svg>
                     </div>`;
}



function eliminarProd(){
const botonAñadirCarrito = document.getElementsByClassName("boton-añadir");

  for (let i = 0; i < botonAñadirCarrito.length; i++) {
    botonAñadirCarrito[i].addEventListener("click", () => {
      console.log("111");
      console.log(botonAñadirCarrito[i].dataset.id);
      const idProducto = parseInt(botonAñadirCarrito[i].dataset.id);
      let carro = JSON.parse(localStorage.getItem("carro")) || [];
      console.log(idProducto);
      console.log(botonAñadirCarrito[i].dataset.id);
      const productoCarrito = carro.find((p) => p.id === idProducto);
      productoCarrito.cantidad++;
      console.log(productoCarrito);
      localStorage.setItem("carro", JSON.stringify(carro));
      mostrarCarro();
      eliminarProd();
    });
  };
}
