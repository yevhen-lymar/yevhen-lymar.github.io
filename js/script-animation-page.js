// Отримуємо всі посилання на сторінці
const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="javascript:"])');

// Додаємо обробник подій для кожного посилання
links.forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Забороняємо негайний перехід
        document.getElementById('loader').style.display = 'block'; // Показуємо лоадер

        setTimeout(function () {
            window.location.href = link.href; // Переходимо на іншу сторінку після затримки
        }, 1000); // Можна налаштувати час затримки
    });
});