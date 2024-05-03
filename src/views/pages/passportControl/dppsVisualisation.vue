<!-- <template>
    <div className="card">
        <h5>To Do</h5>
        <p></p>
        <p>Additional tab -> Raw json</p>
    </div>
</template> -->

<script setup>
import Card from 'primevue/card'


import TreeTable from 'primevue/treetable';
import Column from 'primevue/column';

import TabOne from '@/components/TabOne.vue';
import TabTwo from '@/components/TabTwo.vue';
import TabThree from '@/components/TabThree.vue';
</script>


<template>

    <Card>
    <template #content>
        <TabView>
            <TabPanel header="Supply Chain">
                <div>
                    <TabOne></TabOne>
                </div>
            </TabPanel>
            <TabPanel header="Lifecycle Assessment">
                <div>
                    <TabTwo></TabTwo>
                </div>
            </TabPanel>
            <TabPanel header="Material Composition">
                <div>
                    <TabThree></TabThree>
                </div>
            </TabPanel>
        </TabView>
    </template>
    </Card>

        
        
</template>

<style lang="scss" scoped>
.tab-panel {
    padding-left: 15px;
}
</style>
