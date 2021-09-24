# pl-button

`pl-button`是基于`el-button`的二次封装组件,在保留原有组件的所有功能前提下,扩展了一些功能

### 防抖



一段时间内重复点击会有防抖效果
防抖在业务中使用非常广泛,比如防止表单重复提交等,这里只需要传一个 `debounce` 属性即可

<demo-block>

<button-01></button-01>

<template v-slot:code>

<<< docs/demos/button/button-01.vue

</template>

</demo-block> 

### 自动loading
:::tip 提示
给按钮加上`loading`也是非常多的场景,通常我们需要每个按钮定义一个相关的`loading`变量,非常麻烦,这里无需定义变量,
只需传入`autoLoading`为`true`即可,如需全屏`loading`,则传递`autoFullscreenLoading`为`true`,
设置了`autoLoading`或`autoFullscreenLoading`之后,点击了按钮则会自动加载`loading`,要让`loading`消失有两种方法
- `click`事件传递一个`promise`,`promise`执行后会自动消失`loading`
-  启用第二个参数,第二个参数为回调函数,执行回调函数即可消失`loading`
:::


<demo-block>
<button-02></button-02>

<template v-slot:code>

<<< docs/demos/button/button-02.vue

</template>


</demo-block> 

### 二次确认

许多操作需要二次确认,一般常用的有`el-popconfirm`和`ElMessageBox.confirm`两种方式,`pl-button`将这两种方式简化集成

:::warning 注意
使用二次确认功能,
此时`autoFullscreenLoading功能将强制开启`,点击确认后会`自动全屏loading`,消失`loading`的方法跟上面的一致,`on-confirm`传递一个`promise`或者使用回调函数即可
:::

<demo-block>
<button-03></button-03>

<template v-slot:code>

<<< docs/demos/button/button-03.vue

</template>


</demo-block> 

### tooltip功能
鼠标放上会有tooltip效果

<demo-block>
<button-04></button-04>

<template v-slot:code>

<<< docs/demos/button/button-04.vue

</template>


</demo-block> 

## Button Attributes

| Attribute   | Description                            | Type    | Accepted Values                                    | Default |
| ----------- | -------------------------------------- | ------- | -------------------------------------------------- | ------- |
| debounce    | 是否防抖                                | boolean  | -                                              | -      |
| confirmType  | 二次确认方式                            | string  |     pop/messagebox      | -       |




<script setup>
import {ref} from 'vue';
import Button01 from '../demos/button/button-01.vue';
import Button02 from '../demos/button/button-02.vue';
import Button03 from '../demos/button/button-03.vue';
import Button04 from '../demos/button/button-04.vue';
import DemoBlock from '../components/DemoBlock.vue';
</script>
