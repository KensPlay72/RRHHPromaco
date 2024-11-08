document.getElementById('register-form-ciudades').addEventListener('submit', function(event) {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken');  // Obtén el token CSRF

    const data = {
        nombre_ciudades: document.getElementById('nombre_ciudades').value,
        estado: document.getElementById('estado').value
    };

    fetch('/Listas/Ciudades/', {
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
                text: 'Ciudad Registrada',
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

document.getElementById('update-form-ciudades').addEventListener('submit', function(event) {
    event.preventDefault();

    const idCiudad = document.getElementById('id_ciudades_editar').value;
    const csrftoken = getCookie('csrftoken');  // Obtén el token CSRF

    const data = {
        nombre_ciudades: document.getElementById('nombre_ciudades_editar').value,
        estado: document.getElementById('estadoeditar').value
    };

    fetch(`/Listas/Ciudades/Update/${idCiudad}/`, {
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
                text: 'Ciudad Actualizada',
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
    var ciudadesData = JSON.parse(document.getElementById('ciudades-data').textContent);
    var idCiudad = boton.getAttribute('data-editar');
    var ciudadSeleccionada = ciudadesData.find(ciudad => ciudad.id == idCiudad);

    if (ciudadSeleccionada) {
        document.getElementById('id_ciudades_editar').value = ciudadSeleccionada.id;
        document.getElementById('nombre_ciudades_editar').value = ciudadSeleccionada.nombre_ciudades;
        document.getElementById('estadoeditar').value = ciudadSeleccionada.estado;
    } else {
        console.error("Ciudad no encontrada en el JSON");
    }
}

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
