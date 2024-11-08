const photoDiv = document.getElementById('photoDiv');
const photoInput = document.getElementById('photoInput');
const photoPlaceholder = document.getElementById('photoPlaceholder');

// Al hacer clic en el div de la foto, abrir el input de archivo
photoPlaceholder.addEventListener('click', function () {
    photoInput.click();
});

// Cuando el input de archivo cambia (se selecciona una imagen)
photoInput.addEventListener('change', function () {
    const file = this.files[0]; // Obtener el archivo seleccionado
    mostrarImagen(file);
});

// Manejar arrastrar y soltar sobre el placeholder
photoPlaceholder.addEventListener('dragenter', function (e) {
    e.preventDefault(); // Prevenir comportamiento por defecto
    photoPlaceholder.classList.add('drag-over'); // Añadir clase para cambiar color
});

photoPlaceholder.addEventListener('dragover', function (e) {
    e.preventDefault(); // Es necesario prevenir el comportamiento por defecto en dragover
});

photoPlaceholder.addEventListener('dragleave', function () {
    photoPlaceholder.classList.remove('drag-over'); // Quitar clase cuando se salga
});

photoPlaceholder.addEventListener('drop', function (e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto
    photoPlaceholder.classList.remove('drag-over'); // Quitar clase cuando se suelte el archivo

    const file = e.dataTransfer.files[0]; // Obtener el archivo arrastrado

    if (file && file.type.startsWith('image/')) {
        photoInput.files = e.dataTransfer.files; // Asignar el archivo al input
        mostrarImagen(file); // Mostrar la imagen
    }
});

// Función para mostrar la imagen
function mostrarImagen(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.classList.add('uploaded-image');

        // Limpiar el placeholder y añadir la imagen
        photoPlaceholder.innerHTML = '';
        photoPlaceholder.appendChild(img);
    }

    reader.readAsDataURL(file); // Leer el archivo como URL
}




document.addEventListener('DOMContentLoaded', function () {
    const padecimientoSi = document.getElementById('padecimientoSi');
    const padecimientoNo = document.getElementById('padecimientoNo');
    const detalleEnfermedad = document.getElementById('detalleEnfermedad');

    // Configurar el estado inicial
    if (padecimientoSi.checked) {
        detalleEnfermedad.style.display = 'block';
    } else {
        detalleEnfermedad.style.display = 'none';
    }

    // Eventos de cambio
    padecimientoSi.addEventListener('change', function () {
        if (this.checked) {
            detalleEnfermedad.style.display = 'block';
        }
    });

    padecimientoNo.addEventListener('change', function () {
        if (this.checked) {
            detalleEnfermedad.style.display = 'none';
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const dateInputs = document.getElementsByClassName('date-input'); // Selecciona todos los elementos con la clase

    Array.from(dateInputs).forEach(function (dateInput) {
        // Si el campo de fecha está vacío, agregar la clase 'empty'
        if (!dateInput.value) {
            dateInput.classList.add('empty');
        }

        // Evento para cuando se selecciona una fecha o se cambia el valor
        dateInput.addEventListener('input', function () {
            if (dateInput.value) {
                dateInput.classList.remove('empty'); // Remover 'empty' cuando hay fecha
            } else {
                dateInput.classList.add('empty'); // Mantener 'empty' si está vacío
            }
        });
    });
});



document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', function () {
        this.value = this.value.toUpperCase();
    });
});


function validateNumber(input) {
    input.value = input.value.replace(/[^0-9.+]/g, '');
}

function validateNumber1(input) {
    let value = input.value;

    value = value.replace(/[^0-9]/g, '');

    if (value > 100) {
        value = 100;
    }
    input.value = value;
}

function imprimirContratacion(contratacionId) {
    if (contratacionId) {
        const url = `/Contrataciones/imprimir/${contratacionId}/`; // Construir la URL
        window.location.href = url; // Redirigir a la URL de impresión
    } else {
        console.error("ID de contratación no válido.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form-contratacion');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir el envío por defecto del formulario

    // Obtener la imagen
    const imagenInput = document.getElementById('photoInput');
    const formData = new FormData();

    // Validar si se ha seleccionado una imagen
    if (imagenInput.files && imagenInput.files[0]) {
        const fileExtension = imagenInput.files[0].name.split('.').pop().toLowerCase();

        // Validar la extensión del archivo (solo JPG y PNG)
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
            return; // Detener la ejecución si el archivo no es válido
        }

        // Añadir la imagen al FormData
        formData.append('imagen', imagenInput.files[0]);
    }

    // Obtener los valores de otros campos del formulario
    const getFieldValue = (id) => {
        const field = document.getElementById(id);
        return field ? field.value.trim() : null; // Retorna el valor o null si no existe
    };

    formData.append('tipoIngreso', document.querySelector('input[name="tipoIngreso"]:checked') ? document.querySelector('input[name="tipoIngreso"]:checked').value : null);
    formData.append('primerNombre', getFieldValue('primerNombre'));
    formData.append('segundoNombre', getFieldValue('segundoNombre'));
    formData.append('primerApellido', getFieldValue('primerApellido'));
    formData.append('segundoApellido', getFieldValue('segundoApellido'));
    formData.append('fechaNacimiento', getFieldValue('fechaNacimiento'));
    formData.append('municipio', getFieldValue('municipio'));
    formData.append('genero', document.querySelector('input[name="genero"]:checked') ? document.querySelector('input[name="genero"]:checked').value : null);
    formData.append('direccion', getFieldValue('direccion'));
    formData.append('cedula', getFieldValue('cedula'));
    formData.append('estadoCivil', getFieldValue('estadoCivil'));
    formData.append('hijos', document.getElementById('hijos').checked ? 1 : 0);
    formData.append('profesion', getFieldValue('profesion'));
    formData.append('correo', getFieldValue('correo'));
    formData.append('departamento', getFieldValue('departamento'));
    formData.append('telefono', getFieldValue('telefono'));

    // Datos de emergencia
    formData.append('emergencia1', getFieldValue('emergencia1'));
    formData.append('parentesco1', getFieldValue('parentesco1'));
    formData.append('telefonoEmergencia1', getFieldValue('telefonoEmergencia1'));
    formData.append('emergencia2', getFieldValue('emergencia2'));
    formData.append('parentesco2', getFieldValue('parentesco2'));
    formData.append('telefonoEmergencia2', getFieldValue('telefonoEmergencia2'));

    // Nivel educativo
    formData.append('alfabeta', document.querySelector('input[name="alfabeta"]:checked') ? document.querySelector('input[name="alfabeta"]:checked').value : null);
    formData.append('ultimoGrado', getFieldValue('ultimoGrado'));
    formData.append('ultimogradodetalle', getFieldValue('ultimogradodetalle'));
    formData.append('padecimiento', document.querySelector('input[name="padecimiento"]:checked')
        ? (document.querySelector('input[name="padecimiento"]:checked').value === 'si' ? 1 : 0)
        : 0);
    formData.append('detalleEnfermedad', getFieldValue('detalleEnfermedadInput'));

    // Datos laborales
    formData.append('puesto', getFieldValue('puesto'));
    formData.append('unidadnegocio', getFieldValue('unidadnegocio'));
    formData.append('salario', getFieldValue('salario'));
    formData.append('comision', getFieldValue('comision'));
    formData.append('bofa', getFieldValue('bofa'));
    formData.append('sucursal', getFieldValue('sucursal'));
    formData.append('tipocontrato', getFieldValue('tipocontrato'));
    formData.append('fechaIngreso', getFieldValue('fechaIngreso'));
    formData.append('fechavencimiento', getFieldValue('fechavencimiento'));
    formData.append('departamentoEmpresa', getFieldValue('departamentoEmpresa'));
    formData.append('direccionempresa', getFieldValue('direccionempresa'));
    formData.append('nombreempresa', getFieldValue('nombreempresa'));
    formData.append('telefonoempresa', getFieldValue('telefonoempresa'));

    // Beneficiario
    formData.append('nombreBeneficiario', getFieldValue('nombreBeneficiario'));
    formData.append('identidadBeneficiario', getFieldValue('identidadBeneficiario'));
    formData.append('parentescoBeneficiario', getFieldValue('parentescoBeneficiario'));
    formData.append('porcentajeBeneficiario', getFieldValue('porcentajeBeneficiario'));

    // Enviar la solicitud al servidor
    fetch('/Contrataciones/RegistrarContrataciones', {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: formData
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
                    text: 'Registro de contratación guardado exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        confirmButton: 'custom-alertas-button'
                    }
                }).then(() => {
                    window.location.href = "/Contrataciones/";
                });
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al guardar el registro de contratación.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            });
        });
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('update-form-contratacion');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevenir el envío por defecto del formulario
            // Obtener la imagen
            const imagenInput = document.getElementById('photoInput');
            const formData = new FormData();

            // Obtener el ID de la contratación
            const contratacionId = document.querySelector('input[name="contratacion_id"]').value;
            formData.append('contratacion_id', contratacionId);

            // Validar si se ha seleccionado una imagen
            if (imagenInput.files && imagenInput.files[0]) {
                const fileExtension = imagenInput.files[0].name.split('.').pop().toLowerCase();

                // Validar la extensión del archivo (solo JPG y PNG)
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
                    return; // Detener la ejecución si el archivo no es válido
                }

                // Añadir la imagen al FormData
                formData.append('imagen', imagenInput.files[0]);
            }

            // Obtener los valores de otros campos del formulario
            const getFieldValue = (id) => {
                const field = document.getElementById(id);
                return field ? field.value.trim() : null; // Retorna el valor o null si no existe
            };

            formData.append('tipoIngreso', document.querySelector('input[name="tipoIngreso"]:checked') ? document.querySelector('input[name="tipoIngreso"]:checked').value : null);
            formData.append('primerNombre', getFieldValue('primerNombre'));
            formData.append('segundoNombre', getFieldValue('segundoNombre'));
            formData.append('primerApellido', getFieldValue('primerApellido'));
            formData.append('segundoApellido', getFieldValue('segundoApellido'));
            formData.append('fechaNacimiento', getFieldValue('fechaNacimiento'));
            formData.append('municipio', getFieldValue('municipio'));
            formData.append('genero', document.querySelector('input[name="genero"]:checked') ? document.querySelector('input[name="genero"]:checked').value : null);
            formData.append('direccion', getFieldValue('direccion'));
            formData.append('cedula', getFieldValue('cedula'));
            formData.append('estadoCivil', getFieldValue('estadoCivil'));
            formData.append('hijos', document.getElementById('hijos').checked ? 1 : 0);
            formData.append('profesion', getFieldValue('profesion'));
            formData.append('correo', getFieldValue('correo'));
            formData.append('departamento', getFieldValue('departamento'));
            formData.append('telefono', getFieldValue('telefono'));

            // Datos de emergencia
            formData.append('emergencia1', getFieldValue('emergencia1'));
            formData.append('parentesco1', getFieldValue('parentesco1'));
            formData.append('telefonoEmergencia1', getFieldValue('telefonoEmergencia1'));
            formData.append('emergencia2', getFieldValue('emergencia2'));
            formData.append('parentesco2', getFieldValue('parentesco2'));
            formData.append('telefonoEmergencia2', getFieldValue('telefonoEmergencia2'));

            // Nivel educativo
            formData.append('alfabeta', document.querySelector('input[name="alfabeta"]:checked') ? document.querySelector('input[name="alfabeta"]:checked').value : null);
            formData.append('ultimoGrado', getFieldValue('ultimoGrado'));
            formData.append('ultimogradodetalle', getFieldValue('ultimogradodetalle'));
            formData.append('padecimiento', document.querySelector('input[name="padecimiento"]:checked') ? document.querySelector('input[name="padecimiento"]:checked').value : null);

            if (document.querySelector('input[name="padecimiento"]:checked') && document.querySelector('input[name="padecimiento"]:checked').value === 'si') {
                const detalleEnfermedad = getFieldValue('detalleEnfermedadInput');
                
                if (detalleEnfermedad) {
                    formData.append('detalleEnfermedad', detalleEnfermedad); // Agregar solo si hay un valor
                }
            } else {
                formData.delete('detalleEnfermedad'); 
            }
            

            // Datos laborales
            formData.append('puesto', getFieldValue('puesto'));
            formData.append('unidadnegocio', getFieldValue('unidadnegocio'));
            formData.append('salario', getFieldValue('salario'));
            formData.append('comision', getFieldValue('comision'));
            formData.append('bofa', getFieldValue('bofa'));
            formData.append('sucursal', getFieldValue('sucursal'));
            formData.append('tipocontrato', getFieldValue('tipocontrato'));
            formData.append('fechaIngreso', getFieldValue('fechaIngreso'));
            formData.append('fechavencimiento', getFieldValue('fechavencimiento'));
            formData.append('departamentoEmpresa', getFieldValue('departamentoEmpresa'));
            formData.append('direccionempresa', getFieldValue('direccionempresa'));
            formData.append('nombreempresa', getFieldValue('nombreempresa'));
            formData.append('telefonoempresa', getFieldValue('telefonoempresa'));

            // Beneficiario
            formData.append('nombreBeneficiario', getFieldValue('nombreBeneficiario'));
            formData.append('identidadBeneficiario', getFieldValue('identidadBeneficiario'));
            formData.append('parentescoBeneficiario', getFieldValue('parentescoBeneficiario'));
            formData.append('porcentajeBeneficiario', getFieldValue('porcentajeBeneficiario'));

            // Enviar la solicitud al servidor
            fetch(`/Contrataciones/UpdateContrataciones/${contratacionId}/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: formData
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
                            text: 'Actualización de contratación guardado exitosamente.',
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                            customClass: {
                                confirmButton: 'custom-alertas-button'
                            }
                        }).then(() => {
                            window.location.href = "/Contrataciones/";
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un problema en Actualizar el registro de contratación.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        customClass: {
                            confirmButton: 'custom-alertas-button'
                        }
                    });
                });
        });
    }
});

function mostrardetalles(boton) {
    // Obtener el ID de la contratación a partir del atributo data-id del botón
    var id = boton.getAttribute('data-id');

    // Parsear el contenido del script JSON
    var contratacionesData = JSON.parse(document.getElementById('contrataciones-data').textContent);

    // Buscar el item correspondiente en el array
    var datosContratacion = contratacionesData.find(item => item.id == id);

    // Función para establecer el texto
    function setInnerText(id, value) {
        var element = document.getElementById(id);
        if (element) {
            element.innerText = value || 'N/A';
        } else {
            console.warn(`Elemento con ID ${id} no encontrado.`);
        }
    }
    setInnerText('detalles-id', datosContratacion.id);
    setInnerText('detalles-tipo-contratacion', datosContratacion.tipo_contratacion);
    setInnerText('detalles-nombre-completo', datosContratacion.nombre_completo);
    setInnerText('detalles-fecha-nacimiento', datosContratacion.fecha_nacimiento);
    setInnerText('detalles-municipio', datosContratacion.municipio);
    setInnerText('detalles-genero', datosContratacion.genero);
    setInnerText('detalles-direccion-exacta', datosContratacion.direccion_exacta);
    setInnerText('detalles-dni', datosContratacion.dni);
    setInnerText('detalles-estado-civil', datosContratacion.estado_civil);
    setInnerText('detalles-hijos', datosContratacion.hijos);
    setInnerText('detalles-profesion-oficio', datosContratacion.profesion_oficio);
    setInnerText('detalles-correo', datosContratacion.correo);
    
    // Departamentos
    setInnerText('detalles-departamento', datosContratacion.departamento);
    setInnerText('detalles-departamentoempresa', datosContratacion.departamento_empresa);  // Departamento de la empresa
    
    setInnerText('detalles-telefono', datosContratacion.telefono);

    // Contactos de Emergencia
    setInnerText('detalles-emergencia-1-nombre', datosContratacion.emergencia_1_nombre);
    setInnerText('detalles-emergencia-1-parentesco', datosContratacion.emergencia_1_parentesco);
    setInnerText('detalles-emergencia-1-telefono', datosContratacion.emergencia_1_telefono);

    setInnerText('detalles-emergencia-2-nombre', datosContratacion.emergencia_2_nombre);
    setInnerText('detalles-emergencia-2-parentesco', datosContratacion.emergencia_2_parentesco);
    setInnerText('detalles-emergencia-2-telefono', datosContratacion.emergencia_2_telefono);

    // Educación y Salud
    setInnerText('detalles-nivel-educativo', datosContratacion.nivel_educativo);
    setInnerText('detalles-ultimo-grado-estudio', datosContratacion.ultimo_grado_estudio);
    setInnerText('detalles-ultimogradodetalle', datosContratacion.ultimogradodetalle);
    setInnerText('detalles-padecimiento', datosContratacion.padecimiento);
    setInnerText('detalles-detalle-enfermedad', datosContratacion.detalle_enfermedad);

    // Datos Laborales
    setInnerText('detalles-puesto', datosContratacion.puesto);
    setInnerText('detalles-unidad-de-negocio', datosContratacion.unidad_de_negocio);
    setInnerText('detalles-sucursal', datosContratacion.sucursal);
    setInnerText('detalles-salario', datosContratacion.salario);
    setInnerText('detalles-comision', datosContratacion.comision);
    setInnerText('detalles-bofa', datosContratacion.bofa);
    setInnerText('detalles-fecha-ingreso', datosContratacion.fecha_ingreso);
    setInnerText('detalles-fecha-vencimiento', datosContratacion.fecha_vencimiento);

    // Empresa
    setInnerText('detalles-nombre-empresa', datosContratacion.nombre_empresa);
    setInnerText('detalles-telefono-empresa', datosContratacion.telefono_empresa);

    // Beneficiario
    setInnerText('detalles-nombre-beneficiario', datosContratacion.nombre_beneficiario);
    setInnerText('detalles-dni-beneficiario', datosContratacion.dni_beneficiario);
    setInnerText('detalles-parentesco-beneficiario', datosContratacion.parentesco_beneficiario);
    setInnerText('detalles-porcentaje-beneficiario', datosContratacion.porcentaje_beneficiario);
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
            fetch(`/Contrataciones/DeleteContrataciones/${id}/`, {
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
                        text: 'Contratación eliminada',
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


// Función para obtener el token CSRF
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // El nombre del token CSRF debe coincidir con el valor dado
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


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