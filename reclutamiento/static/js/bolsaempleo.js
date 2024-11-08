document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los contenedores con clase 'file-drop-area'
    var fileDropAreas = document.querySelectorAll('.file-drop-area');

    fileDropAreas.forEach(function(fileDropArea) {
        var fileInput = fileDropArea.querySelector('input[type="file"]');
        var fileMessage = fileDropArea.querySelector('.file-message');

        // Asegurarnos de que los eventos se aplican solo una vez
        if (fileInput && fileMessage) {
            // Evitar el comportamiento por defecto para eventos de arrastrar y soltar
            fileDropArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                e.stopPropagation();
                fileDropArea.classList.add('dragover');
            });

            fileDropArea.addEventListener('dragleave', function(e) {
                e.preventDefault();
                e.stopPropagation();
                fileDropArea.classList.remove('dragover');
            });

            fileDropArea.addEventListener('drop', function(e) {
                e.preventDefault();
                e.stopPropagation();
                fileDropArea.classList.remove('dragover');

                var files = e.dataTransfer.files; // Obtener los archivos arrastrados
                if (files.length > 0) {
                    fileInput.files = files; // Asignar archivos al input file
                    fileMessage.textContent = files[0]
                        .name; // Mostrar el nombre del archivo
                }
            });

            // Mostrar el nombre del archivo seleccionado manualmente
            fileInput.addEventListener('change', function() {
                if (fileInput.files.length > 0) {
                    fileMessage.textContent = fileInput.files[0].name;
                } else {
                    fileMessage.textContent =
                        "Arrastra tu archivo aquí o haz clic para seleccionar";
                }
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Función para inicializar el comportamiento de selección personalizada
    function initializeCustomSelect(selectWrapperId, optionsWrapperId) {
        const selectWrapper = document.getElementById(selectWrapperId);
        const optionsWrapper = document.getElementById(optionsWrapperId);
        const checkboxes = optionsWrapper.querySelectorAll('input[type="checkbox"]');
        const dropdownIcon = document.createElement('i');
        dropdownIcon.className = 'dropdown-icon fas fa-chevron-down';
        let selectedText = 'Seleccione uno o más puestos';
        
        // Función para actualizar el texto del select
        function updateSelectedText() {
            const selectedValues = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.parentElement.textContent.trim());
    
            selectWrapper.textContent = selectedValues.length > 0 ? selectedValues.join(', ') : selectedText;
            selectWrapper.appendChild(dropdownIcon); // Volvemos a añadir el icono
        }
    
        // Evento para abrir/cerrar el select personalizado
        selectWrapper.addEventListener('click', function() {
            selectWrapper.classList.toggle('active');
        });
    
        // Evento para actualizar el texto al seleccionar/desseleccionar opciones
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateSelectedText);
        });
    
        // Cerrar el select personalizado al hacer clic fuera de él
        document.addEventListener('click', function(event) {
            if (!selectWrapper.contains(event.target) && !optionsWrapper.contains(event.target)) {
                selectWrapper.classList.remove('active');
            }
        });
        
        // Añadir el icono de dropdown al select personalizado
        selectWrapper.appendChild(dropdownIcon);
    }
    
    // Inicializar para todos los selectores personalizados
    initializeCustomSelect('select-puestos-aspira', 'options-puestos-aspira');
    initializeCustomSelect('select-puestos-aplica', 'options-puestos-aplica');
    initializeCustomSelect('select-puestos-aspira-editar', 'options-puestos-aspira-editar');
});

function validateNumber(input) {
    input.value = input.value.replace(/[^0-9.+]/g, '');
  }

  document.querySelectorAll('.form-control').forEach(input => {
    input.setAttribute('autocomplete', 'off');
  });

  document.querySelectorAll('.form-control').forEach(input => {
    if (input.tagName === 'INPUT' && input.type === 'text') {
      input.addEventListener('input', function () {
        this.value = this.value.toUpperCase();
      });
    }
  });
  

function calculateAge() {
    const dobInput = document.getElementById('fechanacimiento').value;
    if (!dobInput) return;
    const dob = moment(dobInput);
    const now = moment.tz('America/Tegucigalpa');
    const age = now.diff(dob, 'years');
    document.getElementById('edad').value = age;
}
function calculateAgeedit() {
    const dobInput = document.getElementById('fechanacimientoeditar').value;
    if (!dobInput) return;
    const dob = moment(dobInput);
    const now = moment.tz('America/Tegucigalpa');
    const age = now.diff(dob, 'years');
    document.getElementById('edadeditar').value = age;
}


document.getElementById('register-form-bolsaempleo').addEventListener('submit', function(event) {
    event.preventDefault();

    const dni = document.getElementById('dni').value.trim();
    const nombreCandidato = document.getElementById('nombre_candidato').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const estado = document.getElementById('estado').value.trim(); // Validación para el campo estado
    const puestosaspira = Array.from(document.querySelectorAll('input[name="puestoaspira[]"]:checked')).map(el => el.value);

    // Validación de campos obligatorios
    if (!nombreCandidato || !telefono || puestosaspira.length === 0 || !estado) {
        let camposFaltantes = [];
        if (!nombreCandidato) camposFaltantes.push("Nombre del Candidato");
        if (!telefono) camposFaltantes.push("Teléfono");
        if (puestosaspira.length === 0) camposFaltantes.push("Puesto al que Aspira");
        if (!estado) camposFaltantes.push("Estado");

        Swal.fire({
            title: 'Error',
            text: 'Los siguientes campos son obligatorios: ' + camposFaltantes.join(', ') + '.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
        return;
    }

    // Validar si se ha seleccionado un archivo y si es un PDF
    const archivo = document.getElementById('cv').files[0];
    if (archivo && archivo.type !== 'application/pdf') {
        Swal.fire({
            title: 'Error',
            text: 'Solo se permiten documentos en formato PDF.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
        return;
    }

    const fechaNacimiento = document.getElementById('fechanacimiento').value;
    // Validar el formato de fecha de nacimiento
    if (fechaNacimiento && !/^\d{4}-\d{2}-\d{2}$/.test(fechaNacimiento)) {
        Swal.fire({
            title: 'Error',
            text: 'La fecha de nacimiento debe estar en el formato YYYY-MM-DD.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
        return;
    }

    const data = {
        dni: dni,
        nombre_candidato: nombreCandidato,
        puestoaspira: puestosaspira,
        telefono: telefono,
        telefono2: document.getElementById('telefono2').value.trim() || null, 
        estado: estado,  // Añadido estado como obligatorio
        ciudad: document.getElementById('ciudad').value || null, 
        mediosReclutamiento: document.getElementById('mediosReclutamiento').value || null, 
        edad: document.getElementById('edad').value || null, 
        fechanacimiento: fechaNacimiento || null, 
        estadocivil: document.getElementById('estadocivil').value || null, 
        nhijos: document.getElementById('nhijos').value.trim() || null, 
        direccion: document.getElementById('direccion').value.trim() || null, 
        experiencia: document.getElementById('experiencia').value.trim() || null, 
        observacion: document.getElementById('observacion').value.trim() || null, 
        mediomovilizacion: document.getElementById('mediomovilizacion').value || null 
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (archivo) {
        formData.append('cv', archivo); // Añadir archivo PDF si existe
    }

    fetch('/BolsaEmpleo/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': getCookie('csrftoken') // Asegúrate de que el token esté disponible
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
                text: 'Candidato registrado exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            }).then(() => {
                location.reload(); // Recargar la página después de guardar exitosamente
            });
        }
    })
    .catch(error => {
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al registrar al candidato.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
    });
});


document.getElementById('update-form-bolsaempleo').addEventListener('submit', function(event) {
    event.preventDefault();

    const data = {
        id: document.getElementById('ideditar').value,
        dni: document.getElementById('dnieditar').value.trim(),
        nombre_candidato: document.getElementById('nombre_candidatoeditar').value.trim(),
        puestoaspira: Array.from(document.querySelectorAll('input[name="puestoaspiraeditar[]"]:checked')).map(el => el.value),
        puestoaplica: Array.from(document.querySelectorAll('input[name="puestoaplica[]"]:checked')).map(el => el.value) || [],
        telefono: document.getElementById('telefonoeditar').value.trim(),
        telefono2: document.getElementById('telefono2editar').value.trim() || null,
        estado: document.getElementById('estadoeditar').value || null,
        ciudad: document.getElementById('ciudadeditar').value || null,
        mediosReclutamiento: document.getElementById('mediosReclutamientoeditar').value || null,
        edad: document.getElementById('edadeditar').value || null,
        fechanacimiento: document.getElementById('fechanacimientoeditar').value || null,
        estadocivil: document.getElementById('estadocivileditar').value || null,
        nhijos: document.getElementById('nhijoseditar').value.trim() || null,
        direccion: document.getElementById('direccioneditar').value.trim() || null,
        experiencia: document.getElementById('experienciaeditar').value.trim() || null,
        observacion: document.getElementById('observacioneditar').value.trim() || null,
        mediomovilizacion: document.getElementById('mediomovilizacioneditar').value || null
    };

    // Validar campos obligatorios
    if (!data.nombre_candidato || !data.telefono || data.puestoaspira.length === 0 || !data.estado) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, completa todos los campos obligatorios.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
        return;
    }

    const archivo = document.getElementById('cveditar').files[0]; // Archivo seleccionado, si existe

    // Validar que el archivo subido sea PDF si se selecciona uno
    if (archivo && archivo.type !== 'application/pdf') {
        Swal.fire({
            title: 'Error',
            text: 'El archivo debe ser un documento PDF.',
            icon: 'warning',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
        return;
    }

    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (archivo) {
        formData.append('cveditar', archivo); // Añadir archivo PDF si existe
    }

    fetch(`/BolsaEmpleo/UpdatePOST/${data.id}/`, { // Cambia a la nueva URL
        method: 'POST', // Utiliza el método POST en lugar de PUT
        headers: {
            'X-CSRFToken': getCookie('csrftoken') // Asegúrate de que el token esté disponible
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => {
                throw new Error(errData.message || 'Error al actualizar el candidato');
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
                text: 'Candidato actualizado exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'custom-alertas-button'
                }
            }).then(() => {
                location.reload(); // Recargar la página después de actualizar exitosamente
            });
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error); // Imprimir el error
        Swal.fire({
            title: 'Error',
            text: error.message || 'Hubo un problema al actualizar al candidato.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            customClass: {
                confirmButton: 'custom-alertas-button'
            }
        });
    });
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

function llenarFormularioEditar(boton) {
    var bolsaEmpleosData = JSON.parse(document.getElementById('bolsaempleos-data').textContent);
    var idCandidato = boton.getAttribute('data-editar');
    var candidatoSeleccionado = bolsaEmpleosData.find(candidato => candidato.id == idCandidato);

    if (candidatoSeleccionado) {
        // Llenar el formulario con los datos del candidato seleccionado
        document.getElementById('ideditar').value = candidatoSeleccionado.id || '';
        document.getElementById('dnieditar').value = candidatoSeleccionado.dni || '';
        document.getElementById('nombre_candidatoeditar').value = candidatoSeleccionado.nombre_candidato || '';
        document.getElementById('telefonoeditar').value = candidatoSeleccionado.telefono || '';
        document.getElementById('telefono2editar').value = candidatoSeleccionado.telefono2 || '';
        document.getElementById('estadoeditar').value = candidatoSeleccionado.estado || '';
        document.getElementById('ciudadeditar').value = candidatoSeleccionado.ciudad || '';
        document.getElementById('mediosReclutamientoeditar').value = candidatoSeleccionado.medio_reclutamiento || '';
        document.getElementById('edadeditar').value = candidatoSeleccionado.edad || '';
        document.getElementById('fechanacimientoeditar').value = candidatoSeleccionado.fecha_nacimiento || '';
        document.getElementById('estadocivileditar').value = candidatoSeleccionado.estadocivil || '';
        document.getElementById('nhijoseditar').value = (candidatoSeleccionado.nhijos === "None" ? '' : candidatoSeleccionado.nhijos) || '';
        document.getElementById('direccioneditar').value = candidatoSeleccionado.direccion || '';
        document.getElementById('experienciaeditar').value = candidatoSeleccionado.experiencia || '';
        document.getElementById('observacioneditar').value = candidatoSeleccionado.observacion || '';
        document.getElementById('mediomovilizacioneditar').value = candidatoSeleccionado.mediomovilizacion || '';

        // Manejo de puestos aspira
        var puestosAspiraRaw = candidatoSeleccionado.puestosaspira || "[]";
        var puestosAspiraIds = (puestosAspiraRaw === "None" ? [] : JSON.parse(puestosAspiraRaw.replace(/'/g, '"')).map(Number));

        var checkboxesAspira = document.querySelectorAll('#options-puestos-aspira-editar input[type="checkbox"]');
        checkboxesAspira.forEach(checkbox => {
            var checkboxValue = parseInt(checkbox.value);
            checkbox.checked = puestosAspiraIds.includes(checkboxValue);
        });
        updateSelectedText('#select-puestos-aspira-editar', checkboxesAspira);

        // Manejo de puestos aplica
        var puestosAplicaRaw = candidatoSeleccionado.puestosaplica || "[]";
        var puestosAplicaIds = (puestosAplicaRaw === "None" ? [] : JSON.parse(puestosAplicaRaw.replace(/'/g, '"')).map(Number));

        var checkboxesAplica = document.querySelectorAll('#options-puestos-aplica input[type="checkbox"]');
        checkboxesAplica.forEach(checkbox => {
            var checkboxValue = parseInt(checkbox.value);
            checkbox.checked = puestosAplicaIds.includes(checkboxValue);
        });
        updateSelectedText('#select-puestos-aplica', checkboxesAplica);

    } else {
        console.error("Candidato no encontrado en el JSON");
    }
}

// Función para actualizar el texto visible del select personalizado
function updateSelectedText(selectSelector, checkboxes) {
    const selectElement = document.querySelector(selectSelector);
    const selectedValues = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.parentElement.textContent.trim());

    selectElement.textContent = selectedValues.length > 0 ? selectedValues.join(', ') : 'Seleccione uno o más puestos';

    // Añadir ícono de dropdown nuevamente
    const dropdownIcon = document.createElement('i');
    dropdownIcon.className = 'dropdown-icon fas fa-chevron-down';
    selectElement.appendChild(dropdownIcon);
}




/*===== EXPANDER MENU  =====*/ 
const showMenu = (toggleId, navbarId, bodyId) => {
    const toggle = document.getElementById(toggleId),
      navbar = document.getElementById(navbarId),
      bodypadding = document.getElementById(bodyId);
  
    if (toggle && navbar) {
      toggle.addEventListener('click', () => {
        const isExpanded = navbar.classList.toggle('expander');
        bodypadding.classList.toggle('body-pd');
        
        // If the menu is collapsing, close all collapse menus
        if (!isExpanded) {
          closeAllCollapseMenus();
        }
      });
    }
  }
  showMenu('nav-toggle', 'navbar', 'body-pd');
  
  /*===== LINK ACTIVE  =====*/ 
  const linkColor = document.querySelectorAll('.nav__link');
  function colorLink() {
    linkColor.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  }
  linkColor.forEach(l => l.addEventListener('click', colorLink));
  
  /*===== COLLAPSE MENU  =====*/ 
  const linkCollapse = document.getElementsByClassName('collapse__link');
  const navbar = document.getElementById('navbar'); // Refs to the navbar
  const bodypadding = document.getElementById('body-pd'); // Refs to body padding
  
  function closeAllCollapseMenus() {
    const allCollapseMenus = document.getElementsByClassName('collapse__menu');
    for (let j = 0; j < allCollapseMenus.length; j++) {
      allCollapseMenus[j].classList.remove('showCollapse');
      linkCollapse[j].querySelector('.collapse__icon').classList.remove('rotate');
    }
  }
  
  for (let i = 0; i < linkCollapse.length; i++) {
    linkCollapse[i].addEventListener('click', function () {
      const collapseMenu = this.nextElementSibling;
      const isOpen = collapseMenu.classList.contains('showCollapse');
      
      // Close all collapse menus if not currently open
      if (!isOpen) {
        closeAllCollapseMenus();
        
        // Open the clicked collapse menu
        collapseMenu.classList.add('showCollapse');
        this.querySelector('.collapse__icon').classList.add('rotate');
        
        // Ensure the expander menu is open
        navbar.classList.add('expander');
        bodypadding.classList.add('body-pd');
      } else {
        // Close the clicked collapse menu
        collapseMenu.classList.remove('showCollapse');
        this.querySelector('.collapse__icon').classList.remove('rotate');
      }
    });
  }
  
  // Monitor navbar state and close collapse menus if navbar is closed
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'class') {
        if (!navbar.classList.contains('expander')) {
          closeAllCollapseMenus();
        }
      }
    });
  });
  
function mostrardetalles(boton) {
    // Obtener el ID del candidato a partir del atributo data-id del botón
    var id = boton.getAttribute('data-id');

    // Parsear el contenido del script JSON
    var bolsaEmpleosData = JSON.parse(document.getElementById('bolsaempleos-data').textContent);

    // Buscar el item correspondiente en el array
    var datosBolsa = bolsaEmpleosData.find(item => item.id == id);

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
    setInnerText('detalles-id', datosBolsa.id);
    setInnerText('detalles-dni', datosBolsa.dni);
    setInnerText('detalles-nombre-candidato', datosBolsa.nombre_candidato);
    setInnerText('detalles-telefono', datosBolsa.telefono);
    setInnerText('detalles-telefono2', datosBolsa.telefono2);
    setInnerText('detalles-estado', datosBolsa.estado);
    setInnerText('detalles-ciudad', datosBolsa.nombre_ciudad);  // Muestra el nombre de la ciudad
    setInnerText('detalles-medio-reclutamiento', datosBolsa.nombre_medio_reclutamiento);  // Muestra el nombre del medio de reclutamiento
    setInnerText('detalles-edad', datosBolsa.edad);
    setInnerText('detalles-fecha-nacimiento', datosBolsa.fecha_nacimiento);
    setInnerText('detalles-estadocivil', datosBolsa.estadocivil);
    setInnerText('detalles-nhijos', datosBolsa.nhijos);
    setInnerText('detalles-direccion', datosBolsa.direccion);
    setInnerText('detalles-mediomovilizacion', datosBolsa.mediomovilizacion);
    setInnerText('detalles-experiencia', datosBolsa.experiencia);
    setInnerText('detalles-observacion', datosBolsa.observacion);
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

document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', function () {
        this.value = this.value.toUpperCase();
    });
});
  