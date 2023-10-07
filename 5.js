import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();

// Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00a693 });
const mesh = new THREE.Mesh(geometry, material);

// Positioning
// mesh.position.y = 1;
// mesh.position.x = -1;
// mesh.position.y = -0.5;
mesh.position.set(0.21, -0.5, 1);

// Scaling
// mesh.scale.x = 2;
// mesh.scale.y = 0.75;
// mesh.scale.z = 0.5;
mesh.scale.set(0.21, -0.5, 1);

// Rotation
mesh.rotation.reorder("yxz");
// mesh.rotation.x = 2;
// mesh.rotation.y = Math.PI;
// mesh.rotation.z = 3;
mesh.rotation.set = (1, 1, 1);

scene.add(mesh);

// Axes Helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Objects
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x003321 })
);
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x446321 })
);
cube2.position.x = 2;
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x946321 })
);
cube3.position.x = -2;
group.add(cube3);
group.position.y = 1;

// Sizes
const sizes = {
  width: 800,
  height: 600,
};
//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);
// camera looks at
camera.lookAt(mesh.position);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
