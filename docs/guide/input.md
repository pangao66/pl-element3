# pl-input

### 默认trim

添加`trim`属性 可让`input`能自动trim, `pl-input`的trim属性默认为true,此时会默认trimLeft,输入的时候可以输入空格,change时候会trim掉右边空格

<demo-block>

<input-01></input-01>

<template v-slot:code>

<<< docs/demos/input/input-01.vue

</template>

</demo-block> 

### 分转元

在开发中,经常会有用户输入和显示是元,但是保存到后端时需要用分做单位的场景,比如微信支付等.这里添加`transfer`属性,设置为`cent`即可

<demo-block>

<input-02></input-02>

<template v-slot:code>

<<< docs/demos/input/input-02.vue

</template>

</demo-block> 

<script setup>
import DemoBlock from '../components/DemoBlock.vue';
import Input01 from '../demos/input/input-01.vue';
import Input02 from '../demos/input/input-02.vue';
</script>
