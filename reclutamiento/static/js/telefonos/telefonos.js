document.getElementById("registrartelefonia").onclick = function(event) {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken');

    const correlativo = document.getElementById('correlativo').value;
    const nombre = document.getElementById('nombre').value;
    const dni = document.getElementById('dni').value;
    const unidadnegocio = document.getElementById('unidadnegocio').value;
    const departamento = document.getElementById('departamento').value;
    const telefonoNombreEstado = document.getElementById('telefono').value;
    const caracter = document.getElementById('caracter').value;

    // Validar campos requeridos
    if (!nombre || !dni || !unidadnegocio || !departamento || !telefonoNombreEstado || !caracter) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, complete todos los campos obligatorios.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
        return;
    }

    // Separar nombre del teléfono y estado del teléfono (NUEVO o USADO) del valor seleccionado
    const [nombretelefono, estadotelefono] = telefonoNombreEstado.split(" - ");

    // Imprimir el nombre del teléfono y estado para verificar
    console.log("Nombre de Teléfono:", nombretelefono);
    console.log("Estado del Teléfono:", estadotelefono);
    console.log("Correlativo:", correlativo);

    // Hacer la solicitud para obtener el ID más bajo del teléfono con el estado y estado de teléfono especificado
    fetch(`/obtener-id-telefono/?nombretelefono=${encodeURIComponent(nombretelefono)}&estadotelefono=${encodeURIComponent(estadotelefono)}`)
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
                return;
            }

            const telefonoId = data.id;

            console.log("ID del Teléfono seleccionado:", telefonoId);

            const requestData = {
                correlativo: correlativo || null,
                fecha: document.getElementById('fecha').value || null,
                nombre: nombre || null,
                dni: dni || null,
                unidadnegocio: unidadnegocio || null,
                departamento: departamento || null,
                telefono: telefonoId, 
                MEI: document.getElementById('MEI').value || null,
                lineatelefono: document.getElementById('lineatelefono').value || null,
                caracter: caracter || null,
                tiempopago: document.getElementById('tiempopago').value || null,
                quincenas: document.getElementById('quincenas').value || null,
                observacion: document.getElementById('observacion').value || null
            };

            // Enviar la solicitud POST con los datos del formulario
            fetch('/Inventario/Telefonos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify(requestData)
            })
            .then(response => response.json())
            .then(responseData => {
                if (!responseData.success) {
                    Swal.fire({
                        title: 'Error',
                        text: responseData.message,
                        icon: 'warning',
                        confirmButtonText: 'Aceptar',
                        customClass: {
                            confirmButton: 'custom-alertas-button'
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Éxito',
                        text: 'Teléfono registrado exitosamente',
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
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al obtener el ID del teléfono.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            });
        });
};


function toggleDeducidoFields() {
    const caracterSelect = document.getElementById("caracter");
    const deducidoFields = document.querySelectorAll(".ocultardeducido");

    if (caracterSelect.value === "DEDUCIDO") {
        deducidoFields.forEach(element => {
            element.style.display = "block";
        });
    } else {
        deducidoFields.forEach(element => {
            element.style.display = "none";
        });
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

document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function () {
        this.value = this.value.toUpperCase();
    });
});


function llenarFormularioEditarCorrelativo(boton) {
    var telefoniaData = JSON.parse(document.getElementById('telefonia-data').textContent);
    var idCorrelativo = boton.getAttribute('data-editar');

    var correlativoSeleccionado = telefoniaData.find(item => item.id == idCorrelativo);

    if (correlativoSeleccionado) {
        document.getElementById('correlativoreasignar').value = correlativoSeleccionado.correlativo;
    } else {
        console.error("Correlativo no encontrado en el JSON para el ID:", idCorrelativo);
    }
}


function llenarFormularioEditarCorrelativo2(boton) {
    var telefoniaData = JSON.parse(document.getElementById('telefonia-data').textContent);
    var idCorrelativo = boton.getAttribute('data-editar');

    var correlativoSeleccionado = telefoniaData.find(item => item.id == idCorrelativo);

    if (correlativoSeleccionado) {
        document.getElementById('correlativoreasignar2').value = correlativoSeleccionado.correlativo;
    } else {
        console.error("Correlativo no encontrado en el JSON para el ID:", idCorrelativo);
    }
}


function llenarFormularioEditar(boton) {
    var telefoniaData = JSON.parse(document.getElementById('telefonia-data').textContent);
    var idCorrelativo = boton.getAttribute('data-editar');
    var correlativoSeleccionado = telefoniaData.find(item => item.id == idCorrelativo);

    if (correlativoSeleccionado) {
        document.getElementById('correlativo').value = correlativoSeleccionado.correlativo;
        document.getElementById('fecha').value = correlativoSeleccionado.fecha;
        document.getElementById('nombre').value = correlativoSeleccionado.nombre;
        document.getElementById('dni').value = correlativoSeleccionado.dni;
        document.getElementById('unidadnegocio').value = correlativoSeleccionado.unidad_de_negocio_id;
        document.getElementById('departamento').value = correlativoSeleccionado.departamento_id;
        document.getElementById('telefono').value = correlativoSeleccionado.nombretelefono;
        document.getElementById('MEI').value = correlativoSeleccionado.MEI;
        document.getElementById('lineatelefono').value = correlativoSeleccionado.lineatelefonica;
        document.getElementById('observacion').value = correlativoSeleccionado.observacion;
        document.getElementById('caracter').value = correlativoSeleccionado.caracter;

        if (correlativoSeleccionado.caracter === 'DEDUCIDO') {
            document.querySelectorAll('.ocultardeducido').forEach(element => {
                element.style.display = 'block';
            });
            document.getElementById('tiempopago').value = correlativoSeleccionado.tiempopago;
            document.getElementById('quincenas').value = correlativoSeleccionado.quinsena;
        } else {
            document.querySelectorAll('.ocultardeducido').forEach(element => {
                element.style.display = 'none';
            });
        }
    } else {
        console.error("Correlativo no encontrado en el JSON para el ID:", idCorrelativo);
    }
}



document.getElementById("form-reciviente").onsubmit = function(event) {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken'); // Obtén el CSRF token

    // Obtener los valores del formulario
    const correlativo = document.getElementById('correlativoreasignar').value;
    const nombreReciviente = document.getElementById('nombre_recivientereasignar').value;

    // Crear el objeto con los datos que queremos actualizar
    const data = {
        asignacionnueva: nombreReciviente,
        estado: 'REASIGNADO'
    };

    // Realizar la solicitud PUT para actualizar el registro con el correlativo
    fetch(`/Inventario/Telefonos/Reasignacion/${correlativo}/`, {
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
                text: 'Registro reasignado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload(); // Recargar la página después de la reasignación
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


document.getElementById("form-deduccion").onsubmit = function(event) {
    event.preventDefault();

    const csrftoken = getCookie('csrftoken');
    const correlativo = document.getElementById('correlativoreasignar2').value;
    const fechaExtravio = document.getElementById('fechaextravio').value;

    const data = {
        correlativo: correlativo,
        fecha_extravio: fechaExtravio
    };

    fetch(`/Inventario/Telefonos/Deduccion/`, {
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
                text: 'Deducción calculada correctamente',
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

    document.getElementById('correlativo').value = correlativo;
}