let userDni = '';


document.getElementById("btn-login-usuarios").onclick = function (event) {
    event.preventDefault();

    const dni = document.getElementById('dni').value;
    const password = document.getElementById('password').value;

    if (!dni || !password) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Debe ingresar DNI y contraseña.',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
        return;
    }

    userDni = dni;

    const formData = {
        dni: dni,
        password: password
    };

    fetch('/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')  // Asegúrate de que el token esté disponible
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.error,
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            });
        } else if (data.showModal) {
            // Mostrar el modal para cambiar la contraseña
            var myModal = new bootstrap.Modal(document.getElementById('modaleditarcontralogin'), {
                keyboard: false
            });
            myModal.show();
        } else if (data.redirect) {
            window.location.href = data.redirect;
        }
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al iniciar sesión.',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
    });
};


document.getElementById('update-form-usuarios').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener los valores de los inputs de contraseña
    let password = document.getElementById('contrasenaempleadoeditar').value;
    let password_confirmation = document.getElementById('veri').value;
    console.log('DNI del usuario:', userDni);

    // Validar que los campos no estén vacíos
    if (password.length < 8) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'La contraseña debe tener al menos 8 caracteres.',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
        return;
    }

    // Validar que la contraseña no sea "12345678"
    if (password === '12345678') {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'La contraseña no puede ser 12345678.',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
        return;
    }

    if (password !== password_confirmation) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Las contraseñas no coinciden.',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
        return;
    }

    // Asegurarse de que el DNI esté capturado
    if (!userDni) { // Asegúrate de que userDni esté definido y tenga el valor correcto
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'No se ha encontrado un DNI válido. Por favor, inicie sesión primero.',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
        return;
    }

    fetch('/Users/UpdatePassword/', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            dni: userDni, // Enviar el DNI capturado
            contrasenaeditar: password,
            new_password_confirmation: password_confirmation
        })
    })
    .then(response => {
        console.log('Response status:', response.status); // Verificar el estado de la respuesta
        return response.text(); // Intentar obtener la respuesta como texto para depuración
    })
    .then(text => {
        console.log('Respuesta del servidor:', text); // Imprimir la respuesta completa
        let data;
        try {
            data = JSON.parse(text); // Intentar convertir el texto a JSON
        } catch (error) {
            throw new Error('Error al parsear la respuesta JSON: ' + error.message);
        }
        if (data.error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.error,
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Contraseña actualizada',
                text: 'Tu contraseña ha sido actualizada correctamente.',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            }).then(() => {
                // Recargar la página después de cambiar la contraseña exitosamente
                location.reload();
            });
        }
    })
    .catch(error => {
        console.error('Error en el fetch:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al actualizar la contraseña. ' + error.message,
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
    });
});


// Función para obtener el token CSRF
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
