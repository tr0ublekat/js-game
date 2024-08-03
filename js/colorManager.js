// colorManager.js
export function initColorManager() {
    const currentColorElement = document.getElementById("current-color");
    const gameOverElement = document.getElementById("game-over");
    const timerElement = document.getElementById("timer");
    const colors = ["red", "blue", "green", "yellow"];
    let currentColor = colors[0]; // Начальный цвет
    let isGameOver = false;
    let timeLeft = 5; // Время до смены цвета в секундах

    function updateCurrentColor() {
        if (isGameOver) return; // Не обновляем цвет, если игра окончена

        currentColor = colors[Math.floor(Math.random() * colors.length)];
        currentColorElement.textContent = `Color: ${currentColor}`;
        timeLeft = 5; // Сбрасываем таймер
    }

    function updateTimer() {
        if (isGameOver) return; // Не обновляем таймер, если игра окончена

        timeLeft -= 1;
        if (timeLeft <= 0) {
            updateCurrentColor(); // Смена цвета по истечении времени
        }
        timerElement.textContent = `Time left: ${timeLeft}s`;
    }

    setInterval(updateTimer, 1000); // Обновляем таймер каждую секунду
    setInterval(updateCurrentColor, 5000); // Обновляем текущий цвет каждые 5 секунд

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
