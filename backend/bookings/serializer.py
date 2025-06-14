from rest_framework import serializers
from .models import Booking


class bookingSerializer(serializers.ModelSerializer):
    class Meta:
        model= Booking
        fields = '__all__'
    
    def create(self, validated_data):

        booking = Booking.objects.create(
            user = validated_data['user'],
            movie = validated_data['movie'],
            show_time = validated_data['show_time'],
            seat_number = validated_data['seat_number'],
            price = validated_data['price'],
        )

        return booking