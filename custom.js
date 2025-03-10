const apiKey = "zritHsSsxdufqi2KOOSKvOEzkqmIdYhzd1Ep03bj";
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=3`;
let dataFromApi = [];
let isVisible = false;

const cardData = (data) => {
    const photoContainer = document.getElementById("photoContainer");
    photoContainer.innerHTML = ""; 

    data.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h2>${item.title}</h2>
            <img src="${item.url}" alt="${item.title}" />
            <p class="description">${item.explanation}</p>
            <p class="date">Date: ${item.date}</p>
            ${item.copyright ? `<p class="photographer">Photographer: ${item.copyright}</p>` : ''}
        `;
        photoContainer.appendChild(card);
    });
};

const apiCall = () => {
    if (!isVisible) { 
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                dataFromApi = data;
                cardData(dataFromApi);
                isVisible = true; 
                updateButton();
            })
            .catch((error) => console.error("Error:", error));
    } else {
        removeCard(); 
    }
};

const removeCard = () => {
    document.getElementById("photoContainer").innerHTML = ""; 
    isVisible = false;
    updateButton();
};

const updateButton = () => {
    document.getElementById("clickButton").textContent = isVisible ? "RESET" : "Click this button to see image!";
};

document.getElementById("clickButton").addEventListener("click", apiCall);
