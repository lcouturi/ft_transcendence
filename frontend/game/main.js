import * as THREE from 'three';
import { initMaterials } from './materials.js';                                     // materials used in the scene (e.g., floor material, paddle material, etc.)
import { initGeometry } from './geometry.js';                                       // geometry used in the scene (e.g., floor geometry, paddle geometry, etc.)
import { initRenderer } from './renderer.js';                                       // renderer used to render the scene. It also takes a callback function that is called on each frame of the animation loop.
import { initGUI } from './gui.js';                                                 // a graphical user interface (GUI) for adjusting parameters in the scene
import { initScene, initCamera, initLights, initStats } from './initialize.js';
import { bulbLuminousPowers, hemiLuminousIrradiances } from './utils.js';   // utility functions and parameters used in the scene
import { initEventListeners, initControls, paddleDirection, aiPaddleDirection } from './events.js'; // event listeners for window resize events and keyboard input
import { initStarField, updateStars } from './objects.js'; // objects in the scene (e.g., stars, glass sphere, etc.)
import { updateLighting,
         movePlayerPaddle,
         moveAIPaddle,
         moveBall,
         handleCollisions,
         checkMissedBall,
         checkBounds,
         initScoreDisplay } from './animation.js'; // functions for updating lighting, moving paddles, moving the ball, handling collisions, and checking bounds

// Initialization of global variables
export const g = {
    container: null,                          // Container object (holds the renderer's DOM element)
    camera: null,                             // Camera object (controls the view of the scene)
    scene: null,                              // Scene object (holds all the objects, lights, and cameras)
    renderer: null,                           // Renderer object (renders the scene using WebGL)
    bulbLight: null,                          // Bulb light object (light source)
    bulbMat: null,                            // Bulb material object (material for the bulb light)
    hemiLight: null,                          // Hemisphere light object (ambient light source)
    stats: null,                              // Stats object (monitors performance stats)
    floorMat: null,                           // Floor material object
    floorMesh: null,                          // Floor mesh object
    paddleMesh: null,                         // Player paddle mesh object
    aiPaddleMesh: null,                       // AI paddle mesh object
    ballVelocity: new THREE.Vector3(0, 0, 5), // Ball velocity vector
    previousShadowMap: false,                 // Previous shadow map state
    starPool: [],                             // Pool of star objects
    numStars: 5000,                           // Number of stars
    starsSpeed: 0.2,                          // Speed of stars
    floor: null,                              // Floor object
    playerScore: 0,                           // Player score
    aiScore: 0,                               // AI score
    playerScoreText: null,                    // Player score text
    aiScoreText: null,                        // AI score text
    limitScore: 9999                          // Score limit
};

init();     // Initialize the scene
animate();  // Start animation loop

function init() {
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
}

function animate() {
    updateLighting(bulbLuminousPowers, hemiLuminousIrradiances);
    movePlayerPaddle(paddleDirection);
    moveAIPaddle(aiPaddleDirection);
    moveBall();
    handleCollisions();
    checkMissedBall();
    checkBounds();
    g.renderer.render(g.scene, g.camera);
    updateStars();
    g.stats.update();
}
