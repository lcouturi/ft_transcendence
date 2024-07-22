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
    bulbPower: Object.keys(bulbLuminousPowers)[5],
    hemiIrradiance: Object.keys(hemiLuminousIrradiances)[0],

    // Visual Effects
    bloomPass: null,
    bloomStrength: 0,
    bloomRadius: 0,
    bloomThreshold: 0,
    shadows: true,
    exposure: 2,
    emissiveIntensity: 1,

    // Game Environment
    floorMat: null,
    floorMesh: null,
    floor: null,
    borderColor: 0x00ff00,
    wallBoundary: 10,
    middleTableBounds: -0.5,

    // Star Field
    starPool: [],
    numStars: 2500,
    starsSpeed: 0.05,
    startSize: 0.015,
    starColor: 0x0011ff,

    // Game State
    playerScore: 0,
    aiScore: 0,
    playerScoreText: null,
    aiScoreText: null,
    limitScore: 10,
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

    // Player 2 Properties
    Player2PaddleMesh: null,
    Player2PaddleSpeed: 8,
    Player2PaddleBoundary: 9,
    Player2PaddleColor: 0xff0000, // Red
    Player2PrevPaddlePosition: new THREE.Vector3(),
    Player2PaddleVelocity: new THREE.Vector3(0, 0, 0),


    // Player 3 Properties
    Player3PaddleMesh: null,
    Player3PaddleSpeed: 8,
    Player3PaddleBoundary: 9,
    Player3PaddleColor: 0x0000ff, // Blue
    Player3PrevPaddlePosition: new THREE.Vector3(),
    Player3PaddleVelocity: new THREE.Vector3(0, 0, 0),

    // Player 4 Properties
    Player4PaddleMesh: null,
    Player4PaddleSpeed: 8,
    Player4PaddleBoundary: 9,
    Player4PaddleColor: 0xffff00, // Yellow
    Player4PrevPaddlePosition: new THREE.Vector3(),
    Player4PaddleVelocity: new THREE.Vector3(0, 0, 0),

    // Player AI Properties
    aiPaddleMesh: null,
    aiPaddleSpeed: 8,
    aiPaddleColor: 0xff0000, // Red
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
