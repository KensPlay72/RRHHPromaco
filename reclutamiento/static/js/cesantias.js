function validateNumber(input) {
    input.value = input.value.replace(/[^0-9.+]/g, '');
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

function mostrarCheque() {
    var estado = document.getElementById("estadopago").value;
    var n_cheke_div = document.getElementById("n_cheke_div");

    if (estado === "PAGADO") {
        n_cheke_div.style.display = "block"; 
    } else {
        n_cheke_div.style.display = "none"; 
    }
}

function actualizarDatosAutorizador() {
    const autorizador = document.getElementById("autorizador").value;
    const dniField = document.getElementById("dni_autoriza");
    const cargoField = document.getElementById("cargo_autoriza");

    if (autorizador === "VIOLETA SUYAPA GUILLEN") {
        dniField.value = "0601-1978-00457";
        cargoField.value = "GERENTE GENERAL";
    } else if (autorizador === "MARIA LEONOR ZELAYA") {
        dniField.value = "0601-1955-00792";
        cargoField.value = "GERENTE PROPIETARIO";
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

document.querySelectorAll('.form-control').forEach(input => {
    if (input.tagName === 'INPUT' && input.type === 'text') {
      input.addEventListener('input', function () {
        this.value = this.value.toUpperCase();
      });
    }
  });

document.getElementById("btn-register-cesantias").onclick = function (event) {
    event.preventDefault();
    
    const csrftoken = getCookie('csrftoken'); 

    const sueldo_actual = parseFloat(document.getElementById('sueldoactual').value); 
    let porcentaje = parseFloat(document.getElementById('porcentaje').value);  
    const estado_pago = document.getElementById('estadopago').value;
    const n_cheke = document.getElementById('n_cheke').value; // Número de cheque

    // Validación: Si el estado de pago es "PAGADO" y no se ha ingresado el número de cheque
    if (estado_pago === "PAGADO" && !n_cheke) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, ingrese el número de cheque para pagos marcados como "PAGADO".',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
        return; // Evitar que se continúe con el envío del formulario
    }

    // Si porcentaje es NaN (vacío o null) o es 0, establecemos el porcentaje en 0
    if (isNaN(porcentaje) || porcentaje === 0) {
        porcentaje = 0;
    }

    // Calcular la cesantía actual
    const cesantia_actual = (sueldo_actual / 12) * 14;

    let cesantia_final;
    
    // Si el porcentaje es 0, la cesantía final será igual a la cesantía actual
    if (porcentaje === 0) {
        cesantia_final = cesantia_actual;
    } else {
        // Aplicar el descuento del porcentaje si es mayor que 0
        const descuento = (cesantia_actual * porcentaje) / 100;
        cesantia_final = cesantia_actual - descuento;
    }

    const data = {
        correlativo: document.getElementById('correlativo').value,
        nombre_autoriza: document.getElementById('autorizador').value,
        dni_autoriza: document.getElementById('dni_autoriza').value,
        cargo_autoriza: document.getElementById('cargo_autoriza').value,
        sucursal: document.getElementById('sucursal').value,
        empresa: document.getElementById('empresa').value,
        departamento: document.getElementById('departamento').value,
        nombre_empleado: document.getElementById('nombre_empleado').value,
        dni_empleado: document.getElementById('dni').value,
        fecha_inicial: document.getElementById('fechainicio').value,
        fecha_final: document.getElementById('fechafinal').value,
        fecha_extencion: document.getElementById('fechaextension').value,
        sueldo_actual: sueldo_actual,
        porcentaje: porcentaje,
        año: document.getElementById('ano').value,
        estado_empleado: document.getElementById('estado').value,
        estado_pago: estado_pago, // Guardar el estado de pago
        n_cheke: n_cheke,  // Guardar el número de cheque
        cesantia_actual: cesantia_actual.toFixed(2), 
        cesantia_final: cesantia_final.toFixed(2)
    };

    fetch('/Cesantias/', { 
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
                text: 'Cesantía registrada correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();  // Recargar la página tras el éxito
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

  

document.getElementById("btn-editar-cesantias").onclick = function (event) {
    event.preventDefault();
    
    const csrftoken = getCookie('csrftoken'); 

    const ideditar = document.getElementById('ideditar').value;
    const sueldo_actual = parseFloat(document.getElementById('sueldoactualeditar').value);
    let porcentaje = parseFloat(document.getElementById('porcentajeeditar').value);  
    const estado_pago = document.getElementById('estadopagoeditar').value;
    const n_cheke = document.getElementById('n_chekeeditar').value;

    // Validación: Cheque requerido si el estado es PAGADO
    if (estado_pago === "PAGADO" && !n_cheke) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, ingrese el número de cheque para pagos marcados como "PAGADO".',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
        return;
    }

    // Validar porcentaje vacío o 0
    if (isNaN(porcentaje) || porcentaje <= 0) {
        porcentaje = 0;
    }

    // Validar sueldo actual
    if (isNaN(sueldo_actual) || sueldo_actual <= 0) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, ingrese un sueldo válido.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
        return;
    }

    // Cálculo de cesantía
    const cesantia_actual = (sueldo_actual / 12) * 14;
    let cesantia_final = cesantia_actual;
    if (porcentaje > 0) {
        const descuento = (cesantia_actual * porcentaje) / 100;
        cesantia_final = cesantia_actual - descuento;
    }

    const data = {
        correlativo: document.getElementById('correlativoeditar').value,
        nombre_autoriza: document.getElementById('autorizadoreditar').value,
        dni_autoriza: document.getElementById('dni_autoriza').value,
        cargo_autoriza: document.getElementById('cargo_autoriza').value,
        sucursal: document.getElementById('sucursaleditar').value,
        empresa: document.getElementById('empresaeditar').value,
        departamento: document.getElementById('departamentoeditar').value,
        nombre_empleado: document.getElementById('nombre_empleadoeditar').value,
        dni_empleado: document.getElementById('dnieditar').value,
        fecha_inicial: document.getElementById('fechainicioeditar').value,
        fecha_final: document.getElementById('fechafinaleditar').value,
        fecha_extencion: document.getElementById('fechaextensioneditar').value,
        sueldo_actual: sueldo_actual,
        porcentaje: porcentaje,
        año: document.getElementById('anoeditar').value,
        estado_empleado: document.getElementById('estadoeditar').value,
        estado_pago: estado_pago,
        n_cheke: n_cheke,
        cesantia_actual: cesantia_actual.toFixed(2), 
        cesantia_final: cesantia_final.toFixed(2)
    };

    fetch(`/Cesantias/UpdateCesantias/${ideditar}/`, { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken 
        },
        body: JSON.stringify(data)
    })    
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(errorData.message || 'Error al actualizar cesantía.');
            });
        }
        return response.json();
    })
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
                text: 'Cesantía actualizada correctamente',
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




function llenarFormularioEditar(boton) {
    var cesantiasData = JSON.parse(document.getElementById('control-cesantias-data').textContent);
    var correlativo = boton.getAttribute('data-correlativo');
    
    var cesantiaSeleccionada = cesantiasData.find(cesantia => cesantia.correlativo === correlativo);

    if (cesantiaSeleccionada) {
        document.getElementById('ideditar').value = cesantiaSeleccionada.id;
        document.getElementById('correlativoeditar').value = cesantiaSeleccionada.correlativo;
        document.getElementById('autorizadoreditar').value = cesantiaSeleccionada.nombre_autoriza;
        document.getElementById('dni_autoriza').value = cesantiaSeleccionada.dni_autoriza;
        document.getElementById('cargo_autoriza').value = cesantiaSeleccionada.cargo_autoriza;
        document.getElementById('sucursaleditar').value = cesantiaSeleccionada.sucursal_id;
        document.getElementById('empresaeditar').value = cesantiaSeleccionada.empresa_id;
        document.getElementById('departamentoeditar').value = cesantiaSeleccionada.departamento_id;
        document.getElementById('nombre_empleadoeditar').value = cesantiaSeleccionada.nombre_empleado;
        document.getElementById('dnieditar').value = cesantiaSeleccionada.dni_empleado;
        document.getElementById('fechainicioeditar').value = cesantiaSeleccionada.fecha_inicial;
        document.getElementById('fechafinaleditar').value = cesantiaSeleccionada.fecha_final;
        document.getElementById('sueldoactualeditar').value = cesantiaSeleccionada.sueldo_actual;
        document.getElementById('porcentajeeditar').value = cesantiaSeleccionada.porcentaje;
        document.getElementById('anoeditar').value = cesantiaSeleccionada.ano;
        document.getElementById('fechaextensioneditar').value = cesantiaSeleccionada.fecha_extencion;
        document.getElementById('estadoeditar').value = cesantiaSeleccionada.estado_empleado;
        document.getElementById('estadopagoeditar').value = cesantiaSeleccionada.estado_pago;
        document.getElementById('n_chekeeditar').value = cesantiaSeleccionada.n_cheke;
    } else {
        console.error("Cesantía no encontrada con correlativo: " + correlativo);
    }
}

function mostrarChequeeditar() {
    var estadoeditar = document.getElementById("estadopagoeditar").value;
    var n_cheke_diveditar = document.getElementById("n_cheke_diveditar");

    if (estadoeditar === "PAGADO") {
        n_cheke_diveditar.style.display = "block"; 
    } else {
        n_cheke_diveditar.style.display = "none"; s
    }
}


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