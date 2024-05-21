<script setup>
import {scheduleStore} from "../store/scheduleStore.js";
import {userStore} from "../store/userStore.js";
import request from "../utils/request.js";
import {ref, reactive, onMounted} from "vue";

let user = userStore();
let schedule = scheduleStore();
onMounted(() => {
  showSchedule();
})

async function showSchedule() {
  let {data} = await request.get("schedule/findAllSchedule", {params: {'uid': user.uid}});
  schedule.itemList = data.data;
}

async function addSchedule() {
  let {data} = await request.get("schedule/addSchedule", {params: {'uid': user.uid}});
  if (data.code === 200) {
    showSchedule();
  } else {
    alert("添加失败");
  }
}

async function updateSchedule(item) {
  let {data} = await request.post("schedule/updateSchedule", item);
  if (data.code == 200) {
    showSchedule()
  } else {
    alert("更新异常")
  }
}

async function deleteSchedule(index) {
  let {data} = await request.get("schedule/deleteSchedule", {params: {'sid': schedule.itemList[index].sid}});
  //根据业务码判断删除是否成功
  if (data.code == 200) {
    showSchedule()
  } else {
    alert("删除失败")
  }
}
</script>

<template>
  <div>
    <h3 class="ht">您的日程如下</h3>
    <table class="tab" cellspacing="0px">
      <tr class="ltr">
        <th>编号</th>
        <th>内容</th>
        <th>进度</th>
        <th>操作</th>
      </tr>
      <tr class="ltr" v-for="(item,index) in schedule.itemList " :key="index">
        <td v-text="index+1"></td>
        <td>
          <input type="input" v-model="item.title">
        </td>
        <td>
          <input type="radio" value="1" v-model="item.completed">已完成
          <input type="radio" value="0" v-model="item.completed">未完成
        </td>
        <td class="buttonContainer">
          <button class="btn1" @click="deleteSchedule(index)">删除</button>
          <button class="btn1" @click="updateSchedule(item)">保存修改</button>
        </td>
      </tr>
      <tr class="ltr buttonContainer">
        <td colspan="4">
          <button class="btn1" @click="addSchedule()">新增日程</button>
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
  width: 80%;
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
  width: 100px;
  background-color: antiquewhite;

}

#usernameMsg, #userPwdMsg {
  color: gold;
}

.buttonContainer {
  text-align: center;
}

</style>