import { AmbientLight, CameraHelper, Color, DirectionalLight, DirectionalLightHelper, Material, Mesh, MeshPhysicalMaterial, Object3D, PlaneBufferGeometry, PMREMGenerator, PointLight, RepeatWrapping, ShadowMaterial, Texture, TextureLoader, UnsignedByteType, WebGLRenderer } from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {HDRCubeTextureLoader} from 'three/examples/jsm/loaders/HDRCubeTextureLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Example } from './example';

export default class TextureExample extends Example {

  constructor(renderer: WebGLRenderer) {
    super(renderer);
  }

  public initialize() {
    super.initialize();
    //this._renderer.setClearColor(new Color('#FFFFFF'));
    this._renderer.shadowMap.enabled = true;

    const dir = new DirectionalLight();
    dir.add(dir.target);
    dir.target.position.set(0,-.5,-3);
    dir.shadow.camera.far = 5;
    dir.castShadow = true;
    this._scene.add(dir);


    //Threshold 3: Load Textures
    const material = new MeshPhysicalMaterial();
    const textureLoader = new TextureLoader();
    textureLoader.load(
          'assets/textures/rust/albedo.png', 
          (texture: Texture) => {
            texture.wrapS = RepeatWrapping;
            texture.wrapT = RepeatWrapping;
          material.map = texture;
          //material.needsUpdate = true;
          },
          undefined,
          (err) => console.error(err)
    );
    textureLoader.load(
      'assets/textures/rust/metallic.png', 
      (texture: Texture) => {
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
      material.metalnessMap = texture;
      //material.needsUpdate = true;
      },
      undefined,
      (err) => console.error(err)
    );
    textureLoader.load(
      'assets/textures/rust/normal.png', 
      (texture: Texture) => {
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        material.normalMap = texture;
      //material.needsUpdate = true;
      },
      undefined,
      (err) => console.error(err)
    );
    textureLoader.load(
      'assets/textures/rust/roughness.png', 
      (texture: Texture) => {
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        material.roughnessMap = texture;
      //material.needsUpdate = true;
      },
      undefined,
      (err) => console.error(err)
);
    

    //Threshold 1: Load OBJ
    const loader = new OBJLoader();
    loader.load('assets/models/material_sphere.obj', (object) => {
      object.traverse(function (child) {
        if (child instanceof Mesh){
          child.material = material;
          child.castShadow = true;
        }

      });
        object.position.set(0,-.5,-3);
        this._scene.add(object);
    });
    

    //Threshold 2: Add Controls
    const controls = new OrbitControls(this._cam, this._renderer.domElement);
    controls.update();

    //Threshold 4: Load Environment
    const pmremGenerator = new PMREMGenerator(this._renderer);
    pmremGenerator.compileCubemapShader();
    const hdrTexture = new HDRCubeTextureLoader()
    .setPath('assets/env/pisa/')
    .setDataType(UnsignedByteType) // This depends on the data type you load.
    .load(['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr'], () => {
        const target = pmremGenerator.fromCubemap(hdrTexture);
        this._scene.environment = target.texture;
        this._scene.background = target.texture;
    });

    const shadowPlane = new Mesh(new PlaneBufferGeometry(5,5), new ShadowMaterial());
    shadowPlane.rotation.x = Math.PI / 2;
    shadowPlane.receiveShadow = true;
 
    const cameraHelper = new CameraHelper(dir.shadow.camera);
    const helper = new DirectionalLightHelper(dir);
    this._scene.add(helper, cameraHelper);
        
    // @todo
  }

  public destroy(): void {
    super.destroy();
    // @todo
  }

  public update(): void {
    // @todo
  }

}
