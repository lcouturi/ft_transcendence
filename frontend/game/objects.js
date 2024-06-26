import * as THREE from 'three';

export function addStars(scene) {
    const geometry = new THREE.SphereGeometry(0.02, 24, 24); // Create a sphere geometry
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Create a basic material
    const star = new THREE.Mesh(geometry, material); // Create a mesh with the geometry and material
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100)); // Generate random coordinates
    star.position.set(x, y, z); // Set the position of the star
    scene.add(star); // Add the star to the scene

    // add point of light for some random stars
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(x, y, z);
    scene.add(pointLight);
}

export function initGlassSphere(scene) {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32); // Create a sphere geometry
    const material = new THREE.MeshPhysicalMaterial({ // Create a physical material
        color: 0xffffff, // Set the color to green
        transparent: true, // Make the material transparent
        opacity: 0.5, // Set the opacity to 50%
        roughness: 0.1, // Set the roughness
        metalness: 0.1, // Set the metalness
        clearcoat: 1, // Set the clearcoat
        transmission: 1, // Set the transmission
        ior: 1.5, // Set the index of refraction
        reflectivity: 1, // Set the reflectivity
        side: THREE.DoubleSide // Render the material on both sides of the mesh
    });
    const sphere = new THREE.Mesh(geometry, material); // Create a mesh with the geometry and material
    sphere.position.set(0, 0.5, 0); // Set the position of the sphere
    scene.add(sphere); // Add the sphere to the scene
}

export function initStarField(g) {
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

export function updateStars(g) {
    g.starPool.forEach(star => {
        star.position.z += 0.2;

        if (star.position.z > 1) {
            resetStarPosition(star);
        }
    });
}
