from django.db import models
from django.contrib.auth.models import User

class Locker(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('occupied', 'Occupied'),
        ('maintenance', 'Maintenance'),
    ]
    
    locker_number = models.CharField(max_length=20, unique=True)
    location = models.CharField(max_length=100)
    price_per_hour = models.DecimalField(max_digits=10, decimal_places=2, default=2.50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'lockers'
        ordering = ['locker_number']
    
    def __str__(self):
        return f"Locker {self.locker_number}"

class Reservation(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reservations')
    locker = models.ForeignKey(Locker, on_delete=models.CASCADE, related_name='reservations')
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'reservations'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Reservation {self.id} - {self.user.username}"