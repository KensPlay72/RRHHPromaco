let inactivityTime = 300000; // 5 minutos en milisegundos
let warningTime = 20000; // 20 segundos antes de cerrar sesión
let warningTimeout;
let inactivityTimeout;
let countdownInterval;

function resetInactivityTimer() {
    clearTimeout(inactivityTimeout);
    clearTimeout(warningTimeout);
    clearInterval(countdownInterval);
    inactivityTimeout = setTimeout(showInactivityWarning, inactivityTime);
}

function showInactivityWarning() {
    let countdown = 20;

    Swal.fire({
        title: '¿Estás ahí?',
        html: `Tu sesión expirará en <strong id="countdown">${countdown}</strong> segundos.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Seguir en la sesión',
        customClass: {
            confirmButton: 'custom-alertas-button'
        },
        cancelButtonText: 'Cerrar sesión',
        allowOutsideClick: false,
        allowEscapeKey: false,
        willClose: () => {
            clearInterval(countdownInterval);
        }
    }).then((result) => {
        if (result.isConfirmed) {
            resetInactivityTimer();
        } else {
            cerrarSesion();
        }
    });

    countdownInterval = setInterval(() => {
        countdown--;
        if (document.getElementById('countdown')) {
            document.getElementById('countdown').innerText = countdown;
        }
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            cerrarSesion();
        }
    }, 1000);
}

function cerrarSesion() {
    window.location.href = '/logout';
}

window.onload = resetInactivityTimer;
window.onmousemove = resetInactivityTimer;
window.onmousedown = resetInactivityTimer;
window.ontouchstart = resetInactivityTimer;
window.onclick = resetInactivityTimer;
window.onkeypress = resetInactivityTimer;

// document.addEventListener('click', function (event) {
//     const isContinueButton = event.target.matches('.swal2-confirm');
//     if (!isContinueButton) {
//         return;
//     }
//     resetInactivityTimer();
// });


// document.addEventListener('DOMContentLoaded', function() {
//     actualizarContadorSesiones(); // Llama a la función para cargar el valor inicial
// });

// // Función para actualizar el contador de sesiones
// function actualizarContadorSesiones() {
//     fetch('/contar-sesiones-activas/')
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById('sesiones-activas').innerText = data.sesiones_activas;
//         })
//         .catch(error => {
//             console.error('Error al obtener el conteo de sesiones activas:', error);
//         });
// }
// setInterval(actualizarContadorSesiones, 1000);