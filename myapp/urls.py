from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("""
        <h1>Locker Reservation System</h1>
        <p>Welcome to the Locker Reservation API</p>
        <ul>
            <li><a href="/admin/">Admin Interface</a></li>
            <li><a href="/api/">API Endpoints</a></li>
        </ul>
    """)

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]