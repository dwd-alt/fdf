// Поиск пользователей
function searchUsers() {
    const searchTerm = document.getElementById('searchUserInput').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    const currentUser = getCurrentUser();

    if (!searchTerm) {
        resultsContainer.style.display = 'none';
        return;
    }

    const usersFolder = getUsersFolder();
    const matchingUsers = Object.values(usersFolder).filter(user =>
        user.id !== currentUser.id &&
        (user.username.toLowerCase().includes(searchTerm.replace('@', '')) ||
         user.handle.toLowerCase().includes(searchTerm) ||
         user.displayName.toLowerCase().includes(searchTerm))
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
                    <div class="contact-status">${user.status} • ${user.mode === 'business' ? '💼 Бизнес' : '👤 Личный'}</div>
                </div>
            </div>
        `).join('');
    }

    resultsContainer.style.display = 'block';
}

// Начать чат с пользователем
function startChatWithUser(userId) {
    const user = getUserById(userId);

    if (user) {
        selectChat(userId);
        document.getElementById('searchUserInput').value = '';
        document.getElementById('searchResults').style.display = 'none';
    }
}