// 单链表
class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;
  constructor(data: T) {
    this.data = data;
  }
}

class SingleLinkedListNode<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;

  constructor() {
    this.tail = new ListNode<T>(null as any);
    this.head = new ListNode<T>(null as any);
    this.head.next = this.tail;
  }

  get = (index: number) => {
    let current = this.head;
    for (let i = 0; i < index && current; i++) {
      current = current.next;
    }
    if (!current || current === this.tail) {
      throw new Error('Index out of bounds');
    }
    return current.data;
  };

  insert = (index: number, value: T) => {
    let current = this.head;
    for (let i = 0; i < index && current; i++) {
      current = current.next;
    }
    if (!current) {
      throw new Error('Index out of bounds');
    }
    let newNode = new ListNode<T>(value);
    newNode.next = current.next;
    current.next = newNode;
  };

  delete = (value: T) => {
    let current = this.head;
    while (current && current.next) {
      if (current.next.data === value) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  };

  clear = () => {
    let current = this.head;
    while (current && current.next && current.next !== this.tail) {
      current.next = current.next.next;
    }
    return true;
  };
}
