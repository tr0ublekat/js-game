import { initScore } from "./score.js";
import { initColorManager } from "./colorManager.js";

export function initFallingObjects(container) {
    const fallingObjectsContainer = document.getElementById("falling-objects");
    const player = document.getElementById("player");
    const scoreManager = initScore();
    const colorManager = initColorManager();
    const objectSize = 30; // Размер объектов
    const fallSpeed = 1.5; // Скорость падения
    let isGameOver = false;

    function createFallingObject() {
        if (isGameOver) return;

        const fallingObject = document.createElement("div");
        fallingObject.className = "falling-object";
        fallingObject.style.width = `${objectSize}px`;
        fallingObject.style.height = `${objectSize}px`;
        fallingObject.style.backgroundColor = [
            "red",
            "blue",
            "green",
        ][Math.floor(Math.random() * 3)]; // Случайный цвет объекта
        fallingObject.style.position = "absolute";
        fallingObject.style.left = `${Math.random() * (container.clientWidth - objectSize)
            }px`; // Случайная позиция по горизонтали
        fallingObject.style.top = "0px";
        fallingObject.style.transform = "translateY(0)";
        fallingObjectsContainer.appendChild(fallingObject);

        function updatePosition() {
            if (isGameOver) return;

            const rect = fallingObject.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const playerRect = player.getBoundingClientRect();

            if (
                rect.bottom >= playerRect.top &&
                rect.top <= playerRect.bottom &&
                rect.left < playerRect.right &&
                rect.right > playerRect.left
            ) {
                // Соприкосновение с игроком
                if (colorManager.checkColor(fallingObject)) {
                    scoreManager.increaseScore();
                    fallingObject.remove();
                } else {
                    isGameOver = true;
                    document.getElementById("game-over").style.display =
                        "block"; // Показ сообщения Game Over
                    return;
                }
            } else if (rect.top < containerRect.bottom) {
                const currentTranslateY =
                    parseFloat(
                        fallingObject.style.transform
                            .replace("translateY(", "")
                            .replace("px)", "")
                    ) || 0;
                fallingObject.style.transform = `translateY(${currentTranslateY + fallSpeed
                    }px)`; // Падение объекта
                requestAnimationFrame(updatePosition);
            } else {
                fallingObject.remove(); // Удаление объекта, если он вышел из контейнера
            }
        }

        updatePosition(); // Запуск обновления позиции
    }

    function startFallingObjects() {
        setInterval(createFallingObject, 500); // Создаем объект по таймеру в мс
    }

    return {
        start: startFallingObjects,
    };
}
