<script setup>
import { ref, defineProps, toRefs, watch } from 'vue';

const props = defineProps({
    timelineEvents: Object
});

const tEvents = toRefs(props);
const events = ref([]);
const showTimeline = ref(true);

watch(tEvents.timelineEvents, (json) => {
    events.value = [];
    var key = Object.keys(json)[0];
    const desiredJsonValue = json[key];

    const processEvent = (event) => {
        return {
            status: event['@type'],
            date: event['prov:atTime']['@value'],
            icon: 'pi pi-cog',
            color: '#9C27B0',
            content: event['@type']
        };
    };

    if (desiredJsonValue.events.ownership) {
        desiredJsonValue.events.ownership.forEach((ownershipEvent) => {
            events.value.push(processEvent(ownershipEvent));
        });
    }

    if (desiredJsonValue.events.activity) {
        desiredJsonValue.events.activity.forEach((activityEvent) => {
            events.value.push(processEvent(activityEvent));
        });
    }

    showTimeline.value = events.value.length > 0;
});
</script>

<template>
    <div>
        <h3>Supply Chain Timeline</h3>
        <div v-show="showTimeline">
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
        <div v-show="!showTimeline">
            <span>There are no event available for this passport</span>
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
