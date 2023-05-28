# Blob File FileReader

> File对象继承自Blob对象
> lastModified：文件最后修改的时间
> name：文件名

```tsx
/**
 * 常用的mimetype
 * image/jpeg
 * image/png
 * image/gif
 * text/plain
 * text/html
 * text/css
 * text/javascript
 */
const file = new File((Blob | DOMString | ArrayBuffer | ArrayBufferView)[], fileName, options: {type: string = ''; lastModified: number = Date.now()});
```

```tsx
/** 
 * 当图片为jpeg或者webp的时候quality才会生效，否则可能会适得其反
 * callback: 参数是转换后的blob对象
 */
canvas.toBlob((blob) => void, type, quality);
```

```ts
URL.createObjectURL();
URL.revokeObjectURL();

// createObjectURL创建的url不会自动释放，如果确定不需要的话需要手动调用revokeObjectURL进行释放，否则可能会造成内存浪费
```

