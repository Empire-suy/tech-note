// 顺序列表
class ListNode<T> {
  maxLength: number;
  private data: Array<T> = [];
  constructor(length: number) {
    this.maxLength = length;
  }

  // 时间复杂度：O(1)
  get = (index: number) => {
    return this.data[index];
  };

  // 时间复杂度：O(n)
  insert = (index: number, value: T) => {
    if (this.data.length >= this.maxLength) {
      throw new Error('List is full');
    }
    for (let i = this.data.length - 1; i >= index - 1; i--) {
      this.data[i + 1] = this.data[i]!;
    }
    this.data[index] = value;
  };

  // 时间复杂度：O(n)
  delete = (index: number) => {
    let value = this.data[index];
    for (let i = index; i < this.data.length - 1; i++) {
      this.data[i] = this.data[i + 1]!;
    }
    // 处理完之后更新长度
    this.data.length--;
    return value;
  };

  // 时间复杂度：O(1)
  clear = () => {
    this.data.length = 0;
  };

  // 时间复杂度：O(n)
  locate = (value: T) => {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] === value) {
        return i;
      }
    }
    return -1;
  };

  get isEmpty() {
    return this.data.length === 0;
  }

  get length() {
    return this.data.length;
  }
}
