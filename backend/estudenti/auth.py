from functools import wraps
from rest_framework.exceptions import PermissionDenied
from estudenti.models import UserPermissions

def check_is_user_admin(func):
    @wraps(func)
    def wrapper(self, request, *args, **kwargs):
        """
        Decorator that checks if request.user has admin permission.
        """
        user = request.user
        if not user or not user.is_authenticated:
            raise PermissionDenied("User not authenticated")

        user_permissions = UserPermissions.objects.filter(user=user).first()
        if not user_permissions or not user_permissions.admin:
            raise PermissionDenied("You do not have admin privileges")

        return func(self, request, *args, **kwargs)
    
    return wrapper
