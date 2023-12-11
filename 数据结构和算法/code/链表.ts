// @ts-nocheck

class List<T> {
  head;

  constructor() {
    this.head = {
      size: 0,
      next: null,
      value: null,
    };
  }

  forEach = (cb: (ele: T, index: number) => void) => {
    let nextEle = this.head.next;
    let index = 0;

    while (nextEle) {
      cb(nextEle, index);
      nextEle = nextEle.next;
      index++;
    }
  };

  push = (ele: T) => {
    let nextEle = this.head.next;
    let prevEle = this.head;

    while (nextEle) {
      prevEle = nextEle;
      nextEle = nextEle.next;
    }

    if (!nextEle) {
      prevEle.next = {
        next: null,
        value: ele,
      };
      this.head.size++;
    }
  };

  insert = (ele: T, index: number) => {
    let nextEle = this.head.next;
    let prevEle = this.head;
    let idx = 0;

    // TODO: 这里需要考虑一些边界值
    while (nextEle) {
      if (idx === index) {
        const node = { next: nextEle.next, value: ele };
        prevEle.next = node;
      }

      idx++;
      prevEle = nextEle;
      nextEle = nextEle.next;
    }

    return this;
  };

  remove = (ele) => {};

  removeAt = (index) => {};

  getNodeAt = (index) => {};

  getIndexOf = (ele) => {};

  getHead = () => {
    return this.head;
  };

  get size() {
    return this.head.size;
  }
}

const list = new List<number>();
// list.push(2);
// list.push(3);
list.push(6);
console.log('size', list.size);
