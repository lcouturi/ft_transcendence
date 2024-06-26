import * as THREE from 'three';
import { initMaterials } from './materials.js';                                     // materials used in the scene (e.g., floor material, paddle material, etc.)
import { initGeometry } from './geometry.js';                                       // geometry used in the scene (e.g., floor geometry, paddle geometry, etc.)
import { initRenderer } from './renderer.js';                                       // renderer used to render the scene. It also takes a callback function that is called on each frame of the animation loop.
import { initGUI } from './gui.js';                                                 // a graphical user interface (GUI) for adjusting parameters in the scene
import { bulbLuminousPowers, hemiLuminousIrradiances, params } from './utils.js';   // utility functions and parameters used in the scene
import { updateLighting, movePlayerPaddle, moveAIPaddle, moveBall, handleCollisions, checkMissedBall, checkBounds } from './animation.js'; // functions for updating lighting, moving paddles, moving the ball, handling collisions, and checking bounds
import { addStars, initGlassSphere, initStarField, updateStars } from './objects.js'; // objects in the scene (e.g., stars, glass sphere, etc.)
import { initScene, initCamera, initLights, initStats } from './initialize.js';
import { initEventListeners, initControls, paddleDirection, aiPaddleDirection } from './events.js'; // event listeners for window resize events and keyboard input

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
    floor: null
};

init();     // Initialize the scene
animate();  // Start animation loop

function init() {
    g.container = document.getElementById('container');     // Get the container element from the HTML document
    initScene(g);                                           // Initialize the scene
    initCamera(g);                                          // Initialize the camera
    initLights(g);                                          // Initialize the lights
    initStats(g);                                           // Initialize the stats
    initMaterials(g);                                       // Initialize the materials
    initGeometry(g);                                        // Initialize the geometry
    initStarField(g);                                       // Initialize the star field
    initRenderer(g, animate);                               // Initialize the renderer
    initGUI();                                              // Initialize the GUI
    initControls();                                         // Setup the controls for the player paddle
    initEventListeners();                                   // Initialize event listeners
}

function animate() {
    updateLighting(params, g.previousShadowMap, g.floorMat, g.renderer, g.bulbLight, g.bulbMat, g.hemiLight, bulbLuminousPowers, hemiLuminousIrradiances);
    movePlayerPaddle(g.paddleMesh, paddleDirection, params);
    moveAIPaddle(g.aiPaddleMesh, aiPaddleDirection, g.bulbLight, params);
    moveBall(g.bulbLight, g.ballVelocity);
    handleCollisions(g.bulbLight, g.paddleMesh, g.aiPaddleMesh, g.ballVelocity, params);
    checkMissedBall(g.bulbLight, g.ballVelocity, params);
    checkBounds(g.paddleMesh, params);
    g.renderer.render(g.scene, g.camera);
    updateStars(g);
    g.stats.update();
}
