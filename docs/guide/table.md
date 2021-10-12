# pl-table

## 基础使用
<demo-block>
<base-table></base-table>

<template v-slot:code>

<<< docs/demos/table/base-table.vue

</template>

</demo-block>

## 自定义列
<demo-block>
<template-column-table></template-column-table>

<template v-slot:code>

<<< docs/demos/table/template-column.vue

</template>

</demo-block>

<script setup>
import BaseTable from '../demos/table/base-table.vue';
import TemplateColumnTable from '../demos/table/template-column.vue';
import DemoBlock from '../components/DemoBlock.vue';
</script>
