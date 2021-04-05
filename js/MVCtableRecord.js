//*************************VIEW**************************************
function ViewTable() {
    let myСontainer = null;

    this.start = function (containerTable) {
        myСontainer = containerTable;
    }
    // Строим таблицу с рекордами
    this.tableRView = function (img, massSort, tableRecord1) {
        img.classList.add("nameClosed");

        let ul = document.createElement("ul");
        for (let i = 0; i < massSort.length; i++) {
            let namePlayers = massSort[i].namePlayer;
            let resultMinuts = Math.floor(massSort[i].timeGame / 60);
            let resultSeconds = massSort[i].timeGame % 60
            let score = resultMinuts + " : " + modelTable.updateTime(resultSeconds);

            let li = document.createElement("li");
            let tbl = document.createElement("table");
            let tr = document.createElement("tr");
            let n = document.createElement("td");
            n.classList.add("statistic1");
            n.innerText = i + 1;
            tr.appendChild(n);
            let td1 = document.createElement("td");
            td1.classList.add("statistic");
            let td2 = document.createElement("td");
            td2.classList.add("statistic");
            td1.innerText = namePlayers;
            td2.innerText = score;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tbl.appendChild(tr);
            li.appendChild(tbl);
            ul.appendChild(li);
        }
        tableRecord1.appendChild(ul);
    }
    // выводим время игры на экран
    this.timer = function () {
        document.getElementById('timer').innerHTML = modelTable.updateTime(minut) + ":" + modelTable.updateTime(secs);
    }
}

//*************************MODEL************************************** 
function ModelTable() {
    let myView = null;

    this.start = function (viewTable) {
        myView = viewTable;
    }

    this.start = function (modelTable, containerTable) {
        myModel = modelTable;
        myContainer = containerTable;
    }
    // Записываем имя, время и уровень в firebase
    this.fire2 = function (level, nameWin) {
        let fire = firebase.database().ref(nameWin.value);
        fire.set({
            Time: minut * 60 + secs,
            Level: level,
        });
    }
    // создаем три массива и вносим туда данные из баззы данных
    firebase.database().ref().on('value', function (snapshot) {
        massNewbie.length = 0;
        massAmateur.length = 0;
        massProfessional.length = 0;
        snapshot.forEach(function (childSnapshot) {
            data = childSnapshot.val();
            let childKey = childSnapshot.key;
            let childData = childSnapshot.val();
            let childTime = childData.Time;
            let childLevel = childData.Level;
            let obj = {};
            obj.namePlayer = childKey;
            obj.timeGame = childTime;
            obj.levelGame = childLevel;

            if (childLevel == 1) {
                massNewbie.push(obj);
            } else if (childLevel == 2) {
                massAmateur.push(obj);
            } else if (childLevel == 3) {
                massProfessional.push(obj);
            } else {
                return
            };
        });

    })

    this.tableR = function (i) {
        // let tableRecord = document.getElementById("recordId");
        let tableRecord1 = document.getElementById("recordId1");
        let img = document.getElementById("img");

        //сортируем массив по времени игры
        let massSort = massVariant[i].sort(function (a, b) {
            return a.timeGame - b.timeGame
        });

        // Устанавливаем длинну массива, который будет отображаться в таблице рекордов.
        if (massSort.length > 10) {
            massSort.length = 10;
        } else {
            massSort.length <= 10
        }
        viewTable.tableRView(img, massSort, tableRecord1);
    }
    // таймер игры
    this.startTimer = function () {
        if (timer) clearInterval(timer);
        viewTable.timer();
        timer = setInterval(
            function () {
                secs++;
                if (secs > 59) {
                    minut++
                    secs = 0;
                }
                viewTable.timer();
            },
            1000
        );
    }
    // добавляем 0 к цифрам меньше 10
    this.updateTime = function (a) {
        if (a < 10) {
            return "0" + a;
        } else {
            return a;
        }
    }
}


//*************************CONTROLLER*********************************
function ControllerTable() {
    let myModel = null;
    let myContainer = null;

    this.start = function (modelTable, containerTable) {
        myModel = modelTable;
        myContainer = containerTable;
    }

} //*************END CONTROLLER*********************************** */


// создаём все три компонента
const modelTable = new ModelTable();
const viewTable = new ViewTable();
const controllerTable = new ControllerTable();
// связываем компоненты друг с другом, указывая в каком контейнере/поле им работать
const containerTable = document.getElementById("field");
modelTable.start(viewTable);
viewTable.start(containerTable);
controllerTable.start(modelTable, containerTable);