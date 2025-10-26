// JavaScript for login and registration forms
        // Toggle between login and register forms
        function toggleForms() {
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            
            loginForm.classList.toggle('active');
            registerForm.classList.toggle('active');
        }

        // Form validation and submission
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formType = form.closest('.form-container').id === 'loginForm' ? 'Login' : 'Register';
                const inputs = form.querySelectorAll('input');
                let isValid = true;
                let errorMsg = '';

                // Validate all inputs
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = 'hsl(355, 78%, 50%)';
                        errorMsg = 'Please fill in all fields';
                    } else {
                        input.style.borderColor = '#2a2a2a';
                    }
                });

                // Email validation
                const emailInput = form.querySelector('input[type="email"]');
                if (emailInput && emailInput.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(emailInput.value)) {
                        isValid = false;
                        emailInput.style.borderColor = 'hsl(355, 78%, 50%)';
                        errorMsg = 'Please enter a valid email address';
                    }
                }

                // Password match validation for register form
                if (formType === 'Register') {
                    const passwords = form.querySelectorAll('input[type="password"]');
                    if (passwords.length === 2 && passwords[0].value !== passwords[1].value) {
                        isValid = false;
                        passwords[1].style.borderColor = 'hsl(355, 78%, 50%)';
                        errorMsg = 'Passwords do not match';
                    }
                }

                if (isValid) {
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.textContent = `${formType} successful! Redirecting...`;
                    successMsg.style.cssText = `
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: linear-gradient(135deg, hsl(355, 78%, 50%) 0%, hsl(355, 78%, 40%) 100%);
                        color: white;
                        padding: 15px 25px;
                        border-radius: 10px;
                        box-shadow: 0 4px 15px rgba(237, 50, 55, 0.4);
                        z-index: 1000;
                        font-weight: 600;
                        animation: slideIn 0.3s ease;
                    `;
                    document.body.appendChild(successMsg);

                    // Remove success message after 3 seconds
                    setTimeout(() => {
                        successMsg.remove();
                    }, 3000);

                    // Reset form
                    form.reset();
                } else {
                    // Show error message
                    const errorDiv = document.createElement('div');
                    errorDiv.textContent = errorMsg;
                    errorDiv.style.cssText = `
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: #2a2a2a;
                        color: hsl(355, 78%, 60%);
                        padding: 15px 25px;
                        border-radius: 10px;
                        border: 2px solid hsl(355, 78%, 50%);
                        box-shadow: 0 4px 15px rgba(237, 50, 55, 0.3);
                        z-index: 1000;
                        font-weight: 600;
                    `;
                    document.body.appendChild(errorDiv);

                    setTimeout(() => {
                        errorDiv.remove();
                    }, 3000);
                }
            });
        });

        // Google sign-in buttons
        document.querySelectorAll('.btn-google').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const notification = document.createElement('div');
                notification.textContent = 'Google Sign-In coming soon!';
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #2a2a2a;
                    color: white;
                    padding: 15px 25px;
                    border-radius: 10px;
                    border: 2px solid #3a3a3a;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                    z-index: 1000;
                    font-weight: 600;
                `;
                document.body.appendChild(notification);

                setTimeout(() => {
                    notification.remove();
                }, 2500);
            });
        });

        // Input focus effects
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.querySelector('label').style.color = 'hsl(355, 78%, 60%)';
            });

            input.addEventListener('blur', function() {
                this.parentElement.querySelector('label').style.color = '#e0e0e0';
            });

            // Clear error styling on input
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#2a2a2a';
                }
            });
        });

        // Add slide-in animation for notifications
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);