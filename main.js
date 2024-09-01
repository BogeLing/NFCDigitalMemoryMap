import { mod } from 'three/examples/jsm/nodes/Nodes.js';
import * as THREE from '/node_modules/three/build/three.module.js';
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';

let backgroundPicture = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/background1.jpg';
let preloadedModels = {}; // 存储预加载的模型
let adjustmentFactor = { x: 2, y: 0, z: -0.4 }; // 调整模型位置的因子
let sceneInitialized = false; // 标志Three.js场景是否已经初始化
let currentMainModel = null; // 当前使用的主模型
let currentModalModel = null; // 当前使用的模态窗口模型

let camera;
let mainCamera;

// 模型的URL地址
let pavilion2Url = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/pavilion2.glb';
let pavilion2ColoredUrl = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/pavilion2Colored.glb';

let wisdomBar2Url = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/wisdomBar2.glb';
let people2Url = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/people2.glb';
let navigation2Url = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/navigation2.glb';
let GYM2Url = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/GYM2.glb';
let gate2Url = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/gate2.glb';
let CB2Url = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/CB2.glb';
let boat2Url = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/boat2.glb';

let people2ColoredUrl = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/people2Colored.glb';
let navigation2ColoredUrl = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/navigation2Colored.glb';
let GYM2ColoredUrl = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/GYM2Colored.glb';
let gate2ColoredUrl = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/gate2Colored.glb';
let boat2ColoredUrl = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/boat2Colored.glb';
let CB2ColoredUrl = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/CB2Colored.glb';
let wisdomBar2ColoredUrl = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/wisdomBar2Colored.glb';

let pavilion1Url = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/pavilion1.glb';
let pavilion1ColoredUrl = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/pavilion1Colored.glb';

let wisdomBar1Url = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/wisdomBar1.glb';
let people1Url = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/people1.glb';
let navigation1Url = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/navigation1.glb';
let GYM1Url = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/GYM1.glb';
let gate1Url = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/gate1.glb';
let CB1Url = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/CB1.glb';
let boat1Url = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/boat1.glb'; 

let people1ColoredUrl = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/people1Colored.glb';
let navigation1ColoredUrl = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/navigation1Colored.glb';
let GYM1ColoredUrl = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/GYM1Colored.glb';
let gate1ColoredUrl = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/gate1Colored.glb';
let boat1ColoredUrl = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/boat1Colored.glb';
let CB1ColoredUrl = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/CB1Colored.glb';
let wisdomBar1ColoredUrl = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/wisdomBar1Colored.glb';

let mark = 'https://xjtlubuildings.oss-cn-shanghai.aliyuncs.com/mark.glb';

let isModalOpen = false; // 标志 modal 是否打开
let currentTime = document.getElementById("Number");
let informationUI = document.getElementById("InformationUI");
let information = document.getElementById('information');

// 获取模态窗口元素
var modal = document.getElementById("Modal");

// 获取按钮元素
var btnNavigation2 = document.getElementById("openButtonNavigation2");
var btnNavigation2Colored = document.getElementById("openButtonNavigation2Colored");
var btnCB2 = document.getElementById("openButtonCB");
var btnCB2Colored = document.getElementById("openButtonCBColored");
var btnBoat2 = document.getElementById("openButtonFB");
var btnBoat2Colored = document.getElementById("openButtonFBColored");
var btnGate2 = document.getElementById("openButtonSB");
var btnGate2Colored = document.getElementById("openButtonSBColored");
var btnPavilion2 = document.getElementById("openButtonPavilion");
var btnPavilion2Colored = document.getElementById("openButtonPavilionColored");
var btnGYM2 = document.getElementById("openButtonGYM");
var btnGYM2Colored = document.getElementById("openButtonGYMColored");
var btnPeople2 = document.getElementById("openButtonHS");
var btnPeople2Colored = document.getElementById("openButtonHSColored");
var btnWisdomBar2 = document.getElementById("openButtonWisdomBar");
var btnWisdomBar2Colored = document.getElementById("openButtonWisdomBarColored");

// 获取源模型按钮元素
var btnNavigation2Source = document.getElementById("openButtonNavigationSource");
var btnNavigation2ColoredSource = document.getElementById("openButtonNavigationColoredSource");
var btnCB2Source = document.getElementById("openButtonCBSource");
var btnCB2ColoredSource = document.getElementById("openButtonCBColoredSource");
var btnBoat2Source = document.getElementById("openButtonboatSource");
var btnBoat2ColoredSource = document.getElementById("openButtonboatColoredSource");
var btnGate2Source = document.getElementById("openButtonGateSource");
var btnGate2ColoredSource = document.getElementById("openButtonGateColoredSource");
var btnPavilion2Source = document.getElementById("openButtonPavilionSource");
var btnPavilion2ColoredSource = document.getElementById("openButtonPavilionColoredSource");
var btnGYM2Source = document.getElementById("openButtonGYMSource");
var btnGYM2ColoredSource = document.getElementById("openButtonGYMColoredSource");
var btnPeople2Source = document.getElementById("openButtonPeopleSource");
var btnPeople2ColoredSource = document.getElementById("openButtonPeopleColoredSource");
var btnWisdomBar2Source = document.getElementById("openButtonWisdomBarSource");
var btnWisdomBar2ColoredSource = document.getElementById("openButtonWisdomBarColoredSource");

//兑换标志图片
var btnPeopleExchangedSource = document.getElementById("peopleExchangedSource");
var btnCBExchangedSource = document.getElementById("CBExchangedSource");
var btnBoatExchangedSource = document.getElementById("boatExchangedSource");
var btnGateExchangedSource = document.getElementById("gateExchangedSource");
var btnGYMExchangedSource = document.getElementById("GYMExchangedSource");
var btnNavigationExchangedSource = document.getElementById("navigationExchangedSource");
var btnPavilionExchangedSource = document.getElementById("pavilionExchangedSource");
var btnWisdomBarExchangedSource = document.getElementById("wisdomBarExchangedSource");


// 获取关闭模态窗口的元素
var span = document.getElementById("BackTurnButton");
var closeSourceModal = document.getElementById("closeSourceModal");

// 获取其他按钮元素
var btnSource = document.getElementById("openSourceModalButton");
var btnExchange = document.getElementById("ExchangeResourcesButton");
var commentsButton = document.getElementById("commentsButton"); // 获取导航按钮

// 隐藏资源交换按钮
btnExchange.style.display = "none";

// 获取滑块元素
const slider = document.getElementById('slider');

// 获取 URL 参数中的 source 参数
const urlParams = new URLSearchParams(window.location.search);
const initialSource = urlParams.get('source');

// 需要处理的模型 key 列表
const keys = ['CB2', 'people2', 'boat2', 'pavilion2', 'navigation2','wisdomBar2', 'gate2','GYM2'];

// 创建一个 source 到 key 的映射对象
const sourceToKeyMap = {
    'A1X': keys[0],
    'B7K': keys[1],
    '3LZ': keys[2],
    'F9Q': keys[3],
    'M2R': keys[4],
    '8NH': keys[5],
    'P5V': keys[6],
    'W3C': keys[7],
  };
  
  // 根据 source 的值获取对应的 key
  const source = sourceToKeyMap[initialSource];

  console.log(source);

// 创建忽略列表
const ignoreList = [
    zoomInButton,
    zoomOutButton,
    btnCB2,
    btnCB2Colored,
    btnNavigation2,
    btnNavigation2Colored,
    btnBoat2,
    btnBoat2Colored,
    btnGate2,
    btnGate2Colored,
    btnPavilion2,
    btnPavilion2Colored,
    btnGYM2,
    btnGYM2Colored,
    btnPeople2,
    btnPeople2Colored,
    btnWisdomBar2,
    btnWisdomBar2Colored
];

//const k = 3.5 * window.innerWidth / 1255;
const k = 3.5;
console.log(`k = ${k}`);

// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // 设置背景颜色为白色

// 创建主场景
const mainScene = new THREE.Scene();
mainScene.background = new THREE.Color(0xffffff);

// 预加载GLB模型
const loader = new GLTFLoader();

// 打开模态窗口的函数（gate2）
function openModalGate2() {
    modal.style.display = "block";
    isModalOpen = true; // 设置 modal 打开标志
    console.log('Initializing Three.js scene...');
    // 初始化 Three.js 场景并加载模型
    initThreeJS(preloadedModels['gate2'], gate2Url, { x: 15, y: 15, z: 15 }, { x: 0, y: 1.5, z: 3});
}

// 打开模态窗口的函数（CB2）
function openModalCB2() {
    modal.style.display = "block";
    isModalOpen = true; // 设置 modal 打开标志
    console.log('Initializing Three.js scene...');
    // 初始化 Three.js 场景并加载模型
    initThreeJS(preloadedModels['CB2'], CB2Url, { x: 5, y: 5, z: 5 }, { x: 0, y: 1.5, z: 3 });
}

// 打开模态窗口的函数（navigation2）
function openModalNavigation2() {
    modal.style.display = "block";
    isModalOpen = true; // 设置 modal 打开标志
    console.log('Initializing Three.js scene...');
    // 初始化 Three.js 场景并加载模型
    initThreeJS(preloadedModels['navigation2'], navigation2Url, { x: 15, y: 15, z: 15 }, { x: 0, y: 1.5, z: 3 });
}

// 打开模态窗口的函数（people2）
function openModalPeople2() {
    modal.style.display = "block";
    isModalOpen = true; // 设置 modal 打开标志
    console.log('Initializing Three.js scene...');
    // 初始化 Three.js 场景并加载模型
    initThreeJS(preloadedModels['people2'], people2Url, { x: 5, y: 5, z: 5 }, { x: 0, y: 1.5, z: 3 });
}

// 打开模态窗口的函数（boat2）
function openModalBoat2() {
    modal.style.display = "block";
    isModalOpen = true; // 设置 modal 打开标志
    console.log('Initializing Three.js scene...');
    // 初始化 Three.js 场景并加载模型
    initThreeJS(preloadedModels['boat2'], boat2Url, { x: 5, y: 5, z: 5 }, { x: 0, y: 1.5, z: 3 });
}

// 打开模态窗口的函数（GYM2）
function openModalGYM2() {
    modal.style.display = "block";
    isModalOpen = true; // 设置 modal 打开标志
    console.log('Initializing Three.js scene...');
    // 初始化 Three.js 场景并加载模型
    initThreeJS(preloadedModels['GYM2'], GYM2Url, { x: 6, y: 6, z: 6 }, { x: 0, y: 1.5, z: 3 });
}

// 打开模态窗口的函数（WisdomBar2）
function openModalWisdomBar2() {
    modal.style.display = "block";
    isModalOpen = true; // 设置 modal 打开标志
    console.log('Initializing Three.js scene...');
    // 初始化 Three.js 场景并加载模型
    initThreeJS(preloadedModels['wisdomBar2'], wisdomBar2Url, { x: 10, y: 10, z: 10 }, { x: 0, y: 1.5, z: 3 });
}

// 打开模态窗口的函数（Pavilion2）
function openModalPavilion2() {
    modal.style.display = "block";
    isModalOpen = true; // 设置 modal 打开标志
    console.log('Initializing Three.js scene...');
    // 初始化 Three.js 场景并加载模型
    initThreeJS(preloadedModels['pavilion2'], pavilion2Url, { x: 12, y: 12, z: 12 }, { x: 0, y: 1.5, z: 3 });
}

// 打开模态窗口的函数（gate2Colored）
function openModalGate2Colored() {
    modal.style.display = "block";
    isModalOpen = true; // 设置 modal 打开标志
    console.log('Initializing Three.js scene...');
    // 初始化 Three.js 场景并加载模型
    initThreeJS(preloadedModels['gate2Colored'], gate2ColoredUrl, { x: 15, y: 15, z: 15 }, { x: 0, y: 1.5, z: 3 });
}

// 打开模态窗口的函数（CB2Colored）
function openModalCB2Colored() {
    modal.style.display = "block";
    isModalOpen = true; // 设置 modal 打开标志
    console.log('Initializing Three.js scene...');
    // 初始化 Three.js 场景并加载模型
    initThreeJS(preloadedModels['CB2Colored'], CB2ColoredUrl, { x: 5, y: 5, z: 5 }, { x: 0, y: 1.5, z: 3 });
}

// 打开模态窗口的函数（navigation2Colored）
function openModalNavigation2Colored() {
    modal.style.display = "block";
    isModalOpen = true; // 设置 modal 打开标志
    console.log('Initializing Three.js scene...');
    // 初始化 Three.js 场景并加载模型
    initThreeJS(preloadedModels['navigation2Colored'], navigation2ColoredUrl, { x: 15, y: 15, z: 15 }, { x: 0, y: 1.5, z: 3 });
}

// 打开模态窗口的函数（people2Colored）
function openModalPeople2Colored() {
    modal.style.display = "block";
    isModalOpen = true; // 设置 modal 打开标志
    console.log('Initializing Three.js scene...');
    // 初始化 Three.js 场景并加载模型
    initThreeJS(preloadedModels['people2Colored'], people2ColoredUrl, { x: 5, y: 5, z: 5 }, { x: 0, y: 1.5, z: 3 });
}

// 打开模态窗口的函数（boat2Colored）
function openModalBoat2Colored() {
    modal.style.display = "block";
    isModalOpen = true; // 设置 modal 打开标志
    console.log('Initializing Three.js scene...');
    // 初始化 Three.js 场景并加载模型
    initThreeJS(preloadedModels['boat2Colored'], boat2ColoredUrl, { x: 5, y: 5, z: 5 }, { x: 0, y: 1.5, z: 3 });
}

// 打开模态窗口的函数（GYM2Colored）
function openModalGYM2Colored() {
    modal.style.display = "block";
    isModalOpen = true; // 设置 modal 打开标志
    console.log('Initializing Three.js scene...');
    // 初始化 Three.js 场景并加载模型
    initThreeJS(preloadedModels['GYM2Colored'], GYM2ColoredUrl, { x: 6, y: 6, z: 6 }, { x: 0, y: 1.5, z: 3 });
}

// 打开模态窗口的函数（WisdomBar2Colored）
function openModalWisdomBar2Colored() {
    modal.style.display = "block";
    isModalOpen = true; // 设置 modal 打开标志
    console.log('Initializing Three.js scene...');
    // 初始化 Three.js 场景并加载模型
    initThreeJS(preloadedModels['wisdomBar2Colored'], wisdomBar2ColoredUrl, { x: 10, y: 10, z: 10 }, { x: 0, y: 1.5, z: 3 });
}

// 打开模态窗口的函数（Pavilion2Colored）
function openModalPavilion2Colored() {
    modal.style.display = "block";
    isModalOpen = true; // 设置 modal 打开标志
    console.log('Initializing Three.js scene...');
    // 初始化 Three.js 场景并加载模型
    initThreeJS(preloadedModels['pavilion2Colored'], pavilion2ColoredUrl, { x: 12, y: 12, z: 12 }, { x: 0, y: 1.5, z: 3 });
}


// 打开资源模态窗口并生成图标
function openSourceModal() {
    sourceModal.style.display = "block";
    isModalOpen = true; // 设置 modal 打开标志
    // 显示 exchange 图标
    document.querySelectorAll('.exchange-icon').forEach(icon => {
        icon.style.display = 'block';
    });
    console.log('Opening source modal...');
}


// 打开模态窗口
btnCB2.onclick = openModalCB2;
btnCB2Colored.onclick = openModalCB2Colored;
btnNavigation2.onclick = openModalNavigation2;
btnNavigation2Colored.onclick = openModalNavigation2Colored;
btnBoat2.onclick = openModalBoat2;
btnBoat2Colored.onclick = openModalBoat2Colored;
btnGate2.onclick = openModalGate2;
btnGate2Colored.onclick = openModalGate2Colored;
btnPavilion2.onclick = openModalPavilion2;
btnPavilion2Colored.onclick = openModalPavilion2Colored;

btnGYM2.onclick = openModalGYM2;
btnGYM2Colored.onclick = openModalGYM2Colored;
btnPeople2.onclick = openModalPeople2;
btnPeople2Colored.onclick = openModalPeople2Colored;
btnWisdomBar2.onclick = openModalWisdomBar2;
btnWisdomBar2Colored.onclick = openModalWisdomBar2Colored;

// // 添加点击事件监听器
// informationUI.addEventListener('click', function() {
//     // 检查当前display属性的值并切换
//     if (information.style.display === 'none' || information.style.display === '') {
//         information.style.display = 'block';
//     } else {
//         information.style.display = 'none';
//     }

//     isModalOpen = true;
//     setTimeout(() => {
//         // 这段代码会在等待 0.1 秒后执行
//         isModalOpen = false;
//         // 在这里执行后续操作
//     }, 100); // 100 毫秒 = 0.1 秒


// });

// 设置资源按钮的点击事件监听器
btnSource.onclick = function() {
    openSourceModal();
    updateExchangeIcons();
}

// 当点击 "Exchange Resources" 按钮时，调用 updateExchangeStatus 函数
btnExchange.onclick = function() {
    updateExchangeStatus(); // 更新兑换状态
}

// 当滑块的值发生变化时触发的事件处理程序
slider.oninput = function() {
    // 如果滑块的值为 100，则调用 updateExchangeStatus 函数
    if (this.value == 100) {
        updateExchangeStatus(); // 更新兑换状态     
    }
}


// 关闭模态窗口
span.onclick = function() {
    modal.style.display = "none";
    // 使用 setTimeout 等待 0.1 秒
    setTimeout(() => {
        // 这段代码会在等待 0.1 秒后执行
        isModalOpen = false;
        // 在这里执行后续操作
    }, 100); // 100 毫秒 = 0.1 秒
}

// 点击模态窗口外部关闭模态窗口
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        isModalOpen = false;
    }
}

// 关闭 source 模态窗口
closeSourceModal.onclick = function() {
    sourceModal.style.display = "none";
    isModalOpen = false;
    // 隐藏exchange 图标
    document.querySelectorAll('.exchange-icon').forEach(icon => {
        icon.style.display = 'none';
    });
}

// 预加载 CB2 模型
preloadModel(CB2Url, { x: 15, y: 15, z: 15 },'CB2');

// 预加载 navigation2 模型
preloadModel(navigation2Url, { x: 15, y: 15, z: 15 },'navigation2');

// 预加载 gate2 模型
preloadModel(gate2Url, { x: 15, y: 15, z: 15 },'gate2');

// 预加载 gym 模型

preloadModel(GYM2Url, { x: 15, y: 15, z: 15 }, 'GYM2');

// 预加载 people2 模型

preloadModel(people2Url, { x: 15, y: 15, z: 15 }, 'people2');

// 预加载 wisdomBar2 模型
preloadModel(wisdomBar2Url, { x: 15, y: 15, z: 15 }, 'wisdomBar2');

// 预加载 pavilion2 模型
preloadModel(pavilion2Url, { x: 15, y: 15, z: 15 }, 'pavilion2');

// 预加载gate2上色后的模型
preloadModel(gate2ColoredUrl, { x: 15, y: 15, z: 15 },'gate2Colored');

// 预加载CB2上色后的模型
preloadModel(CB2ColoredUrl, { x: 15, y: 15, z: 15 },'CB2Colored');

// 预加载navigation2上色后的模型
preloadModel(navigation2ColoredUrl, { x: 15, y: 15, z: 15 },'navigation2Colored');


// 预加载 gym上色后的模型

preloadModel(GYM2ColoredUrl, { x: 15, y: 15, z: 15 }, 'GYM2Colored');

// 预加载 people2 上色后的模型

preloadModel(people2ColoredUrl, { x: 15, y: 15, z: 15 }, 'people2Colored');

// 预加载 wisdomBar2 上色后的模型
preloadModel(wisdomBar2ColoredUrl, { x: 15, y: 15, z: 15 }, 'wisdomBar2Colored');

// 预加载 pavilion2 上色后的模型
preloadModel(pavilion2ColoredUrl, { x: 15, y: 15, z: 15 }, 'pavilion2Colored');

// 预加载 CB1 模型
preloadModel(CB1Url, { x: 15, y: 15, z: 15 }, 'CB1');

// 预加载 navigation1 模型
preloadModel(navigation1Url, { x: 15, y: 15, z: 15 }, 'navigation1');

// 预加载 gate1 模型
preloadModel(gate1Url, { x: 15, y: 15, z: 15 }, 'gate1');

// 预加载 gym 模型
preloadModel(GYM1Url, { x: 15, y: 15, z: 15 }, 'GYM1');

// 预加载 people1 模型
preloadModel(people1Url, { x: 15, y: 15, z: 15 }, 'people1');

// 预加载 wisdomBar1 模型
preloadModel(wisdomBar1Url, { x: 15, y: 15, z: 15 }, 'wisdomBar1');

// 预加载 pavilion1 模型
preloadModel(pavilion1Url, { x: 15, y: 15, z: 15 }, 'pavilion1');

// 预加载 gate1 上色后的模型
preloadModel(gate1ColoredUrl, { x: 15, y: 15, z: 15 }, 'gate1Colored');

// 预加载 CB1 上色后的模型
preloadModel(CB1ColoredUrl, { x: 15, y: 15, z: 15 }, 'CB1Colored');

// 预加载 navigation1 上色后的模型
preloadModel(navigation1ColoredUrl, { x: 15, y: 15, z: 15 }, 'navigation1Colored');

// 预加载 gym 上色后的模型
preloadModel(GYM1ColoredUrl, { x: 15, y: 15, z: 15 }, 'GYM1Colored');

// 预加载 people1 上色后的模型
preloadModel(people1ColoredUrl, { x: 15, y: 15, z: 15 }, 'people1Colored');

// 预加载 wisdomBar1 上色后的模型
preloadModel(wisdomBar1ColoredUrl, { x: 15, y: 15, z: 15 }, 'wisdomBar1Colored');

// 预加载 pavilion1 上色后的模型
preloadModel(pavilion1ColoredUrl, { x: 15, y: 15, z: 15 }, 'pavilion1Colored');

// 初始化 localStorage 中的 keys
keys.forEach(key => {
    if (localStorage.getItem(key) === null) {
        localStorage.setItem(key, 'false');
    }

    if (localStorage.getItem(key + 'Exchanged') === null) {
        localStorage.setItem(key + 'Exchanged', 'false');
    }

    if (localStorage.getItem('timeOf' + key) === null) {
        localStorage.setItem('timeOf' + key, 'N/A');
    }

});

// 设置指定的 source 的值为 true
// if (keys.includes(source)) {
//     localStorage.setItem(source, 'true');
// }


//加载背景模型
mainThreeJS();

// 检查 currentSource 是否为 CB2，如果是则打开模态窗口
if (source === 'CB2') {
    if (localStorage.getItem('CB2') === 'true') {
        openModalCB2Colored();
    } else {
        openModalCB2();
    }
}
else if (source === 'navigation2') {
    if (localStorage.getItem('navigation2') === 'true') {
        openModalNavigation2Colored();
    } else {
        openModalNavigation2();
    }
} else if (source === 'gate2') {
    if (localStorage.getItem('gate2') === 'true') {
        openModalGate2Colored();
    } else {
        openModalGate2();
    }
} else if (source === 'people2') {
    if (localStorage.getItem('people2') === 'true') {
        openModalPeople2Colored();
    } else {
        openModalPeople2();
    }
} else if (source === 'GYM2') {
    if (localStorage.getItem('GYM2') === 'true') {
        openModalGYM2Colored();
    } else {
        openModalGYM2();
    }
} else if (source === 'pavilion2') {
    if (localStorage.getItem('pavilion2') === 'true') {
        openModalPavilion2Colored();
    } else {
        openModalPavilion2();
    }
} else if (source === 'boat2') {
    if (localStorage.getItem('boat2') === 'true') {
        openModalBoat2Colored();
    } else {
        openModalBoat2();
    }
} else if (source === 'wisdomBar2') {
    if (localStorage.getItem('wisdomBar2') === 'true') {
        openModalWisdomBar2Colored();
    } else {
        openModalWisdomBar2();
    }
}


// 初始化Three.js场景
function initThreeJS(preModel,url,scale,cameraPosition) {

    scene.clear();

    currentTime.style.display = 'none';

    // 要隐藏的元素ID列表
    let elementsToHide = [
        "Boat", "LiverpoolPavilion", "Museum", "Navigation", 
        "People", "SportsCenter", "TheGateOfWisdom", "XBar",
        "congrats","uniqueNumber"
    ];

    // 将所有指定元素的 display 样式设置为 'none'
    elementsToHide.forEach(function(elementId) {
        document.getElementById(elementId).style.display = 'none';
    });

    if (localStorage.getItem('timeOf' + getBaseName(url)) != 'N/A') {
        
        currentTime.innerText = 'NO. X' + localStorage.getItem('timeOf' + getBaseName(url));
        currentTime.style.display = 'block';
        document.getElementById("congrats").style.display = 'block';
        document.getElementById("uniqueNumber").style.display = 'block';
    }
    document.getElementById("LeaveComments").style.display = 'none';

    if (localStorage.getItem(source) === 'false' && getBaseName(url) == source) {
        document.getElementById("LeaveComments").style.display = 'block';
    }

    // 映射新ID到原始ID的字典
    const idMap = {
        boat2: 'Boat',
        pavilion2: 'LiverpoolPavilion',
        CB2: 'Museum',
        navigation2: 'Navigation',
        people2: 'People',
        GYM2: 'SportsCenter',
        gate2: 'TheGateOfWisdom',
        wisdomBar2: 'XBar'
    };

    document.getElementById(idMap[getBaseName(url)]).style.display = 'block';
    // 创建相机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //camera.position.set(cameraPosition.x,cameraPosition.y,cameraPosition.z); // 调整摄像机位置，使其向后移动
    camera.position.set(cameraPosition.x,cameraPosition.y,cameraPosition.z); // 调整摄像机位置，使其向后移动

    // 让相机看向(0, 0, 0)
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    let backgroundMesh; // 提前声明backgroundMesh变量
    
    // 添加背景图片
    const backgroundTextureLoader = new THREE.TextureLoader();
    backgroundTextureLoader.load(backgroundPicture, function(texture) {
    const aspect = window.innerWidth / window.innerHeight;
    const distance = camera.position.z -1; // 背景平面距离相机1个单位
    const height = 10; // 背景平面高度
    const width = height * aspect; // 背景平面宽度，根据窗口宽高比调整

    const planeGeometry = new THREE.PlaneGeometry(width*0.87, height*0.87);
        backgroundMesh = new THREE.Mesh(
            planeGeometry,
            new THREE.MeshBasicMaterial({
                map: texture
            })
        );

        backgroundMesh.material.depthTest = false;
        backgroundMesh.material.depthWrite = false;

        // 设置背景Mesh的位置
        backgroundMesh.position.z = -distance; // 将背景平面放置在相机前方
        backgroundMesh.position.y = -height*0.5+3.95; // 将背景平面放置在相机前方

        // // 设置背景Mesh的旋转
        backgroundMesh.rotation.y = 0 ;
        backgroundMesh.rotation.x = -Math.PI/7;

        // 设置渲染顺序
        backgroundMesh.renderOrder = -1; // 这里设置为 -1，确保它在其他物体之前渲染
        scene.add(backgroundMesh);
    });

    const zoomInButton = document.getElementById('zoomInButtonModal');
    const zoomOutButton = document.getElementById('zoomOutButtonModal');

    zoomInButton.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // 阻止默认的右键菜单或长按菜单
    });
    
    zoomOutButton.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // 阻止默认的右键菜单或长按菜单
    });

    // 阻止选择行为
    zoomInButton.addEventListener('selectstart', function(event) {
        event.preventDefault();
    });

    zoomInButton.addEventListener('dragstart', function(event) {
        event.preventDefault();
    });
    
    // 阻止选择行为
    zoomOutButton.addEventListener('selectstart', function(event) {
        event.preventDefault();
    });

    zoomOutButton.addEventListener('dragstart', function(event) {
        event.preventDefault();
    });
    
    
    let isZoomingIn = false;
    let isZoomingOut = false;

    let zoomSpeed = 0.1;


    // 根据 camera.position.z 计算 scale
    let pictureScale = (camera.position.z + 2) / 5.0;

    // 更新摄像机位置的函数
    function updateCameraPosition() {
        if (isZoomingIn && camera.position.y >= 0.5) {
            camera.position.z -= zoomSpeed;
            camera.position.y -= zoomSpeed * 0.5;
            pictureScale = (camera.position.z + 2) / 5.0;
            backgroundMesh.scale.set(pictureScale,pictureScale,pictureScale); 
            // console.log(`Adjusted Scale: x = ${backgroundMesh.scale.x}, y = ${backgroundMesh.scale.y}, z = ${backgroundMesh.scale.z}`);
            // console.log(`Camera Position: x = ${camera.position.x}, y = ${camera.position.y}, z = ${camera.position.z}`);
        }
        if (isZoomingOut && camera.position.y <= 16) {

            camera.position.z += zoomSpeed;
            camera.position.y += zoomSpeed * 0.5;
            pictureScale = (camera.position.z + 2) / 5.0;
            backgroundMesh.scale.set(pictureScale,pictureScale,pictureScale); 
            // console.log(`Adjusted Scale: x = ${backgroundMesh.scale.x}, y = ${backgroundMesh.scale.y}, z = ${backgroundMesh.scale.z}`);
            // console.log(`Camera Position: x = ${camera.position.x}, y = ${camera.position.y}, z = ${camera.position.z}`);
        }
        // 继续请求动画帧更新位置，仅当其中一个按钮被按下时
        if (isZoomingIn || isZoomingOut) {
            requestAnimationFrame(updateCameraPosition);
        }
    }

    // 为按钮添加事件监听器
    zoomInButton.addEventListener('mousedown', () => {
        isZoomingIn = true;
        updateCameraPosition(); // 开始更新摄像机位置
    });

    zoomInButton.addEventListener('mouseup', () => {
        isZoomingIn = false;
    });

    zoomInButton.addEventListener('touchstart', () => {
        event.preventDefault();
        isZoomingIn = true;
        updateCameraPosition(); // 开始更新摄像机位置
    });

    zoomInButton.addEventListener('touchend', () => {
        isZoomingIn = false;
    });

    zoomInButton.addEventListener('mouseleave', () => {
        isZoomingIn = false;
    });

    zoomOutButton.addEventListener('mousedown', () => {
        isZoomingOut = true;
        updateCameraPosition(); // 开始更新摄像机位置
    });

    zoomOutButton.addEventListener('mouseup', () => {
        isZoomingOut = false;
    });

    zoomOutButton.addEventListener('touchstart', () => {
        event.preventDefault(); 
        isZoomingOut = true;
        updateCameraPosition(); // 开始更新摄像机位置
    });

    zoomOutButton.addEventListener('touchend', () => {
        isZoomingOut = false;
    });

    zoomOutButton.addEventListener('mouseleave', () => {
        isZoomingOut = false;
    });


    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight ); // 初始化大小
    document.getElementById('canvas-container-modal').appendChild(renderer.domElement);

    // 添加窗口调整监听器
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    // 检查预加载的模型是否存在
    if (preModel) {
        console.log('Using preloaded model');
        currentModalModel = preModel.clone(); // 使用预加载的模型
        currentModalModel.scale.set(scale.x*k, scale.y*k, scale.z*k); 
        scene.add(currentModalModel);
    } else {
        // 如果预加载模型不存在，则加载模型
        console.log('Preloaded model not found, loading model...');
        loader.load(url, function (gltf) {
            console.log('Model loaded successfully');
            currentModalModel = gltf.scene;
            currentModalModel.scale.set(scale.x*k, scale.y*k, scale.z*k); 
            scene.add(currentModalModel);
        }, undefined, function (error) {
            console.error('Error loading model:', error);
        });
    }

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    // 添加半球光
    const skyColor = 0xB1E1FF; // light blue
    const groundColor = 0xB97A20; // brownish orange
    const hemisphereLight = new THREE.HemisphereLight(skyColor, groundColor, 2);
    scene.add(hemisphereLight);

    // 添加方向光并配置阴影
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.castShadow = true;
    dirLight.position.set(-250, 800, -850);
    dirLight.target.position.set(-550, 40, -450);

    dirLight.shadow.bias = -0.004;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    scene.add(dirLight);
    scene.add(dirLight.target);

    const cam = dirLight.shadow.camera;
    cam.near = 1;
    cam.far = 2000;
    cam.left = -1500;
    cam.right = 1500;
    cam.top = 1500;
    cam.bottom = -1500;
    // 定义鼠标控制变量
    let isMouseDown = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };

    // 定义触摸控制变量
    let isTouchDown = false;
    let previousTouchPosition = {
        x: 0,
        y: 0
    };

    // 鼠标按下事件监听器
    document.addEventListener('mousedown', function (event) {
        isMouseDown = true;
        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    });

    // 鼠标抬起事件监听器
    document.addEventListener('mouseup', function () {
        isMouseDown = false;
    });

    // 鼠标移动事件监听器
    document.addEventListener('mousemove', function (event) {
        if (isMouseDown && currentModalModel) {
            const deltaMove = {
                x: event.clientX - previousMousePosition.x,
                y: event.clientY - previousMousePosition.y
            };

            // 根据鼠标移动方向旋转模型
            currentModalModel.rotation.y += deltaMove.x * 0.006;
            currentModalModel.rotation.x += deltaMove.y * 0.006;

            currentModalModel.rotation.x = Math.max(-Math.PI / 7, Math.min(Math.PI / 2 -Math.PI / 7, currentModalModel.rotation.x));

            previousMousePosition = {
                x: event.clientX,
                y: event.clientY
            };
        }
    });

    // 触摸开始事件监听器
    document.addEventListener('touchstart', function (event) {
        isTouchDown = true;
        previousTouchPosition = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };
    });

    // 触摸结束事件监听器
    document.addEventListener('touchend', function () {
        isTouchDown = false;
    });

    // 触摸移动事件监听器
    document.addEventListener('touchmove', function (event) {
        if (isTouchDown && currentModalModel) {
            const deltaMove = {
                x: event.touches[0].clientX - previousTouchPosition.x,
                y: event.touches[0].clientY - previousTouchPosition.y
            };

            // 根据触摸移动方向旋转模型
            currentModalModel.rotation.y += deltaMove.x * 0.006;
            currentModalModel.rotation.x += deltaMove.y * 0.006;

            currentModalModel.rotation.x = Math.max(-Math.PI / 7, Math.min(Math.PI / 2 -Math.PI / 7, currentModalModel.rotation.x));

            previousTouchPosition = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
        }
    });

    if (url == CB2Url || url == CB2ColoredUrl) {
        // 导航按钮点击事件
        commentsButton.onclick = function() {

            if (source == 'CB2') {
                localStorage.setItem(source, 'true');
                if (localStorage.getItem('timeOf' + source )== 'N/A') {
                    localStorage.setItem('timeOf' + source, getCurrentTime());
                }
                mainThreeJS();
                // 设置一个3000ms的延迟，延迟之后执行一个函数
                setTimeout(function() {
                    openModalCB2Colored();
                }, 3000); // 3000毫秒 = 3秒
            }

            window.location.href = "https://padlet.com/wangshureki/nfc-xjtlu-show-nfc-digital-checkpoints-activity-34061lws6po6936h"; // 替换为你想要导航的 URL


        }
    } else if (url == navigation2Url || url == navigation2ColoredUrl) {
        // 导航按钮点击事件
        commentsButton.onclick = function() {

            if (source == 'navigation2') {
                localStorage.setItem(source, 'true');
                if (localStorage.getItem('timeOf' + source )== 'N/A') {
                    localStorage.setItem('timeOf' + source, getCurrentTime());
                }
                mainThreeJS();
                // 设置一个3000ms的延迟，延迟之后执行一个函数
                setTimeout(function() {
                    openModalNavigation2Colored();
                }, 3000); // 3000毫秒 = 3秒
            }

            window.location.href = "https://padlet.com/wangshureki/how-far-away-is-my-country-from-xjtlu-6imf6udor6i0ajgc"; // 替换为你想要导航的 URL

        }
    } else if (url == gate2Url || url == gate2ColoredUrl) {
        // 导航按钮点击事件
        commentsButton.onclick = function() {
            if (source == 'gate2') {
                localStorage.setItem(source, 'true');
                if (localStorage.getItem('timeOf' + source )== 'N/A') {
                    localStorage.setItem('timeOf' + source, getCurrentTime());
                }
                mainThreeJS();
                // 设置一个3000ms的延迟，延迟之后执行一个函数
                setTimeout(function() {
                    openModalGate2Colored();
                }, 3000); // 3000毫秒 = 3秒
            }
            window.location.href = "https://padlet.com/wangshureki/gate-of-wisdom-pejbzfrw1foy5lpd";// 替换为你想要导航的 URL
}
    } else if (url == people2Url || url == people2ColoredUrl) {
        // 导航按钮点击事件
        commentsButton.onclick = function() {
            if (source == 'people2') {
                localStorage.setItem(source, 'true');
                if (localStorage.getItem('timeOf' + source )== 'N/A') {
                    localStorage.setItem('timeOf' + source, getCurrentTime());
                }
                mainThreeJS();
            }
            // 设置一个3000ms的延迟，延迟之后执行一个函数
            setTimeout(function() {
                openModalPeople2Colored();
            }, 3000); // 3000毫秒 = 3秒
            window.location.href = "https://padlet.com/wangshureki/dialogue-of-the-philosophers-sculpture-6o3kyneotbaijefh "; // 替换为你想要导航的 URL      
        }
    } else if (url == boat2Url || url == boat2ColoredUrl) {
        // 导航按钮点击事件
        commentsButton.onclick = function() {
            if (source == 'boat2') {
                localStorage.setItem(source, 'true');
                if (localStorage.getItem('timeOf' + source )== 'N/A') {
                    localStorage.setItem('timeOf' + source, getCurrentTime());
                }
                mainThreeJS();
                // 设置一个3000ms的延迟，延迟之后执行一个函数
                setTimeout(function() {
                    openModalBoat2Colored();
                }, 3000); // 3000毫秒 = 3秒
            }
            window.location.href = "https://padlet.com/wangshureki/liverbird-of-suzhou-narrow-boat-y1tck5voptmadr4d"; // 替换为你想要导航的 URL 
        }
    } else if (url == GYM2Url || url == GYM2ColoredUrl) {
        // 导航按钮点击事件
        commentsButton.onclick = function() {
            if (source == 'GYM2') {
                localStorage.setItem(source, 'true');
                if (localStorage.getItem('timeOf' + source )== 'N/A') {
                    localStorage.setItem('timeOf' + source, getCurrentTime());
                }
                mainThreeJS();
                // 设置一个3000ms的延迟，延迟之后执行一个函数
                setTimeout(function() {
                    openModalGYM2Colored();
                }, 3000); // 3000毫秒 = 3秒
            }
            window.location.href = "https://padlet.com/wangshureki/gym-o6ci3c3smh0wossd"; // 替换为你想要导航的 URL
           
        }
    } else if (url == wisdomBar2Url || url == wisdomBar2ColoredUrl) {
        // 导航按钮点击事件
        commentsButton.onclick = function() {
            if (source == 'wisdomBar2') {
                localStorage.setItem(source, 'true');
                if (localStorage.getItem('timeOf' + source )== 'N/A') {
                    localStorage.setItem('timeOf' + source, getCurrentTime());
                }
                mainThreeJS();
                // 设置一个3000ms的延迟，延迟之后执行一个函数
                setTimeout(function() {
                    openModalWisdomBar2Colored();
                }, 3000); // 3000毫秒 = 3秒
            }
            window.location.href = "https://padlet.com/wangshureki/x-bar-x3klr0b27x4zhy10"; // 替换为你想要导航的 URL
        
        }
    } else if (url == pavilion2Url || url == pavilion2ColoredUrl) {
        // 导航按钮点击事件
        commentsButton.onclick = function() {
            if (source == 'pavilion2') {
                localStorage.setItem(source, 'true');
                if (localStorage.getItem('timeOf' + source )== 'N/A') {
                    localStorage.setItem('timeOf' + source, getCurrentTime());
                }
                mainThreeJS();

                // 设置一个3000ms的延迟，延迟之后执行一个函数
                setTimeout(function() {
                    openModalPavilion2Colored();
                }, 3000); // 3000毫秒 = 3秒
            }
            window.location.href = "https://padlet.com/wangshureki/liverpool-pavilion-eqtu3ghwdpkiei9"; // 替换为你想要导航的 URL
                
        }
    }
    


    // 渲染循环
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();
}

function mainThreeJS() {

    mainScene.clear();

    var coloredSources = [
        btnCB2ColoredSource,
        btnBoat2ColoredSource,
        btnGate2ColoredSource,
        btnPavilion2ColoredSource,
        btnGYM2ColoredSource,
        btnPeople2ColoredSource,
        btnWisdomBar2ColoredSource
    ];
    
    coloredSources.forEach(function(source) {
    source.style.display = 'block';
    });
    
    var exchangedSources = [
        btnPeopleExchangedSource,
        btnCBExchangedSource,
        btnBoatExchangedSource,
        btnGateExchangedSource,
        btnGYMExchangedSource,
        btnNavigationExchangedSource,
        btnPavilionExchangedSource,
        btnWisdomBarExchangedSource
      ];
      
      exchangedSources.forEach(function(source) {
        if (source) {
          source.style.display = 'none';
        }
      });
      

    const pivot = new THREE.Object3D(); // 创建 pivot 对象
    pivot.scale.set(Math.pow(k,0.5)*0.3*1.87,Math.pow(k,0.5)*0.3*1.87,Math.pow(k,0.5)*0.3*1.87); // 设置 pivot 的缩放比例
    pivot.rotation.y = Math.PI * -0.5;
    pivot.rotation.x = Math.PI * 0.1;
    pivot.rotation.z = Math.PI * 0;
    mainScene.add(pivot);

    // 创建相机
    mainCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    mainCamera.position.set(0, 4, 12); // 调整摄像机位置，使其向后移动

    // 让相机看向(0, 0, 0)
    mainCamera.lookAt(new THREE.Vector3(0, 0, 0));

    let backgroundMesh; // 提前声明backgroundMesh变量
    
    // 添加背景图片
    const backgroundTextureLoader = new THREE.TextureLoader();
    backgroundTextureLoader.load(backgroundPicture, function(texture) {
    const aspect = window.innerWidth / window.innerHeight;
    const distance = mainCamera.position.z -1; // 背景平面距离相机1个单位
    const height = 40; // 背景平面高度
    const width = height * aspect; // 背景平面宽度，根据窗口宽高比调整

    const planeGeometry = new THREE.PlaneGeometry(width, height);
        backgroundMesh = new THREE.Mesh(
            planeGeometry,
            new THREE.MeshBasicMaterial({
                map: texture
            })
        );

        backgroundMesh.material.depthTest = false;
        backgroundMesh.material.depthWrite = false;

        // 设置背景Mesh的位置
        backgroundMesh.position.z = -distance; // 将背景平面放置在相机前方
        backgroundMesh.position.y = -height*0.1; // 将背景平面放置在相机前方

        // // 设置背景Mesh的旋转
        backgroundMesh.rotation.y = 0 ;
        backgroundMesh.rotation.x = -Math.PI/9.5;

        // 设置渲染顺序
        backgroundMesh.renderOrder = -1; // 这里设置为 -1，确保它在其他物体之前渲染
        mainScene.add(backgroundMesh);
    });
    
    // 调整摄像机角度
    // 设置相机的旋转角度
    //mainCamera.rotation.x = -Math.PI /7; // 例如，绕X轴旋转45度

    const zoomInButton = document.getElementById('zoomInButton');
    const zoomOutButton = document.getElementById('zoomOutButton');

    zoomInButton.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // 阻止默认的右键菜单或长按菜单
    });
    
    zoomOutButton.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // 阻止默认的右键菜单或长按菜单
    });

    // 阻止选择行为
    zoomInButton.addEventListener('selectstart', function(event) {
        event.preventDefault();
    });

    zoomInButton.addEventListener('dragstart', function(event) {
        event.preventDefault();
    });
    
    // 阻止选择行为
    zoomOutButton.addEventListener('selectstart', function(event) {
        event.preventDefault();
    });

    zoomOutButton.addEventListener('dragstart', function(event) {
        event.preventDefault();
    });
    
    let isZoomingIn = false;
    let isZoomingOut = false;

    const zoomSpeed = 0.1; // 调整缩放速度

    // 更新摄像机位置的函数
    function updateCameraPosition() {
        if (isZoomingIn && mainCamera.position.y >= 1) {
            mainCamera.position.z -= zoomSpeed*2;
            mainCamera.position.y -= zoomSpeed*0.66;
            backgroundMesh.scale.set(backgroundMesh.scale.x - zoomSpeed*0.08, backgroundMesh.scale.y- zoomSpeed*0.08, backgroundMesh.scale.z - zoomSpeed*0.08); 
        
        }
        if (isZoomingOut && mainCamera.position.y <= 16) {
            mainCamera.position.z += zoomSpeed*2;
            mainCamera.position.y += zoomSpeed*0.66;
            backgroundMesh.scale.set(backgroundMesh.scale.x + zoomSpeed*0.08, backgroundMesh.scale.y+ zoomSpeed*0.08, backgroundMesh.scale.z + zoomSpeed*0.08); 
        
        }
        // 继续请求动画帧更新位置，仅当其中一个按钮被按下时
        if (isZoomingIn || isZoomingOut) {
            requestAnimationFrame(updateCameraPosition);
        }
    }

    // 为按钮添加事件监听器
    zoomInButton.addEventListener('mousedown', () => {
        isZoomingIn = true;
        updateCameraPosition(); // 开始更新摄像机位置
    });

    zoomInButton.addEventListener('mouseup', () => {
        isZoomingIn = false;
    });

    zoomInButton.addEventListener('touchstart', () => {
        event.preventDefault(); // 阻止默认的右键菜单或长按菜单
        isZoomingIn = true;
        updateCameraPosition(); // 开始更新摄像机位置
    });

    zoomInButton.addEventListener('touchend', () => {
        isZoomingIn = false;
    });

    zoomInButton.addEventListener('mouseleave', () => {
        isZoomingIn = false;
    });

    zoomOutButton.addEventListener('mousedown', () => {
        isZoomingOut = true;
        updateCameraPosition(); // 开始更新摄像机位置
    });

    zoomOutButton.addEventListener('mouseup', () => {
        isZoomingOut = false;
    });

    zoomOutButton.addEventListener('touchstart', () => {
        event.preventDefault(); 
        isZoomingOut = true;
        updateCameraPosition(); // 开始更新摄像机位置
    });

    zoomOutButton.addEventListener('touchend', () => {
        isZoomingOut = false;
    });

    zoomOutButton.addEventListener('mouseleave', () => {
        isZoomingOut = false;
    });

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth * 1, window.innerHeight * 1); // 初始化大小
    document.getElementById('canvas-container-main').appendChild(renderer.domElement);

    // 添加窗口调整监听器
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        mainCamera.aspect = width / height;
        mainCamera.updateProjectionMatrix();
    });

    if (localStorage.getItem('gate2') === 'true') {
        btnGate2.style.display = 'none';
        btnGate2Source.style.display = 'none';
        addModelToPivot(
            'gate1Colored',
            gate1ColoredUrl,
            { x: 15, y: 15, z: 15 },
            { x: -5 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: 1 + adjustmentFactor.z },
            pivot,
        );
    } else {
        btnGate2Colored.style.display = 'none';
        btnGate2ColoredSource.style.display = 'none';
        addModelToPivot(
            'gate1',
            gate1Url,
            { x: 15, y: 15, z: 15 },
            { x: -5 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: 1 + adjustmentFactor.z },
            pivot,
        );
    }

    addMarkModelToPivot(
        mark,
        { x: 15, y: 15, z: 15 },
        { x: -4.65 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: 0.9 + adjustmentFactor.z },
        pivot,)
    
    if (localStorage.getItem('CB2') === 'true') {
        btnCB2.style.display = 'none';
        btnCB2Source.style.display = 'none';
        addModelToPivot(
            'CB1Colored',
            CB1ColoredUrl,
            { x: 15, y: 15, z: 15 },
            { x: -1.02 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: -1.15 + adjustmentFactor.z },
            pivot,
        );
    } else {
        btnCB2Colored.style.display = 'none';
        btnCB2ColoredSource.style.display = 'none';
        addModelToPivot(
            'CB1',
            CB1Url,
            { x: 15, y: 15, z: 15 },
            { x: -1.02 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: -1.15 + adjustmentFactor.z },
            pivot,
        );
    }

    addMarkModelToPivot(
        mark,
        { x: 15, y: 15, z: 15 },
        { x: -0.9 + adjustmentFactor.x, y: 0.6 + adjustmentFactor.y, z: -1.25 + adjustmentFactor.z },
        pivot,)
    
    if (localStorage.getItem('navigation2') === 'true') {
        btnNavigation2.style.display = 'none';
        btnNavigation2Source.style.display = 'none';
        console.log(localStorage.getItem('navigation2'));
        addModelToPivot(
            'navigation1Colored',
            navigation1ColoredUrl,
            { x: 15, y: 15, z: 15 },
            { x: -1.24 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: 0.6+ adjustmentFactor.z },
            pivot,
        );
    } else {
        btnNavigation2Colored.style.display = 'none';
        btnNavigation2ColoredSource.style.display = 'none';
        addModelToPivot(
            'navigation1',
            navigation1Url,
            { x: 15, y: 15, z: 15 },
            { x: -1.24 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: 0.6 + adjustmentFactor.z },
            pivot,
        );
    }

    addMarkModelToPivot(
        mark,
        { x: 15, y: 15, z: 15 },
        { x: -2.1 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: 1.13 + adjustmentFactor.z },
        pivot,)
    
    if (localStorage.getItem('boat2') === 'true') {
        btnBoat2.style.display = 'none';
        btnBoat2Source.style.display = 'none';
        addModelToPivot(
            'boat1Colored',
            boat1ColoredUrl,
            { x: 15, y: 15, z: 15 },
            { x: 0.3 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: -1.28 + adjustmentFactor.z },
            pivot,
        );
    } else {
        btnBoat2Colored.style.display = 'none';
        btnBoat2ColoredSource.style.display = 'none';
        addModelToPivot(
            'boat1',
            boat1Url,
            { x: 15, y: 15, z: 15 },
            { x: 0.3 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: -1.28+ adjustmentFactor.z },
            pivot,
        );
    }

    addMarkModelToPivot(
        mark,
        { x: 15, y: 15, z: 15 },
        { x: 0 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: -1.32+ adjustmentFactor.z },
        pivot,)
    
    if (localStorage.getItem('GYM2') === 'true') {
        btnGYM2.style.display = 'none';
        btnGYM2Source.style.display = 'none';
        addModelToPivot(
            'GYM1Colored',
            GYM1ColoredUrl,
            { x: 15, y: 15, z: 15 },
            { x: -4.48 + adjustmentFactor.x, y:  adjustmentFactor.y, z: 3.66 + adjustmentFactor.z },
            pivot,
        );
    } else {
        btnGYM2Colored.style.display = 'none';
        btnGYM2ColoredSource.style.display = 'none';
        addModelToPivot(
            'GYM1',
            GYM1Url,
            { x: 15, y: 15, z: 15 },
            { x: -4.48 + adjustmentFactor.x, y:  adjustmentFactor.y, z: 3.66 + adjustmentFactor.z  },
            pivot,
        );
    }

    addMarkModelToPivot(
        mark,
        { x: 15, y: 15, z: 15 },
        { x: -4.3 + adjustmentFactor.x, y:  adjustmentFactor.y, z: 3.3 + adjustmentFactor.z  },
        pivot,)
    
    if (localStorage.getItem('people2') === 'true') {
        btnPeople2.style.display = 'none';
        btnPeople2Source.style.display = 'none';
        addModelToPivot(
            'people1Colored',
            people1ColoredUrl,
            { x: 15, y: 15, z: 15 },
            { x: 1.12 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: -1.4 + adjustmentFactor.z },
            pivot,
        );
    } else {
        btnPeople2Colored.style.display = 'none';
        btnPeople2ColoredSource.style.display = 'none';
        addModelToPivot(
            'people1',
            people1Url,
            { x: 15, y: 15, z: 15 },
            { x: 1.12 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: -1.4 + adjustmentFactor.z },
            pivot,
        );
    }

    addMarkModelToPivot(
        mark,
        { x: 15, y: 15, z: 15 },
        { x: 1.4 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: -1.5 + adjustmentFactor.z },
        pivot,)
    
    if (localStorage.getItem('wisdomBar2') === 'true') {
        btnWisdomBar2.style.display = 'none';
        btnWisdomBar2Source.style.display = 'none';
        addModelToPivot(
            'wisdomBar1Colored',
            wisdomBar1ColoredUrl,
            { x: 15, y: 15, z: 15},
            { x: -4.97 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: 1 + adjustmentFactor.z },
            pivot,
        );
    } else {
        btnWisdomBar2Colored.style.display = 'none';
        btnWisdomBar2ColoredSource.style.display = 'none';
        addModelToPivot(
            'wisdomBar1',
            wisdomBar1Url,
            { x: 15, y: 15, z: 15 },
            { x: -4.97 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: 1 + adjustmentFactor.z },
            pivot,
        );
    }

    addMarkModelToPivot(
        mark,
        { x: 15, y: 15, z: 15 },
        { x: -4.6 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: 1.2 + adjustmentFactor.z },
        pivot,)
    
    if (localStorage.getItem('pavilion2') === 'true') {
        btnPavilion2.style.display = 'none';
        btnPavilion2Source.style.display = 'none';
        addModelToPivot(
            'pavilion1Colored',
            pavilion1ColoredUrl,
            { x: 15, y: 15, z: 15 },
            { x: -1 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: 2.5 + adjustmentFactor.z },
            pivot,
        );
    } else {
        btnPavilion2Colored.style.display = 'none';
        btnPavilion2ColoredSource.style.display = 'none';
        addModelToPivot(
            'pavilion1',
            pavilion1Url,
            { x: 15, y: 15, z: 15 },
            { x: -1 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: 2.5 + adjustmentFactor.z },
            pivot,
        );
    }

    addMarkModelToPivot(
        mark,
        { x: 15, y: 15, z: 15 },
        { x: -1.5 + adjustmentFactor.x, y: 0 + adjustmentFactor.y, z: 2.05 + adjustmentFactor.z },
        pivot,)

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    mainScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    mainScene.add(directionalLight);

    // 添加半球光
    const skyColor = 0xB1E1FF; // light blue
    const groundColor = 0xB97A20; // brownish orange
    const hemisphereLight = new THREE.HemisphereLight(skyColor, groundColor, 2);
    mainScene.add(hemisphereLight);

    // 添加方向光并配置阴影
    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.castShadow = true;
    dirLight.position.set(-250, 800, -850);
    dirLight.target.position.set(-550, 40, -450);

    dirLight.shadow.bias = -0.004;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    mainScene.add(dirLight);
    mainScene.add(dirLight.target);

    const cam = dirLight.shadow.camera;
    cam.near = 1;
    cam.far = 2000;
    cam.left = -1500;
    cam.right = 1500;
    cam.top = 1500;
    cam.bottom = -1500;

    // 定义鼠标控制变量
    let isMouseDown = false;
    let previousMousePosition = {
        x: 0,
        y: 0
    };

    // 定义触摸控制变量
    let isTouchDown = false;
    let previousTouchPosition = {
        x: 0,
        y: 0
    };

    // 鼠标按下事件监听器
    document.addEventListener('mousedown', function (event) {
        isMouseDown = true;
        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    });

    // 鼠标抬起事件监听器
    document.addEventListener('mouseup', function () {
        isMouseDown = false;
    });

    // 鼠标移动事件监听器
    document.addEventListener('mousemove', function (event) {
        if (isMouseDown) {
            const deltaMove = {
                x: event.clientX - previousMousePosition.x,
                y: event.clientY - previousMousePosition.y
            };

            if (!isModalOpen) {

                pivot.rotation.y += deltaMove.x * 0.006;
                pivot.rotation.x += deltaMove.y * 0.006;

                pivot.rotation.x = Math.max(-0.1024* Math.PI, Math.min(Math.PI / 2 -0.1024* Math.PI, pivot.rotation.x));

                previousTouchPosition = {
                    x: event.touches[0].clientX,
                    y: event.touches[0].clientY
                };
            }

        }
    });

    // 触摸开始事件监听器
    document.addEventListener('touchstart', function (event) {
        isTouchDown = true;
        previousTouchPosition = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };
    });

    // 触摸结束事件监听器
    document.addEventListener('touchend', function () {
        isTouchDown = false;
    });

    // 触摸移动事件监听器
    document.addEventListener('touchmove', function (event) {
        if (isTouchDown) {
            const deltaMove = {
                x: event.touches[0].clientX - previousTouchPosition.x,
                y: event.touches[0].clientY - previousTouchPosition.y
            };

            if (!isModalOpen) {

                pivot.rotation.y += deltaMove.x * 0.006;
                pivot.rotation.x += deltaMove.y * 0.006;

                // 限制 pivot.rotation.x 在 -π/2 到 π/2 之间
                pivot.rotation.x = Math.max(-0.1024* Math.PI, Math.min(Math.PI / 2 -0.1024* Math.PI, pivot.rotation.x));

                previousTouchPosition = {
                    x: event.touches[0].clientX,
                    y: event.touches[0].clientY
                };

                let cameraPosition = new THREE.Vector3();
                mainCamera.getWorldPosition(cameraPosition); // 获取相机的世界位置

                if (pivot) {
                // 遍历 pivot 的子对象
                pivot.traverse((child) => {
                    if (child.name == 'mark') {
 
                    child.lookAt(cameraPosition); // 使物体面向相机
                    }
                });
                }

            }

        }
    });

    // 创建Raycaster和鼠标向量
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // 定义点击事件处理函数
    function onMouseClick(event) {

        if (ignoreList.includes(event.target)) {
            return; // 如果目标在忽略列表中，不处理点击事件
        }

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, mainCamera);
        const intersects = raycaster.intersectObjects(pivot.children, true); // 修改为检测 pivot 的子对象

        if (intersects.length > 0 && !isModalOpen) {
            const clickedObject = intersects[0].object;

            console.log('Clicked on:', clickedObject.parent.name);
            console.log('Clicked on:', clickedObject.parent.parent.name);

            if (clickedObject.parent.name === 'gate1' || clickedObject.parent.parent.name === 'gate1') {
                openModalGate2();
            } else if (clickedObject.parent.name === 'gate1Colored' || clickedObject.parent.parent.name === 'gate1Colored') {
                openModalGate2Colored();
            } else if (clickedObject.parent.name === 'CB1Colored' || clickedObject.parent.parent.name === 'CB1Colored') {
                openModalCB2Colored();
            } else if (clickedObject.parent.name === 'CB1' || clickedObject.parent.parent.name === 'CB1' && localStorage.getItem('CB2') === 'false') {
                openModalCB2();
            } else if (clickedObject.parent.name === 'navigation1' || clickedObject.parent.parent.name === 'navigation1') {
                openModalNavigation2();
            } else if (clickedObject.parent.name === 'navigation1Colored' || clickedObject.parent.parent.name === 'navigation1Colored') {
                openModalNavigation2Colored();
            } else if (clickedObject.parent.name === 'boat1' || clickedObject.parent.parent.name === 'boat1') {
                openModalBoat2();
            } else if (clickedObject.parent.name === 'boat1Colored' || clickedObject.parent.parent.name === 'boat1Colored') {
                openModalBoat2Colored();
            } else if (clickedObject.parent.name === 'pavilion1' || clickedObject.parent.parent.name === 'pavilion1') {
                openModalPavilion2();
            } else if (clickedObject.parent.name === 'pavilion1Colored' || clickedObject.parent.parent.name === 'pavilion1Colored') {
                openModalPavilion2Colored();
            } else if (clickedObject.parent.name === 'GYM1' || clickedObject.parent.parent.name === 'GYM1') {
                openModalGYM2();
            } else if (clickedObject.parent.name === 'GYM1Colored' || clickedObject.parent.parent.name === 'GYM1Colored') {
                openModalGYM2Colored();
            } else if (clickedObject.parent.name === 'people1' || clickedObject.parent.parent.name === 'people1') {
                openModalPeople2();
            } else if (clickedObject.parent.name === 'people1Colored' || clickedObject.parent.parent.name === 'people1Colored') {
                openModalPeople2Colored();
            } else if (clickedObject.parent.name === 'wisdomBar1' || clickedObject.parent.parent.name === 'wisdomBar1') {
                openModalWisdomBar2();
            } else if (clickedObject.parent.name === 'wisdomBar1Colored' || clickedObject.parent.parent.name === 'wisdomBar1Colored') {
                openModalWisdomBar2Colored();
            }            
            
        }
    }

    // 添加事件监听器
    document.addEventListener('click', onMouseClick, false);

    // 渲染循环
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(mainScene, mainCamera);
    }

    animate();
}

function addModelToPivot(key, url, scale, position, pivot) {
    // 检查预加载的模型是否存在
    if (preloadedModels[key]) {
        console.log(`Using preloaded model: ${key}`);
        const model = preloadedModels[key].clone(); // 使用预加载的模型
        model.position.set(position.x, position.y, position.z); // 调整模型在 pivot 中的位置
        model.scale.set(scale.x, scale.y, scale.z); // 设置模型缩放
        model.name = key; // 设置模型名称
        pivot.add(model); // 将模型添加到 pivot 中
    } else {
        // 如果预加载模型不存在，则加载模型
        console.log(`Preloaded model not found, loading model: ${key}`);
        loader.load(url, function (gltf) {
            console.log('Model loaded successfully');
            const model = gltf.scene;
            model.scale.set(scale.x, scale.y, scale.z); // 设置模型缩放
            preloadedModels[key] = model; // 将加载的模型存储到对象中
            const clonedModel = model.clone();
            clonedModel.position.set(position.x, position.y, position.z); // 调整模型在 pivot 中的位置
            clonedModel.name = key; // 设置模型名称
            pivot.add(clonedModel); // 将模型添加到 pivot 中
        }, undefined, function (error) {
            console.error(`Error loading model: ${key}`, error);
        });
    }
}

function addMarkModelToPivot(url, scale, position, pivot) {
    // 创建 GLTFLoader 实例
    const loader = new GLTFLoader();
    
    // 使用 GLTFLoader 加载模型
    loader.load(url, (gltf) => {
        // 获取加载的模型
        const model = gltf.scene;

        // 设置模型的位置
        model.position.set(position.x, position.y, position.z);
        
        // 设置模型的缩放
        model.scale.set(scale.x, scale.y, scale.z);
        model.name = 'mark';
        model.rotation.y = Math.PI * 0.5;

        // 添加模型到 pivot
        pivot.add(model);
    }, undefined, (error) => {
        console.error(`Error loading model from URL: ${url}`, error);
    });
}

function preloadModel(url, scale,key) {
    loader.load(url, function (gltf) {
        console.log(`${key} Model preloaded successfully`);
        const model = gltf.scene;
        model.scale.set(scale.x, scale.y, scale.z); // 调整模型缩放
        preloadedModels[key] = model;
    }, undefined, function (error) {
        console.error(`Error preloading ${key} model:`, error);
    });
}

// 定义更新兑换状态的函数
function updateExchangeStatus() {
    // 定义键名数组
    const keys = ['CB2', 'people2', 'boat2', 'pavilion2', 'navigation2','wisdomBar2', 'gate2','GYM2'];
  
    // 遍历每个键名，应用相应的逻辑
    keys.forEach(key => {
      // 读取当前键的值，并转换为布尔类型
      let itemValue = localStorage.getItem(key) === 'true';
      // 读取对应兑换键的值，并转换为布尔类型
      let exchangedValue = localStorage.getItem(key + 'Exchanged') === 'true';
  
      // 如果当前键的值为 true 且对应兑换键的值为 false，则更新对应兑换键的值为 true
      if (itemValue === true && exchangedValue === false) {
        localStorage.setItem(key + 'Exchanged', 'true');
      }
    });

    updateExchangeIcons();
  }

  // 更新显示兑换图标的函数
function updateExchangeIcons() {
    // 隐藏图标的元素
    const hideElements = {
        'gate2Exchanged': [btnGate2Source, btnGate2ColoredSource],
        'GYM2Exchanged': [btnGYM2Source, btnGYM2ColoredSource],
        'people2Exchanged': [btnPeople2Source, btnPeople2ColoredSource],
        'CB2Exchanged': [btnCB2Source, btnCB2ColoredSource],
        'navigation2Exchanged': [btnNavigation2Source, btnNavigation2ColoredSource],
        'boat2Exchanged': [btnBoat2Source, btnBoat2ColoredSource],
        'wisdomBar2Exchanged': [btnWisdomBar2Source, btnWisdomBar2ColoredSource],
        'pavilion2Exchanged': [btnPavilion2Source, btnPavilion2ColoredSource]
    };

    // 显示图标的元素
    const showElements = {
        'gate2Exchanged': btnGateExchangedSource,
        'GYM2Exchanged': btnGYMExchangedSource,
        'people2Exchanged': btnPeopleExchangedSource,
        'CB2Exchanged': btnCBExchangedSource,
        'navigation2Exchanged': btnNavigationExchangedSource,
        'boat2Exchanged': btnBoatExchangedSource,
        'wisdomBar2Exchanged': btnWisdomBarExchangedSource,
        'pavilion2Exchanged': btnPavilionExchangedSource
    };

    // 遍历隐藏图标的元素
    Object.keys(hideElements).forEach(key => {
        if (localStorage.getItem(key) === 'true') {
            hideElements[key].forEach(element => {
                if (element) {
                    element.style.display = 'none';
                }
            });
        }
    });

    // 遍历显示图标的元素
    Object.keys(showElements).forEach(key => {
        if (localStorage.getItem(key) === 'true') {
            const element = showElements[key];
            if (element) {
                element.style.display = 'block';
            }
        }
    });
}


// 禁用缩放手势
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});

document.addEventListener('gesturechange', function (e) {
    e.preventDefault();
});

document.addEventListener('gestureend', function (e) {
    e.preventDefault();
});

function getCurrentTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
    let day = String(now.getDate()).padStart(2, '0');
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    let milliseconds = String(now.getMilliseconds()).padStart(2, '0');

    const time = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    console.log(time);

    return time;
}

function getBaseName(url) {
    // 找到最后一个反斜杠的位置
    let lastSlashIndex = url.lastIndexOf('/');
    
    // 截取反斜杠之后的部分
    let fileName = url.slice(lastSlashIndex + 1);
    
    // 如果文件名以 'Colored.glb' 结尾
    if (fileName.endsWith('Colored.glb')) {
        return fileName.slice(0, -11); // 移除 'Colored.glb'
    } 
    // 如果文件名以 '.glb' 结尾
    else if (fileName.endsWith('.glb')) {
        return fileName.slice(0, -4); // 移除 '.glb'
    }
    
    return fileName; // 返回文件名，如果没有匹配的后缀
}

window.onload = function() {
    let weightOfSourceBackground = Math.min(window.innerWidth, window.innerHeight / 2772 * 1596);
    let weightOfMainBackground = Math.min(window.innerWidth, window.innerHeight / 2464 * 1255);

    // 设置新的CSS变量
    document.documentElement.style.setProperty('--source-background-width', weightOfSourceBackground + 'px');
    document.documentElement.style.setProperty('--main-background-width', weightOfMainBackground + 'px');
};
