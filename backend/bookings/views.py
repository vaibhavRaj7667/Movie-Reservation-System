from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from movies.models import Show
from .serializer import bookingSerializer
from movies.models import Movies
from .models import Booking
from rest_framework.decorators import api_view, permission_classes     
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

class ticketBooking(APIView):

    
    def get(self, request):
        user = request.user
        booking = Booking.objects.filter(user=user, is_booked=False).order_by('-id')
        if not booking:
            return Response({'message':"no bookings found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = bookingSerializer(booking, many=True)

        # seat_number_list = list(booking)
        # flat_list = list(itertools.chain(*seat_number_list))
        # print(flat_list)
        return Response({'data': serializer.data},status=status.HTTP_200_OK)
    
    # permission_classes=[AllowAny]
    def post(self, request):

        Data = request.data

        user = request.user
        show_id = Data.get('show_time')
        movie = Data.get('movie')
        seat_number = Data.get('seat_number')
        price = Data.get("price")
        is_booked = Data.get("is_booked")

       

        try:

            bookings = Booking.objects.filter(show_time_id = show_id)
            seat_numbersDB = []
            for booking in bookings:
                seat_numbersDB.extend(booking.seat_number)
            

            any_in = any(i in seat_numbersDB for i in seat_number)

            if any_in:
                return Response({'message':"dublicate seats"}, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            print(e)
        

        serializer = bookingSerializer(data={
            'user': user,
            'movie': movie,
            'show_time_id': show_id,
            # 'show_time': show_id,
            'seat_number': seat_number,
            'price': price,
            'is_booked': is_booked
            
        })

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['POST'])
def bookedSeatsView(request):
    if request.method == "POST":
        data = request.data.get('ticketId')
        if not data:
            return Response({'message':"missing ticket id"}, status=status.HTTP_400_BAD_REQUEST)

        bookings = Booking.objects.filter(show_time_id=data)

        seat_numbers = []
        for booking in bookings:
            seat_numbers.extend(booking.seat_number)

        
    return Response({'seat_numbers': seat_numbers},status=status.HTTP_200_OK)


@api_view(['POST','DELETE'])
# @permission_classes([AllowAny])
def conformBooking(request):
    if request.method =='POST':
        id = request.data.get('id')
        if not id:
            return Response({'message':'please provide id'}, status=status.HTTP_400_BAD_REQUEST)
        booking = get_object_or_404(Booking, id=id)

        serializer = bookingSerializer(booking, data ={'is_booked': True}, partial=True)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
    elif request.method == 'DELETE':
        id = request.data.get('id')
        print(id)
        if not id:
            return Response({'message':'please provide id'}, status=status.HTTP_400_BAD_REQUEST)

        booking = Booking.objects.filter(id=id).first()

        data = booking.delete()
        
        return Response({'deleted':data}, status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def UserProfileView(request):
    if request.method == "GET":
        user = request.user
        if not user.is_authenticated:
            return Response({"message":"user not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
        data = Booking.objects.filter(user = user, is_booked=True).values(
            'id', 
            'user__username', 
            'movie__title', 
            'show_time__show_time', 
            'seat_number', 
            'price', 
            'booking_time'
        ).order_by('-booking_time')
        if not data:
            return Response({"message":"no bookings found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"data":data},status=status.HTTP_200_OK)