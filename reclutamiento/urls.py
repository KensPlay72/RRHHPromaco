# views/urls.py
from django.urls import path
from . import views
# from .views import contar_sesiones_activas

urlpatterns = [
    #----------LOGIN----------#
    path('', views.login_view, name='login'),
    path('login/', views.login_view, name='login'),
    path('Users/UpdatePassword/', views.change_password_view, name='update_password'),
    path('logout/', views.logout_view, name='logout'),
    # path('contar-sesiones-activas/', contar_sesiones_activas, name='contar_sesiones_activas'),
    #----------SIN ACCESO----------#
    path('sinacceso/', views.sin_acceso_view, name='sinacceso'),
    #----------DASHBOARD----------#
    path('Dashboard/', views.dashboard_view, name='dashboard'),
    #----------MODULO CONTROL PLAZAS----------# 
    path('ControlPlazas/', views.control_plazas_view, name='controlplazas'), 
    path('ControlPlazas/Update/<int:id>/', views.control_plazas_update, name='update_controlplazas'),
    path('ControlPlazas/Delete/<int:id>/', views.control_plazas_view, name='delete_controlplazas'),
    path('ControlPlazas/descargar_imagen/<int:imagen_id>/', views.descargar_imagen, name='descargar_imagen'),
    path('exportar_excel/', views.ExportExcelPlazas.as_view(), name='exportar_excel'),
    path('ControlPlazas/CancelarPlaza/<int:id>/', views.control_plazas_view, name='cancelar_estatus_controlplazas'),
    path('Listas/Sucursales/', views.sucursales_view, name='sucursales'), 
    path('Listas/Sucursales/Update/<int:id>/', views.sucursales_view, name='update_sucursal'), 
    path('Listas/Empresas/', views.empresas_view, name='empresas'), 
    path('Listas/Empresas/Update/<int:id>/', views.empresas_view, name='update_empresa'),
    path('Listas/Unidad_Negocio/', views.unidad_negocio_view, name='unidadnegocio'), 
    path('Listas/Unidad_Negocio/Update/<int:id>/', views.unidad_negocio_view, name='unidad_negocio_update'),
    path('Listas/Departamentos/', views.departamentos_view, name='departamentos'),
    path('Listas/Departamentos/Update/<int:id>/', views.departamentos_view, name='actualizar_departamento'),

    path('Listas/Jefes/', views.jefes_view, name='jefes'),
    path('Listas/Jefes/Update/<int:id>/', views.jefes_view, name='updatejefes'),
    path('Listas/Colaboradores/', views.colaboradores_view, name='colaboradores'),
    path('Listas/Colaboradores/Update/<int:id>', views.colaboradores_view, name='updatecolaboradores'),
    path('Listas/Horarios/', views.horariosjefes_view, name='horariosjefes'),
    path('Listas/Horarios/Update/<int:id>/', views.horariosjefes_view, name='updatehorariosjefes'),


    path('Listas/Ciudades/', views.ciudades_view, name='ciudades'),
    path('Listas/Ciudades/Update/<int:id>/', views.ciudades_view, name='update_ciudades'),
    path('Listas/Puestos/', views.puestos_view, name='puestos'), 
    path('Listas/Puestos/Update/<int:id>/', views.puestos_view, name='actualizar_puesto'),
    path('Listas/Prioridades/', views.prioridades_view, name='prioridades'), 
    path('Listas/Prioridades/Update/<int:id>/', views.prioridades_view, name='prioridad_update'), 
    path('Listas/Modos/', views.modos_view, name='modos'),
    path('Listas/Modos/Update/<int:id>/', views.modos_view, name='update_modo'),
    path('Listas/Motivos/', views.motivos_view, name='motivos'),
    path('Listas/Motivos/Update/<int:id>/', views.motivos_view, name='motivo_update'),
    path('Listas/MediosReclutamiento/', views.medios_reclutamiento_view, name='medios_reclutamiento'),
    path('Listas/MediosReclutamiento/Update/<int:id>/', views.medios_reclutamiento_view, name='medio_reclutamiento_update'),
    path('Listas/TipoContrato/', views.tipo_contrato_view, name='tipo_contrato'),
    path('Listas/TipoContrato/Update/<int:id>/', views.tipo_contrato_view, name='tipo_contrato_update'),
    path('ControlTiempo/', views.control_tiempo_view, name='controltiempo'), 
    path('ControlTiempo/Update/<int:id>/', views.control_tiempo_update, name='update_controltiempo'),
    path('Listas/Psicosmart/', views.pruebapsicosmart_view, name='psicosmart'),
    path('Listas/Psicosmart/Update/<int:id>/', views.pruebapsicosmart_view, name='psicosmart_update'),

    #----------USUARIOS----------#
    path('Users/', views.users_view, name='users'),
    path('Users/Update/<int:id>/', views.users_view, name='update_user'),
    path('Users/ResetPassword/<int:id>/', views.reset_password_view, name='reset_password'),
    #----------BOLSA DE EMPLEO----------#
    path('BolsaEmpleo/', views.bolsaempleo_view, name='bolsaempleo'),
    path('BolsaEmpleo/descargar/<int:archivo_id>/', views.descargar_pdf, name='descargar_pdf'),
    path('BolsaEmpleo/UpdatePOST/<int:id>/', views.bolsaempleo_update_post_view, name='update_bolsa_empleo_post'),
    path('exportar-bolsa-empleos/', views.exportar_bolsa_empleos, name='exportar_bolsa_empleos'),
    #----------CONTRATACIONES----------#
    path('Contrataciones/RegistrarContrataciones', views.contratacionesform_view, name='registrar_contrataciones'),
    path('Contrataciones/', views.contratacionestable_view, name='contrataciones'),
    path('Contrataciones/imprimir/<int:contratacion_id>/', views.imprimir_contratacion_view, name='imprimir_contratacion'),
    path('Contrataciones/UpdateContrataciones/<int:contratacion_id>/', views.updatecontrataciones_view, name='update_contratacion'),
    path('Contrataciones/DeleteContrataciones/<int:id>/', views.contratacionestable_view, name='delete_contratacion'),
    path('exportar_excel_contratacion/', views.ExportExcelContratacion.as_view(), name='exportar_excel_contratacion'),
    #----------ANUNCIOS----------#
    path('TrabajaconNosotros/', views.trabajaconnosotros_view, name='trabajaconnosotros'),
    #----------PERFIL DE PUESTOS----------#
    path('PerfilesPuestos/Requisa/RegistrarRequisaPerfil/<int:id>/', views.requisaperfil_view, name='pefilrequisa'),
    path('Requisa/RegistrarRequisa/', views.requisaregistrar_view, name='requisaregistrar'),
    path('Requisa/', views.requisa_view, name='requisa'),
    path('Requisa/Update/<int:id>/', views.requisaupdate_view, name='updaterequisa'),
    path('Requisa/Imprimir/<int:id>/', views.imprimirrequisa_view, name='imprimirrequisa'),
    path('Requisa/AprobarRequisa/<int:id>/', views.aprobar_requisa_view, name='aprobarrequisa'),
    path('Requisa/CancelarRequisa/<int:id>/', views.cancelar_requisa_view, name='cancelarrequisa'),
    path('Requisa/DuplicarRequisa/<int:id>/', views.duplicar_requisa_view, name='duplicarrequisa'),


    path('PerfilesPuestos/', views.perfilpuesto_view, name='perfilpuesto'),
    path('PerfilesPuestos/RegistrarPerfilPuestos/', views.perfilpuestoregister_view, name='perfilpuestoregister'),
    path('obtener_pruebas_por_nivel/', views.obtener_pruebas_por_nivel, name='obtener_pruebas_por_nivel'),
    path('PerfilesPuestos/Imprimir/<int:perfil_id>/', views.imprimir_perfilpuesto_view, name='imprimir_perfilpuesto'),
    path('PerfilesPuestos/ImprimirCorto/<int:perfil_id>/', views.imprimir_perfilpuestocorto_view, name='imprimir_perfilpuestocorto'),
    path('PerfilesPuestos/Update/<int:id>/', views.update_perfilpuesto_view, name='update_perfilpuesto'),
    path('PerfilesPuestos/UpdateCompleto/<int:id>/', views.updatecompleto_perfilpuesto_view, name='updatecompleto_perfilpuesto'),
    #----------CONTRATACIONES MULTISERVICIOS----------#
    path('Contrataciones_multi/RegistrarContrataciones_Multi', views.contratacionesform_multi_view, name='registrar_contrataciones_multi'),
    path('Contrataciones_multi/', views.contratacionesmulti_view, name='contrataciones_multi'),
    path('Contrataciones_multi/imprimir/<int:contratacion_id>/', views.imprimir_contratacion_multi_view, name='imprimir_contratacion_multi'),
    path('Contrataciones_multi/UpdateContrataciones_multi/<int:contratacion_id>/', views.updatecontrataciones_multi_view, name='update_contratacion_multi'),
    path('Contrataciones_multi/DeleteContrataciones_multi/<int:id>/', views.contratacionesmulti_view, name='delete_contratacion_multi'),
    path('exportar_excel_multi/', views.ExportExcelContratacionMulti.as_view(), name='exportar_excel_multi'),
    #----------Cesantias----------#
    path('Cesantias/', views.cesantias_view, name='cesantias'),
    path('Cesantias/imprimir/<int:id>/', views.imprimircesantias_view, name='imprimir_cesantias'),
    path('Cesantias/UpdateCesantias/<int:id>/', views.cesantias_view, name='update_cesantias'),
    path('exportar/cesantias/', views.exportar_cesantias, name='exportar_cesantias'),
    #----------Inventario----------#
    path('Inventario/Telefonos/', views.telefonos_view, name='telefonos'),
    path('Inventario/Telefonos/Reasignacion/<str:correlativo>/', views.telefonosreasignar_view, name='resignartelefono'),
    path('inventario/telefono/delete/<int:id>/', views.telefonosinventario_view, name='eliminar_inventario_telefono'),
    path('Inventario/Inventariotelefonos/', views.telefonosinventario_view, name='inventariotelefonos'),
    path('inventario/telefonos/update/<int:id>/', views.telefonosinventario_view, name='update_inventario_telefonos'),
    path('obtener-id-telefono/', views.obtener_id_telefono, name='obtener_id_telefono'),
    path('Inventario/Telefonos/ImprimirEntrega/<int:id>', views.imprimir_telefono_view, name='imprimirentrega'),
    path('Inventario/Telefonos/Deduccion/', views.deduccion_telefono, name='deduccion_telefono'),
    path('exportar/inventario/telefonos/', views.exportar_inventario_telefonos, name='exportar_inventario_telefonos'),
    #----------ASISTENCIA----------#
    path('Asistencia/Registrarasistencia/', views.registrar_asistencia_view, name='registrarasistencia'),
    path('cargar_colaboradores/<int:jefe_id>/', views.cargar_colaboradores, name='cargar_colaboradores'),
    path('cargar_semanas/<int:jefe_id>/<int:año>/<int:mes>/', views.cargar_semanas, name='cargar_semanas'),
    path('buscar_jefe_por_identidad/<str:identidad>/', views.buscar_jefe_por_identidad, name='buscar_jefe_por_identidad'),
    path('registro_asistencia/', views.registro_asistencia, name='registro_asistencia'),
    path('rolesregistrados/<int:jefe_id>/<int:año>/<int:mes>/', views.cargar_roles_registrados, name='cargar_roles_registrados'),
    path('exportar_asistencia/', views.exportar_asistencia, name='exportar_asistencia'),
    
    
    path('Asistencia/RolesRegistrados/', views.rolesregistrados_view, name='rolesregistrados'),
    path('Consultar-Roles/', views.consultarroles_view, name='consultarroles'),
    path('buscar_jefe_por_id/<int:jefe_id>/', views.buscar_jefe_por_id, name='buscar_jefe_por_id'),  # Ruta para buscar jefe por ID
    path('buscar_jefe_por_identidad1/<str:identidad>/', views.buscar_jefe_por_identidad_registrados, name='buscar_jefe_por_identidad'),
    path('cargar_roles_registrados/<int:jefe_id>/<int:mes>/<int:año>/', views.cargar_roles_registrados, name='cargar_roles_registrados'),
]

