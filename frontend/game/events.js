import * as THREE from 'three';
export let paddleDirection = new THREE.Vector3();
export let player2PaddleDirection = new THREE.Vector3();
export let aiPaddleDirection = new THREE.Vector3();


export function initControls() {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
}

// keyboard input for both player and player 2 (or AI)
function onKeyDown(event) {
    switch (event.code) {
        case 'KeyD':
            paddleDirection.z = -1;
            break;
        case 'KeyA':
            paddleDirection.z = 1;
            break;
        case 'KeyW':
            paddleDirection.x = -1;
            break;
        case 'KeyS':
            paddleDirection.x = 1;
            break;
        case 'ArrowRight':
            player2PaddleDirection.z = -1;
            break;
        case 'ArrowLeft':
            player2PaddleDirection.z = 1;
            break;
        case 'ArrowUp':
            player2PaddleDirection.x = -1;
            break;
        case 'ArrowDown':
            player2PaddleDirection.x = 1;
            break;
        // add more cases for additional keys for player 3(IJKL) and player 4(8456)
    }
}

// keyboard release for both player and player 2 (or AI)
function onKeyUp(event) {
    switch (event.code) {
        case 'KeyD':
        case 'KeyA':
            paddleDirection.z = 0;
            break;
        case 'KeyW':
        case 'KeyS':
            paddleDirection.x = 0;
            break;
        case 'ArrowRight':
        case 'ArrowLeft':
            player2PaddleDirection.z = 0;
            break;
        case 'ArrowUp':
        case 'ArrowDown':
            player2PaddleDirection.x = 0;
            break;
    }
}
