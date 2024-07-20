import * as THREE from 'three';
export let paddleDirection = new THREE.Vector3();
export let player2PaddleDirection = new THREE.Vector3();
export let player3PaddleDirection = new THREE.Vector3();
export let player4PaddleDirection = new THREE.Vector3();
export let aiPaddleDirection = new THREE.Vector3();


export function initControls() {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
}

// keyboard input
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
        case 'KeyI':
            player3PaddleDirection.x = -1;
            break;
        case 'KeyK':
            player3PaddleDirection.x = 1;
            break;
        case 'KeyJ':
            player3PaddleDirection.z = 1;
            break;
        case 'KeyL':
            player3PaddleDirection.z = -1;
            break;
        case 'Numpad8':
            player4PaddleDirection.x = -1;
            break;
        case 'Numpad5':
            player4PaddleDirection.x = 1;
            break;
        case 'Numpad4':
            player4PaddleDirection.z = 1;
            break;
        case 'Numpad6':
            player4PaddleDirection.z = -1;
            break;
    }
}

// keyboard release
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

        case 'KeyI':
        case 'KeyK':
            player3PaddleDirection.x = 0;
            break;

        case 'KeyJ':
        case 'KeyL':
            player3PaddleDirection.z = 0;
            break;

        case 'Numpad8':
        case 'Numpad5':
            player4PaddleDirection.x = 0;
            break;

        case 'Numpad4':
        case 'Numpad6':
            player4PaddleDirection.z = 0;
            break;
    }
}
