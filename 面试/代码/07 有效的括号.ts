const str = '((3)()())';
function isValid(str: string) {
  const stack: Array<string> = [];

  for (const s of str) {
    if (s === '(') {
      stack.push(s);
      continue;
    }

    if (s === ')') {
      if (stack.length) {
        stack.pop();
        continue;
      }

      return false;
    }
  }

  return !stack.length;
}
