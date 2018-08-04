
const {
    getDomWH,
    isHasTag
} = require('../common');
// const popMange=require('../popMange')();
const Base = require('./base');
class DragMove extends Base {
    constructor(options) {
        super(options);
    }


    initEvent(options) {
        let self = this;
        let currentX;
        let currentY;
        let moveX;
        let moveY;
        //圈定区域
        this.dragArea = getDragArea(this.domWH.width, this.domWH.height);
         //计算元素offset
         this.offsetXY = getOffsetXY(this.dragDom);
        //设置默认位置
        if (options.left && (options.top || options.top == 0)) {
            this.dragDom.style.left = options.left + 'px';
            this.dragDom.style.top = options.top + 'px';
        }
        this.dragDom.removeEventListener('mousedown', mousedown);
        this.dragDom.addEventListener('mousedown', mousedown, false);
        this.dragDom.removeEventListener('mouseup', mouseup);
        this.dragDom.addEventListener('mouseup', mouseup, false);
        function mousedown(e) {
            if (!self.isDrag) {
                return;
            }
            self.isMouseDown=true;
            var target = e.target;
            if(isHasTag(target,self._options.id,'nodrag')) return;
            if(!isHasTag(target,self._options.id,'drag')) return;
            self.setZIndex();
            self.openMask();
            //计算元素宽高
            self.domWH = getDomWH(self.dragDom);
            //圈定区域
            self.dragArea = getDragArea(self.domWH.width, self.domWH.height);
            self.offsetXY = getOffsetXY(self.dragDom);
            //计算偏差
            let deviationX = e.clientX - self.offsetXY.left;
            let deviationY = e.clientY - self.offsetXY.top;

            //保存点击时的坐标
            currentX = e.clientX;
            currentY = e.clientY;
            self.left = e.clientX - currentX + self.offsetXY.left;
            self.top = e.clientY - currentY + self.offsetXY.top;
            if (typeof options.dragclick == 'function' && !self.clickTag) {
                options.dragclick({
                    left: self.left,
                    top: self.top
                });
            }
            self.maskdiv.onmousemove = function (e) {
                
                if(!self.isMouseDown){
                    mouseup();
                    return;
                }
                calcMove(e);
            }

            self.maskdiv.onmouseup = function (e) {
                if (!self.isDrag) {
                    return;
                }
                // self.dragDom.style.cursor='auto';
                self.closeMask();
                self.clickTag++;
                clearTimeout(self.clickTimeout);
                self.clickTimeout = setTimeout(function () {
                    self.clickTag = 0;
                    if (typeof options.dragend == 'function') {
                        options.dragend({
                            left: self.left,
                            top: self.top
                        });
                    }
                }, 200);

                if (self.clickTag == 2) {
                    if (typeof options.dragdbclick == 'function') {
                        clearTimeout(self.clickTimeout);
                        options.dragdbclick({ left: self.left, top: self.top });
                    }
                    self.clickTag == 0;
                }

            }
            document.onmouseup=function(){
                self.isMouseDown=false;
            }
        }

        function mouseup(e) {
            if (!self.isDrag) {
                return;
            }
            self.closeMask();
        }
        function calcMove(e) {
            moveX = e.clientX - currentX + self.offsetXY.left;
            moveY = e.clientY - currentY + self.offsetXY.top;
            if (moveX <= self.dragArea.left && moveY <= self.dragArea.top) {
                self.render(0, 0);
                return;
            }
            if (moveX <= self.dragArea.left && moveY >= self.dragArea.bottom) {
                self.render(0, self.dragArea.bottom);
                return;
            }
            if (moveX >= self.dragArea.right && moveY <= self.dragArea.top) {
                self.render(self.dragArea.right, 0);
                return;
            }
            if (moveX >= self.dragArea.right && moveY >= self.dragArea.bottom) {
                self.render(self.dragArea.right, self.dragArea.bottom);
                return;
            }
            if (moveX <= self.dragArea.left) {
                self.render(0, moveY)
                return;
            }
            if (moveX >= self.dragArea.right) {
                self.render(self.dragArea.right, moveY)
                return;
            }
            if (moveY <= self.dragArea.top) {
                self.render(moveX, 0)
                return;
            }
            if (moveY >= self.dragArea.bottom) {
                self.render(moveX, self.dragArea.bottom)
                return;
            }
            self.render(moveX, moveY)
        }

    }
    render(x, y) {
        this.left = x;
        this.top = y;
        this.dragDom.style.left = x + 'px';
        this.dragDom.style.top = y + 'px';
        // this.dragDom.style.right=this.dragArea.right-x+'px';
    }
    reset(left = '64%', top = '20px') {
        if (left == 'center') {
            this.dragDom.style.left = this.dragArea.right / 2 + 'px';
            this.dragDom.style.top = this.dragArea.bottom / 2 + 'px';
            return;
        }
        this.dragDom.style.left = left;
        this.dragDom.style.top = top;
    }
    //中途关闭还原
    reduction(left, top, width, height) {
        this.dragDom.style.left = left;
        this.dragDom.style.top = top;
        this.dragDom.style.width = width;
        this.dragDom.style.height = height;
    }

}

//获取移动范围
function getDragArea(width, height) {
    return {
        left: 0,
        top: 0,
        right: window.innerWidth - width,
        bottom: window.innerHeight - height
    }
}

//计算元素偏移
function getOffsetXY(_dom) {
    return {
        left: _dom.offsetLeft,
        top: _dom.offsetTop
    }
}

module.exports = DragMove;













