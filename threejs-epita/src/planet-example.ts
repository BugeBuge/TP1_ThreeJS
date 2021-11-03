import  { AmbientLight, BoxGeometry, BufferAttribute, BufferGeometry, CircleGeometry, Color, EdgesGeometry, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, Object3D, PointLight, Points, PointsMaterial, SphereGeometry, WebGLRenderer } from 'three';
import  { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Example } from './example';

export default class PlanetsExample extends Example {

  constructor(renderer: WebGLRenderer) {
    super(renderer);
  }


  public initialize(): void {
    super.initialize();
    this._renderer.setClearColor(new Color('#000000'));

    
    //Threshold 1: Add Sun / Earth
    const geometrysun = new SphereGeometry(0.1, 32,16);
    const materialsun = new MeshBasicMaterial({color: 0xf4ff00});
    this._sun = new Mesh(geometrysun, materialsun);
    this._sun.position.set(0,0.1,0);
    this._scene.add(this._sun);

    const light = new PointLight();
    light.decay = 0.0;
    light.distance = 20.0;
    light.position.set(0,0,0);
    this._scene.add(light)//, new AmbientLight(0xffffff));

    const geo = new SphereGeometry(0.03,32,5);
    const materialearth = new MeshPhysicalMaterial({color:0x045f0d})
    this._earth = new Mesh(geo,materialearth);
    this._earth.position.set(0.3,0,0);
    this._scene.add(this._earth);
    this._sun.add(this._earth);

    //Threshold 2: Add Orbits
    const cir = new CircleGeometry(0.3,60,32);
    const Edge = new EdgesGeometry(cir);
    const mat = new LineBasicMaterial({ color:0x605f5f});
    const cercle = new LineSegments(Edge, mat);
    this._sun.add(cercle);
  

    //Threshold 3: Add Controls
    const controls = new OrbitControls(this._cam, this._renderer.domElement);
    controls.update();

    //Threshold 4: Add Mars
    const geomars = new SphereGeometry(0.01,32,5);
    const materialMars = new MeshPhysicalMaterial({color:0xdc7f0b});
    this._Mars = new Mesh(geomars, materialMars);
    this._Mars.position.set(0.5,0,0);
    this._sun.add(this._Mars);

    const cirmars = new CircleGeometry(0.5,60,32);
    const Edgemars = new EdgesGeometry(cirmars);
    const matmars = new LineBasicMaterial({ color:0x605f5f});
    const cerclemars = new LineSegments(Edgemars, matmars);
    this._sun.add(cerclemars);

    //Threshold 5: Use dat.gui
    var person = {age:45};
    this._gui.add(person,"age", 0,100);
    //this._gui.add(this._speed,"rotation", 0, 45);
    //this._gui.add(this._earth,"rotation speed",0,1);  ne fonctionne pas, la page est noir

    //Threshold 6: Improve!
    const geomoon = new SphereGeometry(0.01,32,5);
    const materialMoon = new MeshPhysicalMaterial({color:0xffffff});
    this._Moon = new Mesh(geomoon, materialMoon);
    this._Moon.position.set(0.06,0,0);
    this._earth.add(this._Moon);

    const cirmoon = new CircleGeometry(0.06,60,32);
    const Edgemoon = new EdgesGeometry(cirmoon);
    const matmoon = new LineBasicMaterial({ color:0x605f5f});
    const cerclemoon = new LineSegments(Edgemoon, matmoon);
    this._earth.add(cerclemoon);

    const getRandomParticelPos = (particleCount: number) => {
      const arr = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        arr[i] = (Math.random() - 0.5) * 10;
      }
      return arr;
    };

    const material = new PointsMaterial({
      size: 0.05,
      
    });
    const geometry = new BufferGeometry();
    geometry.setAttribute(
      "position",
      new BufferAttribute(getRandomParticelPos(350), 3)
    );
    const cube = new Points(geometry, material);
    this._scene.add(cube);
    



    // @todo
  }

  public destroy(): void {
    super.destroy();
    this._earth.visible = false;
    this._sun.visible = false;
    this._Mars.visible = false;
    this._Moon.visible = false;
  }

  public update(delta: number, _: number): void {
    //this._gui.add(this._sun.rotateZ,"rotation Speed", 0,1);
    this._sun.rotateZ(this._speed.sun);
    this._earth.rotateZ(this._speed.earth);
    this._Mars.rotateZ(this._speed.mars);
    // @todo
  }

}
function getRandomParticelPos(arg0: number): ArrayLike<number> {
  throw new Error('Function not implemented.');
}

