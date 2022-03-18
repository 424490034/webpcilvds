/** 
 * 获取元素计算后的样式
 * @param {Element} el 目标节点
 * @param {String} attr 目标样式规则
 * @returns {string}
 **/ 
export function getStyle(
    el,
    attr
){
    if( typeof window.getComputedStyle !== 'undefined' ){
        return window.getComputedStyle(el, null)[attr]
    }else if(typeof el.currentStyle !== 'undefiend' ){
        return el.currentStyle[attr]
    }
    return ''
}