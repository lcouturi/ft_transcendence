import * as THREE from 'three';
import { bulbLuminousPowers, hemiLuminousIrradiances } from './utils.js';                         // Import utility functions and parameters

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
    ballVelocity: new THREE.Vector3(0, 0, 5),    // Ball velocity vector
    previousShadowMap: 0,                    // Previous shadow map state
    starPool: [],                                // Pool of star objects
    numStars: 5000,                              // Number of stars
    starsSpeed: 0.2,                             // Speed of stars
    startSize: 0.01,                             // Size of stars
    starColor: { color: "#ffffff" },             // Color of stars
    floor: null,                                 // Floor object
    playerScore: 0,                              // Player score
    aiScore: 0,                                  // AI score
    playerScoreText: null,                       // Player score text
    aiScoreText: null,                           // AI score text
    limitScore: 9999,                            // Score limit
    ballSpeed: 0.016,                            // Ball speed
    orbitRadius: 20,                             // Radius of the orbit
    orbitSpeed: 0.002,                           // Speed of the orbit
    orbitCenter: new THREE.Vector3(0, 0, 0),     // Center point of the orbit (table position)
    orbitAngle: 0,                               // Current angle in the orbit
    isOrbiting: false,                           // Flag to enable/disable orbiting
    isSinglePlayer: true,                        // Flag to track if the game is single-player or multiplayer
    player2PaddleMesh: null,                     // Player 2 paddle mesh object
    player2PaddleSpeed: 0.016,                   // Player 2 paddle speed
    localStorage: window.localStorage,           // Local storage object
    prevPaddlePosition: new THREE.Vector3(),     // Previous paddle position
    prevAIPaddlePosition: new THREE.Vector3(),   // Previous AI paddle position
    paddleVelocity: new THREE.Vector3(0, 0, 0),  // Paddle velocity vector
    aiPaddleVelocity: new THREE.Vector3(0, 0, 0),// AI paddle velocity vector
    composer: null,                              // Effect composer object
    bloomPass: null,                             // Bloom pass object
    bloomStrength: 0,                            // Bloom strength
    bloomRadius: 0,                              // Bloom radius
    bloomThreshold: 0,                           // Bloom threshold
    playerPaddleColor: 0x00ff00,                 // Player paddle color
    aiPaddleColor: 0xff0000,                     // AI paddle color
    emissiveIntensity: 1,                        // Emissive intensity
    paddleBoundary: 9,                          // Paddle boundary
    wallBoundary: 10,                                        // Wall boundary
    paddleSpeed: 8,                                          // Paddle speed
    aiPaddleSpeed: 8,                                        // AI paddle speed
    tolerance: 0,                                          // Tolerance for AI movement
    easingFactor: 1,                                       // Easing factor for AI movement
    shadows: true,                                           // Shadow flag
    exposure: 3,                                             // Exposure value
    bulbPower: Object.keys(bulbLuminousPowers)[6],           // Bulb power
    hemiIrradiance: Object.keys(hemiLuminousIrradiances)[0], // Hemispheric irradiance
};
