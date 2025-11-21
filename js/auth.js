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

    // Проверяем в ОБЩЕЙ базе
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
        status: 'онлайн',
        mode: selectedMode,
        registered: new Date().toISOString(),
        lastSeen: new Date().toISOString()
    };

    // Сохраняем в ЛОКАЛЬНУЮ и ОБЩУЮ базу
    saveUser(newUser);

    showSuccess('registerSuccess', 'Аккаунт успешно создан! Выполняется вход...');

    setTimeout(() => {
        setCurrentUser(newUser);
        showMessenger();
    }, 1500);
}