import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { bulbLuminousPowers, hemiLuminousIrradiances, params } from './utils.js';
import { g } from './main.js';

export function initGUI() {
    const gui = new GUI();
    const floorMaterialOptions = {floor: 'wood'}; // default material

    gui.add(params, 'hemiIrradiance', Object.keys(hemiLuminousIrradiances)).name('irradiance');
    gui.add(params, 'bulbPower', Object.keys(bulbLuminousPowers)).name('bulb power');
    gui.add(params, 'exposure', 0, 3);
    gui.add(params, 'paddleSpeed', 0, 10).name('user paddle speed');
    gui.add(params, 'aiPaddleSpeed', 0, 10).name('AI paddle speed');
    gui.add(params, 'tolerance', 0, 1).name('tolerance');
    gui.add(params, 'easingFactor', 0, 1).name('easing factor');
    gui.add(params, 'shadows');
    gui.add(floorMaterialOptions, 'floor', ['wood', 'glass']).name('floor material').onChange(value => { changeFloorMaterial(value); });
    gui.open();
    return gui;
}

function changeFloorMaterial(materialName) {
    g.floorMat = g.floor[materialName];
    g.floorMesh.material = g.floorMat;
    g.floorMesh.material.needsUpdate = true;
}
