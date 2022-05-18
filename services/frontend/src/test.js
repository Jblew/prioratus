const arrayOfTuples = [
  [ "1", 4],
  [ "2", 5],
  [ "4", 1],
  [ "13", 4],
]

arrayOfTuples.sort((a,b) => b[1] - a[1]);
console.log(arrayOfTuples);