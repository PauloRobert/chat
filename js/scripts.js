document.addEventListener('DOMContentLoaded', function () {

    // Elements
    const splashScreen = document.getElementById('splash-screen');
    const onboardingContainer = document.getElementById('onboarding-container');
    const onboardingSlides = document.getElementById('onboarding-slides');
    const loginContainer = document.getElementById('login-container');
    const nextButton = document.getElementById('next-button');
    const skipButton = document.getElementById('skip-button');
    const navDots = document.getElementById('nav-dots')?.children;
    const loginButton = document.getElementById('login-button');

    const allActivitiesPage = document.getElementById('all-activities-page');
    const userProfilePage = document.getElementById('user-profile-page');
    const viewAllActivitiesBtn = document.getElementById('view-all-activities');
    const profileIcon = document.getElementById('profile-icon');

    const backFromActivitiesBtn = document.getElementById('back-from-activities');
    const backFromProfileBtn = document.getElementById('back-from-profile');
    const saveProfileBtn = document.getElementById('save-profile');

    let currentSlide = 0;

    // --- SPLASH ---
    if (splashScreen) {
        setTimeout(() => {
            splashScreen.style.opacity = '0';
            splashScreen.style.transform = 'scale(1.1)';

            setTimeout(() => {
                splashScreen.classList.add('hidden');
                if (onboardingContainer) {
                    onboardingContainer.style.opacity = '1';
                    onboardingContainer.style.transform = 'translateY(0)';
                }
            }, 500);
        }, 2000);
    }

    // --- ONBOARDING NAVIGATION ---
    function updateSlides() {
        if (!onboardingSlides || !navDots) return;
        onboardingSlides.style.transform = `translateX(-${currentSlide * 33.333}%)`;
        [...navDots].forEach(dot => dot.classList.remove('active'));
        navDots[currentSlide].classList.add('active');
        if (nextButton) nextButton.textContent = currentSlide === 2 ? 'Começar' : 'Próximo';
    }

    if (nextButton) {
        nextButton.addEventListener('click', function () {
            if (currentSlide < 2) {
                currentSlide++;
                updateSlides();
            } else {
                onboardingContainer?.classList.add('hidden');
                loginContainer.style.transform = 'translateX(0)';
                loginContainer.style.opacity = '1';
            }
        });
    }

    if (skipButton) {
        skipButton.addEventListener('click', function () {
            onboardingContainer?.classList.add('hidden');
            loginContainer.style.transform = 'translateX(0)';
            loginContainer.style.opacity = '1';
        });
    }

    if (navDots) {
        [...navDots].forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateSlides();
            });
        });
    }

    // --- LOGIN ---
    if (loginButton) {
        loginButton.addEventListener('click', function () {
            loginContainer.classList.add('slide-out');
            setTimeout(() => loginContainer.classList.add('hidden'), 400);
        });
    }

    // --- BOTTOM NAVIGATION ---
    const homeTab = document.getElementById('home-tab');
    const chatTab = document.getElementById('chat-tab');
    const itsmTab = document.getElementById('itsm-tab');
    const userTab = document.getElementById('user-tab');

    const homePage = document.getElementById('home-page');
    const chatPage = document.getElementById('chat-page');
    const itsmPage = document.getElementById('itsm-page');

    function showPage(pageId) {
        homePage?.classList.remove('active');
        chatPage?.classList.remove('active');
        itsmPage?.classList.remove('active');

        homeTab?.classList.remove('active');
        chatTab?.classList.remove('active');
        itsmTab?.classList.remove('active');
        userTab?.classList.remove('active');

        if (pageId === 'home-page') {
            homePage?.classList.add('active');
            homeTab?.classList.add('active');
        }
        if (pageId === 'chat-page') {
            chatPage?.classList.add('active');
            chatTab?.classList.add('active');
        }
        if (pageId === 'itsm-page') {
            itsmPage?.classList.add('active');
            itsmTab?.classList.add('active');
        }
    }

    homeTab?.addEventListener('click', () => showPage('home-page'));
    chatTab?.addEventListener('click', () => showPage('chat-page'));
    itsmTab?.addEventListener('click', () => showPage('itsm-page'));
    userTab?.addEventListener('click', () => userProfilePage?.classList.add('show-page'));

    // --- HOME NAVIGATION CARDS ---
    document.getElementById('go-to-chat')?.addEventListener('click', () => showPage('chat-page'));
    document.getElementById('go-to-tickets')?.addEventListener('click', () => showPage('itsm-page'));

    viewAllActivitiesBtn?.addEventListener('click', () => allActivitiesPage?.classList.add('show-page'));
    profileIcon?.addEventListener('click', () => userProfilePage?.classList.add('show-page'));

    backFromActivitiesBtn?.addEventListener('click', () => allActivitiesPage?.classList.remove('show-page'));
    backFromProfileBtn?.addEventListener('click', () => userProfilePage?.classList.remove('show-page'));

    // --- SAVE PROFILE ---
    saveProfileBtn?.addEventListener('click', () => {
        alert('Suas credenciais foram atualizadas com sucesso!');
        userProfilePage?.classList.remove('show-page');
    });

    // --- CHAT ---
    const sendButton = document.querySelector('.send-button');
    const inputField = document.querySelector('.input-field');
    const chatMessages = document.querySelector('.chat-messages');

    if (sendButton && inputField && chatMessages) {
        sendButton.addEventListener('click', function () {
            if (inputField.value.trim() !== '') {
                const userMessage = document.createElement('div');
                userMessage.className = 'message user';

                const messageContent = document.createElement('div');
                messageContent.textContent = inputField.value;

                userMessage.appendChild(messageContent);
                chatMessages.appendChild(userMessage);

                inputField.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;

                setTimeout(function () {
                    const botMessage = document.createElement('div');
                    botMessage.className = 'message bot';
                    botMessage.textContent = 'Estou analisando sua solicitação.';
                    chatMessages.appendChild(botMessage);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        });

        inputField.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') sendButton.click();
        });
    }

});