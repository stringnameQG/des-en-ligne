let infoIcon  = document.querySelector('.image-info');
let infoRegle = document.querySelector('.info-regle');

var clickActive = false;

infoIcon.addEventListener('click', () => {
    if(clickActive === false) {
        infoRegle.style.zIndex       = "1";
        clickActive = true;
    }
    else {
        infoRegle.style.zIndex       = "-1";
        clickActive = false;
    }
})
infoIcon.addEventListener('mouseover', () => {
    infoRegle.style.zIndex       = "1";
})

infoIcon.addEventListener('mouseout', () => {
    infoRegle.style.zIndex       = "-1";
})