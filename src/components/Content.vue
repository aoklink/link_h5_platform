<template>
    <div class="container">
        <div class="menu">
            ss
        </div>
        <div class="content">
            <div class="tab-content">
                <el-tabs v-model="tabIdSelected" type="border-card"
                         @tab-remove="removeTab"
                >
                    <el-tab-pane name="fixedtab">
                        <span slot="label"> 固定的tab</span>
                        <management @addTab="addTab" />
                    </el-tab-pane>
                    <el-tab-pane v-for="(item) in gymInfoListSelected" :key="item.id" :label="item.name"
                                 closable
                                 :name="item.id+''"
                    >
                        <store-info :store-data="item.storeInfo" />
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import Management from './Management.vue';
import StoreInfo from './StoreInfo.vue';
import {mapState} from 'vuex';
import {REMOVE_ITEM_FROM_GYM_INFO_LIST_SELECTED} from '../store/mutation_type';

export default {
    components: {
        Management,
        StoreInfo
    },
    data () {
        return {
            tabIdSelected: 'fixedtab'
        };
    },
    computed: {
        ...mapState(['gymInfoListSelected'])
    },
    methods: {
        addTab (id) {
            this.tabIdSelected = id + '';
        },
        removeTab (targetId) {
            let tabs = this.gymInfoListSelected;
            let activeId = this.tabIdSelected;
            if (activeId == targetId) {
                tabs.forEach((tab, index) => {
                    if (tab.name == targetId) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeId = nextTab.name;
                        }
                    }
                });
            }
            this.tabIdSelected = activeId + '';
            this.$store.commit(REMOVE_ITEM_FROM_GYM_INFO_LIST_SELECTED, targetId);
            if (this.gymInfoListSelected.length == 0) {
                this.tabIdSelected = 'fixedtab';
            }
        }
    }
};
</script>

<style>
    .container{
        display: flex;
        flex-direction: row;
        flex:1;
        height: 100%;
    }
    .menu{
        width: 6.11rem;
        min-width: 6.11rem;
        background:rgba(255,255,255,1);
    }
    .content{
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 1rem;
        font-size: 14px;
        text-align: left;
    }
    .tab-content{
        display: flex;
        flex: 1;
        background:rgba(255,255,255,1);
        border-radius:0.11rem;
        border:0.01rem solid rgba(198,204,220,1);
    }
    .tab-content .el-tabs{
        width: 100%;
    }
</style>
