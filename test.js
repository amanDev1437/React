//callback function
// function add(a, b) {
//   return a + b;
// }

// function multiply(a, b) {
//   return a * b;
// }

// function calculate(x, y, operation) {
//   let result = operation(x, y);
//   console.log(result);
// }

//calculate(10, 5, multiply);

//Higer-order function that return a function

// function createAdder(number) {
//   return function (value) {
//     return number + value;
//   };
// }

// const addFive = createAdder(5);
// const result = addFive(2);

// console.log(result);

// //event handler

// const button = document.getElementById("myButton");

// button.addEventListener("click", function () {
//   alert("Button is clicked");
// });

setTimeout(() => {
  console.log("learn JavaScript");
}, 3000);

setInterval(() => {
  console.log("learn java");
}, 3000);
