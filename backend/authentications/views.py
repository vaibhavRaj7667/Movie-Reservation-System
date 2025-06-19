from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status
from authentications.serializer import SignUpSerializer
from drf_yasg.utils import swagger_auto_schema
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken




class signUpView(APIView):
    
    @swagger_auto_schema(request_body=SignUpSerializer)
    def post(self, request):
        
        serilazer = SignUpSerializer(data = request.data)
        if serilazer.is_valid(raise_exception=True):
            serilazer.save()
            return Response(serilazer.data)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
    

class customTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        try:

            if response.status_code == status.HTTP_200_OK:
                refresh_token = response.data['refresh']
                access_token = response.data['access']

                response.set_cookie(
                    key='refresh',
                    value=refresh_token,
                    httponly=True,
                    secure=True,  
                    samesite='None', 
                    path='/',
                    max_age=24*60*60  
                    
                )

                response.set_cookie(
                    key='access',
                    value=access_token,
                    httponly=True,
                    secure=True,  
                    samesite='None',  
                    path='/',
                    max_age=60*60  
                )

                del response.data['refresh']  
                del response.data['access'] 
            return response
        
        except Exception as e:
            return Response({'success': False, 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    
class customTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh')
            request.data['refresh'] = refresh_token
            response = super().post(request, *args, **kwargs)

            token = response.data
            access_token = token['access']

            res = Response()
            res.data ={'refreshed':True}

            res.set_cookie(
                key='access',
                value=access_token,
                httponly=True,
                secure=True,  # Set to True if using HTTPS
                samesite='None',  # Adjust as needed
                path='/'
            )
            del response.data['access'] 
            return res
        except Exception as e:
            return Response({'success': False, 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

class LogoutView(APIView):
    # permission_classes=[AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get('refresh')
        print(refresh_token)
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception as e:
                print(e)
        
        response = Response({"message": "Logged out successfully"}, status=200)
        response.delete_cookie("access")
        response.delete_cookie("refresh")
        return response
            

        

# class customTokenRefreshView(TokenRefreshView):
#     def post(self, request, *args, **kwargs):
#         try:
#             refresh_token = request.COOKIES.get('refresh')
#             if not refresh_token:
#                 return Response({'success': False, 'error': 'Refresh token not provided in cookies'}, status=status.HTTP_400_BAD_REQUEST)
            
#             # Make a mutable copy of request data
#             data = request.data.copy()
#             data['refresh'] = refresh_token

#             # Replace request.data for super().post()
#             request._full_data = data

#             # Call parent view
#             response = super().post(request, *args, **kwargs)

#             token_data = response.data
#             access_token = token_data.get('access')
            
#             if not access_token:
#                 return Response({'success': False, 'error': 'Failed to obtain access token'}, status=status.HTTP_400_BAD_REQUEST)

#             # Create new response
#             res = Response({'refreshed': True}, status=status.HTTP_200_OK)

#             # Set new access token in cookie
#             res.set_cookie(
#                 key='access',
#                 value=access_token,
#                 httponly=True,
#                 secure=True,  # use True if you have HTTPS in production
#                 samesite='Lax',
#                 path='/'
#             )

#             return res
#         except Exception as e:
#             return Response({'success': False, 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)