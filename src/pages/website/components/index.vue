<template>
    <div class="page-components">
        <div class="nav-left">
            <div class="item-link-main">更新日志</div>
        </div>
        <router-view/>
    </div>
</template>
<style lang="less" scoped>
.page-components{
    flex: 1;
    display: flex;
    
}
.nav-left{
    width: 200px;
}
.item-link-main{
    font-size: 18px;
    font-weight: bold;
}
</style>