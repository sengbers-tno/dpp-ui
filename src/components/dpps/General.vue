<script setup>
    import { ref, toRefs, watch, computed } from 'vue';
    import { onMounted } from 'vue';
    // import { Panel } from 'primevue/panel';

    const props = defineProps({
        generalData: Object
    });

    const localGeneralData = ref();

    const generalData = toRefs(props);
    watch(generalData.generalData, (newVal) => {
        console.log('General Data Loaded:', newVal);
        localGeneralData.value = newVal.value;
    });

    const manufacturer = computed(() => localGeneralData.value?.manufacturer || {});
    const instantiatedFrom = computed(() => localGeneralData.value?.instantiated_from || {});
    const currentOwner = computed(() => localGeneralData.value?.current_owner || {});
    const knownPastOwners = computed(() => localGeneralData.value?.known_past_owners || []);
    const economicOperator = computed(() => localGeneralData.value?.economic_operator || []);
    const tags = computed(() => localGeneralData.value?.tags || []);

    onMounted(() => {
        console.log('General Data in Component (mounted):', props.generalData);
    });
</script>

<template>
    <div v-if="localGeneralData">
        <Panel header="Product Information">
            <div>
                <h4>{{ localGeneralData.title }}</h4>
                <p><strong>ID:</strong> {{ localGeneralData.id }}</p>
                <p><strong>Registration ID:</strong> {{ localGeneralData.registration_id }}</p>
                <p><strong>Creation Timestamp:</strong> {{ new Date(localGeneralData.creation_timestamp).toLocaleString() }}</p>
            </div>
        </Panel>

        <Panel header="Template Information">
            <div>
                <p><strong>Template ID:</strong> {{ instantiatedFrom.template_id }}</p>
                <p><strong>Version:</strong> {{ instantiatedFrom.version }}</p>
            </div>
        </Panel>

        <Panel header="Manufacturer Information">
            <div>
                <p><strong>Name:</strong> {{ manufacturer.name }}</p>
                <p><strong>Full Name:</strong> {{ manufacturer.full_name }}</p>
                <p><strong>Facility:</strong> {{ manufacturer.facility.map((f) => f.name).join(', ') }}</p>
                <p><strong>Batch ID:</strong> {{ manufacturer.batch_id }}</p>
            </div>
        </Panel>

        <Panel header="Economic Operator">
            <div>
                <p v-for="operator in economicOperator" :key="operator.id">
                    <strong>{{ operator.name }}:</strong><br />
                    <span>{{ operator.full_name }}</span
                    ><br />
                    <span>Repository Address: {{ operator.repository_address.map((ra) => ra.hostname).join(', ') }}</span>
                    <br /><br />
                </p>
            </div>
        </Panel>

        <Panel header="Current Owner">
            <div>
                <p><strong>Name:</strong> {{ currentOwner.name }}</p>
                <p><strong>Full Name:</strong> {{ currentOwner.full_name }}</p>
                <p><strong>Facility:</strong> {{ currentOwner.facility.map((f) => f.name).join(', ') }}</p>
            </div>
        </Panel>

        <Panel header="Known Past Owners">
            <div>
                <div v-for="owner in knownPastOwners" :key="owner.id">
                    <p>
                        <strong>{{ owner.name }}:</strong> {{ owner.full_name }}
                    </p>
                    <p><strong>Facility:</strong> {{ owner.facility.map((f) => f.name).join(', ') }}</p>
                    <br />
                </div>
            </div>
        </Panel>

        <Panel header="Tags">
            <div>
                <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
        </Panel>
    </div>
</template>

<style scoped>
    .tag {
        display: inline-block;
        background: #e0e0e0;
        color: #333;
        padding: 0.25em 0.5em;
        margin: 0.25em;
        border-radius: 4px;
    }
</style>
<!-- <ScrollPanel style="height: 200px">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
        aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
        voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
    </p>
    <p>
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia
        deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
    </p>
    <p class="m-0">
        Quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non
        recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat
    </p>
</ScrollPanel> -->
