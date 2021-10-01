// ------------------------------------------------------------------------
// React Imports
// ------------------------------------------------------------------------

import React, {useEffect, useRef, useState} from 'react'
import MetricsContainer from './MetricsContainer/MetricsContainer';

// ------------------------------------------------------------------------
// Import Patterns 
// ------------------------------------------------------------------------

import pattern1 from '../../assets/img/patterns/pattern-1.patt';
import pattern2 from '../../assets/img/patterns/pattern-2.patt';
import pattern3 from '../../assets/img/patterns/pattern-3.patt'
import pattern4 from '../../assets/img/patterns/pattern-4.patt'
import pattern5 from '../../assets/img/patterns/pattern-5.patt'
import pattern6 from '../../assets/img/patterns/pattern-6.patt'
import pattern7 from '../../assets/img/patterns/pattern-7.patt'
import pattern9 from '../../assets/img/patterns/pattern-9.patt'
import pattern10 from '../../assets/img/patterns/pattern-10.patt'
import pattern11 from '../../assets/img/patterns/pattern-11.patt'
import pattern12 from '../../assets/img/patterns/pattern-12.patt'


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
    // Active Pattern State
    // ------------------------------------------------------------------------
    const [activePattern, setActivePattern] = useState('')

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
        cameraParametersUrl:  "data/camera_para.dat",
        detectionMode: "mono",
      });
  
      arToolkitContext.init(function onCompleted() {
          camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
          onResize()
      });

    // ------------------------------------------------------------------------
    // Build Marker Controls
    // ------------------------------------------------------------------------
    const patternArray = [pattern1,pattern2,pattern3,pattern4,pattern5,pattern6,pattern7,pattern9,pattern10,pattern11,pattern12] // All Cards
    // const svgArray = []  

    for(const i in patternArray){
      
      // Create Marker Control
      const markerRoot = new THREE.Group()
      scene.add(markerRoot)
      const markerControl = new THREEx.ArMarkerControls(arToolkitContext,markerRoot,{
        type: "pattern",  
        patternUrl: patternArray[i],
      })

      // Create Geometry
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(10,10,10),
        new THREE.MeshBasicMaterial({
          color: "red",
          side: THREE.DoubleSide
        })
      )
      mesh.position.y = 0.5
      markerRoot.add(mesh)

      // Create Event Listener for each marker
      markerControl.addEventListener('markerFound', (event)=>{
          
          // ------------------------------------------------------------------------
          // Determine Active Marker
          // ------------------------------------------------------------------------
          // Explanation: 
          //
          // The patternUrl of the scanned marker has the following form: 
          // /static/media/fileName.someNr.patt
          // We want to determine the fileName so we can make that the activePattern
          // 1. To do so we first split the Url into an array at "/" and save that array
          // 2. Of that array we select the last array entry and split that again at the "."
          // 3. Of tha newly generated Array we then select the first entry which will be our file name
          // This file name is then saved into the variable patternName

          let patternUrl = event.target.parameters.patternUrl
          let patternNameArray = patternUrl.split("/")
          let patternName = patternNameArray[patternNameArray.length -1].split(".")[0]
          setActivePattern(patternName)
      })
    }

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
            <MetricsContainer activeCard={activePattern} />
            <canvas ref={canvas}></canvas>
        </React.Fragment>
        
    )
}

export default ArComponent



