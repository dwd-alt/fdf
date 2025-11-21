// Инициализация при загрузке
window.onload = function() {
    initializeDatabase();

    const currentUser = getCurrentUser();
    if (currentUser) {
        showMessenger();
    }

    console.log('Kilaib Messenger загружен!');
};