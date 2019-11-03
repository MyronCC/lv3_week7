// this is a partially revealing module pattern - just a variation on what we've already done

const myVM = (() => {
    // get the user buttons and fire off an async DB query with Fetch
    let userButton = document.querySelectorAll('.u-link'),
        lightbox = document.querySelector('.lightbox');

    function renderSocialMedia(socialMedia) {
        return `<ul class="u-social">
            ${socialMedia.map(item => `<li>${item}</li>`).join('')}
        </ul>`
    }

    function pauseUserData(person) { // person is the database result
        let targetDiv = document.querySelector('.lb-content'),
            targetImg = document.querySelector('img');

        let bioContent = `
        <p>${person.bio}</p>
        <h4>Social Media:</h4>
        ${renderSocialMedia(person.social)}
        `;

        console.log(bioContent);

        targetDiv.innerHTML = bioContent;
        targetImg.src = person.imgsrc;

        lightbox.classList.add('show-lb');
    }

    function getUserData(event) {
        // kill the default a  tag behaviour (don't navigate anywhere)
        event.preventDefault(); 
        // debugger;
        // find the image closest to the anchor tag and get its src property
        let imgSrc = this.previousElementSibling.getAttribute('src');

        let url = `/${this.getAttribute('href')}`; // /1

        fetch(url)  // go get the data
            .then(res => res.json()) // parse the json result into
            .then(data => {
                console.log("my database result is: ", data)

                data[0].imgsrc = imgSrc;
                pauseUserData(data[0]);
            })
            .catch((err => {
                console.log(err)
            }));
    }

    userButton.forEach(button => button.addEventListener('click', getUserData))

    lightbox.querySelector('.close').addEventListener('click', function() {
        lightbox.classList.remove('show-lb');
    })
})();