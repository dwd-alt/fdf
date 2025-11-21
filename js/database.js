// Конфигурация
const CONFIG = {
    MIN_USERNAME_LENGTH: 3,
    MAX_USERNAME_LENGTH: 20,
    USERNAME_REGEX: /^[a-zA-Z0-9_]+$/,
    MODES: {
        PERSONAL: 'personal',
        BUSINESS: 'business'
    }
};

// База данных в localStorage с файловой структурой
const DB_KEYS = {
    USERS_FOLDER: 'kilaib_users_folder',
    USERNAMES_INDEX: 'kilaib_usernames_index',
    MESSAGES: 'kilaib_messages',
    CURRENT_USER: 'kilaib_current_user'
};

// Инициализация базы данных
function initializeDatabase() {
    if (!localStorage.getItem(DB_KEYS.USERS_FOLDER)) {
        // Создаем папку пользователей
        const usersFolder = {
            'alexey': {
                id: 'alexey',
                username: 'alexey',
                displayName: 'Алексей',
                handle: '@alexey',
                password: '123456',
                avatar: 'А',
                status: 'online',
                mode: CONFIG.MODES.PERSONAL,
                registered: new Date().toISOString(),
                lastSeen: new Date().toISOString()
            },
            'maria_work': {
                id: 'maria_work',
                username: 'maria_work',
                displayName: 'Мария Иванова',
                handle: '@maria_work',
                password: '123456',
                avatar: 'М',
                status: 'был(а) 5 мин назад',
                mode: CONFIG.MODES.BUSINESS,
                registered: new Date().toISOString(),
                lastSeen: new Date().toISOString()
            },
            'tech_support': {
                id: 'tech_support',
                username: 'tech_support',
                displayName: 'Поддержка Kilaib',
                handle: '@tech_support',
                password: '123456',
                avatar: 'П',
                status: 'online',
                mode: CONFIG.MODES.BUSINESS,
                registered: new Date().toISOString(),
                lastSeen: new Date().toISOString()
            }
        };
        localStorage.setItem(DB_KEYS.USERS_FOLDER, JSON.stringify(usersFolder));
    }

    if (!localStorage.getItem(DB_KEYS.USERNAMES_INDEX)) {
        // Создаем индекс занятых юзернеймов
        const usernamesIndex = {
            'alexey': true,
            'maria_work': true,
            'tech_support': true
        };
        localStorage.setItem(DB_KEYS.USERNAMES_INDEX, JSON.stringify(usernamesIndex));
    }

    if (!localStorage.getItem(DB_KEYS.MESSAGES)) {
        localStorage.setItem(DB_KEYS.MESSAGES, JSON.stringify({}));
    }
}

// Получить папку пользователей
function getUsersFolder() {
    return JSON.parse(localStorage.getItem(DB_KEYS.USERS_FOLDER) || '{}');
}

// Сохранить папку пользователей
function saveUsersFolder(usersFolder) {
    localStorage.setItem(DB_KEYS.USERS_FOLDER, JSON.stringify(usersFolder));
}

// Получить индекс юзернеймов
function getUsernamesIndex() {
    return JSON.parse(localStorage.getItem(DB_KEYS.USERNAMES_INDEX) || '{}');
}

// Сохранить индекс юзернеймов
function saveUsernamesIndex(usernamesIndex) {
    localStorage.setItem(DB_KEYS.USERNAMES_INDEX, JSON.stringify(usernamesIndex));
}

// Получить пользователя по ID
function getUserById(userId) {
    const usersFolder = getUsersFolder();
    return usersFolder[userId];
}

// Получить пользователя по username
function getUserByUsername(username) {
    const usersFolder = getUsersFolder();
    return Object.values(usersFolder).find(user => user.username === username);
}

// Получить всех пользователей
function getAllUsers() {
    return getUsersFolder();
}

// Сохранить пользователя
function saveUser(user) {
    const usersFolder = getUsersFolder();
    const usernamesIndex = getUsernamesIndex();

    usersFolder[user.id] = user;
    usernamesIndex[user.username] = true;

    saveUsersFolder(usersFolder);
    saveUsernamesIndex(usernamesIndex);
}

// Проверить доступность юзернейма
function isUsernameAvailable(username) {
    const usernamesIndex = getUsernamesIndex();
    return !usernamesIndex[username];
}

// Получить текущего пользователя
function getCurrentUser() {
    return JSON.parse(localStorage.getItem(DB_KEYS.CURRENT_USER) || 'null');
}

// Сохранить текущего пользователя
function setCurrentUser(user) {
    localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
}

// Получить сообщения
function getMessages() {
    return JSON.parse(localStorage.getItem(DB_KEYS.MESSAGES) || '{}');
}

// Сохранить сообщения
function saveMessages(messages) {
    localStorage.setItem(DB_KEYS.MESSAGES, JSON.stringify(messages));
}

// Валидация юзернейма
function validateUsername(username) {
    if (username.length < CONFIG.MIN_USERNAME_LENGTH) {
        return { valid: false, message: 'Слишком короткий юзернейм' };
    }
    if (username.length > CONFIG.MAX_USERNAME_LENGTH) {
        return { valid: false, message: 'Слишком длинный юзернейм' };
    }
    if (!CONFIG.USERNAME_REGEX.test(username)) {
        return { valid: false, message: 'Только английские буквы, цифры и _' };
    }
    return { valid: true, message: '' };
}