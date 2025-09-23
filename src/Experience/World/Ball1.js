import * as THREE from "three";
import Experience from "../Experience.js";

export default class Ball1 {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.time = this.experience.time;

    this.setModel();
  }

  setModel() {
    this.geo = new THREE.SphereGeometry(0.25);
    this.mat = new THREE.MeshStandardMaterial({ color: "green" });
    this.model = new THREE.Mesh(this.geo, this.mat);
    this.model.position.set(2, 0, -4);

    this.scene.add(this.model);
  }

  update() {
    this.model.position.y =
      0.14 - 0.05 * Math.sin(2 * Math.PI * 1.2 * (this.time.elapsed - 0.2));
  }
}
