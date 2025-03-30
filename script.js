document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Feature cards animation
    const featureCards = document.querySelectorAll('.feature-card');
    let currentCardIndex = 0;
    const animationDuration = 4500; // 3 seconds per card

    function showNextCard() {
        const currentCard = featureCards[currentCardIndex];
        const nextIndex = (currentCardIndex + 1) % featureCards.length;
        const nextCard = featureCards[nextIndex];

        // Move current card to the right
        currentCard.classList.remove('active');
        currentCard.classList.add('prev');

        // Move next card from left to center
        nextCard.classList.remove('prev', 'next');
        nextCard.classList.add('active');

        // Update all other cards to "next" state
        featureCards.forEach((card, index) => {
            if (index !== currentCardIndex && index !== nextIndex) {
                card.classList.remove('active', 'prev');
                card.classList.add('next');
            }
        });

        // Update index for next iteration
        currentCardIndex = nextIndex;
    }

    // Show first card immediately
    featureCards[0].classList.add('active');
    
    // Start the animation loop
    setInterval(showNextCard, animationDuration);

    // Form submission handling
    const signupForm = document.getElementById('signup-form');
    const emailInput = document.getElementById('email');

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (email) {
            // Here you would typically send the email to your backend
            // For now, we'll just show a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for signing up! We\'ll be in touch soon.';
            
            // Clear the form
            emailInput.value = '';
            
            // Add success message
            signupForm.appendChild(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }
    });
}); 