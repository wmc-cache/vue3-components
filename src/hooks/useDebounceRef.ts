import { customRef } from 'vue'

export function useDebounceRef(value: any, delary = 1000) {

    let timer: ReturnType<typeof setTimeout>

    return customRef((track, trigger) => {
        return {
            get() {
                //通知vue跟踪value的变化
                track()
                return value
            },
            set(newValue) {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    value = newValue
                    //通知vue更新渲染模板
                    trigger()
                }, delary)
            }
        }
    })
}