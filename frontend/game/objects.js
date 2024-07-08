import * as THREE from 'three';
import { g } from './globals.js';

export function initStarField() {
    // Reset star pool if it already exists (when changing star settings in the GUI)
    if (g.starPool.length > 0) {
        g.starPool.forEach(star => {
            g.scene.remove(star);
            star.geometry.dispose();
            star.material.dispose();
        });
        g.starPool = [];
    }
    const starGeometry = new THREE.SphereGeometry(g.startSize, 24, 24);
    const starMaterial = new THREE.MeshBasicMaterial({ color: g.starColor });

    for (let i = 0; i < g.numStars; i++) {
        const star = new THREE.Mesh(starGeometry, starMaterial);
        star.renderOrder = -1;
        star.material.depthTest = false;
        resetStarPosition(star);
        g.starPool.push(star);
        g.scene.add(star);
    }
}

function resetStarPosition(star) {
    star.position.x = (Math.random() - 0.5) * 100;
    star.position.y = (Math.random() - 0.5) * 100;
    star.position.z = (Math.random() - 0.5) * 100;  // Position stars in front of the camera
}

export function updateStars() {
    g.starPool.forEach(star => {
        star.position.z += g.starsSpeed;

        // Reset star position if it goes behind the camera
        if (star.position.z > 50) {
            resetStarPosition(star);
        }
    });
}
