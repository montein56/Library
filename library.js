let formStatus = document.getElementById("formAddBook");
let cards = document.getElementById("cards");
let MyLibrary = localStorage.getItem("MyLibrary");

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

function Book(bookID, title, author, pages, read) {
    this.bookID = bookID;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function makeLibrary() {
    if (MyLibrary === null || MyLibrary.length < 3) {
        alert("\n\nLibrary is either empty or does not exist. \n \nCreating 'local-storage' Library with a sample book");
        const sampleBooks = [];
        const hobbit = new Book(1, "The Hobbit", "Tolkien", 244, "No");
        sampleBooks.push(hobbit);
        localStorage.setItem('MyLibrary', JSON.stringify(sampleBooks));
    };
    displayBooks();
}

function displayBooks() {
    // CREATE A CARD FOR EACH BOOK IN 'Local Storage' array
    let collection = JSON.parse(window.localStorage.getItem('MyLibrary'));
    collection.forEach(function (item) {
        let ul = document.createElement("ul");
        ul.setAttribute("id", item.bookID);
        ul.classList.add("ul");

        let liBookID = document.createElement("li"); //to hold book number
        liBookID.classList.add("bookID");
        let numBook = document.createTextNode(item.bookID);
        liBookID.appendChild(numBook);
        ul.appendChild(liBookID);

        let liTitle = document.createElement("li");
        liTitle.classList.add("bookTitle");
        let txtTitle = document.createTextNode(item.title.toUpperCase());
        liTitle.appendChild(txtTitle);
        ul.appendChild(liTitle);

        let liAuthor = document.createElement("li");
        let txtAuthor = document.createTextNode(item.author);
        liAuthor.appendChild(txtAuthor);
        ul.appendChild(liAuthor);

        let liPages = document.createElement("li");
        let txtPages = document.createTextNode(item.pages + " pages");
        liPages.appendChild(txtPages);
        ul.appendChild(liPages);

        let labelRead = document.createElement("LABEL");
        labelRead.innerHTML = "CLICK if you have read it >>  ";
        labelRead.classList.add("readLabel");
        let inputRead = document.createElement("input");
        inputRead.setAttribute("type", "checkbox");
        inputRead.classList.add("readStatus");
        if (item.read === "Yes") {
            inputRead.checked = true;
            ul.classList.add("ulBookRead");
        }

        labelRead.appendChild(inputRead);
        ul.appendChild(labelRead);

        let delBtn = document.createElement("deleteIcon"); //to hold garbageCan pic
        delBtn.classList.add("garbageCan");
        delBtn.innerHTML = ('<img src="trash.svg" alt="" height="33" width= "22">');
        ul.appendChild(delBtn);
        cards.appendChild(ul);
    });
}

function showForm() {
    formStatus.style.visibility = "visible";
}

function closeForm() {
    document.forms[0].reset();
    formStatus.style.visibility = "hidden";
    cards.style.display = "grid";
    location.reload();
}

const saveBook = (ev) => {
    // ev.preventDefault();
    let collection = JSON.parse(window.localStorage.getItem('MyLibrary'));
    let arrayLength = collection.length;

    //GET VALUES FROM FORM
    let newTitle = document.getElementById("title").value;
    let newAuthor = document.getElementById("author").value;
    let newPages = document.getElementById("pages").value;

    //IF CHECKBOX IS CHECKED, STORE "YES" ELSE "NO"
    let readValue = document.getElementById("read").checked;
    if (readValue) {
        newRead = "Yes";
    } else {
        newRead = "No";
    }
    const newBook = new Book(arrayLength + 1, newTitle, newAuthor, newPages, newRead);
    collection.push(newBook);
    cards.innerHTML = "";
    localStorage.setItem('MyLibrary', JSON.stringify(collection));
    closeForm();
}

function sortIfRead() {
    let collection = JSON.parse(window.localStorage.getItem('MyLibrary'));
    collection.sort((a, b) => (a.read > b.read) ? 1 : -1);
    localStorage.setItem('MyLibrary', JSON.stringify(collection));
    location.reload();
}
function sortByTitle() {
    let collection = JSON.parse(window.localStorage.getItem('MyLibrary'));
    collection.sort(function (a, b) {
        const nameA = a.title.toUpperCase(); // ignore upper and lowercase
        const nameB = b.title.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    });
    localStorage.setItem('MyLibrary', JSON.stringify(collection));
    location.reload();
}
function sortByAuthor() {
    let collection = JSON.parse(window.localStorage.getItem('MyLibrary'));
    collection.sort(function (a, b) {
        const nameA = a.author.toUpperCase(); // ignore upper and lowercase
        const nameB = b.author.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        // names must be equal
        return 0;
    });
    localStorage.setItem('MyLibrary', JSON.stringify(collection));
    location.reload();
}
function sortByNumber() {
    let collection = JSON.parse(window.localStorage.getItem('MyLibrary'));
    collection.sort((a, b) => (a.bookID > b.bookID) ? 1 : -1);
    localStorage.setItem('MyLibrary', JSON.stringify(collection));
    location.reload();
}

function toggleRead(e) {
    //MUST CHANGE READ STATUS TO YES OR NO IN LOCAL FOLDER
    //THEN RUN DISPLAY AGAIN
    alert("The Library will be sorted by number");
    let collection = JSON.parse(window.localStorage.getItem('MyLibrary'));


    collection.sort((a, b) => (a.bookID > b.bookID) ? 1 : -1);

    // let targetElement = collection.indexOf(e);
    let targetElement = e.target.parentElement.parentElement.id - 1;
    if (collection[targetElement].read === "No") {
        collection[targetElement].read = "Yes";
    } else {
        collection[targetElement].read = "No";
    }
    localStorage.setItem('MyLibrary', JSON.stringify(collection));
    location.reload();
}

function deleteBook(e) {
    alert("The Library will be sorted by number");
    let collection = JSON.parse(window.localStorage.getItem('MyLibrary'));
    // let targetElement = collection.indexOf(e.target.parentElement.parentElement.parentElement.parentElement);

    collection.sort((a, b) => (a.bookID > b.bookID) ? 1 : -1);
    // let targetElement = indexOf(e.target);
    let targetElement = e.target.parentElement.parentElement.id;
    if (collection.length <= 1) {
        location.reload();
    }
    let removed = collection.splice(targetElement - 1, 1);
    for (let i = 0; i < collection.length; i++) {
        collection[i].bookID = i + 1;
    }
    cards.innerHTML = "";
    localStorage.setItem('MyLibrary', JSON.stringify(collection));
    location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    let elementsDelete = document.getElementsByClassName("garbageCan");
    for (let i = 0; i < elementsDelete.length; i++) {
        elementsDelete[i].addEventListener('click', deleteBook);
    };
    let elementsCheckbox = document.getElementsByClassName("readStatus");
    for (let i = 0; i < elementsCheckbox.length; i++) {
        elementsCheckbox[i].addEventListener('change', toggleRead);
    };
});