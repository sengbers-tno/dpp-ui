import { defineStore } from 'pinia';
import axiosInstance from '../axios';

export const useDppStore = defineStore('user', {
    state: () => ({
        axios: axiosInstance
    }),
    getters: {
        //
    },
    actions: {
        async createDpp(template_id_short) {
            try {
                await this.axios.post(`dpps/${template_id_short}`).then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async getBasicCompactDpp(uuid) {
            try {
                await this.axios.get(`dpps/${uuid}`).then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async getSelfSignedCompactDpp(uuid) {
            try {
                await this.axios.get(`dpps/${uuid}/self-signed`).then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async getSignedBasicCompactDpp(uuid) {
            try {
                await this.axios.get(`dpps/${uuid}/signed`).then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async getFullDpp(uuid) {
            try {
                await this.axios.get(`dpps/${uuid}/full`).then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async getLatestDpp(uuid) {
            try {
                await this.axios.get(`dpps/${uuid}/latest`).then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async getRandomDpp(uuid) {
            try {
                await this.axios.get(`dpps/${uuid}/random`).then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async addDppEvent(uuid) {
            try {
                await this.axios.post(`dpps/${uuid}/events`).then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async addDppAttachments(uuid) {
            try {
                await this.axios.post(`dpps/${uuid}/attachments`).then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async getDppActivities(uuid) {
            try {
                await this.axios.get(`dpps/${uuid}/events/activity`).then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async getDppOwnership(uuid) {
            try {
                await this.axios.get(`dpps/${uuid}/events/ownership`).then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});
