/**
 * Created by Auspic on 2017/2/24.
 */
"use strict";
$(function () {
    console.log("百度前端技术学院 !");


            var scene = new THREE.Scene(); // 创建场景
            var camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.5,1000);  //创建透视照相机
            camera.position.set(-30,40,30);     //  照相机位置设置
            camera.lookAt(new THREE.Vector3(0,0,0));        //   照相机观察点设置
            scene.add(camera);     // ? 场景中是否需要加入照相机

            var render = new THREE.WebGLRenderer({antialias:true});   //创建一个渲染器
            render.setClearColor(0x666666);           //渲染器底色
            render.setSize(window.innerWidth , window.innerHeight);   //渲染器大小

            var cubeGemotry = new THREE.CubeGeometry(12,10,28);     // 创建几何体
            var cubeMaterital = new THREE.MeshPhysicalMaterial({color:0xC9C9C9 });  //几何体的材质
            var cube  = new THREE.Mesh(cubeGemotry , cubeMaterital); //合成一个几何体
            cube.position.set(0,0,0);   //设置物理的位置
            scene.add(cube);          //将物理添加到场景中去

            var torusGemotry = new THREE.TorusGeometry(2,0.8,100,100);
            var torus = {};
            var pos = {x:0,y:0,z:0};
            for(let i = 0 ;i <4 ; i++){
                torus[i] = new THREE.Mesh(torusGemotry , cubeMaterital);
                if(i == 0){
                    pos.x = -6;
                    pos.y = -5;
                    pos.z = 10;
                }else if( i == 1) {
                    pos.x = -6;
                    pos.y = -5;
                    pos.z = -10;
                }else if(i == 3){
                    pos.x = 6;
                    pos.y = -5;
                    pos.z = 10;
                }
                else{
                    pos.x = 6;
                    pos.y = -5;
                    pos.z = -10;
                }
                torus[i].position.set(pos.x,pos.y,pos.z);
                torus[i].rotation.y =  Math.PI / 2;
                scene.add(torus[i]);
            }


            //添加光源
            var spotlight = new THREE.SpotLight(0xffffff);
            spotlight.position.set(-10,20,10);
            spotlight.target = cube;
            scene.add(spotlight);



            var controls = new THREE.OrbitControls( camera, render.domElement );
            controls.addEventListener( 'change', function(){
                render.render(scene,camera);
            } );
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.enableZoom = false;
            $("#webglBox").append(render.domElement);      //在div容器中插入canvas标签
            render.render(scene,camera);          // 渲染器渲染 场景 和 相机


});