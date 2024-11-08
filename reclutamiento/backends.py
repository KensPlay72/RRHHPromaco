# reclutamiento/backends.py
from django.contrib.auth.backends import BaseBackend
from .models import Users
from django.contrib.auth.hashers import check_password

class DNIAuthBackend(BaseBackend):
    def authenticate(self, request, dni=None, password=None):
        try:
            user = Users.objects.get(dni=dni)
            if check_password(password, user.password) and user.is_active:
                return user
        except Users.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return Users.objects.get(pk=user_id)
        except Users.DoesNotExist:
            return None
