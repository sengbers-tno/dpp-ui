<!-- <template>
    <div className="card">
        <h5>Empty Page</h5>
        <p>Use this page to start from scratch and place your custom content.</p>
        <p>Passport control -> Aggregate statistics</p>
    </div>
</template> -->
<script setup>
    import { useDppStore } from '@/store/dpp.js';

    import { onMounted, ref } from 'vue';
    // import { Chart } from 'primevue/chart';
    import Card from 'primevue/card';
    // import store from './store'; // Adjust the import to match your actual store location
    const store = useDppStore();
    import 'chart.js/auto';
    const passportsByBatchChartData = ref({});
    const passportsByTagChartData = ref({});
    const passportsByTypeChartData = ref({});
    const eventsByTypeChartData = ref({});
    const passportsCreatedAllTime = ref(0);
    const eventsAllTime = ref(0);
    const metadata = ref();

    onMounted(async () => {
        metadata.value = await store.getMetadata();
        console.log(metadata.value);
        passportsByBatchChartData.value = {
            labels: Object.keys(metadata.value.passport.passports_by_batch),
            datasets: [
                {
                    label: 'Number of Passports',
                    data: Object.values(metadata.value.passport.passports_by_batch),
                    backgroundColor: '#42A5F5'
                }
            ]
        };

        passportsByTagChartData.value = {
            labels: Object.keys(metadata.value.passport.passports_by_tag),
            datasets: [
                {
                    data: Object.values(metadata.value.passport.passports_by_tag),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#C70039', '#900C3F', '#581845']
                }
            ]
        };

        passportsByTypeChartData.value = {
            labels: Object.keys(metadata.value.passport.passports_by_type),
            datasets: [
                {
                    data: Object.values(metadata.value.passport.passports_by_type),
                    backgroundColor: '#FFC107'
                }
            ]
        };

        eventsByTypeChartData.value = {
            labels: Object.keys(metadata.value.event.number_event_types),
            datasets: [
                {
                    label: 'Number of Events',
                    data: Object.values(metadata.value.event.number_event_types),
                    backgroundColor: '#66BB6A'
                }
            ]
        };

        passportsCreatedAllTime.value = metadata.value.passport.passports_created_all_time;
        eventsAllTime.value = metadata.value.event.events_all_time;
        console.log(eventsByTypeChartData.value);
        console.log('Found all data');
    });
</script>

<template>
    <div>
        <Card>
            <template #content>
                <h2>Summary Dashboard</h2>

                <div class="p-grid">
                    <div class="p-col-12 p-md-6 p-lg-4">
                        <Card>
                            <h3>Passports by Batch</h3>
                            <Chart type="bar" :data="passportsByBatchChartData" />
                        </Card>
                    </div>
                    <div class="p-col-12 p-md-6 p-lg-4">
                        <Card>
                            <h3>Passports by Tag</h3>
                            <Chart type="pie" :data="passportsByTagChartData" />
                        </Card>
                    </div>
                    <div class="p-col-12 p-md-6 p-lg-4">
                        <Card>
                            <h3>Passports by Type</h3>
                            <Chart type="doughnut" :data="passportsByTypeChartData" />
                        </Card>
                    </div>
                </div>

                <!-- Summary Cards -->
                <div class="p-grid">
                    <div class="p-col-12 p-md-6">
                        <Card>
                            <h3>Total Passports (All Time)</h3>
                            <p>{{ passportsCreatedAllTime }}</p>
                        </Card>
                    </div>
                    <div class="p-col-12 p-md-6">
                        <Card>
                            <h3>Total Events (All Time)</h3>
                            <p>{{ eventsAllTime }}</p>
                        </Card>
                    </div>
                </div>

                <!-- Event Types Bar Chart -->
                <div class="p-grid">
                    <div class="p-col-12">
                        <Card>
                            <h3>Events by Type</h3>
                            <Chart type="bar" :data="eventsByTypeChartData" />
                        </Card>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped>
    .p-grid {
        margin-bottom: 1em;
    }
    .p-card {
        margin-bottom: 1em;
    }
</style>
