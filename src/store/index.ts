import { defineStore } from 'pinia'

export const mainStore = defineStore('main',{
  state: () => ({
    count: 1,
    data: {
      name: 'Jerry',
      sex: '男'
        },
    list:['orange','green','purple','white']
    }),
    // getter 第一个参数是 state，是当前的状态，也可以使用 this 获取状态
  // getter 中也可以访问其他的 getter，或者是其他的 Store
  getters: {
    // 通过 state 获取状态
    doubleCount: (state) => state.count * 2,
    // 通过 this 获取状态（注意this指向）
    tripleCount() {
      return this.count * 3
      },
    single() {
        return this.tripleCount*2
    }
  },
    actions: {
        updateData(newData, count) {
            // 使用 this 直接修改
            this.data = { ...newData }
            this.count = count * 2
    
            // 使用 $patch 修改多个值
            this.$patch({
                data: { ...newData },
                count: count * 2
            })
        }
    }
})