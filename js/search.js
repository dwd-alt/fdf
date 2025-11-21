function searchUsers() {
    const searchTerm = document.getElementById('searchUserInput').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    const currentUser = getCurrentUser();

    if (!searchTerm) {
        resultsContainer.style.display = 'none';
        return;
    }

    // Ищем в ОБЩИХ пользователях
    const sharedUsers = getSharedUsers();
    const matchingUsers = Object.values(sharedUsers).filter(user =>
        user.id !== currentUser.id &&
        (user.username.includes(searchTerm) ||
         user.displayName.toLowerCase().includes(searchTerm))
    );

    if (matchingUsers.length === 0) {
        resultsContainer.innerHTML = '<div style="padding: 15px; text-align: center;">Пользователи не найдены</div>';
    } else {
        resultsContainer.innerHTML = matchingUsers.map(user => `
            <div class="contact" onclick="startChatWithUser('${user.id}')">
                <div class="contact-avatar">${user.avatar}</div>
                <div>
                    <div style="font-weight: 600;">${user.displayName}</div>
                    <div style="font-size: 12px; color: #666;">${user.status}</div>
                </div>
            </div>
        `).join('');
    }

    resultsContainer.style.display = 'block';
}

function startChatWithUser(userId) {
    const allUsers = getAllUsers();
    const user = allUsers[userId];

    if (user) {
        selectChat(userId);
        document.getElementById('searchUserInput').value = '';
        document.getElementById('searchResults').style.display = 'none';

        console.log('Начат чат с:', user.displayName);
    }
}