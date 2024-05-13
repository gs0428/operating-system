class Queue {
  constructor() {
    this.state = [];
    this.queueId = 1;
  }

  enqueue(data) {
    this.state.push(data);
  }

  dequeue() {
    if (!this.isEmpty()) {
      // 가장 짧은 computing_time을 가진 프로세스를 찾아서 반환
      let shortestIndex = 0;
      this.state.forEach((data, index) => {
        if (data.computing_time < this.state[shortestIndex].computing_time) {
          shortestIndex = index;
        }
      });
      return this.state.splice(shortestIndex, 1)[0];
    }
  }

  isEmpty() {
    return this.state.length === 0;
  }
}

module.exports = Queue;
