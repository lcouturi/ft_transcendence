import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { g } from './globals.js';

export function initRenderer(animate) {
    g.renderer = new THREE.WebGLRenderer({ antialias: true}); // Create a new WebGLRenderer object
    g.renderer.setPixelRatio(window.devicePixelRatio);          // Set the pixel ratio (for high DPI displays)
    g.renderer.setSize(window.innerWidth, window.innerHeight);  // Set the size of the renderer (full screen)
    g.renderer.setAnimationLoop(animate);                       // Use the passed animate function (callback function for each frame of the animation loop)
    g.renderer.shadowMap.enabled = true;                        // Enable shadow mapping
    g.renderer.toneMapping = THREE.ReinhardToneMapping;         // Use Reinhard tone mapping
    container.appendChild(g.renderer.domElement);               // Add the renderer's DOM element to the container
    const controls = new OrbitControls(g.camera, g.renderer.domElement); // Create a new OrbitControls object (for rotating the camera)
    controls.minDistance = 1;                                   // Set the minimum distance for the camera
    controls.maxDistance = 40;                                  // Set the maximum distance for the camera
    return g.renderer;                                          // Return the renderer object
}

export function resizeCanvasToDisplaySize() {
  console.log('resizeCanvasToDisplaySize');
  const canvas = g.renderer.domElement;
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // adjust displayBuffer size to match
  if (canvas.width !== width || canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    g.renderer.setSize(width, height, false);
    g.camera.aspect = width / height;
    g.camera.updateProjectionMatrix();

    // update any render target sizes here
  }
}
