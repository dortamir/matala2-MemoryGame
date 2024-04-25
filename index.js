

function submitForm() {
    event.preventDefault();

    const nameInputElement = document.getElementById('fullName');
    const CardsNumberInputElement = document.getElementById('cardsNumber');

    const fullName = nameInputElement.value;
    const cardsNumber = CardsNumberInputElement.value;

    console.log('fullName', fullName);
    console.log('cardsNumber', cardsNumber);

    if(validatesUserInputs(fullName, cardsNumber)){
    
        alert("Full Name: " + fullName + "\nCards Number: " + cardsNumber);
        redirectToNewPage();
    }
}


function validatesUserInputs(fullName, cardsNumber) {
    let isInputsValid = true;

    if (!fullName) {
        alert('Please enter full name')
        isInputsValid = false;
    }
    else if (!cardsNumber || (cardsNumber <= 1 && cardsNumber >= 30)) {
        alert('Please enter valid number between 1 to 30');
        isInputsValid = false;
    }

    return isInputsValid;
}

function redirectToNewPage() {
    window.location.href = "game.html";
}
