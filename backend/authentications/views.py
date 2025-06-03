from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from authentications.serializer import SignUpSerializer
from drf_yasg.utils import swagger_auto_schema

class signUpView(APIView):
    
    @swagger_auto_schema(request_body=SignUpSerializer)
    def post(self, request):
        
        serilazer = SignUpSerializer(data = request.data)
        if serilazer.is_valid(raise_exception=True):
            serilazer.save()
            return Response(serilazer.data)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
    

