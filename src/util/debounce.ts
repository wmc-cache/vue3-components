export function debounce(fun: Function, delay: number) {
    let timer: ReturnType<typeof setTimeout>
    return function (this: any) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fun.apply(this, arguments)
      }, delay)
    }
  }