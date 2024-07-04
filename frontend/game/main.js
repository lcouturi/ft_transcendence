import * as THREE from 'three';
import { initMaterials } from './materials.js';
import { initGeometry } from './geometry.js';
import { initRenderer, resizeCanvasToDisplaySize } from './renderer.js';
import { initGUI, loadSavedParameters} from './gui.js';
import { initScene, initCamera, initLights, initStats } from './initialize.js';
import { initEventListeners, initControls, player2PaddleDirection } from './events.js';
import { initStarField, updateStars } from './objects.js';
import { initEffectComposer } from './composer.js';
import { g } from './globals.js';

import {
    updateLighting,
    movePlayerPaddle,
    movePlayer2Paddle,
    moveAIPaddle,
    moveBall,
    handleCollisions,
    checkMissedBall,
    checkBounds,
    initScoreDisplay,
    orbitalRotation,
} from './animation.js';

init();
animate();

function init() {
    loadSavedParameters();
    g.container = document.getElementById('container');    // Get the container element from the HTML document
    initScene();                                           // Initialize the scene
    initCamera();                                          // Initialize the camera
    initLights();                                          // Initialize the lights
    initStats();                                           // Initialize the stats
    initMaterials();                                       // Initialize the materials
    initGeometry();                                        // Initialize the geometry
    initStarField();                                       // Initialize the star field
    initRenderer(animate);                                 // Initialize the renderer
    initGUI();                                             // Initialize the GUI
    initControls();                                        // Setup the controls for the player paddle
    initEventListeners();                                  // Initialize event listeners
    initScoreDisplay();                                    // Initialize the score display
    initEffectComposer();                                  // Initialize the effect composer
}

function animate() {
    resizeCanvasToDisplaySize();
    updateLighting();
    movePlayerPaddle();
    if (!g.isSinglePlayer) {
        movePlayer2Paddle();
    } else {
        moveAIPaddle();
    }
    moveBall();
    handleCollisions();
    checkMissedBall();
    checkBounds();
    orbitalRotation();
    g.renderer.render(g.scene, g.camera);
    // g.composer.render(); // Uncomment this line to enable post-processing effects
    updateStars();
    g.stats.update();
}
