import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

function svgRenderer(svg) {
    // Get SVG's markup
    const svgMarkup = svg
    const loader = new SVGLoader();
    const svgData = loader.parse(svgMarkup);
    // Group that will contain all of our paths
    const svgGroup = new THREE.Group();

    const material = new THREE.MeshNormalMaterial({
      side:THREE.DoubleSide
    });

    // Loop through all of the parsed paths
    svgData.paths.forEach((path, i) => {
      const shapes = path.toShapes(true);

      // Each path has array of shapes
      shapes.forEach((shape, j) => {
        // Finally we can take each shape and extrude it
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 20,
          bevelEnabled: false,
        });


        // Create a mesh and add it to the group
        const mesh = new THREE.Mesh(geometry, material);

        svgGroup.add(mesh);
      });
    });

    // Add our group to the scene (you'll need to create a scene)
    return svgGroup;
  }

  export default svgRenderer