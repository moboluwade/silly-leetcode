export function plusMinus(arr: number[]): void {
  function checkPositive(value: number): boolean {
    return value > 0 ? true : false;
  }
  function checkNegative(value: number): boolean {
    return value < 0 ? true : false;
  }
  function checkZero(value: number): boolean {
    return value === 0 ? true : false;
  }
  function to6Decimalp(value: number): number {
    return Number(value.toFixed(6));
  }
  // Write your code here
  const total = arr.length;
  let positiveCount = 0;
  let zeroCount = 0;
  let negativeCount = 0;

  arr.forEach((value) => {
    if (checkZero(value)) zeroCount++;

    if (checkPositive(value)) {
      positiveCount++;
    }

    if (checkNegative(value)) {
      negativeCount++;
    }
  });

  console.log(to6Decimalp(positiveCount / total));
  console.log(to6Decimalp(negativeCount / total));
  console.log(to6Decimalp(zeroCount / total));
}
