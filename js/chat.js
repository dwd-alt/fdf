function renderContacts() {
    const contactsList = document.getElementById('contactsList');
    const currentUser = getCurrentUser();

    // Берем только ОБЩИХ пользователей для списка контактов
    const sharedUsers = getSharedUsers();

    contactsList.innerHTML = '';

    Object.values(sharedUsers).forEach(user => {
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

    console.log('Контакты загружены:', Object.values(sharedUsers).length);
}