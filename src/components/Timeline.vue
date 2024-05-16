<script setup>
import { ref, defineProps, toRefs, watch, computed } from 'vue';

const props = defineProps({
    timelineEvents: Object
});

const tEvents = toRefs(props);
const events = ref([]);
const showTimeline = ref(true);
const checked = ref(false);
const timeLineKey = ref('');
const columnHasBeenClicked = ref(false);

const uniqueEventObjects = computed(() => {
    const seenIds = new Set();
    return events.value.filter((obj) => {
        if (!seenIds.has(obj.id)) {
            seenIds.add(obj.id);
            return true;
        }
        return false;
    });
});

const processEvent = (event) => {
    return {
        status: event['@type'],
        date: event['prov:endedAtTime']['@value'],
        icon: 'pi pi-cog',
        color: '#9C27B0',
        content: event['prov:description'] ?? '',
        id: event['@id']
    };
};

const loopthroughPassports = (jsonValue) => {
    if (jsonValue.events.ownership) {
        jsonValue.events.ownership.forEach((ownershipEvent) => {
            events.value.push(processEvent(ownershipEvent));
        });
    }

    if (jsonValue.events.activity) {
        jsonValue.events.activity.forEach((activityEvent) => {
            events.value.push(processEvent(activityEvent));
        });
    }

    events.value = uniqueEventObjects.value;
};

const determineAddingSubpassportEvents = (jsonValue) => {
    if (checked.value && jsonValue.subpassports && jsonValue.subpassports.length > 0) {
        jsonValue.subpassports.forEach((subpassport) => {
            var subpassportKey = Object.keys(subpassport)[0];
            const desiredJson = subpassport[subpassportKey];
            loopthroughPassports(desiredJson);
        });
    }

    events.value = uniqueEventObjects.value;
};

watch(checked, (checkValue) => {
    // if the tEvent data is not empty.
    if (columnHasBeenClicked.value) {
        var json = tEvents.timelineEvents.value;
        var key = Object.keys(json)[0];
        var desiredJsonValue = json[key];
        if (checkValue) {
            // call loopthroughsubpassports
            determineAddingSubpassportEvents(desiredJsonValue);
        } else {
            // call loopthroughpassports
            events.value = [];
            loopthroughPassports(desiredJsonValue);
        }
    }
});

watch(tEvents.timelineEvents, (json) => {
    // temp fix with variable
    columnHasBeenClicked.value = true;

    var key = Object.keys(json)[0];
    const desiredJsonValue = json[key];

    loopthroughPassports(desiredJsonValue);

    if (checked.value) {
        determineAddingSubpassportEvents(desiredJsonValue);
    }

    timeLineKey.value = key;
    showTimeline.value = events.value.length > 0;
});
</script>

<template>
    <div>
        <div class="container">
            <span style="font-size: 15pt"> {{ timeLineKey }} Timeline</span>
            <div class="flex">
                <span class="pr-1">Show all passport events</span>
                <InputSwitch v-model="checked" />
            </div>
        </div>
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

.container {
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
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
