document.getElementById('register-form-empresa').addEventListener('submit', function(event) {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken');  // Obtén el token CSRF

    // Recopilar los datos del formulario, incluyendo el estado
    const data = {
        nombre_empresa: document.getElementById('nombre_empresa').value,
        estado: document.getElementById('estado').value  // Añadir el estado al objeto data
    };

    console.log(data);

    fetch('/Listas/Empresas/', {
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
                text: 'Empresa Registrada',
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

document.getElementById('update-form-empresa').addEventListener('submit', function(event) {
    event.preventDefault();

    const idEmpresa = document.getElementById('id_empresa_editar').value;
        const csrftoken = getCookie('csrftoken'); 

    // Recopilar los datos del formulario, incluyendo el estado
    const data = {
        nombre_empresa: document.getElementById('nombre_empresa_editar').value,
        estado: document.getElementById('estadoeditar').value  
    };

    console.log(idEmpresa, data);

    fetch(`/Listas/Empresas/Update/${idEmpresa}/`, {
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
                text: 'Empresa Actualizada',
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



function llenarFormularioEditar(boton) {
    var empresasData = JSON.parse(document.getElementById('empresas-data').textContent); 
    var idEmpresa = boton.getAttribute('data-editar');
    var empresaSeleccionada = empresasData.find(empresa => empresa.id == idEmpresa);

    if (empresaSeleccionada) {
        document.getElementById('id_empresa_editar').value = empresaSeleccionada.id;
        document.getElementById('nombre_empresa_editar').value = empresaSeleccionada.nombre_empresa;
        document.getElementById('estadoeditar').value = empresaSeleccionada.estado;
    } else {
        console.error("Empresa no encontrada en el JSON para el ID:", idEmpresa);
    }
}


