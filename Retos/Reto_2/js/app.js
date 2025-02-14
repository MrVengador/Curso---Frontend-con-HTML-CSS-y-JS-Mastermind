/**
 * @author Cristian Peña <cristian.penavillar@gmail.com>
 */



var Product = {
    name: null,
    price: null,
    category: null
};
/**
 * Description placeholder
 *
 * @type {*}
 */
var CartList; // Variable que almacenará el contenedor de la lista del carrito.
/**
 * Description placeholder
 *
 * @type {{}}
 */
var ProductsCartList = [];

/**
 * Description placeholder
 *
 * @type {*}
 */
var TotalPay; // Variable para mostrar el total a pagar.
/**
 * Description placeholder
 *
 * @type {number}
 */
let Total_Price = 0; // Variable para llevar el control del total acumulado de la compra.


document.addEventListener('DOMContentLoaded', domCharge);


// Funcion para eliminar
document.addEventListener("click", RemoveItem);

// Selecciona los elementos del DOM y les asigna las variables correspondientes.
/** Description placeholder */
function domCharge() {
    CartZone = document.getElementById("Cart"); // Zona donde se puede soltar los productos.
    CartList = document.getElementById("cartList"); // Lista de productos en el carrito.
    Products = document.getElementsByClassName("componentCard"); // Todos los productos disponibles en la página.
    TotalPay = document.getElementById("TotalPrice"); // Elemento donde se muestra el total a pagar.

    LoadCart();

    // Calcula el total inicial (si hay algo en el carrito al cargar).
    CalculateTotal(0);



    // Asigna un evento 'dragstart' a cada producto, para permitir su arrastre.
    for (let item of Products) {
        item.addEventListener('dragstart', MoveItem);
    }

    // Permite que los productos sean soltados en la zona del carrito (habilita el drag-and-drop).
    CartZone.addEventListener('dragover', e => { e.preventDefault(); });
    CartZone.addEventListener('drop', AddItem); // Al soltar un producto, se ejecuta la función AddItem.

}


/**
 * Description placeholder
 *
 * @param {*} event 
 */
function MoveItem(event) {
    let name = event.target.querySelector(".card-title").textContent; // Obtiene el nombre del producto
    let priceText = event.target.querySelector(".card-text").textContent; // Obtiene el texto del precio
    let category = Select_Category(event.target.classList);


    // Extrae el número del precio (quita el signo "$" y convierte a número)
    let price = parseFloat(priceText.replace(/[^\d]/g, ""));

    console.log("Producto seleccionado:", name, "$ " + price.toLocaleString('es-ES') + ", de la categoria " + category); //Para que este separado con 100.000 y no 100000

    // Guarda los datos para ser usados en el 'drop'
    Product = { name, price, category };

    console.log(Product);
}

/**
 * Description placeholder
 *
 * @param {*} clase 
 * @returns {("PlacaMadre" | "Procesador" | "MemoriaRam" | "TarjetasGraficas" | "Almacenamiento" | "Gabinetes" | "FuentesPoder" | "Null")} 
 */
function Select_Category(clase) {
    if (clase.contains("PlacaMadre")) {
        return "PlacaMadre";
    }
    else if (clase.contains("Procesador")) {
        return "Procesador";
    }
    else if (clase.contains("MemoriaRam")) {
        return "MemoriaRam";
    }
    else if (clase.contains("TarjetasGraficas")) {
        return "TarjetasGraficas";
    }
    else if (clase.contains("Almacenamiento")) {
        return "Almacenamiento";
    }
    else if (clase.contains("Gabinetes")) {
        return "Gabinetes";
    }
    else if (clase.contains("FuentesPoder")) {
        return "FuentesPoder";
    }
    return "Null"

}


/**
 * Description placeholder
 *
 * @param {*} event 
 */
function AddItem(event) {
    event.preventDefault(); // Previene el comportamiento predeterminado del evento de soltar.


    if (CheckDuplicateCategory(Product.category)) {
        alert("No puedes armar un pc con 2 componentes de esta categoria.");
        return;
    }
    if (!CheckCompability(Product.name, Product.category)) {
        alert("Productos no compatibles, revisa el carrito.");
        return;
    }


    // Calcula el nuevo total con el precio del producto agregado.
    CalculateTotal(Product.price);

    // Crea un nuevo elemento de lista para mostrar el producto agregado al carrito.
    const li = document.createElement("li");
    li.className = "list-group-item cartItem"; // Asigna una clase al nuevo item de lista.
    li.innerHTML = `  
        <button class="float-end bg-danger border-1 text-white btn-delete-product">X</button>
        <p class="mb-0 cartItemName">${Product.name} </p>          
        <span class="text-info price float-end cartItemPrice">Precio $${Product.price.toLocaleString('es-ES')}</span>
    `; // HTML del producto con su precio y botón de eliminación.

    // Agrega el nuevo producto al final de la lista del carrito.
    CartList.appendChild(li);
    ProductsCartList.push(Product);
    console.log("Producto agregado:", Product.name);
    // console.log("Lista actualizada del carrito:", CartList.children); // Muestra los elementos del carrito.
    // console.log("Lista de productos en memoria:", ProductsCartList[ProductsCartList.length - 1].name); // Verifica la lista almacenada en JS.

    SaveCart();

}


/**
 * Description placeholder
 *
 * @param {*} event 
 */
function RemoveItem(event) {
    if (event.target.classList.contains("btn-delete-product")) {
        const cartItem = event.target.closest(".cartItem");
        if (cartItem) {
            const ItemName = cartItem.querySelector(".cartItemName").textContent;
            const ItemTextPrice = cartItem.querySelector(".cartItemPrice").textContent;
            let ItemPrice = parseFloat(ItemTextPrice.replace(/[^\d]/g, ""));


            if (ItemName && ItemPrice) {
                console.log("Delete " + ItemName + "\n$" + ItemPrice);
                CalculateTotal(-ItemPrice);
                DeleteItemList(ItemName);
                cartItem.remove(); // Elimina el producto de la lista correctamente.

            } else {
                console.log("No se encontró .cartItemName o .cartItemPrice en el cartItem");
            }
        } else {
            console.log("No se encontró el cartItem");
        }
        SaveCart()
    }
}

/**
 * Description placeholder
 *
 * @param {*} name 
 */
function DeleteItemList(name) {
    // Busca el índice del producto que tiene el mismo nombre
    for (let i = 0; i < ProductsCartList.length; i++) {
        // Comparar sin espacios, ya que de lo contrario, no detecta la comparación
        const productName = ProductsCartList[i].name.trim();
        const inputName = name.trim();

        console.log("Comparando con: " + productName + "\n" + inputName);

        if (productName === inputName) {
            console.log("Producto eliminado:", ProductsCartList[i].name);
            // Eliminar el producto del array usando splice
            ProductsCartList.splice(i, 1);
            return; // Sale de la función después de eliminar el producto
        }
    }
}


function CalculateTotal(price) {
    let new_price = parseFloat(price);
    Total_Price = Total_Price + new_price;
    console.log(Total_Price);
    TotalPay.innerText = "Total: $ " + Total_Price.toLocaleString('es-ES'); // Formatea el número con separadores de miles, en formato español.
}


/** Description placeholder */
function SaveCart() {
    // Convertir ProductsCartList en JSON y almacenarlo en localStorage.
    localStorage.setItem("ProductsCartList", JSON.stringify(ProductsCartList));
    console.log("Carrito guardado.");
}

/** Description placeholder */
function LoadCart() {
    const savedProductsCartList = localStorage.getItem("ProductsCartList"); //Tomo los datos el carrito

    // Si los datos del carrito existen
    if (savedProductsCartList) {

        const parsedCartList = JSON.parse(savedProductsCartList); //Ajusto el formato de los datos del carrito
        console.log("Datos restaurados");

        // Verificar si hay elementos en la lista cargada
        if (parsedCartList.length > 0) {

            for (item of parsedCartList) { //cargo item por item del carrito
                // console.log("Item guardado: ", item.name);
                Product = item;
                Recuperate_items(); //Cargo los items con una version corta de add items (pude ajustar todo, pero estoy algo cansado, disculpar.)
            }
        }
    } else {
        console.log("No se encontraron datos de carrito en localStorage.");
    }
}


/** Description placeholder */
function Recuperate_items() {
    // Calcula el nuevo total con el precio del producto agregado.
    CalculateTotal(Product.price);

    // Crea un nuevo elemento de lista para mostrar el producto agregado al carrito.
    const li = document.createElement("li");
    li.className = "list-group-item cartItem"; // Asigna una clase al nuevo item de lista.
    li.innerHTML = `  
        <button class="float-end bg-danger border-1 text-white btn-delete-product">X</button>
        <p class="mb-0 cartItemName">${Product.name} </p>          
        <span class="text-info price float-end cartItemPrice">Precio $${Product.price.toLocaleString('es-ES')}</span>
    `; // HTML del producto con su precio y botón de eliminación.

    // Agrega el nuevo producto al final de la lista del carrito.
    CartList.appendChild(li);
    ProductsCartList.push(Product);
    console.log("Producto agregado:", Product.name);
}

