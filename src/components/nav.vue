<template>
    <div class="menu">
        <div :class="ind==3?'menu-item':'menu-hidden'" @click="changeBgc(3)">
            <img class="menu-white" src="../assets/icon1.png">
            店铺管理
            <span class="click-area" @click="scal">
                <svg width="8px" height="8px" class="svg">
                    <polygon points="0,0 8,0 4,8" style="fill:#000;stroke:#000;stroke-width:1" /> 
                </svg>
            </span>
        </div>
        <template v-if="!hidden">
            <router-link v-for="(item,index) in list" 
                :key="item.value" :to="{path:item.path,query:{item:index}}"
                :class="{'menu-item':ind == index}"
                @click.native="changeBgc(index)"  class="menu-hidden"
                > 
                <span class="ims"></span>
                {{item.label}} 
            </router-link> 
        </template>
    </div>
</template>

<script>
export default {
    data () {
        return {
            active: 0,
            hidden: false,
            list: [
                {path:'/ShopCoordinate',label:'坐标设置'},
                {path:'/ShopSensor',label:'传感器管理'},
                {path:'/ShopBind',label:'手环管理'}
            ],
            ind: 3
        };
    },
    methods: {
        changeBgc(index){
            this.ind = index;
            console.log(index)
            if (index === 3) {
                this.$router.push({path: '/'});
            }
        },
        // changeRouter (data) {
        //     if (data === 0) {
        //         this.$router.push({path: '/'});
        //     }
        //     if (data === 1) {
        //         this.$router.push({path: '/BaseBind'});
        //     }
        //     if (data === 2) {
        //         this.$router.push({path: '/BaseBind'});
        //     }
        //     if (data === 3) {
        //         this.$router.push({path: '/BaseList'});
        //     }
        //     this.active = data;
        // },
        scal () {
            this.hidden = !this.hidden
        }
    },
    mounted(){
        if(this.$route.query.item){
            this.ind = this.$route.query.item;
        }else{
            this.ind = 0;
        }
    }
};
</script>

<style>
    .menu{
        padding-top: 1rem;
        height: calc(100% - 1rem);
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
    .menu-hidden{
        background:#fff;
        font-size:0.39rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        line-height:1.39rem;
        border-right: 0.22rem solid #fff;
        color:rgba(60,68,86,1);
        text-align: left;
        height: 1.39rem;
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
    .menu-hidden{
        border-right: 0.22rem solid rgba(255,255,255,1);
        background:#fff;
        font-size:0.39rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:1.39rem;
        text-align: left;
        display: inline-block;
        width: 100%;
        text-decoration:none;
        box-sizing: border-box;
    }
    .menu{
        padding-top: 1rem;
        height: calc(100% - 1rem);
        width: 6.11rem;
        float: left;
        min-width: 6.11rem;
        background:rgba(255,255,255,1);
    }
    .menu-hidden{
        border-right: 0.22rem solid rgba(255,255,255,1);
        background:#fff;
        font-size:0.39rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(60,68,86,1);
        line-height:1.39rem;
        text-align: left;
        display: inline-block;
        width: 100%;
        text-decoration:none;
        box-sizing: border-box;
    }
    .menu-hidden img{
        display: inline-block;
        margin:0 .5rem 0 1rem;
        vertical-align: middle;
        width: 25px;
        height: 25px;
    }
    .menu-hidden .ims{
        display: inline-block;
        margin:0 .5rem 0 1rem;
        vertical-align: middle;
        width: 25px;
        height: 25px;
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
    .img{
        border: 0;
    }
</style>
