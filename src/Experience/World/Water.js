import * as THREE from "three";
import Experience from "../Experience.js";
import waterVertex from "../../Shaders/water/waterVertex.glsl";
import waterFragment from "../../Shaders/water/waterFragment.glsl";

export default class Water {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.time = this.experience.time;

    // Resource
    this.resource = this.resources.items.waveGeneratorsModel;

    this.setSurface();
    this.setBall1();
    this.setBall2();

    // axes helper (for dev purpose)
    // this.axis = new THREE.AxesHelper(10);
    // this.scene.add(this.axis);
  }

  setSurface() {
    this.surfaceGeo = new THREE.PlaneGeometry(10, 10, 128, 128);
    this.surfaceMat = new THREE.ShaderMaterial({
      vertexShader: waterVertex,
      fragmentShader: waterFragment,
      wireframe: true,
      uniforms: {
        uTime: { value: 0 },
      },
    });
    this.surfaceModel = new THREE.Mesh(this.surfaceGeo, this.surfaceMat);
    this.surfaceModel.rotateX(-Math.PI / 2);

    this.scene.add(this.surfaceModel);
  }

  setBall1() {
    this.resource.scene.traverse((child) => {
      if (child.name === "ball1") {
        this.ball1Model = child;
      }
      if (child.name === "switchBox1") {
        this.switchBox1Model = child;
      }
      if (child.name === "switch1") {
        this.switch1Model = child;
      }
    });

    this.scene.add(this.ball1Model);
    this.scene.add(this.switchBox1Model);
    this.scene.add(this.switch1Model);
  }

  setBall2() {
    this.resource.scene.traverse((child) => {
      if (child.name === "ball2") {
        this.ball2Model = child;
      }
      if (child.name === "switchBox2") {
        this.switchBox2Model = child;
      }
      if (child.name === "switch2") {
        this.switch2Model = child;
      }
    });

    this.scene.add(this.ball2Model);
    this.scene.add(this.switchBox2Model);
    this.scene.add(this.switch2Model);
  }

  update() {
    // water surface
    this.surfaceMat.uniforms.uTime.value = this.time.elapsed;

    // ball 1
    this.ball1Model.position.y =
      -0.05 * Math.sin(2 * Math.PI * 1.2 * (this.time.elapsed - 0.16));

    // ball 2
    this.ball2Model.position.y =
      -0.05 * Math.sin(2 * Math.PI * 1.2 * (this.time.elapsed - 0.16));
  }
}
