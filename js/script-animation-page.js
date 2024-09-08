document.addEventListener('DOMContentLoaded', function () {
    // Плавне завантаження сторінки
    document.body.classList.add('fade-in-active');

    // Отримуємо всі посилання на сторінці
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="javascript:"])');

    // Лоадер і контент
    const loader = document.getElementById('loader');
    const content = document.getElementById('contentAll');

    // Додаємо обробник події для всіх посилань
    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Зупиняємо звичайну дію посилання

            // Прибираємо контент (fade-out)
            content.classList.add('fade-out');

            // Відображаємо лоадер після того, як контент зник
            setTimeout(function () {
                loader.style.display = 'flex';

                // Перехід на нову сторінку з затримкою для лоадера
                setTimeout(function () {
                    window.location.href = link.href;
                }, 1500); // Затримка для лоадера
            }, 800); // Час для зникнення контенту
        });
    });
});
