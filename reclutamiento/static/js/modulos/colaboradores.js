document.getElementById('register-form-colaborador').addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar la recarga de la página al enviar el formulario

    const csrftoken = getCookie('csrftoken');  // Obtener el token CSRF

    // Recoger los valores del formulario
    const data = {
        nombrecolaborador: document.getElementById('nombrejefe').value,
        sucursal: document.getElementById('sucursal').value,
        empresa: document.getElementById('empresa').value,
        unidadnegocio: document.getElementById('unidadnegocio').value,
        departamento: document.getElementById('departamento').value,
        jefes: document.getElementById('jefes').value,
        estado: document.getElementById('estado').value,
        codigocolaborador: document.getElementById('codigocolaborador').value
    };

    console.log(data);  // Para depuración, esto imprime los datos en la consola

    // Enviar la solicitud POST con los datos
    fetch('/Listas/Colaboradores/', {
        method: 'POST',
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
                text: 'Colaborador registrado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();  // Recargar la página para actualizar la tabla
                }
            });
        }
    })
    .catch(error => {
        Swal.fire({
            title: 'Error',
            text: 'Hubo un error en la solicitud.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
    });
});

// Función para obtener el token CSRF
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

function llenarFormularioEditar(boton) {
    var colaboradoresData = JSON.parse(document.getElementById('colaboradores-data').textContent);
    var idColaborador = boton.getAttribute('data-editar');
    var colaboradorSeleccionado = colaboradoresData.find(colaborador => colaborador.id == idColaborador);


    if (colaboradorSeleccionado) {
        document.getElementById('idcolaborador').value = colaboradorSeleccionado.id;
        document.getElementById('nombrejefeeditar').value = colaboradorSeleccionado.nombrecolaborador;
        document.getElementById('codigocolaboradoreditar').value = colaboradorSeleccionado.codigocolaborador;

        // Establece el valor de los select por su ID
        document.getElementById('sucursaleditar').value = colaboradorSeleccionado.sucursal_id;
        document.getElementById('empresaeditar').value = colaboradorSeleccionado.empresa_id;
        document.getElementById('unidadnegocioeditar').value = colaboradorSeleccionado.unidad_de_negocio_id;
        document.getElementById('departamentoeditar').value = colaboradorSeleccionado.departamento_id;
        document.getElementById('jefeseditar').value = colaboradorSeleccionado.jefe_id;

        document.getElementById('estadoeditar').value = colaboradorSeleccionado.estado;
    } else {
        console.error("Colaborador no encontrado para el ID:", idColaborador);
    }
}


document.getElementById('update-form-colaboradores').addEventListener('submit', function(event) {
    event.preventDefault();

    const idColaborador = document.getElementById('idcolaborador').value;
    const csrftoken = getCookie('csrftoken'); // Obtener el token CSRF si lo usas

    const data = {
        nombrecolaborador: document.getElementById('nombrejefeeditar').value,
        sucursal_id: document.getElementById('sucursaleditar').value,
        empresa_id: document.getElementById('empresaeditar').value,
        unidad_de_negocio_id: document.getElementById('unidadnegocioeditar').value,
        departamento_id: document.getElementById('departamentoeditar').value,
        jefe_id: document.getElementById('jefeseditar').value,
        estado: document.getElementById('estadoeditar').value,
        codigocolaborador: document.getElementById('codigocolaboradoreditar').value
    };

    fetch(`/Listas/Colaboradores/Update/${idColaborador}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken  // Asegúrate de pasar el CSRF token en caso de que lo uses
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                title: 'Éxito',
                text: 'Colaborador actualizado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            }).then(() => {
                window.location.reload(); // Recargar la página o redirigir si es necesario
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: data.message,
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
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