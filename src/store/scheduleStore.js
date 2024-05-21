import {defineStore} from "pinia";

export const scheduleStore = defineStore('scheduleStore', {
    state: () => {
        return {
            itemList: [
                {
                    sid: 1,
                    uid: 1,
                    title: '学java',
                    completed: 1
                },
                {
                    sid: 2,
                    uid: 1,
                    title: '学前端',
                    completed: 0
                }
            ]
        }
    },
    getters: {},
    actions: {}
})