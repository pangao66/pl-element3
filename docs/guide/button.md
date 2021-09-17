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
只需传入`autoLoading`为`true`即可,如需全屏`loading`,则传递`autoFullscreenLoading`为`true`,在需要的时候执行回调函数`done()`消失`loading`
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
此时`autoFullscreenLoading功能将强制开启`,点击确认后会`自动全屏loading`,用户需要执行`done()`回调函数来消失`loading`
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

<el-date-picker v-model="value1" type="date" placeholder="Pick a day">
</el-date-picker>

## Button Attributes

| Attribute   | Description                            | Type    | Accepted Values                                    | Default |
| ----------- | -------------------------------------- | ------- | -------------------------------------------------- | ------- |
| debounce    | 是否防抖                                | boolean  | -                                              | -      |
| confirmType  | button type                            | string  | primary / success / warning / danger / info / text | —       |
| plain       | determine whether it's a plain button  | boolean | —                                                  | false   |
| round       | determine whether it's a round button  | boolean | —                                                  | false   |
| circle      | determine whether it's a circle button | boolean | —                                                  | false   |
| loading     | determine whether it's loading         | boolean | —                                                  | false   |
| disabled    | disable the button                     | boolean | —                                                  | false   |
| icon        | icon class name                        | string  | —                                                  | —       |
| autofocus   | same as native button's `autofocus`    | boolean | —                                                  | false   |
| native-type | same as native button's `type`         | string  | button / submit / reset                            | button  |

## Button-Group Attributes

| Attribute | Description                                      | Type   | Accepted Values       | Default |
| --------- | ------------------------------------------------ | ------ | --------------------- | ------- |
| size      | control the size of buttons in this button-group | string | medium / small / mini | —       |

## Button-Group Slots


<script setup>
import {ref} from 'vue';
import Button01 from '../demos/button/button-01.vue';
import Button02 from '../demos/button/button-02.vue';
import Button03 from '../demos/button/button-03.vue';
import Button04 from '../demos/button/button-04.vue';
import DemoBlock from '../components/DemoBlock.vue';
const value1=ref('')
</script>
