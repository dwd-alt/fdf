// Поиск пользователей
function searchUsers() {
    const searchTerm = document.getElementById('searchUserInput').value.trim();
    const resultsContainer = document.getElementById('searchResults');
    const currentUser = getCurrentUser();

    if (!searchTerm) {
        resultsContainer.style.display = 'none';
        return;
    }

    // Ищем в ОБЩЕЙ базе
    const matchingUsers = sharedDB.searchUsers(searchTerm).filter(user =>
        user.id !== currentUser.id
    );

    if (matchingUsers.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">Пользователи не найдены</div>';
    } else {
        resultsContainer.innerHTML = matchingUsers.map(user => `
            <div class="search-result" onclick="startChatWithUser('${user.id}')">
                <div class="contact-avatar">${user.avatar}</div>
                <div class="contact-info">
                    <div class="contact-name">${user.displayName}</div>
                    <div class="contact-handle">${user.handle}</div>
                    <div class="contact-status">${user.status}</div>
                </div>
            </div>
        `).join('');
    }

    resultsContainer.style.display = 'block';
}

// Начать чат с пользователем
function startChatWithUser(userId) {
    const users = getAllUsers();
    const user = users[userId] || sharedDB.getUser(userId);

    if (user) {
        selectChat(userId);
        document.getElementById('searchUserInput').value = '';
        document.getElementById('searchResults').style.display = 'none';
    }
}