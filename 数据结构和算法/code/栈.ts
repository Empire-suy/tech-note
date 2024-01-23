class Stack<T> {
  data: T[];

  push = (value: T) => {
    this.data.push(value);
  };

  pop = () => {
    return this.data.pop();
  };

  isEmpty = () => {
    return !!this.size;
  };

  get size() {
    return this.data.length;
  }
}
