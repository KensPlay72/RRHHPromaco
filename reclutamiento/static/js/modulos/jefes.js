document.getElementById('register-form-jefes').addEventListener('submit', function(event) {
    event.preventDefault();

    const codigo = document.getElementById('codigo').value;
    const nombrejefe = document.getElementById('nombrejefe').value;
    const estado = document.getElementById('estado').value;

    // Validar longitud del código (máximo 20 caracteres)
    if (codigo.length > 20) {
        Swal.fire({
            title: 'Error',
            text: 'El código es demasiado largo. El máximo permitido es 20 caracteres.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
        return;  // Detener el envío del formulario si el código es demasiado largo
    }

    const csrftoken = getCookie('csrftoken');  // Obtén el token CSRF

    const data = {
        codigo: codigo,
        nombrejefe: nombrejefe,
        estado: estado,
        identidadjefe : document.getElementById('identidadjefe').value
    };

    console.log(data);

    fetch('/Listas/Jefes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken 
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            Swal.fire({
                title: 'Error',
                text: data.message,
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            });
        } else {
            Swal.fire({
                title: 'Éxito',
                text: 'Jefe Registrado',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload(); // Recargar la página para actualizar la tabla
                }
            });
        }
    })
    .catch(error => {
        Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
    });
});

function validateNumber(input) {
    input.value = input.value.replace(/[^0-9.+]/g, '');
  }


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Verifica si el nombre de la cookie coincide con el que estamos buscando
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



function llenarFormularioEditar(boton) {
    var jefesData = JSON.parse(document.getElementById('jefes-data').textContent);

    var idJefe = boton.getAttribute('data-editar');

    var jefeSeleccionado = jefesData.find(jefe => jefe.id == idJefe);

    if (jefeSeleccionado) {
        document.getElementById('idjefe').value = jefeSeleccionado.id;
        document.getElementById('identidadjefeditar').value = jefeSeleccionado.identidadjefe;   
        document.getElementById('codigoeditar').value = jefeSeleccionado.codigo;
        document.getElementById('nombrejefeeditar').value = jefeSeleccionado.nombrejefe;
        document.getElementById('estadoeditar').value = jefeSeleccionado.estado;
    } else {
        console.error("Jefe no encontrado en el JSON para el ID:", idJefe);
    }
}


document.getElementById('update-form-jefes').addEventListener('submit', function(event) {
    event.preventDefault();

    const idjefe = document.getElementById('idjefe').value;
        const csrftoken = getCookie('csrftoken'); 

    // Recopilar los datos del formulario, incluyendo el estado
    const data = {
        codigo : document.getElementById('codigoeditar').value,
        nombrejefe : document.getElementById('nombrejefeeditar').value,
        estado : document.getElementById('estadoeditar').value,
        identidadjefe : document.getElementById('identidadjefeditar').value
    };

    fetch(`/Listas/Jefes/Update/${idjefe}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken 
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            Swal.fire({
                title: 'Error',
                text: data.message,
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            });
        } else {
            Swal.fire({
                title: 'Éxito',
                text: 'Jefe Actualizado Correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload(); // Recargar la página para actualizar la tabla
                }
            });
        }
    })
    .catch(error => {
        Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
    });
});