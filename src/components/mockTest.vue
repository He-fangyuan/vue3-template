<!--  -->
<template>
    <div class="">
        
    </div>
</template>

<script setup>
import {landRelevant} from '../api/api.ts'


onMounted(()=>{
  test1()
})

const test1 = async () => {
  const res = await landRelevant.mockTest1({})
  console.log(res)
}

    
</script>
<!-- <script setup>
import axios from 'axios'

const a = async ()=>{
    const { data } = await axios.get('/api/getUsers')
    console.log(data.status);
    console.log(data.data);
}
a()

    
</script> -->

<style lang="scss" scoped>
    
</style>