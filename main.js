import * as THREE from 'three';

import { XYZLoader } from 'three/addons/loaders/XYZLoader.js';

let camera, scene, renderer, clock;

let points;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.01, 100 );
    camera.position.set( 10, 7, 10 );

    scene = new THREE.Scene();
    scene.add( camera );
    camera.lookAt( scene.position );

    clock = new THREE.Clock();

    const loader = new XYZLoader();
    loader.load( 'frame_hy1_resample.xyz', function ( geometry ) {

        geometry.center();

        const vertexColors = ( geometry.hasAttribute( 'color' ) === true );

        const material = new THREE.PointsMaterial( { size: 0.001, vertexColors: vertexColors } );

        points = new THREE.Points( geometry, material );
        scene.add( points );

    } );

    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    const delta = clock.getDelta();

    if ( points ) {

        //points.rotation.x += delta * 0.1;
        //points.rotation.y += delta * 0.1;
        points.rotation.z += delta * 0.1;
        
    }

    renderer.render( scene, camera );

}
