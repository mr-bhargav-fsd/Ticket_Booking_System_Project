from django.shortcuts import render

def index(request):
    return render(request, 'app/index.html')

def seat_selection(request):
    return render(request, 'app/seat-selection.html')

def booking_success(request):
    return render(request, 'app/booking-success.html')

def login(request):
    return render(request, 'app/login.html')

def register(request):
    return render(request, 'app/register.html')