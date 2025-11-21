function searchUsers() {
    const searchTerm = document.getElementById('searchUserInput').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    const currentUser = getCurrentUser();

    if (!searchTerm) {
        resultsContainer.style.display = 'none';
        return;
    }

    const users = getAllUsers();
    const matchingUsers = Object.values(users).filter(user =>
        user.id !== currentUser.id &&
        (user.username.includes(searchTerm) || user.displayName.toLowerCase().includes(searchTerm))
    );

    if (matchingUsers.length === 0) {
        resultsContainer.innerHTML = '<div style="padding: 15px; text-align: center;">Пользователи не найдены</div>';
    } else {
        resultsContainer.innerHTML = matchingUsers.map(user => `
            <div class="contact" onclick="startChatWithUser('${user.id}')">
                <div class="contact-avatar">${user.avatar}</div>
                <div>${user.displayName}</div>
            </div>
        `).join('');
    }

    resultsContainer.style.display = 'block';
}

function startChatWithUser(userId) {
    const users = getAllUsers();
    const user = users[userId];

    if (user) {
        selectChat(userId);
        document.getElementById('searchUserInput').value = '';
        document.getElementById('searchResults').style.display = 'none';
    }
}

// Скрываем результаты при клике вне
document.addEventListener('click', function(e) {
    if (!e.target.closest('.find-user')) {
        document.getElementById('searchResults').style.display = 'none';
    }
});