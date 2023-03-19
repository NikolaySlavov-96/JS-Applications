
const notificationId = document.getElementById('errorBox');

export const notification = (data) => {
    notificationId.style.display = 'block';
    notificationId.querySelector('span').textContent = data;

    setTimeout(() => notificationId.style.display = 'none', 3000);
}