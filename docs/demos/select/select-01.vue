<template>
  <p>基础使用</p>
  <pl-select :options="options1" v-model="select1"></pl-select>
  <p>options为key,value对象map</p>
  <pl-select :options="options2" v-model="select2"></pl-select>
  <p>options为一维基础值数组</p>
  <pl-select :options="options3" v-model="select3"></pl-select>
  <p>options的label和value设置属性别名</p>
  <pl-select :options="options4" label-key="name" value-key="id" v-model="select4"></pl-select>
  <p>绑定对象,需传isBindObject和valueKey</p>
  <pl-select :options="options5" v-model="select5" is-bind-object value-key="value"></pl-select>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({
  name: 'select-demo',
})

const select1 = ref('')
const select2 = ref('')
const select3 = ref('')
const select4 = ref(0)
const select5 = ref('programmer')
const options1 = ref([
  { value: '选项1', label: '黄金糕' },
  { value: '选项2', label: '双皮奶' },
  { value: '选项3', label: '蚵仔煎' },
  { value: '选项4', label: '龙须面' },
  { value: '选项5', label: '北京烤鸭' }
])
const options2 = {
  选项1: '黄金糕',
  选项2: '双皮奶',
  选项3: '蚵仔煎',
  选项4: '龙须面',
  选项5: '北京烤鸭'
}
const options3 = ['黄金糕', '双皮奶', '蚵仔煎', '龙须面', '北京烤鸭']
const options4 = [
  { id: 1, name: '黄金糕' },
  { id: 2, name: '双皮奶' },
  { id: 3, name: '蚵仔煎' },
  { id: 4, name: '龙须面' },
  { id: 5, name: '北京烤鸭' }
]
const options5 = [
  { label: '设计', value: 'designer' },
  { label: '程序员', value: 'programmer' },
  { label: '测试', value: 'testers' },
  { label: '产品', value: 'product' }
]
</script>