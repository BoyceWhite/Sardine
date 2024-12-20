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
            
            putSigns(data[0])
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

    const div1 = document.getElementById("cameraGallary");
    const div2 = document.getElementById("signGallary");
    const div3 = document.getElementById("header");

    const figures = document.querySelectorAll("#cameraGallary figure");

    figures.forEach(figure => {
        figure.addEventListener("click", () => {
            const img = figure.querySelector("img");
            const caption = figure.querySelector("figcaption").textContent;

            modal.style.display = "block";
            modalImg.src = img.src;
            captionDiv.textContent = caption;

            div1.classList.add("blurred");
            div2.classList.add("blurred");
            div3.classList.add("blurred");
        });
    });

    modal.addEventListener("click", () => {
        modal.style.display = "none";
        div1.classList.remove("blurred");
        div2.classList.remove("blurred");
        div3.classList.remove("blurred");
    });
};

function testing() {
    console.log('BEGINNING TEST')

    const url = "https://yl3hltj9mf.execute-api.us-east-2.amazonaws.com/dev/SardineAPIHandler"

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => console.error("Error fetching data:", error));
}