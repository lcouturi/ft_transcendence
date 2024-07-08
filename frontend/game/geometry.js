import * as THREE from 'three';
import { g } from './globals.js';

export function initGeometry() {
    initializeFloor();
    initializePaddles();
    g.bulbLight.position.set(0, 0.2, 0);
}

function initializeFloor() {
    const floorMaterial = g.floorMat;
    const neonBorder = createNeonBorder();
    const floorMesh = createFloorMesh(floorMaterial);
    g.floorMesh = floorMesh;
    g.scene.add(floorMesh);
    g.scene.add(neonBorder);
}

export function createNeonBorder() {
    const size = 20;
    const thickness = 0.1;
    const height = 0.1;

    const borderGeometry = new THREE.BoxGeometry(size, height, thickness);
    const borderMaterial = new THREE.MeshBasicMaterial({
        color: g.borderColor, // Neon color
        opacity: 0.8,
        transparent: false,
    });

    // Create the four sides of the border
    const borderMeshes = [];

    // Front border
    const frontBorder = new THREE.Mesh(borderGeometry, borderMaterial);
    frontBorder.position.set(0, height / 2, size / 2);
    borderMeshes.push(frontBorder);

    // Back border
    const backBorder = frontBorder.clone();
    backBorder.position.set(0, height / 2, -size / 2);
    borderMeshes.push(backBorder);

    // Left border
    const leftBorder = new THREE.Mesh(new THREE.BoxGeometry(thickness, height, size), borderMaterial);
    leftBorder.position.set(-size / 2, height / 2, 0);
    borderMeshes.push(leftBorder);

    // Right border
    const rightBorder = leftBorder.clone();
    rightBorder.position.set(size / 2, height / 2, 0);
    borderMeshes.push(rightBorder);

    // Create a group to hold all border meshes
    const borderGroup = new THREE.Group();
    borderMeshes.forEach(mesh => borderGroup.add(mesh));

    return borderGroup;
}

function createFloorMesh(floorMat) {
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMesh = new THREE.Mesh(floorGeometry, floorMat);
    floorMesh.receiveShadow = true;
    floorMesh.wireframe = true;
    floorMesh.rotation.x = -Math.PI / 2.0;
    return floorMesh;
}

function createPaddleMaterial(color) {
    return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        roughness: 0,
        transmission: 1,
        thickness: 1.5,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        opacity: 0.9,
        transparent: true,
        emissive: new THREE.Color(color),
        emissiveIntensity: g.emissiveIntensity,
    });
}

export function initializePaddles() {
    // Player 1 paddle
    if (!g.paddleMesh) {
        g.paddleMesh = createPaddleMesh(createPaddleMaterial(g.playerPaddleColor), 8);
        g.scene.add(g.paddleMesh);
    }

    if (g.isSinglePlayer) {
        if (!g.Player2PaddleMesh) {
            g.Player2PaddleMesh = createPaddleMesh(createPaddleMaterial(g.Player2PaddleColor), -8);
            g.scene.add(g.Player2PaddleMesh);
        }
        removePaddles(); // Remove player 3 and player 4 paddles if they exist
    } else {
        if (!g.Player2PaddleMesh) {
            g.Player2PaddleMesh = createPaddleMesh(createPaddleMaterial(g.Player2PaddleColor), -8);
            g.scene.add(g.Player2PaddleMesh);
        }
        // Player 3 paddle
        if (!g.Player3PaddleMesh) {
            g.Player3PaddleMesh = createPaddleMesh(createPaddleMaterial(g.Player3PaddleColor), 4);
            g.scene.add(g.Player3PaddleMesh);
        }

        // Player 4 paddle
        if (!g.Player4PaddleMesh) {
            g.Player4PaddleMesh = createPaddleMesh(createPaddleMaterial(g.Player4PaddleColor), -4);
            g.scene.add(g.Player4PaddleMesh);
        }
    }

    // // AI paddle
    // if (!g.aiPaddleMesh) {
    //     const aiPaddleMaterial = createPaddleMaterial(g.aiPaddleColor);
    //     aiPaddleMaterial.opacity = 0.5; // Specific property for AI paddle

    //     g.aiPaddleMesh = createPaddleMesh(aiPaddleMaterial, -8);
    //     g.scene.add(g.aiPaddleMesh);
    // }
}

export function removeAIPaddle() {
    if (g.aiPaddleMesh) {
        g.scene.remove(g.aiPaddleMesh);
        g.aiPaddleMesh = null;
    }
}


export function removePaddles() {
    if (g.Player3PaddleMesh) {
        g.scene.remove(g.Player3PaddleMesh);
        g.Player3PaddleMesh = null;
    }
    if (g.Player4PaddleMesh) {
        g.scene.remove(g.Player4PaddleMesh);
        g.Player4PaddleMesh = null;
    }
}

export function addPaddles() {
    if (!g.Player3PaddleMesh) {
        g.Player3PaddleMesh = createPaddleMesh(createPaddleMaterial(g.Player3PaddleColor), 4);
        g.scene.add(g.Player3PaddleMesh);
    }
    if (!g.Player4PaddleMesh) {
        g.Player4PaddleMesh = createPaddleMesh(createPaddleMaterial(g.Player4PaddleColor), -4);
        g.scene.add(g.Player4PaddleMesh);
    }
}


function createPaddleMesh(material, zPosition) {
    const paddleWidth = 1.5;
    const paddleHeight = 1.1;
    const paddleDepth = 0.3;
    const paddleGeometry = new THREE.BoxGeometry(paddleWidth, paddleHeight, paddleDepth);
    paddleGeometry.index.array[18] = 0;
    paddleGeometry.index.array[19] = 0;
    paddleGeometry.index.array[20] = 0;
    paddleGeometry.index.array[21] = 0;
    paddleGeometry.index.array[22] = 0;
    paddleGeometry.index.array[23] = 0;
    const paddleMesh = new THREE.Mesh(paddleGeometry, material);
    paddleMesh.position.set(0, paddleHeight / 2, zPosition);
    paddleMesh.castShadow = true;
    return paddleMesh;
}

