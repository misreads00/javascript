const form = document.querySelector(".todo");
const input = document.querySelector(".add_todo");
const list = document.querySelector(".todo_list");

let toDos = [];

/*
순서 
loadToDos(): forEach - addTodo(toDo.value)
addTodo(text) - list.appendChild(toDo)
saveToDo(text) - push value: dddd
persistToDos()
addTodo(text) - saveToDo(text) : dddd
onSubmit(event)
*/

function persistToDos() {
	const stringToDo = JSON.stringify(toDos); 
	localStorage.setItem("toDos", stringToDo); 
	console.log("persistToDos()");
	//console.log(toDos); //[{…}]
	//console.log(stringToDo); //[{"id":1,"value":"dd"}]
}

function saveToDo(text) {
	const toDoObject = {
		id: toDos.length + 1,
		value: text
	}; 
	toDos.push(toDoObject);
	console.log(`saveToDo(text) - push value: ${text}`);
	persistToDos();
}

function handleDelete(event) {
	const li = event.target.parentElement; 
	const ul = li.parentElement; 

	ul.removeChild(li); 
	console.log(`handleDelete(event) - removeChild id: ${li.id}`); 
	toDos = toDos.filter(function(toDo) {
		return toDo.id !== parseInt(li.id);
	});
	console.log('handleDelete(event) - filter');
	persistToDos();
}

function addTodo(text) {
	const toDo = document.createElement("li"); 
	toDo.className = "toDo";
	toDo.id = toDos.length + 1; 

	const deleteBtn = document.createElement("span"); 
	deleteBtn.innerHTML = "x"; 
	deleteBtn.className = "toDo_button"; 
	deleteBtn.addEventListener("click", handleDelete); 

	const label = document.createElement("label"); 
	label.innerHTML = text; 
	toDo.appendChild(label);
	toDo.appendChild(deleteBtn); 
	list.appendChild(toDo); 
	console.log("addTodo(text) - list.appendChild(toDo)");

	saveToDo(text);
	console.log(`addTodo(text) - saveToDo(text) : ${text}`);
}



function onSubmit(event) {
	event.preventDefault();
	const value = input.value; 
	input.value = "";
	addTodo(value); 
	console.log("onSubmit(event)");
}

form.addEventListener("submit", onSubmit); 

function loadToDos() {
	const loadedToDos = localStorage.getItem("toDos"); 
	if (loadedToDos !== null) {
		const parsedToDos = JSON.parse(loadedToDos); 
		parsedToDos.forEach(function(toDo) {
			addTodo(toDo.value); 
		});
		console.log("loadToDos(): forEach - addTodo(toDo.value)");
	}
	return;
}



function init() {
	loadToDos();
}

init();