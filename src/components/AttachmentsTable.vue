<script setup>
import { ref, defineProps, watch, toRefs } from 'vue';

const props = defineProps({
    attachmentEvents: Object
});

const attachmentEvents = toRefs(props);
const attachmentsList = ref([]);

const imageDialogVisible = ref(false);

const showFileDialog = (fileName) => {
    imageDialogVisible.value = { visible: true, file_name: fileName };
};

const imageLoadError = () => {
    console.log('Image failed to load');
};

const doesFileExists = (fileName) => {
    var imagesFolder = import.meta.glob('../assets/images/*.{png,svg}');
    for (const path in imagesFolder) {
        const lastSpaceIndex = fileName.lastIndexOf(' '); // Find the index of the last space
        var cleanFilename = fileName;
        if (lastSpaceIndex !== -1) {
            cleanFilename = fileName.slice(lastSpaceIndex + 1);
        }
        if (path.includes(cleanFilename)) {
            var originalName = path.match(/images\/(.*)/)[1];
            return { exists: true, name: originalName };
        }
    }

    return { exists: false, name: fileName };
};

const getImageUrl = (name) => {
    if (name.includes('png')) {
        var fileExists = doesFileExists(name);
        return fileExists.exists ? new URL(`../assets/images/${fileExists.name}`, import.meta.url).href : '';
    } else {
        return new URL(`../assets/images/PDF_file_icon.svg`, import.meta.url).href;
    }
};

watch(attachmentEvents.attachmentEvents, (json) => {
    attachmentsList.value = [];
    var key = Object.keys(json)[0];
    const desiredJsonValue = json[key];
    desiredJsonValue.attachments.forEach((element) => {
        // Slice the id only to display number.
        var sourceIdMatch = element.source_id.match(/[^:]+$/);
        var sourceIdValue = sourceIdMatch ? sourceIdMatch[0] : null;

        var row = {
            id: element.attachment_id,
            type: element.type,
            source: element.source,
            source_id: sourceIdValue,
            description: element.description,
            file_name: element.file_name
        };

        attachmentsList.value.push(row);
    });
});
</script>

<template>
    <div class="card">
        <DataTable :value="attachmentsList" tableStyle="min-width: 50rem">
            <Column field="description" header="Name"></Column>
            <Column field="id" header="Id"></Column>
            <Column field="type" header="Category"></Column>
            <Column field="source" header="Source"></Column>
            <Column field="source_id" header="Source Id"></Column>
            <Column header="File">
                <template #body="slotProps">
                    <img :src="getImageUrl(`${slotProps.data.file_name}`)" :alt="slotProps.data.file_name" class="w-6rem border-round" @click="showFileDialog(slotProps.data.file_name)" @error="imageLoadError" />
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="imageDialogVisible.visible" modal>
            <Image :src="getImageUrl(`${imageDialogVisible.file_name}`)" alt="Full-size Image" />
        </Dialog>
    </div>
</template>
