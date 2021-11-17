import { AmbientLight, AnimationMixer, Clock, Object3D, PointLight, Scene, WebGLRenderer } from 'three';
import { Example } from './example';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {BokehPass} from 'three/examples/jsm/postprocessing/BokehPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import {CopyShader} from 'three/examples/jsm/shaders/CopyShader'
import { BleachBypassShader } from 'three/examples/jsm/shaders/BleachBypassShader'

export default class GLTFExample extends Example {

  constructor(renderer: WebGLRenderer) {
    super(renderer);
  }

  

  public initialize() {
    super.initialize();

    const controls = new OrbitControls(this._cam, this._renderer.domElement);
    controls.update();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('node_modules/three/examples/js/libs/draco/gltf/')

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader)
    loader.load(
        'assets/models/LittlestTokyo.glb', (gltf) => {
          gltf.scene.scale.set(0.001,0.001,0.001);
          console.log(gltf);
          this._scene.add(gltf.scene)
          this._mixer = new AnimationMixer(gltf.scene);
          this._mixer.clipAction(gltf.animations[0]).play();
        }
    )

    const light = new PointLight();
    light.decay = 0.0;
    light.distance = 20.0;
    light.position.set(0,10,0);
    this._scene.add(light, new AmbientLight(0xffffff));

    const dofpass = new BokehPass(this._scene, this._cam, {
      aperture: 0.5,
      focus : 1,
      maxblur : 0.01
    })
    
		var renderPass = new RenderPass(this._scene, this._cam);

		//var bokehPass = new BokehPass(this._scene, this._cam, bokehSettings);
		//bokehPass.renderToScreen = true;
    this._composer.addPass(renderPass);
		this._composer.addPass(dofpass);

		this._renderer.autoClear = false;
    //bokehPass.renderTargetDepth.setSize(innerWidth, innerHeight);

    this._clock = new Clock();
    // @todo
  }

  public destroy(): void {
    super.destroy();
    // @todo
  }

  public update(): void {
    
    const delta = this._clock.getDelta();
    if (this._mixer != undefined)
      this._mixer.update(delta)

    this._composer.render(0.1)
    // @todo
  }

}
