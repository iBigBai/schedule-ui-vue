import {createRouter, createWebHashHistory} from "vue-router";
import Login from "../components/Login.vue";
import Regist from "../components/Regist.vue";
import ShowSchedule from "../components/ShowSchedule.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Login
        }, {
            path: '/login',
            component: Login
        }, {
            path: '/regist',
            component: Regist
        }, {
            path: '/showSchedule',
            component: ShowSchedule

        }
    ]
})
export default router