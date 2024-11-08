function calculateAge() {
    const dobInput = document.getElementById('fechanacimiento').value;
    if (!dobInput) return;
    const dob = moment(dobInput);
    const now = moment.tz('America/Tegucigalpa');
    const age = now.diff(dob, 'years');
    document.getElementById('edad').value = age;
}

document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar todas las filas de la tabla
    var rows = document.querySelectorAll('table.styled-table tbody tr');

    rows.forEach(function (row) {
        // Obtener el estatus de la celda correspondiente
        var estatusCell = row.cells[8]; // Suponiendo que el estatus está en la columna 8 (índice 7)
        var estatus = estatusCell.textContent.trim().toUpperCase();

        // Aplicar el color de fondo según el estatus
        switch (estatus) {
            case 'EN PROCESO':
                row.style.backgroundColor = '#FFE699'; // Color amarillo para "EN PROCESO"
                break;
            case 'CERRADA':
                row.style.backgroundColor = 'white'; // Color blanco para "CERRADA"
                break;
            case 'CANCELADA':
                row.style.backgroundColor = '#D9D9D9'; // Color rojo para "CANCELADA"
                break;
        }
    });
});


document.getElementById('register-form-plazas').addEventListener('submit', function (event) {
    event.preventDefault();

    function getValue(elementId) {
        const element = document.getElementById(elementId);
        return element ? (element.value.trim() || null) : null; // Enviar null si está vacío
    }

    const imagenInput = document.getElementById('imagendni');
    const imagenInput1 = document.getElementById('imagendni1'); // Nueva entrada para la imagen del reverso
    const formData = new FormData();

    // Manejar la imagen frontal
    if (imagenInput.files && imagenInput.files[0]) {
        const fileExtension = imagenInput.files[0].name.split('.').pop().toLowerCase();
        
        if (fileExtension !== 'jpg' && fileExtension !== 'png') {
            Swal.fire({
                title: 'Archivo no válido',
                text: 'Por favor, sube una imagen en formato JPG o PNG.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            });
            return; // Salir si la extensión es inválida
        }

        // Añadir la imagen frontal al FormData
        formData.append('imagen_dni', imagenInput.files[0]);
    }

    // Manejar la imagen del reverso
    if (imagenInput1.files && imagenInput1.files[0]) {
        const fileExtension1 = imagenInput1.files[0].name.split('.').pop().toLowerCase();
        
        if (fileExtension1 !== 'jpg' && fileExtension1 !== 'png') {
            Swal.fire({
                title: 'Archivo no válido',
                text: 'Por favor, sube una imagen en formato JPG o PNG.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            });
            return; // Salir si la extensión es inválida
        }

        // Añadir la imagen del reverso al FormData
        formData.append('imagen_dni_reverso', imagenInput1.files[0]);
    }

    // Añadir otros campos al FormData
    formData.append('data', JSON.stringify({
        analistas: getValue('analista'),
        sucursal: getValue('sucursal'),
        empresa: getValue('empresa'),
        unidad_de_negocio: getValue('unidadnegocio'),
        año: getValue('ano'),
        mes_corte: getValue('mescorte'),
        mes_solicitud: getValue('messolicitud'),
        modo: getValue('modo'),
        motivo_ingreso: getValue('motivoingreso'),
        nombre_reemplazo: getValue('personalreemplazar'),
        puestos: getValue('puesto'),
        departamento: getValue('departamento'),
        prioridad: getValue('prioridad'),
        fecha_solicitud: getValue('fechasolicitud'),
        fecha_inicio_busqueda: getValue('fechainiciobusqueda'),
        fecha_cobertura: getValue('fechacobertura'),
        fecha_ingreso: getValue('fechaingreso'),
        fuente_reclutamiento: getValue('fuentereclutamiento'),
        nombre_contratado: getValue('nombrecontratado'),
        dni: getValue('dni'),
        genero: getValue('genero'),
        edad: getValue('edad'),
        fecha_nacimiento: getValue('fechanacimiento'),
        medio_reclutamiento: getValue('medioreclutamiento'),
        salario: getValue('salario'),  // Mantener como null si está vacío
        combustible: getValue('combustible'),
        depreciacion: getValue('depreciacion'),
        comision: getValue('comision'),
        bono: getValue('bono'),
        hospedaje: getValue('hospedaje'),
        tipo_contrato: getValue('tipocontrato'),
    }));

    console.log(formData);
    fetch('/ControlPlazas/', {
        method: 'POST',
        body: formData,
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
                text: 'Plaza Registrada',
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
        } else {
            throw new Error(data.message);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
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


document.getElementById('update-form-plazas').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener el ID para incluirlo en la URL
    const ideditar = document.getElementById('ideditar').value;

    // Obtener la imagen del campo correspondiente
    const imagenInput = document.getElementById('imagendnieditar');
    const imagenInput1 = document.getElementById('imagendni1editar');
    const formData = new FormData();

    // Validar si se ha seleccionado una imagen
    if (imagenInput.files && imagenInput.files[0]) {
        const fileExtension = imagenInput.files[0].name.split('.').pop().toLowerCase();

        // Validar la extensión del archivo
        if (fileExtension !== 'jpg' && fileExtension !== 'png') {
            Swal.fire({
                title: 'Archivo no válido',
                text: 'Por favor, sube una imagen en formato JPG o PNG.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            });
            return; // Salir si la extensión es inválida
        }

        // Añadir la imagen al FormData
        formData.append('imagen_dni', imagenInput.files[0]);
    }

    if (imagenInput1.files && imagenInput1.files[0]) {
        const fileExtension1 = imagenInput1.files[0].name.split('.').pop().toLowerCase();
        
        if (fileExtension1 !== 'jpg' && fileExtension1 !== 'png') {
            Swal.fire({
                title: 'Archivo no válido',
                text: 'Por favor, sube una imagen en formato JPG o PNG.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            });
            return; // Salir si la extensión es inválida
        }

        // Añadir la imagen del reverso al FormData
        formData.append('imagen_dni_reverso', imagenInput1.files[0]);
    }

    // Añadir otros campos al FormData
    formData.append('data', JSON.stringify({
        id: ideditar, // Usar el ID directamente
        sucursal: document.getElementById('sucursaleditar').value.trim() || null,
        empresa: document.getElementById('empresaeditar').value.trim() || null,
        unidad_de_negocio: document.getElementById('unidadnegocioeditar').value.trim() || null,
        año: document.getElementById('anoeditar').value.trim() || null,
        mes_corte: document.getElementById('mescorteeditar').value.trim() || null,
        mes_solicitud: document.getElementById('messolicitudeditar').value.trim() || null,
        modo: document.getElementById('modoeditar').value.trim() || null,
        motivo_ingreso: document.getElementById('motivoingresoeditar').value.trim() || null,
        nombre_reemplazo: document.getElementById('personalreemplazareditar').value.trim() || null,
        puestos: document.getElementById('puestoeditar').value.trim() || null,
        departamento: document.getElementById('departamentoeditar').value.trim() || null,
        prioridad: document.getElementById('prioridadeditar').value.trim() || null,
        fecha_solicitud: document.getElementById('fechasolicitudeditar').value.trim() || null,
        fecha_inicio_busqueda: document.getElementById('fechainiciobusquedaeditar').value.trim() || null,
        fecha_cobertura: document.getElementById('fechacoberturaeditar').value.trim() || null,
        fecha_ingreso: document.getElementById('fechaingresoeditar').value.trim() || null,
        fuente_reclutamiento: document.getElementById('fuentereclutamientoeditar').value.trim() || null,
        nombre_contratado: document.getElementById('nombrecontratadoeditar').value.trim() || null,
        dni: document.getElementById('dnieditar').value.trim() || null,
        genero: document.getElementById('generoeditar').value.trim() || null,
        edad: document.getElementById('edadeditar').value.trim() || null,
        fecha_nacimiento: document.getElementById('fechanacimientoeditar').value.trim() || null,
        medio_reclutamiento: document.getElementById('medioreclutamientoeditar').value.trim() || null,
        salario: document.getElementById('salarioeditar').value.trim() || null,
        combustible: document.getElementById('combustibleeditar').value.trim() || null,
        depreciacion: document.getElementById('depreciacioneditar').value.trim() || null,
        comision: document.getElementById('comisioneditar').value.trim() || null,
        bono: document.getElementById('bonoeditar').value.trim() || null,
        hospedaje: document.getElementById('hospedajeeditar').value.trim() || null,
        tipo_contrato: document.getElementById('tipocontratoeditar').value.trim() || null,
    }));

    // Obtener el token CSRF utilizando la función getCookie
    const csrfToken = getCookie('csrftoken');

    // Enviar el formulario usando fetch con método POST
    fetch(`/ControlPlazas/Update/${ideditar}/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken, // Incluir el token CSRF en los headers
        },
        body: formData,
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
                text: 'Plaza actualizada correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload(); // Recargar la página al cerrar el diálogo
                }
            });
        } else {
            throw new Error(data.message);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
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
        fetch(`/ControlPlazas/Delete/${id}/`, {
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
                Swal.fire({
                    title: 'Éxito',
                    text: 'Plaza eliminada',
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

function cancelarPlaza(id) {

    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡De Cancelar la PLAZA esta acción no se puede Desacer!",
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
            fetch(`/ControlPlazas/CancelarPlaza/${id}/`, { 
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')  
                },
                body: JSON.stringify({
                    estatus: 'CANCELADA' 
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        title: 'Éxito',
                        text: 'La plaza ha sido CANCELADA exitosamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        customClass: {
                            confirmButton: 'custom-alertas-button'
                        }
                    }).then(() => {
                        location.reload();  // Recargar la página para reflejar los cambios
                    });
                } else {
                    throw new Error('Error al actualizar el estatus');
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



function llenarFormularioEditar(boton) {
    var plazasData = JSON.parse(document.getElementById('control-plazas-data').textContent);
    var idPlaza = boton.getAttribute('data-editar');
    var plazaSeleccionada = plazasData.find(plaza => plaza.id == idPlaza);

    if (plazaSeleccionada) {
        document.getElementById('ideditar').value = plazaSeleccionada.id;

        // Asignar los IDs de las relaciones
        document.getElementById('sucursaleditar').value = plazaSeleccionada.sucursal_id;  // Usar ID
        document.getElementById('empresaeditar').value = plazaSeleccionada.empresa_id;  // Usar ID
        document.getElementById('unidadnegocioeditar').value = plazaSeleccionada.unidad_negocio_id;  // Usar ID
        document.getElementById('anoeditar').value = plazaSeleccionada.ano;
        document.getElementById('mescorteeditar').value = plazaSeleccionada.mes_corte;
        document.getElementById('messolicitudeditar').value = plazaSeleccionada.mes_solicitud;
        document.getElementById('modoeditar').value = plazaSeleccionada.modo_id;  // Usar ID
        document.getElementById('motivoingresoeditar').value = plazaSeleccionada.motivo_ingreso_id;  // Usar ID
        document.getElementById('personalreemplazareditar').value = plazaSeleccionada.nombre_reemplazo;
        document.getElementById('puestoeditar').value = plazaSeleccionada.puestos_id;  // Usar ID
        document.getElementById('departamentoeditar').value = plazaSeleccionada.departamento_id;  // Usar ID
        document.getElementById('prioridadeditar').value = plazaSeleccionada.prioridad_id;  // Usar ID
        document.getElementById('fechasolicitudeditar').value = plazaSeleccionada.fecha_solicitud;
        document.getElementById('fechainiciobusquedaeditar').value = plazaSeleccionada.fecha_inicio_busqueda;
        document.getElementById('fechacoberturaeditar').value = plazaSeleccionada.fecha_cobertura;
        document.getElementById('fechaingresoeditar').value = plazaSeleccionada.fecha_ingreso;
        document.getElementById('fuentereclutamientoeditar').value = plazaSeleccionada.fuente_reclutamiento;
        document.getElementById('nombrecontratadoeditar').value = plazaSeleccionada.nombre_contratado;
        document.getElementById('dnieditar').value = plazaSeleccionada.dni;
        document.getElementById('generoeditar').value = plazaSeleccionada.genero;
        document.getElementById('edadeditar').value = plazaSeleccionada.edad;
        document.getElementById('fechanacimientoeditar').value = plazaSeleccionada.fecha_nacimiento;
        document.getElementById('medioreclutamientoeditar').value = plazaSeleccionada.medio_reclutamiento_id;  // Usar ID
        document.getElementById('salarioeditar').value = plazaSeleccionada.salario;
        document.getElementById('combustibleeditar').value = plazaSeleccionada.combustible;
        document.getElementById('depreciacioneditar').value = plazaSeleccionada.depreciacion;
        document.getElementById('comisioneditar').value = plazaSeleccionada.comision;
        document.getElementById('bonoeditar').value = plazaSeleccionada.bono;
        document.getElementById('hospedajeeditar').value = plazaSeleccionada.hospedaje;
        document.getElementById('tipocontratoeditar').value = plazaSeleccionada.tipo_contrato_id;  // Usar ID
    } else {
        console.error("Plaza no encontrada en el JSON");
    }
}


function mostrarDetallesControlPlazas(boton) {
    var id = boton.getAttribute('data-id');

    var controlPlazasData = JSON.parse(document.getElementById('control-plazas-data').textContent);

    var datosControlPlaza = controlPlazasData.find(item => item.id == id);

    // Función para establecer el texto
    function setInnerText(id, value) {
        var element = document.getElementById(id);
        if (element) {
            element.innerText = value || 'N/A';  // Establecer 'N/A' si el valor es null o undefined
        } else {
            console.warn(`Elemento con ID ${id} no encontrado.`);
        }
    }

    // Asignar los valores al modal
    setInnerText('detalles-id', datosControlPlaza.id);
    setInnerText('detalles-sucursal', datosControlPlaza.sucursal_nombre);
    setInnerText('detalles-empresa', datosControlPlaza.empresa_nombre);
    setInnerText('detalles-unidad-negocio', datosControlPlaza.unidad_negocio_nombre);
    setInnerText('detalles-ano', datosControlPlaza.ano);
    setInnerText('detalles-mes-corte', datosControlPlaza.mes_corte);
    setInnerText('detalles-mes-solicitud', datosControlPlaza.mes_solicitud);
    setInnerText('detalles-modo', datosControlPlaza.modo_nombre);
    setInnerText('detalles-motivo-ingreso', datosControlPlaza.motivo_ingreso_nombre);
    setInnerText('detalles-nombre-reemplazo', datosControlPlaza.nombre_reemplazo);
    setInnerText('detalles-puestos', datosControlPlaza.puestos_nombre);
    setInnerText('detalles-departamento', datosControlPlaza.departamento_nombre);
    setInnerText('detalles-prioridad', datosControlPlaza.prioridad_nombre);
    setInnerText('detalles-fecha-solicitud', datosControlPlaza.fecha_solicitud);
    setInnerText('detalles-fecha-inicio-busqueda', datosControlPlaza.fecha_inicio_busqueda);
    setInnerText('detalles-fecha-cobertura', datosControlPlaza.fecha_cobertura);
    setInnerText('detalles-fecha-ingreso', datosControlPlaza.fecha_ingreso);
    setInnerText('detalles-fuente-reclutamiento', datosControlPlaza.fuente_reclutamiento);
    setInnerText('detalles-nombre-contratado', datosControlPlaza.nombre_contratado);
    setInnerText('detalles-dni', datosControlPlaza.dni);
    setInnerText('detalles-genero', datosControlPlaza.genero);
    setInnerText('detalles-edad', datosControlPlaza.edad);
    setInnerText('detalles-fecha-nacimiento', datosControlPlaza.fecha_nacimiento);
    setInnerText('detalles-medio-reclutamiento', datosControlPlaza.medio_reclutamiento_nombre);
    setInnerText('detalles-salario', datosControlPlaza.salario);
    setInnerText('detalles-combustible', datosControlPlaza.combustible);
    setInnerText('detalles-depreciacion', datosControlPlaza.depreciacion);
    setInnerText('detalles-comision', datosControlPlaza.comision);
    setInnerText('detalles-bono', datosControlPlaza.bono);
    setInnerText('detalles-hospedaje', datosControlPlaza.hospedaje);
    setInnerText('detalles-tipo-contrato', datosControlPlaza.tipo_contrato_nombre);


    var btnDescargar = document.getElementById('btn-descargar-imagen');
    if (datosControlPlaza.nombreimagen) {
        btnDescargar.style.display = 'block'; 
        btnDescargar.setAttribute('data-url', `/ControlPlazas/descargar_imagen/${datosControlPlaza.id}/`); // Establece la URL de descarga
    } else {
        btnDescargar.style.display = 'none'; 
    }

    var imagenElement = document.getElementById('imagendnifrontal'); 
    if (datosControlPlaza.nombreimagen) {
        var imagenRuta = `/static/img/controlplazas/${datosControlPlaza.nombreimagen}`; 
        imagenElement.src = imagenRuta; 
        imagenElement.style.display = 'block'; 
    } else {
        imagenElement.style.display = 'none'; 
    }

    var imagenElement1 = document.getElementById('imagendnireverso'); 
    if (datosControlPlaza.nombreimagen) {
        var imagenRuta = `/static/img/controlplazas/${datosControlPlaza.nombreimagen1}`; 
        imagenElement1.src = imagenRuta; 
        imagenElement1.style.display = 'block'; 
    } else {
        imagenElement1.style.display = 'none'; 
    }
}

function descargarImagen() {
    var btnDescargar = document.getElementById('btn-descargar-imagen');
    var url = btnDescargar.getAttribute('data-url');

    if (url) {
        // Realiza una solicitud fetch a la URL
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Si la respuesta es exitosa, descarga ambas imágenes
                    for (const [key, imageUrl] of Object.entries(data.imagenes)) {
                        // Crear un enlace temporal para la descarga
                        var a = document.createElement('a');
                        a.href = imageUrl; // URL de la imagen
                        a.download = ''; // Esto inicia la descarga
                        document.body.appendChild(a); // Agregar el enlace al DOM
                        a.click(); // Simular un clic en el enlace
                        document.body.removeChild(a); // Eliminar el enlace del DOM
                    }
                } else {
                    console.error("Error al descargar las imágenes:", data.message);
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
            });
    } else {
        console.warn("No se encontró la URL para descargar.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Iterar sobre cada fila de la tabla
    document.querySelectorAll('table.styled-table tbody tr').forEach(row => {
        const estatus = row.getAttribute('data-estatus'); 
        const id = row.getAttribute('data-id'); 

        // Seleccionar los botones de la fila actual
        const botonEditar = row.querySelector(`#botoneditar-${id}`);  
        const botonCancelar = row.querySelector(`#botoncancelar-${id}`);  

        if (estatus === 'CANCELADA') {
            if (botonEditar) botonEditar.style.display = 'none';
            if (botonCancelar) botonCancelar.style.display = 'none';
        } else if (estatus === 'CERRADA') {
            if (botonCancelar) botonCancelar.style.display = 'none';
            if (botonEditar) botonEditar.style.display = '';
        } else {
            if (botonEditar) botonEditar.style.display = '';
            if (botonCancelar) botonCancelar.style.display = '';
        }
    });
});


// ======= FILTROS TABLAS ======= //
function mostrarFiltro(filtroId) {
    const filtro = document.getElementById(filtroId);

    // Alternar el estado del filtro al hacer clic
    if (filtro.style.display === 'none' || filtro.style.display === '') {
        // Ocultar todos los demás filtros antes de mostrar el actual
        document.querySelectorAll('.filter-popup').forEach(popup => popup.style.display = 'none');
        filtro.style.display = 'block';
    } else {
        filtro.style.display = 'none';
    }
}