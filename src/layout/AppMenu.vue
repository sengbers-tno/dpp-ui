<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Template Control',
        items: [
            { label: 'Template List', icon: 'pi pi-fw pi-home', to: '/templateControl/templateList' },
            { label: 'Template Creation', icon: 'pi pi-fw pi-home', to: '/templateControl/templateCreation' }
        ]
    },
    {
        label: 'Event Control',
        items: [
            { label: 'Event Lifecycle List', icon: 'pi pi-fw pi-id-card', to: '/eventControl/eventLifecycleList' },
            { label: 'Add Event Type', icon: 'pi pi-fw pi-check-square', to: '/eventControl/addEventType' }
        ]
    },
    {
        label: 'Passport Control',
        items: [
            { label: 'Aggregate Statistics', icon: 'pi pi-fw pi-eye', to: '/passportControl/aggregateStatistics' },
            { label: 'Visualise Random', icon: 'pi pi-fw pi-globe', to: '/passportControl/visualiseRandom' }
        ]
    },
    {
        label: 'Credential Control',
        items: [{ label: 'List', icon: 'pi pi-fw pi-prime', to: '/credentialControl/list' }]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
