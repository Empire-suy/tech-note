### JQuery

jQuery对象转为js对象

$('div')[0]

js对象转换为jQuery对象

$(document.getElementById('app'))

##### 动画

show() 隐藏

hide()  显示

toggle() 切换

fadeIn()  淡入

fadeOut() 淡出

fadeToggle() 切换

slideDown() 下拉

slideUp()    上拉

slideToggle()

animate(cssObj, duration, callBack)

同一个元素添加多个动画按顺序执行，不同元素添加同一个动画同时执行

delay()   延迟

stop()    停止动画（清除动画队列）两个参数：第一个参数表示是否清除当前动画队列，第二个参数表示是否立即完成当前动画，默认都是false