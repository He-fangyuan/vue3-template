<template>
  <n-message-provider>
    <MessageApi />
  </n-message-provider>
  <router-view />
</template>
 
<script>
import MessageApi from "@/components/message-api.vue";
import { NMessageProvider } from "naive-ui";
 
export default {
  components: { MessageApi, NMessageProvider },
  name: "App",
  setup(props) {},
};
</script>
 
<style>
* {
  margin: 0;
  padding: 0;
}
</style>