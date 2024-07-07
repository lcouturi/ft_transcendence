import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { bulbLuminousPowers, hemiLuminousIrradiances } from './utils.js';
import { g } from './globals.js';
import { initStarField, updateStars } from './objects.js';
import { createNeonBorder } from './geometry.js';

function updateGUIPosition() {
    const container = document.getElementById('container');
    const containerRect = container.getBoundingClientRect();
    const gui = document.querySelector('.lil-gui'); // assuming lil-gui adds this class
    if (gui) {
        gui.style.top = `${containerRect.top}px`;
        gui.style.left = `${containerRect.right}px`;
    }
}

window.addEventListener('resize', updateGUIPosition);

export function initGUI() {
    const gui = new GUI();
    const container = document.getElementById('container');
    const containerRect = container.getBoundingClientRect();
    console.log('containerRect:', containerRect);



    // Set the position of the GUI to the right of the container element
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.top = `${containerRect.top}px`;
    gui.domElement.style.left = `${containerRect.right}px`;
    gui.domElement.style.zIndex = 100;

    // Transparent black background
    gui.domElement.style.backgroundColor = 'rgba(1, 1, 1, 1)';
    gui.domElement.style.borderRadius = '10px';
    gui.domElement.style.padding = '10px';
    gui.domElement.style.color = 'white';
    gui.domElement.style.fontFamily = 'Arial, sans-serif';
    gui.domElement.style.fontSize = '12px';


    container.style.position = 'absolute';
    container.appendChild(gui.domElement);

    const floorMaterialOptions = { floor: g.localStorage.getItem('floorMaterial') || 'asphalt' };
    gui.add(g, 'hemiIrradiance', Object.keys(hemiLuminousIrradiances)).name('irradiance');
    gui.add(g, 'bulbPower', Object.keys(bulbLuminousPowers)).name('bulb power');
    gui.add(g, 'exposure', 0, 3);
    gui.add(g, 'paddleSpeed', 0, 20).name('user paddle speed').step(1).onChange(value => saveParameter('paddleSpeed', value));
    gui.add(g, 'aiPaddleSpeed', 0, 20).name('AI paddle speed').step(1).onChange(value => saveParameter('aiPaddleSpeed', value));
    gui.add(g, 'tolerance', 0, 1).name('tolerance').onChange(value => saveParameter('tolerance', value));
    gui.add(g, 'easingFactor', 0, 1).name('easing factor').onChange(value => saveParameter('easingFactor', value));
    gui.add(g, 'limitScore', 1, 9999).name('score limit').step(1).onChange(value => saveParameter('limitScore', value));
    gui.add(g, 'numStars', 0, 10000).name('number of stars').step(1).onChange(value => { initStarField(); saveParameter('numStars', value); });
    gui.add(g, 'starsSpeed', 0, 1).name('stars speed').onChange(value => saveParameter('starsSpeed', value));
    gui.addColor(g.starColor, 'color').name('star color').onChange(value => { g.starPool.forEach(star => { star.material.color.set(value); }); saveParameter('starColor', value); });
    gui.addColor(g, 'borderColor').name('border color').onChange(value =>   { g.borderColor = value; updateNeonBorderColor(); saveParameter('borderColor', value);    });
    gui.add(g, 'startSize', 0, 0.1).name('star size').step(0.001).onChange(value => { initStarField(); saveParameter('startSize', value); });
    gui.add(g, 'ballSpeed', 0, 0.1).name('ball speed').step(0.001).onChange(value => saveParameter('ballSpeed', value));
    gui.add(g, 'shadows').onChange(value => saveParameter('shadows', value));
    gui.add(floorMaterialOptions, 'floor', ['wood', 'ice', 'glass', 'asphalt', 'grass']).name('floor material').onChange(value => { changeFloorMaterial(value); saveParameter('floorMaterial', value); });
    gui.add(g, 'orbitSpeed', 0, 0.1).name('orbit speed').step(0.001).onChange(value => saveParameter('orbitSpeed', value));
    gui.add(g, 'isOrbiting').name('enable orbiting').onChange(value => saveParameter('isOrbiting', value));
    gui.add(g, 'isSinglePlayer').name('enable AI').onChange(value => { toggleGameMode(value); saveParameter('isSinglePlayer', value); });
    gui.add(g, 'bloomStrength', 0, 3).name('bloom Strength').step(0.1).onChange(value => { g.bloomPass.strength = value; saveParameter('bloomStrength', value);});
    gui.add(g, 'bloomRadius', 0, 1).name('bloom Radius').step(0.1).onChange(value => { g.bloomPass.radius = value; saveParameter('bloomRadius', value); });
    gui.add(g, 'bloomThreshold', 0, 1).name('bloom threshold').step(0.1).onChange(value => { g.bloomPass.threshold = value; saveParameter('bloomThreshold', value); });
    gui.addColor(g, 'playerPaddleColor').name('player paddle color').onChange(value => { updatePaddleColor(); saveParameter('playerPaddleColor', value); });
    gui.addColor(g, 'aiPaddleColor').name('AI paddle color').onChange(value => { updatePaddleColor(); saveParameter('aiPaddleColor', value); });
    gui.add(g, 'emissiveIntensity').name('disable glass effect').onChange(value => { updatePaddleColor(); saveParameter('emissiveIntensity', value); }).listen();
    gui.add({ reset: () => { localStorage.clear(); location.reload(); } }, 'reset').name('Reset Parameters');
    gui.open(); // Open the GUI by default
    return gui;
}

// Load saved parameters from local storage
export function loadSavedParameters() {
    const savedParameters = [
        'hemiIrradiance', 'bulbPower', 'exposure', 'paddleSpeed', 'aiPaddleSpeed',
        'tolerance', 'easingFactor', 'limitScore', 'numStars', 'starsSpeed', 'starColor',
        'startSize', 'ballSpeed', 'shadows', 'floorMaterial', 'orbitSpeed', 'isOrbiting',
        'isSinglePlayer', 'borderColor', 'bloomStrength', 'bloomRadius', 'bloomThreshold',
        'playerPaddleColor', 'aiPaddleColor', 'emissiveIntensity'
    ];

    savedParameters.forEach(param => {
        const savedValue = g.localStorage.getItem(param);
        if (savedValue !== null) {
            if (param === 'starColor' || param === 'borderColor' || param === 'playerPaddleColor' || param === 'aiPaddleColor') {
                // Color values need to be parsed as JSON
                g[param] = JSON.parse(savedValue);
            } else if (param in g) {
                g[param] = parseFloat(savedValue);
            } else if (param in g) {
                g[param] = parseFloat(savedValue);
            }
        }
    });
}


function updatePaddleColor() {
    g.paddleMesh.material.color.set(g.playerPaddleColor);
    g.paddleMesh.material.emissive.set(g.playerPaddleColor);
    g.aiPaddleMesh.material.color.set(g.aiPaddleColor);
    g.aiPaddleMesh.material.emissive.set(g.aiPaddleColor);
    g.paddleMesh.material.emissiveIntensity = g.emissiveIntensity;
    g.aiPaddleMesh.material.emissiveIntensity = g.emissiveIntensity;
}

function updateNeonBorderColor() {
    // Remove the old border
    const oldBorder = g.scene.getObjectByName('neonBorder');
    if (oldBorder) {
        g.scene.remove(oldBorder);
    }

    // Create a new border with the updated color
    const neonBorder = createNeonBorder();
    neonBorder.name = 'neonBorder'; // Name the object for easy removal later
    g.scene.add(neonBorder);
}

function changeFloorMaterial(materialName) {
    g.floorMat = g.floor[materialName];
    g.floorMesh.material = g.floorMat;
    g.floorMesh.material.needsUpdate = true;
}

function toggleGameMode(isSinglePlayer) {
    g.isSinglePlayer = isSinglePlayer;
}

export function saveParameter(name, value) {
    localStorage.setItem(name, value);
}
