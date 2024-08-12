"use client";

import * as THREE from "three";

export default function ThreeScene() {
  const canvasRef = (canvas: HTMLCanvasElement) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      canvas,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff69b4 }); // ホットピンク
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.005;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  };

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;
}
