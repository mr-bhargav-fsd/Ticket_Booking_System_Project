// Seat Configuration
const seatConfig = {
    gold: { rows: 3, seatsPerRow: 10, price: 500 },
    silver: { rows: 4, seatsPerRow: 10, price: 300 },
    general: { rows: 5, seatsPerRow: 10, price: 150 }
};

let seats = [];
let selectedSeats = [];

// Generate Seats
function generateSeats() {
    seats = [];
    let rowCounter = 0;
    
    ['gold', 'silver', 'general'].forEach(section => {
        const config = seatConfig[section];
        for (let i = 0; i < config.rows; i++) {
            const rowLetter = String.fromCharCode(65 + rowCounter);
            for (let j = 1; j <= config.seatsPerRow; j++) {
                seats.push({
                    id: `${rowLetter}${j}`,
                    row: rowLetter,
                    number: j,
                    section: section,
                    status: Math.random() > 0.3 ? 'available' : 'booked',
                    price: config.price
                });
            }
            rowCounter++;
        }
    });
}

// Render Seats
function renderSeats() {
    const grid = document.getElementById('seat-grid');
    const rows = {};
    
    seats.forEach(seat => {
        if (!rows[seat.row]) rows[seat.row] = [];
        rows[seat.row].push(seat);
    });
    
    grid.innerHTML = Object.entries(rows).map(([row, rowSeats]) => `
        <div class="seat-row">
            <span class="row-label">${row}</span>
            ${rowSeats.map(seat => `
                <div 
                    class="seat ${seat.section} ${seat.status}"
                    data-seat-id="${seat.id}"
                    onclick="toggleSeat('${seat.id}')"
                >
                    ${seat.number}
                </div>
            `).join('')}
        </div>
    `).join('');
}

// Toggle Seat Selection
function toggleSeat(seatId) {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status === 'booked') return;
    
    if (seat.status === 'selected') {
        seat.status = 'available';
        selectedSeats = selectedSeats.filter(s => s.id !== seatId);
    } else {
        seat.status = 'selected';
        selectedSeats.push(seat);
    }
    
    renderSeats();
    updateSummary();
}

// Update Booking Summary
function updateSummary() {
    const summary = document.getElementById('booking-summary');
    const selectedInfo = document.getElementById('selected-info');
    
    if (selectedSeats.length === 0) {
        summary.style.display = 'none';
        selectedInfo.textContent = '';
        return;
    }
    
    summary.style.display = 'block';
    
    const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const fee = Math.round(total * 0.1);
    const grandTotal = total + fee;
    
    document.getElementById('summary-seats').textContent = `${selectedSeats.length} Seat${selectedSeats.length > 1 ? 's' : ''}`;
    document.getElementById('summary-amount').textContent = `₹${grandTotal.toLocaleString()}`;
    
    selectedInfo.textContent = `Selected: ${selectedSeats.map(s => s.id).join(', ')}`;
}

// Payment Modal
const modal = document.getElementById('payment-modal');
const proceedBtn = document.getElementById('proceed-btn');
const closeModal = document.getElementById('close-modal');
const confirmPayment = document.getElementById('confirm-payment');

proceedBtn.addEventListener('click', () => {
    const total = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const fee = Math.round(total * 0.1);
    const grandTotal = total + fee;
    
    document.getElementById('payment-amount').textContent = `₹${grandTotal.toLocaleString()}`;
    document.getElementById('confirm-amount').textContent = `₹${grandTotal.toLocaleString()}`;
    
    modal.classList.add('show');
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

confirmPayment.addEventListener('click', () => {
    const bookingId = 'BMS' + Math.random().toString(36).substr(2, 9).toUpperCase();
    localStorage.setItem('lastBooking', JSON.stringify({
        bookingId,
        seats: selectedSeats.map(s => s.id),
        total: selectedSeats.reduce((sum, seat) => sum + seat.price, 0) * 1.1
    }));
    
    confirmPayment.textContent = 'Processing...';
    confirmPayment.disabled = true;
    
    setTimeout(() => {
        window.location.href = 'booking-success.html';
    }, 2000);
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
let isDark = false;

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('dark', isDark);
    themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// Payment Method Toggle
const paymentOptions = document.querySelectorAll('input[name="payment"]');
const cardDetails = document.getElementById('card-details');

paymentOptions.forEach(option => {
    option.addEventListener('change', (e) => {
        cardDetails.style.display = e.target.value === 'card' ? 'block' : 'none';
    });
});

// Initialize
generateSeats();
renderSeats();

// Load show info from URL params (in real app)
const urlParams = new URLSearchParams(window.location.search);
const showId = urlParams.get('show');
console.log('Show ID:', showId);
