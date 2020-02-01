
var postData = [];

// View Module
const ViewModule = (function () {
    const select = {
        inputTitle: document.querySelector('#title'),
        inputDescription: document.querySelector('#description'),
        inputImage: document.querySelector('#image'),
        getDataButton: document.querySelector('#addData'),
        searchInput: document.querySelector('#searchInput')
    }
    
    function addToDom () {
        for (let i = 1; i < localStorage.getItem('counter'); i++ ) {
            const getClassRow = document.getElementById('row');
            let createDiv = document.createElement('div');
            createDiv.className = 'col-md-12';
            createDiv.innerHTML = '<div class = "row">' + '<div class = "col-md-5">' + '<h2>' + ViewModule.inputTitle.value + '</h2>' + '<h3>' + ViewModule.inputDescription.value + '</h3>'  + '</div>'
            + '<div class = "col-md-7">' + '<div class = "images">' + '<img src="' +  ViewModule.inputImage.value + '" alt="Image">' + '</div>' + '</div>'  + '</div>' ;
            
            getClassRow.appendChild(createDiv);
        }
    }

    function displayFromLS () {
        for (let i = 1; i < localStorage.getItem('counter'); i++ ) {
            const getClassRow = document.getElementById('row');
            let createDiv = document.createElement('div');
            createDiv.className = 'col-md-12';
            createDiv.innerHTML = '<div class = "row">' + '<div class = "col-md-5">' + '<h2>' + JSON.parse(localStorage.getItem('post' + i)).title + '</h2>' + '<h3>' + JSON.parse(localStorage.getItem('post' + i)).decription + '</h3>'  + '</div>'
            + '<div class = "col-md-7">' + '<div class = "images">' + '<img src="' +  JSON.parse(localStorage.getItem('post' + i)).image + '" alt="Image">' + '</div>' + '</div>'  + '</div>' ;
            
            getClassRow.appendChild(createDiv);
        }
    }

    return {
        inputTitle: select.inputTitle,
        inputDescription : select.inputDescription,
        inputImage: select.inputImage,
        getDataButton: select.getDataButton,
        addToDom,
        displayFromLS,
        searchInput: select.searchInput
    }


})();

// Local Storage Module
const LsModule = (function () {
    function addToLS () {
        localStorage.setItem('post' + localStorage.getItem('counter'), JSON.stringify({title: ViewModule.inputTitle.value, decription: ViewModule.inputDescription.value, image: ViewModule.inputImage.value}));
        localStorage.setItem('counter', JSON.parse(localStorage.getItem('counter')) + 1);
    }
    
    return {
        addToLS
    }
})();

// Controler Module
const ControlerModule = (function () {
    function insertData() {
        let inputData = ViewModule.inputTitle.value + ViewModule.inputDescription.value + ViewModule.inputImage.value;
        postData.push(inputData);
    }

    function checkIfexistCouter () {
        if (localStorage.getItem('counter')) {

        }
        else (localStorage.setItem('counter', '1'));
    }

    // Searchj
    function searchFunction() {
        console.log("Hy");
    }

    return {
        insertData,
        checkIfexistCouter,
        searchFunction
    }
})();

// Start Module
const StartModule = (function (window) {
    // window.addEventListener('load', alertLoad);
    
    function StartApp() {
        ViewModule.getDataButton.addEventListener('click', afterClick);
    }
    
    function afterClick() {
        console.log(ViewModule.inputTitle.value);
        ControlerModule.insertData();
        ViewModule.addToDom();
        LsModule.addToLS();
    }

    window.addEventListener('load', ControlerModule.checkIfexistCouter());
    window.addEventListener('load', ViewModule.displayFromLS());
    
    // Search
    ViewModule.searchInput.addEventListener('keypress', ControlerModule.searchFunction());
    
    
    return {
        StartApp
    }
})(window);

StartModule.StartApp();