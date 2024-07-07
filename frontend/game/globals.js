import * as THREE from 'three';
import { bulbLuminousPowers, hemiLuminousIrradiances } from './utils.js';                         // Import utility functions and parameters

// Initialization of global variables
export const g = {
    // Rendering and Scene
    container: null,
    camera: null,
    scene: null,
    renderer: null,
    composer: null,
    stats: null,

    // Lighting
    bulbLight: null,
    bulbMat: null,
    hemiLight: null,
    bulbPower: Object.keys(bulbLuminousPowers)[6],
    hemiIrradiance: Object.keys(hemiLuminousIrradiances)[0],

    // Visual Effects
    bloomPass: null,
    bloomStrength: 0,
    bloomRadius: 0,
    bloomThreshold: 0,
    shadows: true,
    exposure: 3,
    emissiveIntensity: 1,

    // Game Environment
    floorMat: null,
    floorMesh: null,
    floor: null,
    borderColor: 0x00ff00,
    wallBoundary: 10,

    // Star Field
    starPool: [],
    numStars: 5000,
    starsSpeed: 0.2,
    startSize: 0.01,
    starColor: 0xffffff,

    // Game State
    playerScore: 0,
    aiScore: 0,
    playerScoreText: null,
    aiScoreText: null,
    limitScore: 9999,
    isSinglePlayer: true,
    isMultiplayer: false,

    // Ball Properties
    ballVelocity: new THREE.Vector3(0, 0, 5),
    ballSpeed: 0.016,

    // Player 1 Properties
    paddleMesh: null,
    paddleSpeed: 8,
    paddleBoundary: 9,
    playerPaddleColor: 0x00ff00,
    prevPaddlePosition: new THREE.Vector3(),
    paddleVelocity: new THREE.Vector3(0, 0, 0),


    // Player 3 Properties
    Player3PaddleMesh: null,
    Player3PaddleSpeed: 8,
    Player3PaddleBoundary: 9,
    Player3PaddleColor: 0x0f000f,
    Player3PrevPaddlePosition: new THREE.Vector3(),
    Player3PaddleVelocity: new THREE.Vector3(0, 0, 0),

    // Player 4 Properties
    Player4PaddleMesh: null,
    Player4PaddleSpeed: 8,
    Player4PaddleBoundary: 9,
    Player4PaddleColor: 0x0000ff,
    Player4PrevPaddlePosition: new THREE.Vector3(),
    Player4PaddleVelocity: new THREE.Vector3(0, 0, 0),

    // Player AI Properties
    aiPaddleMesh: null,
    aiPaddleSpeed: 8,
    aiPaddleColor: 0xff0000,
    prevAIPaddlePosition: new THREE.Vector3(),
    aiPaddleVelocity: new THREE.Vector3(0, 0, 0),
    tolerance: 0,
    easingFactor: 1,

    // Camera Orbit
    orbitRadius: 20,
    orbitSpeed: 0.002,
    orbitCenter: new THREE.Vector3(0, 0, 0),
    orbitAngle: 0,
    isOrbiting: false,

    // Miscellaneous
    previousShadowMap: 0,
    localStorage: window.localStorage,
};
