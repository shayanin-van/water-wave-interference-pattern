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
    this.canvas = this.experience.canvas;
    this.drag = this.experience.camera.drag;

    // Resource
    this.resource = this.resources.items.waveGeneratorsModel;

    // Parameters
    this.switch1IsOn = false;
    this.switch2IsOn = true;
    this.timeAtLastClick1 = -14;
    this.timeAtLastClick2 = -14;

    this.setSurface();
    this.setBall1();
    this.setBall2();
    this.setEvent();

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
        uSwitch1IsON: { value: false },
        uSwitch2IsON: { value: true },
        uTimeAtLastClick1: { value: this.timeAtLastClick1 },
        uTimeAtLastClick2: { value: this.timeAtLastClick2 },
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

  setEvent() {
    this.canvas.addEventListener("click", () => {
      if (this.drag.raycaster.intersectObject(this.switch1Model).length != 0) {
        if (this.time.elapsed - this.timeAtLastClick1 < 6.8) {
          return;
        }
        this.switch1IsOn = !this.switch1IsOn;
        this.surfaceMat.uniforms.uSwitch1IsON.value = this.switch1IsOn;
        this.timeAtLastClick1 = this.time.elapsed;
        this.surfaceMat.uniforms.uTimeAtLastClick1.value = this.time.elapsed;
      }
      if (this.drag.raycaster.intersectObject(this.switch2Model).length != 0) {
        if (this.time.elapsed - this.timeAtLastClick2 < 6.8) {
          return;
        }
        this.switch2IsOn = !this.switch2IsOn;
        this.surfaceMat.uniforms.uSwitch2IsON.value = this.switch2IsOn;
        this.timeAtLastClick2 = this.time.elapsed;
        this.surfaceMat.uniforms.uTimeAtLastClick2.value = this.time.elapsed;
      }
    });
  }

  update() {
    // water surface
    this.surfaceMat.uniforms.uTime.value = this.time.elapsed;

    // ball 1
    if (this.switch1IsOn) {
      this.switch1Model.rotation.x = (15 * Math.PI) / 180;
      this.ball1Model.position.y =
        -0.05 * Math.sin(2 * Math.PI * 2.0 * (this.time.elapsed - 0.16));
    } else {
      this.switch1Model.rotation.x = -(15 * Math.PI) / 180;
    }

    // ball 2
    if (this.switch2IsOn) {
      this.switch2Model.rotation.x = (15 * Math.PI) / 180;
      this.ball2Model.position.y =
        -0.05 * Math.sin(2 * Math.PI * 2.0 * (this.time.elapsed - 0.16));
    } else {
      this.switch2Model.rotation.x = -(15 * Math.PI) / 180;
    }
  }
}
