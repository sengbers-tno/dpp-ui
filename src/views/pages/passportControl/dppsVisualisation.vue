<script setup>
import Card from 'primevue/card';

import Timeline from '@/components/Timeline.vue';
import LifecycleAssessment from '@/components/LifecycleAssessment.vue';
import MaterialComposition from '@/components/MaterialComposition.vue';
import AttachmentsTable from '@/components/AttachmentsTable.vue';
import { useDppStore } from '@/store/dpp.js';

import dppData from '@/models/templates.json';

import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const uuidValue = ref(null);
const store = useDppStore();
const loading = ref(false);
const jsonDisplayData = ref();
const route = useRoute();
const router = useRouter();
const uuid = ref();
const inputPlaceholder = ref('');
const treeTableDataList = ref();

const timelineData = ref();
const attachmentData = ref();

onMounted(() => {
    getUrlQueryParams().then(() => {
        // For now the code below is commented because the backend is not working yet.
        // if (uuid.value) {
        //     inputPlaceholder.value = uuid.value;
        //     fetchDppData('03556607-ef11-4c8d-b28f-4b4e65f011fb');
        //     uuidValue.value = uuid.value;
        // }
        loading.value = true;
        var data = JSON.parse(JSON.stringify(dppData));
        jsonDisplayData.value = data;
        var treeTableData = convertJsonToCustomFormat(data);
        treeTableDataList.value = treeTableData;
        loading.value = false;
    });
});

const getUrlQueryParams = async () => {
    //router is async so we wait for it to be ready
    await router.isReady();
    //once its ready we can access the query params
    uuid.value = route.params['uuid'];
};

async function fetchDppData(uuid) {
    try {
        await store.getDppFull(uuid).then((response) => {
            loading.value = true;
            var data = JSON.parse(JSON.stringify(response));
            var result = convertJsonToCustomFormat(data);
            jsonDisplayData.value = data;
            treeTableDataList.value = result;
            loading.value = false;
        });
    } catch (error) {
        console.log(error);
    }
}

const randomDpp = () => {
    console.log('Clicked random dpp');
};

const latestDpp = () => {
    console.log('Clicked latest dpp');
};

const confirmDpp = () => {
    console.log('Clicked confirm dpp');
    console.log(`Value ${uuidValue.value}`);
};

const onClickId = (item) => {
    jsonDisplayData.value = item.data.json;

    // Pass through the json data to the timeline component
    timelineData.value = item.data.json;

    // fill attachmentData reference
    attachmentData.value = item.data.json;
};

const convertJsonToCustomFormat = (jsonData) => {
    // For now only picking the first one, should be changed in the future.
    var key = Object.keys(jsonData)[0];
    const desiredJsonValue = jsonData[key];
    const result = [];

    function processNode(node, passportName, parentName, json) {
        var idMatch = node.id.match(/[^:]+$/);
        var idValue = idMatch ? idMatch[0] : null;

        var match = node.id.match(/manufacturer:([^:]+)/);
        var manufacturerValue = match ? match[1] : null;

        const customNode = {
            key: passportName + ':parent:' + parentName + ':' + node.id,
            data: {
                id: idValue,
                title: node.title,
                manufacturer: manufacturerValue,
                json: json
            }
        };

        if (!parentName) {
            parentName = passportName;
        }

        if (node.subpassports && node.subpassports.length > 0) {
            customNode.children = node.subpassports
                .map((childNode) => {
                    var passportNameChild = Object.keys(childNode)[0];
                    var childValue = childNode[passportNameChild];
                    if (childNode) {
                        return processNode(childValue, passportNameChild, passportName, childNode);
                    }
                    return null; // Handle missing child nodes gracefully
                })
                .filter(Boolean);
        }
        return customNode;
    }

    result.push(processNode(desiredJsonValue, key, null, jsonData));
    return result;
};
</script>

<template>
    <Card>
        <template #content>
            <div class="pb-3">
                <Panel header="Get Product Digital Passport" toggleable>
                    <div class="container flex align-content-center">
                        <div class="flex align-content-center">
                            <div class="flex flex-column gap-2 pr-2">
                                <label for="productUuid">Product Uuid</label>
                                <InputText id="productUuid" v-model="uuidValue" :placeholder="inputPlaceholder" aria-describedby="productUuid-help" />
                                <small id="productUuid-help">Enter the uuid of the product</small>
                            </div>
                            <div class="button-style">
                                <Button title="Confirm Dpp id" class="" label="Confirm" @click="confirmDpp" />
                            </div>
                        </div>
                        <div class="flex align-content-center">
                            <div class="button-style">
                                <Button title="Random Dpp" label="Random dpp" @click="randomDpp" />
                            </div>
                            <div class="button-style">
                                <Button title="Latest Dpp" label="Latest dpp" @click="latestDpp" />
                            </div>
                        </div>
                    </div>
                </Panel>
            </div>
            <div class="pb-3">
                <Panel header="Product Hierarchy" toggleable>
                    <TreeTable :value="treeTableDataList" :paginator="true" :rows="10" :loading="loading" :resizableColumns="true" dataKey="id">
                        <Column field="title" header="Type" expander class="column">
                            <template #body="slotProps">
                                <button class="button" @click="onClickId(slotProps.node)">
                                    <span>{{ slotProps.node.data.title }}</span>
                                </button>
                            </template>
                        </Column>
                        <Column field="id" header="ID"></Column>
                        <Column field="manufacturer" header="Owner"></Column>
                    </TreeTable>
                </Panel>
            </div>
            <div class=""></div>
            <Panel header="Graphs" toggleable>
                <TabView>
                    <TabPanel header="Supply Chain">
                        <div>
                            <Timeline :timelineEvents="timelineData"></Timeline>
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
                    <TabPanel header="Credentials">
                        <div></div>
                    </TabPanel>
                    <TabPanel header="Attachments">
                        <AttachmentsTable :attachmentEvents="attachmentData"></AttachmentsTable>
                    </TabPanel>
                    <TabPanel header="JSON data">
                        <div>
                            <pre>{{ jsonDisplayData }}</pre>
                        </div>
                    </TabPanel>
                </TabView>
            </Panel>
        </template>
    </Card>
</template>

<style lang="scss" scoped>
.tab-panel {
    padding-left: 15px;
}

.button-style {
    padding-top: 1.7rem;
    padding-right: 1.3rem;
}

.container {
    flex-wrap: wrap;
}

pre {
    white-space: pre-wrap;
    word-wrap: break-word;
    text-align: justify;
}

:deep(.button) {
    background-color: #18181b;
    border-width: 0;
    cursor: pointer;
    font-family: 'Inter var', sans-serif;
    font-size: 1rem;
}

:deep(.p-treetable .p-treetable-tbody) {
    .column {
        display: flex;
        text-align: left;
        padding: 1rem;
    }
}
</style>
