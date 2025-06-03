from django.shortcuts import render
from movies.serializer import MovieSerializer
from rest_framework.views import APIView
from movies.models import Movies
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from django.shortcuts import get_object_or_404


class moviesView(APIView):
    def get(self, request):
        movie = Movies.objects.all()
        serializer = MovieSerializer(movie, many = True)
        return Response({'data':serializer.data})
    
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
        movie = get_object_or_404(Movies, pk=pk)
        serializer = MovieSerializer(movie)
        return Response({'data':serializer.data})
    
    def delete(self, request, pk):
        movie = get_object_or_404(Movies, pk=pk)
        movie.delete()
        return Response(status=status.HTTP_200_OK)
        