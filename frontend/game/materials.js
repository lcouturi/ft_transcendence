import * as THREE from 'three';

export function initMaterials(g) {
    const woodMaterials = initWoodMaterials();
    const glassMaterials = initGlassMaterials();

    g.floor = {
        wood: woodMaterials.floorMat,
        glass: glassMaterials.floorMat
    };

    g.floorMat = g.floor.wood; // default material
}

export function initWoodMaterials() {
    const floorMat = new THREE.MeshStandardMaterial({
        roughness: 0.8,
        color: 0xffffff,
        metalness: 0.2,
        bumpScale: 1
    });

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('textures/hardwood2_diffuse.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        map.colorSpace = THREE.SRGBColorSpace;
        floorMat.map = map;
        floorMat.needsUpdate = true;
    });
    textureLoader.load('textures/hardwood2_bump.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        floorMat.bumpMap = map;
        floorMat.needsUpdate = true;
    });
    textureLoader.load('textures/hardwood2_roughness.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        floorMat.roughnessMap = map;
        floorMat.needsUpdate = true;
    });

    return { floorMat };
}

export function initGlassMaterials() {
    const floorMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.95,    // High transmission for see-through effect
        roughness: 0.0,        // Smooth surface for sharp reflections
        metalness: 0.8,        // High metalness for mirror-like look
        clearcoat: 1,          // Additional glossy layer
        clearcoatRoughness: 0, // Make the clearcoat very smooth
        ior: 1.4,              // Index of refraction for glass
        reflectivity: 1,       // High reflectivity for mirror-like effect
        side: THREE.DoubleSide // Render both sides to see through
    });

    // Environment Map for Reflections
    // const envTexture = new THREE.TextureLoader().load('textures/environment.jpg'); // Replace with your environment texture
    // envTexture.mapping = THREE.EquirectangularReflectionMapping;
    // glassMat.envMap = envTexture;

    return { floorMat };
}
