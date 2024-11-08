

document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', function () {
      this.value = this.value.toUpperCase();
    });
});




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


function aprobarRequisa(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "El estado de la requisa cambiará a APROBADO.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, aprobar',
        cancelButtonText: 'Cancelar',
        customClass: {
            confirmButton: 'custom-alertas-button'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/Requisa/AprobarRequisa/${id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')  // Asegúrate de incluir el token CSRF
                },
                body: JSON.stringify({
                    estado: 'APROBADO'
                })
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
                        text: 'Requisa aprobada correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        customClass: {
                            confirmButton: 'custom-alertas-button'
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();  // Recargar la página
                        }
                    });
                } else {
                    throw new Error(data.message || 'Error al cambiar el estado');
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


function cancelarRequisa(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "El estado de la requisa cambiará a CANCELADA.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cancelar',
        cancelButtonText: 'Cancelar',
        customClass: {
            confirmButton: 'custom-alertas-button'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Realizar la solicitud POST para actualizar el estado a "CANCELADA"
            fetch(`/Requisa/CancelarRequisa/${id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')  // Asegúrate de incluir el token CSRF
                },
                body: JSON.stringify({
                    estado: 'CANCELADA'
                })
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
                        text: 'Requisa cancelada correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        customClass: {
                            confirmButton: 'custom-alertas-button'
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();  // Recargar la página
                        }
                    });
                } else {
                    throw new Error(data.message || 'Error al cambiar el estado');
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

function duplicarRequisa(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esto creará una copia de la requisa seleccionada.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, duplicar',
        cancelButtonText: 'Cancelar',
        customClass: {
            confirmButton: 'custom-alertas-button'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Realizar la solicitud POST para duplicar la requisición
            fetch(`/Requisa/DuplicarRequisa/${id}/`, {
                method: 'POST',
                headers: {
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
                        text: 'Requisa duplicada correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        customClass: {
                            confirmButton: 'custom-alertas-button'
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();  // Recargar la página
                        }
                    });
                } else {
                    throw new Error(data.message || 'Error al duplicar la requisición');
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