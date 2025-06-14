from django.db import models
from django.contrib.auth.models import User
from movies.models import Movies, Show
from django.db import transaction
from movies.models import Show

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    movie = models.ForeignKey(Movies, on_delete=models.CASCADE, related_name='bookings')
    show_time = models.ForeignKey(Show, on_delete=models.CASCADE, related_name='bookings')
    booking_time = models.DateTimeField(auto_now_add=True)
    seat_number = models.JSONField(default=list)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    is_booked = models.BooleanField(default=False)
    hold_timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.movie.title} at {self.show_time} time {self.hold_timestamp}"

# class Seat(models.Model):
#     booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='seats')
#     seat_number = models.CharField(max_length=100)
#     price = models.DecimalField(max_digits=8, decimal_places=2)

#     def __str__(self):
#         return f"Seat {self.seat_number} for {self.booking}"
    
