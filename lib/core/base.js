
const { maskStyle,
    getDomWH,
    getUUID } = require('../common');
// const popMange=require('../popMange')();
let zIndex = 200;

class DragMove {
    constructor(options) {
        if (!document.nodeType || document.nodeType != 9) {
            throw new Error('document不是根节点');
        }
        this._options = options;
        let self = this;
        //计算元素宽高(移动元素)
        this.dragDom = document.getElementById(options.id);
        //遮罩层宽高（要求和iframe一样）
        this.maskWidth = window.innerWidth;
        this.maskHeight = window.innerHeight;
        //遮罩层div
        this.maskdiv = null;
        //移动区域
        // this.moveArea = document.getElementById(options.moveid);
        // this.moveArea.style.cursor = 'move';
        //计算元素宽高
        this.domWH = getDomWH(this.dragDom);
        this.id = getUUID();
        //设置默认位置
        if (options.left && (options.top || options.top == 0)) {
            this.dragDom.style.left = options.left + 'px';
            this.dragDom.style.top = options.top + 'px';
        }
        //添加z-index
        this.zIndex = zIndex++;
        this.dragDom.style.zIndex = this.zIndex;
       
       
        this.left = null;
        this.top = null;
        this.resetlocation = options.resetlocation;

        this.clickTimeout = null;
        this.clickTag = 0;
        //是否允许拖拽
        this.isDrag = true;
        //初始化事件
        this.initEvent(options);
        // popMange.getZindex(this,false);
        //鼠标是否按下
        this.isMouseDown=false;

       
    }

    setZIndex() {
        if (this.zIndex == zIndex) {
            return;
        }
        this.zIndex = zIndex;
        this.dragDom.style.zIndex = zIndex++;

    }
    openMask() {
        if (this.maskdiv != null) {
            this.maskdiv.style = maskStyle(true, this.maskWidth, this.maskHeight, this.zIndex);
            return;
        }
        this.maskdiv = getMask();
        this.maskdiv.style = maskStyle(true, this.maskWidth, this.maskHeight, this.zIndex);
       

        function getMask(){
            let mask=document.getElementById('mask445dasdasd86456');
            if(mask){
                return mask;
            }
            mask=document.createElement('div');
            mask.id='mask445dasdasd86456';
            document.body.appendChild(mask);
            return mask;
        }
    }
    closeMask() {
        if (this.maskdiv == null) {
            return;
        }
        this.maskdiv.style = maskStyle(false, this.maskWidth, this.maskHeight, this.zIndex);
    }
    enableDrag() {
        this.isDrag = true;
    }
    disableDrag() {
        this.isDrag = false;
    }
    getDomArea() {
        return this.dragDom;
    }
    //检测确认是否存活进行回收
    isSurvival() {
        //如果该dom获取不到，认为已经离开页面
        let dragDom = document.getElementById(this._options.id);
        return {
            isSurvival: !!dragDom,
            id: this.id,
            isResident: !!this._options.isResident
        }
    }

}
module.exports = DragMove;













