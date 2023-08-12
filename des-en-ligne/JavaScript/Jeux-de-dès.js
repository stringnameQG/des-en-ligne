var scorePLayer1                    = 0;
let scoreAffichagePLayer1           = document.querySelector('.zone-player__global-player1');
var scoreCurrentPLayer1             = 0;
let scoreCurrentAffichagePLayer1    = document.querySelector('.zone-player__affichage-score__round1');
let affichagePLayer1                = document.querySelector('.zone-player__affichage-player1');
let pastillePLayer1                 = document.querySelector('.zone-player__affichage-player__tour-player1');

var scorePLayer2                    = 0;
let scoreAffichagePLayer2           = document.querySelector('.zone-player__global-player2');
var scoreCurrentPLayer2             = 0;
let scoreCurrentAffichagePLayer2    = document.querySelector('.zone-player__affichage-score__round2');
let affichagePLayer2                = document.querySelector('.zone-player__affichage-player2');
let pastillePLayer2                 = document.querySelector('.zone-player__affichage-player__tour-player2');

var buttonActivePLayer1             = false;

let newGame                         = document.querySelector('.zone-regle__nouvelle-partie');
let des                             = document.querySelector('.zone-regle__dès-image');
let rollDice                        = document.querySelector('.zone-regle__action__roll-dice');
let hold                            = document.querySelector('.zone-regle__action__hold');

var newGameBlocage                  = false;
var rollDiceBlocage                 = true;
var holdBlocage                     = true;


function RemiseCompteur() {
    scorePLayer1                                = 0;
    scoreCurrentPLayer1                         = 0;
    buttonPLayer1                               = false;
    pastillePLayer1.style.backgroundColor       = "transparent";
    affichagePLayer1.style.fontFamily           = "Lato-Thin";
    scoreCurrentAffichagePLayer1.textContent    = 0;
    scoreAffichagePLayer1.textContent           = 0;

    scorePLayer2                                = 0;
    scoreCurrentPLayer2                         = 0;
    buttonPLayer2                               = false;
    pastillePLayer2.style.backgroundColor       = "transparent";
    affichagePLayer2.style.fontFamily           = "Lato-Thin";
    scoreCurrentAffichagePLayer2.textContent    = 0;
    scoreAffichagePLayer2.textContent           = 0;

    newGameBlocage      = false;
    rollDiceBlocage     = false;
    holdBlocage         = true;
}
function getRandomDes(max) {
    return Math.floor(Math.random() * (max)) + 1;
}
function StartRandom() { 
    let resultat = getRandomDes(2);
    if(resultat === 1) {
        buttonActivePLayer1 = true;
        buttonActivePLayer2 = false;
    }
    else {
        buttonActivePLayer1 = false;
        buttonActivePLayer2 = true;
    }
}
function lancerDes() {
    return getRandomDes(6);
}
function ChangementJoueurAffichage() {
    if(buttonActivePLayer1 === true) {
        pastillePLayer1.style.backgroundColor   = "red";
        affichagePLayer1.style.fontFamily       = "Lato-Light";
        pastillePLayer2.style.backgroundColor   = "transparent";
        affichagePLayer2.style.fontFamily       = "Lato-Thin";
    }
    else {
        pastillePLayer1.style.backgroundColor   = "transparent";
        affichagePLayer1.style.fontFamily       = "Lato-Thin";
        pastillePLayer2.style.backgroundColor   = "red";
        affichagePLayer2.style.fontFamily       = "Lato-Light";
    }
}
function ImageDes(valeurDes) {
    des.src = "des-en-ligne/Image/dès-image/dice-" + valeurDes + "-fill.svg"
}
function AnimationDes(valeurObtenue) { 
    /* 
    cette fonction n'est pas obligatoire selon l'énoncé je l'ai ajoutée afin de simulée 
    le lancés d'un dés
    */          
    let sortieWhile             = false;
    var valeurDesSauvegarder    = 0;
    let compteur                = 0;
    let interval = setInterval(() => {
        let valeurDes = getRandomDes(6);  
        while(sortieWhile === false) {    // cette boucle à pour but d'empécher la répétition de 2 images identique ce qui pourrait étre visuellement d'ésagréable
            if((valeurDes === valeurDesSauvegarder) || (valeurDes === valeurObtenue)) {
                valeurDes = getRandomDes(6);
            }
            else {
                valeurDesSauvegarder = valeurDes;
                sortieWhile = true;
            }
        }
        sortieWhile = false;
        ImageDes(valeurDes);
        compteur++;
        if(compteur == 6) {
            clearInterval(interval);
            ImageDes(valeurObtenue);
            VerificationDes(valeurObtenue);
        }
    }, 500);
    interval;
}
function BloquageDeblocageBouton(newGameBlocageValue, rollDiceBlocageValue, holdBlocageValue) {
    newGameBlocage      = newGameBlocageValue;
    rollDiceBlocage     = rollDiceBlocageValue;
    holdBlocage         = holdBlocageValue;
}
function Gagner(JoueurGagnant) {
    alert("Bravo " + JoueurGagnant + " vous avez gagnée !")
}
function VerificationScore(score) {
    if(buttonActivePLayer1 === true && score >= 100) {
        Gagner("Joueur 1");
        RemiseCompteur();
    }
    else if(buttonActivePLayer1 === false && score >= 100) {
        Gagner("Joueur 2")
        RemiseCompteur();
    }
}
function ChangementJoueur() {
    if(buttonActivePLayer1 === true) {
        buttonActivePLayer1 = false;
    }
    else {
        buttonActivePLayer1 = true;
    }
}
function Perdue() {
    alert("Vous avez fait 1 changement de jouer");
    ChangementJoueur();
    ChangementJoueurAffichage();
}
function VerificationDes(valeurObtenue) {
    if(buttonActivePLayer1 === true && valeurObtenue ==! 0) {
        scoreCurrentPLayer1                         = 0;
        scoreCurrentAffichagePLayer1.textContent    = scoreCurrentPLayer1;
        Perdue();
    }
    else if(buttonActivePLayer1 === false && valeurObtenue ==! 0) {
        scoreCurrentPLayer2                         = 0;
        scoreCurrentAffichagePLayer2.textContent    = scoreCurrentPLayer2;
        Perdue(); 
    }
    else if(buttonActivePLayer1 === true) { 
        scoreCurrentPLayer1                         += valeurObtenue;
        scoreCurrentAffichagePLayer1.textContent    = scoreCurrentPLayer1;
    }
    else if(buttonActivePLayer1 === false) { 
        scoreCurrentPLayer2                          += valeurObtenue;
        scoreCurrentAffichagePLayer2.textContent    = scoreCurrentPLayer2;
    }
}
function Partie() {
    RemiseCompteur();
    StartRandom();
    ChangementJoueurAffichage();
}
newGame.addEventListener('click', () => {
    if(newGameBlocage === false) {
        Partie();
    }
})
rollDice.addEventListener('click', () => {
    if(rollDiceBlocage === false) {
        BloquageDeblocageBouton(true, true, true);
        let valeurObtenue = lancerDes();
        AnimationDes(valeurObtenue);
        BloquageDeblocageBouton(false, false, false);
    }
})
hold.addEventListener('click', () => {
    if(holdBlocage === false) {
        if((buttonActivePLayer1 === true)) {
            scorePLayer1                                += scoreCurrentPLayer1;
            scoreAffichagePLayer1.textContent           = scorePLayer1;
            scoreCurrentPLayer1                         = 0;
            scoreCurrentAffichagePLayer1.textContent    = 0;
            VerificationScore(scorePLayer1);
        } 
        else if((buttonActivePLayer1 === false)) {
            scorePLayer2                                += scoreCurrentPLayer2;
            scoreAffichagePLayer2.textContent           = scorePLayer2;
            scoreCurrentPLayer2                         = 0;
            scoreCurrentAffichagePLayer2.textContent    = 0;
            VerificationScore(scorePLayer2);
        } 
        ChangementJoueur();
        ChangementJoueurAffichage();
    }
})