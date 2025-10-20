from django.contrib import admin
from .models import Locker  # Remove Reservation import

# Register your models here.
@admin.register(Locker)
class LockerAdmin(admin.ModelAdmin):
    list_display = ['locker_number', 'location', 'price_per_hour', 'status', 'created_at']
    list_filter = ['status', 'location']
    search_fields = ['locker_number', 'location']
    ordering = ['locker_number']

# Comment out or remove the Reservation admin registration
# @admin.register(Reservation)
# class ReservationAdmin(admin.ModelAdmin):
#     list_display = ['user', 'locker', 'start_time', 'end_time', 'total_price', 'status']
#     list_filter = ['status', 'start_time']
#     search_fields = ['user__username', 'locker__locker_number']