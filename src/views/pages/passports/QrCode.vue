// This page is for testing the QR code endpoint



<script setup>

import { ref } from 'vue'
import { useDppStore } from '@/store/dpp.js';


import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const uuidValue = ref(null);
const toast = useToast();
const store = useDppStore();
const router = useRouter();

const imageBytes = ref(null)
const loading = ref(false);

const clearUuid = () => {
    uuidValue.value = '';
};


const confirmDpp = async () => {
 
    if (uuidValue.value == undefined || uuidValue.value == '') {
        router.replace({ path: '/dpps/qrcode' });
        toast.add({ severity: 'error', summary: 'UUID not valid or empty', detail: 'Message Content', life: 3150 });
    } else {
        try {
            loading.value = true
            await retrieveDPPQRCode(uuidValue.value)
        } catch {
            toast.add({ severity: 'error', summary: 'Try again with valid UUID.', detail: 'Message Content', life: 3150 });
        }
    }
};

const retrieveDPPQRCode = async (uuid) => {
    try {
        var data = await store.getDppQRCode(uuid);       
    } catch (error) {
        toast.add({ severity: 'error', summary: 'DPP with UUID not valid or not found at server', detail: 'Message Content', life: 3150 });
        throw error;
    }
    imageBytes.value = data.img_string;
    loading.value.false

}
</script>

<template>
    <Toast />
    <Card>
        <template #content>
            <h3>Create QR Code for Digital Product Passport</h3>
            <div>
                <div class="field col-12 md:col-9">
                    <label for="productUuid">Product UUID</label>
                    <InputGroup>
                        <InputText id="productUuid" v-model="uuidValue" type="text" placeholder="Enter Product UUID" />
                        <Button title="confirm dpp" icon="pi pi-search" @click="confirmDpp" />
                        <Button title="clear uuid" icon="pi pi-times" class="p-button-danger" @click="clearUuid" />
                    </InputGroup>
                </div>
                <div class="center" v-if="imageBytes">
                     <img :src="imageBytes"/> 
                </div>
            </div>

        </template>
    </Card>

</template>

<style lang="scss">
.center {
    display: flex;
    justify-content: center;
}
</style>