# pl-form

## 基础使用

<demo-block>

<form-01></form-01>

<template v-slot:code>

<<< @/demos/form/form-01.vue

</template>

</demo-block> 

## 栅格布局

<demo-block>

<grid-form></grid-form>

<template v-slot:code>

<<< @/demos/form/grid-form.vue

</template>

</demo-block> 

## 表单校验

<demo-block>

<form-02></form-02>

<template v-slot:code>

<<< @/demos/form/form-02.vue

</template>

</demo-block> 

## 动态规则和联动

由于`vue`的响应式,我们可以使用`computed`非常容易的实现动态规则动态属性和数据联动

选择性别的时候,会联动年龄输入框的值和disabled属性以及required规则

<demo-block>

<form-03></form-03>

<template v-slot:code>

<<< @/demos/form/form-03.vue

</template>

</demo-block> 

## 查询表单

<demo-block>

<search-form-demo></search-form-demo>

<template v-slot:code>

<<< @/demos/form/search-form-demo.vue

</template>

</demo-block> 


<script setup>
import {ref} from 'vue';
import Form01 from '../demos/form/form-01.vue';
import Form02 from '../demos/form/form-02.vue';
import Form03 from '../demos/form/form-03.vue';
import SearchFormDemo from '../demos/form/search-form-demo.vue';
import GridForm from '../demos/form/grid-form.vue';
import DemoBlock from '../components/DemoBlock.vue';
</script>
