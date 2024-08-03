export function initPlayerMovement(player, container) {
    let playerPositionX = 0;

    document.addEventListener("keydown", function (event) {
        const keyChar = event.key;

        const containerRect = container.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();
        const maxPositionX = containerRect.width - playerRect.width;

        if (keyChar === "a" || keyChar === "ф") {
            playerPositionX -= 20;
        } else if (keyChar === "d" || keyChar === "в") {
            playerPositionX += 20;
        }

        playerPositionX = Math.max(0, Math.min(playerPositionX, maxPositionX));

        player.style.transform = `translate(${playerPositionX}px)`;
    });
}
