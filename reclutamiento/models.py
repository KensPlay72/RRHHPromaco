from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

#-----------Sucurlas-----------#
class Sucursal(models.Model):
    nombre_sucursal = models.CharField(max_length=255)  
    fechacreacion = models.DateTimeField(auto_now_add=True)  
    fechaactualizacion = models.DateTimeField(auto_now=True)
    estado = models.CharField(
        max_length=8, 
        choices=[('ACTIVO', 'ACTIVO'), ('INACTIVO', 'INACTIVO')],
        default='ACTIVO'
    )

    def __str__(self):
        return self.nombre_sucursal

    class Meta:
        db_table = 'sucursal' 

#-----------Empresas-----------#
class Empresas(models.Model):
    nombre_empresa = models.CharField(max_length=255)  
    fechacreacion = models.DateTimeField(auto_now_add=True)  
    fechaactualizacion = models.DateTimeField(auto_now=True)
    estado = models.CharField(
        max_length=8, 
        choices=[('ACTIVO', 'ACTIVO'), ('INACTIVO', 'INACTIVO')],
        default='ACTIVO'
    )

    def __str__(self):
        return self.nombre_empresa

    class Meta:
        db_table = 'empresas' 

#-----------Spicosmart-----------#
class Spicosmart(models.Model):
    nivel = models.CharField(max_length=255)  
    nombre_prueba = models.CharField(max_length=255)  
    prueba_mide = models.CharField(max_length=255)  
    fechacreacion = models.DateTimeField(auto_now_add=True)  
    fechaactualizacion = models.DateTimeField(auto_now=True)
    estado = models.CharField(
        max_length=8, 
        choices=[('ACTIVO', 'ACTIVO'), ('INACTIVO', 'INACTIVO')],
        default='ACTIVO'
    )

    def __str__(self):
        return self.nombre_prueba

    class Meta:
        db_table = 'psicosmart' 

#-----------Departamentos-----------#
class DepartamentoHonduras(models.Model):
    nombre_departamentohonduras = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre_departamentohonduras
    
    class Meta:
        db_table = 'departamentoshonduras'

class MunicipioHonduras(models.Model):
    nombre_municipio = models.CharField(max_length=255)

    departamento = models.ForeignKey(
        'DepartamentoHonduras',  
        on_delete=models.CASCADE, 
        related_name='municipios' 
    )

    def __str__(self):
        return self.nombre_municipio     

    class Meta:
        db_table = 'municipioshonduras'  

#-----------Unidad de Negocio-----------#
class Unidad_Negocio(models.Model):
    nombre_unidad_de_negocio = models.CharField(max_length=255)  
    fechacreacion = models.DateTimeField(auto_now_add=True)  
    fechaactualizacion = models.DateTimeField(auto_now=True)
    estado = models.CharField(
        max_length=8, 
        choices=[('ACTIVO', 'ACTIVO'), ('INACTIVO', 'INACTIVO')],
        default='ACTIVO'
    )

    def __str__(self):
        return self.nombre_unidad_de_negocio

    class Meta:
        db_table = 'unidad_de_negocio' 

#-----------Departamento-----------#
class Departamento(models.Model):
    nombre_departamento = models.CharField(max_length=255)  
    fechacreacion = models.DateTimeField(auto_now_add=True)  
    fechaactualizacion = models.DateTimeField(auto_now=True)
    estado = models.CharField(
        max_length=8, 
        choices=[('ACTIVO', 'ACTIVO'), ('INACTIVO', 'INACTIVO')],
        default='ACTIVO'
    )

    def __str__(self):
        return self.nombre_departamento

    class Meta:
        db_table = 'departamento' 

#-----------Ciudades-----------#
class Ciudades(models.Model):
    nombre_ciudades = models.CharField(max_length=255)  
    fechacreacion = models.DateTimeField(auto_now_add=True)  
    fechaactualizacion = models.DateTimeField(auto_now=True)
    estado = models.CharField(
        max_length=8, 
        choices=[('ACTIVO', 'ACTIVO'), ('INACTIVO', 'INACTIVO')],
        default='ACTIVO'
    )

    def __str__(self):
        return self.nombre_ciudades

    class Meta:
        db_table = 'ciudades' 

#-----------Puestos-----------#
class Puestos(models.Model):
    nombre_puestos = models.CharField(max_length=255)  
    fechacreacion = models.DateTimeField(auto_now_add=True)  
    fechaactualizacion = models.DateTimeField(auto_now=True)
    estado = models.CharField(
        max_length=8, 
        choices=[('ACTIVO', 'ACTIVO'), ('INACTIVO', 'INACTIVO')],
        default='ACTIVO'
    )

    def __str__(self):
        return self.nombre_puestos

    class Meta:
        db_table = 'puestos' 

#-----------Prioridad-----------#
class Prioridad(models.Model):
    nombre_prioridad = models.CharField(max_length=255)  
    fechacreacion = models.DateTimeField(auto_now_add=True)  
    fechaactualizacion = models.DateTimeField(auto_now=True)
    estado = models.CharField(
        max_length=8, 
        choices=[('ACTIVO', 'ACTIVO'), ('INACTIVO', 'INACTIVO')],
        default='ACTIVO'
    )

    def __str__(self):
        return self.nombre_prioridad

    class Meta:
        db_table = 'prioridad' 

#-----------Modo-----------#
class Modo(models.Model):
    nombre_modo = models.CharField(max_length=255)  
    fechacreacion = models.DateTimeField(auto_now_add=True)  
    fechaactualizacion = models.DateTimeField(auto_now=True)
    estado = models.CharField(
        max_length=8, 
        choices=[('ACTIVO', 'ACTIVO'), ('INACTIVO', 'INACTIVO')],
        default='ACTIVO'
    )

    def __str__(self):
        return self.nombre_modo

    class Meta:
        db_table = 'modo' 

#-----------Motivo-----------#
class Motivo(models.Model):
    nombre_motivo = models.CharField(max_length=255)  
    fechacreacion = models.DateTimeField(auto_now_add=True)  
    fechaactualizacion = models.DateTimeField(auto_now=True)
    estado = models.CharField(
        max_length=8, 
        choices=[('ACTIVO', 'ACTIVO'), ('INACTIVO', 'INACTIVO')],
        default='ACTIVO'
    )

    def __str__(self):
        return self.nombre_motivo

    class Meta:
        db_table = 'motivo' 

#-----------MedioReclutamiento-----------#
class MedioReclutamiento(models.Model):
    nombre_medio_de_reclutamiento = models.CharField(max_length=255)  
    fechacreacion = models.DateTimeField(auto_now_add=True)  
    fechaactualizacion = models.DateTimeField(auto_now=True)
    estado = models.CharField(
        max_length=8, 
        choices=[('ACTIVO', 'ACTIVO'), ('INACTIVO', 'INACTIVO')],
        default='ACTIVO'
    )

    def __str__(self):
        return self.nombre_medio_de_reclutamiento

    class Meta:
        db_table = 'medio_de_reclutamiento' 

#-----------TipoContrato-----------#
class TipoContrato(models.Model):
    nombre_tipo_de_contrato = models.CharField(max_length=255)  
    fechacreacion = models.DateTimeField(auto_now_add=True)  
    fechaactualizacion = models.DateTimeField(auto_now=True)
    estado = models.CharField(
        max_length=8, 
        choices=[('ACTIVO', 'ACTIVO'), ('INACTIVO', 'INACTIVO')],
        default='ACTIVO'
    )

    def __str__(self):
        return self.nombre_tipo_de_contrato

    class Meta:
        db_table = 'tipo_de_contrato' 

#-----------ControlDeTiempo-----------#
class ControlDeTiempo(models.Model):
    unidad_de_negocio = models.ForeignKey(
        'Unidad_Negocio', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL,
        related_name='controles_tiempo'
    )
    departamento = models.ForeignKey(
        'Departamento', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL,
        related_name='controles_tiempo'
    )
    puestos = models.ForeignKey(
        'Puestos', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL,
        related_name='controles_tiempo'
    )
    unid_puesto = models.CharField(max_length=255)
    tiempo = models.IntegerField()
    fechacreacion = models.DateTimeField(auto_now_add=True)
    fechaactualizacion = models.DateTimeField(auto_now=True)
    estado = models.CharField(
        max_length=8, 
        choices=[('ACTIVO', 'ACTIVO'), ('INACTIVO', 'INACTIVO')],
        default='ACTIVO'
    )

    def __str__(self):
        return f'{self.unid_puesto} - {self.tiempo}'

    class Meta:
        db_table = 'control_de_tiempo'

#-----------Control Plazas-----------#
class ControlDePlazas(models.Model):
    empresa = models.ForeignKey(
        'Empresas',  # Modelo que representa la empresa
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL,
        related_name='control_de_plazas'
    )
    sucursal = models.ForeignKey(
        'Sucursal', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='control_de_plazas'
    )
    unidad_de_negocio = models.ForeignKey(
        'Unidad_Negocio', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='control_de_plazas'
    )
    año = models.IntegerField(null=True, blank=True)
    mes_corte = models.CharField(max_length=50, null=True, blank=True)
    mes_solicitud = models.CharField(max_length=50, null=True, blank=True)
    modo = models.ForeignKey(
        'Modo', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='control_de_plazas'
    )
    motivo_ingreso = models.ForeignKey(
        'Motivo', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='control_de_plazas'
    )
    nombre_reemplazo = models.CharField(max_length=200, null=True, blank=True)
    puestos = models.ForeignKey(
        'Puestos', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='control_de_plazas'
    )
    departamento = models.ForeignKey(
        'Departamento', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='control_de_plazas'
    )
    prioridad = models.ForeignKey(
        'Prioridad', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='control_de_plazas'
    )
    analista = models.CharField(max_length=100, null=True, blank=True)
    unidad_puesto = models.CharField(max_length=100, null=True, blank=True)
    tiempo_cobertura = models.IntegerField(null=True, blank=True)
    fecha_solicitud = models.DateField(null=True, blank=True)
    fecha_inicio_busqueda = models.DateField(null=True, blank=True)
    fecha_cobertura = models.DateField(null=True, blank=True)
    fecha_ingreso = models.DateField(null=True, blank=True)
    tiempo_efectivo_cobertura = models.IntegerField(null=True, blank=True)
    tiempo_efectivo_fecha_ingreso = models.IntegerField(null=True, blank=True)
    fecha_limite_cobertura = models.DateField(null=True, blank=True)
    tiempo_disponible = models.IntegerField(null=True, blank=True)
    estatus = models.CharField(max_length=20, null=True, blank=True)
    cantidad_solicitada = models.IntegerField(null=True, blank=True)
    cantidad_cubierta = models.IntegerField(null=True, blank=True)
    fuente_reclutamiento = models.CharField(max_length=20, null=True, blank=True)
    nombre_contratado = models.CharField(max_length=100, null=True, blank=True)
    dni = models.CharField(max_length=13, null=True, blank=True)
    genero = models.CharField(max_length=1, null=True, blank=True)
    edad = models.IntegerField(null=True, blank=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    medio_reclutamiento = models.ForeignKey(
        'MedioReclutamiento', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='control_de_plazas'
    )
    salario = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    combustible = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    depreciacion = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    comision = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    bono = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    hospedaje = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    tipo_contrato = models.ForeignKey(
        'TipoContrato', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='control_de_plazas'
    )
    ruta = models.CharField(max_length=255, null=True, blank=True)
    nombreimagen = models.CharField(max_length=255, null=True, blank=True)
    ruta1 = models.CharField(max_length=255, null=True, blank=True)
    nombreimagen1 = models.CharField(max_length=255, null=True, blank=True)
    fechacreacion = models.DateTimeField(auto_now_add=True)
    fechaactualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Control de Plazas {self.id}"

    class Meta:
        db_table = 'control_de_plazas'

#-----------Users-----------#
class Users(models.Model):
    username = models.CharField(max_length=255)  
    dni = models.CharField(max_length=255, unique=True)  
    password = models.CharField(max_length=255)
    estado = models.CharField(
        max_length=8, 
        choices=[('ACTIVO', 'ACTIVO'), ('INACTIVO', 'INACTIVO')],
        default='ACTIVO'
    )
    plazas = models.BooleanField(default=False) 
    plazas_ver = models.BooleanField(default=False) 
    plazas_escribir = models.BooleanField(default=False) 

    users = models.BooleanField(default=False)
    roles = models.BooleanField(default=False)
    
    bolsaempleo = models.BooleanField(default=False)
    bolsaempleo_ver = models.BooleanField(default=False) 
    bolsaempleo_escribir = models.BooleanField(default=False)

    contrataciones = models.BooleanField(default=False)
    contrataciones_ver = models.BooleanField(default=False)
    contrataciones_escribir = models.BooleanField(default=False)

    listas= models.BooleanField(default=False)
    listas_ver= models.BooleanField(default=False)
    listas_escribir= models.BooleanField(default=False)

    cesantias = models.BooleanField(default=False)
    cesantias_ver = models.BooleanField(default=False) 
    cesantias_escribir = models.BooleanField(default=False)

    perfilpuesto = models.BooleanField(default=False)
    perfilpuesto_ver = models.BooleanField(default=False) 
    perfilpuesto_escribir = models.BooleanField(default=False)

    contrataciones_multi = models.BooleanField(default=False)
    contrataciones_multi_ver = models.BooleanField(default=False)
    contrataciones_multi_escribir = models.BooleanField(default=False)

    requisa = models.BooleanField(default=False)
    requisa_ver = models.BooleanField(default=False)
    requisa_escribir = models.BooleanField(default=False)

    inventario = models.BooleanField(default=False)
    inventario_ver = models.BooleanField(default=False)
    inventario_escribir = models.BooleanField(default=False)

    fechacreacion = models.DateTimeField(auto_now_add=True) 
    fechaactualizacion = models.DateTimeField(auto_now=True)     
    last_login = models.DateTimeField(default=timezone.now) 

    USERNAME_FIELD = 'dni'
    REQUIRED_FIELDS = ['username']  # Añade aquí cualquier otro campo que desees que sea requerido.

    def __str__(self):
        return self.username

    @property
    def is_authenticated(self):
        """
        Siempre devuelve True. Esto es para emular el comportamiento de los objetos de usuario de Django.
        """
        return True

    @property
    def is_anonymous(self):
        """
        Siempre devuelve False. Esto es para emular el comportamiento de los objetos de usuario de Django.
        """
        return False

    @property
    def is_active(self):
        """
        Devuelve True si el usuario está activo, es decir, si su estado es 'ACTIVO'.
        """
        return self.estado == 'ACTIVO'

    @property
    def is_staff(self):
        """
        Devuelve False. Cambia esta propiedad si deseas implementar usuarios con permisos de administrador.
        """
        return False

    @property
    def is_superuser(self):
        """
        Devuelve False. Cambia esta propiedad si deseas implementar usuarios superadministradores.
        """
        return False

    def has_perm(self, perm, obj=None):
        """
        Devuelve True si el usuario tiene un permiso específico. 
        """
        return True

    def has_module_perms(self, app_label):
        """
        Devuelve True si el usuario tiene permisos para ver la app 'app_label'.
        """
        return True

    class Meta:
        db_table = 'users'

#-----------Contrataciones-----------#
class ContratacionEmpleados(models.Model):
    tipo_contratacion = models.CharField(max_length=50, null=True, blank=True)
    nombre1 = models.CharField(max_length=50, null=True, blank=True)
    nombre2 = models.CharField(max_length=50, null=True, blank=True)
    apellido1 = models.CharField(max_length=50, null=True, blank=True)
    apellido2 = models.CharField(max_length=50, null=True, blank=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    municipio = models.ForeignKey(
        'MunicipioHonduras',  
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL  
    )
    genero = models.CharField(max_length=25, null=True, blank=True)
    direccionexacta = models.TextField(null=True, blank=True)
    dni = models.CharField(max_length=13, null=True, blank=True)
    estado_civil = models.CharField(max_length=50, null=True, blank=True)
    hijos = models.BooleanField(default=False)
    profecion_oficio = models.CharField(max_length=50, null=True, blank=True)  
    correo = models.EmailField(null=True, blank=True) 
    departamento = models.ForeignKey(
        'DepartamentoHonduras',  # Nombre del modelo al que se relaciona
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL  # Si el departamento se elimina, el valor de departamento en la tabla queda en null
    )
    telefono = models.CharField(max_length=20, null=True, blank=True)

    # Contacto de emergencia
    nombre1_emergencia = models.CharField(max_length=50, null=True, blank=True)
    parentesco1 = models.CharField(max_length=50, null=True, blank=True)
    telefonoemergencia1 = models.CharField(max_length=20, null=True, blank=True)  
    nombre2_emergencia = models.CharField(max_length=50, null=True, blank=True)
    parentesco2 = models.CharField(max_length=50, null=True, blank=True)
    telefonoemergencia2 = models.CharField(max_length=20, null=True, blank=True)

    # Educación y Salud
    nivel_educativo = models.CharField(max_length=50, null=True, blank=True)
    ultimo_grado_estudio = models.CharField(max_length=100, null=True, blank=True)
    ultimogradodetalle = models.CharField(max_length=100, null=True, blank=True)  # Campo añadido
    padecimiento = models.BooleanField(default=False)  # Campo añadido
    detalle_enfermedad = models.CharField(max_length=100, null=True, blank=True)

    # Relaciones con otros modelos
    puestos = models.ForeignKey(
        'Puestos', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL
    )
    unidad_de_negocio = models.ForeignKey(
        'Unidad_Negocio', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL
    )
    sucursal = models.ForeignKey(
        'Sucursal', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL
    )
    departamento_empresa = models.ForeignKey(
        'Departamento', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL
    )
    tipo_contrato = models.ForeignKey(
        'TipoContrato', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL
    )

    # Información laboral
    salario = models.CharField(max_length=50, null=True, blank=True)
    comision = models.CharField(max_length=50, null=True, blank=True)
    bofa = models.CharField(max_length=50, null=True, blank=True)
    fecha_ingreso = models.DateField(null=True, blank=True)
    fecha_vencimiento = models.DateField(null=True, blank=True)
    direccionempresa = models.TextField(null=True, blank=True)
    nombre_empresa = models.ForeignKey(
        'Empresas', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL
    )
    telefono_empresa = models.CharField(max_length=20, null=True, blank=True)  

    # Beneficiario
    nombre_beneficiario = models.CharField(max_length=100, null=True, blank=True)
    dni_beneficiario = models.CharField(max_length=13, null=True, blank=True) 
    parentesco_beneficiario = models.CharField(max_length=50, null=True, blank=True) 
    porcentaje = models.IntegerField(null=True, blank=True)

    # Otros
    ruta = models.CharField(max_length=255, null=True, blank=True)
    nombreimagen = models.CharField(max_length=255, null=True, blank=True)
    fechacreacion = models.DateTimeField(auto_now_add=True)
    fechaactualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nombre1} {self.apellido1} - {self.tipo_contratacion}"

    class Meta:
        db_table = 'contratacion_empleados'

#-----------Contrataciones Multi-----------#
class ContratacionEmpleadosmulti(models.Model):
    tipo_contratacion = models.CharField(max_length=50, null=True, blank=True)
    nombre1 = models.CharField(max_length=50, null=True, blank=True)
    nombre2 = models.CharField(max_length=50, null=True, blank=True)
    apellido1 = models.CharField(max_length=50, null=True, blank=True)
    apellido2 = models.CharField(max_length=50, null=True, blank=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    dni = models.CharField(max_length=13, null=True, blank=True)
    genero = models.CharField(max_length=25, null=True, blank=True)
    direccionexacta = models.TextField(null=True, blank=True)
    municipio = models.ForeignKey(
        'MunicipioHonduras',  
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL  
    )
    departamento = models.ForeignKey(
        'DepartamentoHonduras',  # Nombre del modelo al que se relaciona
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL  # Si el departamento se elimina, el valor de departamento en la tabla queda en null
    )
    telefono = models.CharField(max_length=20, null=True, blank=True)
    estado_civil = models.CharField(max_length=50, null=True, blank=True)
    profecion_oficio = models.CharField(max_length=50, null=True, blank=True)  
    ultimo_grado_estudio = models.CharField(max_length=100, null=True, blank=True)

    # Datos Laborales
    puestos = models.CharField(max_length=100, null=True, blank=True)
    sucursal = models.ForeignKey(
        'Sucursal', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL
    )
    fecha_ingreso = models.DateField(null=True, blank=True)
    salario = models.CharField(max_length=50, null=True, blank=True)


    # Contacto de emergencia
    nombre_emergencia = models.CharField(max_length=50, null=True, blank=True)
    parentesco = models.CharField(max_length=50, null=True, blank=True)
    telefonoemergencia = models.CharField(max_length=20, null=True, blank=True)  
    enfermedad = models.CharField(max_length=20, null=True, blank=True)  

    # Beneficiario
    nombre_beneficiario = models.CharField(max_length=100, null=True, blank=True)
    dni_beneficiario = models.CharField(max_length=13, null=True, blank=True) 
    parentesco_beneficiario = models.CharField(max_length=50, null=True, blank=True) 
    porcentaje = models.IntegerField(null=True, blank=True)

    # Otros
    ruta = models.CharField(max_length=255, null=True, blank=True)
    nombreimagen = models.CharField(max_length=255, null=True, blank=True)
    fechacreacion = models.DateTimeField(auto_now_add=True)
    fechaactualizacion = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nombre1} {self.apellido1} - {self.tipo_contratacion}"

    class Meta:
        db_table = 'contratacion_empleados_multi'

#-----------BolsaEmpleo-----------#
class BolsaEmpleos(models.Model):
    dni = models.CharField(max_length=13, null=True, blank=True)
    nombre_candidato = models.CharField(max_length=255, null=True, blank=True)
    puestosaspira = models.JSONField(null=True, blank=True)
    puestosaplica = models.JSONField(null=True, blank=True) 
    telefono = models.CharField(max_length=20, null=True, blank=True)  
    telefono2 = models.CharField(max_length=20, null=True, blank=True)
    estado = models.CharField(max_length=255, null=True, blank=True)
    ciudad = models.ForeignKey(
        'Ciudades', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL
    )
    medio_reclutamiento = models.ForeignKey(
        'MedioReclutamiento', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL
    )
    edad = models.IntegerField(null=True, blank=True)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    estadocivil = models.CharField(max_length=255, null=True, blank=True)
    nhijos = models.IntegerField(null=True, blank=True)
    direccion = models.CharField(max_length=255, null=True, blank=True)
    mediomovilizacion = models.CharField(max_length=255, null=True, blank=True)
    experiencia = models.CharField(max_length=255, null=True, blank=True)
    observacion = models.CharField(max_length=255, null=True, blank=True)
    ruta = models.CharField(max_length=255, null=True, blank=True)
    nombredocumento = models.CharField(max_length=255, null=True, blank=True)
    fechacreacion = models.DateTimeField(auto_now_add=True) 
    fechaactualizacion = models.DateTimeField(auto_now=True)  

    def __str__(self):
        return self.nombre_candidato if self.nombre_candidato else "Candidato sin nombre"

    class Meta:
        db_table = 'bolsa_empleos'  

#-----------Cesantias-----------#

class Cesantias(models.Model):
    correlativo = models.CharField(max_length=255, null=True, blank=True)  # Campo de correlativo
    nombre_autoriza = models.CharField(max_length=255, null=True, blank=True)
    dni_autoriza = models.CharField(max_length=255, null=True, blank=True)
    cargo_autoriza = models.CharField(max_length=255, null=True, blank=True)  # Ajuste en longitud
    empresa = models.ForeignKey(
        'Empresas',  
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL,
        related_name='cesantias'
    )
    sucursal = models.ForeignKey(
        'Sucursal', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='cesantias'
    )
    departamento = models.ForeignKey(
        'Departamento', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='cesantias'
    )
    nombre_empleado = models.CharField(max_length=255, null=True, blank=True)
    dni_empleado = models.CharField(max_length=255, null=True, blank=True)
    fecha_inicial = models.DateField(null=True, blank=True)
    fecha_final = models.DateField(null=True, blank=True)
    año = models.PositiveIntegerField(null=True, blank=True)
    sueldo_actual = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True) 
    cesantia_actual = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True) 
    cesantia_final = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True) 
    fecha_extencion = models.DateField(null=True, blank=True)
    porcentaje = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True) 
    estado_empleado = models.CharField(max_length=255, null=True, blank=True)
    estado_pago = models.CharField(max_length=255, null=True, blank=True)
    n_cheke = models.CharField(max_length=255, null=True, blank=True)
    fechacreacion = models.DateTimeField(auto_now_add=True) 
    fechaactualizacion = models.DateTimeField(auto_now=True)  

    class Meta:
        db_table = 'cesantias'

#-----------PerfilPuesto-----------#
class PerfilesPuestos(models.Model):
    tipo_perfil = models.CharField(max_length=255, null=True, blank=True)
    empresa = models.CharField(max_length=255, null=True, blank=True)
    nombre_cargo = models.CharField(max_length=255, null=True, blank=True)
    departamento = models.CharField(max_length=255, null=True, blank=True)
    cargo_al_que_reporta = models.CharField(max_length=255, null=True, blank=True)
    cargo_que_le_reportan = models.CharField(max_length=255, null=True, blank=True)
    educacion_universitario = models.CharField(max_length=255, null=True, blank=True)
    postgrado_especializaciones = models.CharField(max_length=255, null=True, blank=True)
    formacion_complementaria = models.CharField(max_length=255, null=True, blank=True)
    idiomas = models.CharField(max_length=255, null=True, blank=True)
    nivel_idioma = models.CharField(max_length=255, null=True, blank=True)

    anos_experiencia = models.CharField(max_length=255, null=True, blank=True)
    pensamiento_estrategico = models.CharField(max_length=255, null=True, blank=True)
    enfoque_al_cliente = models.CharField(max_length=255, null=True, blank=True)
    planificacion_y_organizacion = models.CharField(max_length=255, null=True, blank=True)
    comunicacion = models.CharField(max_length=255, null=True, blank=True)
    orientacion_al_logro = models.CharField(max_length=255, null=True, blank=True)

    mision_cargo = models.TextField(null=True, blank=True)
    ruta_organigrama = models.CharField(max_length=255, null=True, blank=True)
    nombre_organigrama = models.CharField(max_length=255, null=True, blank=True)

    funciones_cargo = models.JSONField(null=True, blank=True)

    retos = models.JSONField(null=True, blank=True) 
    materiales_equipos = models.JSONField(null=True, blank=True)  

    residir_en_area = models.CharField(max_length=255, null=True, blank=True)
    horario_turnos = models.CharField(max_length=255, null=True, blank=True)
    otros = models.TextField(null=True, blank=True)  
    plan_de_compensacion = models.JSONField(null=True, blank=True) 
    beneficiospromaco = models.JSONField(null=True, blank=True) 

    nivel_prueba = models.CharField(max_length=255, null=True, blank=True)
    psicometricas = models.JSONField(null=True, blank=True) 

    montacargas = models.CharField(max_length=255, null=True, blank=True)
    esquipo_pegado = models.CharField(max_length=255, null=True, blank=True)

    principales_indicadores = models.JSONField(null=True, blank=True)  

    fechacreacion = models.DateTimeField(auto_now_add=True) 
    fechaactualizacion = models.DateTimeField(auto_now=True)  

    class Meta:
        db_table = 'perfiles_puestos'

    def __str__(self):
        return self.nombre_cargo or "Sin nombre de cargo"

#-----------Requisa-----------#
class Requisa(models.Model):
    fechacreacion = models.DateTimeField(auto_now_add=True) 
    fechaRecepcion = models.DateTimeField(null=True, blank=True) 
    salario_base = models.CharField(max_length=255, null=True, blank=True)

    plan_de_compensacion = models.JSONField(null=True, blank=True) 
    montos = models.JSONField(null=True, blank=True) 


    puesto = models.CharField(max_length=255, null=True, blank=True)
    sucursal = models.ForeignKey(
        'Sucursal', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='requisa'
    )

    departamento = models.ForeignKey(
        'Departamento', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='requisa'
    )

    hora_inicio = models.TimeField(null=True, blank=True)
    hora_fin = models.TimeField(null=True, blank=True)
    centrocostos = models.CharField(max_length=255, null=True, blank=True)

    puestonuevo = models.BooleanField(default=False) 
    incapacidad = models.BooleanField(default=False) 
    reemplazo = models.BooleanField(default=False) 


    tiempoprimercontrato = models.CharField(max_length=255, null=True, blank=True)
    tipo_contrato = models.ForeignKey(
        'TipoContrato', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='requisa'
    )

    motivo = models.CharField(max_length=255, null=True, blank=True)
    nombrereemplazar = models.CharField(max_length=255, null=True, blank=True)
    funciones_cargo = models.TextField(null=True, blank=True)

    formacionacademica = models.CharField(max_length=255, null=True, blank=True)
    habilidadesferreteras =models.JSONField(null=True, blank=True) 
    habilidadesinformaticas =models.JSONField(null=True, blank=True) 
    habilidadespersonales =models.JSONField(null=True, blank=True) 
    habilidadesanaliticas =models.JSONField(null=True, blank=True) 

    materialesequipo = models.JSONField(null=True, blank=True) 
    fechaactualizacion = models.DateTimeField(auto_now=True)  
    estado = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'requisa'

class Inventariotelefonos(models.Model):
    nombretelefono = models.CharField(max_length=255, null=True, blank=True)
    correlativo = models.CharField(max_length=255, null=True, blank=True)
    estado = models.CharField(max_length=255, null=True, blank=True)
    estadotelefono = models.CharField(max_length=255, null=True, blank=True)
    valortotal = models.FloatField(null=True, blank=True)
    fechacreacion = models.DateTimeField(auto_now_add=True) 
    fechaactualizacion = models.DateTimeField(auto_now=True)  
    class Meta:
        db_table = 'inventariotelefono'

class Telefonia(models.Model):
    fecha = models.DateField(null=True, blank=True)
    correlativo = models.CharField(max_length=255, null=True, blank=True)
    nombre = models.CharField(max_length=255, null=True, blank=True)
    dni = models.CharField(max_length=13, null=True, blank=True)
    unidad_de_negocio = models.ForeignKey(
        'Unidad_Negocio', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='telefonia'
    )
    departamento = models.ForeignKey(
        'Departamento', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='telefonia'
    )
    fechaextravio = models.DateField(null=True, blank=True)
    nombretelefono = models.CharField(max_length=255, null=True, blank=True)
    MEI = models.CharField(max_length=255, null=True, blank=True)
    lineatelefonica = models.CharField(max_length=15, null=True, blank=True)
    caracter = models.CharField(max_length=20, null=True, blank=True)
    valor = models.FloatField(null=True, blank=True)
    tiempopago = models.IntegerField(null=True, blank=True)
    quinsena = models.FloatField(null=True, blank=True)
    estadotelefono = models.CharField(max_length=255, null=True, blank=True)
    asignacionnueva = models.CharField(max_length=255, null=True, blank=True)
    valortotal = models.FloatField(null=True, blank=True)
    observacion = models.TextField(null=True, blank=True)
    valorquincena = models.FloatField(null=True, blank=True)
    estado = models.CharField(max_length=255, null=True, blank=True)
    fechacreacion = models.DateTimeField(auto_now_add=True) 
    fechaactualizacion = models.DateTimeField(auto_now=True)      
    class Meta:
        db_table = 'telefonia'

class Jefes(models.Model):
    codigo = models.CharField(max_length=20, null=True, blank=True)
    identidadjefe = models.CharField(max_length=13, null=True, blank=True)
    nombrejefe = models.CharField(max_length=255, null=True, blank=True)
    estado = models.CharField(
        max_length=8, 
        choices=[('ACTIVO', 'ACTIVO'), ('INACTIVO', 'INACTIVO')],
        default='ACTIVO'
    )
    fechacreacion = models.DateTimeField(auto_now_add=True) 
    fechaactualizacion = models.DateTimeField(auto_now=True)  
    def __str__(self):
        return self.nombrejefe

    class Meta:
        db_table = 'jefes' 

class Colaboradores(models.Model):
    codigocolaborador = models.CharField(max_length=20, null=True, blank=True)
    empresa = models.ForeignKey(
        'Empresas',
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL,
        related_name='colaboradores'
    )
    sucursal = models.ForeignKey(
        'Sucursal', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='colaboradores'
    )
    unidad_de_negocio = models.ForeignKey(
        'Unidad_Negocio', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='colaboradores'
    )
    departamento = models.ForeignKey(
        'Departamento', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL, 
        related_name='colaboradores'
    )
    jefe = models.ForeignKey(
        'Jefes', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL,
        related_name='colaboradores'
    )
    nombrecolaborador = models.CharField(max_length=255, null=True, blank=True)
    estado = models.CharField(
        max_length=8, 
        choices=[('ACTIVO', 'ACTIVO'), ('INACTIVO', 'INACTIVO')],
        default='ACTIVO'
    )
    fechacreacion = models.DateTimeField(auto_now_add=True) 
    fechaactualizacion = models.DateTimeField(auto_now=True)  
    def __str__(self):
        return f"{self.empresa} - {self.nombrecolaborador}"
        
    class Meta:
        db_table = 'colaboradores' 

class HorarioJefes(models.Model):
    jefe = models.ForeignKey(
        'Jefes', 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL,
        related_name='horariojefes'
    )
    hora_inicio = models.TimeField(null=True, blank=True)
    hora_fin = models.TimeField(null=True, blank=True)
    estado = models.CharField(
        max_length=8, 
        choices=[('ACTIVO', 'ACTIVO'), ('INACTIVO', 'INACTIVO')],
        default='ACTIVO'
    )
    fechacreacion = models.DateTimeField(auto_now_add=True) 
    fechaactualizacion = models.DateTimeField(auto_now=True)      
        
    class Meta:
        db_table = 'horariojefes' 

class Asistencia(models.Model):
    colaborador = models.ForeignKey(
        'Colaboradores', 
        on_delete=models.CASCADE, 
        related_name='asistencias'
    )
    jefe = models.ForeignKey(
        'Jefes', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='asistencias'
    )
    mes = models.IntegerField()  # Mes (1-12)
    año = models.IntegerField()  # Año

    fecha_asignacion = models.DateTimeField(auto_now_add=True)  # Fecha en la que se registró la asistencia

    def __str__(self):
        return f"Asistencia de {self.colaborador.nombrecolaborador} - {self.mes}/{self.año}"

    class Meta:
        unique_together = ('colaborador', 'mes', 'año')  # Un solo registro de asistencia por colaborador por mes y año
        db_table = 'asistencias'

class RegistroAsistencia(models.Model):
    asistencia = models.ForeignKey(
        'Asistencia', 
        on_delete=models.CASCADE, 
        related_name='registros'
    )
    semana_inicio = models.DateField() 
    semana_fin = models.DateField()
    
    # Aumenta el tamaño del campo para evitar truncamiento
    horario_semana = models.CharField(max_length=50, null=True, blank=True) 
    horario_sabado = models.CharField(max_length=50, null=True, blank=True) 
    
    almuerzo_inicio = models.TimeField(null=True, blank=True)
    almuerzo_fin = models.TimeField(null=True, blank=True)
    
    dia_libre_domingo = models.BooleanField(default=False)
    fecha_domingo_libre = models.CharField(max_length=20, null=True, blank=True)

    class Meta:
        db_table = 'registro_asistencias'
