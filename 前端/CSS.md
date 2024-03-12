#### css技巧

> 如果某个色标的位置值比整个列表中在它之前的色标的位置值都要
> 小，则该色标的位置值会被设置为它前面所有色标位置值的最大值。

1. 垂直条纹
```less
.bg {
  background: linear-gradient(to right, /* 或 90deg */
 #fb3 50%, #58a 0);
  background-size: 30px 100%;
}
```

2. 斜向条纹
```less
.bg {
  background: linear-gradient(45deg,
            #fb3 25%, #58a 0, #58a 50%,
              #fb3 0, #fb3 75%, #58a 0);
  background-size: 30px 30px;
}

// 等价于
.bg {
  background: repeating-linear-gradient(45deg, #fb3, #fb3 15px, #58a 0, #58a 30px);
}

// 等价于
.bg {
  background: repeating-linear-gradient(45deg, #fb3 0 15px, #58a 0 30px);
}
```

3. 实现方格背景
```less
.rect {
  background: #58a;
  background-image: linear-gradient(white 1px, transparent 0), linear-gradient(90deg, white 1px, transparent 0);
  background-size: 40px 40px;
}
```

4. 方格背景
```less
.bg {
  background: white;
  background-image:  linear-gradient(90deg, rgba(200,0,0,.5) 50%, transparent 0), linear-gradient(rgba(200,0,0,.5) 50%, transparent 0);
  background-size: 30px 30px;
}
```

5. 嵌套网格
```less
.bg {
  background: #58a;
  background-image: linear-gradient(white 2px, transparent 0), linear-gradient(90deg, white 2px, transparent 0), linear-gradient(hsla(0,0%,100%,.3) 1px, transparent 0), linear-gradient(90deg, hsla(0,0%,100%,.3) 1px,
  transparent 0);
  background-size: 75px 75px, 75px 75px, 15px 15px, 15px 15px;
}
```

6. 
