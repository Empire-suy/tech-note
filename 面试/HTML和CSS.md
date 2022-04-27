#### HTML

#### nodeType

| 常量                               | 值   | 描述                                                         |
| :--------------------------------- | :--- | :----------------------------------------------------------- |
| `Node.ELEMENT_NODE`                | `1`  | 一个 [`元素`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 节点，例如 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/p) 和 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div)。 |
| `Node.TEXT_NODE`                   | `3`  | [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 或者 [`Attr`](https://developer.mozilla.org/zh-CN/docs/Web/API/Attr) 中实际的 [`文字`](https://developer.mozilla.org/zh-CN/docs/Web/API/Text) |
| `Node.CDATA_SECTION_NODE`          | `4`  | 一个 [`CDATASection`](https://developer.mozilla.org/zh-CN/docs/Web/API/CDATASection)，例如 `<!CDATA[[ … ]]>`。 |
| `Node.PROCESSING_INSTRUCTION_NODE` | `7`  | 一个用于XML文档的 [`ProcessingInstruction` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/ProcessingInstruction) ，例如 `<?xml-stylesheet ... ?>` 声明。 |
| `Node.COMMENT_NODE`                | `8`  | 一个 [`Comment`](https://developer.mozilla.org/zh-CN/docs/Web/API/Comment) 节点。 |
| `Node.DOCUMENT_NODE`               | `9`  | 一个 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 节点。 |
| `Node.DOCUMENT_TYPE_NODE`          | `10` | 描述文档类型的 [`DocumentType`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentType) 节点。例如 `<!DOCTYPE html>` 就是用于 HTML5 的。 |
| `Node.DOCUMENT_FRAGMENT_NODE`      | `11` | 一个 [`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment) 节点 |

##### CSS选择器及优先级

###### 选择器

- id 选择器(#x)
- 类选择器(.x)
- 属性选择器(a[rel="external"])
- 伪类选择器(a:hover, li:nth-child)
- 标签选择器(div, h1)
- 相邻选择器(h1 + p)
- 子代选择器(div > p)
- 后代选择器(div p)
- 通配符选择器(*)

###### 优先级

- !important
- 内联样式(1000)
- ID选择器(100)
- 类选择器/属性选择器/伪类选择器(10)
- 元素选择器/为元素选择器(1)
- 关系选择器/通配符选择器(0)

##### position 属性有哪些值及区别

- fixed 元素的位置相对浏览器窗口固定，脱离文档流
- relative 相对自身位置
- absolute 相对于具有定位的最近的父元素身上，脱离文档流
- sticky 相对于元素流中的BFC和最近的块级祖元素
- 默认定位 static 没有定位，元素出现在正常的流中

##### CSS 盒模型

标准和模型：width 指 content部分的宽度
怪异盒模型：width 指的是 content + padding + border

盒模型转换:
  box-sizing: content-box; [标准和模型]
  box-sizing: border-box; [怪异盒模型]

box-sizing: inherit; [继承父元素的box-sizing值]

##### BFC (块级格式上下文)

BFC是一个独立的渲染区域，规定内部box如何布局，并且这个区域的子元素不会影响到外面的元素

###### BFC的原理布局规划

- 内部的box会在垂直方向，一个一个地放置
- box垂直方向上的距离有margin决定，属于一个BFC的相邻两个box的margin会发生重叠
- 每个元素的margin box的左边，与包含块border box的左边相接触
- BFC的区域不会与float box重叠
- BFC 是一个独立容器，容器里面的子元素不会影响到外面的元素
- BFC 的高度时，浮动元素也参与计算高度
- 元素的类型display属性，决定这个box的类型

###### 如何创建BFC

- 根元素[HTML]
- float的值部位none
- position的值为absolute | fixed
- display的值为inline-block、table-cell、table-caption
- overflow的值为visible

###### 使用场景

- 去除边距重叠现象
- 清除浮动
- 避免某元素被浮动元素覆盖
- 避免多列布局由于宽度计算四舍五入而自动换行

##### 元素垂直居中

1. 行内元素 line-height: height;
2. 行内块元素

```css
.parent::after, .son {
  display: inline-block;
  vertical-align: middle;
}

.parent::after {
  content: "";
  height: 100%;
}
```

3. 元素高度不定

```css
.parent {
  display: table;
}

.child {
  display: table-cell;
  vertical-align: middle;
}
```

4. flex 2012

```css
.parent {
  display: flex;
  align-items: center;
}
```

5. flex 2009

```css
.parent {
  display: box;
  box-orient: vertical;
  box-pack: center;
}
```

6. transform

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

7. 父元素高度固定

```css
.parent {
  position: relative;
}

.son {
  position: absolute;
  top: 50%;
  height: 高度;
  margin-top: -0.5*高度;
}
```

8. 定位

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  height: 高度;
  top: 0;
  bottom: 0;
  margin: auto 0;
}
```

##### 元素水平居中

1. 行内元素 父元素设置 text-align: center;
2. 块级元素 设置margin: 0 auto;
3. fit-content，并且配合margin

```css
.parent {
  width: fit-content;
  margin: 0 auto;
}
```

4. 使用flex 2012版本

```css
.parent {
  display: flex;
  justify-content: center;
  /* margin: auto;  这样也可以*/
}

```

5. 使用flex 2009 版本

```css
.parent {
  display: box;
  box-pack: center;
}
```

6. 使用绝对定位和margin-left

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  left: 50%;
  margin-left: -0.5 * 宽度
}
```

7. 使用transform

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  left: 50%;
  transform: translateX(-50%)
}
```

8. 使用绝对定位

```css
.box {
  position: absolute;
  width: 固定宽度;
  left: 0;
  right: 0;
  margin: 0 auto;
}
```


##### 用CSS实现三角符号

```css
.rec::before {
  content: "";
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-bottom-color: pink;
}
```

###### 隐藏页面某个元素的方法

1. opacity: 0;  不会改变页面布局，仍占据原来的位置，如果绑定了事件，点击了也可以触发
2. visibility: hidden; 不会改变页面布局 仍保留原来占据的位置
3. display: none; 元素隐藏，不占据原来的位置

##### 清除浮动

```css
.clearfix::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: none;
}
```

##### flex 布局
