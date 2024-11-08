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

const csrftoken = getCookie('csrftoken');

// Función para registrar un nuevo modo
document.getElementById('register-form-modo').addEventListener('submit', function(event) {
    event.preventDefault();

    const data = {
        nombre_modo: document.getElementById('nombre_modo').value,
        estado: document.getElementById('estado').value  
    };

    fetch('/Listas/Modos/', {
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
                text: 'Modo Registrado',
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

// Función para llenar el formulario de edición con los datos del modo seleccionado
function llenarFormularioEditar(boton) {
    const modosData = JSON.parse(document.getElementById('modos-data').textContent);
    const idModo = boton.getAttribute('data-editar');
    const modoSeleccionado = modosData.find(modo => modo.id == idModo);

    if (modoSeleccionado) {
        document.getElementById('id_modo_editar').value = modoSeleccionado.id;
        document.getElementById('nombre_modo_editar').value = modoSeleccionado.nombre_modo;
        document.getElementById('estadoeditar').value = modoSeleccionado.estado;
    } else {
        console.error("Modo no encontrado en el JSON");
    }
}


// Función para actualizar un modo existente
document.getElementById('update-form-modo').addEventListener('submit', function(event) {
    event.preventDefault();

    const idModo = document.getElementById('id_modo_editar').value;
    const data = {
        nombre_modo: document.getElementById('nombre_modo_editar').value,
        estado: document.getElementById('estadoeditar').value  
    };

    fetch(`/Listas/Modos/Update/${idModo}/`, {
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
                text: 'Modo Actualizado',
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
