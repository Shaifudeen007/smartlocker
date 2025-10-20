from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from ..models import Reservation, Locker
from ..serializers import ReservationSerializer

class ReservationViewSet(viewsets.ModelViewSet):
    # ADD THIS LINE - Fix the router error
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Reservation.objects.all()
        return Reservation.objects.filter(user=user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        try:
            locker_id = request.data.get('locker')
            reserved_until = request.data.get('reserved_until')
            
            # Check if locker exists and is available
            try:
                locker = Locker.objects.get(id=locker_id)
            except Locker.DoesNotExist:
                return Response(
                    {'error': 'Locker not found'}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            
            if locker.status != 'available':
                return Response(
                    {'error': 'Locker is not available for reservation'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Update locker status
            locker.status = 'occupied'
            locker.save()
            
            return super().create(request, *args, **kwargs)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['put'])
    def release(self, request, pk=None):
        try:
            reservation = self.get_object()
            
            # Check permission
            if reservation.user != request.user and not request.user.is_staff:
                return Response(
                    {'error': 'Not authorized to release this reservation'}, 
                    status=status.HTTP_403_FORBIDDEN
                )
            
            # Update locker status
            locker = reservation.locker
            locker.status = 'available'
            locker.save()
            
            # Update reservation status
            reservation.status = 'completed'
            reservation.save()
            
            serializer = self.get_serializer(reservation)
            return Response({
                'message': 'Locker released successfully',
                'reservation': serializer.data
            })
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)