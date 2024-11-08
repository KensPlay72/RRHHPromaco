document.getElementById('register-form-motivo').addEventListener('submit', function(event) {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken');  // Obtén el token CSRF

    const data = {
        nombre_motivo: document.getElementById('nombre_motivo').value,
        estado: document.getElementById('estado').value  // Añadir el estado al objeto data
    };

    fetch('/Listas/Motivos/', {
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
                text: 'Motivo Registrado',
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

document.getElementById('update-form-motivo').addEventListener('submit', function(event) {
    event.preventDefault();

    const idMotivo = document.getElementById('id_motivo_editar').value;
    const csrftoken = getCookie('csrftoken');  // Obtén el token CSRF

    const data = {
        nombre_motivo: document.getElementById('nombre_motivo_editar').value,
        estado: document.getElementById('estadoeditar').value  // Añadir el estado al objeto data
    };

    fetch(`/Listas/Motivos/Update/${idMotivo}/`, {
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
                text: 'Motivo Actualizado',
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

// Función para llenar el formulario de edición con los datos del motivo seleccionado
function llenarFormularioEditar(boton) {
    var motivosData = JSON.parse(document.getElementById('motivos-data').textContent);
    var idMotivo = boton.getAttribute('data-editar');
    var motivoSeleccionado = motivosData.find(motivo => motivo.id == idMotivo);

    if (motivoSeleccionado) {
        document.getElementById('id_motivo_editar').value = motivoSeleccionado.id;
        document.getElementById('nombre_motivo_editar').value = motivoSeleccionado.nombre_motivo;
        document.getElementById('estadoeditar').value = motivoSeleccionado.estado;
    } else {
        console.error("Motivo no encontrado en el JSON");
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
