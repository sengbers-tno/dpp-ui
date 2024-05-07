<script setup>
import Card from 'primevue/card';

import Timeline from '@/components/Timeline.vue';
import LifecycleAssessment from '@/components/LifecycleAssessment.vue';
import MaterialComposition from '@/components/MaterialComposition.vue';
import { useDppStore } from '@/store/dpp.js';

import dppData from '@/models/templates.json';

import { ref, onMounted } from 'vue';

const value = ref(null);
const store = useDppStore();
const nodes = ref();
const loading = ref(false);
const jsonDisplayData = ref();

onMounted(() => {
    //fetchDppData();
    loading.value = true;
    var data = JSON.parse(JSON.stringify(dppData));
    jsonDisplayData.value = data;
    var test = convertJsonToCustomFormat(data);
    nodes.value = test;
    loading.value = false;
});

async function fetchDppData() {
    try {
        await store.getDppFull('03556607-ef11-4c8d-b28f-4b4e65f011fb').then((response) => {
            loading.value = true;
            var data = JSON.parse(JSON.stringify(response));
            var result = convertJsonToCustomFormat(data);
            nodes.value = result;
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
    console.log(`Value ${value.value}`);
};

const onClickId = (event) => {
    console.log(event);
};

function convertJsonToCustomFormat(jsonData) {
    // For now only picking the first one, should be changed in the future.
    var key = Object.keys(jsonData)[0];
    const desiredJsonValue = jsonData[key];
    const result = [];

    function processNode(node) {
        var idMatch = node.id.match(/[^:]+$/);
        var idValue = idMatch ? idMatch[0] : null;

        var match = node.id.match(/manufacturer:([^:]+)/);
        var manufacturerValue = match ? match[1] : null;

        const customNode = {
            key: node.id,
            data: {
                id: idValue,
                title: node.title,
                manufacturer: manufacturerValue
            }
        };

        if (node.subpassports && node.subpassports.length > 0) {
            customNode.children = node.subpassports
                .map((childNode) => {
                    const value = childNode[Object.keys(childNode)[0]];
                    if (childNode) {
                        return processNode(value);
                    }
                    return null; // Handle missing child nodes gracefully
                })
                .filter(Boolean);
        }
        return customNode;
    }

    result.push(processNode(desiredJsonValue));
    return result;
}
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
                                <InputText id="productUuid" v-model="value" aria-describedby="productUuid-help" />
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
                    <TreeTable :value="nodes" :paginator="true" :rows="10" :loading="loading" :resizableColumns="true" dataKey="id">
                        <Column field="id" header="Id" expander>
                            <template #body="slotProps">
                                <div @click="onClickId(slotProps.node)" style="cursor: pointer">
                                    {{ slotProps.node.data.id }}
                                </div>
                            </template>
                        </Column>
                        <Column field="title" header="Type"></Column>
                        <Column field="manufacturer" header="Owner"></Column>
                    </TreeTable>
                </Panel>
            </div>
            <div class=""></div>
            <Panel header="Graphs" toggleable>
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
                    <TabPanel header="Credentials">
                        <div></div>
                    </TabPanel>
                    <TabPanel header="Attachments">
                        <div></div>
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
</style>
