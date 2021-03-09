import { slideHeight } from '../libs/height'
export default {
    data() {
        return {
            step: 4
        }
    },
    methods: {
        animationFrame(type) {
            if(type === 1) {
                window.requestAnimationFrame(this.stepAni);
                return
            }
            
        },
        stepToggle() {
            window.requestAnimationFrame(this.stepAni);
        }
        
    }
}