// Инициализация при загрузке
window.onload = function() {
    initializeDatabase();
    selectMode(CONFIG.MODES.PERSONAL);

    // Проверяем, авторизован ли пользователь
    const currentUser = getCurrentUser();
    if (currentUser) {
        showMessenger();
    }
};