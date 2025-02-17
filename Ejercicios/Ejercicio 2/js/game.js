/** @file 
 * 
 * 
 * @author Cristian Peña <cristian.penavillar@gmail.com)
 * @link Github Mr.Vengador
 */


//Capturamos los obj a usar
const object = document.getElementById("object");
const container = document.getElementById("contenedor");

//Evento de objeto movido
object.addEventListener('dragstart',
    e => {
        console.log("El objeto comienza a moverse.");
    }
);

object.addEventListener('dragend',
    e => {
        console.log("El objeto deja de moverse.");

    }
)

// object.addEventListener('drag',
//     e => {
//         console.log("El objeto se esta moviendo.");

//     }
// )


//Eventos sobre contenedor

container.addEventListener('dragenter',
    e => {
        console.log("El objeto esta entrando en el container.");

    }
)

container.addEventListener("dragover",
    e => {
        // console.log("El objeto esta moviendose en el container.");
        e.preventDefault();

    }
)

container.addEventListener("drop",
    e => {
        console.log("El objeto se solto en el container.");

    }
)


