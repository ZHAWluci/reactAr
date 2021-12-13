// ------------------------------------------------------------------------
// THREE.js and AR.js imports
// ------------------------------------------------------------------------

import * as THREE from "three";
import * as THREEx from "ar-js-org/three.js/build/ar-threex";
window.THREE = THREE;

// ------------------------------------------------------------------------
// Create Marker
// ------------------------------------------------------------------------


export default class Marker {
    constructor(name,matrixvalue,scene,arToolkitContext,setActiveMarker, custom=false){
        this.markerRoot = null
        this.markerFound = null
        this.scene = scene
        this.arToolkitContext = arToolkitContext
        if(custom){
          alert(matrixvalue)
          this.createCustomMarker(name,matrixvalue)
        }else{
          this.createMarker(name,matrixvalue)
        }
        this.setActiveMarker = setActiveMarker
    }
    createMarker(name, matrixvalue) {
    // build markerControls
    let markerRoot = new THREE.Group();
    this.scene.add(markerRoot)
    markerRoot.name = name;
    let markerControl = new THREEx.ArMarkerControls(
      this.arToolkitContext,
      markerRoot,
      {
        type: "barcode",
        barcodeValue: matrixvalue,
      }
    );

    markerControl.addEventListener("markerFound", (event) => {
      this.markerFound = event.target.parameters.barcodeValue;
      if (this.markerFound !== this.oldBarcodeValue) {
        this.setActiveMarker(this.markerFound)
      }
    });

    this.markerRoot = markerRoot; // add this to scene
  }

  createCustomMarker(name, markerpath) {
    // build markerControls
    let markerRoot = new window.THREE.Group();
    this.scene.add(markerRoot);
    markerRoot.name = name;
    let markerControl = new THREEx.ArMarkerControls(
      this.arToolkitContext,
      markerRoot,
      {
        type: "pattern",
        patternUrl: markerpath,
      }
    );
    this.markerRoot = markerRoot; // add this to scene
  }

  addMesh = (mesh) => {
    mesh.position.y = 0.5;
    this.markerRoot.add(mesh);
  };
  
}


