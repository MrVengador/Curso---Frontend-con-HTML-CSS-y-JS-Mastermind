/**
 * Chequea Categoria
 *
 * @param {*} categoria 
 * @returns {boolean} 
 */
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




/**
 * Solo revisa compatibilidad en procesador y placa, viceversa y rams.
 *
 * @param {*} name 
 * @param {*} category 
 * @returns {boolean} 
 */
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

