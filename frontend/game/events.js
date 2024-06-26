import * as THREE from 'three';
export let paddleDirection = new THREE.Vector3();
export let aiPaddleDirection = new THREE.Vector3();

export function initControls() {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
}

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
    }
}

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
    }
}

export function initEventListeners() {
    
}
