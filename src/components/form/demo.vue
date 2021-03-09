<template>
    <itv-container>
        <itv-header>Form表单</itv-header>
        <itv-main>
            <itv-form>
                <itv-label :label="item.name" :key="id" v-for="item in inputList">
                    <itv-input placeholder="请输入你的名字" />
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
            { required: true, message: '请输入活动名称', trigger: 'blur' },
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
                        name: "名字"
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
