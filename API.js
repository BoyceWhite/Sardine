document.addEventListener("DOMContentLoaded", () => {
    console.log('Document Loaded')
    const url = "https://yl3hltj9mf.execute-api.us-east-2.amazonaws.com/dev/SardineAPIHandler"

    // testing()

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            putSigns(data.signs);
            putTemps(data.temps);
            putConds(data.conds);
        })
        .catch(error => console.error("Error fetching data:", error));

    const cameraGallary = document.getElementById('cameraGallary');
    const imageLink = "https://www.udottraffic.utah.gov/map/Cctv/"

    cameraGallary.innerHTML = '';

    const cameraList = [
        ["1100 SOUTH", 7015],
        ["Mantua Exit", 7622],
        ["Sardine Summit", 7013],
        ["Dry Lake North", 7623],
        ["Sherwood Bend", 7624],
        ["Milepost 14.31", 7625],
        ["Milepost 15.17", 7626],
        ["Wellsville", 7014],
    ]

    for (let i = 0; i < cameraList.length; i++) {
        const imgElement = document.createElement('img');
        const figureElement = document.createElement('figure');
        const captionElement = document.createElement('figcaption');

        imgElement.src = imageLink + cameraList[i][1]
        captionElement.textContent = cameraList[i][0];

        figureElement.appendChild(captionElement);
        figureElement.appendChild(imgElement);
        
        cameraGallary.appendChild(figureElement);
    }

    modals()
});

function putTemps(response) {
    const sardineTemp = document.getElementById('SardineValue');
    const loganTemp = document.getElementById('LoganValue');

    sardine = response.find(item => item.Id === 50555);
    logan = response.find(item => item.Id === 50465);


    if (sardine) {
        sardineTemp.innerHTML = `${sardine.SurfaceTemp}°F`;
    } else {
        sardineTemp.innerHTML = 'N/A';
    }

    if (logan) {
        loganTemp.innerHTML = `${logan.SurfaceTemp}°F`;
    } else {
        loganTemp.innerHTML = 'N/A';
    }
}

function putConds(response) {
    const road1Dry = document.getElementById('road1Val');
    const road2Dry = document.getElementById('road2Val');
    const road1Weather = document.getElementById('road1Weather');
    const road2Weather = document.getElementById('road2Weather');

    road1Cond = response.find(item => item.Id === 239);
    road2Cond = response.find(item => item.Id === 213);

    if (sardine) {
        road1Dry.innerHTML = road1Cond.RoadCondition;
        road1Weather.innerHTML = road1Cond.WeatherCondition;
    } else {
        road1Dry.innerHTML = 'N/A';
    }

    if (logan) {
        road2Dry.innerHTML = road2Cond.RoadCondition;
        road2Weather.innerHTML = road2Cond.WeatherCondition;
    } else {
        road2Dry.innerHTML = 'N/A';
    }
}


function putSigns(response) {
    const signContainer = document.getElementById('signGallary');
    const signList = [
        ["1100 S. Brigham", "ADX--72079"],
        ["Wellsville", "ADX--72083"],
    ]

    for (let i = 0; i < signList.length; i++) {
        const signElement = document.createElement('div');
        signElement.classList.add('sign')

        const signText = document.createElement('div');
        signText.classList.add('sign-display');

        const captionElement = document.createElement('div');
        captionElement.classList.add('sign-caption');
        captionElement.textContent = signList[i][0];

        data = response.find(item => item.Id === signList[i][1]);

        if(data) {
            message = data.Messages[0]
            
            if (message == 'NO_MESSAGE'){
                signText.textContent = "NO MESSAGE"
            } else {
                signText.textContent = message
            }

        }else {
            signText.textContent = "ERROR"
        }

        signElement.appendChild(captionElement);
        signElement.appendChild(signText);
        signContainer.appendChild(signElement);
    }
}

function modals() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionDiv = document.getElementById("caption");

    toBlur = ["cameraGallary", "signGallary", "header", "temperatureContainer", "roadConditions"]

    const figures = document.querySelectorAll("#cameraGallary figure");

    figures.forEach(figure => {
        figure.addEventListener("click", () => {
            const img = figure.querySelector("img");
            const caption = figure.querySelector("figcaption").textContent;

            modal.style.display = "block";
            modalImg.src = img.src;
            captionDiv.textContent = caption;

            toBlur.forEach(id => document.getElementById(id).classList.add("blurred"));
        });
    });

    modal.addEventListener("click", () => {
        modal.style.display = "none";
        toBlur.forEach(id => document.getElementById(id).classList.remove("blurred"));
    });
};

function testing() {
    console.log('BEGINNING TEST')
}