<template>
    <div ref="popover" class="t-popover">
        <div v-if="visible" ref="contentWrapper" class="t-content-wrapper" :class="{ [`position-${position}`]: true }">
            <slot name="content" :close="close"></slot>
        </div>
        <!-- span标签增加display: inline-block; 解决包裹元素高度一致的问题 -->
        <span ref="triggerWrapper" style="display: inline-block;">
            <slot></slot>
        </span>
    </div>
</template>


<script lang="ts" setup>
import { defineProps, ref, onMounted, onUnmounted, nextTick } from 'vue'
type position = 'top' | 'bottom' | 'left' | 'right'
type trigger = 'click' | 'hover' | 'focus'
const props = defineProps({
    position: {
        type: String as () => position,
        default: 'bottom',

    },
    trigger: {
        type: String as () => trigger,
        default: 'click',
    },
    container: {
        type: Element
    }
})

const visible = ref(false)
const contentWrapper = ref<any>(null)
const triggerWrapper = ref<any>(null)
const popover = ref<any>(null)
let  CalculatePosition:position = props.position

onMounted(() => {
    if (props.trigger === 'click') {
        popover.value.addEventListener('click', onClick)
    } else if (props.trigger === 'hover') {
        popover.value.addEventListener('mouseenter', open)// 添加hover监听事件
        popover.value.addEventListener('mouseleave', close)// 取消hover监听事件
    } else {
        popover.value.addEventListener('mousedown', open)// 添加hover监听事件
        popover.value.addEventListener('mouseup', close)// 取消hover监听事件
    }
})

onUnmounted(() => {
    putBackContent()
    if (props.trigger === 'click') {
        popover.value.removeEventListener('click', onClick)
    } else if (props.trigger === 'hover') {
        popover.value.removeEventListener('mouseenter', open)// 添加hover监听事件
        popover.value.removeEventListener('mouseleave', close)// 取消hover监听事件
    } else {
        popover.value.removeEventListener('mousedown', open())
        popover.value.removeEventListener('mouseup', close())
    }
})

const positionContent = () => {
    if (contentWrapper.value) {
        if (props.container) {
            props.container.appendChild(contentWrapper.value)
        } else {
            document.body.appendChild(contentWrapper.value)
        }
        const { width, height, top, left } = triggerWrapper.value.getBoundingClientRect()
        const { width: contentWidth, height: contentHeight, top: contentTop, left: contentLeft } = contentWrapper.value.getBoundingClientRect()
        console.log(">>>>>>",width, height, top, left)
        console.log(">>>>>>", contentWidth, contentHeight, contentTop, contentLeft)
        if (top < contentHeight) {
            CalculatePosition = 'bottom'
            console.log(top < contentHeight)
        }
        // if (left < contentWidth) {
        //     CalculatePosition = 'right'
        // }
        // scrollX和scrollY分别是文档相对于当前浏览器视口已滚动的距离。
        let positions = {
            top: {
                top: top + window.scrollY,
                left: left + window.scrollX,
            },
            bottom: {
                top: top + height + window.scrollY,
                left: left + window.scrollX,
            },
            left: {
                top: top + window.scrollY,
                left: left + window.scrollX,
            },
            right: {
                top: top + window.scrollY,
                left: left + width + window.scrollX,
            },
        }
        contentWrapper.value.style.left = positions[CalculatePosition].left + 'px'
        contentWrapper.value.style.top = positions[CalculatePosition].top + 'px'
    }
}
const onClickDocument = (e: Event) => { // 如果点击在popover 则让popover自己去处理，document不管
    if (contentWrapper.value && contentWrapper.value.contains(e.target)) { return }
    close()
}

const open = () => {
    visible.value = true
    nextTick(() => {
        positionContent()
    })
    // this.$emit('open')
    setTimeout(() => {
        document.addEventListener('click', onClickDocument)
    },1)
}
const close = () => {
    visible.value = false
    // this.$emit('close')
    document.removeEventListener('click', onClickDocument)
}


const onClick = (event: Event) => {
    if (triggerWrapper.value.contains(event.target)) { // 找到点击事件的元素
        if (visible.value) {
            close()
        } else {
            open()
        }
    }
}

const putBackContent = () => {
    if (!contentWrapper.value) { return }
    popover.value.appendChild(contentWrapper.value)
}

</script>

<style lang="scss" scoped>
$border-color: #ddd;
$border-radius: 4px;

.t-popover {
    position: relative;
    display: inline-block;
    vertical-align: top;
}

.t-content-wrapper {
    position: absolute;
    padding: .5em 1em;
    background: white;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5)); // 伪类增加阴影，兼容性差IE、Opera Mini不支持
    max-width: 20em;
    word-wrap: break-word;

    &::before {
        content: '';
        display: block;
        border: 10px solid transparent;
        width: 0;
        height: 0;
        position: absolute;
    }

    &.position-top {
        margin-top: -10px;
        transform: translateY(-100%);

        &::before {
            left: 10px;
            top: 100%;
            border-bottom: none;
            border-top-color: white;
        }
    }

    &.position-bottom {
        margin-top: 10px;

        &::before {
            left: 10px;
            bottom: 100%;
            border-top: none;
            border-bottom-color: white;
        }
    }

    &.position-left {
        margin-left: -10px;
        transform: translateX(-100%);

        &::before {
            left: 100%;
            top: 7px;
            border-right: none;
            border-left-color: white;
        }
    }

    &.position-right {
        margin-left: 10px;

        &::before {
            right: 100%;
            top: 7px;
            border-left: none;
            border-right-color: white;
        }
    }
}
</style>
