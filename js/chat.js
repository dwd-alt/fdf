// Выбор чата
function selectChat(userId) {
    const user = getSharedUserById(userId); // Берем из ОБЩЕЙ базы
    const currentUser = getCurrentUser();

    if (!user) {
        // Если нет в общей базе, пробуем локальную
        const localUser = getUserById(userId);
        if (!localUser) return;

        user = localUser;
    }

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