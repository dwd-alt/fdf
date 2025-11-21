// Показать мессенджер
function showMessenger() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('messengerContainer').classList.add('active');

    // Обновляем информацию о текущем пользователе
    document.getElementById('currentUserName').textContent = currentUser.displayName;
    document.getElementById('currentUserHandle').textContent = currentUser.handle;
    document.getElementById('currentUserAvatar').textContent = currentUser.avatar;

    renderContacts();
}

// Отрисовка списка контактов
function renderContacts() {
    const contactsList = document.getElementById('contactsList');
    const currentUser = getCurrentUser();
    const usersFolder = getUsersFolder();

    contactsList.innerHTML = '';

    Object.values(usersFolder).forEach(user => {
        if (user.id === currentUser.id) return;

        const contactElement = document.createElement('div');
        contactElement.className = 'contact';
        contactElement.onclick = () => selectChat(user.id);

        contactElement.innerHTML = `
            <div class="contact-avatar">${user.avatar}</div>
            <div class="contact-info">
                <div class="contact-name">${user.displayName}</div>
                <div class="contact-handle">${user.handle}</div>
                <div class="contact-status">${user.status}</div>
            </div>
        `;

        contactsList.appendChild(contactElement);
    });
}

// Выбор чата
function selectChat(userId) {
    const user = getUserById(userId);
    const currentUser = getCurrentUser();

    if (!user) return;

    // Обновляем заголовок чата
    document.getElementById('currentChatName').textContent = user.displayName;
    document.getElementById('currentChatHandle').textContent = user.handle;
    document.getElementById('currentChatAvatar').textContent = user.avatar;
    document.getElementById('currentChatStatus').textContent = user.status;

    // Активируем поле ввода
    document.getElementById('messageInput').disabled = false;
    document.getElementById('messageInput').placeholder = 'Введите сообщение...';

    // Загружаем историю сообщений
    loadChatHistory(userId);
}

// Загрузка истории чата
function loadChatHistory(userId) {
    const messagesContainer = document.getElementById('messagesContainer');
    const messages = getMessages();
    const chatId = generateChatId(getCurrentUser().id, userId);

    messagesContainer.innerHTML = '';

    if (messages[chatId]) {
        messages[chatId].forEach(msg => {
            addMessageToChat(msg.text, msg.sender, msg.time, false);
        });
    } else {
        // Демо-сообщения для нового чата
        const demoMessages = [
            { text: 'Привет! Рад познакомиться!', sender: userId, time: '10:30' },
            { text: 'Привет! Я тоже рад!', sender: getCurrentUser().id, time: '10:31' }
        ];

        demoMessages.forEach(msg => {
            addMessageToChat(msg.text, msg.sender, msg.time, false);
        });
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Генерация ID чата
function generateChatId(user1, user2) {
    return [user1, user2].sort().join('_');
}

// Добавление сообщения в чат
function addMessageToChat(text, sender, time = null, saveToStorage = true) {
    const messagesContainer = document.getElementById('messagesContainer');
    const messageElement = document.createElement('div');

    const isSent = sender === getCurrentUser().id;
    messageElement.className = `message ${isSent ? 'sent' : 'received'}`;

    if (!time) {
        const now = new Date();
        time = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    }

    messageElement.innerHTML = `
        <div class="message-text">${text}</div>
        <div class="message-time">${time}</div>
    `;

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Сохраняем в базу данных
    if (saveToStorage) {
        saveMessageToDatabase(text, sender, time);
    }
}

// Сохранение сообщения в базу данных
function saveMessageToDatabase(text, sender, time) {
    const currentChatName = document.getElementById('currentChatName').textContent;
    if (!currentChatName || currentChatName === 'Выберите чат') return;

    const usersFolder = getUsersFolder();
    const targetUser = Object.values(usersFolder).find(user => user.displayName === currentChatName);
    if (!targetUser) return;

    const chatId = generateChatId(getCurrentUser().id, targetUser.id);
    const messages = getMessages();

    if (!messages[chatId]) {
        messages[chatId] = [];
    }

    messages[chatId].push({
        text: text,
        sender: sender,
        time: time,
        timestamp: new Date().toISOString()
    });

    saveMessages(messages);
}

// Отправка сообщения
function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();

    if (text) {
        addMessageToChat(text, getCurrentUser().id);
        input.value = '';

        // Имитация ответа
        setTimeout(() => {
            const responses = [
                'Интересно! Расскажи подробнее',
                'Понятно :)',
                'Согласен с тобой!',
                'Отличная мысль!',
                'Спасибо за информацию!'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const currentChatName = document.getElementById('currentChatName').textContent;
            const usersFolder = getUsersFolder();
            const targetUser = Object.values(usersFolder).find(user => user.displayName === currentChatName);

            if (targetUser) {
                addMessageToChat(randomResponse, targetUser.id);
            }
        }, 1000 + Math.random() * 2000);
    }
}

// Обработка нажатия Enter
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});