import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';

var pink = 0xff91bb;
var lemon = 0xffd95c;
var sky = 0x4ac6d7;
var sunset = 0xf5855b;
var soda = 0x68bbb8;
var crimson = 0xe81b23;
var colors = [pink, lemon, sky, sunset, soda, crimson];

var scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

var controls = new TrackballControls( camera );
controls.rotateSpeed = 2.0;
controls.zoomSpeed = 2.0;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial( {
  vertexColors: THREE.FaceColors,
  opacity: 0.2
});

var colorCounter = 0;
for (var i = 0; i < geometry.faces.length; i += 2) {
  geometry.faces[i].color.setHex(colors[colorCounter]);
  geometry.faces[i+1].color.setHex(colors[colorCounter]);
  colorCounter++;
};

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  geometry.colorsNeedUpdate = true;
  controls.update();
  renderer.render(scene, camera);
}

animate();