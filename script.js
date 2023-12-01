document.addEventListener('DOMContentLoaded', function () {
    const paddle = document.getElementById('paddle');
    const ball = document.getElementById('ball');
    const bricks = document.querySelectorAll('.brick');

    let ballX = 240;
    let ballY = 150;
    let ballSpeedX = 3;
    let ballSpeedY = 3;

    function updateGame() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Check collision with walls
        if (ballX < 0 || ballX > 460) {
            ballSpeedX = -ballSpeedX;
        }

        if (ballY < 0 || ballY > 310) {
            ballSpeedY = -ballSpeedY;
        }

        // Check collision with paddle
        if (
            ballY >= 300 &&
            ballY <= 310 &&
            ballX >= paddle.offsetLeft &&
            ballX <= paddle.offsetLeft + 80
        ) {
            ballSpeedY = -ballSpeedY;
        }

        // Check collision with bricks
        bricks.forEach(brick => {
            if (
                ballY <= brick.offsetTop + brick.offsetHeight &&
                ballY + 20 >= brick.offsetTop &&
                ballX >= brick.offsetLeft &&
                ballX <= brick.offsetLeft + brick.offsetWidth
            ) {
                brick.style.visibility = 'hidden';
                ballSpeedY = -ballSpeedY;
            }
        });

        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';

        requestAnimationFrame(updateGame);
    }

    document.addEventListener('mousemove', function (event) {
        const mouseX = event.clientX;
        paddle.style.left = mouseX - 40 + 'px';
    });

    updateGame();
});
