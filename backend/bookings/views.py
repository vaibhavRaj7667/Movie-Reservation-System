from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from movies.models import Show
from .serializer import bookingSerializer
from movies.models import Movies


class ticketBooking(APIView):
    
    permission_classes=[AllowAny]
    def post(self, request):

        Data = request.data

        user = Data.get('user')
        show_id = Data.get('show_time')
        movie = Data.get('movie')
        seat_number = Data.get('seat_number')
        price = Data.get("price")
        is_booked = Data.get("is_booked")
        

        serializer = bookingSerializer(data={
            'user': user,
            'movie': movie,
            'show_time': show_id,
            'seat_number': seat_number,
            'price': price,
            'is_booked': is_booked
            
        })

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        



