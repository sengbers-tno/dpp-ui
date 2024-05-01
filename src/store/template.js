import { defineStore } from 'pinia';

const useTemplateStore = defineStore('template', {
    state: () => ({
        //
    }),
    getters: {
        //
    },
    actions: {
        async uploadDppTemplates() {
            try {
                await this.axios.post('dpp-templates');
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async addAttributes(uuid) {
            try {
                await this.axios.post(`dpp-templates/${uuid}/attributes`);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async addEventModels(uuid) {
            try {
                await this.axios.post(`dpp-templates/${uuid}/events`);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async addCredentialModels(uuid) {
            try {
                await this.axios.post(`dpp-templates/${uuid}/credentials`);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async Addfiles(uuid) {
            try {
                await this.axios.post(`dpp-templates/${uuid}/attachments`);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async publishTemplateVersion(uuid, version) {
            try {
                await this.axios.post(`dpp-templates/${uuid}/publish/${version}`);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async updateTemplateVersion(uuid, version) {
            try {
                await this.axios
                    .patch(`dpp-templates/${uuid}/publish/${version}`, {
                        data: 1
                    })
                    .then((response) => {
                        console.log(response.data);
                    });
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async deleteTemplateVersion(uuid, version) {
            try {
                await this.axios.delete(`dpp-templates/${uuid}/publish/${version}`);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async getTemplateVersion(uuid) {
            try {
                await this.axios.get(`dpp-templates/${uuid}/publish`);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async createNonStandardDpp(id_short) {
            try {
                await this.axios.post(`dpp-templates/${id_short}/create`);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});

export default useTemplateStore;
