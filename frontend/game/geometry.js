import * as THREE from 'three';
import { g } from './main.js';

export function initGeometry() {
    initializeFloor();
    initializePaddles();
    g.bulbLight.position.set(0, 0.2, 0);
}

function initializeFloor() {
    const floorMaterial = g.floorMat;
    const floorMesh = createFloorMesh(floorMaterial);
    g.floorMesh = floorMesh;
    g.scene.add(floorMesh);

    // Add neon border around the floor
    const neonBorder = createNeonBorder();
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
        wireframe: false,
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
    floorMesh.rotation.x = -Math.PI / 2.0;
    return floorMesh;
}

function initializePaddles() {
    const paddleMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.8,
        roughness: 0.05,
        metalness: 0.1,
        emissive: 0x00ff00,
        // emissiveIntensity: 0.9,
    });

    const aiPaddleMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.8,
        roughness: 0.05,
        metalness: 0.1,
        emissive: 0xff0000,
        // emissiveIntensity: 0.9,
    });

    const paddleMesh = createPaddleMesh(paddleMaterial, 8);
    g.paddleMesh = paddleMesh;
    g.player2PaddleMesh = paddleMesh.clone();
    g.scene.add(paddleMesh);

    const aiPaddleMesh = createPaddleMesh(aiPaddleMaterial, -8);
    g.aiPaddleMesh = aiPaddleMesh;
    g.scene.add(aiPaddleMesh);
}

function createPaddleMesh(material, zPosition) {
    const paddleWidth = 1.5;
    const paddleHeight = 1.1;
    const paddleDepth = 0.3;
    const paddleGeometry = new THREE.BoxGeometry(paddleWidth, paddleHeight, paddleDepth);
    const paddleMesh = new THREE.Mesh(paddleGeometry, material);
    paddleMesh.position.set(0, paddleHeight / 2, zPosition);
    paddleMesh.castShadow = true;
    return paddleMesh;
}
