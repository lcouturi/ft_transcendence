import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { bulbLuminousPowers, hemiLuminousIrradiances, params } from './utils.js';
import { g } from './main.js';
import { initStarField, updateStars } from './objects.js';

export function initGUI() {
    const gui = new GUI();
    const floorMaterialOptions = { floor: 'wood' }; // default material

    gui.add(params, 'hemiIrradiance', Object.keys(hemiLuminousIrradiances)).name('irradiance');
    gui.add(params, 'bulbPower', Object.keys(bulbLuminousPowers)).name('bulb power');
    gui.add(params, 'exposure', 0, 3);
    gui.add(params, 'paddleSpeed', 0, 10).name('user paddle speed').step(1);
    gui.add(params, 'aiPaddleSpeed', 0, 10).name('AI paddle speed').step(1);
    gui.add(params, 'tolerance', 0, 1).name('tolerance');
    gui.add(params, 'easingFactor', 0, 1).name('easing factor');
    gui.add(g, 'limitScore', 1, 9999).name('score limit').step(1);
    gui.add(g, 'numStars', 0, 10000).name('number of stars').step(1).onChange(() => { initStarField(); });
    gui.add(g, 'starsSpeed', 0, 1).name('stars speed');
    gui.addColor(g.starColor, 'color').name('star color').onChange(value => { g.starPool.forEach(star => { star.material.color.set(value); }); });
    gui.add(g, 'startSize', 0, 0.1).name('star size').step(0.001).onChange(() => { initStarField(); });
    gui.add(g, 'ballSpeed', 0, 0.1).name('ball speed').step(0.001);
    gui.add(params, 'shadows');
    gui.add(floorMaterialOptions, 'floor', ['wood', 'wood2', 'glass', 'asphalt', 'grass']).name('floor material').onChange(value => { changeFloorMaterial(value); });
    gui.add(g, 'orbitSpeed', 0, 0.1).name('orbit speed').step(0.001);
    gui.add(g, 'isOrbiting').name('enable orbiting');
    gui.add(g, 'isSinglePlayer').name('single player mode').onChange(value => { toggleGameMode(value); });
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
