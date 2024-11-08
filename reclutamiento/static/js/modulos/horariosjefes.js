document.getElementById("registrarhorario").onclick = function(event) {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken'); 
    
    const data= {
        jefe: document.getElementById('jefes').value,
        hora_inicio: document.getElementById('horainicio').value,
        hora_fin: document.getElementById('horasalida').value,
        estado: document.getElementById('estado').value
    }
    fetch('/Listas/Horarios/', { 
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
                text: 'Horario registrado correctamente',
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
};

document.getElementById("updatehorarios").onclick = function(event) {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken'); // Función que obtienes desde tu script

    const data = {
        jefe: document.getElementById('jefeseditar').value,
        hora_inicio: document.getElementById('horainicioeditar').value,
        hora_fin: document.getElementById('horasalidaeditar').value,
        estado: document.getElementById('estadoeditar').value
    };

    const idHorario = document.getElementById('idhorario').value;

    fetch(`/Listas/Horarios/Update/${idHorario}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken  // Incluye el CSRF token aquí
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
                text: 'Horario actualizado correctamente',
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
};


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
    var horariosData = JSON.parse(document.getElementById('horarios-data').textContent);
    var idHorario = boton.getAttribute('data-editar');
    var horarioSeleccionado = horariosData.find(horario => horario.id == idHorario);

    if (horarioSeleccionado) {
        document.getElementById('idhorario').value = horarioSeleccionado.id;
        document.getElementById('jefeseditar').value = horarioSeleccionado.jefe_id;
        document.getElementById('horainicioeditar').value = horarioSeleccionado.hora_inicio;
        document.getElementById('horasalidaeditar').value = horarioSeleccionado.hora_fin;
        document.getElementById('estadoeditar').value = horarioSeleccionado.estado;
    } else {
        console.error("Horario no encontrado en el JSON");
    }
}

