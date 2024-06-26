import * as THREE from 'three';

export function initBulbLight(scene) {
    const bulbGeometry = new THREE.SphereGeometry(0.2, 16, 8);  // Create a new sphere geometry for the bulb light
    // SphereGeometry(radius, widthSegments, heightSegments)

    const bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2); // Create a new point light for the bulb light
    // PointLight(color, intensity, distance, decay)

    // Create a new material for the bulb light
    const bulbMat = new THREE.MeshStandardMaterial({
        emissive: 0xffffee,     // Emissive color of the material (yellow)
        emissiveIntensity: 1,   // Emissive intensity of the material (brightness)
        color: 0x000000         // Color of the material (black)
    });

    // Create a new mesh for the bulb light
    const bulbMesh = new THREE.Mesh(bulbGeometry, bulbMat); // Create a new mesh for the bulb light
    bulbLight.add(bulbMesh);                                // Add the bulb mesh to the bulb light
    bulbLight.castShadow = true;                            // Enable shadow casting for the bulb light
    scene.add(bulbLight);                                   // Add the bulb light to the scene

    const hemiLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 0.02); // Create a new hemisphere light
    // HemisphereLight(skyColor, groundColor, intensity)

    scene.add(hemiLight); // Add the hemisphere light to the scene
    return { bulbLight, bulbMat, hemiLight }; // Return the bulb light, bulb material, and hemisphere light
}
