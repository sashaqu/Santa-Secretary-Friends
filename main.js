// 1
function santaCandies(X, Y, Z, W) {
  let count = 0; // Here we will store the counter, that is, the number of combinations.

  for(let i = 0; i <= W/X; i++) { // Cycle to W/X because we can’t have more options than the first position to take W / X times
    let interX = i*X; // Intermediate variable for increasing the number of candies by i at each iteration
    for(let j = 0; j <= (W - interX)/Y; j++) { // With (W - intertX) / Y such. (W - inerX) - how much Santa can take if he has already taken candy (W - inerX) / Y. 
      let interY = j*Y; // Intermediate variable, how much we took manadarin.
      let interZ = W - (interX + interY); // How many apples do we have? How many apples do we have - (mandarin + candy)
      if(interZ % Z == 0) { // If this number is divided by integer by Z, then this will be one way.
        count++; // Add 1 way.
      }
    }
  }

  return count;
}

console.log('santa= ', santaCandies(10, 25, 15, 40));

// 2

// console.log(Math.max(1,1));

function secretaryJeniffer(x, y, N) {
  let max = Math.max(x,y), // Maximum x or y
      min = Math.min(x,y), // min x or y
      timer = min, // Time, what we will return
      it = 0, // Intermediate variable for determining the time.
      count = 1; // The number of copies.
  // console.log('timerBeforeWhile: ', timer);

  if (N == 1) { // If you had to make 1 copies, then our time is the minimum printer speed
    return min;
  } else {
    while(1) {
      timer += min; // A minimum of time has passed before the first copy.

      count++; // Добавилась очередная копия
      // console.log('count++: ', count);

      if (count == N) {
        // return time; // Вернули наше время.
        break; // Вышли из цикла, поскольку копий уже хватает.
      }

      it += min; // Прошло минимум min секунд, закидываем это в it.

      // console.log('it+=min: ', it);
      count += Math.floor(it/max); // Пришла копия с ксерокса, который медленнее.
      // console.log('count+= Math.floor(it/max): ', count);

      if (count == N) {
        // return time; // Вернули наше время.
        break; // Вышли из цикла, поскольку копий уже хватает.
      }

      it %= max; // В it хранится остаток от деления на то кол-во секунд сколько прошло. То есть если первый 6, второй 8, то на второй итерации цикла будет 6.
    }
  }

  return timer;
}

console.log('timer= ', secretaryJeniffer(60, 60, 4));

// 3

// let random = Math.random().toFixed();
// console.log(random); // Либо 1 либо 0.

function matrixArray(rows,columns){
  let arr = [];
  for(let i=0; i<rows; i++){
    arr[i] = [];
    for(let j=0; j<columns; j++){
      arr[i][j] = 0;//вместо i+j+1 пишем любой наполнитель. В простейшем случае - null
    }
  }

  for(let i=0; i<rows; i++){
    for(let j=i; j<columns; j++){
      if (i == j) {
        arr[i][j] = arr[j][i] = 0;
      } else {
        arr[i][j] = arr[j][i] = +Math.random().toFixed();
      }
    }
  }

  return arr;
} // This function creates a symmetric matrix of friends.

let N = 5, S = 3; // Input parameters N and S

let myMatrix = matrixArray(N,N); // Create a matrix of friendships in the company

let myMatrix2 = [];

for(let i=0;i < N; i++) { // Create a copy of the matrix above in order to check the program
  myMatrix2[i] = myMatrix[i].slice();
}

console.log(myMatrix2); // Output the matrix that was originally created.
console.log(myMatrix); // We display the matrix on the screen, which eventually turned out after the implementation of our algorithm.
var bool = []; // auxiliary array of boolean values. In order to know on which line we were already, and on which not. So that our algorithm does not go in cycles.

for(let i = 0; i < N; i++) { // Fill this array with false
  bool[i] = false;
}

function goRowsAndFindOne(N, S) { // Our function that solves the problem
  var countFriend = 0; // Friends counter, in this variable we will count the number of friends of the person S
  bool[S] = true; //On the line number on which we already called the function, we put the flag true in the bool array

  for(let i = 0; i < N; i++) { // We go along the line S and look for 1)
    if(myMatrix[S][i] !== 0 && bool[i] == false) { // When in place of [S][i] we found 1 and at the same time on this line we were not yet we get into the body of the conditional operator
      countFriend++; // If we met 1, then we already have a friend, the score is added

      myMatrix[i][S] = 0; // If we found 1 on [S][i], then we are friends with the person number 'i', which means that [i][S] needs to be nullified.

      countFriend += goRowsAndFindOne(N, i); // At this moment, when we found 1 on the place [S] [i] we call the same function with parameters (N, i) in order to go along that line and find the friends of our friend 'i'.

    }
  }

  return countFriend;
}

let ans = goRowsAndFindOne(N, S-1);

console.log('Ответ: ', ans);