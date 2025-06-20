from rest_framework import permissions

class IsInGroupA(permissions.DjangoModelPermissions):
    def has_permission(self, request, view):
        if not request.user.groups.filter(name='admins').exists():
            return False
        
        print(f"User: {request.user.username} has groups: {[group.name for group in request.user.groups.all()]}")
        print(f"User permissions: {request.user.has_perm(['view_movies', 'add_movies', 'change_movies', 'delete_movies'])}")


        default_permission_granted = super().has_permission(request, view)
        print(f"DjangoModelPermissions granted: {default_permission_granted}")

        return True