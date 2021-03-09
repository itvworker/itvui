export default {
    methods: {
        calcMax() {
            let out =  this.$refs.out;
            let parentWidth = out.clientWidth;
            let parentHeight = out.clientHeight;
            let nodes = this.$children;
            for(let i = 0, l = nodes.length; i < l; i++) {
                if(this.$children[i]) {
                    this.$children[i].maxScrollX = nodes[i].$el.children[0].clientWidth - parentWidth > 0 ? nodes[i].$el.children[0].clientWidth - parentWidth : 0;
                    this.$children[i].maxScrollY = nodes[i].$el.children[0].clientHeight - parentHeight > 0 ? nodes[i].$el.children[0].clientHeight - parentHeight  : 0;

                    

                }else{
                    this.$children[i].maxScrollY = 0;
                    this.$children[i].maxScrollX = 0;
                    this.$children[i].x = 0;
                    this.$children[i].y = 0;
                }
            }

        }
    }

}