import * as THREE from 'three';
import { g } from './main.js';

export function initMaterials() {
    const woodMaterials = initWoodMaterials();
    const glassMaterials = initGlassMaterials();
    const asphaltMaterials = initAsphaltMaterials();
    const grassMaterials = initGrassMaterials();
    const iceMaterials = initIceMaterials();

    g.floor = {
        wood: woodMaterials.floorMat,
        ice: iceMaterials.floorMat,
        glass: glassMaterials.floorMat,
        asphalt: asphaltMaterials.floorMat,
        grass: grassMaterials.floorMat
    };

    // load default material from local storage
    // g.floorMat = g.floor.wood; // default material
    g.floorMat = g.localStorage.getItem('floorMaterial');
    if (g.floorMat === null) {
        g.floorMat = g.floor.wood;
    } else {
        g.floorMat = g.floor[g.floorMat];
    }
    console.log(g.floorMat);
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
    const colorTexture = textureLoader.load('textures/Asphalt025C_2K-JPG/Asphalt025C_2K-JPG_Color.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(2, 2);
        map.colorSpace = THREE.SRGBColorSpace;
        floorMat.map = map;
        floorMat.needsUpdate = true;
    });

    const aoTexture = textureLoader.load('textures/Asphalt025C_2K-JPG/Asphalt025C_2K-JPG_AmbientOcclusion.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(2, 2);
        floorMat.aoMap = map;
        floorMat.needsUpdate = true;
    });

    const normalTexture = textureLoader.load('textures/Asphalt025C_2K-JPG/Asphalt025C_2K-JPG_NormalGL.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(2, 2);
        floorMat.normalMap = map;
        floorMat.needsUpdate = true;
    });

    const roughnessTexture = textureLoader.load('textures/Asphalt025C_2K-JPG/Asphalt025C_2K-JPG_Roughness.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(2, 2);
        floorMat.roughnessMap = map;
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
    colorTexture.repeat.set(10, 24);

    return { floorMat };
}

function initGrassMaterials() {
    const textureLoader = new THREE.TextureLoader();
    let repeatX = 15;
    let repeatY = 15;
    let anisotropyNum = 4;
    const colorTexture = textureLoader.load('textures/Grass004_2K-JPG/Grass004_2K-JPG_Color.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = anisotropyNum;
        map.repeat.set(repeatX, repeatY);
        map.colorSpace = THREE.SRGBColorSpace;
        floorMat.map = map;
        floorMat.needsUpdate = true;
    });

    const normalTexture = textureLoader.load('textures/Grass004_2K-JPG/Grass004_2K-JPG_NormalGL.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = anisotropyNum;
        map.repeat.set(repeatX, repeatY);
        floorMat.normalMap = map;
        floorMat.needsUpdate = true;
    });


    const roughnessTexture = textureLoader.load('textures/Grass004_2K-JPG/Grass004_2K-JPG_Roughness.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = anisotropyNum;
        map.repeat.set(repeatX, repeatY);
        floorMat.roughnessMap = map;
        floorMat.needsUpdate = true;
    });

    const aoTexture = textureLoader.load('textures/Grass004_2K-JPG/Grass004_2K-JPG_AmbientOcclusion.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = anisotropyNum;
        map.repeat.set(repeatX, repeatY);
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

function initIceMaterials() {
    const textureLoader = new THREE.TextureLoader();
    const colorTexture = textureLoader.load('textures/Ice003_4K-JPG/Ice003_4K-JPG_Color.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(2, 2);
        map.colorSpace = THREE.SRGBColorSpace;
        floorMat.map = map;
        floorMat.needsUpdate = true;
    });

    const normalTexture = textureLoader.load('textures/Ice003_4K-JPG/Ice003_4K-JPG_Normal.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(2, 2);
        floorMat.normalMap = map;
        floorMat.needsUpdate = true;
    });

    const roughnessTexture = textureLoader.load('textures/Ice003_4K-JPG/Ice003_4K-JPG_Roughness.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(2, 2);
        floorMat.roughnessMap = map;
        floorMat.needsUpdate = true;
    });

    const aoTexture = textureLoader.load('textures/WoodFloor051_4K-JPG/Ice003_4K-JPG_AmbientOcclusion.jpg', function (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set(2, 2);
        floorMat.aoMap = map;
        floorMat.needsUpdate = true;
    });


    // Create Material
    const floorMat = new THREE.MeshStandardMaterial({
        map: colorTexture,
        // normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        aoMap: aoTexture,
    });

    // Set Texture Repeat
    colorTexture.wrapS = THREE.RepeatWrapping;
    colorTexture.wrapT = THREE.RepeatWrapping;
    colorTexture.repeat.set(10, 24);

    return { floorMat };
}
