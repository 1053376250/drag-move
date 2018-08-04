

// class PopFactory{
//     constructor(){
//         this.popLists=[];
//         // 启动定时器
//         setInterval(()=>{
//             this.recovery();
//         },2000);
//     }

//     //生成弹窗

//     //添加id映射
//     releasePop(options){
//         //配置可以修改为永久驻留，按时销毁，永久驻留
//         options.zIndex=
//         // let dragMove=new DragMove(options);
//         // this.popLists.push({
//         //     id:options.id,
//         //     isRecovery:false,
//         //     isTop:options.isTop,
//         //     dragMove:dragMove
//         // });
//         return dragMove;
        
//     }
//     //添加获取方法
//     //这里是移动id
//     getPop(id){
//         let pop=this.popLists.find((item)=>{
//             return item.id==id;
//         });
//         return pop;
//     }
//     //回收
//     recovery(){
//         let survival=null;
//         this.popLists.forEach((item)=>{
//             survival=item.dragMove.isSurvival();
//             if(!survival.isResident&&!survival.isSurvival){
//                 //标记回收
//                 item.isRecovery=true;
//             }
//         });
//         //生成新的
//         let _tempList=this.popLists.filter((item)=>{
//             return item.isRecovery!=true;
//         })
//         //获取已经准备回收的
//         let _recoveryList=this.popLists.filter((item)=>{
//             return item.isRecovery==true;
//         })
//         this.popLists=_tempList;
//     }

// }