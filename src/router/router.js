import {createRouter, createWebHashHistory} from "vue-router";
import Login from "../components/Login.vue";
import Regist from "../components/Regist.vue";
import ShowSchedule from "../components/ShowSchedule.vue";
import {userStore} from "../store/userStore.js";
import pinia from "../pinia.js";
//路由内使用pinia的方法
let user = userStore(pinia);

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/showSchedule'
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
//路由守卫
router.beforeEach((to, from, next) => {
        if (to.path == '/showSchedule' && user.username == '') {
            alert("您尚未登录,请登录后再查看日程")
            next('/login');
        } else {
            next();
        }
    }
);
export default router