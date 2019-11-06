# CSS Grid 网格单元格布局

定义一个元素为网格容器，并对其建立一个网格格式的上下文

```
{
  display: grid | inline-grid;
}
```
* display：定义一个元素成为网格元素，并对其建立一个网格格式的上下文
* grid：生成一个块级网格
* inline-grid：生成一个内联级网格

## grid-template-rows 属性
* 默认值为 none
* grid-template-rows 指定的每个值可以创建每行的高度。行的高度可以是任何负值，长度可以是 px，%，em 等长度单位的值

```css
{
  grid-template-rows: 60px 40px;
}
```

## grid-template-columns 属性
* 默认值为 none
* 像行一样，通过 grid-template-columns 指定的每个值来创建每行的列宽

```css
{
  grid-template-columns: 40px 50px 60px;
}
```

## fr 单位
> `fr` 单位可以帮组我们创建一个弹列的网格轨道。它代表了网格容器中可用的空间（就像 Flexbox 中无单位的值）
```css
{
  /* 网格容器分成了4等份（1 + 1 + 2 = 4），每一份（1fr）是网格容器宽度的四分之一 */
  grid-template-columns: 1fr 1fr 2fr;
}
```

## minmax() 属性方法
* 可以通过 `minmax()` 函数来创建网格轨迹的最小或最大尺寸
* `minmax()` 函数可以接受两个参数：第一个参数定义网格轨道的最小值，第二个参数定义网格轨道的最大值
* 可以接受任意长度值，也接受 auto 值。auto 值允许网格轨道基于内容的尺寸拉伸或挤压
```css
{
  /* 第一行的高度最小值是 100px，最大值为 auto，允许行的高度可以变大超过100px */
  grid-template-rows: minmax(100px, auto);
  /* 第一列设置最小值为 auto，但它的最大值是 50%，也就是最大宽度不会超过网格容器宽度的 50% */
  grid-template-columns: minmax(auto, 50%);
}
```

## repeat() 属性方法
* 使用 `repeat()` 可以创建重复的网格轨迹。这个适用于创建相等尺寸的网格项目
* `repeat()` 接受两个参数：第一个参数定义网格轨道应该重复的次数，第二个参数定义了每个轨道的尺寸

```css
{
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 30px repeat(3, 1fr) 30px;
}
```

## 间距

### grid-column-gap

创建列与列之间的间距

### grid-row-gap

创建行与行之间的间距

### grid-gap

* 默认值是 0
* `grid-gap` 是 `grid-row-gap` 和 `grid-column-gap` 两个属性的缩写，如果它指定了两个值，那么第一个值是设置了 `grid-row-gap` 的值，第二个值设置了 `grid-column-gap` 的值。如果只设置了一个值，代表行和列间距相等
* 注意：`grid-gap` 只能创建列与列或行与行之间的间距，但不能创建列和行与容器边缘的间距
* 间距 (`gap`) 可以设置为任何非负值，长度值可以是px、%、em等单位值
