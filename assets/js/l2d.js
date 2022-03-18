class L2D {
    constructor(basePath) {
        this.basePath = basePath;
        this.loader = new window.PIXI.loaders.Loader(this.basePath);
        this.animatorBuilder = new window.LIVE2DCUBISMFRAMEWORK.AnimatorBuilder();
        this.timeScale = 1;
        this.models = {};
    }

    setPhysics3Json(value) {
        if (!this.physicsRigBuilder) {
            this.physicsRigBuilder = new window.LIVE2DCUBISMFRAMEWORK.PhysicsRigBuilder();
        }
        this.physicsRigBuilder.setPhysics3Json(value);

        return this;
    }

    load(name, v, callback) {
        if (!this.models[name]) {
            let modelDir = name;
            let str = name.split('/')
            name = name.split('/').pop();
            let modelPath = '';
            let textures = new Array();
            let textureCount = 0;
            let motionNames = new Array();
            let initPath = 'file:///';
            str.map((data, index) => {
                if (index <= str.length - 2) {
                    if (data) {
                        initPath += ('/' + data)
                    }
                }
            })
            initPath += '/'
            console.log(initPath, name)
            this.loader.add(name + '_model', modelDir + modelPath, { xhrType: window.PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });

            this.loader.load((loader, resources) => {
                let model3Obj = resources[name + '_model'].data;
                if (typeof(model3Obj['FileReferences']['Moc']) !== "undefined") {
                    loader.add('_moc', initPath + model3Obj['FileReferences']['Moc'], { xhrType: window.PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER });
                }

                if (typeof(model3Obj['FileReferences']['Textures']) !== "undefined") {
                    model3Obj['FileReferences']['Textures'].forEach((element) => {
                        loader.add('_texture' + textureCount, initPath + element);
                        textureCount++;
                    });
                }

                if (typeof(model3Obj['FileReferences']['Physics']) !== "undefined") {
                    loader.add('_physics', initPath + model3Obj['FileReferences']['Physics'], { xhrType: window.PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                }

                if (typeof(model3Obj['FileReferences']['Motions']) !== "undefined") {
                    for (let group in model3Obj['FileReferences']['Motions']) {
                        model3Obj['FileReferences']['Motions'][group].forEach((element) => {
                            let motionName = element['File'].split('/').pop().split('.').shift();
                            loader.add('_' + motionName, initPath + element['File'], { xhrType: window.PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON });
                            motionNames.push('_' + motionName);
                        });
                    }
                }

                let groups = null;
                if (typeof(model3Obj['Groups'] !== "undefined")) {
                    groups = window.LIVE2DCUBISMFRAMEWORK.Groups.fromModel3Json(model3Obj);
                }
                loader.load((l, r) => {
                    let moc = null;
                    if (typeof(r['_moc']) !== "undefined") {
                        moc = Live2DCubismCore.Moc.fromArrayBuffer(r['_moc'].data);
                    }

                    if (typeof(r['_texture' + 0]) !== "undefined") {
                        for (let i = 0; i < textureCount; i++) {
                            textures.splice(i, 0, r['_texture' + i].texture);
                        }
                    }

                    if (typeof(r['_physics']) !== "undefined") {
                        this.setPhysics3Json(r['_physics'].data);
                    }

                    let motions = new Map();
                    motionNames.forEach((element) => {
                        let n = element.split('_').pop();
                        motions.set(n, window.LIVE2DCUBISMFRAMEWORK.Animation.fromMotion3Json(r[element].data));
                    });
                    let model = null;
                    let coreModel = Live2DCubismCore.Model.fromMoc(moc);
                    if (coreModel == null) {
                        return;
                    }

                    let animator = this.animatorBuilder
                        .setTarget(coreModel)
                        .setTimeScale(this.timeScale)
                        .build();

                    let physicsRig = this.physicsRigBuilder
                        .setTarget(coreModel)
                        .setTimeScale(this.timeScale)
                        .build();

                    let userData = null;
                    model = window.LIVE2DCUBISMPIXI.Model._create(coreModel, textures, animator, physicsRig, userData, groups);
                    model.motions = motions;
                    this.models[name] = model;
                    let list = v.changeCanvas(model);
                    if (callback) {
                        callback(list)
                    }
                });
            });
        } else {
            list = v.changeCanvas();
            if (callback) {
                callback(list)
            }
        }
    }
}
export default L2D