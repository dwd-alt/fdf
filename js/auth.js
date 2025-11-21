function showAuthForm(formType) {
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));

    if (formType === 'login') {
        document.querySelector('.auth-tab:nth-child(1)').classList.add('active');
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.querySelector('.auth-tab:nth-child(2)').classList.add('active');
        document.getElementById('registerForm').classList.add('active');
    }

    hideErrors();
}

function hideErrors() {
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('registerError').style.display = 'none';
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    hideErrors();

    const users = getAllUsers();
    const user = users[username];

    if (user && user.password === password) {
        setCurrentUser(user);
        showMessenger();
    } else {
        showError('loginError', 'Неверный юзернейм или пароль');
    }
}

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

    const users = getAllUsers();

    if (users[username]) {
        return showError('registerError', 'Пользователь уже существует');
    }

    const newUser = {
        id: username,
        username: username,
        displayName: displayName,
        password: password,
        avatar: displayName.charAt(0).toUpperCase(),
        status: 'online'
    };

    users[username] = newUser;
    saveUsers(users);
    setCurrentUser(newUser);
    showMessenger();
}

function logout() {
    setCurrentUser(null);
    document.getElementById('authContainer').style.display = 'block';
    document.getElementById('messengerContainer').classList.remove('active');
}