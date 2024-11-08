document.getElementById('buscar_jefe').addEventListener('click', function() {
    const identidad = document.getElementById('identidad_input').value;
    if (!identidad) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor ingrese una identidad.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    fetch(`/buscar_jefe_por_identidad1/${identidad}/`)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Código para llenar la información del jefe...
            document.getElementById('jefe_id').value = data.jefe.id; // Asigna el ID del jefe

            // Cargar meses
            const selectMes = document.getElementById('select_mes');
            selectMes.innerHTML = "<option value=''>Seleccionar Mes</option>";
            for (const [numero, nombre] of Object.entries(data.meses)) {
                selectMes.innerHTML += `<option value="${numero}">${nombre}</option>`;
            }
            selectMes.disabled = false;

            // Cargar años
            const selectAño = document.getElementById('select_año');
            selectAño.innerHTML = "<option value=''>Seleccionar Año</option>";
            data.años.forEach(year => {
                selectAño.innerHTML += `<option value="${year}">${year}</option>`;
            });
            selectAño.disabled = false;
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Identidad no encontrada.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
        }
    });
});

document.getElementById('select_mes').addEventListener('change', cargarRolesRegistrados);
document.getElementById('select_año').addEventListener('change', cargarRolesRegistrados);

function cargarRolesRegistrados() {
    const jefeId = document.getElementById('jefe_id').value;
    const mes = document.getElementById('select_mes').value;
    const año = document.getElementById('select_año').value;

    if (jefeId && mes && año) {
        fetch(`/cargar_roles_registrados/${jefeId}/${mes}/${año}/`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('tabla_asistencia_container');
                container.innerHTML = ""; // Limpiar el contenedor

                if (data.success) {
                    // Crear la tabla y encabezados
                    const table = document.createElement('table');
                    table.id = 'tablarolesregistrados';
                    table.border = "1";

                    const thead = document.createElement('thead');
                    const headerRow = document.createElement('tr');
                    headerRow.innerHTML = `
                        <th>Nombre Colaborador</th>
                        <th>Semana</th>
                        <th>Horario Semana</th>
                        <th>Almuerzo</th>
                        <th>Horario Sábado</th>
                        <th>Domingo</th>
                        <th>Libre o Pagado</th>
                    `;
                    thead.appendChild(headerRow);
                    table.appendChild(thead);

                    const tbody = document.createElement('tbody');
                    data.data.forEach(registro => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${registro.nombre_colaborador}</td>
                            <td>${registro.semana_inicio} - ${registro.semana_fin}</td>
                            <td>${registro.horario_semana}</td>
                            <td>${registro.almuerzo_inicio} - ${registro.almuerzo_fin}</td>
                            <td>${registro.horario_sabado || 'N/A'}</td>
                            <td>${registro.dia_libre_domingo ? 'Sí' : 'No'}</td>
                            <td>${registro.fecha_domingo_libre || 'N/A'}</td>
                        `;
                        tbody.appendChild(row);
                    });
                    table.appendChild(tbody);
                    container.appendChild(table); // Añadir la tabla al contenedor
                    container.style.display = 'block'; // Mostrar el contenedor de la tabla
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se encontraron registros.',
                        icon: 'info',
                        confirmButtonText: 'Aceptar'
                    });
                    container.style.display = 'none'; // Ocultar la tabla si no hay datos
                }
            })
            .catch(error => {
                console.error("Error al cargar roles registrados:", error);
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al cargar los registros.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            });
    }
}