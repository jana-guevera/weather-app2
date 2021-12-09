const form = document.querySelector("#weather-form");
const addressInput = document.querySelector("#address");
const message1 = document.querySelector(".message-1");
const message2 = document.querySelector(".message-2");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    message1.textContent = "Loading...."
    message2.textContent = "";
    message1.classList.remove("error");

    const address = addressInput.value;

    if(address.length === 0){
        message1.textContent = "Please provide an address!";
        message1.classList.add("error");
    }else{
        fetch("http://localhost:3000/weather?address=" + address).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    message1.textContent = data.error;
                    message1.classList.add("error");
                }else{
                    message1.textContent = data.location;
                    message2.textContent = data.forecast;
                }
            });
        });
    }
});
