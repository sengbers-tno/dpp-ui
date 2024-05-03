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
        // create a DPP with basic attributes.
        async createDpp(template_id_short) {
            try {
                await this.axios
                    .post(
                        `dpps/${template_id_short}`,
                        {
                            title: 'dpp1'
                        },
                        {
                            params: {
                                version: 'latest'
                            }
                        }
                    )
                    .then((response) => {
                        console.log(response.data);
                    });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        // Basic compact pull with no signature.
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
        // Get Bom of requested dpp.
        async getDppBom(uuid) {
            try {
                await this.axios.get(`dpps/${uuid}/bom`).then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        // Basic compact pull with self-signature.
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
        // Compact pull with embedded signatures from wallet in response to a challenge nonce.
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
        // Pull dpp with all attachment links and images attached.
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
        // Get the last DPP that was generated.
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
        // Get a random DPP based on available IDs in the graph_db.
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
        // Add event of type that matches the registered types in the registered version.
        async addDppEvent(uuid) {
            try {
                await this.axios
                    .post(`dpps/${uuid}/events`, {
                        uuid: this.uuid,
                        name: 'first event'
                    })
                    .then((response) => {
                        console.log(response.data);
                    });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async getDppAttachments(uuid) {
            try {
                await this.axios.get(`dpps/${uuid}/attachments`).then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async putDppAttachments(uuid, attachment_id) {
            try {
                await this.axios.get(`dpps/${uuid}/attachments/${attachment_id}`).then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        // Add a file that is stored with a reference to it added to the DPP itself.
        async addDppAttachments(uuid, file) {
            try {
                var formData = new FormData();
                formData.append('file', file);
                await this.axios
                    .post(
                        `dpps/${uuid}/attachments`,
                        {
                            name: 'filename',
                            attachment: formData
                        },
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    )
                    .then((response) => {
                        console.log(response.data);
                    });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        // Get just the activity subset of data about the given DPP uuid.
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
        // Get just the ownership subset of data about the given DPP uuid.
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
