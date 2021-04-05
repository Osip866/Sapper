//*************************VIEW**************************************
function ViewStart() {
    let myСontainer = null;

    this.start = function (containerStart) {
        myСontainer = containerStart;
    }

    this.startView = function (mains, game) {
        mains.classList.add("modal_closed");
        game.classList.remove("modal_closed");
        game.classList.add("startGame");
    }
    this.settingView = function (overlaySettings, settings) {
        overlaySettings.classList.remove("modal_closed");
        settings.classList.remove("modal_closed");
    }
    this.regulationsView = function (modal, overlay) {
        overlay.classList.remove("modal_closed");
        modal.classList.remove("modal_closed");
    }
    this.modalCloseView = function (modal, overlay) {
        overlay.classList.add("modal_closed");
        modal.classList.add("modal_closed");
    }
    this.closeView = function (settings, overlaySettings) {
        settings.classList.add("modal_closed");
        overlaySettings.classList.add("modal_closed");
    }
    this.close2View = function (nameDiv, overlayName) {
        nameDiv.classList.add("nameClosed");
        overlayName.classList.add("modal_closed");
    }
    this.close3View = function (overlayTable, tableRecord) {
        overlayTable.classList.add("modal_closed")
        tableRecord.classList.add("nameClosed");
    }
    this.resetView = function () {
        container.innerHTML = " ";
    }
    this.recordView = function (overlayTable, tableRecord, img, tableRecord1, newbieButt) {
        overlayTable.classList.remove("modal_closed")
        tableRecord.classList.remove("nameClosed");
        img.classList.remove("nameClosed");
        tableRecord1.innerText = "";
        setTimeout(function () {
            img.classList.add("nameClosed");
            modelTable.tableR(0);
            newbieButt.disabled = true;
        }, 2000);
    }
    this.newbieButtView = function (tableRecord1, newbieButt, amateurButt, professionalButt) {
        tableRecord1.innerText = "";
        setTimeout(modelTable.tableR(0), 3000);
        newbieButt.disabled = true;
        amateurButt.disabled = false;
        professionalButt.disabled = false;
    }
    this.amateurButtView = function (tableRecord1, newbieButt, amateurButt, professionalButt) {
        tableRecord1.innerText = "";
        setTimeout(modelTable.tableR(1), 3000);
        newbieButt.disabled = false;
        amateurButt.disabled = true;
        professionalButt.disabled = false;
    }
    this.professionalButtView = function (tableRecord1, newbieButt, amateurButt, professionalButt) {
        tableRecord1.innerText = "";
        setTimeout(modelTable.tableR(2), 3000);
        newbieButt.disabled = false;
        amateurButt.disabled = false;
        professionalButt.disabled = true;
    }
    this.closeGameView = function (mains, game) {
        mains.classList.remove("modal_closed");
        game.classList.add("modal_closed");
        game.classList.remove("startGame");
        container.innerHTML = " ";
    }
    this.newbieView = function (newbie, amateur, professional, inputWidth, inputHeigt, inputBombs) {
        newbie.disabled = true;
        amateur.disabled = false;
        professional.disabled = false;
        inputWidth.value = "";
        inputHeigt.value = "";
        inputBombs.value = "";
    }
    this.amateurView = function (newbie, amateur, professional, inputWidth, inputHeigt, inputBombs) {
        newbie.disabled = false;
        amateur.disabled = true;
        professional.disabled = false;
        inputWidth.value = "";
        inputHeigt.value = "";
        inputBombs.value = "";
    }
    this.professionalView = function (newbie, amateur, professional, inputWidth, inputHeigt, inputBombs) {
        newbie.disabled = false;
        amateur.disabled = false;
        professional.disabled = true;
        inputWidth.value = "";
        inputHeigt.value = "";
        inputBombs.value = "";
    }
    this.inputView = function (newbie, amateur, professional) {
        newbie.disabled = false;
        amateur.disabled = false;
        professional.disabled = false;
    }
    this.okView = function (nameDiv, overlayName) {
        nameDiv.classList.add("nameClosed");
        overlayName.classList.add("modal_closed");
    }
    this.musicView = function (musicId) {
        musicId.classList.remove("music");
        musicId.classList.add("musicPlay")
    }
    this.musicViewStop = function (musicId) {
        musicId.classList.add("music");
        musicId.classList.remove("musicPlay")
    }

}
//*************************MODEL************************************** 
function ModelStart() {
    let myView = null;


    this.start = function (viewStart) {
        myView = viewStart;

    }

    this.startModel = function (mains, game, musicId) {
        model.startGame();
        minut = 0;
        secs = 0;
        // start_timer();
        modelTable.startTimer();
        viewStart.startView(mains, game);
        view.fons();
        viewStart.musicView(musicId);
        view.buttonsAudio();
    }
    this.settingModel = function (overlaySettings, settings) {
        viewStart.settingView(overlaySettings, settings);
        view.buttonsAudio();
    }
    this.regulationsModel = function (modal, overlay) {
        viewStart.regulationsView(modal, overlay);
        view.buttonsAudio();
    }
    this.modalCloseModel = function (modal, overlay) {
        viewStart.modalCloseView(modal, overlay);
        view.buttonsAudio();
    }
    this.closeModel = function (settings, overlaySettings) {
        viewStart.closeView(settings, overlaySettings);
        view.buttonsAudio();
    }
    this.close2Model = function (nameDiv, overlayName) {
        viewStart.close2View(nameDiv, overlayName);
        view.buttonsAudio();
    }
    this.close3Model = function (overlayTable, tableRecord) {
        viewStart.close3View(overlayTable, tableRecord);
        view.buttonsAudio();
    }
    this.resetModel = function () {
        viewStart.resetView();
        clearInterval(timer);
        model.startGame();
        minut = 0;
        secs = 0;
        // start_timer();
        modelTable.startTimer();
        view.buttonsAudio();
    }
    this.recordModel = function (overlayTable, tableRecord, img, tableRecord1, newbieButt) {
        viewStart.recordView(overlayTable, tableRecord, img, tableRecord1, newbieButt);
        view.buttonsAudio();
    }
    this.newbieButtModel = function (tableRecord1, newbieButt, amateurButt, professionalButt) {
        viewStart.newbieButtView(tableRecord1, newbieButt, amateurButt, professionalButt);
        view.buttonsAudio();
    }
    this.amateurButtModel = function (tableRecord1, newbieButt, amateurButt, professionalButt) {
        viewStart.amateurButtView(tableRecord1, newbieButt, amateurButt, professionalButt);
        view.buttonsAudio();
    }
    this.professionalButtModel = function (tableRecord1, newbieButt, amateurButt, professionalButt) {
        viewStart.professionalButtView(tableRecord1, newbieButt, amateurButt, professionalButt);
        view.buttonsAudio();
    }
    this.closeGameModel = function (mains, game) {
        viewStart.closeGameView(mains, game);
        clearInterval(timer);
        minut = 0;
        secs = 0;
        view.buttonsAudio();
    }
    this.newbieModel = function (newbie, amateur, professional, inputWidth, inputHeigt, inputBombs) {
        viewStart.newbieView(newbie, amateur, professional, inputWidth, inputHeigt, inputBombs);
        WIDTH = 8;
        HEIGTS = 8;
        BOMBS_COUNT = 8;
        level = 1;
        view.buttonsAudio();
    }

    this.amateurModel = function (newbie, amateur, professional, inputWidth, inputHeigt, inputBombs) {
        viewStart.amateurView(newbie, amateur, professional, inputWidth, inputHeigt, inputBombs)
        WIDTH = 10;
        HEIGTS = 10;
        BOMBS_COUNT = 15;
        level = 2;
        view.buttonsAudio();
    }
    this.professionalModel = function (newbie, amateur, professional, inputWidth, inputHeigt, inputBombs) {
        viewStart.professionalView(newbie, amateur, professional, inputWidth, inputHeigt, inputBombs)
        WIDTH = 12;
        HEIGTS = 12;
        BOMBS_COUNT = 25;
        level = 3;
        view.buttonsAudio();
    }
    this.inputWidthModel = function (newbie, amateur, professional, inputWidth) {
        viewStart.inputView(newbie, amateur, professional);
        WIDTH = inputWidth.value;
        level = 0;
        view.buttonsAudio();
    }
    this.inputHeigtModel = function (newbie, amateur, professional, inputHeigt) {
        viewStart.inputView(newbie, amateur, professional);
        HEIGTS = inputHeigt.value;
        level = 0;
        view.buttonsAudio();
    }
    this.inputBombsModel = function (newbie, amateur, professional, inputBombs) {
        viewStart.inputView(newbie, amateur, professional);
        BOMBS_COUNT = inputBombs.value;
        level = 0;
        view.buttonsAudio();
    }

    this.okModel = function (nameDiv, overlayName, nameWin) {
        viewStart.okView(nameDiv, overlayName);
        modelTable.fire2(level, nameWin);
        view.buttonsAudio()
    }
    this.musicModel = function (musicId) {
        let musicClass = document.getElementById("music").classList;
        if (musicClass.contains("musicPlay")) {
            view.fonsStop()
            viewStart.musicViewStop(musicId)
        } else {
            viewStart.musicView(musicId);
            view.fons();
        }
    }

}

//*************************CONTROLLER*********************************
function ControllerStart() {
    let myModel = null;
    let myContainer = null;

    this.start = function (modelStart, containerStart) {
        myModel = modelStart;
        myContainer = containerStart;

        const start = document.getElementById("start");
        const mains = document.getElementById("main");
        const game = document.getElementById("startGame");

        const newbie = document.getElementById("newbie");
        const amateur = document.getElementById("amateur");
        const professional = document.getElementById("professional");

        const settings = document.getElementById("settingsBtn");
        const setting = document.getElementById("settings");
        const regulations = document.getElementById("modal-open")
        const modal = document.getElementById("modal")
        const overlay = document.getElementById("modal-overlay");
        const overlaySettings = document.getElementById("modal-overlay1");
        const overlayName = document.getElementById("modal-overlay2");
        const overlayTable = document.getElementById("modal-overlay3");
        const modalClose = document.getElementById("modal-close");
        const close = document.getElementById("close");
        const close2 = document.getElementById("close2");
        const close3 = document.getElementById("close3");
        const closeGame = document.getElementById("closeGame");
        const inputWidth = document.getElementById("cellHeigt");
        const inputHeigt = document.getElementById("cellWidth");
        const inputBombs = document.getElementById("bombs");
        const ok = document.getElementById("ok");
        const nameDiv = document.getElementById("nameDiv");
        const musicId = document.getElementById("music");

        const tableRecord = document.getElementById("recordId");
        const tableRecord1 = document.getElementById("recordId1");
        const record = document.getElementById("record");
        const img = document.getElementById("img");
        const reset = document.getElementById("reset");

        const newbieButt = document.getElementById("newbieButt");
        const amateurButt = document.getElementById("amateurButt");
        const professionalButt = document.getElementById("professionalButt");

        const nameWin = document.getElementById("nameInput");

        // let tableRecord = document.getElementById("recordId");
        // let tableRecord1 = document.getElementById("recordId1");
        // let nameWin = document.getElementById("nameInput");
        start.addEventListener("click", function () {
            modelStart.startModel(mains, game, musicId);
        });

        setting.addEventListener("click", function () {
            modelStart.settingModel(overlaySettings, settings);
        });
        regulations.addEventListener("click", function () {
            modelStart.regulationsModel(modal, overlay);
        })
        modalClose.addEventListener("click", function () {
            modelStart.modalCloseModel(modal, overlay);
        })
        //закрытие настроек
        close.addEventListener("click", function () {
            modelStart.closeModel(settings, overlaySettings);
        });

        close2.addEventListener("click", function () {
            modelStart.close2Model(nameDiv, overlayName);
        });

        close3.addEventListener("click", function () {
            modelStart.close3Model(overlayTable, tableRecord);
        });

        reset.addEventListener("click", function () {
            modelStart.resetModel(minut, secs);
        })

        record.addEventListener("click", function () {
            modelStart.recordModel(overlayTable, tableRecord, img, tableRecord1, newbieButt);
        })

        newbieButt.addEventListener("click", function () {
            modelStart.newbieButtModel(tableRecord1, newbieButt, amateurButt, professionalButt);
        });

        amateurButt.addEventListener("click", function () {
            modelStart.amateurButtModel(tableRecord1, newbieButt, amateurButt, professionalButt);
        });

        professionalButt.addEventListener("click", function () {
            modelStart.professionalButtModel(tableRecord1, newbieButt, amateurButt, professionalButt);
        });

        closeGame.addEventListener("click", function () {
            modelStart.closeGameModel(mains, game);
        })

        newbie.addEventListener("click", function () {
            modelStart.newbieModel(newbie, amateur, professional, inputWidth, inputHeigt, inputBombs);
        })

        amateur.addEventListener("click", function () {
            modelStart.amateurModel(newbie, amateur, professional, inputWidth, inputHeigt, inputBombs)
        })

        professional.addEventListener("click", function () {
            modelStart.professionalModel(newbie, amateur, professional, inputWidth, inputHeigt, inputBombs);
        })

        inputWidth.addEventListener("input", function () {
            modelStart.inputWidthModel(newbie, amateur, professional, inputWidth);
        })

        inputHeigt.addEventListener("input", function () {
            modelStart.inputHeigtModel(newbie, amateur, professional, inputHeigt);
        })

        inputBombs.addEventListener("input", function () {
            modelStart.inputBombsModel(newbie, amateur, professional, inputBombs);
        })

        ok.addEventListener("click", function () {
            modelStart.okModel(nameDiv, overlayName, nameWin);
        })
        musicId.addEventListener("click", function () {
            modelStart.musicModel(musicId);
        })

    }
} //*************END CONTROLLER*********************************** */


// создаём все три компонента
const modelStart = new ModelStart();
const viewStart = new ViewStart();
const controllerStart = new ControllerStart();
// связываем компоненты друг с другом, указывая в каком контейнере/поле им работать
const containerStart = document.getElementById("field");
let WIDTH = 8;
let HEIGTS = 8;
let BOMBS_COUNT = 8;
let level = 1;
let minut = 0;
let secs = 0;
let massNewbie = [];
let massAmateur = [];
let massProfessional = [];
let massVariant = [massNewbie, massAmateur, massProfessional];

modelStart.start(viewStart);
viewStart.start(containerStart);
controllerStart.start(modelStart, containerStart);