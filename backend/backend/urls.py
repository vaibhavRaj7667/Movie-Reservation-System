from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.contrib import admin
from django.urls import path, re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from authentications.views import signUpView
from rest_framework import permissions
from movies.views import moviesView, moviesUpadteView,genereView, logoutView,showView
from authentications.views import customTokenObtainPairView, customTokenRefreshView,LogoutView,LogoutView
from bookings.views import ticketBooking, bookedSeatsView,conformBooking


schema_view = get_schema_view(
   openapi.Info(
      title="Your API Title",
      default_version='v1',
      description="API documentation",
      terms_of_service="https://www.example.com/terms/",
      contact=openapi.Contact(email="contact@example.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', customTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', customTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/',LogoutView.as_view(),name="LogoutView"),
    path('test/',signUpView.as_view()),
    path('movies/',moviesView.as_view()),
    path('update/<int:pk>/', moviesUpadteView.as_view()),
    path('genres/',genereView.as_view() ),
    path('logout/',LogoutView.as_view()),
    path('shows/<str:title>/',showView.as_view()),
    path('booking/',ticketBooking.as_view()),
    path('bookseats/', bookedSeatsView,name="bookedSeatsView"),
    path('conformBooking/', conformBooking, name="conformBooking"),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

