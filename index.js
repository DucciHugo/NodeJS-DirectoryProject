const { table, Console } = require('console');

const readline = require('readline').createInterface({ 
    input: process.stdin,
    output: process.stdout
});

const contact = {
    id: 0,
    firstName: '',
    lastName: '',
    number: ''
};

const listOfContacts = [];
console.log('Hey sir im your directory ! \n Enter /help for display my different command \n Otherwise simply enter a command for start using me \n')
const ask = () => {
    readline.question('Command: ', function (answer) {
        switch (answer) {
            case "/help":
                console.log(`There is the details of differents commands available\n/help : Display all the commands available\n/stop : Quit your loved application\n/add : Add a new contact in your directory\n/list : List all the contacts you have in your loved directory\n/delete : Delete one your contact by specifiying his ID`);
                break;
            case "/stop":
                console.log("Closing the application.")
                readline.close()
                break;
            case "/add":
                const con = {...contact}
                con.id=listOfContacts.length+1;
                console.log("Let's add a new contact !")
                addfirstName(con);
                break;
            case"/list":
                console.log("Here is the list of your contacts :")
                console.log("-----------------------")
                fullContact();
                break;
            case"/delete":
                console.log("This is how to delete a contact from your directory !\nGet the ID of your contact with /list\nThen use /delete to delete it from your directory \n")
                deleteContact();
                break;

            default:
                console.log("Unknown command !")
                break;
        }
        ask();
    });
};

ask();

const addfirstName = (con) => {
    readline.question('What is the first name of your contact ?', (firstname)  => {
    con.firstName=firstname;
    addlastName(con)
    })}

const addlastName= (con) => {
    readline.question('What is the family name of your contact ?', (lastname)  => {
    con.lastName=lastname;
    addNumber(con)
})}

const addNumber= (con) => {
    readline.question(`What is the phone number of ${con.firstName} ${con.lastName}`, (number)  => {
    con.number=number;
    listOfContacts.push(con)
    ask();
})}

const fullContact = () => {
    if(listOfContacts.length == 0){
        console.log("You don't have any contacts !")
    } else {
        listOfContacts.forEach(element => {
            console.log(`ID : ${element.id} ==> ${element.firstName} ${element.lastName}\nphone: ${element.number}`)
        });
    } 
}

const deleteContact = () => {
    readline.question("What is the id of the contact you want to delete" ,(id)  => {
        const index = listOfContacts.findIndex((e) => e.id === parseInt(id, 10))
        if (index === -1) {
            console.log("Contact hasn't been found.")
            deleteContact()
            return;
        }
        listOfContacts.splice(index, 1)
    ask();    
    })
}