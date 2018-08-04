let DragMove=require('../core');
class PopMange{
    constructor(){
        this.zIndexPool=[];
        this.topZindexPool=[];
        this.currentIndex=1000;
    }

    //设置优先层级
    setIndex(id){
        var index= this.zIndexPool.findIndex((item)=>{
            return item.id==id;
        });
        if(index<0){
            return;
        }
        var item = this.zIndexPool.splice(index,1);
        this.zIndexPool.push(item);
        this.render();
    }

    //取消置顶
    cancelTop(id){
        var index= this.topZindexPool.findIndex((item)=>{
            return item.id==id;
        });
        if(index<0){
            return;
        }
        var item =this.topZindexPool.splice(index,1);
        this.zIndexPool.push(item);
        this.render();
    }

    //设置置顶
    setTop(id){
        var index= this.zIndexPool.findIndex((item)=>{
            return item.id==id;
        });
        if(index<0){
            return;
        }
        var item = this.zIndexPool.splice(index,1);
        this.topZindexPool.push(item);
        this.render();
    }

    // addPop(pop){
    //     this.zIndexPool.push({
    //         id:pop.id,
    //         isTop:pop.isTop,
    //         pop:pop
    //     });
    // }
    getZindex(pop,isTop){
        if(isTop){
            this.topZindexPool.push({id:pop.id,pop:pop});
        }else{
            this.zIndexPool.push({id:pop.id,pop:pop});
        }
        this.render();
    }

    // recovery(list){

    // }

    //层级重新管理
    render(){
        let _currentIndex=1000;
        this.zIndexPool.forEach((item,index)=>{
            item.pop.setZIndex(_currentIndex+index);
        })
    }

}
var popMange=null;
function getInstance(){
    if(popMange==null){
        popMange=new PopMange();
    }
    return popMange;
}
module.exports=getInstance();

