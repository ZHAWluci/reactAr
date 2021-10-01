// ------------------------------------------------------------------------
// React Imports
// ------------------------------------------------------------------------

import React, {useEffect, useRef} from 'react'
import MetricsContainer from './MetricsContainer/MetricsContainer';

// ------------------------------------------------------------------------
// THREE.js and AR.js imports
// ------------------------------------------------------------------------

import * as THREE from "three";
import * as THREEx from "ar-js-org/three.js/build/ar-threex";

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
    arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: "data/camera_para.dat",
        detectionMode: "mono",
      });
  
      arToolkitContext.init(function onCompleted() {
          camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
          onResize()
      });

    // ------------------------------------------------------------------------
    // Build Marker Controls
    // ------------------------------------------------------------------------
    let marker = new THREE.Group();
    scene.add(marker);

    new THREEx.ArMarkerControls(arToolkitContext, marker, {
      type: "pattern",
      patternUrl: "data/hiro.patt",
    });


    // ------------------------------------------------------------------------
    // Geometry
    // ------------------------------------------------------------------------
    
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: "red",
        side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    marker.add(mesh)

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
