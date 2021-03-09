export default {
    data() {
        return {
            isTouch: false,
            startX: 0,
            startY: 0,
            moveX: 0,
            moveY: 0,
            move: 0,
            end:0,
            x:0,
            y:0,
            isMove: false,
            screenType: '',
            calendarX: 0,
            isAni: false, //是否启动过度动画
			endStatus: 1,
			aniStatus: false, //否动画状态还没完成，如没完成时，滑动将无效化
			startTime: 0
        }
    },
    methods: {
        aniamteend() {
            this.isAni = false;
            this.getNowDate()

            if(this.endStatus===2) {
                this.prevMonth = this.nowMonth;
                this.nowMonth = this.nextMonth;
                
                //计算下一个月的数组
                let _year = this.year;
                let _month = this.month;
                
                if(_month=== 12){
                    _month = 1
                    _year++
                }else{
                   _month++
                }
                this.nextMonth = this.calcMonth(_year,_month)
            }

            if(this.endStatus===0) {
                this.nextMonth = this.nowMonth;
                this.nowMonth = this.prevMonth;   
				//计算上一个月的数组
				//计算下一个月的数组
                let _year = this.year;
                let _month = this.month;
                
                if(_month=== 1){
                    _month = 12
                    _year--
                }else{
                   _month--
                }
                this.prevMonth = this.calcMonth(_year,_month)
               
            }
            this.$nextTick(()=>{
                this.x = -this.elWidth;
            })
            
        },
        touchstart(e) {
			if(this.isAni) return;
			if(!this.isAni) {
				this.aniStatus = false;
			}
			this.startTime = new Date().getTime();
            let self = e.targetTouches;
            this.isAni  = false; 
            if (self.length <= 1) {
              this.startX = self[0].pageX;
              this.startY = self[0].pageY;
              this.moveX = this.startX;
              this.moveY = this.startY;
              this.isTouch = true;
            };
            this.forBackTime = this.currentTime;
            this.start++;
  
          },
          touchmove(e) {
			if(this.aniStatus){
				e.preventDefault();
				e.stopPropagation();
				return;
			} 
            if (!this.isTouch) {
              return false;
            }
  
  
            let self = e.targetTouches;
            let x = self[0].pageX;
            let y = self[0].pageY;
  
  
            let obj = this.getDirection(this.moveX, this.moveY, x, y);
            //判断是否滑动并判断滑动的类型
            if (obj.type > 0 && !this.isMove) {
  
              if (obj.type === 1 || obj.type === 2) {
                if (x > this.screenWidth / 2) {
                  // this.screenType = 'sound';
                } else {
                  // this.screenType = 'light';
                 // this.screenType = 'progress'
  
                }
              } else {
                this.screenType = 'progress'
              }
              this.isMove = true;
            }
  
            if(this.screenType === 'progress') {
                e.preventDefault();
                e.stopPropagation();
            }
  
            if (obj.type > 0 && this.isMove) {
              //   e.preventDefault();
                console.log(obj);
  
              switch (this.screenType) {
                case 'sound':
                  // this.setSound(obj)
                  break;
                case 'light':
                  // this.setLight(obj)
                  break;
                case 'progress':
                      this.moveX = x;
                      this.moveY = y;
                      this.x+=obj.angx;

                      this.$refs.slide.style.transform = `translateX(-${this.x}px)`
  
                  break;
              }
            }
          },
  
          touchend(e) {
			if(this.aniStatus){
				e.preventDefault();
				e.stopPropagation();
				return;
			} 
            this.end++;
            this.isTouch = false;
            this.isMove = false;
            let screenType =  this.screenType;
			this.screenType = '';
			let self = e.targetTouches;
            switch (screenType) {
                case 'progress':
                    e.preventDefault();
                    e.stopPropagation();
					this.isAni = true;
					this.aniStatus = true;
					let x = this.x;
					
					let now = new Date().getTime()
					let dis = this.moveX-this.startX;
					
					let isfast = Math.abs(dis)>30 && now-this.startTime <300 //是否快速滑过
					
					
					console.log(dis);
					
					
					
                    if( (isfast && dis>0) || x >= -this.elWidth*(2/3)) {
                        this.x = 0
                        this.endStatus = 0
                        return
                    }
                    
                    if((isfast && dis<0) || x <= -this.elWidth - this.elWidth/3) {
                        this.x = -this.elWidth*2
                        this.endStatus = 2
                        return
                    }
					this.endStatus = 1
					
                    this.x = -this.elWidth;
                
                default:
            }
            
  
          },
          //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
          getDirection(startx, starty, endx, endy) {
              var angx = endx - startx;
              var angy = endy - starty;
              var result = 0;
              //如果滑动距离太短
              if (Math.abs(angx) < 1.5 && Math.abs(angy) < 1.5) {
                  return result;
              }
              var angle = this.getAngle(angx, angy);
              if (angle >= -135 && angle <= -45) {
                  result = 1;
              } else if (angle > 45 && angle < 135) {
                  result = 2;
              } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                  result = 3;
              } else if (angle >= -45 && angle <= 45) {
                  result = 4;
              }
              var data = {
                  type: result,
                  angx: angx,
                  angy: angy
              }
              return data;
          },
          //获得角度
          getAngle(angx, angy) {
              return Math.atan2(angy, angx) * 180 / Math.PI;
          },
    }
}