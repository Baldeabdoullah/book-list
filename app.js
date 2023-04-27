// Book class: Represente a book

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Ui class
class UI {
  static displayBooks() {
    const books = Stored.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
    <td> ${book.title} </td>
     <td> ${book.author} </td>
      <td> ${book.isbn} </td>
       <td> <i class="fa-solid fa-trash fa-2x delete cursor"></i> </td>
       
    
    `;
    list.appendChild(row);
  }

  // <td> <a href="#" class="btn btn-danger btn-sm delete ">  </a> </td>

  // supprimer unelement

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  // creer une alert bootstrap

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    // enlever le message d'alert apres 3secondes
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  // vider le comtenu des input apres submit

  static clearFields() {
    document.querySelector("#title").value = " ";
    document.querySelector("#author").value = " ";
    document.querySelector("#isbn").value = " ";
  }
}

//Store class: Handles Storage

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (books.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//Event: display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event: add a book

document.querySelector("#book-form").addEventListener("submit", (e) => {
  // prevent actual submit

  e.preventDefault();
  // get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // valider les donnees
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in  all field", "btn btn-danger");
  } else {
    // Instantiate book
    const book = new Book(title, author, isbn);
    // add book to UI
    UI.addBookToList(book);

    // add book to store
    Store.addBook(book);

    // Message de succes
    UI.showAlert("Book Added", " btn btn-success");

    // clear field
    UI.clearFields();
  }
});

// event : remove a book

document.querySelector("#book-list").addEventListener("click", (e) => {
  // Remove books from UI
  UI.deleteBook(e.target);

  //Remove book from the store

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Message de supression de livre
  UI.showAlert("Book Removed", "btn btn-primary");
});
