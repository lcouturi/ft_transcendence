import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';  // a library for monitoring performance stats (e.g., frames per second).
import { initBulbLight } from './lights.js';            // lighting in the scene (e.g., ambient light, point light, etc.)
import { g } from './main.js';                          // global variables

export function initScene() {
    g.scene = new THREE.Scene(); // Create a new scene object (holds all the objects, lights, and cameras)
}

export function initCamera() {
    g.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100); // Create a new camera object
    g.camera.position.set(0, 15, 25);                                                             // Set the camera position
    window.addEventListener('resize', onWindowResize(g));                                            // Add an event listener for window resize events(when the window is resized, the camera aspect ratio and projection matrix are updated)
}

export function onWindowResize() {
    g.camera.aspect = window.innerWidth / window.innerHeight;  // Update the camera aspect ratio
    g.camera.updateProjectionMatrix();                         // Update the camera projection matrix
    if (g.renderer)                                            // Check if the renderer exists
        g.renderer.setSize(window.innerWidth, window.innerHeight); // Update the renderer size
}

export function initLights() {
    const lights = initBulbLight(g.scene);
    g.bulbLight = lights.bulbLight;       // Get the bulb light from the lights object
    g.bulbMat = lights.bulbMat;           // Get the bulb material from the lights object
    g.hemiLight = lights.hemiLight;       // Get the hemisphere light from the lights object
}

export function initStats() {
    g.stats = new Stats();                   // Create a new Stats object
    g.stats.showPanel(0);                    // Show the first panel (frames per second)
    document.body.appendChild(g.stats.dom);  // Add the stats to the document body
}


