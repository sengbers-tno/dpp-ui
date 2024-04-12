<script setup>
import TabOne from '@/components/TabOne.vue';
import TabTwo from '@/components/TabTwo.vue';
import TabThree from '@/components/TabThree.vue';
</script>

<template>
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

<style lang="scss" scoped>
.tab-panel {
    padding-left: 15px;
}
</style>
