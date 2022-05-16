<template>
<h2>{{store.count}}</h2>
<p>{{store.data.name}}</p>
<ul>
    <li v-for="(item) in store.list" key="item">{{item}}</li>
</ul>
<hr>
<button @click="store.updateData(newdata,count)">更新</button>
<h2>{{store.doubleCount}}</h2>
<h2>{{store.tripleCount}}</h2>
<h2>{{store.single}}</h2>
</template>

<script setup lang="ts">
 import { mainStore } from "../store/index";
 const store = mainStore();

 const newdata= reactive({name:'zs',sex:'女'})
 const count = ref(5)
</script>

<style lang="scss" scoped>
</style>