// ========================================
// SUPABASE
// ========================================

const SUPABASE_URL = "https://qhnqgmqapbeuzuzzkatk.supabase.co";

const SUPABASE_KEY = "sb_publishable_0znk98Pdw3x_JASb5VIqzA_zpgGrN7W";


const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ========================================
// TOKEN DU QUESTIONNAIRE
// ========================================

const parametres =
    new URLSearchParams(
        window.location.search
    );


const QUESTIONNAIRE_TOKEN =
    parametres.get("q");


// ========================================
// VARIABLES
// ========================================

let questions = [];

let questionActuelle = 0;

let reponsesUtilisateur = [];

let utilisateur = {};

let envoiEnCours = false;


// ========================================
// ÉLÉMENTS
// ========================================

const lienInvalide =
    document.getElementById(
        "lien-invalide"
    );

const accueil =
    document.getElementById(
        "accueil"
    );

const identification =
    document.getElementById(
        "identification"
    );

const questionnaire =
    document.getElementById(
        "questionnaire"
    );

const finQuestionnaire =
    document.getElementById(
        "fin-questionnaire"
    );

const boutonCommencer =
    document.getElementById(
        "commencer"
    );

const formulaireIdentification =
    document.getElementById(
        "formulaire-identification"
    );

const numeroQuestion =
    document.getElementById(
        "numero-question"
    );

const texteQuestion =
    document.getElementById(
        "texte-question"
    );

const boutonsReponse =
    document.querySelectorAll(
        ".reponse"
    );



const questionnaireTitre =
    document.getElementById(
        "questionnaire-titre"
    );

const questionnaireAccueil =
    document.getElementById(
        "questionnaire-accueil"
    );

const questionnaireFinTitre =
    document.getElementById(
        "questionnaire-fin-titre"
    );

const questionnaireFinMessage =
    document.getElementById(
        "questionnaire-fin-message"
    );

// ========================================
// PROTECTION ANTI-ABUS LÉGÈRE
// ========================================

// Empêche les soumissions répétées depuis le même navigateur
// pendant 10 minutes. Cette protection complète les contrôles
// déjà présents côté Supabase, sans ajouter de CAPTCHA.
const DELAI_ANTI_ABUS_MS = 10 * 60 * 1000;

function cleAntiAbus() {
    return "questionnaire_derniere_soumission_" + QUESTIONNAIRE_TOKEN;
}

function soumissionRecente() {
    try {
        const derniereSoumission =
            Number(localStorage.getItem(cleAntiAbus()) || 0);

        return (
            derniereSoumission > 0 &&
            Date.now() - derniereSoumission < DELAI_ANTI_ABUS_MS
        );
    } catch (error) {
        return false;
    }
}

function memoriserSoumission() {
    try {
        localStorage.setItem(
            cleAntiAbus(),
            String(Date.now())
        );
    } catch (error) {
        // Si le stockage local est indisponible,
        // le questionnaire continue normalement.
    }
}


// ========================================
// LIEN INVALIDE
// ========================================

function afficherLienInvalide() {

    accueil.classList.add("cache");

    identification.classList.add(
        "cache"
    );

    questionnaire.classList.add(
        "cache"
    );

    finQuestionnaire.classList.add(
        "cache"
    );

    lienInvalide.classList.remove(
        "cache"
    );

}


// ========================================
// CHARGEMENT DE LA PERSONNALISATION
// ========================================

async function chargerConfiguration() {

    const { data, error } =
        await supabaseClient.rpc(
            "get_questionnaire_configuration",
            { p_token: QUESTIONNAIRE_TOKEN }
        );

    if (error) {
        console.error(
            "Erreur configuration questionnaire :",
            error.message
        );
        return false;
    }

    const configuration =
        Array.isArray(data) ? data[0] : data;

    if (!configuration) {
        return false;
    }

    questionnaireTitre.textContent = configuration.titre;
    questionnaireAccueil.textContent = configuration.accueil;
    boutonCommencer.textContent = configuration.bouton;
    questionnaireFinTitre.textContent = configuration.fin_titre;
    questionnaireFinMessage.textContent = configuration.fin_message;

    return true;
}


// ========================================
// CHARGEMENT DES QUESTIONS
// ========================================

async function chargerQuestions() {

    if (!QUESTIONNAIRE_TOKEN) {

        afficherLienInvalide();

        return false;

    }


    const {
        data,
        error
    } =
        await supabaseClient.rpc(
            "get_questions_publiques_token",
            {
                p_token:
                    QUESTIONNAIRE_TOKEN
            }
        );


    if (error) {

        console.error(
            "Erreur chargement questions :",
            error.message
        );

        afficherLienInvalide();

        return false;

    }


    questions =
        data || [];


    if (questions.length === 0) {

        afficherLienInvalide();

        return false;

    }


    return true;

}


// ========================================
// INITIALISATION
// ========================================

async function initialiserQuestionnaire() {

    if (!QUESTIONNAIRE_TOKEN) {
        afficherLienInvalide();
        return;
    }

    const configurationOk =
        await chargerConfiguration();

    const questionsOk =
        await chargerQuestions();

    if (!configurationOk || !questionsOk) {
        afficherLienInvalide();
        return;
    }


    accueil.classList.remove(
        "cache"
    );

}


initialiserQuestionnaire();


// ========================================
// COMMENCER
// ========================================

boutonCommencer.addEventListener(
    "click",
    function () {

        if (soumissionRecente()) {
            alert(
                "Un questionnaire a déjà été envoyé récemment depuis cet appareil. Réessaie dans quelques minutes."
            );
            return;
        }

        accueil.classList.add(
            "cache"
        );

        identification.classList.remove(
            "cache"
        );

    }
);


// ========================================
// IDENTIFICATION
// ========================================

formulaireIdentification.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        utilisateur = {

            prenom:
                document
                    .getElementById("prenom")
                    .value
                    .trim(),

            nom:
                document
                    .getElementById("nom")
                    .value
                    .trim(),

            age:
                Number(
                    document
                        .getElementById("age")
                        .value
                ),

            gsm:
                document
                    .getElementById("gsm")
                    .value
                    .trim(),

            reseau:
                document
                    .getElementById("reseau")
                    .value
                    .trim()

        };


        // Au moins un moyen de contact est obligatoire
        if (
            utilisateur.gsm === "" &&
            utilisateur.reseau === ""
        ) {

            alert(
                "Indique au moins un moyen de contact : ton numéro de GSM ou un réseau social."
            );

            return;

        }


        questionActuelle = 0;

        reponsesUtilisateur = [];


        identification.classList.add(
            "cache"
        );

        questionnaire.classList.remove(
            "cache"
        );


        afficherQuestion();

    }
);


// ========================================
// AFFICHER QUESTION
// ========================================

function afficherQuestion() {

    if (
        questionActuelle >=
        questions.length
    ) {

        terminerQuestionnaire();

        return;

    }


    const question =
        questions[
            questionActuelle
        ];


    numeroQuestion.textContent =
        "Question " +
        (questionActuelle + 1) +
        " sur " +
        questions.length;


    texteQuestion.textContent =
        question.text;

}


// ========================================
// RÉPONSES
// ========================================

boutonsReponse.forEach(
    function (bouton) {

        bouton.addEventListener(
            "click",
            function () {

                if (envoiEnCours) {

                    return;

                }


                const question =
                    questions[
                        questionActuelle
                    ];


                if (!question) {

                    return;

                }


                reponsesUtilisateur.push({

                    question_id:
                        question.id,

                    reponse:
                        bouton.dataset.reponse

                });


                questionActuelle++;


                afficherQuestion();

            }
        );

    }
);


// ========================================
// TERMINER QUESTIONNAIRE
// ========================================

async function terminerQuestionnaire() {

    if (envoiEnCours) {

        return;

    }


    envoiEnCours = true;


    boutonsReponse.forEach(
        function (bouton) {

            bouton.disabled = true;

        }
    );


    const {
        error
    } =
        await supabaseClient.rpc(
            "envoyer_questionnaire_token",
            {

                p_token:
                    QUESTIONNAIRE_TOKEN,

                p_prenom:
                    utilisateur.prenom,

                p_nom:
                    utilisateur.nom,

                p_age:
                    utilisateur.age,

                p_gsm:
                    utilisateur.gsm,

                p_reseau:
                    utilisateur.reseau,

                p_reponses:
                    reponsesUtilisateur

            }
        );


    if (error) {

        console.error(
            "Erreur enregistrement :",
            error.message
        );


        alert(
            "Une erreur est survenue lors de l'enregistrement du questionnaire."
        );


        envoiEnCours = false;


        boutonsReponse.forEach(
            function (bouton) {

                bouton.disabled = false;

            }
        );


        questionActuelle =
            Math.max(
                0,
                questions.length - 1
            );


        reponsesUtilisateur.pop();


        afficherQuestion();

        return;

    }


    // La soumission Supabase a réussi :
    // on mémorise maintenant l'envoi pour l'anti-abus.
    memoriserSoumission();


    questionnaire.classList.add(
        "cache"
    );


    finQuestionnaire.classList.remove(
        "cache"
    );

}