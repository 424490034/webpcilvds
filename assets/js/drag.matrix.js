import * as util from './util'


/* 定义距离尺寸的存储池 */
let E_SIZER = {}
    /* 定义元素变量 */
let ELEMENT = null


/** 
 * 绑定事件
 * @param {MouseEvent} evte 鼠标事件对象
 * @returns {undefined}
 **/
function initBindEvent(el) {
    ELEMENT = el
        // 绑定mousedown事件 
    ELEMENT.addEventListener('mousedown', bindMouseDownEvent, false)
        // 绑定mouseup事件
    document.addEventListener('mouseup', bindMouseUpEvent, false)
}


/** 
 * mousedown事件
 * @param {MouseEvent} evte 鼠标事件对象
 * @returns {undefined}
 **/
function bindMouseDownEvent(
    evte
) {
    evte.stopPropagation()
    evte.preventDefault()

    // 解析matrix的正则
    let matrix3dReg1 = /^matrix3d\((?:[-\d.]+,\s*){12}([-\d.]+),\s*([-\d.]+)(?:,\s*[-\d.]+){2}\)/,
        matrixReg = /^matrix\((?:[-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)\)$/
        // 获取解析后的transform样式属性值
    let matrix3dSourceValue = util.getStyle(
        evte.target,
        'transform'
    )
    let matrix3dArrValue = matrix3dSourceValue.match(matrix3dReg1) || matrix3dSourceValue.match(matrixReg)

    // 记录鼠标点击时的坐标
    E_SIZER['clientX'] = evte.clientX
    E_SIZER['clientY'] = evte.clientY
        // 记录matrix解析后的translateX & translateY的值
    E_SIZER['targetX'] = matrix3dArrValue[1]
    E_SIZER['targetY'] = matrix3dArrValue[2]

    // 计算坐标边界巨鹿
    E_SIZER['distX'] = E_SIZER['clientX'] - E_SIZER['targetX']
    E_SIZER['distY'] = E_SIZER['clientY'] - E_SIZER['targetY']

    // 绑定mousemove事件
    document.addEventListener('mousemove', bindMouseMoveEvent, false)
}


/** 
 * mousemove事件
 * @param {MouseEvent} evte 鼠标事件对象
 * @returns {undefined}
 **/
function bindMouseMoveEvent(
    evte
) {
    evte.stopPropagation()
    evte.preventDefault()

    let moveX = evte.clientX - E_SIZER['distX']
    let moveY = evte.clientY - E_SIZER['distY']
    localStorage.setItem('live2dv3', `translate3d(${moveX}px, ${moveY}px, 1px)`)
        // 写入style
    ELEMENT.style.transform =
        ELEMENT.style.mozTransform =
        ELEMENT.style.webkitTransform =
        `translate3d(${moveX}px, ${moveY}px, 1px)`
}


/** 
 * mouseup事件
 * @param {MouseEvent} evte 鼠标事件对象
 * @returns {undefined}
 **/
function bindMouseUpEvent(
    evte
) {
    evte.stopPropagation()
    evte.preventDefault()

    document.removeEventListener('mousemove', bindMouseMoveEvent)
}





export default function dragMatrix(el) {
    // 执行初始化方法
    initBindEvent(el)
}