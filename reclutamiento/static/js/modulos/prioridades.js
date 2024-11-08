// Registrar una nueva prioridad
document.getElementById('register-form-prioridad').addEventListener('submit', function(event) {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken');  // Obtén el token CSRF

    const data = {
        nombre_prioridad: document.getElementById('nombre_prioridad').value,
        estado: document.getElementById('estado').value  // Añadir el estado al objeto data
    };

    fetch('/Listas/Prioridades/', {
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
                text: 'Prioridad Registrada',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
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

// Actualizar una prioridad existente
document.getElementById('update-form-prioridad').addEventListener('submit', function(event) {
    event.preventDefault();

    const idPrioridad = document.getElementById('id_prioridad_editar').value;
    const csrftoken = getCookie('csrftoken');  // Obtén el token CSRF

    const data = {
        nombre_prioridad: document.getElementById('nombre_prioridad_editar').value,
        estado: document.getElementById('estadoeditar').value  // Añadir el estado al objeto data
    };

    fetch(`/Listas/Prioridades/Update/${idPrioridad}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken  // Añadir el token CSRF
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
                text: 'Prioridad Actualizada',
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

// Función para llenar el formulario de edición con los datos de la prioridad seleccionada
function llenarFormularioEditar(boton) {
    var prioridadesData = JSON.parse(document.getElementById('prioridades-data').textContent);
    var idPrioridad = boton.getAttribute('data-editar');
    var prioridadSeleccionada = prioridadesData.find(prioridad => prioridad.id == idPrioridad);

    if (prioridadSeleccionada) {
        document.getElementById('id_prioridad_editar').value = prioridadSeleccionada.id;
        document.getElementById('nombre_prioridad_editar').value = prioridadSeleccionada.nombre_prioridad;
        document.getElementById('estadoeditar').value = prioridadSeleccionada.estado;
    } else {
        console.error("Prioridad no encontrada en el JSON");
    }
}

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
