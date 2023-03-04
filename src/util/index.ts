export function cloneElement(target: JSX.Element, props: any) {
    if (target.props) {
        Object.assign(target.props, { ...props })
    }
    return target
}