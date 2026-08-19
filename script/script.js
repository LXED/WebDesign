document.addEventListener('DOMContentLoaded', function () {
    const actionBtn = document.getElementById('action-btn');
    const message = document.getElementById('message');

    if (!actionBtn || !message) return;

    actionBtn.addEventListener('click', function () {
        message.textContent = 'Hello! You clicked the button.';
    });
});
