const nameContainer = document.querySelector(".name"); 

function paintInput() {
	const input = document.createElement("input");
	input.type = "text";
	input.className = "name_input"; 
	input.placeholder = "Type your name here"; 

	const form = document.createElement("form");
	form.addEventListener("submit", handleSubmit); 
	form.appendChild(input); 
	nameContainer.appendChild(form);
}



function paintName(name) {
	nameContainer.innerHTML = ""; 
	const title = document.createElement("span"); 
	title.className = "name_text"; 
	title.innerHTML = `Hello ${name}!`;
	nameContainer.appendChild(title); 
	console.log(nameContainer.innerHTML); //<span class="name_text">Hello Jun!</span>
	console.log(title.innerHTML); //Hello Jun!
}

function handleSubmit(event) {
	event.preventDefault();
	const form = event.target; 
	const input = form.querySelector("input");
	const value = input.value; 
	localStorage.setItem("username", value);
	paintName(value);
	console.log(value); //Jun
}


function loadName() {
	const name = localStorage.getItem("username"); 
	if (name === null) {
		paintInput();
	} else {
		paintName(name);
	}
}
 
function init() {
	loadName();
}

init();
