const search = () => {
    const inputValue = document.getElementById("zip-code-input").value;
    const resultContainer = document.getElementById("result-container");

    if(inputValue !== "") {
        if(resultContainer.firstChild){
            resetResultContainer(resultContainer);
        }    
        var client = new XMLHttpRequest();
        client.open("GET", `http://api.zippopotam.us/us/${inputValue}`, true);
        client.onreadystatechange = () => {
            if(client.readyState == 4) {
                if(client.status === 200) {
                    resultContainer.classList.remove("hide");
                    const response = JSON.parse(client.responseText);
                    createImg(resultContainer, response["places"][0]["state abbreviation"]);
                    for (const [key, value] of Object.entries(response)) {
                        if (key !== "places") {
                            fillResultContainer(resultContainer, key, value);
                        } else {
                            const placeName = value.map((info) => info['place name']).join(", ");
                            const coords = value.map((info) => `(${info['longitude']}, ${info['latitude']})`).join(", ");
                            const state = value.map((info) => info['state abbreviation']).join(", ");
                            fillResultContainer(resultContainer, "place names", placeName);
                            fillResultContainer(resultContainer, "coordinates", coords);
                            fillResultContainer(resultContainer, "states", state);
                        }
                    }
                } else {
                    resultContainer.classList.add("hide");
                    alert("The code you are looking for does not exist.");
                }
            };
        };
        client.send();
    } else {
        alert("Please enter a zip code.");
    }
}

const fillResultContainer = (node, key, value) => {
    const keyElement = document.createElement("h2");
    const valueElement = document.createElement("p");
    const newRow = document.createElement("div");
    keyElement.textContent = `${key}:`;
    valueElement.textContent = value
    newRow.appendChild(keyElement);
    newRow.appendChild(valueElement);
    newRow.classList.add("row-value");
    node.appendChild(newRow);
}

const createImg = (node, state) => {
    const imgContainer = document.createElement("img");
    imgContainer.src = `./states/${state}.svg`;
    imgContainer.alt = "State logo";
    imgContainer.height = 300;
    imgContainer.width = 300;
    node.appendChild(imgContainer)
}

const resetResultContainer = (node) => {
    while(node.firstChild) {
        node.removeChild(node.firstChild);
    }
}