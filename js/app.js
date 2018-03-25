// Renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 4;

// Lights
var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

// Scene
var scene = new THREE.Scene();
scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

// Load object
var obj;
var folder = '/kfc/'
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath(folder);
mtlLoader.setPath(folder);
mtlLoader.load( 'KFC Bucket.mtl', function( materials ) {
    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials( materials );
    objLoader.setPath(folder );
    objLoader.load( 'KFC Bucket.obj', function ( object ) {
        obj = object;
        obj.position.y = -3.5;
        scene.add( obj );
    });

});

// Main Loop
function animate() {
    requestAnimationFrame( animate );

    if (obj && obj.position.y < -1) {
        obj.position.y += 0.02;
        obj.rotation.y -= 0.011;
    }

    renderer.render( scene, camera );
}
animate();
