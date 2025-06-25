
# 🚀 EOS Store JS: Aplicación E-commerce FakeStore

---

## 📝 Descripción del Proyecto

**EOS Store JS** es una **aplicación web de comercio electrónico** que simula una tienda en línea. Fue construida utilizando **JavaScript puro**, **HTML** y **CSS**. El objetivo principal es consumir datos de productos desde la [FakeStore API](https://fakestoreapi.com/products) y representarlos dinámicamente en el DOM. Además, permite a los usuarios **interactuar** con los productos a través de un **carrito de compras** con **persistencia de datos** en `localStorage`, e incluye funcionalidades clave como filtros y ordenamientos para una experiencia de compra **moderna y funcional**.

---

## ✨ Funcionalidades Clave

* **Consumo de API Asincrónico:**
    * Obtiene datos de productos de la FakeStore API utilizando `fetch()`.
    * Gestiona la asincronía con **promesas** `async/await`.
* **DOM Dinámico:**
    * Renderiza cada producto como una **tarjeta**(imagen, título, precio, categoría).
    * Permite acciones como "Agregar al carrito" desde cada producto.
    * Actualiza el DOM en tiempo real al aplicar filtros o cambiar el orden de los productos.
* **Carrito de Compras:**
    * Almacena los productos seleccionados en un objeto JavaScript.
    * Calcula y muestra el **total del carrito**.
    * Permite **eliminar productos** del carrito.
    * **Persistencia de datos** del carrito utilizando `localStorage`.
    * Recupera y renderiza el carrito al recargar la página.
* **Eventos Interactivos:**
    * `click`: Para **agregar o quitar** productos del carrito.
    * `change`: Para aplicar **ordenar productos** (por precio, nombre, etc.).
    * `input`: Implementa una **barra de búsqueda** por nombre.
* **Organización del Código:**
    * Código modularizado en **funciones**.
    * Estructura clara y mantenible con archivos separados (HTML, CSS y JS).
* **Diseño Responsivo y Usabilidad:**
    * La aplicación se adapta correctamente a **diferentes tamaños de pantalla** (escritorio, tablet y móvil).
    * Prioriza una experiencia de usuario **intuitiva, clara y agradable**:
        * Botones accesibles.
        * Buen contraste de colores.
        * Tipografía legible.
        * Espaciados adecuados.
    * El carrito es **accesible y visible** desde cualquier dispositivo.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5**
* **CSS3**
* **JavaScript (ES6+)**
* **FakeStore API**
* **LocalStorage**

---

## 🚀 Instalación y Ejecución

Para poner en marcha este proyecto localmente, sigue estos sencillos pasos:

1.  **Clonar el Repositorio:**
    ```bash
    git clone [https://github.com/Andre07g/EOS-Store-JS.git](https://github.com/Andre07g/EOS-Store-JS.git)
    ```
2.  **Navegar al Directorio del Proyecto:**
    ```bash
    cd EOS-Store-JS
    ```
3.  **Abrir el Archivo `index.html`:**
    Simplemente **abre el archivo `index.html` en tu navegador web preferido**. No se necesita un servidor local para la funcionalidad básica, ya que los datos se obtienen directamente de la FakeStore API.

---

## 📁 Estructura del Proyecto

```
EOS-Store-JS/
├── index.html
├── css/
│   ├── styles.css
│   └── variables.css
├── js/
│   └── app.js
├── assets/ (o images/)
│   ├── fonts/
│   ├── sources/
│   └── bocetos/
└── README.md
```
---

## 🎨 Diseño y Usabilidad

El diseño de **EOS Store JS** se ha centrado en ofrecer una **experiencia de usuario fluida y agradable**. Hemos prestado especial atención a:

* **Adaptabilidad:** Un diseño **responsivo** que garantiza una visualización óptima en cualquier dispositivo, desde pantallas de escritorio grandes hasta teléfonos móviles.
* **Accesibilidad:** Botones y elementos interactivos que son fáciles de usar y con un **buen contraste** para mejorar la legibilidad.
* **Estética:** Una cuidadosa selección de colores y una tipografía **legible** que contribuyen a una experiencia visual agradable.
* **Navegación Intuitiva:** El carrito de compras es fácilmente **accesible y visible**, implementado de una forma que se integra bien con el flujo de usuario (por ejemplo, mediante una barra lateral, un modal o una sección fija).

---

## 📊 Evidencia de Diseño y Análisis

En el repositorio, encontrarás una sección dedicada a la evidencia del proceso de diseño y el análisis del proyecto, la cual incluye:

* **Bocetos:** Archivos visuales que muestran el **diseño y la estructura inicial** de la interfaz de usuario. Creadas en Figma.

---

## 📸 Capturas de Pantalla del Figma (Bocetos)

![Página principal de EOS Store](assets/bocetos/inicio.png)
*Vista de la página principal de EOS Store.*

![Página categorias de EOS Store](assets/bocetos/categoria.png)
*Vista de la página de categorias.*

![Página productos de EOS Store](assets/bocetos/producto.png)
*Vista de la página de productos.*

![Página del carrito y el formulario de EOS Store](assets/bocetos/carrito.png)
*Vista de la página del carrito, mostrando el formulario.*

---
