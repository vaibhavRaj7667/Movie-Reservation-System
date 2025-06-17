from rest_framework import serializers
from .models import Booking
from django.contrib.auth.models import User
from movies.models import Movies

class bookingSerializer(serializers.ModelSerializer):

    user = serializers.SlugRelatedField(queryset = User.objects.all(), slug_field='username')  # Accept username instead of pk
    movie = serializers.SlugRelatedField(queryset = Movies.objects.all(), slug_field='title')
    booking_time = serializers.DateTimeField(read_only = True)
    hold_timestamp = serializers.DateTimeField(read_only = True)
    id = serializers.IntegerField(read_only = True)
    # show_time = serializers.StringRelatedField() 
    """ 
    in Response it show string insted of the id 

    def __str__(self):
        return f"{self.movie.title} - {self.show_time.strftime('%Y-%m-%d %H:%M')}"
    """

    class Meta:
        model= Booking
        fields = '__all__'
    