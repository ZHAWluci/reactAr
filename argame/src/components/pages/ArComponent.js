// ------------------------------------------------------------------------
// React Imports
// ------------------------------------------------------------------------

import React, {useEffect, useRef} from 'react'
import MetricsContainer from './MetricsContainer/MetricsContainer';
import Marker from '../organisms/Marker';
import FactoryModel from './../../assets/models/Factory_with_wifi.glb'
// ------------------------------------------------------------------------
// THREE.js and AR.js imports
// ------------------------------------------------------------------------

import * as THREE from "three";
import * as THREEx from "ar-js-org/three.js/build/ar-threex";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// ------------------------------------------------------------------------
// ArComponent
// ------------------------------------------------------------------------

const ArComponent = () => {

    // ------------------------------------------------------------------------
    // Init Canvas | The Canvas has to be initalized outside the useEffect() 
    // hook since useRef() is a hook itself.
    // ------------------------------------------------------------------------
    const canvas = useRef(
        <canvas class="webgl"></canvas>
    )

    useEffect(()=>{

    // ------------------------------------------------------------------------
    // Variables & THREE.js init for AR.js
    // ------------------------------------------------------------------------
    let arToolkitSource, arToolkitContext;
    window.THREE = THREE;
    
    // ------------------------------------------------------------------------
    // Scene
    // ------------------------------------------------------------------------
    const scene = new THREE.Scene();

    // ------------------------------------------------------------------------
    // Sizes
    // ------------------------------------------------------------------------
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // ------------------------------------------------------------------------
    // Camera
    // ------------------------------------------------------------------------

    let camera = new THREE.Camera()
    scene.add(camera);

    // ------------------------------------------------------------------------
    // Renderer 
    // ------------------------------------------------------------------------


    const renderer = new THREE.WebGLRenderer({
      antialias: true,
        alpha: true,
        canvas: canvas.current,
    });

    renderer.setSize(sizes.width, sizes.height);

    // ------------------------------------------------------------------------
    // AR Toolkit Source
    // ------------------------------------------------------------------------

    arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: "webcam",
        sourceWidth: window.innerWidth,
        sourceHeight: window.innerHeight,
        displayWidth: window.innerWidth,
        displayHeight: window.innerHeight,
    });

    // ------------------------------------------------------------------------
    // Function on Resize and Resizing
    // ------------------------------------------------------------------------
    
    const onResize = () => {
        arToolkitSource.onResizeElement();
        arToolkitSource.copyElementSizeTo(renderer.domElement);
        if (arToolkitContext.arController !== null) {
          arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
        }
      };
      
      
      arToolkitSource.init(function onReady() {
          onResize();
        });

    
        
    window.onload = ()=>{
        onResize()
    }

      window.addEventListener("resize", () => {
        onResize();
      });


    // ------------------------------------------------------------------------
    // Initialize arToolkitContext
    // ------------------------------------------------------------------------
    // arToolkitContext = new THREEx.ArToolkitContext({
    //     cameraParametersUrl: "data/camera_para.dat",
    //     detectionMode: "mono",
    //   });
      
    arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl:  "data/camera_para.dat",
      detectionMode: "mono_and_matrix",
      matrixCodeType: "3x3",
    });

      arToolkitContext.init(function onCompleted() {
          camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
          onResize()
      });

    // ------------------------------------------------------------------------
    // Build Marker Controls
    // ------------------------------------------------------------------------
    const gltfLoader = new GLTFLoader()

    let marker = new Marker('MarkerX', 1, scene, arToolkitContext, ()=>{console.log("This is setActive Maker")}, false)
    gltfLoader.load(
      FactoryModel,
      (gltf)=>{
        gltf.scene.traverse((child)=>{
          if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
              child.castShadow = true
          }
        })
        gltf.scene.scale.set(0.05,0.05,0.05)
        marker.addMesh(gltf.scene)
      }
    )


    // ------------------------------------------------------------------------
    // Lights
    // ------------------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5)
    scene.add(ambientLight)

     // ------------------------------------------------------------------------
    // Update arToolkitSource.ready
    // ------------------------------------------------------------------------

    const update = ()=> {
        // update artoolkit on every frame
        if (arToolkitSource.ready !== false)
          arToolkitContext.update(arToolkitSource.domElement);
    }


    // ------------------------------------------------------------------------
    // Render Scene & Animation loop
    // ------------------------------------------------------------------------
    const animate = () => {
        window.requestAnimationFrame(animate)
        update()
        renderer.render(scene,camera)
    };
    animate()    

},[])

    
    return (
        <React.Fragment>
            <MetricsContainer />
            <canvas ref={canvas}></canvas>
        </React.Fragment>
        
    )
}

export default ArComponent
