from rest_framework import viewsets, permissions, serializers
from rest_framework.decorators import action
from rest_framework.response import Response
from api.models import Locker

# Create serializer directly in this file
class LockerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locker
        fields = ['id', 'locker_number', 'location', 'price_per_hour', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class LockerViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LockerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Locker.objects.filter(status='available').order_by('locker_number')

    @action(detail=True, methods=['post'])
    def reserve(self, request, pk=None):
        locker = self.get_object()
        if locker.status != 'available':
            return Response({'error': 'Locker is not available'}, status=400)
        
        locker.status = 'occupied'
        locker.save()
        return Response({'message': 'Locker reserved successfully'})