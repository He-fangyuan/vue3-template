<!--  -->
<template>
    <div class="">
         <select  @change="changeLangeuage($event)">
            <option value ="cn">中文</option>
            <option value ="en">英文</option>
        </select>
        <hr>
        <button @click="changeLangeuage">切换语言</button>
        <h2>{{$t('commons.admin')}}</h2>
        <h2>{{$t('commons.quit')}}</h2>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const changeLangeuage = () =>{
    proxy.$i18n.locale = proxy.$i18n.locale === 'en' ? 'zh' : 'en'
}
</script>

<style lang="scss" scoped>
    
</style>