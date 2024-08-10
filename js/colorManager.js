export function initColorManager() {
    const currentColorElement = document.getElementById("current-color");
    const gameOverElement = document.getElementById("game-over");
    const timerElement = document.getElementById("timer");
    const colors = ["red", "green"];
    let currentColor = colors[0]; // Начальный цвет
    let isGameOver = false;
    let timeLeft = 5; // Время до смены цвета в секундах

    function updateCurrentColor() {
        currentColor = colors[Math.floor(Math.random() * colors.length)];
        currentColorElement.style.backgroundColor = currentColor;
        timeLeft = 5; // Сбрасываем таймер
    }

    function updateTimerAndColor() {
        if (isGameOver) return;

        timeLeft -= 1;
        if (timeLeft <= 0) {
            updateCurrentColor(); // Смена цвета по истечении времени
        }
        timerElement.textContent = timeLeft; // Обновляем отображение таймера
    }

    setInterval(updateTimerAndColor, 1000); // Обновляем таймер каждую секунду и проверяем на смену цвета

    return {
        checkColor(fallingObject) {
            if (fallingObject.style.backgroundColor === currentColor) {
                return true;
            } else {
                gameOverElement.style.display = "block";
                isGameOver = true; // Устанавливаем состояние окончания игры
                return false;
            }
        },
        isGameOver: () => isGameOver, // Возвращаем текущее состояние окончания игры
    };
}
