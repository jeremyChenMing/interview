// 一、使用requestAnimation来插入几十万个dom，可以减少页面的卡顿
function random(m,n) {
    return Math.floor(Math.random() * n + m)
}
let progress = 0;
function render() {
    progress += 1;
    // 找个元素
    $('body').append('<div style="background-color: rgb('+ random(0,255)+','+ random(0,255)+','+ random(0,255)+ ')" >hello' + progress +'</div>')
    if(progress < 10000000000) {
        window.requestAnimationFrame(render)
    }
}
window.requestAnimationFrame(render)
return;


// 二、用可视区域的办法去添加
var count = 10000000000;
var inter = 20;
var start = 1;
function create(start=1) {
    for(let n=start; n<(start + inter); n++) {
        var div = '<div style="background-color: rgb('+ random(0,255)+','+ random(0,255)+','+ random(0,255)+ ')" >hello' + n +'</div>';
        $('#root').append(div)
    }
}
// 第一次执行

// create();
$(document).scroll(function() {
    var viewH = $(window).height();  //可见高度 
    var contentH = $(document).height();  //内容高度
    var scroH = $(document).scrollTop();  //滚动高度
    // console.log(viewH, '可视区域')
    // console.log(contentH, '内容高度')
    // console.log(scroH, '滚动高度')
    if (contentH - (scroH + viewH) <= 100){  //距离底部高度小于100px
        console.log('该执行方法了')
        start = start + inter;
        // create(start); // 需要防抖，只执行最后一次
    }  
    if (contentH === (scroH + viewH)){  //滚动条滑到底部啦
        // console.log('到底了')
    }  

});