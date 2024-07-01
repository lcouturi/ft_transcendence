import * as THREE from 'three';
import { g } from './main.js';

export function effectComposer() {
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
