export function initScore() {
    const scoreElement = document.getElementById("score");
    let score = 0;

    function increaseScore() {
        score++;
        scoreElement.textContent = `Score: ${score}`;
    }

    return {
        increaseScore,
    };
}
