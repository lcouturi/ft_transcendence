import * as THREE from 'three';
import { initMaterials } from './materials.js';
import { initGeometry } from './geometry.js';
import { initRenderer } from './renderer.js';
import { initGUI, loadSavedParameters} from './gui.js';
import { initScene, initCamera, initLights, initStats, onWindowResize } from './initialize.js';
import { initControls, player2PaddleDirection } from './events.js';
import { initStarField, updateStars } from './objects.js';
import { initEffectComposer } from './composer.js';
import { g } from './globals.js';

import {
    updateLighting,
    movePlayerPaddle,
    movePlayer2Paddle,
    movePlayer3Paddle,
    movePlayer4Paddle,
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
    console.log('Setting g.container');
    g.container = document.getElementById('container');    // Get the container element from the HTML document
    console.log('g.container set to:', g.container);
    loadSavedParameters();
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
    initScoreDisplay();                                    // Initialize the score display
    // initEffectComposer();                                  // Initialize the effect composer
}

function animate() {
    onWindowResize();
    updateLighting();
    movePlayerPaddle();
    if (!g.isSinglePlayer) {
        movePlayer2Paddle();
        movePlayer3Paddle();
        movePlayer4Paddle();
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

/*
Multiplayer mode ToDo
- Fix speed of 2nd player (AI parameters)
- Add colors to paddles
- Fix boundaries for 2nd player
- Add GUI for multiplayer mode
    - When enabled and disabled player 2 and 3 paddles should be hidden
*/
