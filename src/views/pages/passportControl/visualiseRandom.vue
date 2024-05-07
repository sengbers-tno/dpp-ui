<script setup>
import Timeline from '@/components/Timeline.vue';
import LifecycleAssessment from '@/components/LifecycleAssessment.vue';
import MaterialComposition from '@/components/MaterialComposition.vue';
</script>

<template>
    <TabView>
        <TabPanel header="Supply Chain">
            <div>
                <Timeline></Timeline>
            </div>
        </TabPanel>
        <TabPanel header="Lifecycle Assessment">
            <div>
                <LifecycleAssessment></LifecycleAssessment>
            </div>
        </TabPanel>
        <TabPanel header="Material Composition">
            <div>
                <MaterialComposition></MaterialComposition>
            </div>
        </TabPanel>
    </TabView>
</template>

<style lang="scss" scoped>
.tab-panel {
    padding-left: 15px;
}
</style>
