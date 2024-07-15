import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { bulbLuminousPowers, hemiLuminousIrradiances } from './utils.js';
import { g } from './globals.js';
import { initStarField, updateStars } from './objects.js';
import { createNeonBorder, removePaddles, addPaddles, removeAIPaddle, initializePaddles } from './geometry.js';
import { start_match } from '../../ft_transcendence.js'

function updateGUIPosition() {
    const gui = document.querySelector('.lil-gui');
    if (gui) {
        const gameContainer = document.getElementById('container');
        const rect = gameContainer.getBoundingClientRect();
        const padding = 10; // Adjust as needed
        gui.style.top = `${rect.top + padding}px`;
        gui.style.left = `${rect.right - gui.offsetWidth - padding}px`;
    }
}

window.addEventListener('resize', updateGUIPosition);

export function initGUI() {
    const gui = new GUI({autoPlace: false});
    const gameContainer = document.getElementById('container');
    document.body.appendChild(gui.domElement);
    const rect = gameContainer.getBoundingClientRect();
    const padding = 5;

    gui.domElement.style.position = 'absolute';
    gui.domElement.style.top = `${rect.top + padding}px`;
    gui.domElement.style.left = `${rect.right - gui.domElement.offsetWidth - padding}px`;
    gui.domElement.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    gui.domElement.style.borderRadius = '10px';
    gui.domElement.style.padding = '10px';
    gui.domElement.style.color = 'grey';
    gui.domElement.style.fontFamily = 'Arial';
    gui.domElement.style.fontSize = '12px';

    // Add the GUI to the game container
    g.renderer.setSize(gameContainer.clientWidth, gameContainer.clientHeight);
    gameContainer.appendChild(g.renderer.domElement);


    const floorMaterialOptions = { floor: g.localStorage.getItem('floorMaterial') || 'asphalt' };
    gui.add(g, 'hemiIrradiance', Object.keys(hemiLuminousIrradiances)).name('irradiance');
    gui.add(g, 'bulbPower', Object.keys(bulbLuminousPowers)).name('bulb power');
    gui.add(g, 'exposure', 0, 3);
    gui.add(g, 'isOrbiting').name('enable orbiting').onChange(value => saveParameter('isOrbiting', value));
    gui.add(g, 'orbitSpeed', 0, 0.1).name('orbit speed').step(0.001).onChange(value => saveParameter('orbitSpeed', value));
    gui.add(g, 'numStars', 0, 10000).name('number of stars').step(1).onChange(value => { initStarField(); saveParameter('numStars', value); });
    gui.add(g, 'starsSpeed', 0, 1).name('stars speed').onChange(value => saveParameter('starsSpeed', value));
    gui.add(g, 'startSize', 0, 0.1).name('star size').step(0.001).onChange(value => { initStarField(); saveParameter('startSize', value); });
    gui.addColor(g, 'starColor').name('star color').onChange(value => { g.starPool.forEach(star => { star.material.color.set(value); }); saveParameter('starColor', value); });
    gui.addColor(g, 'borderColor').name('border color').onChange(value =>   { g.borderColor = value; updateNeonBorderColor(); saveParameter('borderColor', value);    });
    gui.add(g, 'paddleSpeed', 0, 10).name('user 1 speed').step(1).onChange(value => saveParameter('paddleSpeed', value));
    gui.add(g, "Player2PaddleSpeed", 0, 10).name('user 2 speed').step(1).onChange(value => saveParameter('Player2PaddleSpeed', value));
    gui.add(g, "Player3PaddleSpeed", 0, 10).name('user 3 speed').step(1).onChange(value => saveParameter('Player3PaddleSpeed', value));
    gui.add(g, "Player4PaddleSpeed", 0, 10).name('user 4 speed').step(1).onChange(value => saveParameter('Player4PaddleSpeed', value));
    gui.addColor(g, 'playerPaddleColor').name('user 1 color').onChange(value => { updatePaddleColor(); saveParameter('playerPaddleColor', value); });
    gui.addColor(g, 'Player2PaddleColor').name('user 2 color').onChange(value => { updatePaddleColor(); saveParameter('Player2PaddleColor', value); });
    gui.addColor(g, 'Player3PaddleColor').name('user 3 color').onChange(value => { updatePaddleColor(); saveParameter('Player3PaddleColor', value); });
    gui.addColor(g, 'Player4PaddleColor').name('user 4 color').onChange(value => { updatePaddleColor(); saveParameter('Player4PaddleColor', value); });
    // gui.add(g, 'aiPaddleSpeed', 0, 20).name('AI speed').step(1).onChange(value => saveParameter('aiPaddleSpeed', value));
    // gui.add(g, 'tolerance', 0, 1).name('tolerance').onChange(value => saveParameter('tolerance', value));
    // gui.add(g, 'easingFactor', 0, 1).name('easing factor').onChange(value => saveParameter('easingFactor', value));
    gui.add(g, 'limitScore', 1, 9999).name('score limit').step(1).onChange(value => saveParameter('limitScore', value));
    gui.add(g, 'ballSpeed', 0, 0.1).name('ball speed').step(0.001).onChange(value => saveParameter('ballSpeed', value));
    gui.add(floorMaterialOptions, 'floor', ['wood', 'ice', 'glass', 'asphalt', 'grass']).name('floor material').onChange(value => { changeFloorMaterial(value); saveParameter('floorMaterial', value); });
    gui.add(g, 'emissiveIntensity').name('glass effect').onChange(value => { updatePaddleColor(); saveParameter('emissiveIntensity', value); }).listen();
    gui.add(g, 'shadows').onChange(value => saveParameter('shadows', value));
    gui.add(g, 'isSinglePlayer').name('enable 2 player').onChange(value => { toggleGameMode(value); saveParameter('isSinglePlayer', value); });
    // gui.add(g, 'bloomStrength', 0, 3).name('bloom Strength').step(0.1).onChange(value => { g.bloomPass.strength = value; saveParameter('bloomStrength', value);});
    // gui.add(g, 'bloomRadius', 0, 1).name('bloom Radius').step(0.1).onChange(value => { g.bloomPass.radius = value; saveParameter('bloomRadius', value); });
    // gui.add(g, 'bloomThreshold', 0, 1).name('bloom threshold').step(0.1).onChange(value => { g.bloomPass.threshold = value; saveParameter('bloomThreshold', value); });
    // gui.addColor(g, 'aiPaddleColor').name('AI color').onChange(value => { updatePaddleColor(); saveParameter('aiPaddleColor', value); });
    gui.add({ reset: () => { localStorage.clear(); location.reload(); } }, 'reset').name('Reset Parameters');
    gui.close(); // Open the GUI by default
    return gui;
}

// Load saved parameters from local storage
export function loadSavedParameters() {
    const savedParameters = [
        'hemiIrradiance', 'bulbPower', 'exposure', 'paddleSpeed', 'aiPaddleSpeed',
        'tolerance', 'easingFactor', 'limitScore', 'numStars', 'starsSpeed', 'starColor',
        'startSize', 'ballSpeed', 'shadows', 'floorMaterial', 'orbitSpeed', 'isOrbiting',
        'isSinglePlayer', 'borderColor', 'bloomStrength', 'bloomRadius', 'bloomThreshold',
        'playerPaddleColor', 'aiPaddleColor', 'emissiveIntensity', 'Player2PaddleColor',
        'Player3PaddleColor', 'Player4PaddleColor', 'Player2PaddleSpeed', 'Player3PaddleSpeed', 'Player4PaddleSpeed'
    ];

    savedParameters.forEach(param => {
        const savedValue = g.localStorage.getItem(param);
        if (savedValue !== null) {
            if (param === 'starColor' || param === 'borderColor' || param === 'playerPaddleColor' || param === 'aiPaddleColor' || param === 'Player2PaddleColor' || param === 'Player3PaddleColor' || param === 'Player4PaddleColor') {
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
    g.paddleMesh.material.emissiveIntensity = g.emissiveIntensity;

    g.Player2PaddleMesh.material.color.set(g.Player2PaddleColor);
    g.Player2PaddleMesh.material.emissive.set(g.Player2PaddleColor);
    g.Player2PaddleMesh.material.emissiveIntensity = g.emissiveIntensity;

    g.Player3PaddleMesh.material.color.set(g.Player3PaddleColor);
    g.Player3PaddleMesh.material.emissive.set(g.Player3PaddleColor);
    g.Player3PaddleMesh.material.emissiveIntensity = g.emissiveIntensity;

    g.Player4PaddleMesh.material.color.set(g.Player4PaddleColor);
    g.Player4PaddleMesh.material.emissive.set(g.Player4PaddleColor);
    g.Player4PaddleMesh.material.emissiveIntensity = g.emissiveIntensity;

    // g.aiPaddleMesh.material.color.set(g.aiPaddleColor);
    // g.aiPaddleMesh.material.emissive.set(g.aiPaddleColor);
    // g.aiPaddleMesh.material.emissiveIntensity = g.emissiveIntensity;

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

    if (isSinglePlayer) {
        removePaddles();
        initializePaddles(); // This will initialize only AI paddle and Player 1 paddle
    } else {
        // removeAIPaddle();
        initializePaddles(); // This will initialize player 3 and player 4 paddles
    }
    start_match();
}


export function saveParameter(name, value) {
    localStorage.setItem(name, value);
}