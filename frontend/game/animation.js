import * as THREE from 'three';
import { initControls, paddleDirection, aiPaddleDirection } from './events.js';

export function updateLighting(params, previousShadowMap, floorMat, renderer, bulbLight, bulbMat, hemiLight, bulbLuminousPowers, hemiLuminousIrradiances) {
    renderer.toneMappingExposure = Math.pow(params.exposure, 5.0);  // Update the tone mapping exposure (brightness of the scene)
    renderer.shadowMap.enabled = params.shadows;                    // Enable or disable shadows
    bulbLight.castShadow = params.shadows;                          // Enable or disable shadow casting for the bulb light

    // Update the floor material if the shadow map state has changed
    if (params.shadows !== previousShadowMap) {
        floorMat.needsUpdate = true;
        previousShadowMap = params.shadows;
    }

    // Update the bulb light power, bulb material emissive intensity, and hemisphere light intensity
    bulbLight.power = bulbLuminousPowers[params.bulbPower];                 // Update the bulb light power
    bulbMat.emissiveIntensity = bulbLight.intensity / Math.pow(0.02, 2.0);  // Update the bulb material emissive intensity
    hemiLight.intensity = hemiLuminousIrradiances[params.hemiIrradiance];   // Update the hemisphere light intensity
}

export function movePlayerPaddle(paddleMesh, paddleDirectionm, params) {
    paddleMesh.position.x += paddleDirection.x * params.paddleSpeed * 0.016; // Move the paddle in the x direction
    paddleMesh.position.z += paddleDirection.z * params.paddleSpeed * 0.016; // Move the paddle in the z direction
}

export function moveAIPaddle(aiPaddleMesh, aiPaddleDirection, bulbLight, params) {
    const targetX = Math.max(Math.min(bulbLight.position.x,  params.paddleBoundary),  -params.paddleBoundary); // Clamp to boundaries
    const distanceToTarget = targetX - aiPaddleMesh.position.x;

    if (Math.abs(distanceToTarget) > params.tolerance) { // Apply tolerance
        aiPaddleDirection.x = distanceToTarget * params.easingFactor; // Smooth movement
    } else {
        aiPaddleDirection.x = 0; // Stop if within tolerance
    }
    aiPaddleMesh.position.x += aiPaddleDirection.x * params.aiPaddleSpeed * 0.016;
}

export function moveBall(bulbLight, ballVelocity) {
    bulbLight.position.add(ballVelocity.clone().multiplyScalar(0.016));
    // .clone() is used to avoid modifying the original vector
    // 0.016 is the time delta between frames (60 frames per second)
}

export function handleCollisions(bulbLight, paddleMesh, aiPaddleMesh, ballVelocity, params) {
    // Ball and paddle collision detection
    const ballBox = new THREE.Box3().setFromObject(bulbLight);        // Create a bounding box for the ball
    const paddleBox = new THREE.Box3().setFromObject(paddleMesh);     // Create a bounding box for the player paddle
    const aiPaddleBox = new THREE.Box3().setFromObject(aiPaddleMesh); // Create a bounding box for the AI paddle

    // Check for collision between the ball and the player paddle
    if (ballBox.intersectsBox(paddleBox)) {
        const impactX = bulbLight.position.x - paddleMesh.position.x;

        // Adjust ball's velocity
        ballVelocity.z = -Math.abs(ballVelocity.z); // Always move away from the paddle
        ballVelocity.x += impactX * 0.8; // Adjust x velocity based on impact point
    }

    // Check collision with AI paddle
    if (ballBox.intersectsBox(aiPaddleBox)) {
        // Calculate impact point relative to AI paddle center
        const impactX = bulbLight.position.x - aiPaddleMesh.position.x;

        // Adjust ball's velocity
        ballVelocity.z = Math.abs(ballVelocity.z); // Always move away from the paddle
        ballVelocity.x += impactX * 0.8; // Adjust x velocity based on impact point
    }

    // Check collision with left and right walls
    if (bulbLight.position.x < -params.wallBoundary || bulbLight.position.x > params.wallBoundary) {
        ballVelocity.x = -ballVelocity.x; // Reverse x velocity
    }
}

export function checkMissedBall(bulbLight, ballVelocity, params) {
    // Check if the ball has missed the player paddle
    if (bulbLight.position.z > 10 || bulbLight.position.z < -10) {
        // Reset ball position
        bulbLight.position.set(0, 0.2, 0);
        // Reset ball velocity (move towards player paddle)
        ballVelocity.set(0, 0, 5);
    }
}

export function checkBounds(paddleMesh, params) {
    // Check if the paddle has reached the boundaries

    if (paddleMesh.position.x < -params.paddleBoundary) {
        paddleMesh.position.x = -params.paddleBoundary; // Reset paddle position
    } else if (paddleMesh.position.x > params.paddleBoundary) {
        paddleMesh.position.x = params.paddleBoundary; // Reset paddle position
    }

    if (paddleMesh.position.z < -params.paddleBoundary) {
        paddleMesh.position.z = -params.paddleBoundary; // Reset paddle position
    } else if (paddleMesh.position.z > params.paddleBoundary) {
        paddleMesh.position.z = params.paddleBoundary; // Reset paddle position
    }
}
