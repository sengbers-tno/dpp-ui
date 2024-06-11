<script setup>
    import { ref, toRefs, watch, computed } from 'vue';

    const props = defineProps({
        timelineEvents: Object
    });

    const timelineEvents = toRefs(props);
    const events = ref([]);
    const showTimeline = ref(true);
    const timeLineKey = ref('');
    const columnHasBeenClicked = ref(false);

    // const options = ref([
    //     { name: 'Activity', value: 'activity' },
    //     { name: 'Ownership', value: 'ownership' }
    // ]);
    // const selectedEventTypes = ref(['activity', 'ownership']);
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
        // Determine the date field to use
        const date = event['prov:endedAtTime'] ? event['prov:endedAtTime']['@value'] : event['prov:atTime'] ? event['prov:atTime']['@value'] : null;

        // Determine the color based on the event type
        const color = event['@type'].startsWith('dpp:') ? '#ADD8E6' : event['@type'].startsWith('aitef:') ? '#FFDAB9' : '#90EE90'; // pastel blue for dpp, pastel orange for aitef, pastel green otherwise

        // Determine the icon based on the event type
        let icon;
        if (event['@type'].startsWith('dpp:')) {
            switch (event['@type']) {
                case 'dpp:CreationEvent':
                    icon = 'pi pi-plus';
                    break;
                case 'dpp:TransferEvent':
                    icon = 'pi pi-truck';
                    break;
                case 'dpp:DestructionEvent':
                    icon = 'pi pi-trash';
                    break;
                default:
                    icon = 'pi pi-cog';
            }
        } else {
            const typeSuffix = event['@type'].split(':').pop();
            switch (typeSuffix) {
                case 'BatchReceivingEvent':
                    icon = 'pi pi-inbox';
                    break;
                case 'ShippingEvent':
                    icon = 'pi pi-truck';
                    break;
                case 'ManufacturingEvent':
                    icon = 'pi pi-cog';
                    break;
                default:
                    icon = 'pi pi-cog';
            }
        }
        // let tag = '';
        // let content = '';
        // if (event['prov:description']) {
        //     const [typePart, ...contentParts] = event['prov:description'].split(':');
        //     tag = typePart;
        //     content = contentParts.join(':').trim();
        // }
        const eventTypeParts = event['@type'].split(':');
        let tag = eventTypeParts[0];
        let statusValue = eventTypeParts[1];
        // const statusValue = eventTypeParts.slice(1).join(':');
        // const status = `<Tag severity="info" value="${tagValue}"></Tag>: ${statusValue}`;

        // return {
        //     status: event['@type'],
        //     // status: status,
        //     date: date,
        //     icon: icon,
        //     color: color,
        //     content: event['prov:description'] ?? '',
        //     id: event['@id']
        // };
        return {
            status: statusValue,
            date: date,
            icon: icon,
            color: color,
            content: event['prov:description'] ?? '',
            tag: tag,
            id: event['@id']
        };
        // return {
        //     status: event['@type'],
        //     date: date,
        //     icon: icon,
        //     color: color,
        //     content: content,
        //     tag: tag,
        //     id: event['@id']
        // };
    };

    const loopthroughPassports = (jsonValue) => {
        console.log(jsonValue);
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

    // const determineAddingSubpassportEvents = (jsonValue) => {
    //     if (checked.value && jsonValue.subpassports && jsonValue.subpassports.length > 0) {
    //         jsonValue.subpassports.forEach((subpassport) => {
    //             var subpassportKey = Object.keys(subpassport)[0];
    //             const desiredJson = subpassport[subpassportKey];
    //             loopthroughPassports(desiredJson);
    //         });
    //     }

    //     events.value = uniqueEventObjects.value;
    // };

    // watch(checked, (checkValue) => {
    //     // if the tEvent data is not empty.
    //     if (columnHasBeenClicked.value) {
    //         var json = timelineEvents.timelineEvents.value;
    //         var key = Object.keys(json)[0];
    //         var desiredJsonValue = json[key];
    //         if (checkValue) {
    //             // call loopthroughsubpassports
    //             determineAddingSubpassportEvents(desiredJsonValue);
    //         } else {
    //             // call loopthroughpassports
    //             events.value = [];
    //             loopthroughPassports(desiredJsonValue);
    //         }
    //     }
    // });

    watch(timelineEvents.timelineEvents, (json) => {
        console.log(json);
        // temp fix with variable
        columnHasBeenClicked.value = true;
        events.value = [];
        var key = Object.keys(json)[0];
        const desiredJsonValue = json[key];

        loopthroughPassports(desiredJsonValue);

        // if (checked.value) {
        //     determineAddingSubpassportEvents(desiredJsonValue);
        // }

        timeLineKey.value = key;
        // showTimeline.value = events.value.length > 0;
    });
</script>

<template>
    <div>
        <!-- <div v-show="showTimeline" class="container justify-content-center">
            <div class="flex justify-content-center">
                <SelectButton v-model="selectedEventTypes" :options="options" optionLabel="name" multiple aria-labelledby="multiple" />
            </div>
        </div> -->
        <div>
            <Timeline :value="events" align="alternate" class="customized-timeline">
                <template #marker="slotProps">
                    <span class="bullet" :style="{ backgroundColor: slotProps.item.color, color: 'black' }">
                        <i :class="slotProps.item.icon"></i>
                    </span>
                </template>
                <template #content="slotProps">
                    <Card class="mt-3">
                        <template #title>
                            <Tag :value="slotProps.item.tag" :style="{ backgroundColor: slotProps.item.color, color: 'black' }"></Tag>
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
        // justify-content: space-between;
    }

    // @media screen and (max-width: 960px) {
    //     ::v-deep(.customized-timeline) {
    //         .p-timeline-event:nth-child(even) {
    //             flex-direction: row;

    //             .p-timeline-event-content {
    //                 text-align: left;
    //             }
    //         }

    //         .p-timeline-event-opposite {
    //             flex: 0;
    //         }

    //         .p-card {
    //             margin-top: 1rem;
    //         }
    //     }
    // }
</style>
