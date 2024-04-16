<script setup>
import { ref } from 'vue';

const menu = ref();
const items = ref([
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'Viewer' },
    { id: 3, name: 'Liam', role: 'Editor' }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};

const selectedItem = ref(null);
const handleMenuItemClick = (item) => {
    console.log(item.role);
    selectedItem.value = item;
    console.log(`Selected item: ${selectedItem.value.name}`);
};
</script>

<template>
    <div class="flex justify-content-center">
        <button @click="toggle" aria-haspopup="true" aria-controls="dropdown-menu" class="p-link layout-topbar-button">
            <i class="pi pi-user"></i>
            <span class="inline-flex flex-column pl-3 pt-2">
                <span v-if="selectedItem" class="font-bold">{{ selectedItem.name }}</span>
                <span v-else class="font-bold">{{ items[0].name }}</span>
                <span v-if="selectedItem" class="text-sm">{{ selectedItem.role }}</span>
                <span v-else class="text-sm">{{ items[0].role }}</span>
            </span>
        </button>
        <Menu ref="menu" id="dropdown-menu" :model="items" :popup="true">
            <template #item="{ item, props }">
                <a v-ripple :key="item.id" @click="handleMenuItemClick(item)" v-bind="props.action">
                    <i class="pi pi-user"></i>
                    <span class="ml-2">{{ item.name }}</span>
                    <span class="ml-2">({{ item.role }})</span>
                </a>
            </template>
        </Menu>
    </div>
</template>

<style scoped></style>
