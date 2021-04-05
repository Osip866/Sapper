 //*************************VIEW**************************************
 function View() {
     let myСontainer = null;
     //создаем массив с цветами цифр
     const numberColors = [null, '#009', '#060', '#550', '#808', '#900', '#555', '#055', '#000']

     this.start = function (container) {
         myСontainer = container;
     }
     // Строим таблицу на основании полученных данных
     this.setTable = function () {
         let tbl = document.createElement("table");
         tbl.className = "tablClass";
         for (let j = 0; j < WIDTH; j++) {
             let row = document.createElement("tr");
             for (let i = 0; i < HEIGTS; i++) {
                 let cell = document.createElement("td");
                 cell.className = "cell"
                 cells.push(cell);
                 row.appendChild(cell)
             }
             tbl.appendChild(row)
         }
         myСontainer.appendChild(tbl)
     }
     // открываем бомбы
     this.setBomb = function (x, y) {
         cells[x * WIDTH + y].disabled = true;
         cells[x * WIDTH + y].className = "mine";
     }
     // Открываем флаги которые были установленны неправильно (крестик)
     this.setBadFlags = function (x, y) {
         cells[x * WIDTH + y].className = "mine3";
     }
     // Фатальную бомбу открываем на красном фоне
     this.setFatalBomb = function (index) {
         cells[index].className = "mine2";
         clearInterval(timer);
         this.clickBombs();
     }
     // При победе запускаем окно с водом имени победителя
     this.win = function (nameDiv, overlayName) {
         clearInterval(timer);
         this.wins();
         nameDiv.classList.remove("nameClosed");
         overlayName.classList.remove("modal_closed");
     }
     //открываем цифру с количеством бомб
     this.setCount = function (index, count) {
         // index % WIDTH = column
         if (index % WIDTH <= WIDTH / 2) {
             cells[index].className = "animate__animated animate__backInLeft"
         } else if (index % WIDTH > WIDTH / 2) {
             cells[index].className = "animate__animated animate__backInRight"
         }
         cells[index].innerHTML = count;
         cells[index].style.color = numberColors[count]
         cells[index].classList.add("cellOpen")
     }
     // стилизация открытия ячейки - анимация
     this.setContStyle = function (index) {
         if (index % WIDTH <= WIDTH / 2) {
             cells[index].classList.add("cellClosedL");
         } else if (index % WIDTH > WIDTH / 2) {
             cells[index].classList.add("cellClosedR");
         }
         this.clickSound();
     }
     // отрисовка закрытой ячейки
     this.buttonStyle = function (index) {
         cells[index].className = "buttonOne";
         this.clickSound();
     }
     // отрисовка установленного флага
     this.setFlag = function (index) {
         cells[index].className = "flag";
         flags[index] = true;
         this.clickFlags()
     }

     //музыкальный блок
     let clickAudio = new Audio(src = "./sound/click.mp3");
     let clickFlag = new Audio(src = "./sound/flag.mp3");
     let clickBomb = new Audio(src = "./sound/bomb.mp3");
     let win = new Audio(src = "./sound/win.mp3");
     let butt = new Audio(src = "./sound/button.mp3");
     let fon = new Audio(src = "./sound/fon.mp3");

     this.clickSound = function () {
         clickAudio.currentTime = 0;
         clickAudio.play();
     }

     this.clickFlags = function () {
         clickFlag.currentTime = 0;
         clickFlag.play();
     }

     this.clickBombs = function () {
         clickBomb.currentTime = 0; // в секундах
         clickBomb.play();
     }

     this.wins = function () {
         win.currentTime = 0;
         win.play();
     }

     this.buttonsAudio = function () {
         butt.currentTime = 0;
         butt.play();
     }

     this.fons = function () {
         fon.currentTime = 0;
         fon.play();
         fon.volume = 0.05;
     }
     this.fonsStop = function () {
         fon.currentTime = 0;
         fon.pause();
         fon.volume = 0.05;
     }


 }
 //*************************MODEL************************************** 
 function Model() {
     let myView = null;
     //Создаем переменную с бомбами - массив в который будет записано случайные индексы ячеек с бомбами, в количестве указанном при запуске игры
     let bombs;
     // Создаем переменную - с количеством закрытых ячеек. Изначальна равна количеству всех ячеек
     let closedCount;
     this.start = function (view) {
         myView = view;
     }

     this.startGame = function () {
         // Задаем (высчитываем) количество всех ячеек и создаем массив куда они будут записаны
         cellCount = WIDTH * HEIGTS;
         cells = [];
         flags = [];
         closedCount = cellCount;
         //Создаем переменную с бомбами - массив в который будет записано случайные индексы ячеек с бомбами, в количестве указанном при запуске игры
         bombs = [...Array(cellCount).keys()]
             .sort(() => Math.random() - 0.5)
             .slice(0, BOMBS_COUNT);

         view.setTable();
     }

     //Функция по открытию ячейки.
     this.open = function (row, column) {
         //Если ячейка валидная
         if (!this.isValid(row, column)) return;
         //Определяем из координат индекс и записываем в переменную cell ячейку с заданым индексом
         const index = row * WIDTH + column;
         let cell = cells[index];
         //Если кнопка не нажата
         if (cell.disabled === true) return;
         //Задизэйбливаем ячейку
         cell.disabled = true;
         //***********************************************ПРОЙГРЫШ*********************************** */
         //Если в ячейке бомба ПРОЙГРЫШ
         if (this.isBomb(row, column)) {
             //Проходим по всему полю и открываем все бомбы
             for (let x = 0; x < WIDTH; x++) {
                 for (let y = 0; y < HEIGTS; y++) {
                     //Если установлена бомба, то обозначаем ее знаком бомба
                     if (this.isBomb(x, y)) {
                         myView.setBomb(x, y);
                     }
                     // Если флаг был установлен не на бомбе, то ставми крестик
                     if (flags[x * WIDTH + y] && (!this.isBomb(x, y))) {
                         myView.setBadFlags(x, y);
                     }
                 }
             }
             //бомба которая стала фатальной подсвечивается красным фоном
             myView.setFatalBomb(index);
             return
         }
         //Уменьшаем количество закрытых ячеек
         closedCount--;
         //****************************************************ПОБЕДА*************************************
         //Если количество закрытых ячеек меньше либо равно количеству бомб, значит мы открыли все свободные ячейки.Значит мы победили
         if (closedCount <= BOMBS_COUNT) {
             let nameDiv = document.getElementById("nameDiv");
             let overlayName = document.getElementById("modal-overlay2");
             myView.win(nameDiv, overlayName);
             return;
         };
         // создаем переменную с цифрой - количество бомб вокруг
         let count = this.getCount(row, column);

         //открываем цифру с количеством бомб
         if (count !== 0) {
             function delay() {
                 myView.setCount(index, count);
             }
             setTimeout(delay, 1000);
             myView.setContStyle(index);
             return
         }
         // Если count = 0, то проходимся по соседним ячейкам и открываем их.
         for (let x = -1; x <= 1; x++) {
             for (let y = -1; y <= 1; y++) {
                 this.open(row + y, column + x)
             }
         }
         myView.buttonStyle(index)
     };

     // устанавливаем флаг
     this.flag = function (row, column) {
         if (!this.isValid(row, column)) return;
         let index = row * WIDTH + column;
         let cell = cells[index];
         if (cell.disabled === true) return;
         myView.setFlag(index);
     }

     // проверяем что кликнли на поле с ячейками или нет
     this.isValid = function (row, column) {
         return row >= 0 && row < HEIGTS && column >= 0 && column < WIDTH;
     }

     // определяем открытую ячейку - это бомба или нет
     this.isBomb = function (row, column) {
         if (!this.isValid(row, column)) return false;
         const index = row * WIDTH + column;
         return bombs.includes(index);
     }

     // Высчитываем количество бомб вокруг ячейки
     this.getCount = function (row, column) {
         let count = 0;
         for (let x = -1; x <= 1; x++) {
             for (let y = -1; y <= 1; y++) {
                 if (this.isBomb(row + y, column + x)) {
                     count++;
                 }
             }
         }
         return count;
     }

 }

 //*************************CONTROLLER*********************************
 function Controller() {
     let myModel = null;
     let myContainer = null;
     let index;

     this.start = function (model, container) {
         myModel = model;
         myContainer = container;
         let cells;
         let flags;
         let cellCount;

         let field = document.querySelector(".field");
         //При клике на поле, определяется ячейка на которую нажали и высчитывается ее координата
         field.addEventListener("click", this.levelClick);

         // При клике правой кнопкой мыши устанавливается флаг
         field.addEventListener("contextmenu", this.rigtClick)
     }
     // событие на нажатие левой клавиши мыши
     this.levelClick = function (event) {
         if (event.target.tagName !== "TD") {
             return;
         }
         index = cells.indexOf(event.target);
         let column = index % WIDTH;
         let row = Math.floor(index / WIDTH);
         myModel.open(row, column);
     }
     // событие на нажатие правой клавиши мыши
     this.rigtClick = function (event) {
         event.preventDefault(); // что бы меню не выскакивало по нажатию на правую кнопку
         if (event.target.tagName !== "TD") {
             return;
         }
         index = cells.indexOf(event.target);
         let column = index % WIDTH;
         let row = Math.floor(index / WIDTH);
         myModel.flag(row, column);
     }, false;


 } //*************END CONTROLLER*********************************** */


 // создаём все три компонента
 const model = new Model();
 const view = new View();
 const controller = new Controller();
 // связываем компоненты друг с другом, указывая в каком контейнере/поле им работать
 const container = document.getElementById("field");
 model.start(view);
 view.start(container);
 controller.start(model, container);