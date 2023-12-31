import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as lil from "lil-gui";

// Debug
const gui = new lil.GUI();

// Cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / Sizes.width - 0.5;
  cursor.y = -(e.clientY / Sizes.height - 0.5);
});

// Size
const Sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
//window size
window.addEventListener("resize", () => {
  Sizes.width = window.innerWidth;
  Sizes.height = window.innerHeight;

  //update camera
  camera.aspect = Sizes.width / Sizes.height;
  camera.updateProjectionMatrix();
  //update renderer
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(Sizes.width, Sizes.height);
});
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitFullscreenElement) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});
// Threejs
const scene = new THREE.Scene();
const geometry = new THREE.BufferGeometry();

// const positionArray = new Float32Array(9);
// positionArray.forEach((i) => (i = 0));
// positionArray[4] = 1;
// positionArray[6] = 1;
// const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
// geometry.setAttribute("position", positionAttribute);
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

const count = 50;
const positionArray = new Float32Array(count * 3 * 3);

for (let index = 0; index < count * 3 * 3; index++) {
  positionArray[index] = Math.random();
}

const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
geometry.setAttribute("position", positionAttribute);

const material = new THREE.MeshBasicMaterial({
  color: 0x693a00,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const camera = new THREE.PerspectiveCamera(
  75,
  Sizes.width / Sizes.height,
  0.1,
  100
);

// Orthograpich camera
// const aspectRatio = Sizes.width / Sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );

// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(Sizes.width, Sizes.height);

const controls = new OrbitControls(camera, canvas);
// controls.target.y = 1;
// controls.update();
controls.enableDamping = true;

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // mesh.rotation.y = elapsedTime;
  // camera.position.x = cursor.x * 10;
  // camera.position.y = cursor.y * 10;
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(mesh.position);

  // update on each frame
  controls.update();

  // render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
