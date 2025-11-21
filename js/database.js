// База данных
const DB_KEYS = {
    USERS: 'kilaib_users',
    MESSAGES: 'kilaib_messages',
    CURRENT_USER: 'kilaib_current_user'
};

// Инициализация
function initializeDatabase() {
    if (!localStorage.getItem(DB_KEYS.USERS)) {
        const demoUsers = {
            'alexey': {
                id: 'alexey',
                username: 'alexey',
                displayName: 'Алексей',
                password: '123456',
                avatar: 'А',
                status: 'online'
            },
            'maria': {
                id: 'maria',
                username: 'maria',
                displayName: 'Мария',
                password: '123456',
                avatar: 'М',
                status: 'online'
            }
        };
        localStorage.setItem(DB_KEYS.USERS, JSON.stringify(demoUsers));
    }

    if (!localStorage.getItem(DB_KEYS.MESSAGES)) {
        localStorage.setItem(DB_KEYS.MESSAGES, JSON.stringify({}));
    }
}

function getAllUsers() {
    return JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '{}');
}

function saveUsers(users) {
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
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