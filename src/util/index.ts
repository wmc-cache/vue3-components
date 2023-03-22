export function cloneElement(target: JSX.Element, props: any) {
    if (target.props) {
        Object.assign(target.props, { ...props })
    }
    return target
}


export function IsPC() {
    let userAgentInfo = navigator.userAgent;
    let Agents = new Array(
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPad',
        'iPod'
    );
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

export function copyText(text: string) {
    const el = document.createElement('section');
    el.innerText = text;
    document.body.appendChild(el);
    const sel = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(el);
    sel?.removeAllRanges();
    sel?.addRange(range);
    const bool = document.execCommand('copy');
    el.remove();
    return bool;
}
