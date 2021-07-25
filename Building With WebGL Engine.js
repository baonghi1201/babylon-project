window.addEventListener("DOMContentLoaded", function(){
    var canvas = document.getElementById("renderCanvas")
    var engine = new BABYLON.Engine(canvas,true)
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
            "https://raw.githubusercontent.com/baonghi1201/GLB/main/",
            "glb.glb", 
            scene,
            function (mesh) {          
                scene.createDefaultCameraOrLight(true, true, true);
                //scene.createDefaultEnvironment();
        });
    
        return scene;
    };

    var scene = delayCreateScene();

    engine.runRenderLoop(function () {
            scene.render();
    }); 
});