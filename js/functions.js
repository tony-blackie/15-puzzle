function start() {                     //тело
    var a,
        voidArrayElement;
    arrayOfObjects = objectConstructor();       // переменная, в которой хранится массив кубиков




    function objectConstructor() {        //создание кубиков

        var arrayOfObjects = [],
            c,
            sumOuter = 0;
        for (i = 0; i < 16; i += 1) {
            arrayOfObjects[i] = {
                objNumber: i+1
            };
           
            
        }
        arrayOfObjects[15] = {         //пустой кубик
            objNumber: 0
        };
        
        do {
            function randomize(a) {          // shuffle
                return Math.random() - 0.5;
            }

            arrayOfObjects.sort(randomize);
            
            function canBeSolved() {
                var sum = 0,
                    l = 0,
                    i = 0,
                    j = 0,
                    voidBoxRowNumber = 0,
                    numberOfBiggerNumbers = 0,
                    currentNumber = 0;
                //  for (l = 0; l < 16; l += 1) {
                //      alert("element#" + l + "  значение= " + arrayOfObjects[l].objNumber);
                //  }


                for (i = 1; i < 16; i += 1) {    //проверка на присутствие решения
                    numberOfBiggerNumbers = 0;
                    for (j = 0; j < 16; j += 1) {                //find current element

                        if (arrayOfObjects[j].objNumber === i) {
                            currentNumber = j;
                            //        alert("current number=" + currentNumber);
                        }

                    }

                    for (j = currentNumber + 1; j < 16; j += 1) {          // find number of bigger numbers after current one
                        if (arrayOfObjects[j].objNumber < i && arrayOfObjects[j].objNumber !== 0) {
                            numberOfBiggerNumbers += 1;

                        }
                    }
                    //   alert("number of bigger numbers current=" + numberOfBiggerNumbers + "  for element=" + arrayOfObjects[currentNumber].objNumber);
                    sum += numberOfBiggerNumbers;
                }
                for (j = 0; j < 16; j += 1) {                // find empty box
                    if (arrayOfObjects[j].objNumber === 0) {
                        if (j >= 0 && j <= 3) {
                            voidBoxRowNumber = 1;
                        }
                        if (j >= 4 && j <= 7) {
                            voidBoxRowNumber = 2;
                        }
                        if (j >= 8 && j <= 11) {
                            voidBoxRowNumber = 3;
                        }
                        if (j >= 12 && j <= 15) {
                            voidBoxRowNumber = 4;
                        }
                    }
                }
                sum = sum + voidBoxRowNumber;
            //   alert("sum=" + sum + "  voidRow= " + voidBoxRowNumber);

            //   if (sum % 2 === 0) {
              //     alert("решение есть");
                   return sum;
             //   }
            //   else {
               //     alert("решения нет");
             //       return sum;
           //     }
            }
            sumOuter = 0;
            sumOuter = canBeSolved();
       //     alert(sumOuter);
            
        } while ((sumOuter % 2) === 1);


        c = document.getElementById("field15");
        c.setActive;
        (function () {                                 // связать элементы массива и Div'ы
            var a, i;
            for (i = 0; i < 16; i += 1) {
                a = document.getElementById("field" + i);
                a.innerHTML = arrayOfObjects[i].objNumber;
                if (arrayOfObjects[i].objNumber === 0) {
                    $('#field'+i).addClass('invisible');
                }
                else {
                    $('#field' + i).removeClass('invisible');
                }
            }
            
        })();
        return arrayOfObjects;
    }

    function voidSquareFinder() {            //поиск пустого кубика
        var i = 0;
       
        for (i = 0; i < 16; i += 1) {
            if (arrayOfObjects[i].objNumber === 0) {
                return i;                   
            } 
        }

       
    }

    

    document.onkeydown = function key(event) {          //чтение нажатой клавиши

        var emptyArrayElementNumber,
            temp = 0,
            b;

        function boxMover(b) {
            var a, temp;
            temp = arrayOfObjects[emptyArrayElementNumber + b].objNumber;
            arrayOfObjects[emptyArrayElementNumber + b].objNumber = 0;
            arrayOfObjects[emptyArrayElementNumber].objNumber = temp;
            a = document.getElementById("field" + emptyArrayElementNumber);
            a.innerHTML = arrayOfObjects[emptyArrayElementNumber].objNumber;
            $(a).removeClass('invisible');
            a = document.getElementById("field" + (emptyArrayElementNumber + b));
            a.innerHTML = arrayOfObjects[emptyArrayElementNumber + b].objNumber;
            $(a).addClass('invisible');
        }

        // directions of moves are opposite, because movement is programmed for empty square. so when user moves square with a number right, empty square actually moves left

        if (event.keyCode === 39) {                     //right

            emptyArrayElementNumber = voidSquareFinder();

            if (emptyArrayElementNumber !== 0 && emptyArrayElementNumber !== 4 && emptyArrayElementNumber !== 8 && emptyArrayElementNumber !== 12) {
                b = -1;
                boxMover(b);
            }
        }
        if (event.keyCode === 40) {                         //up
            emptyArrayElementNumber = voidSquareFinder();

            if (emptyArrayElementNumber !== 0 && emptyArrayElementNumber !== 1 && emptyArrayElementNumber !== 2 && emptyArrayElementNumber !== 3) {
                b = -4;
                boxMover(b);

            }
        }
        if (event.keyCode === 37) {                         // right
            emptyArrayElementNumber = voidSquareFinder();

            if (emptyArrayElementNumber !== 3 && emptyArrayElementNumber !== 7 && emptyArrayElementNumber !== 11 && emptyArrayElementNumber !== 15) {
                b = 1;
                boxMover(b);
            }
        }
        if (event.keyCode === 38) {                         // down
            emptyArrayElementNumber = voidSquareFinder();

            if (emptyArrayElementNumber !== 12 && emptyArrayElementNumber !== 13 && emptyArrayElementNumber !== 14 && emptyArrayElementNumber !== 15) {
                b = 4;
                boxMover(b);

            }
        }

    };
    
    document.onclick = function (event) {

        var contains,
            clickedBox,
            placeInArray,
            emptyArrayElementNumber,
            i = 0,
            b = 0;


        clickedBox = event.target;
        contains = parseInt(clickedBox.innerHTML, 10);
        //  alert("contains=" + contains);
        for (i = 0; i < 16; i += 1) {
            if (arrayOfObjects[i].objNumber === contains) {
                placeInArray = parseInt(i, 10);
                //    alert("placeInarray=" + placeInArray);

            }
        }

        emptyArrayElementNumber = voidSquareFinder();
        //  alert("emptyArrayElementNumber=" + emptyArrayElementNumber);
        //  alert("arrayOfObjects[placeInArray + 1].objNumber = " + arrayOfObjects[placeInArray + 1].objNumber);
        function boxMover(b) {
            var a, temp;
            temp = arrayOfObjects[emptyArrayElementNumber + b].objNumber;
            arrayOfObjects[emptyArrayElementNumber + b].objNumber = 0;
            arrayOfObjects[emptyArrayElementNumber].objNumber = temp;
            a = document.getElementById("field" + emptyArrayElementNumber);
            a.innerHTML = arrayOfObjects[emptyArrayElementNumber].objNumber;
            $(a).removeClass('invisible');
            a = document.getElementById("field" + (emptyArrayElementNumber + b));
            a.innerHTML = arrayOfObjects[emptyArrayElementNumber + b].objNumber;
            $(a).addClass('invisible');
        }

        function completionChecker() {
            var i,
                counter = 0;

            for (i = 1; i < 16; i += 1) {
                if (arrayOfObjects[i - 1].objNumber !== i) {
                    //   alert("fail");
                    break;
                } else {
                    counter += 1;
                }
                if (counter === 15) {
                    alert("You won!");
                }
            }
        }
        //   alert("placeInArray  " + placeInArray);

        if (placeInArray !== 3 && placeInArray !== 7 && placeInArray !== 11 && placeInArray !== 15) {
            if (arrayOfObjects[placeInArray + 1].objNumber === 0) {
                //  alert("moving right");
                b = -1;
                boxMover(b);
                completionChecker();
            }
        }


        if (placeInArray !== 0 && placeInArray !== 4 && placeInArray !== 8 && placeInArray !== 12) {
            if (arrayOfObjects[placeInArray - 1].objNumber === 0) {
                //   alert("moving left");
                b = 1;
                boxMover(b);
                completionChecker();
            }
        }

        if (placeInArray !== 12 && placeInArray !== 13 && placeInArray !== 14 && placeInArray !== 15) {
            if (arrayOfObjects[placeInArray + 4].objNumber === 0) {
                //   alert("moving down");
                b = -4;
                boxMover(b);
                completionChecker();
            }
        }

        if (placeInArray !== 0 && placeInArray !== 1 && placeInArray !== 2 && placeInArray !== 3) {

            if (arrayOfObjects[placeInArray - 4].objNumber === 0) {
                //    alert("moving up");
                b = 4;
                boxMover(b);
                completionChecker();
            }
        }


    };
    
   
    
    
}
