document.getElementById('register-form-unidad_negocio').addEventListener('submit', function(event) {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken'); 

    const data = {
        nombre_unidad_negocio: document.getElementById('nombre_unidad_negocio').value,
        estado: document.getElementById('estado').value 
    };

    fetch('/Listas/Unidad_Negocio/', {
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
                text: 'Unidad de negocio registrada',
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


// Función para obtener el token CSRF de las cookies
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

document.getElementById('update-form-unidad_negocio').addEventListener('submit', function(event) {
    event.preventDefault();

    const idUnidadNegocio = document.getElementById('id_unidad_negocio_editar').value;
    const csrftoken = getCookie('csrftoken');

    const data = {
        nombre_unidad_negocio: document.getElementById('nombre_unidad_negocio_editar').value,
        estado: document.getElementById('estadoeditar').value 
    };

    fetch(`/Listas/Unidad_Negocio/Update/${idUnidadNegocio}/`, {
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
                text: 'Unidad de negocio actualizada',
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


function llenarFormularioEditar(boton) {
    var unidadNegocioData = JSON.parse(document.getElementById('unidades_negocio-data').textContent);
    var idUnidadNegocio = boton.getAttribute('data-editar');
    var unidadSeleccionada = unidadNegocioData.find(unidad => unidad.id == idUnidadNegocio);

    if (unidadSeleccionada) {
        document.getElementById('id_unidad_negocio_editar').value = unidadSeleccionada.id;
        document.getElementById('nombre_unidad_negocio_editar').value = unidadSeleccionada.nombre_unidad_de_negocio;
        document.getElementById('estadoeditar').value = unidadSeleccionada.estado;

    } else {
        console.error("Unidad de negocio no encontrada en el JSON");
    }
}
