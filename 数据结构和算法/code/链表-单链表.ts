type ListNode<T> = {
  next: ListNode<T> | null;
  value: T | null;
};

class List<T> {
  head: ListNode<T> & { size: number };

  constructor() {
    this.head = {
      size: 0,
      next: null,
      value: null,
    };
  }

  updateSize = (diff = 1) => {
    this.head.size += diff;
  };

  push = (ele: T) => {
    return this.insert(ele, this.head.size);
  };

  insert = (ele: T, index: number) => {
    let nextEle = this.head.next;
    let prevEle: ListNode<T> = this.head;
    let idx = 0;
    let addToTail = false;

    if (index === this.head.size) {
      addToTail = true;
    }

    if (!nextEle) {
      this.head.next = {
        next: null,
        value: ele,
      };
      this.updateSize();
      return this;
    }

    while (nextEle) {
      if (idx === index) {
        const node = { next: nextEle.next, value: ele };
        nextEle.next = node;
        this.updateSize();
        return this;
      }

      idx++;
      prevEle = nextEle;
      nextEle = nextEle.next;
    }

    if (addToTail) {
      prevEle.next = {
        next: null,
        value: ele,
      };
      this.updateSize();
    }

    return this;
  };

  private removeExecutor = (iteratee: (node: { index: number; value: T | null }) => boolean) => {
    let nextEle = this.head.next;
    let prevEle: ListNode<T> = this.head;
    let index = 0;

    if (!this.head.size || !nextEle) {
      return this;
    }

    while (nextEle) {
      if (iteratee({ index, value: nextEle.value })) {
        prevEle.next = nextEle.next;
        this.updateSize(-1);
        return this;
      }

      prevEle = nextEle;
      nextEle = nextEle.next;
      index += 1;
    }

    return this;
  };

  remove = (ele: T) => {
    return this.removeExecutor((node) => node.value === ele);
  };

  removeAt = (index: number) => {
    return this.removeExecutor((node) => node.index === index);
  };

  private getNode = (iteratee: (node: { index: number; value: T | null }) => boolean) => {
    let nextEle = this.head.next;
    let index = 0;

    while (nextEle) {
      if (iteratee({ value: nextEle.value, index })) {
        return nextEle.value;
      }

      index += 1;
      nextEle = nextEle.next;
    }

    return null;
  };

  getNodeAt = (index: number) => {
    return this.getNode((node) => node.index === index);
  };

  getIndexOf = (ele: T) => {
    return this.getNode((node) => node.value === ele);
  };

  getHead = () => {
    return this.head;
  };

  isEmpty = () => {
    return !this.head.size;
  };

  clear = () => {
    this.head.next = null;
    this.head.size = 0;
    return this;
  };

  get size() {
    return this.head.size;
  }
}

export {};
