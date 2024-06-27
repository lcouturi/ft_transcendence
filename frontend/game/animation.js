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

export function moveBall(g) {
    g.bulbLight.position.add(g.ballVelocity.clone().multiplyScalar(0.016));
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

export function checkMissedBall(g, params) {
    // Check if the ball has missed the player paddle
    if (g.bulbLight.position.z > params.wallBoundary) {
        g.aiScore++;
        g.bulbLight.position.set(0, 0.2, 0);
        g.ballVelocity.set(0, 0, 5);
        updateScoreDisplay(g);
    } else if (g.bulbLight.position.z < -params.wallBoundary) {
        g.playerScore++;
        g.bulbLight.position.set(0, 0.2, 0);
        g.ballVelocity.set(0, 0, -5);
        updateScoreDisplay(g);
    }
}

export function initScoreDisplay(g) {
    // Create player score text element
    g.playerScoreText = document.createElement('div');
    g.playerScoreText.style.position = 'absolute';
    g.playerScoreText.style.top = '10px';
    g.playerScoreText.style.left = '300px';
    g.playerScoreText.style.color = '#ffffff';
    g.playerScoreText.style.fontFamily = 'Arial, sans-serif';
    g.playerScoreText.style.fontSize = '24px';
    document.body.appendChild(g.playerScoreText);

    // Create AI score text element
    g.aiScoreText = document.createElement('div');
    g.aiScoreText.style.position = 'absolute';
    g.aiScoreText.style.top = '10px';
    g.aiScoreText.style.right = '300px';
    g.aiScoreText.style.color = '#ffffff';
    g.aiScoreText.style.fontFamily = 'Arial, sans-serif';
    g.aiScoreText.style.fontSize = '24px';
    document.body.appendChild(g.aiScoreText);

    // Initial update of score display
    updateScoreDisplay(g);
}

export function updateScoreDisplay(g) {
    // Check the scoreLimit to determine if a player has won
    if (g.playerScore >= g.limitScore) {
        alert('Player wins!');
        g.playerScore = 0;
        g.aiScore = 0;
    } else if (g.aiScore >= g.limitScore) {
        alert('AI wins!');
        g.playerScore = 0;
        g.aiScore = 0;
    }

    // Update the player and AI score text elements
    if (!g.playerScoreText) {
        g.playerScoreText = document.createElement('div');
        g.playerScoreText.style.position = 'absolute';
        g.playerScoreText.style.top = '10px';
        g.playerScoreText.style.left = '200px';
        g.playerScoreText.style.color = '#ffffff';
        g.playerScoreText.style.fontFamily = 'Arial, sans-serif';
        g.playerScoreText.style.fontSize = '24px';
        document.body.appendChild(g.playerScoreText);
    }

    if (!g.aiScoreText) {
        g.aiScoreText = document.createElement('div');
        g.aiScoreText.style.position = 'absolute';
        g.aiScoreText.style.top = '10px';
        g.aiScoreText.style.right = '400px';
        g.aiScoreText.style.color = '#ffffff';
        g.aiScoreText.style.fontFamily = 'Arial, sans-serif';
        g.aiScoreText.style.fontSize = '24px';
        document.body.appendChild(g.aiScoreText);
    }

    g.playerScoreText.textContent = `Player Score: ${g.playerScore}`;
    g.aiScoreText.textContent = `AI Score: ${g.aiScore}`;
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
