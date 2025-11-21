// Инициализация при загрузке
window.onload = function() {
    initializeDatabase(); // Это теперь включает инициализацию ОБЩЕЙ базы
    selectMode(CONFIG.MODES.PERSONAL);

    // Проверяем, авторизован ли пользователь
    const currentUser = getCurrentUser();
    if (currentUser) {
        showMessenger();
    }
};