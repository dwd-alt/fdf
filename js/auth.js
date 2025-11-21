function register() {
    const username = document.getElementById('registerUsername').value;
    const displayName = document.getElementById('registerDisplayName').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    hideErrors();

    if (!username || !displayName || !password) {
        return showError('registerError', 'Заполните все поля');
    }

    if (password !== confirmPassword) {
        return showError('registerError', 'Пароли не совпадают');
    }

    // Проверяем в ОБЩЕЙ базе
    if (!isUsernameAvailable(username)) {
        return showError('registerError', 'Этот юзернейм уже занят');
    }

    const localUsers = JSON.parse(localStorage.getItem(DB_KEYS.LOCAL_USERS) || '{}');

    const newUser = {
        id: username,
        username: username,
        displayName: displayName,
        password: password,
        avatar: displayName.charAt(0).toUpperCase(),
        status: 'онлайн'
    };

    localUsers[username] = newUser;
    saveUsers(localUsers);
    setCurrentUser(newUser);
    showMessenger();
}