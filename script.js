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

let consentementDonne = false;

const DELAI_ANTI_DOUBLON_LOCAL = 10 * 60 * 1000;

function cleSoumissionLocale() {
    return "justbetweenus_soumission_" + QUESTIONNAIRE_TOKEN;
}

function soumissionRecente() {
    if (!QUESTIONNAIRE_TOKEN) return false;

    try {
        const valeur = localStorage.getItem(cleSoumissionLocale());
        if (!valeur) return false;

        const dateSoumission = Number(valeur);
        if (!Number.isFinite(dateSoumission)) {
            localStorage.removeItem(cleSoumissionLocale());
            return false;
        }

        const recente =
            Date.now() - dateSoumission < DELAI_ANTI_DOUBLON_LOCAL;

        if (!recente) {
            localStorage.removeItem(cleSoumissionLocale());
        }

        return recente;
    } catch (error) {
        console.warn("Stockage local indisponible :", error);
        return false;
    }
}

function memoriserSoumission() {
    if (!QUESTIONNAIRE_TOKEN) return;

    try {
        localStorage.setItem(
            cleSoumissionLocale(),
            String(Date.now())
        );
    } catch (error) {
        console.warn("Impossible de mémoriser la soumission :", error);
    }
}


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

const confidentialiteModal =
    document.getElementById(
        "confidentialite-modal"
    );

const accordConfidentialite =
    document.getElementById(
        "accord-confidentialite"
    );

const numeroQuestion =
    document.getElementById(
        "numero-question"
    );

const texteQuestion =
    document.getElementById(
        "texte-question"
    );

const barreProgressionQuestionnaire =
    document.getElementById("barre-progression-questionnaire");

const pourcentageProgression =
    document.getElementById("pourcentage-progression");

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

    const [configurationOk, questionsOk] =
        await Promise.all([
            chargerConfiguration(),
            chargerQuestions()
        ]);

    if (!configurationOk || !questionsOk) {
        afficherLienInvalide();
        return;
    }


    if (soumissionRecente()) {
        accueil.classList.add("cache");
        identification.classList.add("cache");
        questionnaire.classList.add("cache");
        questionnaireFinTitre.textContent = "Merci 😊";
        questionnaireFinMessage.textContent =
            "Ce questionnaire a déjà été envoyé récemment depuis cet appareil.";
        finQuestionnaire.classList.remove("cache");
        return;
    }

    accueil.classList.remove(
        "cache"
    );

    confidentialiteModal.classList.remove(
        "cache"
    );

    document.body.classList.add(
        "confidentialite-bloquee"
    );

}


initialiserQuestionnaire();


// ========================================
// CONSENTEMENT CONFIDENTIALITÉ
// ========================================

accordConfidentialite.addEventListener(
    "change",
    function () {

        if (!accordConfidentialite.checked) {
            return;
        }

        consentementDonne = true;

        confidentialiteModal.classList.add(
            "cache"
        );

        document.body.classList.remove(
            "confidentialite-bloquee"
        );

    }
);


// ========================================
// COMMENCER
// ========================================

boutonCommencer.addEventListener(
    "click",
    function () {

        if (!consentementDonne) {
            confidentialiteModal.classList.remove("cache");
            document.body.classList.add("confidentialite-bloquee");
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

        if (!consentementDonne) {
            confidentialiteModal.classList.remove("cache");
            document.body.classList.add("confidentialite-bloquee");
            return;
        }


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


    const progression =
        Math.round(
            ((questionActuelle + 1) / questions.length) * 100
        );

    barreProgressionQuestionnaire.style.width =
        progression + "%";

    pourcentageProgression.textContent =
        progression + " %";

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


                bouton.disabled = true;

                reponsesUtilisateur.push({

                    question_id:
                        question.id,

                    reponse:
                        bouton.dataset.reponse

                });


                questionActuelle++;

                afficherQuestion();

                // Le changement de question est synchrone : on peut
                // réactiver immédiatement les boutons pour la suivante.
                boutonsReponse.forEach(function (element) {
                    element.disabled = false;
                });

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


    if (!consentementDonne) {
        questionnaire.classList.add("cache");
        accueil.classList.remove("cache");
        confidentialiteModal.classList.remove("cache");
        document.body.classList.add("confidentialite-bloquee");
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

    if (
        error.message &&
        error.message.includes(
            "Un questionnaire a déjà été envoyé récemment"
        )
    ) {
        alert(
            "Ce questionnaire a déjà été envoyé récemment avec ce moyen de contact. " +
            "Merci de patienter quelques minutes avant de réessayer. 😊"
        );
    } else {
        alert(
            "Une erreur est survenue lors de l'enregistrement du questionnaire. " +
            "Merci de réessayer."
        );
    }

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


    memoriserSoumission();

    questionnaire.classList.add(
        "cache"
    );


    finQuestionnaire.classList.remove(
        "cache"
    );

}