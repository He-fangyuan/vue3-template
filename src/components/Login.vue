<script setup lang="ts">
const info = () => {
    window.$message.info(
        "I don't know why nobody told you how to unfold your love",
        {
        keepAliveOnHover: true
        }
    )
}
</script>

<template>
    <n-space>
    <n-button @click="info">
      信息（Hover不消失）
    </n-button>
  </n-space>
</template>


