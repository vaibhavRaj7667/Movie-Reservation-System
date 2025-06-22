from rest_framework import permissions


class IsInGroupA(permissions.DjangoModelPermissions):
    def has_permission(self, request,view):
        print(f"User: {request.user.username} has groups: {[group.name for group in request.user.groups.all()]}")
        
        if request.method == 'GET':
            return request.user.has_perm('movies.view_movies')
        
        elif request.method == 'POST':
            return request.user.has_perm('movies.add_movies')
        
        elif request.method == 'PATCH':
            return request.user.has_perm('movies.change_movies')
        
        elif request.method == 'DELETE':
            return request.user.has_perm('movies.delete_movies')
        
        