import * as THREE from 'three';
export let paddleDirection = new THREE.Vector3();
export let player2PaddleDirection = new THREE.Vector3();
export let aiPaddleDirection = new THREE.Vector3();

export function initEventListeners() {

}


export function initControls() {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
}

// keyboard input for both player and player 2 (or AI)
function onKeyDown(event) {
    switch (event.code) {
        case 'ArrowUp':
            paddleDirection.z = -1;
            break;
        case 'ArrowDown':
            paddleDirection.z = 1;
            break;
        case 'ArrowLeft':
            paddleDirection.x = -1;
            break;
        case 'ArrowRight':
            paddleDirection.x = 1;
            break;
        case 'KeyW':
            player2PaddleDirection.z = -1;
            break;
        case 'KeyS':
            player2PaddleDirection.z = 1;
            break;
        case 'KeyA':
            player2PaddleDirection.x = -1;
            break;
        case 'KeyD':
            player2PaddleDirection.x = 1;
            break;
    }
}

// keyboard release for both player and player 2 (or AI)
function onKeyUp(event) {
    switch (event.code) {
        case 'ArrowUp':
        case 'ArrowDown':
            paddleDirection.z = 0;
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            paddleDirection.x = 0;
            break;
        case 'KeyW':
        case 'KeyS':
            player2PaddleDirection.z = 0;
            break;
        case 'KeyA':
        case 'KeyD':
            player2PaddleDirection.x = 0;
            break;
    }
}
