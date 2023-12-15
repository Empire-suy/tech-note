class ListNode<T> {
  deleted: boolean;

  constructor(public data: T, public cur: number) {
    this.deleted = false;
  }
}

class StaticLinkList<T> {
  data: ListNode<T | null>[];
  length: number;
  maxSize: number;

  constructor(length: number) {
    this.data = Array.from({ length: length + 2 }).map((_, idx) => new ListNode<T | null>(null, idx + 1));
    this.data[length + 1].cur = 0;
    this.length = 0;
    this.maxSize = length;
  }

  // 分配下标
  allocate = () => {
    const i = this.data[0].cur;

    // 最后cur=0，已经没有可用的位置
    if (i) {
      this.data[0].cur = this.data[i].cur;
    }

    return i;
  };

  // 释放节点
  free = (i: number) => {
    this.data[i].cur = this.data[0].cur;
    this.data[i].deleted = true;
    this.data[0].cur = i;
  };

  insert = (data: T, i: number) => {
    if (i < 1 || i > this.length + 1) {
      return false;
    }

    const j = this.allocate();
    if (!j) {
      return false;
    }

    let k = this.maxSize + 1;
    this.data[j].data = data;
    this.data[j].deleted = false;
    // 数组中最后一个元素的游标指向第一个元素位置
    for (let m = 1; m <= i - 1; m++) {
      k = this.data[k].cur;
    }
    this.data[j].cur = this.data[k].cur;
    this.data[k].cur = j;
    this.length += 1;

    return true;
  };

  delete = (i: number) => {
    if (i < 1 || i > this.length + 1) {
      return false;
    }

    if (this.data[i].deleted) {
      return true;
    }

    // 前一个元素的索引
    let k = this.maxSize + 1;
    for (let j = 1; j <= i - 1; j++) {
      k = this.data[k].cur;
    }
    // 修改前一个元素游标
    const cur = this.data[k].cur;
    this.data[k].cur = this.data[cur].cur;
    this.free(cur);
    this.length -= 1;
  };
}

const list = new StaticLinkList(10);
list.insert(1, 1);
list.insert(2, 2);
list.insert(1, 4);
list.insert(3, 3);
list.insert(4, 2);
// console.log('end');

list.delete(1);
list.delete(1);
list.delete(2);
console.log(3);
