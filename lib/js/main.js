const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
button.addEventListener("click",updateDB);

//Set database object here
const database = firebase.database().ref();

/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    const username        = usernameElement.value;
    const message         = messageElement.value;

    usernameElement.value = "";
    messageElement.value  = "";

    console.log(username + " : " + message);

    //Update database here
    const value = {
        // key (Column): value (Row)
        NAME: username,
        MESSAGE: message
    };

    // stores the new object in the database
    database.push(value);
}

// Set database "child_added" event listener here
database.on('child_added', addMessageToBoard);

function addMessageToBoard (rowData) {
    // rowData received the child that was just added to the database
    const row = rowData.val();

    // Have strings
    const name = row.NAME;
    const message = row.MESSAGE;

    const messagesContainer = document.querySelector('.allMessages');

    // Create and Append a paragraph will the message in it
    const pElement = document.createElement('p');

    // Change the text/HTML inside of pElement
    pElement.innerText = name + ': ' + message

    // Append pElement somewhere in HTML
    messagesContainer.appendChild(pElement);
}