<template>
    <div class="menu">
        <div :class="active==0?'menu-item':'menu-hidden'" @click="changeRouter(0)">
            <img class="menu-white" src="../assets/icon1.png">
            店铺管理
            <span class="click-area" @click="scal">
                <svg width="8px" height="8px" class="svg">
                    <polygon points="0,0 8,0 4,8" style="fill:#000;stroke:#000;stroke-width:1" /> 
                </svg>
            </span>
        </div>
        <template v-if="hidden">
            <div :class="active==1?'menu-item':'menu-hidden'" @click="changeRouter(1)">
                <span class="menu-white"></span>
                坐标设置
            </div>
            <div :class="active==2?'menu-item':'menu-hidden'" @click="changeRouter(2)">
                <span class="menu-white"></span>
                传感器管理
            </div>
            <div :class="active==3?'menu-item':'menu-hidden'" @click="changeRouter(3)">
                <span class="menu-white"></span>
                手环管理
            </div>
        </template>
    </div>
</template>

<script>
export default {
    data () {
        return {
            active: 0,
            hidden: false
        };
    },
    methods: {
        changeRouter (data) {
            if (data === 0) {
                this.$router.push({path: '/'});
            }
            if (data === 1) {
                this.$router.push({path: '/BaseBind'});
            }
            if (data === 2) {
                this.$router.push({path: '/BaseBind'});
            }
            if (data === 3) {
                this.$router.push({path: '/BaseList'});
            }
            this.active = data;
        },
        scal () {
            this.hidden = !this.hidden
        }
    }
};
</script>

<style>
    .menu{
        padding-top: 1rem;
        min-height: 100%;
        width: 6.11rem;
        float: left;
        min-width: 6.11rem;
        background:rgba(255,255,255,1);
    }
    .menu-item{
        border-right: 0.22rem solid rgba(255,192,1,1);
        background:rgba(255,236,178,1);
        font-size:0.39rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:1.39rem;
        text-align: left;
    }
    .menu-item img{
        display: inline-block;
        margin:0 .5rem 0 1rem;
        vertical-align: middle;
    }
    .menu-hidden{
        background:#fff;
        font-size:0.39rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:1.39rem;
        text-align: left;
        width: 100%;
    }
    .menu-white{
        display: inline-block;
        margin:0 .5rem 0 1rem;
        vertical-align: middle;
        width: 25px;
        height: 25px;
    }
    .click-area{
        display: inline-block;
        width: 1.5rem;
        height: 1.39rem;
        position: relative;
        text-align: center;
    }
</style>
