<template>
    <itv-container>
        <itv-header>Form表单</itv-header>
        <itv-main>
            <itv-form>
                <itv-label :label="item.name" :key="index" v-for="(item, index) in inputList">
                    <itv-input placeholder="请输入你的名字" :type="item.type" inputType="positive" />
                </itv-label>
            </itv-form>
        </itv-main>
    </itv-container>
</template>
<script>
    import ItvForm from './form';
    import ItvLabel from './label';
    import ItvInput from './input'

    let schema = {
        phone: [
            { required: true, rule:'phone', message: '请输入活动名称', trigger: 'blur' },
            
        ]
    }
    export default {
        components: {
            ItvForm,
            ItvLabel,
            ItvInput
        },
        data(){
            return{
                rules: schema,
                inputList: [
                    {   
                        id:1,
                        name: "数字",
                        type: "number"
                    },
                    {   
                        id:2,
                        name: "名字",
                        type: "text"
                    }
                ]
            }
        },
        methods:{
            add() {
                this.inputList.push({
                    name:'内容'
                })
            }
        }
    }
</script>

<style lang="less">
</style>
