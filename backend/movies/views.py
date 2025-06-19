from movies.serializer import MovieSerializer, GenereSerializer,ShowsSerializer
from rest_framework.views import APIView
from movies.models import Movies,Genre, Show
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from django.contrib.auth import logout
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie
from django.contrib.auth.decorators import user_passes_test
from rest_framework import permissions
from .permision import IsInGroupA
from django.utils.timezone import now
class moviesView(APIView):
    
    # @method_decorator(cache_page(60*1))  # Cache for 1 minutes
    # @method_decorator(vary_on_cookie)  # Vary cache based on cookies
    # permission_classes=[IsInGroupA]
    # queryset = Movies.objects.all()

    def get(self, request):
        # genres = request.data.get('genres', None) 
        genres = request.query_params.get('genres', None) 
        if not genres:
            movie = Movies.objects.all()
           
        else:
            movie = Movies.objects.filter(genres__name__icontains=genres)
           
        serializer = MovieSerializer(movie, many=True)
        return Response({'data': serializer.data})
    
    @swagger_auto_schema(request_body=MovieSerializer)
    def post(self, request):

        serializer = MovieSerializer(data = request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
    

class moviesUpadteView(APIView):
        
    @swagger_auto_schema(request_body=MovieSerializer)
    def put(self, request, pk):
        movie = get_object_or_404(Movies, pk=pk)
        serializer = MovieSerializer(movie, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, pk):
        movie = get_object_or_404(Movies, id=pk)
        serializer = MovieSerializer(movie)
        return Response({'data':serializer.data})
    
    def delete(self, request, pk):
        movie = get_object_or_404(Movies, pk=pk)
        movie.delete()
        return Response(status=status.HTTP_200_OK)
    

class genereView(APIView):
    
    def get(self, request):
        genere = Genre.objects.all()
        serializer = GenereSerializer(genere, many=True)
        return Response({'status':status.HTTP_200_OK,'data':serializer.data})
    
class showView(APIView):

    # permission_classes=[AllowAny]

    def get(self, request, title):
        myshows = Show.objects.filter(movie__title__iexact=title, show_time__gte = now()) #case insensitive filtering 
        if not myshows.exists():
             return Response({'message': 'No shows found for this movie.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = ShowsSerializer(myshows, many = True)
        return Response({'data':serializer.data})
    
@api_view(["GET"])
def logoutView(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)
        
