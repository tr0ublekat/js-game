// fallingObjects.js
export function initFallingObjects(container) {
    const fallingObjectsContainer = document.getElementById("falling-objects");
    const objectSize = 30;
    const fallSpeed = 2;

    function createFallingObject() {
        const fallingObject = document.createElement("div");
        fallingObject.className = "falling-object";
        fallingObject.style.width = `${objectSize}px`;
        fallingObject.style.height = `${objectSize}px`;
        fallingObject.style.backgroundColor = "red";
        fallingObject.style.position = "absolute";
        fallingObject.style.left = `${
            Math.random() * (container.clientWidth - objectSize)
        }px`;
        fallingObject.style.top = "0px";
        fallingObject.style.transform = "translateY(0)";
        fallingObjectsContainer.appendChild(fallingObject);

        function updatePosition() {
            const rect = fallingObject.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            if (rect.top < containerRect.bottom) {
                const currentTranslateY =
                    parseFloat(
                        fallingObject.style.transform
                            .replace("translateY(", "")
                            .replace("px)", "")
                    ) || 0;
                fallingObject.style.transform = `translateY(${
                    currentTranslateY + fallSpeed
                }px)`;
                requestAnimationFrame(updatePosition);
            } else {
                fallingObject.remove();
            }
        }

        updatePosition();
    }

    function startFallingObjects() {
        setInterval(createFallingObject, 1500);
        createFallingObject();
    }

    return {
        start: startFallingObjects,
    };
}
