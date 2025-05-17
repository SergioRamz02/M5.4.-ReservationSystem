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
  try {
    console.log("Verificando disponibilidad de mesas...");
    const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);  // Llama a la función de verificación
    
    // Si hay mesas disponibles, llama a la función para enviar la confirmación.
    console.log(`¡Reserva Aceptada!. Estimado ${nombreCliente}, se han reservado ${disponibilidad} mesas.`);

    console.log("Enviando correo de confirmación...");
    const correoConfirmacion = await enviarConfirmacionReserva(nombreCliente);
    console.log(correoConfirmacion);

    // Si no hay mesas disponibles o si ocurre un error, captura el error.
  } catch (error) {
    console.log("Error:", error);  // Maneja los errores en la promesa
    return Promise.reject("Lo sentimos pero su reservación no es posible");
  }
}

// Llamada de prueba
hacerReserva("Juan Pérez", 3);  // Intenta hacer una reserva para 3 personas