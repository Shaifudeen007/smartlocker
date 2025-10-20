import os
import django
import sys

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myapp.settings')

try:
    django.setup()
    
    from django.core.management import execute_from_command_line
    from django.contrib.auth import get_user_model
    
    print("=== Database Setup ===")
    
    # Run migrations
    print("Running migrations...")
    execute_from_command_line(['manage.py', 'migrate', '--noinput'])
    
    # Create superuser
    User = get_user_model()
    
    # Create new admin user (delete existing one first to avoid conflicts)
    User.objects.filter(username='admin2').delete()
    
    new_user = User.objects.create_superuser(
        username='admin2',
        email='admin2@example.com',
        password='admin123456'  # Strong password
    )
    
    print("=== NEW SUPERUSER CREATED ===")
    print("Username: admin2")
    print("Password: admin123456")
    print("Email: admin2@example.com")
    print("=== Login at: https://smartlocker-6tj0.onrender.com/admin/ ===")
        
    print("=== Setup Complete ===")
    
except Exception as e:
    print(f"Error during setup: {e}")
    import traceback
    traceback.print_exc()