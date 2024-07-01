import * as THREE from 'three';
import { initMaterials } from './materials.js';               // Import materials initialization
import { initGeometry } from './geometry.js';                 // Import geometry initialization
import { initRenderer } from './renderer.js';                 // Import renderer initialization
import { initGUI, loadSavedParameters} from './gui.js';                           // Import GUI setup
import { initScene, initCamera, initLights, initStats } from './initialize.js'; // Import scene, camera, lights, and stats initialization
import { initEventListeners, initControls, player2PaddleDirection } from './events.js'; // Import event listeners and controls
import { initStarField, updateStars } from './objects.js';    // Import star field initialization and update
import { params } from './utils.js';                         // Import utility functions and parameters
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
} from './animation.js'; // Import animation-related functions
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';


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
    borderColor: 0x00ff00,                  // Border color object
    paddleMesh: null,                         // Player paddle mesh object
    aiPaddleMesh: null,                       // AI paddle mesh object
    ballVelocity: new THREE.Vector3(0, 0, 5), // Ball velocity vector
    previousShadowMap: false,                 // Previous shadow map state
    starPool: [],                             // Pool of star objects
    numStars: 5000,                           // Number of stars
    starsSpeed: 0.2,                          // Speed of stars
    startSize: 0.01,                          // Size of stars
    starColor: { color: '#ffffff' },          // Color of stars
    floor: null,                              // Floor object
    playerScore: 0,                           // Player score
    aiScore: 0,                               // AI score
    playerScoreText: null,                    // Player score text
    aiScoreText: null,                        // AI score text
    limitScore: 9999,                         // Score limit
    ballSpeed: 0.016,                         // Ball speed
    orbitRadius: 20,                          // Radius of the orbit
    orbitSpeed: 0.002,                        // Speed of the orbit
    orbitCenter: new THREE.Vector3(0, 0, 0),  // Center point of the orbit (table position)
    orbitAngle: 0,                            // Current angle in the orbit
    isOrbiting: false,                        // Flag to enable/disable orbiting
    isSinglePlayer: true,                     // Flag to track if the game is single-player or multiplayer
    player2PaddleMesh: null,                  // Player 2 paddle mesh object
    player2PaddleSpeed: 0.016,                // Player 2 paddle speed
    localStorage: window.localStorage,        // Local storage object
    prevPaddlePosition: new THREE.Vector3(),  // Previous paddle position
    prevAIPaddlePosition: new THREE.Vector3(),// Previous AI paddle position
    paddleVelocity: new THREE.Vector3(0, 0, 0),// Paddle velocity vector
    aiPaddleVelocity: new THREE.Vector3(0, 0, 0),// AI paddle velocity vector
    composer: null,
    bloomPass: null,
    bloomStrength: 0,
    bloomRadius: 0,
    bloomThreshold: 0,
    playerPaddleColor: 0x00ff00,
    aiPaddleColor: 0xff0000,
    emissiveIntensity: 1,
};

// Initialize the scene
init();

// Start animation loop
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

    // Initialize Effect Composer and Bloom Pass
    const renderPass = new RenderPass(g.scene, g.camera);
    g.bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        g.bloomStrength,
        g.bloomRadius,
        g.bloomThreshold
    );
    g.composer = new EffectComposer(g.renderer);
    g.composer.addPass(renderPass);
    g.composer.addPass(g.bloomPass);
}



function animate() {
    updateLighting();       // Update lighting in the scene
    movePlayerPaddle();     // Move player paddle
    if (!g.isSinglePlayer) {
        movePlayer2Paddle(); // Player 2 controls
    } else {
        moveAIPaddle();      // AI
    }
    moveBall();             // Move the ball
    handleCollisions();     // Handle collisions
    checkMissedBall();      // Check if the ball has missed
    checkBounds();          // Check bounds
    orbitalRotation();      // Orbit the camera
    g.renderer.render(g.scene, g.camera); // Render the scene
    // g.composer.render();    // Render the scene with the effect composer
    updateStars();          // Update the star field
    g.stats.update();       // Update performance stats
}
