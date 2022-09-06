<template>
    <span :class="{'ant-radio-wrapper': true,'ant-radio-wrapper-disabled': disabled}" @click="handleClick">
        <span :class="{'ant-radio': true,'ant-radio-checked':checked,'ant-radio-disabled': disabled}">
            <input :value="checked" type="radio" class="ant-radio-input" ref="inputEl" />
            <span class="ant-radio-inner"></span>
        </span>
        <span>
            <slot></slot>
        </span>
    </span>
</template>

<script lang="ts" setup>
import './index.scss'
import { ref } from "vue"
const props = defineProps({
    disabled:{
        type:Boolean,
        default:false
    },
    checked:{
        type:Boolean,
        default:false
    }
})
const checked = ref(props.checked)
const disabled = ref(props.disabled)
const handleClick  = () => {
     if (disabled.value||checked.value) {
            return;
     }
     checked.value = !checked.value
}
</script>

