import * as THREE from 'three';
import { g } from './main.js';

export function initMaterials() {
    const woodMaterials = initWoodMaterials();
    const glassMaterials = initGlassMaterials();
    const asphaltMaterials = initAsphaltMaterials();
    const grassMaterials = initGrassMaterials();
    const wood2Materials = initWood2Materials();

    g.floor = {
        wood: woodMaterials.floorMat,
        wood2: wood2Materials.floorMat,
        glass: glassMaterials.floorMat,
        asphalt: asphaltMaterials.floorMat,
        grass: grassMaterials.floorMat
    };

    g.floorMat = g.floor.wood2; // default material
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

function initAsphaltMaterials() {
    const textureLoader = new THREE.TextureLoader();

    // Load textures with callbacks to ensure they load correctly
    const colorTexture = textureLoader.load('textures/asphalt_4K/JPG_Color.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        map.colorSpace = THREE.SRGBColorSpace;
        floorMat.map = map;
        floorMat.needsUpdate = true;
    });
    // const normalTexture = textureLoader.load('textures/asphalt_1K/NormalGL.jpg', onLoad, onProgress, onError);
    // const roughnessTexture = textureLoader.load('textures/asphalt_1K/Roughness.jpg', onLoad, onProgress, onError);
    const aoTexture = textureLoader.load('textures/asphalt_4K/AmbientOcclusion.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        floorMat.aoMap = map;
        floorMat.needsUpdate = true;
    });

    // const colorTexture = textureLoader.load('textures/asphalt_4K/JPG_Color.jpg', onLoad, onProgress, onError);
    const normalTexture = textureLoader.load('textures/asphalt_4K/NormalGL.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        floorMat.normalMap = map;
        floorMat.needsUpdate = true;
    });

    const roughnessTexture = textureLoader.load('textures/asphalt_4K/Roughness.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        floorMat.roughnessMap = map;
        floorMat.needsUpdate = true;
    });


    // Create Asphalt Material
    const floorMat = new THREE.MeshStandardMaterial({
        map: colorTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        aoMap: aoTexture,
    });

    // Set Texture Repeat
    colorTexture.wrapS = THREE.RepeatWrapping;
    colorTexture.wrapT = THREE.RepeatWrapping;
    colorTexture.repeat.set(10, 24);

    return { floorMat };
}

function initGrassMaterials() {
    const textureLoader = new THREE.TextureLoader();
    const colorTexture = textureLoader.load('textures/Grass001_4K/Grass001_4K-PNG_Color.png', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        map.colorSpace = THREE.SRGBColorSpace;
        floorMat.map = map;
        floorMat.needsUpdate = true;
    });

    const normalTexture = textureLoader.load('textures/Grass001_4K/Grass001_4K-PNG_NormalGL.png', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        floorMat.normalMap = map;
        floorMat.needsUpdate = true;
    });


    const roughnessTexture = textureLoader.load('textures/Grass001_4K/Grass001_4K-PNG_Roughness.png', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        floorMat.roughnessMap = map;
        floorMat.needsUpdate = true;
    });

    const aoTexture = textureLoader.load('textures/Grass001_4K/Grass001_4K-PNG_AmbientOcclusion.png', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        floorMat.aoMap = map;
        floorMat.needsUpdate = true;
    });


    // Create Material
    const floorMat = new THREE.MeshStandardMaterial({
        map: colorTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        aoMap: aoTexture,
    });

    // Set Texture Repeat
    colorTexture.wrapS = THREE.RepeatWrapping;
    colorTexture.wrapT = THREE.RepeatWrapping;
    colorTexture.repeat.set(2, 2);

    return { floorMat };
}

function initWood2Materials() {
    const textureLoader = new THREE.TextureLoader();
    const colorTexture = textureLoader.load('textures/WoodFloor051_4K/WoodFloor051_4K-JPG_Color.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        map.colorSpace = THREE.SRGBColorSpace;
        floorMat.map = map;
        floorMat.needsUpdate = true;
    });

    const normalTexture = textureLoader.load('textures/WoodFloor051_4K/WoodFloor051_4K-JPG_Normal.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        floorMat.normalMap = map;
        floorMat.needsUpdate = true;
    });

    const roughnessTexture = textureLoader.load('textures/WoodFloor051_4K/WoodFloor051_4K-JPG_Roughness.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        floorMat.roughnessMap = map;
        floorMat.needsUpdate = true;
    });

    const aoTexture = textureLoader.load('textures/WoodFloor051_4K/WoodFloor051_4K-JPG_AmbientOcclusion.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(10, 24);
        floorMat.aoMap = map;
        floorMat.needsUpdate = true;
    });

    // Create Material
    const floorMat = new THREE.MeshStandardMaterial({
        // map: colorTexture,
        // normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        // aoMap: aoTexture,
    });

    // Set Texture Repeat
    colorTexture.wrapS = THREE.RepeatWrapping;
    colorTexture.wrapT = THREE.RepeatWrapping;
    colorTexture.repeat.set(10, 24);

    return { floorMat };
}
