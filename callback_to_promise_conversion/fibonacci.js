const promise1 = function (number) {
  return new Promise((resolve, reject) => {
    if (number <= 2) {
      resolve(1);
    } else {
      resolve(fib(number - 1) + fib(number - 2));
    }
  });
};

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

promise1(30).then(complete).catch(fail);
