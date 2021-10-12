# pl-date

## 设置日期范围间隔
业务中经常会有需要设置日期范围需要在一个固定的间隔之内,如后台管理系统查询数据 需要限制最多只能查询30之内的数据,这就要求日期选择控件的日期范围在30天之内`pl-date`组件通过设置`between`属性即可支持此功能

<demo-block>
<between-date></between-date>

<template v-slot:code>

<<< docs/demos/date/between-date.vue

</template>


</demo-block> 

<script setup>
import {ref} from 'vue';
import BetweenDate from '../demos/date/between-date.vue';
import DemoBlock from '../components/DemoBlock.vue';
</script>
