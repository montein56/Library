let formAddStatus = document.getElementById("formAddBook");
let formEditStatus = document.getElementById("formEditBook");
let cards = document.getElementById("cards");
let MyLibrary = localStorage.getItem("MyLibrary");
let editBookID = ""; // store for bookID of book to be edited

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}
// function to toggle between light and dark theme
function changeTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}
// Immediately invoked function to set the theme on initial load
(() => {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }
})();

makeLibrary();

function Book(bookID, title, author, pages, read) { //CONSTRUCTOR FUNCTION
    this.bookID = bookID;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function makeLibrary() {
    if (MyLibrary === null || MyLibrary.length < 3) {//MIGHT NOT EXIST IN LOCAL STORAGE OR COULD BE EMPTY [will have 2 brackets, hence the 3 test]
        alert("\n\nLibrary is either empty or does not exist. \n \nCreating 'local-storage' Library with a sample book");
        const sampleBooks = [];
        const hobbit = new Book(1, "The Hobbit", "Tolkien", 304, false);
        sampleBooks.push(hobbit);
        localStorage.setItem('MyLibrary', JSON.stringify(sampleBooks));
    };
    displayBooks();
}

function displayBooks() {
    // CREATE A CARD FOR EACH BOOK ALREADY IN AN ARRAY OF OBJECTS in'Local Storage'
    cards.innerHTML = "";//clear screen of previous cards display
    collection = JSON.parse(window.localStorage.getItem('MyLibrary'));
    collection.forEach(function (item) {
        let card = document.createElement("card");//parent card element, one per book
        card.setAttribute("id", item.bookID);
        card.classList.add("card");

        let liBookID = document.createElement("cardLine"); //cardLines are children
        liBookID.classList.add("bookID");
        let numBook = document.createTextNode(item.bookID);
        liBookID.appendChild(numBook);
        card.appendChild(liBookID);

        let liTitle = document.createElement("cardLine");
        liTitle.classList.add("bookTitle");
        let txtTitle = document.createTextNode(item.title.toUpperCase());
        liTitle.appendChild(txtTitle);
        card.appendChild(liTitle);

        let liAuthor = document.createElement("cardLine");
        let txtAuthor = document.createTextNode(item.author);
        liAuthor.appendChild(txtAuthor);
        card.appendChild(liAuthor);

        let liPages = document.createElement("cardLine");
        let txtPages = document.createTextNode(item.pages + " pages");
        liPages.appendChild(txtPages);
        card.appendChild(liPages);

        let labelRead = document.createElement("LABEL");
        labelRead.innerHTML = "CLICK if you have read it >>  ";
        labelRead.classList.add("readLabel");
        let inputRead = document.createElement("input");
        inputRead.setAttribute("type", "checkbox");
        inputRead.classList.add("readStatus");
        inputRead.addEventListener('change', toggleRead);
        if (item.read === true) {
            inputRead.checked = true;
            card.classList.add("cardBookRead");
        }
        labelRead.appendChild(inputRead);
        card.appendChild(labelRead);

        let delBtn = document.createElement("deleteIcon"); //to hold garbageCan img
        delBtn.classList.add("garbageCan");
        delBtn.addEventListener('click', deleteBook);
        delBtn.innerHTML = ('<img src="trash.svg" alt="" height="33" width= "22">');
        card.appendChild(delBtn);
        cards.appendChild(card);
    });
}

function hideInputs() {//IN EDIT FORM: To be Unhidden, ONCE TITLE OF BOOK TO BE EDITED IS SELECTED
    let inputsToHide = document.getElementsByClassName("toHide");
    for (let i = 0; i < inputsToHide.length; i++) {
        inputsToHide[i].style.visibility = "hidden";
    }
}

function showForm() {
    document.forms[1].reset();
    document.forms[0].reset();
    hideInputs();
    formAddStatus.style.visibility = "visible";
    formEditStatus.style.visibility = "hidden";
}

function closeForm() {
    document.forms[0].reset();
    formAddStatus.style.visibility = "hidden";
    formEditStatus.style.visibility = "hidden";
    cards.style.display = "grid";
}
function showEditForm() {
    document.forms[0].reset();
    formEditStatus.style.visibility = "visible";
    formAddStatus.style.visibility = "hidden";
}

function closeEditForm() {
    document.getElementById("cards").innerHTML = "";
    document.forms[1].reset();
    formEditStatus.style.visibility = "hidden";
    formAddStatus.style.visibility = "hidden";
    hideInputs();
    displayBooks();
}
const saveBook = (ev) => {
    let collection = JSON.parse(window.localStorage.getItem('MyLibrary'));
    let arrayLength = collection.length;

    //GET VALUES FROM FORM
    let newTitle = document.getElementById("title").value;
    if (newTitle === "") {
        alert("PLEASE ENTER A BOOK TITLE");
        return;
    }
    let newAuthor = document.getElementById("author").value;
    let newPages = document.getElementById("pages").value;
    let readValue = document.getElementById("read").checked;
    if (readValue) {
        newRead = true;
    } else {
        newRead = false;
    }
    const newBook = new Book(arrayLength + 1, newTitle, newAuthor, newPages, newRead);
    collection.push(newBook);
    cards.innerHTML = "";
    localStorage.setItem('MyLibrary', JSON.stringify(collection));
    closeForm();
    displayBooks();
}

function sortIfRead() {
    closeForm();
    closeEditForm();
    let collection = JSON.parse(window.localStorage.getItem('MyLibrary'));
    collection.sort((a, b) => (a.read > b.read) ? 1 : -1);
    localStorage.setItem('MyLibrary', JSON.stringify(collection));
    displayBooks();
}

function sortByTitle() {
    closeForm();
    closeEditForm();
    let collection = JSON.parse(window.localStorage.getItem('MyLibrary'));
    collection.sort(function (a, b) {
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
    });
    localStorage.setItem('MyLibrary', JSON.stringify(collection));
    displayBooks();
}

function sortByAuthor() {
    closeForm();
    closeEditForm();
    let collection = JSON.parse(window.localStorage.getItem('MyLibrary'));
    collection.sort(function (a, b) {
        const nameA = a.author.toUpperCase();
        const nameB = b.author.toUpperCase();
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
    });
    localStorage.setItem('MyLibrary', JSON.stringify(collection));
    displayBooks();

}
function sortByNumber() {
    closeForm();
    closeEditForm();
    let collection = JSON.parse(window.localStorage.getItem('MyLibrary'));
    collection.sort((a, b) => (a.bookID > b.bookID) ? 1 : -1);
    localStorage.setItem('MyLibrary', JSON.stringify(collection));
    displayBooks();
}

function toggleRead(e) {//MUST CHANGE READ STATUS TO YES OR NO IN LOCAL FOLDER
    //THEN RUN DISPLAY AGAIN
    let collection = JSON.parse(window.localStorage.getItem('MyLibrary'));
    // collection.sort((a, b) => (a.bookID > b.bookID) ? 1 : -1);
    let targetID = Number(e.target.parentElement.parentElement.id);
    let indexRequired = collection.findIndex(object => {
        return object.bookID === targetID;
    });

    // let targetElement = e.target.parentElement.parentElement.id - 1;
    if (collection[indexRequired].read === false) {
        collection[indexRequired].read = true;
    } else {
        collection[indexRequired].read = false;
    }
    localStorage.setItem('MyLibrary', JSON.stringify(collection));
    displayBooks();
}

function deleteBook(e) {
    let collection = JSON.parse(window.localStorage.getItem('MyLibrary'));
    if (collection.length <= 1) {
        location.reload();
    }
    let targetID = Number(e.target.parentElement.parentElement.id);
    let indexRequired = collection.findIndex(object => {
        return object.bookID === targetID;
    });
    let removed = collection.splice(indexRequired, 1);
    for (let i = 0; i < collection.length; i++) {
        collection[i].bookID = i + 1;
    }
    cards.innerHTML = "";
    localStorage.setItem('MyLibrary', JSON.stringify(collection));
    displayBooks();
}

function editBook() {
    // GET CURRENT LIST OF BOOK TITLES FROM LOCAL STORAGE AND PUT IN optionsList
    let collection = JSON.parse(window.localStorage.getItem('MyLibrary'));
    let optionsList = '';
    for (let i = 0; i < collection.length; i++) {
        optionsList += '<option value="' + collection[i].title + '" />';
    }
    // POPULATE DATALIST [OPTIONS] ON EDIT FORM'S DROPDOWN WITH optionsList
    let datalistOptions = document.getElementById("datalistOptions");
    datalistOptions.innerHTML = optionsList;
    // LISTEN FOR CHANGE DUE PULLDOWN SELECTION BY USER
    let optionSelected = document.getElementsByName("optionsList");
    for (let i = 0; i < optionSelected.length; i++) {
        optionSelected[i].addEventListener("change", function () {
            //CAPTURE BOOK TITLE SELETED FOR EDITING
            let titleToEdit = document.getElementById("titleEdit");
            titleToEdit.value = this.value;
            titleToEdit.style.visibility = "visible";//WAS EARLIER HIDDEN BY "hideInputs()"
            //GET INDEX OF SELECTED OBJECT[BOOK title] IN ARRAY IN LOCAL STORAGE
            let indexOfBookSelected = collection.findIndex(object => {
                return object.title === titleToEdit.value;
            });
            //UNHIDE REMAINING EDIT FORM FIELDS FROM LOCAL STORAGE
            authorToEdit = document.getElementById("authorEdit");
            authorToEdit.style.visibility = "visible";//WAS EARLIER HIDDEN BY "hideInputs()"
            authorToEdit.value = collection[indexOfBookSelected].author;
            pagesToEdit = document.getElementById("pagesEdit");
            pagesToEdit.style.visibility = "visible";//WAS EARLIER HIDDEN BY "hideInputs()"
            pagesToEdit.value = collection[indexOfBookSelected].pages;
            readToEdit = document.getElementById("readEdit");
            readToEdit.value = collection[indexOfBookSelected].read;
            readToEdit.style.visibility = "visible";//WAS EARLIER HIDDEN BY "hideInputs()"
            if (readToEdit.value === 'Yes') {
                readToEdit.checked = true;
            };
            editBookID = collection[indexOfBookSelected].bookID;//USE INDEX TO NOW GET 'bookId' of book to be edited
        });
        formEditStatus.style.visibility = "visible";
        hideInputs();
    }
}

function saveEdit() {
    let collection = JSON.parse(window.localStorage.getItem('MyLibrary'));
    //GET VALUES FROM FORM
    let editedTitle = document.getElementById("titleEdit").value;
    let editedAuthor = document.getElementById("authorEdit").value;
    let editedPages = document.getElementById("pagesEdit").value;
    let readChecked = document.getElementById("readEdit").checked;
    if (readChecked) {
        editedRead = true;
    } else {
        editedRead = false;
    }

    if (editedTitle === "") {
        alert("PLEASE ENTER A BOOK TITLE");
        return;
    }
    for (const obj of collection) {
        if (obj.bookID === (editBookID)) {
            obj.title = editedTitle;
            obj.author = editedAuthor;
            obj.pages = editedPages;
            obj.read = editedRead;
            break;
        }
    }
    localStorage.setItem('MyLibrary', JSON.stringify(collection));
    closeEditForm();
}