from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from ..models import Locker
from ..serializers import LockerSerializer

class AdminLockerViewSet(viewsets.ModelViewSet):
    queryset = Locker.objects.all().order_by('locker_number')
    serializer_class = LockerSerializer
    permission_classes = [permissions.IsAdminUser]

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            
            return Response(serializer.data)
            
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_400_BAD_REQUEST
            )

    def perform_update(self, serializer):
        serializer.save()

    @action(detail=False, methods=['get'])
    def stats(self, request):
        total_lockers = Locker.objects.count()
        available_lockers = Locker.objects.filter(status='available').count()
        occupied_lockers = Locker.objects.filter(status='occupied').count()
        maintenance_lockers = Locker.objects.filter(status='maintenance').count()
        
        return Response({
            'total_lockers': total_lockers,
            'available_lockers': available_lockers,
            'occupied_lockers': occupied_lockers,
            'maintenance_lockers': maintenance_lockers
        })