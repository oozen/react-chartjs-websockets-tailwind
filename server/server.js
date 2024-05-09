const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] }
});

const port = 4000;

const data = {
  chart1: [15, 85],
  chart2: [90000, 67000, 36000, 74000, 123000, 110000, 140000],
  chart3: { up: [40, 45, 47, 55, 59, 62, 65, 67, 72, 76], down: [18, 22, 27, 29, 34, 39, 41, 44, 48, 51] },
  chart4: [40, 25, 67, 85, 9, 32, 85, 97, 72],
  chart5: {
    first: [18, 82],
    second: [25, 75],
    third: [30, 70],
    fourth: [34, 66]
  },
  chart6: [20, 45, 36, 74, 88, 91, 57, 16],
  chart7: {
    first: [
      { x: 500, y: 226 },
      { x: 250, y: 602 },
      { x: 735, y: 329 },
      { x: 500, y: 910 },
      { x: 1132, y: 1255 },
      { x: 1100, y: 370 },
      { x: 458, y: 1224 },
      { x: 1490, y: 690 }
    ],
    second: [
      { x: 160, y: 296 },
      { x: 340, y: 802 },
      { x: 730, y: 320 },
      { x: 1000, y: 910 },
      { x: 1234, y: 1080 },
      { x: 1300, y: 1570 },
      { x: 1120, y: 1320 },
      { x: 1605, y: 270 }
    ],
    third: [
      { x: 170, y: 1256 },
      { x: 50, y: 72 },
      { x: 675, y: 2320 },
      { x: 1000, y: 346 },
      { x: 150, y: 155 },
      { x: 100, y: 1240 },
      { x: 1150, y: 1120 },
      { x: 1000, y: 230 }
    ],
    fourth: [
      { x: 1000, y: 1256 },
      { x: 50, y: 623 },
      { x: 260, y: 510 },
      { x: 908, y: 910 },
      { x: 1240, y: 1255 },
      { x: 1350, y: 1170 },
      { x: 1870, y: 1420 },
      { x: 1400, y: 149 }
    ]
  }
};

function randomlyChangeValues(arr, min, max) {
  let plusOrMinus, randomNumber;
  const result = arr.map(function (item, index) {
    randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    item = Math.floor(randomNumber + randomNumber * 0.1 * plusOrMinus);
    return Math.floor(item);
  });

  return result;
}

function changeValuesBy2(arr) {
  let plusOrMinus;
  const result = arr.map(function (item, index) {
    plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    item = Math.floor(item + 2 * plusOrMinus);
    return Math.floor(item);
  });

  return result;
}

function increaseChart1Value(arr) {
  const value = Math.floor(arr[0] + Math.floor(Math.random() * (20 - 5 + 1) + 5));
  if (value <= 100) {
    arr[0] = value;
    arr[1] = 100 - value;
  } else {
    arr = [15, 85];
  }

  return arr;
}

function randomlyChangeChart7Values(arr, min, max) {
  let plusOrMinus, randomNumber;
  const result = arr.map(function (item, index) {
    randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    item.x = Math.floor(randomNumber + randomNumber * 0.1 * plusOrMinus);

    randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    item.y = Math.floor(randomNumber + randomNumber * 0.1 * plusOrMinus - 350);

    return item;
  });

  return result;
}

io.on("connection", (socket) => {
  socket.on("getInitialData", () => {
    io.emit("initialChartDatas", {
      chart1: data.chart1,
      chart2: data.chart2,
      chart3: data.chart3,
      chart4: data.chart4,
      chart5: data.chart5,
      chart6: data.chart6,
      chart7: data.chart7
    });
  });

  socket.on("updateData", () => {
    data.chart1 = increaseChart1Value(data.chart1);
    data.chart2 = randomlyChangeValues(data.chart2, 5000, 150000);
    data.chart3.up = changeValuesBy2(data.chart3.up);
    data.chart3.down = changeValuesBy2(data.chart3.down);
    data.chart4 = randomlyChangeValues(data.chart4, 5, 90);

    data.chart5.first = increaseChart1Value(data.chart5.first);
    data.chart5.second = increaseChart1Value(data.chart5.second);
    data.chart5.third = increaseChart1Value(data.chart5.third);
    data.chart5.fourth = increaseChart1Value(data.chart5.fourth);

    data.chart6 = randomlyChangeValues(data.chart6, 5, 110);

    data.chart7.first = randomlyChangeChart7Values(data.chart7.first, 100, 1800);
    data.chart7.second = randomlyChangeChart7Values(data.chart7.second, 100, 1800);
    data.chart7.third = randomlyChangeChart7Values(data.chart7.third, 100, 1800);
    data.chart7.fourth = randomlyChangeChart7Values(data.chart7.fourth, 100, 1800);

    io.emit("updatedChartDatas", {
      chart1: data.chart1,
      chart2: data.chart2,
      chart3: data.chart3,
      chart4: data.chart4,
      chart5: data.chart5,
      chart6: data.chart6,
      chart7: data.chart7
    });
  });

  socket.on("disconnect", () => {
    socket.disconnect(socket.id);
    io.emit("disconnected", socket.id);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
