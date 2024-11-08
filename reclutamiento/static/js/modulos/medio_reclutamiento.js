document.getElementById('register-form-medio-reclutamiento').addEventListener('submit', function(event) {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken');  // Obtener el token CSRF

    const data = {
        nombre_medio_de_reclutamiento: document.getElementById('nombre_medio_de_reclutamiento').value,
        estado: document.getElementById('estado').value  // Añadir el estado al objeto data
    };

    fetch('/Listas/MediosReclutamiento/', {
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
                text: 'Medio de Reclutamiento Registrado',
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

document.getElementById('update-form-medio-reclutamiento').addEventListener('submit', function(event) {
    event.preventDefault();

    const idMedio = document.getElementById('id_medio_reclutamiento_editar').value;
    const csrftoken = getCookie('csrftoken');  // Obtener el token CSRF

    const data = {
        nombre_medio_de_reclutamiento: document.getElementById('nombre_medio_reclutamiento_editar').value,
        estado: document.getElementById('estadoeditar').value  // Añadir el estado al objeto data
    };

    fetch(`/Listas/MediosReclutamiento/Update/${idMedio}/`, {
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
                text: 'Medio de Reclutamiento Actualizado',
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

// Función para llenar el formulario de edición con los datos del medio seleccionado
function llenarFormularioEditar(boton) {
    var mediosData = JSON.parse(document.getElementById('medios-reclutamiento-data').textContent);
    var idMedio = boton.getAttribute('data-editar');
    var medioSeleccionado = mediosData.find(medio => medio.id == idMedio);

    if (medioSeleccionado) {
        document.getElementById('id_medio_reclutamiento_editar').value = medioSeleccionado.id;
        document.getElementById('nombre_medio_reclutamiento_editar').value = medioSeleccionado.nombre_medio_de_reclutamiento;
        document.getElementById('estadoeditar').value = medioSeleccionado.estado;
    } else {
        console.error("Medio de reclutamiento no encontrado en el JSON");
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
