//生成遮罩
function maskStyle(isOpen, width, height,zIndex) {
    if (isOpen) {
        return `display:block;position: absolute;left: 0;top: 0;z-index: ${zIndex};width:${width}px;height:${height}px;cursor: move;`;
    }
    return `display:none;position: absolute;left: 0;top: 0;z-index: ${zIndex};width:${width}px;height:${height}px;cursor: move;`;
}

//获取元素高度
function getDomWH(_dom) {
    return {
        width: _dom.clientWidth,
        height: _dom.clientHeight
    }
}



//生成唯一标示ID
function getUUID(){
    return Date.now();
}

function isHasTag(target,id,tag){
    //寻找标记
    if(target.nodeType!=1){
        return;
    }
    if(typeof tag!='string'){
        return;
    }
    let isHas=-1;
    let currentId=null;
    while(isHas<0&&currentId!=id){
        isHas=target.className.indexOf(tag);
        currentId=target.id;
        target=target.parentNode;
    }
    return isHas>-1;
}

module.exports={
    maskStyle,
    getDomWH,
    getUUID,
    isHasTag
}