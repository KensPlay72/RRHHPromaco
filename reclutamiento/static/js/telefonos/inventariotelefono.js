document.getElementById('register-form-inventariotelefonos').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const csrftoken = getCookie('csrftoken');  // Obtén el token CSRF

    // Obtener los valores del formulario
    const data = {
        nombretelefono: document.getElementById('nombretelefono').value,
        valortelefono: document.getElementById('valortelefono').value,
        cantidad: document.getElementById('cantidad').value,
        estado: document.getElementById('estado').value,
        estadotelefono: document.getElementById('estadotelefono').value
    };

    // Enviar los datos al servidor con fetch
    fetch('/Inventario/Inventariotelefonos/', {
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
                text: `${data.message}`,  // Mostrar la cantidad de registros creados
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();  // Recargar la página para limpiar el formulario
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


function eliminacion(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        customClass: {
            confirmButton: 'custom-alertas-button'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/inventario/telefono/delete/${id}/`, {  // Cambia la URL a tu endpoint
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')  // Asegúrate de incluir el token CSRF
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        title: 'Éxito',
                        text: 'Teléfono eliminado con éxito.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        customClass: {
                            confirmButton: 'custom-alertas-button'
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload(); // Recargar la página para reflejar los cambios
                        }
                    });
                } else {
                    throw new Error(data.message || 'Error en la eliminación');
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
        }
    });
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


//----------------FILTROS TELEFONOS//----------------//
function mostrarFiltro(filtroId) {
    const filtro = document.getElementById(filtroId);

    if (filtro.style.display === 'none' || filtro.style.display === '') {
        // Ocultar todos los demás filtros antes de mostrar el actual
        document.querySelectorAll('.filter-popup').forEach(popup => popup.style.display = 'none');
        filtro.style.display = 'block';
    } else {
        filtro.style.display = 'none';
    }
}


function toggleDeducidoFields() {
    const select = document.getElementById('caracter');
    const deducidoFields = document.querySelectorAll('.ocultardeducido');

    if (select.value === 'DEDUCIDO') {
        deducidoFields.forEach(field => {
            field.style.display = 'block'; // Mostrar campos
        });
    } else {
        deducidoFields.forEach(field => {
            field.style.display = 'none'; // Ocultar campos
        });
    }
}

function generarCorrelativo() {
    const fecha = new Date();

    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes empieza desde 0, por eso +1
    const año = fecha.getFullYear();
    const hora = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');

    // Formato: dia-mes-año-hora:minutos:segundos
    const correlativo = `${dia}${mes}${año}${hora}${minutos}${segundos}`;

    // Asignar el valor al input correlativo
    document.getElementById('correlativo').value = correlativo;
}

function llenarFormularioEditar(boton) {
    var jsonData = document.getElementById('inventario-telefonos-data').textContent;
    var inventarioTelefonosData = JSON.parse(jsonData);
    var idTelefono = boton.getAttribute('data-editar');
    
    var telefonoSeleccionado = inventarioTelefonosData.find(telefono => telefono.id == idTelefono);

    if (telefonoSeleccionado) {
        document.getElementById('idtelefonoeditar').value = telefonoSeleccionado.id;
        document.getElementById('valortelefonoeditar').value = telefonoSeleccionado.valortotal;
        document.getElementById('estadotelefonoeditar').value = telefonoSeleccionado.estadotelefono;
        document.getElementById('estadoeditar').value = telefonoSeleccionado.estado;
    } else {
        console.error("Teléfono no encontrado en el JSON");
    }
}



document.getElementById('update-form-inventariotelefono').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío normal del formulario

    const idTelefono = document.getElementById('idtelefonoeditar').value;
    const csrftoken = getCookie('csrftoken'); // Obtener el token CSRF

    // Crear un objeto de datos con los valores del formulario
    const data = {
        valortelefono: document.getElementById('valortelefonoeditar').value,
        estadotelefono: document.getElementById('estadotelefonoeditar').value,
        estado: document.getElementById('estadoeditar').value
    };

    console.log("ID Teléfono:", idTelefono);
    console.log("Datos enviados:", data);

    fetch(`/inventario/telefonos/update/${idTelefono}/`, { // Cambia la URL según tu ruta
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken // Incluir el token CSRF
        },
        body: JSON.stringify(data) // Convertir el objeto a JSON
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
                text: 'Teléfono actualizado',
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

