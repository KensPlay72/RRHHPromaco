document.getElementById('register-form-departamento').addEventListener('submit', function(event) {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken');  // Obtén el token CSRF

    const data = {
        nombre_departamento: document.getElementById('nombre_departamento').value,
        estado: document.getElementById('estado').value  // Añadir el estado al objeto data
    };

    fetch('/Listas/Departamentos/', {
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
                text: 'Departamento Registrado',
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

document.getElementById('update-form-departamento').addEventListener('submit', function(event) {
    event.preventDefault();

    const idDepartamento = document.getElementById('id_departamento_editar').value;
    const csrftoken = getCookie('csrftoken');  // Obtén el token CSRF

    const data = {
        nombre_departamento: document.getElementById('nombre_departamento_editar').value,
        estado: document.getElementById('estadoeditar').value  // Añadir el estado al objeto data
    };

    console.log("ID Departamento:", idDepartamento);
    console.log("Datos enviados:", data);

    fetch(`/Listas/Departamentos/Update/${idDepartamento}/`, {
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
                text: 'Departamento Actualizado',
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

// Función para llenar el formulario de edición con los datos del departamento seleccionado
function llenarFormularioEditar(boton) {
    var departamentosData = JSON.parse(document.getElementById('departamentos-data').textContent);
    var idDepartamento = boton.getAttribute('data-editar');
    var departamentoSeleccionado = departamentosData.find(departamento => departamento.id == idDepartamento);

    if (departamentoSeleccionado) {
        document.getElementById('id_departamento_editar').value = departamentoSeleccionado.id;
        document.getElementById('nombre_departamento_editar').value = departamentoSeleccionado.nombre_departamento;
        document.getElementById('estadoeditar').value = departamentoSeleccionado.estado;
    } else {
        console.error("Departamento no encontrado en el JSON");
    }
}
