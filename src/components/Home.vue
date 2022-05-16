<script setup lang="ts">

const timestamp = ref(1183135260000);


const router = useRoute()
console.log(router.name);

window.document.title = router.meta.title

</script>

<template>
    <img alt="Vue logo" src="@/assets/logo.png" />
    <n-button>naive-ui</n-button>
    <n-card title="卡片"> 卡片内容 </n-card>
    <n-gradient-text type="error"> 炸了 </n-gradient-text>
    <br />
    <n-gradient-text type="info"> 噢 </n-gradient-text>
    <br />
    <n-gradient-text type="warning"> 注意 </n-gradient-text>
    <br />
    <n-gradient-text type="success"> 成了 </n-gradient-text>
    <n-date-picker v-model:value="timestamp" type="date" clearable />
    <pre>{{ JSON.stringify(timestamp) }}</pre>
    <SvgIcon name="music" style="height: 15px" />
</template>

<style>
.n-card {
    max-width: 300px;
}
</style>
