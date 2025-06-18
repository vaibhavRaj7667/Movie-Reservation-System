from rest_framework import serializers
from .models import Booking
from django.contrib.auth.models import User
from movies.models import Movies,Show
from movies.serializer import ShowsSerializer

class bookingSerializer(serializers.ModelSerializer):

    user = serializers.SlugRelatedField(queryset = User.objects.all(), slug_field='username')  # Accept username instead of pk
    movie = serializers.SlugRelatedField(queryset = Movies.objects.all(), slug_field='title')
    booking_time = serializers.DateTimeField(read_only = True)
    hold_timestamp = serializers.DateTimeField(read_only = True)
    id = serializers.IntegerField(read_only = True)

    show_time = ShowsSerializer(read_only=True) #for get request
    show_time_id = serializers.PrimaryKeyRelatedField(
        queryset=Show.objects.all(), write_only=True #for POST request
    )  
    """ 
    in Response it show string insted of the id 

    def __str__(self):
        return f"{self.movie.title} - {self.show_time.strftime('%Y-%m-%d %H:%M')}"
    """

    class Meta:
        model= Booking
        fields = '__all__'

    def create(self, validated_data):
        # Extract show_time_id and assign it to show_time
        show = validated_data.pop('show_time_id')
        booking = Booking.objects.create(show_time=show, **validated_data)
        return booking

    # def update(self, instance, validated_data):
    #     if 'show_time_id' in validated_data:
    #         instance.show_time = validated_data.pop('show_time_id')
    #     return super().update(instance, validated_data)