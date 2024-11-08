document.getElementById('register-form-user').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto
    
    // Validación personalizada para los permisos
    const sections = [
        { checkbox: 'plazas', ver: 'plaza_ver', escribir: 'plaza_escribir', name: 'Plazas' },
        { checkbox: 'bolsaempleo', ver: 'bolsa_ver', escribir: 'bolsa_escribir', name: 'Bolsa de Empleo' },
        { checkbox: 'contrataciones', ver: 'contrataciones_ver', escribir: 'contrataciones_escribir', name: 'Contrataciones' },
        { checkbox: 'listas', ver: 'listas_ver', escribir: 'listas_escribir', name: 'Listas' },
        { checkbox: 'contrataciones_multi', ver: 'contrataciones_multi_ver', escribir: 'contrataciones_multi_escribir', name: 'Contrataciones Multiservicios' },
        { checkbox: 'cesantias', ver: 'cesantias_ver', escribir: 'cesantias_escribir', name: 'Cesantías' },
        { checkbox: 'perfilpuesto', ver: 'perfilpuesto_ver', escribir: 'perfilpuesto_escribir', name: 'Perfil de Puesto' },  // Nueva sección Perfil de Puesto
        { checkbox: 'requisas', ver: 'requisas_ver', escribir: 'requisas_escribir', name: 'Requisas' }, // Nueva sección Requisas
        { checkbox: 'inventario', ver: 'inventario_ver', escribir: 'inventario_escribir', name: 'Inventario' }  // Nueva sección Inventario
    ];

    for (let section of sections) {
        const isChecked = document.getElementById(section.checkbox).checked;
        const verChecked = document.getElementById(section.ver).checked;
        const escribirChecked = document.getElementById(section.escribir).checked;

        // Si el checkbox está marcado pero no se ha seleccionado "ver" o "escribir"
        if (isChecked && !verChecked && !escribirChecked) {
            Swal.fire({
                title: 'Error',
                text: `Por favor selecciona "Solo ver" o "Escribir" para la sección ${section.name}.`,
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            });
            return; // Detiene el proceso de envío hasta que la validación sea correcta
        }
    }

    // Si pasa la validación, continúa con el envío del formulario
    const csrftoken = getCookie('csrftoken'); 

    const data = {
        username: document.getElementById('username').value,
        dni: document.getElementById('dni').value,
        password: document.getElementById('password').value,
        estado: document.getElementById('estado').value,
        plazas: document.getElementById('plazas').checked ? 1 : 0,
        plazas_ver: document.getElementById('plaza_ver').checked ? 1 : 0,
        plazas_escribir: document.getElementById('plaza_escribir').checked ? 1 : 0,
        users: document.getElementById('users').checked ? 1 : 0,
        roles: document.getElementById('roles').checked ? 1 : 0,
        bolsaempleo: document.getElementById('bolsaempleo').checked ? 1 : 0,
        bolsaempleo_ver: document.getElementById('bolsa_ver').checked ? 1 : 0,
        bolsaempleo_escribir: document.getElementById('bolsa_escribir').checked ? 1 : 0,
        contrataciones: document.getElementById('contrataciones').checked ? 1 : 0,
        contrataciones_ver: document.getElementById('contrataciones_ver').checked ? 1 : 0,
        contrataciones_escribir: document.getElementById('contrataciones_escribir').checked ? 1 : 0,
        listas: document.getElementById('listas').checked ? 1 : 0,
        listas_ver: document.getElementById('listas_ver').checked ? 1 : 0,
        listas_escribir: document.getElementById('listas_escribir').checked ? 1 : 0,
        contrataciones_multi: document.getElementById('contrataciones_multi').checked ? 1 : 0,
        contrataciones_multi_ver: document.getElementById('contrataciones_multi_ver').checked ? 1 : 0,
        contrataciones_multi_escribir: document.getElementById('contrataciones_multi_escribir').checked ? 1 : 0,
        cesantias: document.getElementById('cesantias').checked ? 1 : 0,
        cesantias_ver: document.getElementById('cesantias_ver').checked ? 1 : 0,
        cesantias_escribir: document.getElementById('cesantias_escribir').checked ? 1 : 0,
        perfilpuesto: document.getElementById('perfilpuesto').checked ? 1 : 0,
        perfilpuesto_ver: document.getElementById('perfilpuesto_ver').checked ? 1 : 0,
        perfilpuesto_escribir: document.getElementById('perfilpuesto_escribir').checked ? 1 : 0,
        requisas: document.getElementById('requisas').checked ? 1 : 0,  // Nuevo campo para Requisas
        requisas_ver: document.getElementById('requisas_ver').checked ? 1 : 0,  // Nuevo campo para Requisas
        requisas_escribir: document.getElementById('requisas_escribir').checked ? 1 : 0,  // Nuevo campo para Requisas
        inventario: document.getElementById('inventario').checked ? 1 : 0,  // Nuevo campo para Inventario
        inventario_ver: document.getElementById('inventario_ver').checked ? 1 : 0,  // Nuevo campo para Inventario
        inventario_escribir: document.getElementById('inventario_escribir').checked ? 1 : 0  // Nuevo campo para Inventario
    };

    fetch('/Users/', {
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
                text: 'Usuario Registrado',
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



document.getElementById('update-form-user').addEventListener('submit', function(event) {
    event.preventDefault();

    // Validación de permisos antes de hacer la solicitud
    const sections = [
        { checkbox: 'plazas_editar', ver: 'plazas_ver_editar', escribir: 'plazas_escribir_editar', name: 'Plazas' },
        { checkbox: 'bolsaempleo_editar', ver: 'bolsaempleo_ver_editar', escribir: 'bolsaempleo_escribir_editar', name: 'Bolsa de Empleo' },
        { checkbox: 'contrataciones_editar', ver: 'contrataciones_ver_editar', escribir: 'contrataciones_escribir_editar', name: 'Contrataciones' },
        { checkbox: 'listas_editar', ver: 'listas_ver_editar', escribir: 'listas_escribir_editar', name: 'Listas' },
        { checkbox: 'contrataciones_multi_editar', ver: 'contrataciones_multi_ver_editar', escribir: 'contrataciones_multi_escribir_editar', name: 'Contrataciones Multiservicios' },
        { checkbox: 'cesantias_editar', ver: 'cesantias_ver_editar', escribir: 'cesantias_escribir_editar', name: 'Cesantías' },
        { checkbox: 'perfilpuesto_editar', ver: 'perfilpuesto_ver_editar', escribir: 'perfilpuesto_escribir_editar', name: 'Perfil de Puesto' }, // Añadido Perfil de Puesto
        { checkbox: 'requisas_editar', ver: 'requisas_ver_editar', escribir: 'requisas_escribir_editar', name: 'Requisas' }, // Añadido Requisas
        { checkbox: 'inventario_editar', ver: 'inventario_ver_editar', escribir: 'inventario_escribir_editar', name: 'Inventario' } // Añadido Inventario
    ];


    for (let section of sections) {
        const isChecked = document.getElementById(section.checkbox).checked;
        const verChecked = document.getElementById(section.ver).checked;
        const escribirChecked = document.getElementById(section.escribir).checked;

        // Si el checkbox está marcado pero no se ha seleccionado "ver" o "escribir"
        if (isChecked && !verChecked && !escribirChecked) {
            Swal.fire({
                title: 'Error',
                text: `Por favor selecciona "Solo ver" o "Escribir" para la sección ${section.name}.`,
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            });
            return; // Detener el proceso de envío hasta que la validación sea correcta
        }
    }

    // Si la validación es correcta, continuar con el envío de los datos
    const idUser = document.getElementById('id_user_editar').value;
    const csrftoken = getCookie('csrftoken');

    const data = {
        username: document.getElementById('username_editar').value,
        dni: document.getElementById('dni_editar').value,
        estado: document.getElementById('estado_editar').value,
        plazas: document.getElementById('plazas_editar').checked ? 1 : 0,
        plazas_ver: document.getElementById('plazas_ver_editar').checked ? 1 : 0,
        plazas_escribir: document.getElementById('plazas_escribir_editar').checked ? 1 : 0,
        users: document.getElementById('users_editar').checked ? 1 : 0,
        roles: document.getElementById('roleseditar').checked ? 1 : 0,
        bolsaempleo: document.getElementById('bolsaempleo_editar').checked ? 1 : 0,
        bolsaempleo_ver: document.getElementById('bolsaempleo_ver_editar').checked ? 1 : 0,
        bolsaempleo_escribir: document.getElementById('bolsaempleo_escribir_editar').checked ? 1 : 0,
        contrataciones: document.getElementById('contrataciones_editar').checked ? 1 : 0,
        contrataciones_ver: document.getElementById('contrataciones_ver_editar').checked ? 1 : 0,
        contrataciones_escribir: document.getElementById('contrataciones_escribir_editar').checked ? 1 : 0,
        listas: document.getElementById('listas_editar').checked ? 1 : 0,
        listas_ver: document.getElementById('listas_ver_editar').checked ? 1 : 0,
        listas_escribir: document.getElementById('listas_escribir_editar').checked ? 1 : 0,
        contrataciones_multi: document.getElementById('contrataciones_multi_editar').checked ? 1 : 0,
        contrataciones_multi_ver: document.getElementById('contrataciones_multi_ver_editar').checked ? 1 : 0,
        contrataciones_multi_escribir: document.getElementById('contrataciones_multi_escribir_editar').checked ? 1 : 0,
        cesantias: document.getElementById('cesantias_editar').checked ? 1 : 0,
        cesantias_ver: document.getElementById('cesantias_ver_editar').checked ? 1 : 0,
        cesantias_escribir: document.getElementById('cesantias_escribir_editar').checked ? 1 : 0,
        // Añadir campos para "Perfil de Puesto"
        perfilpuesto: document.getElementById('perfilpuesto_editar').checked ? 1 : 0,
        perfilpuesto_ver: document.getElementById('perfilpuesto_ver_editar').checked ? 1 : 0,
        perfilpuesto_escribir: document.getElementById('perfilpuesto_escribir_editar').checked ? 1 : 0,
        // Añadir campos para "Requisas" e "Inventario"
        requisas: document.getElementById('requisas_editar').checked ? 1 : 0,
        requisas_ver: document.getElementById('requisas_ver_editar').checked ? 1 : 0,
        requisas_escribir: document.getElementById('requisas_escribir_editar').checked ? 1 : 0,
        inventario: document.getElementById('inventario_editar').checked ? 1 : 0,
        inventario_ver: document.getElementById('inventario_ver_editar').checked ? 1 : 0,
        inventario_escribir: document.getElementById('inventario_escribir_editar').checked ? 1 : 0
    };

    console.log(data);  // Verificar los datos antes de enviarlos


    // Enviar la solicitud para actualizar los datos
    fetch(`/Users/Update/${idUser}/`, {
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
                text: 'Usuario Actualizado',
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



function restablecer(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Esto reestablecerá la contraseña a 12345678!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, reestablecer',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const csrftoken = getCookie('csrftoken');

            fetch(`/Users/ResetPassword/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken 
                },
                body: JSON.stringify({
                    password: '12345678'
                })
            })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: 'Éxito',
                    text: 'Contraseña reestablecida',
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
    const usersData = JSON.parse(document.getElementById('users-data').textContent);
    
    const idUser = boton.getAttribute('data-editar');
    
    // Buscar al usuario seleccionado en los datos JSON
    const userSeleccionado = usersData.find(user => user.id == idUser);

    if (userSeleccionado) {
        // Rellenar los campos del formulario de edición con los datos del usuario seleccionado
        document.getElementById('id_user_editar').value = userSeleccionado.id;
        document.getElementById('username_editar').value = userSeleccionado.username;
        document.getElementById('dni_editar').value = userSeleccionado.dni;
        document.getElementById('estado_editar').value = userSeleccionado.estado;
        
        // Permisos principales (Checkboxes)
        document.getElementById('plazas_editar').checked = userSeleccionado.plazas;
        document.getElementById('users_editar').checked = userSeleccionado.users;
        document.getElementById('roleseditar').checked = userSeleccionado.roles;
        document.getElementById('bolsaempleo_editar').checked = userSeleccionado.bolsaempleo;
        document.getElementById('contrataciones_editar').checked = userSeleccionado.contrataciones;
        document.getElementById('listas_editar').checked = userSeleccionado.listas;

        // Permisos de Contrataciones Multiservicios (Checkbox)
        document.getElementById('contrataciones_multi_editar').checked = userSeleccionado.contrataciones_multi;

        // Permisos de Cesantías (Checkbox)
        document.getElementById('cesantias_editar').checked = userSeleccionado.cesantias;

        // Permisos de "Perfil de Puesto" (Checkbox)
        document.getElementById('perfilpuesto_editar').checked = userSeleccionado.perfilpuesto;

        // Permisos de "Requisas" (Checkbox)
        document.getElementById('requisas_editar').checked = userSeleccionado.requisa;

        // Permisos de "Inventario" (Checkbox)
        document.getElementById('inventario_editar').checked = userSeleccionado.inventario;

        // Mostrar/ocultar las opciones de "Solo ver" y "Escribir" según el estado de los checkboxes
        togglePermissionOptionsEditar(document.getElementById('plazas_editar'), 'plazas_options_editar');
        togglePermissionOptionsEditar(document.getElementById('bolsaempleo_editar'), 'bolsaempleo_options_editar');
        togglePermissionOptionsEditar(document.getElementById('contrataciones_editar'), 'contrataciones_options_editar');
        togglePermissionOptionsEditar(document.getElementById('listas_editar'), 'listas_options_editar');
        togglePermissionOptionsEditar(document.getElementById('contrataciones_multi_editar'), 'contrataciones_multi_options_editar');
        togglePermissionOptionsEditar(document.getElementById('cesantias_editar'), 'cesantias_options_editar');
        togglePermissionOptionsEditar(document.getElementById('perfilpuesto_editar'), 'perfilpuesto_options_editar');
        togglePermissionOptionsEditar(document.getElementById('requisas_editar'), 'requisas_options_editar');
        togglePermissionOptionsEditar(document.getElementById('inventario_editar'), 'inventario_options_editar');

        // Permisos "ver" y "escribir" para cada sección (Radios)
        document.getElementById('plazas_ver_editar').checked = userSeleccionado.plazas_ver;
        document.getElementById('plazas_escribir_editar').checked = userSeleccionado.plazas_escribir;

        document.getElementById('bolsaempleo_ver_editar').checked = userSeleccionado.bolsaempleo_ver;
        document.getElementById('bolsaempleo_escribir_editar').checked = userSeleccionado.bolsaempleo_escribir;

        document.getElementById('contrataciones_ver_editar').checked = userSeleccionado.contrataciones_ver;
        document.getElementById('contrataciones_escribir_editar').checked = userSeleccionado.contrataciones_escribir;

        document.getElementById('listas_ver_editar').checked = userSeleccionado.listas_ver;
        document.getElementById('listas_escribir_editar').checked = userSeleccionado.listas_escribir;

        // Permisos "ver" y "escribir" para Contrataciones Multiservicios (Radios)
        document.getElementById('contrataciones_multi_ver_editar').checked = userSeleccionado.contrataciones_multi_ver;
        document.getElementById('contrataciones_multi_escribir_editar').checked = userSeleccionado.contrataciones_multi_escribir;

        // Permisos "ver" y "escribir" para Cesantías (Radios)
        document.getElementById('cesantias_ver_editar').checked = userSeleccionado.cesantias_ver;
        document.getElementById('cesantias_escribir_editar').checked = userSeleccionado.cesantias_escribir;

        // Permisos "ver" y "escribir" para Perfil de Puesto (Radios)
        document.getElementById('perfilpuesto_ver_editar').checked = userSeleccionado.perfilpuesto_ver;
        document.getElementById('perfilpuesto_escribir_editar').checked = userSeleccionado.perfilpuesto_escribir;

        // Permisos "ver" y "escribir" para Requisas (Radios)
        document.getElementById('requisas_ver_editar').checked = userSeleccionado.requisa_ver;
        document.getElementById('requisas_escribir_editar').checked = userSeleccionado.requisa_escribir;

        // Permisos "ver" y "escribir" para Inventario (Radios)
        document.getElementById('inventario_ver_editar').checked = userSeleccionado.inventario_ver;
        document.getElementById('inventario_escribir_editar').checked = userSeleccionado.inventario_escribir;

    } else {
        console.error("Usuario no encontrado en el JSON");
    }
}


//FUNCION PARA SOLO VER O ESCRIBIR
function togglePermissionOptions(checkbox, optionsId) {
    const optionsDiv = document.getElementById(optionsId);
    if (checkbox.checked) {
        optionsDiv.style.display = 'block';
    } else {
        optionsDiv.style.display = 'none';
        const radios = optionsDiv.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => radio.checked = false);  // Deseleccionar radios al desmarcar el checkbox
    }
}

// Añadir evento a cada checkbox para mostrar/ocultar las opciones correspondientes
document.getElementById('plazas').addEventListener('change', function() {
    togglePermissionOptions(this, 'plazas_options');
});

document.getElementById('bolsaempleo').addEventListener('change', function() {
    togglePermissionOptions(this, 'bolsaempleo_options');
});

document.getElementById('contrataciones').addEventListener('change', function() {
    togglePermissionOptions(this, 'contrataciones_options');
});

document.getElementById('listas').addEventListener('change', function() {
    togglePermissionOptions(this, 'listas_options');
});

document.getElementById('contrataciones_multi').addEventListener('change', function() {
    togglePermissionOptions(this, 'contrataciones_multi_options');
});

document.getElementById('cesantias').addEventListener('change', function() {
    togglePermissionOptions(this, 'cesantias_options');
});

document.getElementById('perfilpuesto').addEventListener('change', function() {
    togglePermissionOptions(this, 'perfilpuesto_options');
});

// Nuevo: Evento para "requisas"
document.getElementById('requisas').addEventListener('change', function() {
    togglePermissionOptions(this, 'requisas_options');
});

// Nuevo: Evento para "inventario"
document.getElementById('inventario').addEventListener('change', function() {
    togglePermissionOptions(this, 'inventario_options');
});

// Controlar grupos de radios para evitar más de uno seleccionado
const radiosGroups = [
    'plaza_permiso', 
    'bolsa_permiso', 
    'contrataciones_permiso', 
    'listas_permiso', 
    'contrataciones_multi_permiso', 
    'cesantias_permiso', 
    'perfilpuesto_permiso',
    'requisas_permiso',  
    'inventario_permiso'
];

radiosGroups.forEach(groupName => {
    const radios = document.querySelectorAll(`input[name="${groupName}"]`);
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            radios.forEach(r => {
                if (r !== radio) r.checked = false;  
            });
        });
    });
});


// FUNCION PARA MOSTRAR U OCULTAR LAS OPCIONES DE "SOLO VER" O "ESCRIBIR" EN EDICIÓN
function togglePermissionOptionsEditar(checkbox, optionsId) {
    const optionsDiv = document.getElementById(optionsId);
    if (checkbox.checked) {
        optionsDiv.style.display = 'block';
    } else {
        optionsDiv.style.display = 'none';
        const radios = optionsDiv.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => radio.checked = false);  // Deseleccionar radios al desmarcar el checkbox
    }
}

// Asignar los eventos para mostrar/ocultar opciones en el formulario de edición
document.getElementById('plazas_editar').addEventListener('change', function() {
    togglePermissionOptionsEditar(this, 'plazas_options_editar');
});

document.getElementById('bolsaempleo_editar').addEventListener('change', function() {
    togglePermissionOptionsEditar(this, 'bolsaempleo_options_editar');
});

document.getElementById('contrataciones_editar').addEventListener('change', function() {
    togglePermissionOptionsEditar(this, 'contrataciones_options_editar');
});

document.getElementById('listas_editar').addEventListener('change', function() {
    togglePermissionOptionsEditar(this, 'listas_options_editar');
});

document.getElementById('contrataciones_multi_editar').addEventListener('change', function() {
    togglePermissionOptionsEditar(this, 'contrataciones_multi_options_editar');
});

document.getElementById('cesantias_editar').addEventListener('change', function() {
    togglePermissionOptionsEditar(this, 'cesantias_options_editar');
});

// Añadir el evento para "Perfil de Puesto" en el formulario de edición
document.getElementById('perfilpuesto_editar').addEventListener('change', function() {
    togglePermissionOptionsEditar(this, 'perfilpuesto_options_editar');
});

// NUEVO: Añadir el evento para "Requisas"
document.getElementById('requisas_editar').addEventListener('change', function() {
    togglePermissionOptionsEditar(this, 'requisas_options_editar');
});

// NUEVO: Añadir el evento para "Inventario"
document.getElementById('inventario_editar').addEventListener('change', function() {
    togglePermissionOptionsEditar(this, 'inventario_options_editar');
});

// Asegurar que solo un radio ("solo ver" o "escribir") esté seleccionado por grupo en el formulario de edición
const radiosGroupsEditar = [
    'plazas_permiso_editar',
    'bolsaempleo_permiso_editar',
    'contrataciones_permiso_editar',
    'listas_permiso_editar',
    'contrataciones_multi_permiso_editar',
    'cesantias_permiso_editar',
    'perfilpuesto_permiso_editar',
    'requisas_permiso_editar', // Añadir para Requisas en edición
    'inventario_permiso_editar' // Añadir para Inventario en edición
];

radiosGroupsEditar.forEach(groupName => {
    const radios = document.querySelectorAll(`input[name="${groupName}"]`);
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            radios.forEach(r => {
                if (r !== radio) r.checked = false;  // Desmarcar la otra opción
            });
        });
    });
});
