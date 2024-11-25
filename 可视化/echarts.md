## echarts

[官方文档](https://echarts.apache.org/zh/index.html)

目前版本 echarts@5.5.1

1. title 和 subtitle

    subtitle对齐方式无法脱离title独立对齐，只能整体上去对齐

    标题居中对齐的方式
    ```ts
    {
      left: '50%',
      textAlign: 'center',
    }
    ```
2. 坐标轴

  x轴和y轴由轴线、刻度、刻度标签、轴标题组成

3. 设置颜色
   - 直接配置外层的color + 系列的colorBy
   - series设置itemStyle的color

4. 