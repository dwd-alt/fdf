function showMessenger() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    document.getElementById('authContainer').style.display = 'none';
    document.getElementById('messengerContainer').classList.add('active');

    document.getElementById('currentUserName').textContent = currentUser.displayName;
    document.getElementById('currentUserAvatar').textContent = currentUser.avatar;

    renderContacts();
}

function renderContacts() {
    const contactsList = document.getElementById('contactsList');
    const currentUser = getCurrentUser();
    const users = getAllUsers();

    contactsList.innerHTML = '';

    Object.values(users).forEach(user => {
        if (user.id === currentUser.id) return;

        const contactElement = document.createElement('div');
        contactElement.className = 'contact';
        contactElement.onclick = () => selectChat(user.id);

        contactElement.innerHTML = `
            <div class="contact-avatar">${user.avatar}</div>
            <div>
                <div style="font-weight: 600;">${user.displayName}</div>
                <div style="font-size: 12px; color: #666;">${user.status}</div>
            </div>
        `;

        contactsList.appendChild(contactElement);
    });
}

function selectChat(userId) {
    const users = getAllUsers();
    const user = users[userId];
    const currentUser = getCurrentUser();

    if (!user) return;

    document.getElementById('currentChatName').textContent = user.displayName;
    document.getElementById('currentChatAvatar').textContent = user.avatar;
    document.getElementById('currentChatStatus').textContent = user.status;

    document.getElementById('messageInput').disabled = false;
    document.getElementById('messageInput').placeholder = 'Введите сообщение...';

    loadChatHistory(userId);
}

function loadChatHistory(userId) {
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = '';

    // Демо-сообщения
    const demoMessages = [
        { text: 'Привет! Как дела?', sender: userId, time: '10:30' },
        { text: 'Привет! Все отлично!', sender: getCurrentUser().id, time: '10:31' }
    ];

    demoMessages.forEach(msg => {
        addMessageToChat(msg.text, msg.sender, msg.time, false);
    });
}

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
        <div>${text}</div>
        <div style="font-size: 11px; opacity: 0.7; text-align: right; margin-top: 5px;">${time}</div>
    `;

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();

    if (text) {
        addMessageToChat(text, getCurrentUser().id);
        input.value = '';

        setTimeout(() => {
            const responses = ['Привет!', 'Как дела?', 'Интересно!'];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const currentChatName = document.getElementById('currentChatName').textContent;
            const users = getAllUsers();
            const targetUser = Object.values(users).find(user => user.displayName === currentChatName);

            if (targetUser) {
                addMessageToChat(randomResponse, targetUser.id);
            }
        }, 1000);
    }
}

// Enter для отправки
document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});