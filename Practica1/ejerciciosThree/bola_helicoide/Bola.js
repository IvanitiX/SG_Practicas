class Bola extends THREE.Object3D{
    constructor(cilindro_asociado){
        super();

        this.cil_asociado = cilindro_asociado;
        this.bola = this.createBola();
        this.add(this.bola);
        this.tope = true ;
    }

    createBola(){
        var satGeom = new THREE.SphereGeometry(2,20,20);
        this.rad_bola = 2;
        var satMat = new THREE.MeshNormalMaterial();
        satGeom.translate(0,1.5,0);
        this.satelite = new THREE.Mesh(satGeom,satMat);

        this.tiempo_anterior = Date.now();

        return this.satelite;
    }

    update(){
        this.velocidad_angular = Math.PI/2; // Ya que quiero que de la vuelta en 4 segundos
        this.velocidad_paso = this.velocidad_angular / (0.5*Math.PI);
        this.bola.position.x = this.cil_asociado.guiControls.radius;

        var tiempo_actual = Date.now();
        var segundos_transcurridos = (tiempo_actual-this.tiempo_anterior)/1000;
        
        this.rotation.y += this.velocidad_angular*segundos_transcurridos;
        if (this.bola.position.y >= 16) this.tope = false ;
        if (this.bola.position.y <= 0) this.tope = true ;
        if (this.tope) this.bola.position.y += this.velocidad_paso*segundos_transcurridos;
        else this.bola.position.y -= this.velocidad_paso*segundos_transcurridos;

        this.tiempo_anterior = tiempo_actual;
    }
}