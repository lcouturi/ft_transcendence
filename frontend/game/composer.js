import * as THREE from 'three';
import { g } from './globals.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

export function initEffectComposer() {
    const renderPass = new RenderPass(g.scene, g.camera);
    g.bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        g.bloomStrength,
        g.bloomRadius,
        g.bloomThreshold
    );
    g.composer = new EffectComposer(g.renderer);
    g.composer.addPass(renderPass);
    g.composer.addPass(g.bloomPass);
}
