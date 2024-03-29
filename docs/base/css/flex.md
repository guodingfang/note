# Flex

## Flex 布局是什么？
1. Flex 是 Flexible Box 的缩写，意味“弹性布局”，用来为盒模型提供最大的灵活性
1. 任何一个容器都可以指定为 Flex 布局，行内元素也可以使用 Flex 布局
1. Webkit 内核的浏览器，必须加上-webkit前缀

## 基本概念
1. 采用 Flex 布局的元素，称为 Flex 容器（简称——容器）。它的所有子元素自动称为容器成员，称为 Flex 项目（flex item），简称“项目”
1. 容器默认存在两根轴，水平的主轴（main axis）和垂直的交叉轴（cross axis）。项目默认沿主轴排列。单个项目占据的主轴空间叫做 main size，占据的交叉轴空间叫做 cross size

## 容器的属性
* `flex-direction`：决定主轴的方向（项目排列的方向）
* `flex-wrap`：默认情况下，项目的排列在一条线（轴线）上。`flex-wrap` 定义，一行放不下，如何换行
* `flex-flow`：是 `flex-direction` 和 `flex-wrap` 属性的简写，默认为 `row nowrap`
* `justify-content`：定义了项目在主轴上的对齐方式
* `align-item`：定义了项目在交叉轴上的对齐方式
* `align-content`：-定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

### flex-direction 属性

`flex-direction` 属性决定主轴的方向（即项目排列的方向）
```
{
  flex-direction: row | row-reverse | column | column-reverse;
}
```

![flex-direction](../images/flex-direction.png)

它可能有4个值：
* row（默认值）：主轴为水平方向，起点在左端
* row-reverse：主轴为水平方向，起点在右端
* column：主轴为垂直方向，起点在上沿
* column-reverse：主轴为垂直方向，起点在下沿

### flex-wrap 属性

默认情况下，项目都排在一条线（又称“轴线”）上。`flex-wrap` 属性定义，如果一条轴线排不下，如何换行。

![flex-wrap](../images/flex-wrap.png)

```
{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

它可能取三个值：
| 属性值 | 描述 | 效果图 |
| --- | --- | --- |
| nowrap | 不换行（默认） | ![flex-wrap](../images/flex-wrap-nowrap.png) |
| wrap | 换行（第一行在上方） | ![flex-wrap](../images/flex-wrap-wrap.jpg) |
| wrap-reverse | 换行（第一行在下方）| ![flex-wrap](../images/flex-wrap-reverse.jpg) |

### flex-flow 属性

`flex-flow` 属性是 `flex-direction` 和 `flex-wrap` 属性的简写，默认值为 `row nowrap`
```
{
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

### justify-content 属性

`justify-content` 属性定义了项目在主轴上的对齐的方式
```
{
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

![justify-content](../images/justify-content.png)

它可能取五个值，具有对齐方式与轴的方向有关。下面假设主轴从左到右：
* flex-start（默认值）：左对齐
* flex-end：右对齐
* center：居中
* space-between：两端对齐，项目之间的间隔都相等
* space-around：每个项目两侧的间距都相等。所以，项目之间的间隔比项目与边框的间隔大一倍

### align-item 属性

`align-item` 属性定义项目在交叉轴上如何对齐
```
{
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

![align-item](../images/align-item.png)

它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下：
* flex-start：交叉轴的起点对齐
* flex-end：交叉轴的终点对齐
* center：交叉轴的中点对齐
* baseline：项目的第一行文字的基线对齐
* stretch（默认值）：如果项目未设置高度或者设为auto，将占满整个容器

### align-content 属性

`align-content` 属性定义了多条轴线的对齐方式。如果项目只有一条轴线，该属性不起作用
```
{
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```
![align-content](../images/align-content.png)

该属性可能取6个值：
* flex-start：与交叉轴的起点对齐
* flex-end：与交叉轴的重点对齐
* center：与交叉轴的中点对齐
* space-between：与交叉轴的两端对齐，轴线之间间隔平均分布
* space-around：每条轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
* stretch（默认值）：轴线占满整个交叉轴

## 项目的属性
* `order`：定义了项目的排序顺序。数值越小，排列越靠前，默认为0
* `flex-grow`：定义了项目的放大比例，默认为0，即如果存在剩余空间，也不放大，分割剩余空间
* `flex-shrink`：定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。为0时，不缩小
* `flex-basis`：定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。默认值为auto，即项目本来大小
* `flex`：是 `flex-grow`，`flex-shrink` 和 `flex-basis` 的简写。默认是0 1 auto
* `align-self`：允许单个项目与其他项目不一样的对齐方式，可以覆盖align-items属性。默认为auto

### order 属性

`order` 属性定义了项目的排列顺序。数值越小，排列越靠前，默认为0。
```
{
  order: <integer>
}
```

![order](../images/order.png)

### flex-grow 属性

`flex-grow` 属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不大放大
```
{
  flex-grow: <number>
}
```

![flex-grow](../images/flex-grow.png)

如果所有项目的 `flex-grow` 属性都是1，则它们将等分剩余空间（如果有的话）。如果一个项目的 `flex-grow` 属性为2，其他项目都为1，则前者占据的剩余空间比其他项多一倍

### flex-shrink 属性

`flex-shrink` 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
```
{
  flex-shrink: <number>
}
```

![flex-shrink](../images/flex-shrink.jpg)

如果所有项目的 `flex-shrink` 属性都为1，当空间不足时，都将等比缩小。如果一个项目的 `flex-shrink` 属性为0，其他项目都为1，则空间不足时，前者不缩小（负值对该属性无效）

### flex-basis 属性

`flex-basis` 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小
```
{
  flex-basis: <length> | auto;
}
```

它可以设置跟 `width` 和 `height` 属性一样的值（比如350px），则项目将占据固定空间

### flex 属性

`flex` 属性是 `flex-grow`，`flex-shrink` 和 `flex-basis` 的简写，默认值为 `0 1 auto`。后两个属性可选
```
{
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：`auto`(1 1 auto) 和 `none`(0 0 auto)

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值

### align-self 属性

`align-self` 属性允许单个项目与其他项目不一样的对齐方式，可覆盖 `align-item` 属性。默认值为 `auto`，表示继承父元素的 `align-items` 属性，如果没有父元素，则等同于 `stretch`
```
{
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
``` 

![align-self](../images/align-self.png)

该属性可能取6个值，除了auto，其他都与align-items属性完全一致
