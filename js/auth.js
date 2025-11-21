let selectedMode = CONFIG.MODES.PERSONAL;

// Показать/скрыть формы авторизации
function showAuthForm(formType) {
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));

    document.querySelector(`.auth-tab:nth-child(${formType === 'login' ? 1 : 2})`).classList.add('active');
    document.getElementById(formType === 'login' ? 'loginForm' : 'registerForm').classList.add('active');

    hideErrors();
    if (formType === 'register') {
        selectMode(CONFIG.MODES.PERSONAL);
    }
}

// Выбор режима
function selectMode(mode) {
    selectedMode = mode;
    document.querySelectorAll('.mode-option').forEach(opt => opt.classList.remove('selected'));
    document.getElementById(`mode${mode.charAt(0).toUpperCase() + mode.slice(1)}`).classList.add('selected');
}

// Скрыть ошибки
function hideErrors() {
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('registerError').style.display = 'none';
    document.getElementById('registerSuccess').style.display = 'none';
}

// Показать ошибку
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Показать успех
function showSuccess(elementId, message) {
    const successElement = document.getElementById(elementId);
    successElement.textContent = message;
    successElement.style.display = 'block';
}

// Проверка доступности юзернейма
function checkUsernameAvailability() {
    const username = document.getElementById('registerUsername').value.trim();
    const checkElement = document.getElementById('usernameCheck');
    const validation = validateUsername(username);

    if (!username) {
        checkElement.style.display = 'none';
        return;
    }

    if (!validation.valid) {
        checkElement.innerHTML = validation.message;
        checkElement.className = 'username-check username-taken';
        checkElement.style.display = 'block';
        return;
    }

    if (isUsernameAvailable(username)) {
        checkElement.innerHTML = '✅ Юзернейм свободен';
        checkElement.className = 'username-check username-available';
    } else {
        checkElement.innerHTML = '❌ Юзернейм занят';
        checkElement.className = 'username-check username-taken';
    }
    checkElement.style.display = 'block';
}

// Регистрация
function register() {
    const username = document.getElementById('registerUsername').value.trim();
    const displayName = document.getElementById('registerDisplayName').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    hideErrors();

    // Валидация
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.valid) {
        return showError('registerError', usernameValidation.message);
    }

    if (!displayName) {
        return showError('registerError', 'Введите отображаемое имя');
    }

    if (!password) {
        return showError('registerError', 'Введите пароль');
    }

    if (password.length < 6) {
        return showError('registerError', 'Пароль должен быть не менее 6 символов');
    }

    if (password !== confirmPassword) {
        return showError('registerError', 'Пароли не совпадают');
    }

    if (!isUsernameAvailable(username)) {
        return showError('registerError', 'Этот юзернейм уже занят');
    }

    // Создаем нового пользователя
    const newUser = {
        id: username,
        username: username,
        displayName: displayName,
        handle: `@${username}`,
        password: password,
        avatar: displayName.charAt(0).toUpperCase(),
        status: 'online',
        mode: selectedMode,
        registered: new Date().toISOString(),
        lastSeen: new Date().toISOString()
    };

    saveUser(newUser);
    showSuccess('registerSuccess', 'Аккаунт успешно создан! Выполняется вход...');

    setTimeout(() => {
        setCurrentUser(newUser);
        showMessenger();
    }, 1500);
}

// Вход
function login() {
    const loginInput = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    hideErrors();

    let user;

    // Ищем пользователя по username или handle
    if (loginInput.startsWith('@')) {
        const username = loginInput.slice(1);
        user = getUserByUsername(username);
    } else {
        user = getUserByUsername(loginInput);
    }

    if (!user || user.password !== password) {
        return showError('loginError', 'Неверный юзернейм или пароль');
    }

    // Обновляем время последнего входа
    user.lastSeen = new Date().toISOString();
    saveUser(user);

    setCurrentUser(user);
    showMessenger();
}

// Выход
function logout() {
    setCurrentUser(null);
    document.getElementById('authContainer').style.display = 'block';
    document.getElementById('messengerContainer').classList.remove('active');
}