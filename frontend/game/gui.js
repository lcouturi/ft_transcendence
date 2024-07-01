import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { bulbLuminousPowers, hemiLuminousIrradiances, params } from './utils.js';
import { g } from './main.js';
import { initStarField, updateStars } from './objects.js';

export function initGUI() {
    const gui = new GUI();
    // set initial values for GUI floor material options from local storage
    const floorMaterialOptions = { floor: g.localStorage.getItem('floorMaterial') || 'wood' };


    gui.add(params, 'hemiIrradiance', Object.keys(hemiLuminousIrradiances)).name('irradiance');
    gui.add(params, 'bulbPower', Object.keys(bulbLuminousPowers)).name('bulb power');
    gui.add(params, 'exposure', 0, 3);
    gui.add(params, 'paddleSpeed', 0, 20).name('user paddle speed').step(1).onChange(value => saveParameter('paddleSpeed', value));
    gui.add(params, 'aiPaddleSpeed', 0, 20).name('AI paddle speed').step(1).onChange(value => saveParameter('aiPaddleSpeed', value));
    gui.add(params, 'tolerance', 0, 1).name('tolerance').onChange(value => saveParameter('tolerance', value));
    gui.add(params, 'easingFactor', 0, 1).name('easing factor').onChange(value => saveParameter('easingFactor', value));
    gui.add(g, 'limitScore', 1, 9999).name('score limit').step(1).onChange(value => saveParameter('limitScore', value));
    gui.add(g, 'numStars', 0, 10000).name('number of stars').step(1).onChange(value => { initStarField(); saveParameter('numStars', value); });
    gui.add(g, 'starsSpeed', 0, 1).name('stars speed').onChange(value => saveParameter('starsSpeed', value));
    gui.addColor(g.starColor, 'color').name('star color').onChange(value => { g.starPool.forEach(star => { star.material.color.set(value); }); saveParameter('starColor', value); });
    gui.add(g, 'startSize', 0, 0.1).name('star size').step(0.001).onChange(value => { initStarField(); saveParameter('startSize', value); });
    gui.add(g, 'ballSpeed', 0, 0.1).name('ball speed').step(0.001).onChange(value => saveParameter('ballSpeed', value));
    gui.add(params, 'shadows').onChange(value => saveParameter('shadows', value));
    gui.add(floorMaterialOptions, 'floor', ['wood', 'ice', 'glass', 'asphalt', 'grass']).name('floor material').onChange(value => { changeFloorMaterial(value); saveParameter('floorMaterial', value); });
    gui.add(g, 'orbitSpeed', 0, 0.1).name('orbit speed').step(0.001).onChange(value => saveParameter('orbitSpeed', value));
    gui.add(g, 'isOrbiting').name('enable orbiting').onChange(value => saveParameter('isOrbiting', value));
    gui.add(g, 'isSinglePlayer').name('single player mode').onChange(value => { toggleGameMode(value); saveParameter('isSinglePlayer', value); });
    gui.open();
    return gui;
}

function changeFloorMaterial(materialName) {
    g.floorMat = g.floor[materialName];
    g.floorMesh.material = g.floorMat;
    g.floorMesh.material.needsUpdate = true;
}

function toggleGameMode(isSinglePlayer) {
    g.isSinglePlayer = isSinglePlayer;
}

function saveParameter(name, value) {
    localStorage.setItem(name, value);
}
