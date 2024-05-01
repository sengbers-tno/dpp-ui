import { defineStore } from 'pinia';
import axiosInstance from '../axios';

const useTemplateStore = defineStore('template', {
    state: () => ({
        axios: axiosInstance
    }),
    getters: {
        //
    },
    actions: {
        /**
         * Create DPP with body containing JSON-schema of attributes at least,
         * but also events, credentials, other basic aspects - creates a partial or empty shell.
         * returns UUID/idShort.
         */
        async uploadDppTemplates(dppInfo) {
            try {
                await this.axios
                    .post('dpp-templates', {
                        dpp_template: dppInfo
                    })
                    .then((response) => {
                        console.log(response.data);
                    });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        // Add attributes to the attribute data model that weren't added before.
        async addAttributes(uuid, attributes) {
            try {
                await this.axios
                    .post(`dpp-templates/${uuid}/attributes`, {
                        data: attributes
                    })
                    .then((response) => {
                        console.log(response.data);
                    });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        // Add event models to the event data model that weren't added before.
        async addEventModels(uuid, eventModels) {
            try {
                await this.axios
                    .post(`dpp-templates/${uuid}/events`, {
                        data: eventModels
                    })
                    .then((response) => {
                        console.log(response.data);
                    });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        // Add credential models to the template that are supported to be added to the content.
        async addCredentialModels(uuid, credentialModels) {
            try {
                await this.axios
                    .post(`dpp-templates/${uuid}/credentials`, {
                        data: credentialModels
                    })
                    .then((response) => {
                        console.log(response.data);
                    });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        // Attach files, such as images or PDFs to the DPP that can returned in a URL or embedded form
        // when the DPP is requested in a complete form.
        async Addfiles(uuid, attachment) {
            try {
                var formData = new FormData();
                formData.append('file', attachment);
                await this.axios
                    .post(
                        `dpp-templates/${uuid}/attachments`,
                        {
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
        // Lock a certain format with current format.
        async publishTemplateVersion(uuid, version) {
            try {
                await this.axios
                    .post(`dpp-templates/${uuid}/publish/`, {
                        data: version
                    })
                    .then((response) => {
                        console.log(response.data);
                    });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        // Update the template of existing uuid.
        async updateTemplateVersion(uuid, version) {
            try {
                await this.axios
                    .patch(`dpp-templates/${uuid}/publish/`, {
                        data: version
                    })
                    .then((response) => {
                        console.log(response.data);
                    });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        // Delete template version of given uuid.
        async deleteTemplateVersion(uuid, version) {
            try {
                await this.axios
                    .delete(`dpp-templates/${uuid}/publish/`, {
                        data: version
                    })
                    .then((response) => {
                        console.log(response.data);
                    });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        // Get current template version of given uuid.
        async getTemplateVersion(uuid) {
            try {
                await this.axios.get(`dpp-templates/${uuid}/publish`).then((response) => {
                    console.log(response.data);
                });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        // Create a DPP with basic attributes, but with a non-standard choice.
        async createNonStandardDpp(id_short) {
            try {
                await this.axios
                    .post(`dpp-templates/${id_short}/create`, {
                        params: {
                            version: 'latest'
                        }
                    })
                    .then((response) => {
                        console.log(response.data);
                    });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});

export default useTemplateStore;
