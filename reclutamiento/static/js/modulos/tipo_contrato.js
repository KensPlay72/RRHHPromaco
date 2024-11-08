document.getElementById('register-form-tipo-contrato').addEventListener('submit', function(event) {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken');

    const data = {
        nombre_tipo_de_contrato: document.getElementById('nombre_tipo_de_contrato').value,
        estado: document.getElementById('estado').value
    };

    fetch('/Listas/TipoContrato/', {
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
                text: 'Tipo de Contrato Registrado',
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

document.getElementById('update-form-tipo-contrato').addEventListener('submit', function(event) {
    event.preventDefault();

    const idTipo = document.getElementById('id_tipo_contrato_editar').value;
    const csrftoken = getCookie('csrftoken');

    const data = {
        nombre_tipo_de_contrato: document.getElementById('nombre_tipo_contrato_editar').value,
        estado: document.getElementById('estadoeditar').value
    };

    fetch(`/Listas/TipoContrato/Update/${idTipo}/`, {
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
                text: 'Tipo de Contrato Actualizado',
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

// Función para llenar el formulario de edición con los datos del tipo de contrato seleccionado
function llenarFormularioEditar(boton) {
    const tiposData = JSON.parse(document.getElementById('tipos-contrato-data').textContent);
    const idTipo = boton.getAttribute('data-editar');
    const tipoSeleccionado = tiposData.find(tipo => tipo.id == idTipo);

    if (tipoSeleccionado) {
        document.getElementById('id_tipo_contrato_editar').value = tipoSeleccionado.id;
        document.getElementById('nombre_tipo_contrato_editar').value = tipoSeleccionado.nombre_tipo_de_contrato;
        document.getElementById('estadoeditar').value = tipoSeleccionado.estado;
    } else {
        console.error("Tipo de contrato no encontrado en el JSON");
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
