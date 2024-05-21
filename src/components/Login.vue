<script setup>
import {ref, reactive} from "vue";
import {useRouter} from "vue-router";
import {userStore} from "../store/userStore.js";

let user = userStore();

let router = useRouter();
import request from "../utils/request.js";
// 响应式数据,保存用户输入的表单信息
let loginUser = reactive({username: '', userPwd: ''})
// 响应式数据,保存校验的提示信息
let usernameMsg = ref('')
let userPwdMsg = ref('')

// 校验用户名的方法
function checkUsername() {
  var usernameReg = /^[a-zA-Z0-9]{5,10}$/;
  if (!usernameReg.test(loginUser.username)) {
    usernameMsg.value = '格式有误'
    return false
  }
  usernameMsg.value = 'OK'
  return true
}

// 校验密码的方法格式
function checkUserPwd() {
  var userPwdReg = /^[0-9]{6}$/;
  // 校验密码
  if (!userPwdReg.test(loginUser.userPwd)) {
    // 格式不合法
    userPwdMsg.value = "格式有误"
    return false
  }
  userPwdMsg.value = "ok"
  return true
}

async function login() {
  if (checkUsername() && checkUserPwd()) {
    let {data} = await request.post('user/login', loginUser);
    if (data.code == 200) {
      alert("登录成功")
      //更新pinia数据
      console.log(data)
      user.uid = data.data.uid;
      user.username = data.data.username;
      // 跳转到showSchedule
      router.push("/showSchedule")
    } else if (data.code == 503) {
      alert("密码有误")
    } else if (data.code == 501) {
      alert("用户名有误")
    } else {
      alert("未知错误")
    }
  }
}

// 清除表单信息的方法
function clearForm() {
  loginUser.username = ''
  loginUser.userPwd = ''
  usernameMsg.value = ''
  userPwdMsg.value = ''
}

</script>

<template>
  <div>
    <h3 class="ht">请登录</h3>
    <table class="tab" cellspacing="0px">
      <tr class="ltr">
        <td>请输入账号</td>
        <td>
          <input class="ipt"
                 type="text"
                 v-model="loginUser.username"
                 @blur="checkUsername()">
          <span id="usernameMsg" v-text="usernameMsg"></span>
        </td>
      </tr>
      <tr class="ltr">
        <td>请输入密码</td>
        <td>
          <input class="ipt"
                 type="password"
                 v-model="loginUser.userPwd"
                 @blur="checkUserPwd()">
          <span id="userPwdMsg" v-text="userPwdMsg"></span>
        </td>
      </tr>
      <tr class="ltr">
        <td colspan="2" class="buttonContainer">
          <input class="btn1" type="button" @click="login()" value="登录">
          <input class="btn1" type="button" @click="clearForm()" value="重置">
          <router-link to="/regist">
            <button class="btn1">去注册</button>
          </router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.ht {
  text-align: center;
  color: cadetblue;
  font-family: 幼圆;
}

.tab {
  width: 500px;
  border: 5px solid cadetblue;
  margin: 0px auto;
  border-radius: 5px;
  font-family: 幼圆;
}

.ltr td {
  border: 1px solid powderblue;
}

.ipt {
  border: 0px;
  width: 50%;
}

.btn1 {
  border: 2px solid powderblue;
  border-radius: 4px;
  width: 60px;
  background-color: antiquewhite;
}

#usernameMsg, #userPwdMsg {
  color: gold;
}

.buttonContainer {
  text-align: center;
}
</style>