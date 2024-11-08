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

document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', function () {
        this.value = this.value.toUpperCase();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form-contratacion');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir el envío por defecto del formulario

            // Crear un objeto FormData para enviar los datos
            const formData = new FormData();

            // Obtener los valores de los campos del formulario
            const getFieldValue = (id) => {
                const field = document.getElementById(id);
                return field ? field.value.trim() : null; // Retorna el valor o null si no existe
            };

            // Añadir los datos generales
            formData.append('tipoIngreso', document.querySelector('input[name="tipoIngreso"]:checked') ? document.querySelector('input[name="tipoIngreso"]:checked').value : null);
            formData.append('primerNombre', getFieldValue('primerNombre'));
            formData.append('segundoNombre', getFieldValue('segundoNombre'));
            formData.append('primerApellido', getFieldValue('primerApellido'));
            formData.append('segundoApellido', getFieldValue('segundoApellido'));
            formData.append('fechaNacimiento', getFieldValue('fechaNacimiento'));
            formData.append('cedula', getFieldValue('cedula'));
            formData.append('genero', document.querySelector('input[name="genero"]:checked') ? document.querySelector('input[name="genero"]:checked').value : null);
            formData.append('direccion', getFieldValue('direccion'));
            formData.append('municipio', getFieldValue('municipio'));
            formData.append('departamento', getFieldValue('departamento'));
            formData.append('telefono', getFieldValue('telefono'));
            formData.append('estadoCivil', getFieldValue('estadoCivil'));
            formData.append('profesion', getFieldValue('profesion'));
            formData.append('ultimoGrado', getFieldValue('ultimoGrado'));

            // Añadir datos laborales
            formData.append('puesto', getFieldValue('puesto'));
            formData.append('sucursal', getFieldValue('sucursal'));
            formData.append('fechaIngreso', getFieldValue('fechaIngreso'));
            formData.append('salario', getFieldValue('salario'));

            // Datos de emergencia
            formData.append('emergencia1', getFieldValue('emergencia1'));
            formData.append('parentesco1', getFieldValue('parentesco1'));
            formData.append('telefonoEmergencia1', getFieldValue('telefonoEmergencia1'));
            formData.append('enfermedad', getFieldValue('enfermedad'));

            // Beneficiario
            formData.append('nombreBeneficiario', getFieldValue('nombreBeneficiario'));
            formData.append('identidadBeneficiario', getFieldValue('identidadBeneficiario'));
            formData.append('parentescoBeneficiario', getFieldValue('parentescoBeneficiario'));
            formData.append('porcentajeBeneficiario', getFieldValue('porcentajeBeneficiario'));

            // Validar y agregar la imagen si existe
            const imagenInput = document.getElementById('photoInput');
            if (imagenInput && imagenInput.files && imagenInput.files[0]) {
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
                    return; // Detener la ejecución si el archivo no es válido
                }
                formData.append('imagen', imagenInput.files[0]); // Añadir imagen al FormData
            }

            // Enviar la solicitud al servidor
            fetch('/Contrataciones_multi/RegistrarContrataciones_Multi', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken')  // Asegurarse de incluir el token CSRF
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
                        window.location.href = "/Contrataciones_multi/";  // Redirigir después de guardar
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

            // Crear un objeto FormData para enviar los datos del formulario y los archivos
            const formData = new FormData(form);

            // Obtener la imagen (si existe) y añadirla a formData
            const imagenInput = document.getElementById('photoInput');
            if (imagenInput.files && imagenInput.files[0]) {
                const fileExtension = imagenInput.files[0].name.split('.').pop().toLowerCase();

                // Validar si el archivo es JPG o PNG
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
                    return; // Detener si el archivo no es válido
                }
                // Añadir la imagen al FormData
                formData.append('imagen', imagenInput.files[0]);
            }

            // Obtener el valor de campos específicos y asegurarse de que no están vacíos
            const getFieldValue = (id) => {
                const field = document.getElementById(id);
                return field ? field.value.trim() : null;
            };

            // Añadir campos manualmente al formData (si no están en el formulario de forma directa)
            formData.append('tipoIngreso', document.querySelector('input[name="tipo_contratacion"]:checked') ? document.querySelector('input[name="tipo_contratacion"]:checked').value : null);
            formData.append('nombre1', getFieldValue('nombre1'));
            formData.append('nombre2', getFieldValue('nombre2'));
            formData.append('apellido1', getFieldValue('apellido1'));
            formData.append('apellido2', getFieldValue('apellido2'));
            formData.append('fechaNacimiento', getFieldValue('fechaNacimiento'));
            formData.append('dni', getFieldValue('dni'));
            formData.append('genero', document.querySelector('input[name="genero"]:checked') ? document.querySelector('input[name="genero"]:checked').value : null);
            formData.append('direccionexacta', getFieldValue('direccionexacta'));
            formData.append('municipio', getFieldValue('municipio'));
            formData.append('departamento', getFieldValue('departamento'));
            formData.append('telefono', getFieldValue('telefono'));
            formData.append('estadoCivil', getFieldValue('estadoCivil'));
            formData.append('profecion_oficio', getFieldValue('profecion_oficio'));
            formData.append('ultimoGrado', getFieldValue('ultimoGrado'));

            // Datos laborales
            formData.append('puestos', getFieldValue('puestos'));
            formData.append('sucursal', getFieldValue('sucursal'));
            formData.append('fechaIngreso', getFieldValue('fechaIngreso'));
            formData.append('salario', getFieldValue('salario'));

            // Datos de emergencia
            formData.append('emergencia1', getFieldValue('emergencia1'));
            formData.append('parentesco1', getFieldValue('parentesco1'));
            formData.append('telefonoEmergencia1', getFieldValue('telefonoEmergencia1'));
            formData.append('enfermedad', getFieldValue('enfermedad'));

            // Beneficiario
            formData.append('nombre_beneficiario', getFieldValue('nombre_beneficiario'));
            formData.append('dni_beneficiario', getFieldValue('dni_beneficiario'));
            formData.append('parentesco_beneficiario', getFieldValue('parentesco_beneficiario'));
            formData.append('porcentaje', getFieldValue('porcentaje'));

            // Enviar la solicitud al servidor
            fetch(`/Contrataciones_multi/UpdateContrataciones_multi/${formData.get('contratacion_id')}/`, {
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
                        text: 'Actualización de contratación guardada exitosamente.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        customClass: {
                            confirmButton: 'custom-alertas-button'
                        }
                    }).then(() => {
                        window.location.href = "/Contrataciones_multi/";
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al actualizar el registro de contratación.',
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

function validateNumber(input) {
    input.value = input.value.replace(/[^0-9.+]/g, '');
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
            fetch(`/Contrataciones_multi/DeleteContrataciones_multi/${id}/`, {
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
            element.innerText = value || 'N/A'; // Muestra 'N/A' si el valor es null o vacío
        } else {
            console.warn(`Elemento con ID ${id} no encontrado.`);
        }
    }

    // Llenar los campos del modal con la información de la contratación
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
    setInnerText('detalles-departamento', datosContratacion.departamento);
    setInnerText('detalles-telefono', datosContratacion.telefono);
    
    // Contactos de Emergencia
    setInnerText('detalles-emergencia-1-nombre', datosContratacion.emergencia_1_nombre);
    setInnerText('detalles-emergencia-1-parentesco', datosContratacion.emergencia_1_parentesco);
    setInnerText('detalles-emergencia-1-telefono', datosContratacion.emergencia_1_telefono);

    // Beneficiario
    setInnerText('detalles-nombre-beneficiario', datosContratacion.nombre_beneficiario);
    setInnerText('detalles-dni-beneficiario', datosContratacion.dni_beneficiario);
    setInnerText('detalles-parentesco-beneficiario', datosContratacion.parentesco_beneficiario);
    setInnerText('detalles-porcentaje-beneficiario', datosContratacion.porcentaje_beneficiario);
    
    // Otros campos
    setInnerText('detalles-sucursal', datosContratacion.sucursal);
    setInnerText('detalles-fecha-ingreso', datosContratacion.fecha_ingreso);
    setInnerText('detalles-salario', datosContratacion.salario);
    // Puedes agregar más campos aquí si los necesitas.
}
