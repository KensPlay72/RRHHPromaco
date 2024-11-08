document.getElementById('register-form-sucursales').addEventListener('submit', function(event) {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken');  // Obtén el token CSRF

    // Recopilar los datos del formulario, incluyendo el estado
    const data = {
        nombre_sucursal: document.getElementById('nombre_sucursal').value,
        estado: document.getElementById('estado').value  // Añadir el estado al objeto data
    };

    console.log(data);

    fetch('/Listas/Sucursales/', {
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
                text: 'Sucursal Registrada',
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

document.getElementById('update-form-sucursales').addEventListener('submit', function(event) {
    event.preventDefault();

    const idSucursal = document.getElementById('id_sucursal_editar').value;
    const csrftoken = getCookie('csrftoken');  // Obtén el token CSRF

    // Recopilar los datos del formulario, incluyendo el estado
    const data = {
        nombre_sucursal: document.getElementById('nombre_sucursal_editar').value,
        estado: document.getElementById('estadoeditar').value  // Añadir el estado al objeto data
    };

    fetch(`/Listas/Sucursales/Update/${idSucursal}/`, {
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
                text: 'Sucursal Actualizada',
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
    var sucursalesData = JSON.parse(document.getElementById('sucursales-data').textContent);
    var idSucursal = boton.getAttribute('data-editar');
    var sucursalSeleccionada = sucursalesData.find(sucursal => sucursal.id == idSucursal);

    if (sucursalSeleccionada) {
        document.getElementById('id_sucursal_editar').value = sucursalSeleccionada.id;
        document.getElementById('nombre_sucursal_editar').value = sucursalSeleccionada.nombre_sucursal;
        document.getElementById('estadoeditar').value = sucursalSeleccionada.estado;

    } else {
        console.error("Sucursal no encontrada en el JSON");
    }
}


