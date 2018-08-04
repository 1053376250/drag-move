const {
    getDomWH,
    isHasTag
} = require('../common');
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
        if ((options.right || options.right == 0) && (options.top || options.top == 0)) {
            this.dragDom.style.right = options.right + 'px';
            this.dragDom.style.top = options.top + 'px';
        }
        this.dragDom.removeEventListener('mousedown', mousedown);
        this.dragDom.addEventListener('mousedown', mousedown, false);
        this.dragDom.removeEventListener('mouseup', mouseup);
        this.dragDom.addEventListener('mouseup', mouseup, false)
        function mousedown(e) {
            if (!self.isDrag) {
                return;
            }
            var target = e.target;
            self.isMouseDown=true;
            if(isHasTag(target,self._options.id,'nodrag')) return;
            if(!isHasTag(target,self._options.id,'drag')) return;
            self.setZIndex();
            self.openMask();
            //计算元素宽高
            self.domWH = getDomWH(self.dragDom);
            //圈定区域
            self.dragArea = getDragArea(self.domWH.width, self.domWH.height);
            self.offsetXY = getOffsetXY(self.dragDom, self.domWH.width, self._window);
            //计算偏差
            let deviationX = e.clientX - self.offsetXY.right;
            let deviationY = e.clientY - self.offsetXY.top;
            //保存点击时的坐标
            currentX = e.clientX;
            currentY = e.clientY;
            self.right = currentX - e.clientX + self.offsetXY.right;
            self.top = e.clientY - currentY + self.offsetXY.top;
            // if (typeof options.dragclick == 'function') {
            //     options.dragclick({right:self.right,top:self.top});
            // }
            if (typeof options.dragclick == 'function' && !self.clickTag) {
                options.dragclick({
                    right: self.right,
                    top: self.top
                });
            }

            // self.dragDom.style.cursor='move';
            // self._document.onmousemove = function (e) {
            //     //计算移动距离
            //     calcMove(e);
            // }
            self.maskdiv.onmousemove = function (e) {
                if(!self.isMouseDown){
                    mouseup();
                    return;
                }
                calcMove(e);
            }

            self.maskdiv.onmouseup = function (e) {
                // self.dragDom.style.cursor='auto';
                self.closeMask();

                self.clickTag++;
                clearTimeout(self.clickTimeout);

                self.clickTimeout = setTimeout(function () {
                    self.clickTag = 0;
                    if (typeof options.dragend == 'function') {
                        options.dragend({
                            right: self.right,
                            top: self.top
                        });
                    }
                }, 200);

                if (self.clickTag == 2) {
                    if (typeof options.dragdbclick == 'function') {
                        clearTimeout(self.clickTimeout);
                        options.dragdbclick({ right: self.right, top: self.top });
                    }
                    self.clickTag == 0;
                }

            }
            document.onmouseup=function(){
                self.isMouseDown=false;
            }
        }


        function mouseup(e) {
            // self.dragDom.style.cursor='auto';
            self.closeMask();
        }
        function calcMove(e) {
            moveX = currentX - e.clientX + self.offsetXY.right;
            moveY = e.clientY - currentY + self.offsetXY.top;
            if (moveX >= self.dragArea.left && moveY <= self.dragArea.top) {
                self.render(self.dragArea.left, 0);
                return;
            }
            if (moveX >= self.dragArea.left && moveY >= self.dragArea.bottom) {
                self.render(self.dragArea.left, self.dragArea.bottom);
                return;
            }
            if (moveX <= self.dragArea.right && moveY <= self.dragArea.top) {
                self.render(0, 0);
                return;
            }
            if (moveX <= self.dragArea.right && moveY >= self.dragArea.bottom) {
                self.render(0, self.dragArea.bottom);
                return;
            }
            if (moveX >= self.dragArea.left) {
                self.render(self.dragArea.left, moveY)
                return;
            }
            if (moveX <= self.dragArea.right) {
                self.render(0, moveY)
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
        this.right = x;
        this.top = y;
        this.dragDom.style.right = x + 'px';
        this.dragDom.style.top = y + 'px';
        // this.dragDom.style.right=this.dragArea.right-x+'px';
    }
    reset(right = '64%', top = '20px') {
        this.dragDom.style.right = right + 'px';
        this.dragDom.style.top = top + 'px';
    }
    getDomArea() {
        return this.dragDom;
    }

}

//计算元素偏移
function getOffsetXY(_dom,width,_window) {
    return {
        right: window.innerWidth-_dom.offsetLeft-width,
        top: _dom.offsetTop
    }
}

//获取移动范围
function getDragArea( width, height) {
    return {
        left:window.innerWidth- width,
        top: 0,
        right: 0,
        bottom: window.innerHeight - height
    }
}


module.exports = DragMove;






