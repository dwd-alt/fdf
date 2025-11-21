// База данных с ОБЩИМИ пользователями
const DB_KEYS = {
    CURRENT_USER: 'kilaib_current_user',
    LOCAL_USERS: 'kilaib_local_users',
    MESSAGES: 'kilaib_messages'
};

// ОБЩИЕ пользователи (симулируем серверную базу)
const SHARED_USERS = {
    'alexey': {
        id: 'alexey',
        username: 'alexey',
        displayName: 'Алексей Петров',
        password: '123456',
        avatar: 'А',
        status: 'онлайн'
    },
    'maria': {
        id: 'maria',
        username: 'maria',
        displayName: 'Мария Иванова',
        password: '123456',
        avatar: 'М',
        status: 'онлайн'
    },
    'support': {
        id: 'support',
        username: 'support',
        displayName: 'Поддержка Kilaib',
        password: '123456',
        avatar: 'П',
        status: 'онлайн'
    },
    'bot_help': {
        id: 'bot_help',
        username: 'bot_help',
        displayName: 'Помощник Kilaib 🤖',
        password: '123456',
        avatar: '🤖',
        status: 'онлайн'
    }
};

function initializeDatabase() {
    if (!localStorage.getItem(DB_KEYS.LOCAL_USERS)) {
        localStorage.setItem(DB_KEYS.LOCAL_USERS, JSON.stringify({}));
    }
    if (!localStorage.getItem(DB_KEYS.MESSAGES)) {
        localStorage.setItem(DB_KEYS.MESSAGES, JSON.stringify({}));
    }
}

// Получить ВСЕХ пользователей (локальные + общие)
function getAllUsers() {
    const localUsers = JSON.parse(localStorage.getItem(DB_KEYS.LOCAL_USERS) || '{}');
    return { ...SHARED_USERS, ...localUsers };
}

// Получить только ОБЩИХ пользователей
function getSharedUsers() {
    return SHARED_USERS;
}

function saveUsers(users) {
    localStorage.setItem(DB_KEYS.LOCAL_USERS, JSON.stringify(users));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem(DB_KEYS.CURRENT_USER) || 'null');
}

function setCurrentUser(user) {
    localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
}

function getMessages() {
    return JSON.parse(localStorage.getItem(DB_KEYS.MESSAGES) || '{}');
}

function saveMessages(messages) {
    localStorage.setItem(DB_KEYS.MESSAGES, JSON.stringify(messages));
}

// Проверить доступность юзернейма в ОБЩЕЙ базе
function isUsernameAvailable(username) {
    return !SHARED_USERS[username];
}