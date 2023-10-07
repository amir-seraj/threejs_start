import * as THREE from "three";
import gsap from "gsap";

const sizes = {
  width: 900,
  height: 800,
};

const scene = new THREE.Scene();

const material = new THREE.MeshBasicMaterial({ color: 0x00a693 });

const geometry = new THREE.BoxGeometry(1, 1, 1);

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

// //time
// let time = Date.now();

// Clock
// const clock = new THREE.Clock();
//look at the cube
gsap.to(mesh.position, {
  x: 2,
  duration: 1,
  delay: 1,
});
// Animation
const tick = () => {
  //time
  //   const currentTime = Date.now();
  //   const deltaTime = currentTime - time;
  //   time = currentTime;
  // update obj
  //   mesh.position.x += 0.001*deltaTime;
  //Clock
  //   const elapsedTime = clock.getElapsedTime();
  //   //   mesh.rotation.y = elapsedTime * Math.PI * 2;
  //   camera.rotation.y = Math.sin(elapsedTime);
  //   mesh.rotation.x = Math.cos(elapsedTime);
  //   camera.lookAt(mesh.position);

  //render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
