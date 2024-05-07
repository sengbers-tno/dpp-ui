<script setup>
import { ref } from 'vue';

const events = ref([
    {
        status: 'Supplier',
        date: '15/10/2020 10:30',
        icon: 'pi pi-shopping-cart',
        color: '#9C27B0',
        content: 'Supplier A provides raw materials for manufacturing.'
    },
    {
        status: 'Manufacturer',
        date: '15/10/2020 14:00',
        icon: 'pi pi-cog',
        color: '#673AB7',
        content: 'The manufacturer produces the t-shirts.'
    },
    {
        status: 'Distributor',
        date: '15/10/2020 16:15',
        icon: 'pi pi-shopping-cart',
        color: '#FF9800',
        content: 'The distributor handles the logistics and distribution of the t-shirts.'
    },
    {
        status: 'Retailer',
        date: '16/10/2020 10:00',
        icon: 'pi pi-check',
        color: '#607D8B',
        content: 'The retailer sells the t-shirts to consumers.'
    }
]);
</script>

<template>
    <div>
        <h3>T-Shirt Supply Chain Timeline</h3>
        <div class="">
            <Timeline :value="events" align="alternate" class="customized-timeline">
                <template #marker="slotProps">
                    <span class="bullet" :style="{ backgroundColor: slotProps.item.color }">
                        <i :class="slotProps.item.icon"></i>
                    </span>
                </template>
                <template #content="slotProps">
                    <Card class="mt-3">
                        <template #title>
                            {{ slotProps.item.status }}
                        </template>
                        <template #subtitle>
                            {{ slotProps.item.date }}
                        </template>
                        <template #content>
                            <p class="m-0">
                                {{ slotProps.item.content }}
                            </p>
                        </template>
                    </Card>
                </template>
            </Timeline>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bullet {
    width: 2rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 2rem;
    border-radius: 50%;
}

@media screen and (max-width: 960px) {
    ::v-deep(.customized-timeline) {
        .p-timeline-event:nth-child(even) {
            flex-direction: row;

            .p-timeline-event-content {
                text-align: left;
            }
        }

        .p-timeline-event-opposite {
            flex: 0;
        }

        .p-card {
            margin-top: 1rem;
        }
    }
}
</style>
