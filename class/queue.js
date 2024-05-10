class Queue {
  constructor() {
    this.state = [];
  }

  enqueue(data) {
    this.state.push(data);
  }

  dequeue() {
    return this.state.shift();
  }

  isEmpty() {
    return this.state.length === 0;
  }
}

module.exports = Queue;
