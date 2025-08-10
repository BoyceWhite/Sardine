document.addEventListener("DOMContentLoaded", () => {
    console.log('Document Loaded')
    const url = "https://yl3hltj9mf.execute-api.us-east-2.amazonaws.com/dev/SardineAPIHandler"

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
        ["US-91 / 1100 S @ 775 W, BRC", 61544],
        ["1100 S / US-89/91 @ Main St / US-89 / SR-13, BRC", 65661],
        ["US-89/91 @ 100 S / MP 5.61, MTU", 61189],
        ["US-89/91 @ Sardine Summit / MP 10.05, BE", 65080],
        ["US-89/91 @ Milepost 12.26, CA", 65440],
        ["US-89/91 @ Milepost 13.93, WVL", 61297],
        ["US-89/91 @ Milepost 15.17, WVL", 60569],
        ["US-89/91 @ 950 S / MP 17.18, WVL", 60577],
        ["US-89/91 @ Main St / SR-101 / MP 19.18, WVL", 60953],
        ["US-89/91 RWIS SB @ Milepost 19.9, WVL", 60235],
        ["US-89/91 @ 3200 S / 2000 W, LGN", 60514],
        ["US-89/91 @ 1000 W / SR-252, LGN", 65037],
        ["US-89/91 @ 1700 S / Park Ave / 600 W, LGN", 65442],
        ["Main St / US-89/91 @ 100 S, LGN", 61551],
        ["Main St / US-89/91 @ 200 N / SR-30, LGN", 61443],
        ["Main St / US-89/91 @ 400 N / US-89, LGN", 65022],
        ["US-89 RWIS EB @ USU / 900 E / MP 460.2, LGN", 59011],
        ["US-89 @ 1200 E, LGN", 60276],
    ];
    
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
    const road1CondElem = document.getElementById('road1Val');
    const road2CondElem = document.getElementById('road2Val');
    const road1WeatherElem = document.getElementById('road1Weather');
    const road2WeatherElem = document.getElementById('road2Weather');

    const road1Cond = response.find(item => item.Id === 239) || {};
    const road2Cond = response.find(item => item.Id === 213) || {};

    const labels = [
        [road1CondElem, capitalizeFirstLetter(road1Cond.RoadCondition) || 'N/A'],
        [road2CondElem, capitalizeFirstLetter(road2Cond.RoadCondition) || 'N/A'],
        [road1WeatherElem, capitalizeFirstLetter(road1Cond.WeatherCondition) || 'N/A'],
        [road2WeatherElem, capitalizeFirstLetter(road2Cond.WeatherCondition) || 'N/A']
    ];

    const conditions = [
        ['fair', 'fair'],
        ['wet', 'wet'],
        ['rain', 'wet'],
        ['mixed rain and snow', 'moderate'],
        ['slushy', 'moderate'],
        ['patchy snow', 'moderate'],
        ['snow', 'moderate'],
        ['snow covered', 'hazard']
    ];

    for (let i = 0; i < labels.length; i++) {
        labels[i][0].innerHTML = labels[i][1];

        for (let j = 0; j < conditions.length; j++) {
            if (conditions[j][0] === labels[i][1].toLowerCase()) {
                labels[i][0].classList.add(conditions[j][1]);
            }
        }
    }
}

function putSigns(response) {
    const signContainer = document.getElementById('signGallary');
    const signList = [
        ["1100 S Brigham", "ADX--72079"],
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
        messages = data.Messages
        
        if(data) {
            if (messages.length > 1){
                let messageIndex = 0;

                signText.textContent = messages[messageIndex];

                setInterval(() => {
                    signText.style.opacity = '0';
            
                    setTimeout(() => {
                        messageIndex = (messageIndex + 1) % messages.length;
                        signText.textContent = messages[messageIndex];
            
                        signText.style.opacity = '1';
                    }, 500);
                }, 3000);
            
            } else{           
                 message = messages[0]
                 signText.classList.add('blink')
                 
                if (message == 'NO_MESSAGE'){
                    signText.textContent = "NO MESSAGE"
                } else {
                    signText.textContent = message
                }
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

function capitalizeFirstLetter(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}