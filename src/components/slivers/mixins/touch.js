import getDirection from '../../../libs/touch'
export default {
    methods: {
        touchstart(e) {
            if(this.isRefresh) {
                e.preventDefault()
                e.stopPropagation()
                return
            }
            this.isTouch = true;
            this.startTime = new Date().getTime()
            this.touchDirection = 0; //重置touch滑动方向
            this.moveDirection = ''; //重置touch滑动方向
            this.nowSliver =  this.childrenSlivers[this.sliverIndex]; //当前子元素
            let touches = e.touches;
            //检查手指数量
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }

            // 两只手指滑动处理中心点
            let isSingleTouch = touches.length === 1;
            if (isSingleTouch) { //如果只有1只手指时
                this.moveX = touches[0].pageX;
                this.moveY = touches[0].pageY;
            } else {//如果只有两只手指时，取中点
                this.moveX = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                this.moveY = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }
            
            this.startX = this.moveX 
            this.startY = this.moveY
            this.passMoveX = this.moveX,
            this.passMoveY = this.moveY;
            this.isTouch = true


        },
        touchmove(e) {
            if(this.isRefresh) {
                e.preventDefault()
                e.stopPropagation()
                return
            }
            
            let touches = e.touches;
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }
            
            // 两只手指滑动处理中心点
            let moveX, moveY
            let isSingleTouch = touches.length === 1;
            if (isSingleTouch) {
                moveX = touches[0].pageX;
                moveY = touches[0].pageY;
            } else {
                moveX = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                moveY = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }

            let x = moveX
            let y = moveY
            
         
            this.touchMoveList.push({
                x: moveX,
                y: moveY,
                time: new Date().getTime()
            })

          


            let obj = getDirection(this.moveX, this.moveY, x, y, this.moveDirection)
            this.touchDirection = obj.type;
            


            
            //判断是否滑动并判断滑动的类型
            if (obj.type > 0 && !this.moveDirection) {
                if (obj.type === 1 || obj.type === 2) {
                    this.moveDirection = 'vertical'
                } else {
                    this.moveDirection = 'horizontal'
                }
            }
            
            //判断是否已经有滑动了
            if (!this.moveDirection) return
            e.preventDefault()
            e.stopPropagation()

            
            this.moveX = x
            this.moveY = y
                switch (this.moveDirection) {
                    case 'vertical':
                        // this.nowSliver.touchmove(obj.angy)
                        //touchmove是否有滑动，1向上 2向下 3向左 4向右 0未滑动

                        //当向上滚动时，并且还未处最小收缩度
                        //是否收缩头部

                        if(obj.type===1) {
                            //header处在最大值
                            if(this.headerDomHeight === this.headerMaxHeight) {
                                //如果子元素能反弹时，下拉子元素
                                if(this.nowSliver.domY < 0 && this.nowSliver.bounceTop) {
                                    this.nowSliver.domY -=  (obj.angy * 0.3);
                                    //如果从反弹中回来时，回的时候大于0时，马上置0
                                    if(this.nowSliver.domY>0) {
                                        this.nowSliver.domY = 0;
                                    }
                                    this.nowSliver.setPosition()
                                    return
                                }
                                
                                //当前slivers有开启回弹时，并且已经处于下拉状态时
                                if(this.nowSliver.domY===0 && this.bounceTop && this.domPy < 0) {
                                    this.domPy -=  obj.angy;
                                    if(this.domPy>0) {
                                        this.domPy = 0;
                                    }
                                    this.scrollerDom(0,this.domPy,1)
                                    return
                                }

                               
                                    this.headerDomHeight += obj.angy;
                                    //当滑动时，小于最小时，马上置为最小值
                                    if(this.headerDomHeight < this.headerMinHeight) {
                                        this.headerDomHeight = this.headerMinHeight;
                                    }
                                    this.headerDom(this.headerDomHeight);
                               
                            }
                            //头部在过度之间 
                            if(this.headerDomHeight < this.headerMaxHeight && this.headerDomHeight > this.headerMinHeight) {
                                this.headerDomHeight += obj.angy;
                                //当滑动时，小于最小时，马上置为最小值
                                if(this.headerDomHeight < this.headerMinHeight) {
                                    this.headerDomHeight = this.headerMinHeight;
                                }
                                this.headerDom(this.headerDomHeight);
                                return
                            }
                            
                            if(this.headerDomHeight===this.headerMinHeight) {
                                this.nowSliver.domY -= obj.angy 
                                this.nowSliver.setPosition();
                            }

                            return
                        }

                        if(obj.type===2) {
                            //header处在最大值
                            if(this.headerDomHeight === this.headerMaxHeight) {
                                //如果子元素能反弹时，下拉子元素
                                if(this.nowSliver.domY<=0 && this.nowSliver.bounceTop) {
                                    this.nowSliver.domY =  this.nowSliver.domY - (obj.angy * 0.3);
                                    this.nowSliver.setPosition();
                                    return
                                }

                                
                                if(this.nowSliver.domY === 0 && this.bounceTop) {
                                    this.domPy -=  (obj.angy * 0.3);
                                    this.scrollerDom(0,this.domPy,1)
                                    return
                                }
                            }
                            //当header处理最小值时
                            if(this.headerDomHeight===this.headerMinHeight) {
                                //子元素滚动大于0
                                if(this.nowSliver.domY>0) {
                                    this.nowSliver.domY -= obj.angy
                                    //如果子元素将要小于0时，马上置0
                                    if(this.nowSliver.domY<0) {
                                        this.nowSliver.domY = 0;
                                    }
                                    this.nowSliver.setPosition(); 
                                    return
                                }
                                //过渡，当处理0时， 放大header
                                if(this.nowSliver.domY===0) {
                                    this.headerDomHeight += obj.angy;
                                    this.headerDom(this.headerDomHeight);
                                    return
                                }
                            }

                            if(this.headerDomHeight < this.headerMaxHeight && this.headerDomHeight > this.headerMinHeight) {
                                this.headerDomHeight += obj.angy;
                                //过渡，当大于最大时
                                if(this.headerDomHeight>this.headerMaxHeight) {
                                    this.headerDomHeight = this.headerMaxHeight;
                                }
                                this.headerDom(this.headerDomHeight);
                            }

                            return
                        }

                       
                       
                        break;
                    case 'horizontal':
                        break
                }

          
           
        },
        touchend(e) {    
            if(this.isRefresh) {
                e.preventDefault()
                e.stopPropagation()
                return
            }
            let now = new Date().getTime()
            this.isTouch = false;
            // let dis = this.moveDirection==='progress'?this.moveX - this.startX:this.moveY - this.startY
            // let isfast = Math.abs(dis) > 20 && now - this.startTime < 200
            // let x = this.x
            // let y = this.y
            
            switch (this.moveDirection) {
                case 'vertical':

                    //slivers回弹，即父元素回弹
                    if(this.bounceTop){
                        if((!this.refreshLoad && this.domPy<0) ||(this.refreshLoad && this.domPy >-this.refreshHeight) ) {
                            let speed = this.calcStep(this.domPy, 1.2);
                            this.bouncePy = 0;
                            this.bounceAnimate(speed)
                            return
                        }

                        if(this.refreshLoad && this.domPy < -this.refreshHeight) {
                            let dis = this.domPy - this.refreshHeight;
                            this.bouncePy = -this.refreshHeight;
                            let speed = this.calcStep(dis, 1.2);
                            this.bounceAnimate(speed);
                            this.isRefresh = true;
                            this.$emit('refresh')
                            return
                        }
                    }
                    // let speed = this.calcMoveSpeed();
                    // this.animate(speed)
                    
                   
                    break
                case 'horizontal':
                    

                default:
                    
            }
        },
    }
}