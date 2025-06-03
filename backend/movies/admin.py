from django.contrib import admin

from movies.models import Movies, Genre, Show

admin.site.register(Movies)
admin.site.register(Genre)
admin.site.register(Show)