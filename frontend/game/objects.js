import * as THREE from 'three';
import { g } from './main.js';

export function initStarField() {
    // Reset star pool if it already exists
    if (g.starPool.length > 0) {
        g.starPool.forEach(star => {
            g.scene.remove(star);
            star.geometry.dispose();
            star.material.dispose();
        });
        g.starPool = [];
    }
    const starGeometry = new THREE.SphereGeometry(0.03, 24, 24);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < g.numStars; i++) {
        const star = new THREE.Mesh(starGeometry, starMaterial);
        resetStarPosition(star);
        g.starPool.push(star);
        g.scene.add(star);
    }
}

function resetStarPosition(star) {
    star.position.x = (Math.random() - 0.5) * 100;
    star.position.y = (Math.random() - 0.5) * 100;
    star.position.z = (Math.random() - 0.5) * 100 - 50;  // Position stars in front of the camera
}

export function updateStars() {
    g.starPool.forEach(star => {
        star.position.z += g.starsSpeed;

        if (star.position.z > 1) {
            resetStarPosition(star);
        }
    });
}
