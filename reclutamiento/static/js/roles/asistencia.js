document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("buscar_jefe").addEventListener("click", buscarJefe);
    document.getElementById("select_mes").addEventListener("change", cargarSemanas);
    document.getElementById("select_año").addEventListener("change", cargarSemanas);  // Agregar evento para el selector de año

    function buscarJefe() {
        const identidad = document.getElementById("identidad_input").value;

        if (!identidad) {
            Swal.fire({
                title: 'Error',
                text: 'Debe ingresar una identidad.',
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'classbotones'
                }
            });
            return;
        }

        fetch(`/buscar_jefe_por_identidad/${identidad}/`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById("jefe_info").style.display = "block";
                    document.getElementById("codigo").value = data.jefe.codigo;
                    document.getElementById("nombre").value = data.jefe.nombrejefe;
                    document.getElementById("jefe_id").value = data.jefe.id;
                    document.getElementById("select_mes").disabled = false;
                    document.getElementById("select_año").disabled = false;  // Habilitar el selector de año
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Identidad no encontrada.',
                        icon: 'warning',
                        confirmButtonText: 'Aceptar',
                        customClass: {
                            confirmButton: 'classbotones'
                        }
                    });
                }
            })
            .catch(error => {
                console.error("Error al buscar jefe:", error);
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al buscar el jefe.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        confirmButton: 'classbotones'
                    }
                });
            });
    }

    function cargarSemanas() {
        const jefeId = document.getElementById("jefe_id").value;
        const mes = document.getElementById("select_mes").value;
        const año = document.getElementById("select_año").value;
    
        if (jefeId && mes && año) {
            fetch(`/cargar_semanas/${jefeId}/${año}/${mes}/`)
                .then(response => response.json())
                .then(data => {
                    const tabla = document.getElementById("tabla_asistencia");
                    tabla.innerHTML = "";
    
                    const encabezado = document.createElement("tr");
                    encabezado.innerHTML = "<th>Nombre Colaborador</th>";
                    data.semanas.forEach(semana => {
                        const inicioFormatted = `${año}-${semana.inicio.split('-')[1]}-${semana.inicio.split('-')[2]}`;
                        const finFormatted = `${año}-${semana.fin.split('-')[1]}-${semana.fin.split('-')[2]}`;
                        encabezado.innerHTML += `<th>${inicioFormatted} - ${finFormatted}</th>`;
                    });
                    tabla.appendChild(encabezado);
    
                    const colaboradoresOrdenados = data.colaboradores.sort((a, b) => a.nombrecolaborador.localeCompare(b.nombrecolaborador));
    
                    colaboradoresOrdenados.forEach(colaborador => {
                        const fila = document.createElement("tr");
                        fila.id = `fila-colaborador-${colaborador.id}`;
                        fila.innerHTML = `<td>${colaborador.nombrecolaborador}</td>`;
    
                        data.semanas.forEach(semana => {
                            const celdaHorario = document.createElement("td");
                            celdaHorario.classList.add("celda-centro");
    
                            const inicioFormatted = `${año}-${semana.inicio.split('-')[1]}-${semana.inicio.split('-')[2]}`;
                            const finFormatted = `${año}-${semana.fin.split('-')[1]}-${semana.fin.split('-')[2]}`;
                            celdaHorario.setAttribute("data-semana-inicio", inicioFormatted);
                            celdaHorario.setAttribute("data-semana-fin", finFormatted);
    
                            const labelSemana = document.createElement("label");
                            labelSemana.textContent = "Horario semana";
                            labelSemana.classList.add("label-semana");
                            labelSemana.style.display = "block";
                            celdaHorario.appendChild(labelSemana);
    
                            const selectHorario = document.createElement("select");
                            selectHorario.classList.add("select-horario");
    
                            const opcionDefault = document.createElement("option");
                            opcionDefault.textContent = "Seleccione un horario";
                            opcionDefault.disabled = true;
                            opcionDefault.selected = true;
                            selectHorario.appendChild(opcionDefault);
    
                            data.horarios.forEach(horario => {
                                const option = document.createElement("option");
                                option.value = `${horario.hora_inicio} - ${horario.hora_fin}`;
                                option.textContent = `${horario.hora_inicio} - ${horario.hora_fin}`;
                                selectHorario.appendChild(option);
                            });
    
                            celdaHorario.appendChild(selectHorario);
    
                            // Comprobar si hay un sábado en el rango de fechas
                            if (semana.incluye_sabado) {
                                const labelSabado = document.createElement("label");
                                labelSabado.classList.add("label-sabado");
                                labelSabado.style.display = "block";
                                labelSabado.style.marginTop = "10px";
                                labelSabado.textContent = "Sábado";
    
                                const selectSabado = document.createElement("select");
                                selectSabado.classList.add("select-horario");
    
                                const opcionDefaultSabado = document.createElement("option");
                                opcionDefaultSabado.textContent = "Seleccione un horario";
                                opcionDefaultSabado.disabled = true;
                                opcionDefaultSabado.selected = true;
                                selectSabado.appendChild(opcionDefaultSabado);
    
                                data.horarios.forEach(horario => {
                                    const optionSabado = document.createElement("option");
                                    optionSabado.value = `${horario.hora_inicio} - ${horario.hora_fin}`;
                                    optionSabado.textContent = `${horario.hora_inicio} - ${horario.hora_fin}`;
                                    selectSabado.appendChild(optionSabado);
                                });
    
                                celdaHorario.appendChild(labelSabado);
                                celdaHorario.appendChild(selectSabado);
                            }
    
                            const labelAlmuerzo = document.createElement("label");
                            labelAlmuerzo.textContent = "Almuerzo";
                            labelAlmuerzo.style.display = "block";
                            labelAlmuerzo.style.marginTop = "10px";
                            celdaHorario.appendChild(labelAlmuerzo);
    
                            const divAlmuerzo = document.createElement("div");
                            divAlmuerzo.classList.add("time-range");
    
                            const inputHoraInicio = document.createElement("input");
                            inputHoraInicio.type = "time";
                            inputHoraInicio.id = "horaInicio";
                            inputHoraInicio.name = "horaInicio";
                            inputHoraInicio.required = true;
                            divAlmuerzo.appendChild(inputHoraInicio);
    
                            const inputHoraFin = document.createElement("input");
                            inputHoraFin.type = "time";
                            inputHoraFin.id = "horaFin";
                            inputHoraFin.name = "horaFin";
                            inputHoraFin.required = true;
                            divAlmuerzo.appendChild(inputHoraFin);
    
                            celdaHorario.appendChild(divAlmuerzo);
    
                            if (semana.incluye_domingo) {
                                const labelDomingo = document.createElement("label");
                                labelDomingo.classList.add("dia-horario");
                                labelDomingo.style.display = "block";
    
                                const checkboxDomingo = document.createElement("input");
                                checkboxDomingo.type = "checkbox";
                                checkboxDomingo.classList.add("domingo-checkbox");
    
                                labelDomingo.appendChild(checkboxDomingo);
                                labelDomingo.appendChild(document.createTextNode(" Domingo"));
    
                                const inputFechaDomingo = document.createElement("input");
                                inputFechaDomingo.type = "date";
                                inputFechaDomingo.classList.add("fecha-domingo");
                                inputFechaDomingo.style.display = "none";
    
                                const labelPagado = document.createElement("label");
                                labelPagado.style.display = "none"; // Inicialmente oculto
                                labelPagado.style.marginTop = "10px";
                                const checkboxPagado = document.createElement("input");
                                checkboxPagado.type = "checkbox";
                                checkboxPagado.classList.add("pagado-checkbox");
                                labelPagado.appendChild(checkboxPagado);
                                labelPagado.appendChild(document.createTextNode(" PAGADO"));
    
                                checkboxDomingo.addEventListener("change", function(event) {
                                    const isChecked = event.target.checked;
                                    inputFechaDomingo.style.display = isChecked ? "inline" : "none";
                                    labelPagado.style.display = isChecked ? "block" : "none"; // Muestra el label "PAGADO"
                                    checkboxPagado.checked = false; // Reinicia el checkbox "PAGADO" si se desmarca "Domingo"
                                    inputFechaDomingo.disabled = false; // Habilitar el input de fecha si el checkbox "PAGADO" no está marcado
                                });
    
                                checkboxPagado.addEventListener("change", function(event) {
                                    inputFechaDomingo.disabled = event.target.checked; // Desactivar el input de fecha si se marca el checkbox "PAGADO"
                                    if (event.target.checked) {
                                        inputFechaDomingo.value = ''; // Limpiar el valor si se marca "PAGADO"
                                    }
                                });
    
                                celdaHorario.appendChild(labelDomingo);
                                celdaHorario.appendChild(inputFechaDomingo);
                                celdaHorario.appendChild(labelPagado);
                            }
    
                            fila.appendChild(celdaHorario);
                        });
    
                        tabla.appendChild(fila);
                    });
    
                    let guardarAsistenciaBtn = document.getElementById('guardar_asistencia');
                    if (!guardarAsistenciaBtn) {
                        guardarAsistenciaBtn = document.createElement('button');
                        guardarAsistenciaBtn.id = 'guardar_asistencia';
                        guardarAsistenciaBtn.style.marginTop = '30px';
                        guardarAsistenciaBtn.textContent = 'Guardar Asistencia';
                        guardarAsistenciaBtn.classList.add('btn');
    
                        guardarAsistenciaBtn.addEventListener('click', function(event) {
                            event.preventDefault();
                            guardarAsistencia();
                        });
    
                        document.getElementById('tabla_asistencia_container').appendChild(guardarAsistenciaBtn);
                    }
                })
                .catch(error => {
                    console.error("Error al cargar semanas:", error);
                });
        }
    }    
});

function guardarAsistencia() {
    const jefeId = document.getElementById('jefe_id').value;
    const mes = document.getElementById('select_mes').value;
    const año = document.getElementById('select_año').value;
    const csrftoken = getCookie('csrftoken'); 

    if (!jefeId || !mes || !año) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor seleccione un jefe, un mes y un año.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    const colaboradoresData = [];
    const filasColaboradores = document.querySelectorAll('#tabla_asistencia tr:not(:first-child)'); 

    filasColaboradores.forEach(fila => {
        const colaboradorId = fila.id.split('-').pop(); 
        const semanasData = [];
        let isCompleteForAllWeeks = true; 

        const celdasHorario = fila.querySelectorAll('td');
        celdasHorario.forEach(celda => {
            if (celda.hasAttribute('disabled')) return;

            const semana_inicio = celda.getAttribute('data-semana-inicio');
            const semana_fin = celda.getAttribute('data-semana-fin');

            if (!semana_inicio || !semana_fin) {
                console.warn(`Saltando registro sin semana_inicio o semana_fin para colaborador ${colaboradorId}`);
                return;
            }

            const horarioSemana = celda.querySelector('.select-horario') ? celda.querySelector('.select-horario').value || null : null;
            const almuerzoInicio = celda.querySelector('.time-range input[name="horaInicio"]') ? celda.querySelector('.time-range input[name="horaInicio"]').value || null : null;
            const almuerzoFin = celda.querySelector('.time-range input[name="horaFin"]') ? celda.querySelector('.time-range input[name="horaFin"]').value || null : null;

            const diaLibreDomingo = celda.querySelector('.domingo-checkbox') ? celda.querySelector('.domingo-checkbox').checked : false;
            const inputFechaDomingo = celda.querySelector('.fecha-domingo') ? celda.querySelector('.fecha-domingo').value || null : null;

            const pagadoCheckbox = celda.querySelector('.pagado-checkbox');
            const isPagado = pagadoCheckbox ? pagadoCheckbox.checked : false;

            let fechaDomingoLibre;
            if (isPagado) {
                fechaDomingoLibre = "PAGADO";  
            } else {
                fechaDomingoLibre = diaLibreDomingo ? inputFechaDomingo : null; 
            }

            // Capturar horario del sábado
            const horarioSabado = celda.querySelector('.label-sabado') ? celda.querySelector('.label-sabado + .select-horario').value || null : null;

            if (!horarioSemana || !almuerzoInicio || !almuerzoFin || (horarioSabado === null && celda.querySelector('.label-sabado'))) {
                isCompleteForAllWeeks = false;
            } else {
                semanasData.push({
                    semana_inicio: semana_inicio,
                    semana_fin: semana_fin,
                    horario_semana: horarioSemana,
                    almuerzo_inicio: almuerzoInicio,
                    almuerzo_fin: almuerzoFin,
                    dia_libre_domingo: diaLibreDomingo,
                    fecha_domingo_libre: fechaDomingoLibre,
                    horario_sabado: horarioSabado // Añadir el horario del sábado aquí
                });
            }
        });

        if (isCompleteForAllWeeks && semanasData.length > 0) {
            colaboradoresData.push({
                colaborador_id: colaboradorId,
                semanas: semanasData
            });
        }
    });

    if (colaboradoresData.length === 0) {
        Swal.fire({
            title: 'Aviso',
            text: 'No hay datos de asistencia completos asignados para enviar.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    const data = {
        jefe_id: jefeId,
        mes: mes,
        año: año,
        colaboradores: colaboradoresData
    };

    fetch('/registro_asistencia/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                title: 'Éxito',
                text: 'Asistencia registrada correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: data.message || 'Ocurrió un error al registrar la asistencia.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error en el servidor. Inténtalo de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    });
}


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
