document.getElementById('register-form-spicosmart').addEventListener('submit', function(event) {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken');  // Obtén el token CSRF

    const data = {
        nivel: document.getElementById('nivel').value,
        nombre_prueba: document.getElementById('nombre_prueba').value,
        prueba_mide: document.getElementById('prueba_mide').value,
        estado: document.getElementById('estado').value
    };

    fetch('/Listas/Psicosmart/', {
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
                text: 'Prueba registrada exitosamente',
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

document.getElementById('update-form-spicosmart').addEventListener('submit', function(event) {
    event.preventDefault();

    const idPrueba = document.getElementById('id_motivo_editar').value;  // Obtenemos el ID de la prueba
    const csrftoken = getCookie('csrftoken');  // Obtén el token CSRF

    // Crear el objeto de datos que se enviará
    const data = {
        nivel: document.getElementById('nivel_editar').value,
        nombre_prueba: document.getElementById('nombre_prueba_editar').value,
        prueba_mide: document.getElementById('prueba_mide_editar').value,
        estado: document.getElementById('estado_editar').value
    };

    // Realizamos la petición PUT para actualizar los datos de la prueba
    fetch(`/Listas/Psicosmart/Update/${idPrueba}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken  // Incluir el token CSRF en el encabezado
        },
        body: JSON.stringify(data)  // Convertimos los datos a JSON
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            // Si hay un error, mostrar una alerta
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
            // Si la actualización es exitosa, mostrar una alerta de éxito
            Swal.fire({
                title: 'Éxito',
                text: 'Prueba actualizada exitosamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();  // Recargar la página para ver los cambios actualizados
                }
            });
        }
    })
    .catch(error => {
        // Mostrar alerta en caso de error
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
    var psicosmartData = JSON.parse(document.getElementById('psicosmart-data').textContent);
    var idPrueba = boton.getAttribute('data-editar');
    var pruebaSeleccionada = psicosmartData.find(prueba => prueba.id == idPrueba);

    if (pruebaSeleccionada) {
        document.getElementById('id_motivo_editar').value = pruebaSeleccionada.id;
        document.getElementById('nivel_editar').value = pruebaSeleccionada.nivel;
        document.getElementById('nombre_prueba_editar').value = pruebaSeleccionada.nombre_prueba;
        document.getElementById('prueba_mide_editar').value = pruebaSeleccionada.prueba_mide;
        document.getElementById('estado_editar').value = pruebaSeleccionada.estado;
    } else {
        console.error("Prueba no encontrada en el JSON");
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
