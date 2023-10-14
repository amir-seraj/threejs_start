import * as THREE from "three";
import gsap from "gsap";
import * as lil from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// basic configuration
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = e.clientY / sizes.height - 0.5;
});
// fix window resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(sizes.width, sizes.height);
});

//Double click to Fullscreen
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
    canvas.fullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Three js
// scene
const scene = new THREE.Scene();

// geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

//material
const material = new THREE.MeshBasicMaterial({
  color: 0x00a693,
});

// mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

//Debug
const debugObject = {
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.position.y + Math.PI * 2 });
  },
};

const gui = new lil.GUI();
gui.add(mesh.position, "y").min(-3).max(3).step(0.01).name("Y axis");
gui.add(mesh, "visible");
gui.add(material, "wireframe");

gui.addColor(material, "color");

// spin button
gui.add(debugObject, "spin");

// Render
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const tick = () => {
  controls.update();
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
