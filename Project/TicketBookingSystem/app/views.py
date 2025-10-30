from django.shortcuts import render

def register(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        password = request.POST.get('password')

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already exists!")
            return redirect('register')

        user = User.objects.create(
            name=name,
            email=email,
            password=password,  # In real app, hash it!
            user_id=get_random_string(10)
        )
        messages.success(request, "Registration successful! Please log in.")
        return redirect('login')

    return render(request, 'register.html')



def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user = User.objects.get(email=email, password=password)
            request.session['user_id'] = user.user_id
            messages.success(request, f"Welcome {user.name}!")
            return redirect('event_list')
        except User.DoesNotExist:
            messages.error(request, "Invalid credentials.")
            return redirect('login')

    return render(request, 'login.html')


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

