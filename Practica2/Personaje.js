class Personaje extends THREE.Object3D{
constructor(){
    super();

    var that = this ;
    var materialLoader = new THREE.MTLLoader();
    var objectLoader = new THREE.OBJLoader();

    materialLoader.setMaterialOptions({side: THREE.DoubleSize}).load('models/chicken/chicken.mtl',
        function(material){
            objectLoader.setMaterials(material);
            objectLoader.load('models/chicken/chicken.obj',
            function(objeto){
                var modelo = objeto ;
                objeto.children[0].material.map.anisotropy = 16 ;
                objeto.children[0].material.map.minFilter = THREE.LinearFilter;
                //Collider
                var bounding = new THREE.BoxHelper(modelo);
                bounding.geometry.computeBoundingBox();
                var bb = bounding.geometry.boundingBox;
                var geomCollider = new THREE.BoxGeometry(bb.max.x-bb.min.x,bb.max.y-bb.min.y,bb.max.z-bb.min.z);
                geomCollider.translate(0,0,-0.5);
                var matCollider = new THREE.MeshPhongMaterial({color:0xabc, transparent:true, opacity:0.5});
                var collider = new THREE.Mesh(geomCollider,matCollider);
                collider.add(modelo);
                that.add(collider);
            },
            // called when loading is in progresses
            function ( xhr ) {
        
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            },
            // called when loading has errors
            function ( error ) {
        
                console.log( 'An error happened' );
        
            });
        }); 
        
        this.anterior = Date.now() ;
}

/*saltar(distancia,tiempototal){
    this.anterior = Date.now() ;
    console.log(this.position);

    var time = Date.now();
    var elapsed = time-ant ;
    if(elapsed < tiempototal){
        if (elapsed < tiempototal/2) {
            this.position.y += elapsed/tiempototal;
            this.position.z += distancia * elapsed/tiempototal;
        } else {
            this.position.y -= elapsed/tiempototal;
            this.position.z += distancia * elapsed/tiempototal;
        }
    }
    else{
        this.position.y = 2.2 ;
    }
}*/

aplastarY(reloj,tiempototal){
    var time = reloj.getDelta()  ;
    if(reloj.getElapsedTime()<tiempototal){
        this.scale.y = this.scale.y - time/tiempototal ;
        this.position.y -= 2*time/tiempototal; 
    }
}

aplastarZ(reloj,tiempototal){
    var time = reloj.getDelta()  ;
    if(reloj.getElapsedTime()<tiempototal){
        this.scale.z = this.scale.z - time/tiempototal ;
    }
}

update(estado, distancia, tiempo){
    if (estado == MyScene.JUMP){
        this.saltar(distancia,tiempo) ; 
    }
}
}