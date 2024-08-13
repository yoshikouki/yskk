import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type ThreeObject = {
  object: THREE.Object3D;
  animate?: () => void;
};

export default class ThreeManager {
  private _scene: THREE.Scene;
  private _objects: ThreeObject[] = [];
  private _renderer: THREE.WebGLRenderer;
  private _animationId: number | null = null;
  private _camera: THREE.PerspectiveCamera;
  private _cameraControls: OrbitControls;

  constructor(canvas: HTMLCanvasElement) {
    this._renderer = this._initRenderer(canvas);
    this._scene = this._initScene();
    this._camera = this._initCamera();
    this._cameraControls = this._initCameraControls(canvas);
  }

  public setup(...objects: THREE.Object3D[]) {
    const cube = {
      object: new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0xff69b4 }),
      ),
      animate: () => {
        cube.object.rotation.x += 0.01;
        cube.object.rotation.y += 0.005;
      },
    };
    this.addObject(cube);
    this._animate();
  }

  public dispose() {
    this._scene.clear();
    this._renderer.dispose();
    this._cameraControls.dispose();
    this._stopAnimation();
    this._objects = [];
  }

  public addObject(object: ThreeObject) {
    this._objects.push(object);
    this._scene.add(object.object);
  }

  public resize = () => {
    const { width, height } = this._getSize();
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(width, height);
  };

  public debug() {
    // Show axes and grid
    this._scene.add(new THREE.AxesHelper(1000));
    this._scene.add(new THREE.GridHelper(10, 100, 0xdddddd, 0xdddddd));
  }

  private _getCanvas() {
    return this._renderer.domElement;
  }

  private _getSize(canvas = this._getCanvas()) {
    const width = canvas.parentElement?.clientWidth ?? canvas.clientWidth;
    const height = canvas.parentElement?.clientHeight ?? canvas.clientWidth;
    return { width, height };
  }

  private _animate = () => {
    this._animationId = requestAnimationFrame(this._animate);

    this._cameraControls.update();
    for (const object of this._objects) {
      if ("animate" in object && typeof object.animate === "function") {
        object.animate();
      }
    }

    this._renderer.render(this._scene, this._camera);
  };

  private _stopAnimation() {
    if (!this._animationId) {
      return;
    }
    cancelAnimationFrame(this._animationId);
    this._animationId = null;
  }

  private _initRenderer(canvas: HTMLCanvasElement) {
    const { width, height } = this._getSize(canvas);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    return renderer;
  }

  private _initScene() {
    const scene = new THREE.Scene();
    return scene;
  }

  private _initCamera() {
    const { width, height } = this._getSize();
    const camera = new THREE.PerspectiveCamera(
      // fov Camera frustum vertical field of view. Default `50`.
      50.0,
      // aspect Camera frustum aspect ratio. Default `1`.
      width / height,
      // near Camera frustum near plane. Default `0.1`.
      0.3,
      // far Camera frustum far plane. Default `2000`.
      20.0,
    );
    camera.position.set(0, 2, 5);
    return camera;
  }

  private _initCameraControls(canvas: HTMLCanvasElement) {
    const controls = new OrbitControls(this._camera, canvas);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = true;
    return controls;
  }
}
