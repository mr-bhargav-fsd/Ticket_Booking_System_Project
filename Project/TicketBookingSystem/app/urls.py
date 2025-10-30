from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('seat-selection/', views.seat_selection, name='seat_selection'),
    path('booking-success/', views.booking_success, name='booking_success'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    # path('ticket/<str:ticket_id>/', views.view_ticket, name='view_ticket'),
]

