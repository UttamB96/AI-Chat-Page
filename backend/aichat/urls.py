from django.urls import path
from .views import GenerateResponseView

urlpatterns = [
    path('generate/', GenerateResponseView.as_view(), name='generate_response')
]