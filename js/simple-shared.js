// Простая общая база пользователей
class SimpleSharedDB {
    constructor() {
        this.key = 'kilaib_simple_shared';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.key)) {
            const defaultUsers = {
                'alexey': {
                    id: 'alexey',
                    username: 'alexey',
                    displayName: 'Алексей Петров',
                    handle: '@alexey',
                    password: '123456',
                    avatar: 'А',
                    status: 'онлайн',
                    mode: 'personal'
                },
                'maria': {
                    id: 'maria',
                    username: 'maria',
                    displayName: 'Мария Иванова',
                    handle: '@maria',
                    password: '123456',
                    avatar: 'М',
                    status: 'онлайн',
                    mode: 'business'
                },
                'support': {
                    id: 'support',
                    username: 'support',
                    displayName: 'Поддержка Kilaib',
                    handle: '@support',
                    password: '123456',
                    avatar: 'П',
                    status: 'онлайн',
                    mode: 'business'
                }
            };
            this.saveAll(defaultUsers);
        }
    }

    getAllUsers() {
        try {
            return JSON.parse(localStorage.getItem(this.key)) || {};
        } catch {
            return {};
        }
    }

    saveAll(users) {
        localStorage.setItem(this.key, JSON.stringify(users));
    }

    addUser(user) {
        const users = this.getAllUsers();
        users[user.username] = user;
        this.saveAll(users);
    }

    getUser(username) {
        const users = this.getAllUsers();
        return users[username];
    }

    searchUsers(searchTerm) {
        const users = this.getAllUsers();
        const term = searchTerm.toLowerCase().replace('@', '');

        return Object.values(users).filter(user =>
            user.username.toLowerCase().includes(term) ||
            user.handle.toLowerCase().includes(term) ||
            user.displayName.toLowerCase().includes(term)
        );
    }

    isUsernameAvailable(username) {
        return !this.getUser(username);
    }
}

// Создаем глобальный экземпляр
const sharedDB = new SimpleSharedDB();