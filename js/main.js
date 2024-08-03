import { initPlayerMovement } from "./player.js";
import { initFallingObjects } from "./fallingObjects.js";

document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById("player");
    const container = document.getElementById("container");

    initPlayerMovement(player, container);

    const fallingObjectsManager = initFallingObjects(container);
    fallingObjectsManager.start(); // Запуск бесконечного создания падающих объектов
});
