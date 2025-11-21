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

// База данных в localStorage
const DB_KEYS = {
    USERS: 'kilaib_users_v2',
    MESSAGES: 'kilaib_messages_v2',
    CURRENT_USER: 'kilaib_current_user_v2'
};

let selectedMode = CONFIG.MODES.PERSONAL;

// Инициализация базы данных
function initializeDatabase() {
    if (!localStorage.getItem(DB_KEYS.USERS)) {
        const demoUsers = {
            'alexey': {
                id: 'alexey',
                username: 'alexey',
                displayName: 'Алексей',
                handle: '@alexey',
                password: '123456',
                avatar: 'А',
                status: 'online',
                mode: CONFIG.MODES.PERSONAL,
                registered: new Date().toISOString()
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
                registered: new Date().toISOString()
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
                registered: new Date().toISOString()
            }
        };
        localStorage.setItem(DB_KEYS.USERS, JSON.stringify(demoUsers));
    }

    if (!localStorage.getItem(DB_KEYS.MESSAGES)) {
        localStorage.setItem(DB_KEYS.MESSAGES, JSON.stringify({}));
    }
}

// Получить всех пользователей
function getAllUsers() {
    return JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '{}');
}

// Сохранить пользователей
function saveUsers(users) {
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
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