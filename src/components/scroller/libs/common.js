export default {
    calaMaxY(parent, child) {
        let parentHeight = parent.clientHeight;
        let childHeight = child.clientHeight;
        let parentWidth = parent.clientWidth;
        let childWidth = child.clientWidth;
        return {
            y: childHeight - parentHeight > 0 ? childHeight - parentHeight : 0,
            x: childWidth - parentWidth > 0 ? childWidth - parentWidth : 0
        }
    }

}