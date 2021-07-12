
window.addEventListener("DOMContentLoaded", function(){
    var canvas = document.getElementById("canvas")
    var engine = new BABYLON.Engine(canvas,true)
    var createScene= function(){
        var scene = new BABYLON.Scene(engine);
       
        scene.clearColor = new BABYLON.Color3.Blue()
        
        var camera = new BABYLON.UniversalCamera(
            "UniversalCamera",
            new BABYLON.Vector3(2,3,-10),
            scene
            );

        camera.setTarget(BABYLON.Vector3.Zero());

        camera.attachControl(canvas,true);
        
        var box  = BABYLON.Mesh.CreateBox("Box",4.0,scene)

        return scene;
    }

    var scene = createScene();

    engine.runRenderLoop(function(){
        scene.render();
    });
});