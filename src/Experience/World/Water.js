import * as THREE from "three";
import Experience from "../Experience.js";
import waterVertex from "../../Shaders/water/waterVertex.glsl";
import waterFragment from "../../Shaders/water/waterFragment.glsl";

export default class Water {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.time = this.experience.time;

    this.setModel();

    // axes helper (for dev purpose)
    this.axis = new THREE.AxesHelper(10);
    this.scene.add(this.axis);
  }

  setModel() {
    this.geo = new THREE.PlaneGeometry(10, 10, 128, 128);
    this.mat = new THREE.ShaderMaterial({
      vertexShader: waterVertex,
      fragmentShader: waterFragment,
      wireframe: true,
      uniforms: {
        uTime: { value: 0 },
      },
    });
    this.model = new THREE.Mesh(this.geo, this.mat);
    this.model.rotateX(-Math.PI / 2);

    this.scene.add(this.model);
  }

  update() {
    this.mat.uniforms.uTime.value = this.time.elapsed;
  }
}
