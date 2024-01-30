const search = () => {
    const inputValue = document.getElementById("zipCodeInput").value;
    const img = document.getElementById("imgResult");
    const code = document.getElementById("result");

    if(inputValue !== "") {
        var client = new XMLHttpRequest();
        client.open("GET", `http://api.zippopotam.us/us/${inputValue}`, true);
        client.onreadystatechange = () => {
            if(client.readyState == 4) {
                if(client.status === 200) {
                    const response = JSON.parse(client.responseText);
                    const { places } = response;
                    code.textContent = JSON.stringify(response, null, 2);
                    document.getElementById("result-container").classList.remove("hide");
                    img.src = `./states/${places[0]["state abbreviation"]}.svg`;
                    img.alt = `${places[0]["state"]} logo`;
                } else {
                    document.getElementById("result-container").classList.add("hide");
                    alert("The code you are looking for does not exist.")
                }
            };
        };
        client.send();
    } else {
        alert("Please enter a zip code.");
    }
}