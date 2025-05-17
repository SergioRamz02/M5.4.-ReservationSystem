// Promesas, async y await para un Sistema de Reservación para un Restaurante.

// Simulando una base de datos de mesas
const mesasDisponibles = 5;  // Número de mesas disponibles para reservar

// Función que simula la verificación de disponibilidad de mesas
function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Si hay suficientes mesas disponibles, resuelve la promesa, de lo contrario, recházala con un mensaje adecuado.
      if(mesasSolicitadas <= mesasDisponibles){
        return resolve(mesasSolicitadas);
      }else{
        reject("Lo sentimos, pero no tenemos mesas disponibles");
      }
    }, 2000);  // Simula un retraso en la verificación (2 segundos)
  });
}

// Función que simula el envío de un correo de confirmación
function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simula un envío de correo. Usa Math.random() para simular si el correo se envió correctamente o si ocurrió un error.
      const exito = Math.random() > 0.2; // 80% de probabilidad de éxito
      if (exito) {
        resolve(`Correo de confirmación enviado a ${nombreCliente}.`);
      } else {
        reject("Hubo un error al enviar el correo de confirmación.");
      }
    }, 1500);  // Simula el envío de un correo (1.5 segundos)
  });
}

// Función principal para manejar una reserva
async function hacerReserva(nombreCliente, mesasSolicitadas) {

// Código para mostrar la información en un HTML
    const resultado = document.getElementById("resultado");
    const error = document.getElementById("error");
    resultado.innerText = "";
    error.innerText = "";
      
  try {
    resultado.innerText = "Verificando disponibilidad de mesas...";
    const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);  // Llama a la función de verificación
// Si hay mesas disponibles, llama a la función para enviar la confirmación.
    resultado.innerText = `¡Reserva Aceptada!. Estimado ${nombreCliente}, se han reservado ${disponibilidad} mesas.`;

    resultado.innerText += "\nEnviando correo de confirmación...";
    const correoConfirmacion = await enviarConfirmacionReserva(nombreCliente);
    resultado.innerText += `\n${correoConfirmacion}`;

    // Si no hay mesas disponibles o si ocurre un error, captura el error.
  } catch (error) {
    error.innerText = err; // Maneja los errores en la promesa
  }
}

// Función para iniciar la reservación
function iniciarReservacion () {
    const nombre = document.getElementById("nombre").value;
      const mesas = parseInt(document.getElementById("mesas").value, 10);
      if (nombre && mesas > 0) {
        hacerReserva(nombre, mesas);
      } else {
        document.getElementById("error").innerText = "Por favor ingresa un nombre y número de mesas válido.";
      }
}
