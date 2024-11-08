# reclutamiento/middlewares.py

from django.shortcuts import redirect
from django.urls import reverse, resolve
from reclutamiento.models import Users
from django.utils.deprecation import MiddlewareMixin

# Definir las rutas y sus permisos requeridos
PERMISOS_VISTAS = {
    #Plazas
    'controlplazas': 'plazas',
    'descargar_imagen': 'plazas',
    'exportar_excel': 'plazas',
    'cancelar_estatus_controlplazas': 'plazas',
    'update_controlplazas': 'plazas',
    'delete_controlplazas': 'plazas',
    'sucursales': 'listas',
    'update_sucursal': 'listas',
    'empresas': 'listas',
    'update_empresa': 'listas',
    'unidadnegocio': 'listas',
    'unidad_negocio_update': 'listas',
    'departamentos': 'listas',
    'actualizar_departamento': 'listas',
    'ciudades': 'listas',
    'update_ciudades': 'listas',
    'puestos': 'listas',
    'actualizar_puesto': 'listas',
    'prioridades': 'listas',
    'prioridad_update': 'listas',
    'modos': 'listas',
    'update_modo': 'listas',
    'motivos': 'listas',
    'motivo_update': 'listas',
    'medios_reclutamiento': 'listas',
    'medio_reclutamiento_update': 'listas',
    'tipo_contrato': 'listas',
    'tipo_contrato_update': 'listas',

    'jefes': 'listas',
    'updatejefes': 'listas',
    'colaboradores': 'listas',
    'updatecolaboradores': 'listas',
    'horariosjefes': 'listas',
    'updatehorariosjefes': 'listas',

    #Usuarios
    'users': 'users',
    'reset_password': 'users',
    #bolsa empleo
    'bolsaempleo': 'bolsaempleo', 
    'descargar_pdf': 'bolsaempleo',
    'exportar_bolsa_empleos': 'bolsaempleo',
    # Contrataciones
    'registrar_contrataciones': 'contrataciones',
    'contrataciones': 'contrataciones',
    'imprimir_contratacion': 'contrataciones',
    'update_contratacion': 'contrataciones',
    'delete_contratacion': 'contrataciones',
    'registrar_contrataciones_multi' : 'contrataciones_multi',
    'contrataciones_multi' : 'contrataciones_multi',
    'imprimir_contratacion_multi' : 'contrataciones_multi',
    'update_contratacion_multi' : 'contrataciones_multi',
    'delete_contratacion_multi' : 'contrataciones_multi',
    'exportar_excel_multi' : 'contrataciones_multi',

    #perfil puesto
    'perfilpuesto' : 'perfilpuesto',
    'perfilpuestoregister' : 'perfilpuesto',
    'obtener_pruebas_por_nivel':'perfilpuesto', 
    'imprimir_perfilpuesto':'perfilpuesto',
    'update_perfilpuesto':'perfilpuesto',
    'updatecompleto_perfilpuesto':'perfilpuesto',

    'pefilrequisa' : 'requisa',
    'requisaregistrar': 'requisa',
    'requisa' :'requisa',
    'updaterequisa' : 'requisa',
    'aprobarrequisa': 'requisa',
    'cancelarrequisa' : 'requisa',
    'duplicarrequisa': 'requisa',

    #inventario
    'telefonos' : 'inventario',
    'inventariotelefonos': 'inventario',
    'resignartelefono' :'inventario',
    'eliminar_inventario_telefono' :'inventario',
    'update_inventario_telefonos' :'inventario',
    'obtener_id_telefono' :'inventario',
    'imprimirentrega' :'inventario',
    'deduccion_telefono' :'inventario',

    #Cesantias
    'cesantias' : 'cesantias',
    'imprimir_cesantias' : 'cesantias',
    'update_cesantias' : 'cesantias',

    'consultarroles' : 'roles'
}

# Rutas que deben estar excluidas de validaciones
EXEMPT_URLS = [
    'login',
    'update_password',
    'sinacceso',
    'logout', 
    'trabajaconnosotros',
    'requisa',
    'formularioingreso',
    'registrarasistencia',
    'rolesregistrados',
    'cargar_colaboradores',
    'cargar_semanas',
    'buscar_jefe_por_identidad',
    'registro_asistencia',
    'cargar_roles_registrados',
    'rolesregistrados',
    'buscar_jefe_por_identidad',
    'cargar_roles_registrados'
]

class LoginRequiredMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Obtener el nombre de la vista actual
        resolver_match = resolve(request.path)
        view_name = resolver_match.view_name if resolver_match else None

        # Excluir las rutas que no requieren autenticación
        if view_name in EXEMPT_URLS:
            return None

        # Si no está autenticado, redirigir al login
        if not request.session.get('user_authenticated'):
            return redirect('login')

class PermissionRequiredMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Obtener el nombre de la vista actual
        resolver_match = resolve(request.path)
        view_name = resolver_match.view_name if resolver_match else None

        # Excluir las rutas que no requieren validación de permisos
        if view_name in EXEMPT_URLS:
            return None

        # Verificar si el usuario está autenticado
        if request.session.get('user_authenticated'):
            if view_name is None:
                return redirect('sinacceso')

            # Verificar si la vista requiere un permiso específico
            permiso_requerido = PERMISOS_VISTAS.get(view_name)
            if not permiso_requerido:
                return None

            # Obtener el usuario autenticado
            dni_usuario = request.session.get('dni')
            user = Users.objects.filter(dni=dni_usuario).first()

            # Verificar si el usuario tiene el permiso requerido
            if user and not getattr(user, permiso_requerido, False):
                # Asegurarnos de que no redirige a sinacceso si ya está en sinacceso
                if view_name == 'sinacceso':
                    return None
                # Redirigir a sinacceso si no tiene el permiso
                return redirect('sinacceso')
        else:
            return redirect('login')

        return None
