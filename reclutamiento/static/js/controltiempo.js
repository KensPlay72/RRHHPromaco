// Función para obtener el token CSRF de las cookies
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

// Enviar el formulario de Control de Tiempo
document.getElementById('register-form-controltiempo').addEventListener('submit', function(event) {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken');  // Obtén el token CSRF

    const data = {
        unidadNegocio: document.getElementById('unidadnegocio').value,
        puesto: document.getElementById('puestos').value,
        departamento: document.getElementById('departamento').value,
        tiempo: document.getElementById('tiempo').value,
        estado: document.getElementById('estado').value  // Agregar el estado
    };

    fetch('/ControlTiempo/', {  // Asegúrate de que esta ruta es correcta
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken  // Añadir el token CSRF en el encabezado
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
                text: 'Control de Tiempo Registrado',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();  // Recargar la página
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



document.getElementById('update-form-controltiempo').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío normal del formulario

    const csrftoken = getCookie('csrftoken'); // Obtener el token CSRF
    const id = document.getElementById('ideditar').value; // Obtener el ID del registro

    const data = {
        unidadnegocio: document.getElementById('unidadnegocioeditar').value,
        departamento: document.getElementById('departamentoeditar').value,
        puestos: document.getElementById('puestoseditar').value,
        tiempo: document.getElementById('tiempoeditar').value,
        estado: document.getElementById('estadoeditar').value
    };

    fetch(`/ControlTiempo/Update/${id}/`, { // URL ajustada para incluir el ID
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken // Añadir el token CSRF en el encabezado
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
                text: 'Control de Tiempo actualizado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            }).then(() => {
                location.reload(); // Recargar la página para ver los cambios
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




function llenarFormularioEditar(boton) {
    var controlesData = JSON.parse(document.getElementById('controles-data').textContent);
    var idControl = boton.getAttribute('data-editar');
    var controlSeleccionado = controlesData.find(control => control.id == idControl);

    if (controlSeleccionado) {
        document.getElementById('ideditar').value = controlSeleccionado.id;
        document.getElementById('unidadnegocioeditar').value = controlSeleccionado.unidad_de_negocio;
        document.getElementById('departamentoeditar').value = controlSeleccionado.departamento;
        document.getElementById('puestoseditar').value = controlSeleccionado.puestos;
        document.getElementById('tiempoeditar').value = controlSeleccionado.tiempo;
        document.getElementById('estadoeditar').value = controlSeleccionado.estado;
        $('#unidadnegocioeditar').val(controlSeleccionado.unidad_de_negocio).change();
        $('#departamentoeditar').val(controlSeleccionado.departamento).change();
        $('#puestoseditar').val(controlSeleccionado.puestos).change();
    } else {
        console.error("Control no encontrado en el JSON");
    }
}

