let scene, camera, renderer, controls;

function init() {
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x18181b);

  // Camera
  camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
  );
  camera.position.set(0, 1, 3);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("viewer").appendChild(renderer.domElement);

  // Lights
  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
  scene.add(light);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(3, 10, 10);
  scene.add(dirLight);

  // Controls (mouse interaction)
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = true;   // drag with right mouse
  controls.enableZoom = true;  // scroll wheel

  // Load 3D Model
  const loader = new THREE.GLTFLoader();
  loader.load(
    "model/moss_sword.glb", // path to your model
    (gltf) => {
      scene.add(gltf.scene);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + "% loaded");
    },
    (error) => {
      console.error("Error loading model:", error);
    }
  );

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


init();
