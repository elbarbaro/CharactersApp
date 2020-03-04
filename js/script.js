var formCharacter = document.getElementById("formCharacter");

var txtName = formCharacter.elements.txtName;
var txtDescription = formCharacter.elements.txtDescription;
var txtCartoon = formCharacter.elements.txtCartoon;
var txtImage = formCharacter.elements.txtImage;

formCharacter.onsubmit = launchRequestData;

function createFormData(){
	var characterData = {
		name: txtName.value,
		description: txtDescription.value,
		cartoon: txtCartoon.value
	};

	return JSON.stringify(characterData);
}

function launchRequestData(e){
	e.preventDefault();

	var characterData = createFormData();
	var url = "http://localhost:8080/characters";
	var request = new XMLHttpRequest();
	request.onreadystatechange = processFormResponse;
	request.open("POST", url);
	request.setRequestHeader("Content-Type", "application/json"); // 1
	request.send(characterData);
}

function launchRequestFile(){
	var imageFile = txtImage.files[0];

    // https://developer.mozilla.org/es/docs/Web/Guide/Usando_Objetos_FormData
	var formData = new FormData();
	formData.append("file", imageFile);

	var url = "http://localhost:8080/characters/uploadfile";
	var request = new XMLHttpRequest();
	request.onreadystatechange = processFileResponse;
	request.open("POST", url);
	//request.setRequestHeader("Content-Type", "multipart/form-data")
	request.send(formData);
}

function launchRequestFullData() {
	var imageFile = txtImage.files[0];
	var formData = new FormData();
	formData.append("test", "param");
	formData.append("file", imageFile);

	var url = "http://localhost:8080/characters/uploadfile";
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 201){
			console.log(this.responseText);
		}
	}
	request.open("POST", url);
	request.send(formData);
}

function processFormResponse(){
	if(this.readyState == 4 && this.status == 201){
		console.log(this.responseText);
		launchRequestFile();
	}
}

function processFileResponse(){
	if(this.readyState == 4 && this.status == 201){
		console.log(this.responseText);
	}
}




