const fs = require("fs");
const Queue = require("./class/queue");

const input = fs.readFileSync("./input.txt").toString().trim().split("\n");

const queue = new Queue();

let currentTime = 0;
let totalTurnAroundTime = 0;
let totalNormalizedTurnAroundTime = 0;
let processCount = 1;

const executeSPN = (type) => {
  // 입력 받는 중에 실행되는지 확인
  const isInit = type === "init";
  while (!queue.isEmpty()) {
    const process = queue.dequeue();

    if (isInit && currentTime + process.computing_time - 20 > processCount * 20) {
      queue.enqueue(process);
      break;
    }

    currentTime += process.computing_time; // 프로세스 연산 시간만큼 시간 증가
    const turnAroundTime = currentTime - (process.queue_group - 1) * 20;
    const normalizedTurnAroundTime = turnAroundTime / process.computing_time;
    totalTurnAroundTime += turnAroundTime;
    totalNormalizedTurnAroundTime += normalizedTurnAroundTime;

    console.log(`${process.process_id}\t\tQ${process.queue_group}\t\t${process.priority}\t\t${process.computing_time}\t\t${turnAroundTime}`);
  }
};

console.log("process_id\tqueue_id\tpriority\tcomputing_time\tturn_around time");

input.forEach((i) => {
  const data = i.split(" ").map((x) => +x);
  const [mode, process_id, priority, computing_time] = data;
  if (mode === 0) {
    // 프로세스 추가
    queue.enqueue({ process_id, priority, computing_time, queue_group: processCount });
  } else if (mode === 1) {
    // 입력 모드가 1일 때 큐에 있는 데이터들을 대상으로 SPN 실행
    executeSPN("init");
    processCount++;
  }
});

executeSPN("clear");

if (processCount > 0) {
  const averageNormalizedTurnAroundTime = totalNormalizedTurnAroundTime / processCount;
  console.log(`SPN's Average normalized turn_around_time: ${averageNormalizedTurnAroundTime.toFixed(2)}`);
}
