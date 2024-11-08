

document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', function () {
      this.value = this.value.toUpperCase();
    });
});

document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', function () {
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
//------------------------------------------------------------------------------//



//------------------------------------------------------------------------------//

document.addEventListener('DOMContentLoaded', function () {
    var nivelSelect = document.getElementById('nivel_psicosmart');
    var pruebasTd = document.getElementById('pruebas_td');
    var pruebasTd1 = document.getElementById('pruebas_td1');  
    nivelSelect.addEventListener('change', function () {
        var nivelSeleccionado = this.value;

        // Realizar la solicitud AJAX solo si hay un nivel seleccionado
        if (nivelSeleccionado) {
            fetch(`/obtener_pruebas_por_nivel/?nivel=${nivelSeleccionado}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Limpiar el contenido de td antes de agregar las nuevas pruebas
                    pruebasTd.innerHTML = '';

                    // Si hay pruebas, mostrarlas
                    if (data.pruebas.length > 0) {
                        // Mostrar ambos td si hay pruebas
                        pruebasTd.style.display = "block";
                        pruebasTd1.style.display = "block";

                        const container = document.createElement('div');
                        container.style.display = "grid";
                        container.style.gridTemplateColumns = "repeat(3, 1fr)";
                        container.style.gap = "10px"; // Espacio entre las pruebas

                        data.pruebas.forEach(prueba => {
                            const pruebaText = document.createElement('p');
                            pruebaText.textContent = prueba.nombre_prueba;
                            container.appendChild(pruebaText);
                        });

                        pruebasTd.appendChild(container);
                    } else {
                        pruebasTd.innerHTML = 'No hay pruebas para este nivel.';
                        pruebasTd.style.display = "block";
                        pruebasTd1.style.display = "block";  // Mostrar también el título
                    }
                } else {
                    pruebasTd.innerHTML = 'Hubo un error al obtener las pruebas.';
                    pruebasTd.style.display = "block";
                    pruebasTd1.style.display = "block";  // Mostrar también el título
                }
            })
            .catch(error => {
                console.error('Error al obtener las pruebas:', error);
                pruebasTd.innerHTML = 'Hubo un error al obtener las pruebas.';
                pruebasTd.style.display = "block";
                pruebasTd1.style.display = "block";  // Mostrar también el título
            });
        } else {
            // Ocultar ambos td si no hay nivel seleccionado
            pruebasTd.style.display = "none";
            pruebasTd1.style.display = "none";
        }
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


document.addEventListener('DOMContentLoaded', function() {
    var fileDropArea = document.querySelector('.file-drop-area');
    var fileInput = fileDropArea.querySelector('input[type="file"]');
    var fileMessage = fileDropArea.querySelector('.file-message');
    var previewImage = fileDropArea.querySelector('#previewImage_org'); 

    if (fileInput && previewImage && fileMessage) {
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
                displayImage(files[0]); // Mostrar la imagen
            }
        });

        // Mostrar la imagen seleccionada manualmente
        fileInput.addEventListener('change', function() {
            if (fileInput.files.length > 0) {
                displayImage(fileInput.files[0]); // Mostrar la imagen
            } else {
                resetFileArea(); // Resetear el área si no hay archivo
            }
        });

        // Función para mostrar la imagen seleccionada o arrastrada
        function displayImage(file) {
            if (file && file.type.startsWith('image/')) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result; // Establecer la fuente de la imagen
                    previewImage.style.display = 'block'; // Mostrar la imagen
                    fileMessage.style.display = 'none'; // Ocultar el mensaje de "arrastra o selecciona"
                };
                reader.readAsDataURL(file); // Leer el archivo como una URL
            } else {
                resetFileArea(); // Resetear el área si no es una imagen válida
            }
        }

        function resetFileArea() {
            previewImage.style.display = 'none'; // Ocultar la imagen
            fileMessage.style.display = 'block'; // Mostrar el mensaje de "arrastra o selecciona"
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const tablaFunciones = document.getElementById('tablaFunciones');

    function agregarFilaFuncion() {
        const nuevaFila = document.createElement('tr');
        nuevaFila.classList.add('funcionRow');
        
        // Contador de la fila basado en el número de filas actuales
        const numeroFila = tablaFunciones.querySelectorAll('.funcionRow').length + 1;

        nuevaFila.innerHTML = `
            <td class="numero-columna" style="text-align:center; background-color: white; color:black;">${numeroFila}</td>
            <td class="selectpuesto" style="text-align:center; background-color: white; color:black;">
                <input type="text" name="funcion[]" class="inputpuesto funcionInput" placeholder="Ingrese la Funcion">
            </td>
            <td class="selectpuesto" style="text-align:center; background-color: white; color:black;">
                <select name="periodicidad[]" class="inputpuesto">
                    <option value="" selected disabled>Seleccione una Periodicidad</option>
                    <option value="SEMANAL">SEMANAL</option>
                    <option value="DIARIA">DIARIA</option>
                    <option value="MENSUAL">MENSUAL</option>
                    <option value="SEMANAL Y MENSUAL">SEMANAL Y MENSUAL</option>
                </select>
            </td>
            <td class="selectpuesto" style="text-align:center; background-color: white; color:black;">
                <select name="importancia[]" class="inputpuesto">
                    <option value="" selected disabled>Seleccione la importancia</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </td>
        `;

        tablaFunciones.appendChild(nuevaFila);
        nuevaFila.querySelector('.funcionInput').addEventListener('input', detectarUltimaFilaFuncion);
    }

    function detectarUltimaFilaFuncion(e) {
        const filas = document.querySelectorAll('#tablaFunciones .funcionRow');

        // Agregar una nueva fila solo si el input de la última fila tiene contenido
        const ultimaFila = filas[filas.length - 1];
        const inputUltimaFila = ultimaFila.querySelector('.funcionInput');

        if (inputUltimaFila.value.trim() !== "") {
            agregarFilaFuncion();
        }
    }

    // Asignar event listener a la primera fila
    const inputPrimeraFilaFuncion = document.querySelector('#tablaFunciones .funcionInput');
    inputPrimeraFilaFuncion.addEventListener('input', detectarUltimaFilaFuncion);
});





document.addEventListener('DOMContentLoaded', function() {
    const tablaDificultades = document.getElementById('tablaDificultades');

    function agregarFilaDificultad() {
        const nuevaFila = document.createElement('tr');
        nuevaFila.classList.add('funcionRow');
        
        nuevaFila.innerHTML = `
            <td class="selectpuesto" style="text-align:center; background-color: white; color:black;">
                <input type="text" name="dificultad[]" class="inputpuesto funcionInput" placeholder="Ingrese la Dificultad">
            </td>
        `;

        tablaDificultades.appendChild(nuevaFila);
        nuevaFila.querySelector('.funcionInput').addEventListener('input', detectarUltimaFilaDificultad);
    }

    function detectarUltimaFilaDificultad(e) {
        const filas = document.querySelectorAll('#tablaDificultades .funcionRow');

        const ultimaFila = filas[filas.length - 1];
        const inputUltimaFila = ultimaFila.querySelector('.funcionInput');

        // Si el campo de la última fila tiene contenido, agregar una nueva fila
        if (inputUltimaFila.value.trim() !== "") {
            agregarFilaDificultad();
        }
    }

    const inputPrimeraFilaDificultad = document.querySelector('#tablaDificultades .funcionInput');
    inputPrimeraFilaDificultad.addEventListener('input', detectarUltimaFilaDificultad);
});


document.addEventListener('DOMContentLoaded', function() {
    const tablaIndicadores = document.getElementById('tablaIndicadores');

    function agregarFilaIndicador() {
        const nuevaFila = document.createElement('tr');
        nuevaFila.classList.add('indicadorRow');

        nuevaFila.innerHTML = `
            <td class="selectpuesto" style="text-align:center; background-color: white; color:black;">
                <input type="text" name="indicador[]" class="inputpuesto indicadorInput" placeholder="Ingrese el Indicador">
            </td>
        `;

        tablaIndicadores.appendChild(nuevaFila);
        nuevaFila.querySelector('.indicadorInput').addEventListener('input', detectarUltimaFilaIndicador);
    }

    function detectarUltimaFilaIndicador(e) {
        const filas = document.querySelectorAll('#tablaIndicadores .indicadorRow');

        const ultimaFila = filas[filas.length - 1];
        const inputUltimaFila = ultimaFila.querySelector('.indicadorInput');

        // Si el campo de la última fila tiene contenido, agregar una nueva fila
        if (inputUltimaFila.value.trim() !== "") {
            agregarFilaIndicador();
        }
    }

    const inputPrimeraFilaIndicador = document.querySelector('#tablaIndicadores .indicadorInput');
    inputPrimeraFilaIndicador.addEventListener('input', detectarUltimaFilaIndicador);
});




function toggleTextAndField() {
    var paragraph = document.getElementById("text");
    var button = document.getElementById("toggleButton");
    var dynamicField = document.getElementById("dynamicField");

    if (paragraph.innerHTML === "PERFIL NUEVO") {
        paragraph.innerHTML = "PERFIL EXISTENTE";
        button.innerHTML = "PERFIL NUEVO";

        dynamicField.innerHTML = `
            <select name="puesto" id="puesto" >
                <option value="" selected disabled>Seleccione un Puesto</option>
                {% for item in all_puestos %}
                    <option value="{{ item.nombre_puestos }}">{{ item.nombre_puestos }}</option>
                {% endfor %}
            </select>
        `;
    } else {
        paragraph.innerHTML = "PERFIL NUEVO";
        button.innerHTML = "PERFIL EXISTENTE";

        dynamicField.innerHTML = `
            <input type="text" name="nuevo_puesto" id="nuevo_puesto" class="inputpuesto" placeholder="Ingrese un nuevo puesto">
        `;

        // Aplicar la funcionalidad de transformación a mayúsculas después de insertar el campo
        var nuevoInput = document.getElementById("nuevo_puesto");
        nuevoInput.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var checkboxOtros = document.getElementById('checkboxOtros_equipos');
    var inputOtros = document.getElementById('inputOtros_equipos');

    checkboxOtros.addEventListener('change', function() {
        if (this.checked) {
            inputOtros.style.display = 'inline-block';
        } else {
            inputOtros.style.display = 'none';
            inputOtros.value = ''; 
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const otrosCheckbox = document.getElementById('otrosCheckboxCompensacion');
    const inputOtrosCompensacion = document.getElementById('inputOtrosCompensacion');

    otrosCheckbox.addEventListener('change', function() {
        if (otrosCheckbox.checked) {
            inputOtrosCompensacion.style.display = 'block'; 
        } else {
            inputOtrosCompensacion.style.display = 'none';  
            inputOtrosCompensacion.value = '';  
        }
    });
});

