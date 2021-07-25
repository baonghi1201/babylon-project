var canvas = document.getElementById("renderCanvas");
var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = async function() { 
            var engine = new BABYLON.WebGPUEngine(canvas);
            await engine.initAsync();
            return engine;
        };
var delayCreateScene = function () {
    
    var scene = new BABYLON.Scene(engine); 
    
    var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.dds", scene);
    var currentSkybox = scene.createDefaultSkybox(hdrTexture, true);

    var camera = new BABYLON.ArcRotateCamera(
        "Camera", 1, 0.8, 8, 
        new BABYLON.Vector3(0, 0, 0), 
        scene
        );

    BABYLON.SceneLoader.ImportMesh(
        "",
        "https://raw.githubusercontent.com/baonghi1201/babylon-project/main/",
        "glb.glb",
        scene,
        function (meshes) {          
            scene.createDefaultCameraOrLight(true, true, true);
            //scene.createDefaultEnvironment();
    });

    return scene;
};
        window.initFunction = async function() {               
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
window.scene = delayCreateScene();};
initFunction().then(() => {sceneToRender = scene        
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
}); 
