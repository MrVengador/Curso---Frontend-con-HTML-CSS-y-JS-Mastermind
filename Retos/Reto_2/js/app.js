/**
 * @author Cristian Peña <cristian.penavillar@gmail.com>
 */

var Product = {
    name: null,
    price: null,
    category: null
};
var CartList; // Variable que almacenará el contenedor de la lista del carrito.
var ProductsCartList = [];

var TotalPay; // Variable para mostrar el total a pagar.
let Total_Price = 0; // Variable para llevar el control del total acumulado de la compra.


document.addEventListener('DOMContentLoaded', domCharge);


// Funcion para eliminar
document.addEventListener("click", RemoveItem);

// Selecciona los elementos del DOM y les asigna las variables correspondientes.
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


function MoveItem(event) {
    let name = event.target.querySelector(".card-title").textContent; // Obtiene el nombre del producto
    let priceText = event.target.querySelector(".card-text").textContent; // Obtiene el texto del precio
    let category = Select_Category(event.target.classList);


    // // Verificar si tiene la clase 'PlacaMadre'
    // if (event.target.classList.contains("PlacaMadre")) {
    //     console.log("Este item tiene la clase PlacaMadre.");
    // } else {
    //     console.log("Este item NO tiene la clase PlacaMadre.");
    // }


    // Extrae el número del precio (quita el signo "$" y convierte a número)
    let price = parseFloat(priceText.replace(/[^\d]/g, ""));

    console.log("Producto seleccionado:", name, "$ " + price.toLocaleString('es-ES') + ", de la categoria " + category); //Para que este separado con 100.000 y no 100000

    // Guarda los datos para ser usados en el 'drop'
    Product = { name, price, category };

    console.log(Product);

    // localStorage.setItem("cart")
    // event.dataTransfer.setData("text/plain", JSON.stringify({ name, price }));
}

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


function AddItem(event) {
    event.preventDefault(); // Previene el comportamiento predeterminado del evento de soltar.


    if (CheckDuplicateProduct(Product.name, Product.category)) {
        alert("Este producto ya está en el carrito.");
        return;
    }

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


// Funciones de compatiblidad

function CheckDuplicateProduct(name, categoria) {
    if (categoria == "PlacaMadre" || categoria == "Procesador" || categoria == "Gabinetes" || categoria == "FuentesPoder") {

        if (ProductsCartList.length > 0) { //Si no hay objetos, no verificara

            for (let item of ProductsCartList) {
                if (item.name === name) {
                    return true; // Producto exacto ya en el carrito
                }
            }
        }
    }

    return false;
}

//Unir los checkeos a posterior;

function CheckDuplicateCategory(categoria) {
    if (categoria == "PlacaMadre" || categoria == "Procesador" || categoria == "Gabinetes" || categoria == "FuentesPoder") {
        //Categorias limitadas, no se contabiliza un limite de rams, almacenamiento o graficas.

        if (ProductsCartList.length > 0) { //Si no hay objetos, no verificara

            for (let item of ProductsCartList) {
                if (item.category === categoria) {
                    return true; // Producto exacto ya en el carrito
                }
            }
        }

        return false;
    }
}




// Solo revisa compatibilidad en procesador y placa, viceversa y rams.
function CheckCompability(name, category) {
    if (category == "PlacaMadre" || category == "Procesador" || category == "MemoriaRam") {
        var PlacaMadre_Modelo = {
            "Z790": { socket: "LGA1700", ram: "DDR5" },
            "B760": { socket: "LGA1700", ram: "DDR4" },
            "X670": { socket: "AM5", ram: "DDR5" },
            "B650": { socket: "AM5", ram: "DDR5" },
            "B550": { socket: "AM4", ram: "DDR4" },
            "A520": { socket: "AM4", ram: "DDR4" }
        };

        var Procesador_Modelo = {
            "i3-14": "LGA1700",
            "i5-12": "LGA1700",
            "i7-14": "LGA1700",
            "i9-12": "LGA1700",
            "Ryzen 7 98": "AM5",
            "Ryzen 5 46": "AM4",
            "Ryzen 5 56": "AM4",
            "Ryzen 7 57": "AM4"
        };

        if (ProductsCartList.length > 0) { // Si no hay objetos, no verificará
            //Variables para verificar de manera ordenada
            let socketProcesador = null;
            let socketPlacaMadre = null;
            let ramPlacaMadre = null;

            for (let item of ProductsCartList) {
                // Verificar compatibilidad entre procesador y placa madre
                if (category === "Procesador" && item.category === "PlacaMadre") {
                    console.log("Verificando compatibilidad entre Procesador y PlacaMadre");

                    for (let modelo in PlacaMadre_Modelo) {
                        if (item.name.includes(modelo)) {
                            socketPlacaMadre = PlacaMadre_Modelo[modelo].socket;
                            console.log("Socket de la PlacaMadre: " + socketPlacaMadre);
                        }
                    }

                    for (let modelo in Procesador_Modelo) {
                        if (name.includes(modelo)) {
                            socketProcesador = Procesador_Modelo[modelo];
                            console.log("Socket del Procesador: " + socketProcesador);
                        }
                    }

                    if (socketPlacaMadre && socketProcesador && socketPlacaMadre === socketProcesador) {
                        console.log("Compatibilidad encontrada entre el procesador y la placa madre.");
                        return true; // Compatible
                    }
                    console.log("No es compatible entre el procesador y la placa madre.");
                }

                if (category === "PlacaMadre" && item.category === "Procesador") {
                    console.log("Verificando compatibilidad entre PlacaMadre y Procesador");

                    for (let modelo in PlacaMadre_Modelo) {
                        if (name.includes(modelo)) {
                            socketPlacaMadre = PlacaMadre_Modelo[modelo].socket;
                            ramPlacaMadre = PlacaMadre_Modelo[modelo].ram;
                            console.log("Socket de la PlacaMadre: " + socketPlacaMadre + ", RAM: " + ramPlacaMadre);
                        }
                    }

                    for (let modelo in Procesador_Modelo) {
                        if (item.name.includes(modelo)) {
                            socketProcesador = Procesador_Modelo[modelo];
                            console.log("Socket del Procesador: " + socketProcesador);
                        }
                    }

                    if (socketPlacaMadre && socketProcesador && socketPlacaMadre === socketProcesador) {
                        console.log("Compatibilidad encontrada entre la placa madre y el procesador.");
                        return true; // Compatible
                    }
                    console.log("No es compatible entre la placa madre y el procesador.");
                }

                // Verificar compatibilidad de Memoria RAM
                if (category === "MemoriaRam" && item.category === "PlacaMadre") {
                    console.log("Verificando compatibilidad de Memoria RAM con PlacaMadre");

                    for (let modelo in PlacaMadre_Modelo) {
                        if (item.name.includes(modelo)) {
                            ramPlacaMadre = PlacaMadre_Modelo[modelo].ram;
                            console.log("Tipo de RAM de la PlacaMadre: " + ramPlacaMadre);
                        }
                    }

                    if (name.includes("DDR4") && ramPlacaMadre === "DDR4") {
                        console.log("Compatible con DDR4");
                        return true;
                    }
                    if (name.includes("DDR5") && ramPlacaMadre === "DDR5") {
                        console.log("Compatible con DDR5");
                        return true;
                    }
                    console.log("No es compatible con la memoria RAM.");
                }
            }
        }
        else {
            return true; //Compatible
        }
    }
    else {
        return true; //Compatible
    }
    return false;
}



function SaveCart() {
    // Convertir ProductsCartList en JSON y almacenarlo en localStorage.
    localStorage.setItem("ProductsCartList", JSON.stringify(ProductsCartList));
    console.log("Carrito guardado.");
}

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