//Book Constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

//UI Table Object Constructor
function UI() {

}

//the protoype method take an argument which can be any name
UI.prototype.addToBookList = function (ele) {
	const list = document.querySelector('#book-list');

	//Create a table tr element;
	const tRow = document.createElement('tr');
	//After we have created a row, we create the data that will enter into each column
	tRow.innerHTML = `
		<td>${ele.title}</td>
		<td>${ele.author}</td>
		<td>${ele.isbn}</td>
		<td><a href="#" class="delete">X</a></td>`;

	list.appendChild(tRow);

}

UI.prototype.validatedList = function () {
	const validator = document.querySelector('#result');
	validator.classList.add('error');
	validator.style.display = "block";
	validator.innerHTML = "<p>You need to fill out the form</p>";
	//To clear out our error after 3 secs
	setTimeout(function () {
		validator.style.display = "none";
	}, 3000)

};

UI.prototype.showSuccess = function () {
	const validator = document.querySelector('#result');
//	validator.classList.remove();
	validator.classList.add('success');
	validator.style.display = "block";
	validator.innerHTML = "<p>You have successfully added a book</p>";
	//To clear out our our after 3 secs
	setTimeout(function () {
		validator.style.display = "none";
	}, 3000)
}

UI.prototype.bookRemoved = function (target) {
	const validator = document.querySelector('#result');
	if (target.className === 'delete') {
		validator.classList.add('success');
		validator.style.display = "block";
		validator.innerHTML = "<p>You have successfully deleted a book</p>";
		//To clear out our our after 3 secs
		setTimeout(function () {
			validator.style.display = "none";
		}, 3000)
	}
}

UI.prototype.deleteRow = function (target) {
	if (target.className === 'delete') {
		target.parentElement.parentElement.remove();
	}
}

//To clear the list typed after result is displayed
UI.prototype.clearFields = function () {
	//Intead of repeating our codes here and in the other function, we declare the variables up there
	/*document.querySelector('#title').value = "";
	document.querySelector('#author').value = "";
	document.querySelector('#isbn').value = "";
*/
	title.value = "";
	author.value = "";
	isbn.value = "";
}

//Event Listeners
const formBook = document.querySelector("#form-book");

formBook.addEventListener('submit', function (e) {
	const title = document.querySelector("#title").value;
	const author = document.querySelector('#author').value;
	const isbn = document.querySelector('#isbn').value;

	//We are instantiating a book here. The book constructor has been created above already
	const book = new Book(title, author, isbn);

	//We are instantiating the UI object. THe UI object is the one that holds the result our form submits
	const ui = new UI();

	//To add validation to the data we are entering
	if (title === "" || author === "" || isbn === "") {
		ui.validatedList(book);
	} else {
		//To add to the book list, we create a method 'addToBookList()'
		ui.addToBookList(book);



		ui.showSuccess(book);

	}

	ui.clearFields();






	e.preventDefault();
});

//To delete an entry, we use event delagation 
document.querySelector('#book-list').addEventListener('click', removal);

function removal(e) {
	const ui = new UI();

	ui.deleteRow(e.target);
	ui.bookRemoved(e.target);

	e.preventDefault()
}
