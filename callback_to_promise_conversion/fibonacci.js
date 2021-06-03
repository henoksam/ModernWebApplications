const fib = function (number) {
  if (number <= 2) {
    return 1;
  } else {
    return fib(number - 1) + fib(number - 2);
  }
};

function complete(response) {
  console.log("The answer is: " + response);
}

function fail(response) {
  console.log("Error occured");
}

console.log("Fibonacci of 45 is: " + fib(45));
