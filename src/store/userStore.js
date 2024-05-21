import {defineStore} from "pinia";

export const userStore = defineStore('userStore', {
    state: () => {
        return {
            uid: 0,
            username: ''
        }
    },
    getters: {},
    actions: {}
});