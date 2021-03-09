<template>
    <div class="itv-picker-panel">
        <picker-slot v-for="(item, index) of listData" :ref="`picer-slot-${(index)}`"
            :default-value="chooseValueData[index]"
            :is-update="isUpdate"
            :list-data="item"
            @chooseItem="chooseItem"
            :key="index"
            :key-index="index"
            :lastChange="lastChange"
            :rows="rows"
            :isLoop="isLoop"
        ></picker-slot>
    </div>
</template>
<script>
import pickerSlot from "./picker-slot.vue";
export default {
    name:'picker',
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        customClassName: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: ' '
        },
        listData: {
            type: Array,
            default: () => []
        },
        defaultValueData: {
            type: Array,
            default: () => []
        },
        lastChange: {
            type: Boolean,
            default: false
        },
        rows: {
            type: Number, 
            default: 5
        },
        isLoop: {
            type: Boolean,
            default: false
        }
    },
    components: {
        pickerSlot
    },
    data() {
        return {
            chooseValueData: [],
            cacheValueData: [],
            isUpdate: false
        };
    },
    watch: {
        'defaultValueData': function() {
            this.chooseValueData = [...this.defaultValueData];
            this.cacheValueData = [...this.defaultValueData];
            this.$emit('confirm', this.cacheValueData);
        }
    },
    mounted() {
        

    },
    methods: {
        updateChooseValue(self, index, value) {
            self.cacheValueData.splice(index, 1, value);
            let ref = `picer-slot-${index}`;
            self.$refs[ref][0].updateTransform(value);
        },


        closeActionSheet() {
            this.isUpdate = !this.isUpdate;
            this.cacheValueData = [...this.chooseValueData];
            this.$emit('close');
            this.$emit('close-update', this, this.chooseValueData);
        },

        confirm() {
            this.$emit('confirm', this.cacheValueData);
            this.chooseValueData = [...this.cacheValueData];
            this.$emit('close');
        },

        chooseItem(value, index) {

            if (this.cacheValueData[index] !== value) {
                this.cacheValueData[index] = value;
                this.$emit('choose', this, index, value, this.cacheValueData);
                
            }
        }
    },
    created() {
        if (this.defaultValueData && this.defaultValueData.length) {
            this.chooseValueData = [...this.defaultValueData];
        } else {
            let defaultValueData = [];
            this.listData.map((item, index) => {
                defaultValueData.push(item[0]);
            });
            this.chooseValueData = [...defaultValueData];
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-picker.less';
</style>