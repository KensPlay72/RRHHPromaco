document.getElementById('register-form-puesto').addEventListener('submit', function(event) {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken');  

    const data = {
        nombre_puestos: document.getElementById('nombre_puestos').value,
        estado: document.getElementById('estado').value  
    };

    fetch('/Listas/Puestos/', {
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
                text: 'Puesto Registrado',
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
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.getElementById('update-form-puesto').addEventListener('submit', function(event) {
    event.preventDefault();

    const idPuesto = document.getElementById('id_puesto_editar').value;
    const csrftoken = getCookie('csrftoken');  

    const data = {
        nombre_puestos: document.getElementById('nombre_puesto_editar').value,
        estado: document.getElementById('estadoeditar').value  
    };

    fetch(`/Listas/Puestos/Update/${idPuesto}/`, {
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
                text: 'Puesto Actualizado',
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
    var puestosData = JSON.parse(document.getElementById('puestos-data').textContent);
    var idPuesto = boton.getAttribute('data-editar');
    var puestoSeleccionado = puestosData.find(puesto => puesto.id == idPuesto);

    if (puestoSeleccionado) {
        document.getElementById('id_puesto_editar').value = puestoSeleccionado.id;
        document.getElementById('nombre_puesto_editar').value = puestoSeleccionado.nombre_puestos;
        document.getElementById('estadoeditar').value = puestoSeleccionado.estado;
    } else {
        console.error("Puesto no encontrado en el JSON");
    }
}
