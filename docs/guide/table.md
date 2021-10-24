# pl-table

## 基础使用
<demo-block>
<base-table></base-table>

<template v-slot:code>

<<< docs/demos/table/base-table.vue

</template>

</demo-block>

## 自定义列和自定义标题
设置`cell`和`header`即可 可设置为`string`类型,此时为slotName,在模板中写slot即可,也可以写jsx函数

<demo-block>
<template-column-table></template-column-table>

<template v-slot:code>

<<< docs/demos/table/template-column.vue

</template>

</demo-block>

## 多级表头
通过设置children属性 可以设置多级表头

<demo-block>
<nesting-header-table></nesting-header-table>

<template v-slot:code>

<<< docs/demos/table/nesting-header-table.vue

</template>

</demo-block>

## 表头说明文字
通过给column设置`tip`属性,即可自动添加tooltip说明文字

<demo-block>
<title-desc-table></title-desc-table>

<template v-slot:code>

<<< docs/demos/table/nesting-header-table.vue

</template>

</demo-block>


<script setup>
import BaseTable from '../demos/table/base-table.vue';
import TemplateColumnTable from '../demos/table/template-column.vue';
import NestingHeaderTable from '../demos/table/nesting-header-table.vue';
import TitleDescTable from '../demos/table/title-desc-table.vue';
import DemoBlock from '../components/DemoBlock.vue';
</script>
