let fromDropdown = document.getElementById("fromDropdown")
let toDropDown = document.getElementById("toDropDown")
let ConvertBtn = document.getElementById("ConvertBtn")
let textAreaEl = document.getElementById("textAreaEl")
let userInput = document.getElementById("userInput")
let errorMsg = document.getElementById("errorMsg")
// above lines are dynamically used for the html Element by id attributes

function fromAndToElement(i) {
    // create and append the "from" id option lists
    let FromOption = document.createElement("option")
    fromDropdown.appendChild(FromOption)
    FromOption.textContent = i

    // create and append the "to" id option lists
    let toOption = document.createElement("option")
    toDropDown.appendChild(toOption)
    toOption.textContent = i
}

/* fetch the data
put the option method*/
let option = {
    method: "GET", // get method for read the fetched data from url 
    headers: {
        "Content-type": "application/json",
        Accept: 'application/json', //accept types
        Authorization: "Bearer 45e0fd84f3864900580c6824" // Authorization method
    }

}


// fetch the data by url and Authorization key 
fetch("https://v6.exchangerate-api.com/v6/45e0fd84f3864900580c6824/latest/USD", option)
    .then(function(response) { //call the function from url and take the response
        return response.json() //return the json response to next function
    })
    .then(function(jsondata) { // its return the object
        let object_keys_and_values = jsondata.conversion_rates // its gives conversion_rates by dot notation method
        let object_keys = Object.keys(object_keys_and_values) // its gives only keys of  conversion_rates
        // call the function to create option Element
        for (let i of object_keys) {
            fromAndToElement(i)
        }
        // this button function is convert to value of currency and display in the textarea       
        ConvertBtn.addEventListener("click", function(event) {
            textAreaEl.value = '' //this line is used for refresh the user number input 

            let fromkeys = (fromDropdown.value) // get value of 'from' currency option
            let toKeys = (toDropDown.value) // get value of 'to' currency option

            let fromCurrencyValue = object_keys_and_values[fromkeys]
            let toCurrencyValue = object_keys_and_values[toKeys]

            // if userInput is empty display the error msg 
            if (userInput.value === '') {
                alert("enter the Currency Value")
                errorMsg.textContent = "enter the Currency Value"
            }

            // else excuded the next lines of code to prevent the non value of user input
            errorMsg.textContent = "" // refresh the errorMsg 

            // these below line are math calculation of converting currency
            let usdValue = (1 / fromCurrencyValue * parseInt(userInput.value))
            textAreaEl.value = (usdValue * toCurrencyValue)
            userInput.value = ''


        })
    })