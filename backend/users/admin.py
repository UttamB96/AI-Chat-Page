from django.contrib import admin
from .models import User

# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'user_name', 'email', 'is_staff')
    search_fields = ('email', 'user_name', 'name')
    list_filter = ('is_staff', 'is_superuser', 'is_active')