from rest_framework import permissions

class IsInGroupA(permissions.DjangoModelPermissions):
    def has_permission(self, request, view):
        # if not request.user.groups.filter(name='myusers').exists():
            # return
        
        # if request.method == 'GET':
        #     print(request.user.has_perm('movies.view_movies'))

        data = request.user.get_all_permissions()
        print(data)

        default_permission_granted = super().has_permission(request, view)
        print(f"DjangoModelPermissions granted: {default_permission_granted}")

        return True