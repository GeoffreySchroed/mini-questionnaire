// ========================================
// SUPABASE
// ========================================

const SUPABASE_URL = "https://qhnqgmqapbeuzuzzkatk.supabase.co";

const SUPABASE_KEY = "sb_publishable_0znk98Pdw3x_JASb5VIqzA_zpgGrN7W";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ========================================
// ÉLÉMENTS GÉNÉRAUX
// ========================================

const connexionAdmin = document.getElementById("connexion-admin");
const tableauDeBord = document.getElementById("tableau-de-bord");
const formulaireConnexion = document.getElementById("formulaire-connexion");
const boutonDeconnexion = document.getElementById("deconnexion");
const bienvenueAdmin = document.getElementById("bienvenue-admin");
const roleAdmin = document.getElementById("role-admin");


// ========================================
// MON QUESTIONNAIRE
// ========================================

const lienQuestionnaire = document.getElementById("lien-questionnaire");
const boutonCopierLien = document.getElementById("copier-lien-questionnaire");
const zoneQrCode = document.getElementById("qr-code");



const formulairePersonnalisation = document.getElementById("formulaire-personnalisation");
const personnalisationTitre = document.getElementById("personnalisation-titre");
const personnalisationAccueil = document.getElementById("personnalisation-accueil");
const personnalisationBouton = document.getElementById("personnalisation-bouton");
const personnalisationFinTitre = document.getElementById("personnalisation-fin-titre");
const personnalisationFinMessage = document.getElementById("personnalisation-fin-message");

// ========================================
// PERSONNALISATION DU QUESTIONNAIRE
// ========================================

async function chargerPersonnalisation() {

    const { data: token, error: erreurToken } =
        await supabaseClient.rpc("get_mon_lien_questionnaire");

    if (erreurToken) {
        console.error("Erreur token personnalisation :", erreurToken.message);
        return;
    }

    const { data, error } =
        await supabaseClient.rpc(
            "get_questionnaire_configuration",
            { p_token: token }
        );

    if (error) {
        console.error("Erreur personnalisation :", error.message);
        return;
    }

    const configuration = Array.isArray(data) ? data[0] : data;

    if (!configuration) {
        return;
    }

    personnalisationTitre.value = configuration.titre || "";
    personnalisationAccueil.value = configuration.accueil || "";
    personnalisationBouton.value = configuration.bouton || "";
    personnalisationFinTitre.value = configuration.fin_titre || "";
    personnalisationFinMessage.value = configuration.fin_message || "";
}


formulairePersonnalisation.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const bouton = document.getElementById("enregistrer-personnalisation");
        const ancienTexte = bouton.textContent;
        bouton.disabled = true;
        bouton.textContent = "Enregistrement...";

        const { error } = await supabaseClient.rpc(
            "modifier_questionnaire_configuration",
            {
                p_titre: personnalisationTitre.value.trim(),
                p_accueil: personnalisationAccueil.value.trim(),
                p_bouton: personnalisationBouton.value.trim(),
                p_fin_titre: personnalisationFinTitre.value.trim(),
                p_fin_message: personnalisationFinMessage.value.trim()
            }
        );

        bouton.disabled = false;
        bouton.textContent = ancienTexte;

        if (error) {
            console.error("Erreur enregistrement personnalisation :", error.message);
            alert("Impossible d'enregistrer la personnalisation.\n\n" + error.message);
            return;
        }

        alert("Personnalisation enregistrée.");
    }
);


// ========================================
// ADMINISTRATEURS
// ========================================

const sectionAdministrateurs = document.getElementById("section-administrateurs");
const listeAdministrateurs = document.getElementById("liste-administrateurs");
const boutonAjouterAdministrateur = document.getElementById("ajouter-administrateur");
const formulaireAdministrateur = document.getElementById("formulaire-administrateur");
const champAdminNom = document.getElementById("admin-nom");
const champAdminEmail = document.getElementById("admin-email");
const champAdminMotDePasse = document.getElementById("admin-mot-de-passe");
const boutonEnregistrerAdministrateur = document.getElementById("enregistrer-administrateur");
const boutonAnnulerAdministrateur = document.getElementById("annuler-administrateur");


// ========================================
// QUESTIONS
// ========================================

const listeQuestions = document.getElementById("liste-questions");
const boutonAjouterQuestion = document.getElementById("ajouter-question");
const formulaireQuestion = document.getElementById("formulaire-question");
const boutonEnregistrerQuestion = document.getElementById("enregistrer-question");
const boutonAnnulerQuestion = document.getElementById("annuler-question");
const champNouvelleQuestion = document.getElementById("nouvelle-question");


// ========================================
// POINTS
// ========================================

const ouiAmis = document.getElementById("oui-amis");
const ouiUnSoir = document.getElementById("oui-un-soir");
const ouiCouple = document.getElementById("oui-couple");

const nonAmis = document.getElementById("non-amis");
const nonUnSoir = document.getElementById("non-un-soir");
const nonCouple = document.getElementById("non-couple");

const peutEtreAmis = document.getElementById("peut-etre-amis");
const peutEtreUnSoir = document.getElementById("peut-etre-un-soir");
const peutEtreCouple = document.getElementById("peut-etre-couple");

const pasDuToutAmis = document.getElementById("pas-du-tout-amis");
const pasDuToutUnSoir = document.getElementById("pas-du-tout-un-soir");
const pasDuToutCouple = document.getElementById("pas-du-tout-couple");

const jeNeSaisPasAmis = document.getElementById("je-ne-sais-pas-amis");
const jeNeSaisPasUnSoir = document.getElementById("je-ne-sais-pas-un-soir");
const jeNeSaisPasCouple = document.getElementById("je-ne-sais-pas-couple");


// ========================================
// RÉSULTATS
// ========================================

const listeResultats = document.getElementById("liste-resultats");

const boutonClassementAmis = document.getElementById("classement-amis");
const boutonClassementUnSoir = document.getElementById("classement-un-soir");
const boutonClassementCouple = document.getElementById("classement-couple");

const boutonTop5 = document.getElementById("afficher-top-5");
const boutonTop10 = document.getElementById("afficher-top-10");
const boutonTous = document.getElementById("afficher-tous");
const champRechercheParticipant = document.getElementById("recherche-participant");


// ========================================
// POPUP PARTICIPANT
// ========================================

const ficheParticipant = document.getElementById("fiche-participant");
const fondPopup = document.getElementById("fond-popup");
const infosParticipant = document.getElementById("infos-participant");
const scoresParticipant = document.getElementById("scores-participant");
const reponsesParticipant = document.getElementById("reponses-participant");
const boutonFermerFiche = document.getElementById("fermer-fiche-participant");
const croixFermerFiche = document.getElementById("croix-fermer-fiche");


// ========================================
// VARIABLES
// ========================================

let profilConnecte = null;
let questionEnModification = null;

let categorieClassement = "couple";
let nombreResultats = 5;
let rechercheParticipant = "";


// ========================================
// OUTILS
// ========================================

function creerParagraphe(texte, classe = null) {

    const paragraphe = document.createElement("p");

    paragraphe.textContent = texte;

    if (classe) {
        paragraphe.classList.add(classe);
    }

    return paragraphe;
}


function fermerFicheParticipant() {

    ficheParticipant.classList.add("cache");
    fondPopup.classList.add("cache");
}


function remettreChampsAZero() {

    champNouvelleQuestion.value = "";

    ouiAmis.value = 0;
    ouiUnSoir.value = 0;
    ouiCouple.value = 0;

    nonAmis.value = 0;
    nonUnSoir.value = 0;
    nonCouple.value = 0;

    peutEtreAmis.value = 0;
    peutEtreUnSoir.value = 0;
    peutEtreCouple.value = 0;

    pasDuToutAmis.value = 0;
    pasDuToutUnSoir.value = 0;
    pasDuToutCouple.value = 0;

    jeNeSaisPasAmis.value = 0;
    jeNeSaisPasUnSoir.value = 0;
    jeNeSaisPasCouple.value = 0;
}


function fermerFormulaireQuestion() {

    questionEnModification = null;

    formulaireQuestion.classList.add("cache");
    boutonAjouterQuestion.classList.remove("cache");

    formulaireQuestion.querySelector("h2").textContent =
        "Nouvelle question";

    boutonEnregistrerQuestion.textContent =
        "Enregistrer";

    remettreChampsAZero();
}


function recupererPoints() {

    return {
        oui_amis: Number(ouiAmis.value),
        oui_un_soir: Number(ouiUnSoir.value),
        oui_couple: Number(ouiCouple.value),

        non_amis: Number(nonAmis.value),
        non_un_soir: Number(nonUnSoir.value),
        non_couple: Number(nonCouple.value),

        peut_etre_amis: Number(peutEtreAmis.value),
        peut_etre_un_soir: Number(peutEtreUnSoir.value),
        peut_etre_couple: Number(peutEtreCouple.value),

        pas_du_tout_amis: Number(pasDuToutAmis.value),
        pas_du_tout_un_soir: Number(pasDuToutUnSoir.value),
        pas_du_tout_couple: Number(pasDuToutCouple.value),

        je_ne_sais_pas_amis: Number(jeNeSaisPasAmis.value),
        je_ne_sais_pas_un_soir: Number(jeNeSaisPasUnSoir.value),
        je_ne_sais_pas_couple: Number(jeNeSaisPasCouple.value)
    };
}


// ========================================
// PROFIL
// ========================================

async function chargerProfil() {

    const {
        data: profil,
        error
    } = await supabaseClient
        .from("profils")
        .select("id, nom, role")
        .single();


    if (error) {

        console.error(
            "Erreur profil :",
            error.message
        );

        return false;
    }


    profilConnecte = profil;

    bienvenueAdmin.textContent =
        "Bienvenue " + profil.nom + " 👋";


    if (profil.role === "super_admin") {

        roleAdmin.textContent =
            "Rôle : Super Administrateur";

        sectionAdministrateurs.classList.remove("cache");

        await chargerAdministrateurs();

    } else {

        roleAdmin.textContent =
            "Rôle : Administrateur";

        sectionAdministrateurs.classList.add("cache");
    }


    return true;
}


// ========================================
// LIEN PUBLIC + QR CODE
// ========================================

async function chargerLienQuestionnaire() {

    const {
        data: token,
        error
    } = await supabaseClient.rpc(
        "get_mon_lien_questionnaire"
    );


    if (error) {

        console.error(
            "Erreur lien questionnaire :",
            error.message
        );

        lienQuestionnaire.value =
            "Impossible de générer le lien.";

        return;
    }


    /*
        On part de l'adresse actuelle de admin.html.

        Exemple local :
        http://127.0.0.1:5500/admin.html

        devient :
        http://127.0.0.1:5500/index.html?q=TOKEN

        Plus tard, lorsque le site sera hébergé,
        le même code produira automatiquement
        l'adresse du vrai site.
    */

    const urlQuestionnaire =
    new URL(
        "https://geoffreyschroed.github.io/mini-questionnaire/index.html"
    );


urlQuestionnaire.searchParams.set(
    "q",
    token
);


    const lienFinal =
        urlQuestionnaire.toString();


    lienQuestionnaire.value =
        lienFinal;


    // Effacer un ancien QR éventuel

    zoneQrCode.replaceChildren();


    // Générer le QR Code

    new QRCode(
        zoneQrCode,
        {
            text: lienFinal,
            width: 180,
            height: 180,
            correctLevel:
                QRCode.CorrectLevel.H
        }
    );
}


boutonCopierLien.addEventListener(
    "click",
    async function () {

        const lien =
            lienQuestionnaire.value;


        if (
            !lien ||
            lien.startsWith("Impossible")
        ) {
            return;
        }


        try {

            await navigator.clipboard.writeText(
                lien
            );


            const ancienTexte =
                boutonCopierLien.textContent;


            boutonCopierLien.textContent =
                "✓ Copié";


            setTimeout(
                function () {

                    boutonCopierLien.textContent =
                        ancienTexte;

                },
                1500
            );

        } catch (error) {

            /*
                Solution de secours si le navigateur
                refuse navigator.clipboard.
            */

            lienQuestionnaire.select();

            document.execCommand("copy");

            boutonCopierLien.textContent =
                "✓ Copié";


            setTimeout(
                function () {

                    boutonCopierLien.textContent =
                        "Copier";

                },
                1500
            );
        }

    }
);


// ========================================
// ADMINISTRATEURS
// ========================================

async function chargerAdministrateurs() {

    if (
        !profilConnecte ||
        profilConnecte.role !== "super_admin"
    ) {
        return;
    }


    const {
        data: administrateurs,
        error
    } = await supabaseClient.rpc(
        "lister_administrateurs"
    );


    if (error) {

        console.error(
            "Erreur administrateurs :",
            error.message
        );

        listeAdministrateurs.replaceChildren(
            creerParagraphe(
                "Impossible de charger les administrateurs."
            )
        );

        return;
    }


    listeAdministrateurs.replaceChildren();


    if (
        !administrateurs ||
        administrateurs.length === 0
    ) {

        listeAdministrateurs.appendChild(
            creerParagraphe(
                "Aucun administrateur."
            )
        );

        return;
    }


    administrateurs.forEach(
        function (admin) {

            const bloc =
                document.createElement("div");

            bloc.classList.add(
                "bloc-administrateur"
            );


            const informations =
                document.createElement("div");

            informations.classList.add(
                "infos-administrateur"
            );


            const nom =
                document.createElement("h3");

            nom.textContent =
                admin.nom;


            const role =
                creerParagraphe(
                    admin.role === "super_admin"
                        ? "👑 Super Administrateur"
                        : "👤 Administrateur"
                );


            informations.appendChild(nom);
            informations.appendChild(role);

            bloc.appendChild(informations);


            if (admin.role === "admin") {

                const actions =
                    document.createElement("div");

                actions.classList.add(
                    "actions-administrateur"
                );


                const boutonRenommer =
                    document.createElement("button");

                boutonRenommer.type = "button";
                boutonRenommer.textContent = "Renommer";

                boutonRenommer.classList.add(
                    "renommer-administrateur"
                );

                boutonRenommer.dataset.id =
                    admin.id;

                boutonRenommer.dataset.nom =
                    admin.nom;


                const boutonSupprimer =
                    document.createElement("button");

                boutonSupprimer.type = "button";
                boutonSupprimer.textContent = "Supprimer";

                boutonSupprimer.classList.add(
                    "supprimer-administrateur",
                    "bouton-danger"
                );

                boutonSupprimer.dataset.id =
                    admin.id;

                boutonSupprimer.dataset.nom =
                    admin.nom;


                actions.appendChild(
                    boutonRenommer
                );

                actions.appendChild(
                    boutonSupprimer
                );

                bloc.appendChild(actions);
            }


            listeAdministrateurs.appendChild(
                bloc
            );
        }
    );
}


boutonAjouterAdministrateur.addEventListener(
    "click",
    function () {

        champAdminNom.value = "";
        champAdminEmail.value = "";
        champAdminMotDePasse.value = "";

        formulaireAdministrateur.classList.remove(
            "cache"
        );

        boutonAjouterAdministrateur.classList.add(
            "cache"
        );

        champAdminNom.focus();
    }
);


boutonAnnulerAdministrateur.addEventListener(
    "click",
    function () {

        formulaireAdministrateur.classList.add(
            "cache"
        );

        boutonAjouterAdministrateur.classList.remove(
            "cache"
        );
    }
);


boutonEnregistrerAdministrateur.addEventListener(
    "click",
    async function () {

        const nom = champAdminNom.value.trim();
        const email = champAdminEmail.value.trim();
        const motDePasse = champAdminMotDePasse.value;

        if (!nom) {
            alert("Indique le nom de l'administrateur.");
            return;
        }

        if (!email) {
            alert("Indique l'adresse e-mail de l'administrateur.");
            return;
        }

        if (!motDePasse || motDePasse.length < 8) {
            alert("Le mot de passe temporaire doit contenir au moins 8 caractères.");
            return;
        }

        boutonEnregistrerAdministrateur.disabled = true;

        const { data, error } = await supabaseClient.functions.invoke(
            "gerer-administrateur",
            {
                body: {
                    action: "creer",
                    nom: nom,
                    email: email,
                    mot_de_passe: motDePasse
                }
            }
        );

        boutonEnregistrerAdministrateur.disabled = false;

        if (error || !data || data.ok !== true) {
            console.error("Erreur création administrateur :", error || data);
            alert(
                "Impossible de créer l'administrateur.\n\n" +
                ((data && data.message) || (error && error.message) || "Erreur inconnue")
            );
            return;
        }

        formulaireAdministrateur.classList.add("cache");
        boutonAjouterAdministrateur.classList.remove("cache");

        champAdminNom.value = "";
        champAdminEmail.value = "";
        champAdminMotDePasse.value = "";

        await chargerAdministrateurs();

        alert(
            "Administrateur créé.\n\n" +
            "Il peut maintenant se connecter avec :\n" +
            email
        );
    }
);


listeAdministrateurs.addEventListener(
    "click",
    async function (event) {

        // RENOMMER

        if (
            event.target.classList.contains(
                "renommer-administrateur"
            )
        ) {

            const id =
                event.target.dataset.id;

            const ancienNom =
                event.target.dataset.nom;


            const nouveauNom =
                prompt(
                    "Nouveau nom :",
                    ancienNom
                );


            if (nouveauNom === null) {
                return;
            }


            const nomNettoye =
                nouveauNom.trim();


            if (!nomNettoye) {

                alert(
                    "Le nom ne peut pas être vide."
                );

                return;
            }


            const {
                error
            } = await supabaseClient.rpc(
                "renommer_administrateur",
                {
                    p_user_id: id,
                    p_nom: nomNettoye
                }
            );


            if (error) {

                console.error(
                    "Erreur renommage :",
                    error.message
                );

                alert(
                    "Impossible de renommer cet administrateur."
                );

                return;
            }


            await chargerAdministrateurs();

            return;
        }


        // SUPPRIMER

        if (
            event.target.classList.contains(
                "supprimer-administrateur"
            )
        ) {

            const id =
                event.target.dataset.id;

            const nom =
                event.target.dataset.nom;


            const confirmation =
                confirm(
                    "Supprimer l'administrateur \"" +
                    nom +
                    "\" ?\n\n" +
                    "Attention : les données liées à son profil peuvent être supprimées."
                );


            if (!confirmation) {
                return;
            }


            const { data, error } =
                await supabaseClient.functions.invoke(
                    "gerer-administrateur",
                    {
                        body: {
                            action: "supprimer",
                            user_id: id
                        }
                    }
                );

            if (error || !data || data.ok !== true) {

                console.error(
                    "Erreur suppression :",
                    error || data
                );

                alert(
                    "Impossible de supprimer cet administrateur.\n\n" +
                    ((data && data.message) || (error && error.message) || "Erreur inconnue")
                );

                return;
            }

            await chargerAdministrateurs();
        }
    }
);


// ========================================
// QUESTIONS
// ========================================

async function chargerQuestions() {

    const {
        data: questions,
        error
    } = await supabaseClient
        .from("questions")
        .select(
            "id, text, ordre, actif"
        )
        .order(
            "ordre",
            { ascending: true }
        );


    if (error) {

        console.error(
            "Erreur questions :",
            error.message
        );

        return;
    }


    listeQuestions.replaceChildren();


    if (!questions || questions.length === 0) {

        listeQuestions.appendChild(
            creerParagraphe(
                "Aucune question pour le moment."
            )
        );

        return;
    }


    questions.forEach(
        function (question) {

            const bloc =
                document.createElement("div");

            bloc.classList.add(
                "bloc-question"
            );


            const texte =
                creerParagraphe(
                    question.ordre +
                    ". " +
                    question.text
                );


            const statut =
                creerParagraphe(
                    question.actif
                        ? "🟢 Active"
                        : "⚪ Inactive"
                );


            const actions =
                document.createElement("div");

            actions.classList.add(
                "actions-question"
            );


            const monter =
                document.createElement("button");

            monter.type = "button";
            monter.textContent = "↑";
            monter.title = "Monter la question";
            monter.classList.add("deplacer-question", "bouton-secondaire");
            monter.dataset.id = question.id;
            monter.dataset.direction = "haut";


            const descendre =
                document.createElement("button");

            descendre.type = "button";
            descendre.textContent = "↓";
            descendre.title = "Descendre la question";
            descendre.classList.add("deplacer-question", "bouton-secondaire");
            descendre.dataset.id = question.id;
            descendre.dataset.direction = "bas";


            const modifier =
                document.createElement("button");

            modifier.type = "button";
            modifier.textContent = "Modifier";

            modifier.classList.add(
                "modifier-question"
            );

            modifier.dataset.id =
                question.id;


            const statutBouton =
                document.createElement("button");

            statutBouton.type = "button";

            statutBouton.textContent =
                question.actif
                    ? "Désactiver"
                    : "Activer";

            statutBouton.classList.add(
                "changer-statut-question",
                "bouton-secondaire"
            );

            statutBouton.dataset.id =
                question.id;

            statutBouton.dataset.actif =
                String(question.actif);


            actions.appendChild(monter);
            actions.appendChild(descendre);
            actions.appendChild(modifier);
            actions.appendChild(statutBouton);

            bloc.appendChild(texte);
            bloc.appendChild(statut);
            bloc.appendChild(actions);

            listeQuestions.appendChild(bloc);
        }
    );
}


boutonAjouterQuestion.addEventListener(
    "click",
    function () {

        questionEnModification = null;

        remettreChampsAZero();

        formulaireQuestion
            .querySelector("h2")
            .textContent =
            "Nouvelle question";

        boutonEnregistrerQuestion.textContent =
            "Enregistrer";

        formulaireQuestion.classList.remove(
            "cache"
        );

        boutonAjouterQuestion.classList.add(
            "cache"
        );

        champNouvelleQuestion.focus();
    }
);


boutonAnnulerQuestion.addEventListener(
    "click",
    fermerFormulaireQuestion
);


listeQuestions.addEventListener(
    "click",
    async function (event) {

        // DÉPLACER UNE QUESTION

        if (event.target.classList.contains("deplacer-question")) {

            const id = event.target.dataset.id;
            const direction = event.target.dataset.direction;

            const { data: toutesQuestions, error: erreurQuestions } =
                await supabaseClient
                    .from("questions")
                    .select("id, ordre")
                    .order("ordre", { ascending: true });

            if (erreurQuestions || !toutesQuestions) {
                alert("Impossible de modifier l'ordre des questions.");
                return;
            }

            const index = toutesQuestions.findIndex(
                function (question) {
                    return question.id === id;
                }
            );

            if (index === -1) {
                return;
            }

            const indexCible =
                direction === "haut"
                    ? index - 1
                    : index + 1;

            if (indexCible < 0 || indexCible >= toutesQuestions.length) {
                return;
            }

            const questionA = toutesQuestions[index];
            const questionB = toutesQuestions[indexCible];

            const { error: erreurA } =
                await supabaseClient
                    .from("questions")
                    .update({ ordre: questionB.ordre })
                    .eq("id", questionA.id);

            if (erreurA) {
                alert("Impossible de déplacer la question.");
                return;
            }

            const { error: erreurB } =
                await supabaseClient
                    .from("questions")
                    .update({ ordre: questionA.ordre })
                    .eq("id", questionB.id);

            if (erreurB) {
                await supabaseClient
                    .from("questions")
                    .update({ ordre: questionA.ordre })
                    .eq("id", questionA.id);

                alert("Impossible de déplacer la question.");
                return;
            }

            await chargerQuestions();
            return;
        }


        // MODIFIER

        if (
            event.target.classList.contains(
                "modifier-question"
            )
        ) {

            const questionId =
                event.target.dataset.id;


            const {
                data: question,
                error
            } = await supabaseClient
                .from("questions")
                .select("*")
                .eq(
                    "id",
                    questionId
                )
                .single();


            if (error) {

                console.error(
                    error.message
                );

                return;
            }


            questionEnModification =
                question.id;


            formulaireQuestion
                .querySelector("h2")
                .textContent =
                "Modifier la question";


            boutonEnregistrerQuestion.textContent =
                "Enregistrer les modifications";


            champNouvelleQuestion.value =
                question.text;


            ouiAmis.value = question.oui_amis;
            ouiUnSoir.value = question.oui_un_soir;
            ouiCouple.value = question.oui_couple;

            nonAmis.value = question.non_amis;
            nonUnSoir.value = question.non_un_soir;
            nonCouple.value = question.non_couple;

            peutEtreAmis.value = question.peut_etre_amis;
            peutEtreUnSoir.value = question.peut_etre_un_soir;
            peutEtreCouple.value = question.peut_etre_couple;

            pasDuToutAmis.value = question.pas_du_tout_amis;
            pasDuToutUnSoir.value = question.pas_du_tout_un_soir;
            pasDuToutCouple.value = question.pas_du_tout_couple;

            jeNeSaisPasAmis.value = question.je_ne_sais_pas_amis;
            jeNeSaisPasUnSoir.value = question.je_ne_sais_pas_un_soir;
            jeNeSaisPasCouple.value = question.je_ne_sais_pas_couple;


            formulaireQuestion.classList.remove(
                "cache"
            );

            boutonAjouterQuestion.classList.add(
                "cache"
            );

            champNouvelleQuestion.focus();

            return;
        }


        // ACTIVER / DÉSACTIVER

        if (
            event.target.classList.contains(
                "changer-statut-question"
            )
        ) {

            const id =
                event.target.dataset.id;

            const actif =
                event.target.dataset.actif ===
                "true";


            const {
                error
            } = await supabaseClient
                .from("questions")
                .update({
                    actif: !actif
                })
                .eq(
                    "id",
                    id
                );


            if (error) {

                console.error(
                    error.message
                );

                alert(
                    "Impossible de modifier le statut."
                );

                return;
            }


            await chargerQuestions();
        }
    }
);


boutonEnregistrerQuestion.addEventListener(
    "click",
    async function () {

        const texte =
            champNouvelleQuestion
                .value
                .trim();


        if (!texte) {

            alert(
                "Écris une question."
            );

            return;
        }


        const points =
            recupererPoints();


        // MODIFICATION

        if (questionEnModification) {

            const {
                error
            } = await supabaseClient
                .from("questions")
                .update({
                    text: texte,
                    ...points
                })
                .eq(
                    "id",
                    questionEnModification
                );


            if (error) {

                console.error(
                    error.message
                );

                alert(
                    "Impossible de modifier la question."
                );

                return;
            }


            await chargerQuestions();

            fermerFormulaireQuestion();

            return;
        }


        // CRÉATION

        const {
            data: utilisateurData
        } = await supabaseClient.auth
            .getUser();


        if (!utilisateurData.user) {

            alert(
                "Session utilisateur introuvable."
            );

            return;
        }


        const adminId =
            utilisateurData.user.id;


        const {
            data: dernieresQuestions,
            error: erreurOrdre
        } = await supabaseClient
            .from("questions")
            .select("ordre")
            .order(
                "ordre",
                { ascending: false }
            )
            .limit(1);


        if (erreurOrdre) {

            console.error(
                erreurOrdre.message
            );

            return;
        }


        let ordre = 1;


        if (
            dernieresQuestions &&
            dernieresQuestions.length > 0
        ) {

            ordre =
                dernieresQuestions[0].ordre + 1;
        }


        const {
            error
        } = await supabaseClient
            .from("questions")
            .insert({
                admin_id: adminId,
                text: texte,
                ordre: ordre,
                actif: true,
                ...points
            });


        if (error) {

            console.error(
                error.message
            );

            alert(
                "Impossible d'enregistrer la question."
            );

            return;
        }


        await chargerQuestions();

        fermerFormulaireQuestion();
    }
);


// ========================================
// FILTRES RÉSULTATS
// ========================================

function mettreAJourFiltres() {

    boutonClassementAmis.classList.remove("actif");
    boutonClassementUnSoir.classList.remove("actif");
    boutonClassementCouple.classList.remove("actif");

    boutonTop5.classList.remove("actif");
    boutonTop10.classList.remove("actif");
    boutonTous.classList.remove("actif");


    if (categorieClassement === "amis") {
        boutonClassementAmis.classList.add("actif");
    }

    if (categorieClassement === "un-soir") {
        boutonClassementUnSoir.classList.add("actif");
    }

    if (categorieClassement === "couple") {
        boutonClassementCouple.classList.add("actif");
    }


    if (nombreResultats === 5) {
        boutonTop5.classList.add("actif");
    }

    if (nombreResultats === 10) {
        boutonTop10.classList.add("actif");
    }

    if (nombreResultats === "tous") {
        boutonTous.classList.add("actif");
    }
}


// ========================================
// RECHERCHE PARTICIPANT
// ========================================

champRechercheParticipant.addEventListener(
    "input",
    async function () {
        rechercheParticipant =
            champRechercheParticipant.value
                .trim()
                .toLowerCase();

        await chargerResultats();
    }
);


// ========================================
// RÉSULTATS
// ========================================

async function chargerResultats() {

    mettreAJourFiltres();


    let colonne =
        "pourcentage_couple";


    if (categorieClassement === "amis") {
        colonne = "pourcentage_amis";
    }

    if (categorieClassement === "un-soir") {
        colonne = "pourcentage_un_soir";
    }


    const {
        data: resultats,
        error
    } = await supabaseClient
        .from("resultats")
        .select(`
            id,
            participant_id,
            points_amis,
            pourcentage_amis,
            points_un_soir,
            pourcentage_un_soir,
            points_couple,
            pourcentage_couple,
            participants (
                prenom,
                nom,
                age
            )
        `)
        .order(
            colonne,
            { ascending: false }
        );


    if (error) {

        console.error(
            error.message
        );

        return;
    }


    listeResultats.replaceChildren();


    if (!resultats || resultats.length === 0) {

        listeResultats.appendChild(
            creerParagraphe(
                "Aucun résultat pour le moment."
            )
        );

        return;
    }


    let affiches =
        resultats.filter(
            function (resultat) {

                if (!rechercheParticipant) {
                    return true;
                }

                const participant = resultat.participants;

                if (!participant) {
                    return false;
                }

                const texte =
                    (
                        participant.prenom + " " +
                        participant.nom + " " +
                        participant.age
                    ).toLowerCase();

                return texte.includes(rechercheParticipant);
            }
        );


    if (nombreResultats !== "tous") {

        affiches =
            affiches.slice(
                0,
                nombreResultats
            );
    }


    if (affiches.length === 0) {
        listeResultats.appendChild(
            creerParagraphe(
                "Aucun participant ne correspond à la recherche."
            )
        );
        return;
    }


    let pourcentagePrecedent = null;
    let positionPrecedente = 0;


    affiches.forEach(
        function (resultat, index) {

            const participant =
                resultat.participants;


            if (!participant) {
                return;
            }


            let pourcentage = 0;
            let categorie = "";
            let emoji = "";


            if (categorieClassement === "amis") {

                pourcentage =
                    resultat.pourcentage_amis;

                categorie = "Amis";
                emoji = "👥";
            }


            if (categorieClassement === "un-soir") {

                pourcentage =
                    resultat.pourcentage_un_soir;

                categorie = "Un soir";
                emoji = "🌙";
            }


            if (categorieClassement === "couple") {

                pourcentage =
                    resultat.pourcentage_couple;

                categorie = "Couple";
                emoji = "❤️";
            }


            let positionNumerique;

            if (
                pourcentagePrecedent !== null &&
                pourcentage === pourcentagePrecedent
            ) {
                positionNumerique = positionPrecedente;
            } else {
                positionNumerique = index + 1;
            }

            pourcentagePrecedent = pourcentage;
            positionPrecedente = positionNumerique;

            let position = positionNumerique + ".";

            if (positionNumerique === 1) {
                position = "🥇 1.";
            }

            if (positionNumerique === 2) {
                position = "🥈 2.";
            }

            if (positionNumerique === 3) {
                position = "🥉 3.";
            }


            const bloc =
                document.createElement("div");

            bloc.classList.add(
                "bloc-resultat",
                "ouvrir-participant"
            );

            bloc.dataset.participantId =
                resultat.participant_id;


            const titre =
                document.createElement("h3");

            titre.textContent =
                position +
                " " +
                participant.prenom +
                " " +
                participant.nom;


            bloc.appendChild(titre);

            bloc.appendChild(
                creerParagraphe(
                    participant.age +
                    " ans"
                )
            );

            bloc.appendChild(
                creerParagraphe(
                    emoji +
                    " " +
                    categorie +
                    " : " +
                    pourcentage +
                    " %"
                )
            );


            const detail =
                document.createElement("button");

            detail.type = "button";
            detail.textContent = "Voir le détail";

            detail.classList.add(
                "bouton-detail-participant"
            );


            bloc.appendChild(detail);

            listeResultats.appendChild(
                bloc
            );
        }
    );
}


// ========================================
// DÉTAIL PARTICIPANT
// ========================================

listeResultats.addEventListener(
    "click",
    async function (event) {

        const bloc =
            event.target.closest(
                ".ouvrir-participant"
            );


        if (!bloc) {
            return;
        }


        const participantId =
            bloc.dataset.participantId;


        const {
            data: participant,
            error: erreurParticipant
        } = await supabaseClient
            .from("participants")
            .select(
                "id, prenom, nom, age, gsm, reseau"
            )
            .eq(
                "id",
                participantId
            )
            .single();


        if (erreurParticipant) {

            console.error(
                erreurParticipant.message
            );

            return;
        }


        const {
            data: resultat,
            error: erreurResultat
        } = await supabaseClient
            .from("resultats")
            .select(`
                points_amis,
                pourcentage_amis,
                points_un_soir,
                pourcentage_un_soir,
                points_couple,
                pourcentage_couple
            `)
            .eq(
                "participant_id",
                participantId
            )
            .single();


        if (erreurResultat) {

            console.error(
                erreurResultat.message
            );

            return;
        }


        infosParticipant.replaceChildren();


        const nom =
            document.createElement("h3");

        nom.textContent =
            participant.prenom +
            " " +
            participant.nom;


        infosParticipant.appendChild(nom);

        infosParticipant.appendChild(
            creerParagraphe(
                "Âge : " +
                participant.age +
                " ans"
            )
        );

        infosParticipant.appendChild(
            creerParagraphe(
                "GSM : " +
                (
                    participant.gsm ||
                    "Non renseigné"
                )
            )
        );

        infosParticipant.appendChild(
            creerParagraphe(
                "Réseau social : " +
                (
                    participant.reseau ||
                    "Non renseigné"
                )
            )
        );


        scoresParticipant.replaceChildren();

        scoresParticipant.appendChild(
            creerParagraphe(
                "👥 Amis : " +
                resultat.pourcentage_amis +
                " % (" +
                resultat.points_amis +
                " points)"
            )
        );

        scoresParticipant.appendChild(
            creerParagraphe(
                "🌙 Un soir : " +
                resultat.pourcentage_un_soir +
                " % (" +
                resultat.points_un_soir +
                " points)"
            )
        );

        scoresParticipant.appendChild(
            creerParagraphe(
                "❤️ Couple : " +
                resultat.pourcentage_couple +
                " % (" +
                resultat.points_couple +
                " points)"
            )
        );


        const {
            data: reponses,
            error: erreurReponses
        } = await supabaseClient
            .from("reponses")
            .select(`
                reponse,
                question_text,
                points_amis,
                points_un_soir,
                points_couple,
                questions (
                    text,
                    ordre
                )
            `)
            .eq(
                "participant_id",
                participantId
            );


        reponsesParticipant.replaceChildren();


        if (erreurReponses) {

            console.error(
                erreurReponses.message
            );

            return;
        }


        reponses.sort(
            function (a, b) {

                const ordreA =
                    a.questions
                        ? a.questions.ordre
                        : 0;

                const ordreB =
                    b.questions
                        ? b.questions.ordre
                        : 0;

                return ordreA - ordreB;
            }
        );


        reponses.forEach(
            function (reponse) {

                /*
                    Si la question existe encore,
                    on utilise son ordre.

                    Le texte historique reste celui
                    enregistré au moment du questionnaire.
                */

                const ordre =
                    reponse.questions
                        ? reponse.questions.ordre
                        : "";


                const texteHistorique =
                    reponse.question_text ||
                    (
                        reponse.questions
                            ? reponse.questions.text
                            : "Question"
                    );


                let choix =
                    reponse.reponse;


                if (choix === "oui") choix = "Oui";
                if (choix === "non") choix = "Non";
                if (choix === "peut-etre") choix = "Peut-être";
                if (choix === "pas-du-tout") choix = "Pas du tout";
                if (choix === "je-ne-sais-pas") choix = "Je ne sais pas";


                const blocReponse =
                    document.createElement("div");

                blocReponse.classList.add(
                    "bloc-reponse-participant"
                );


                const question =
                    document.createElement("p");

                const strong =
                    document.createElement("strong");


                strong.textContent =
                    (
                        ordre
                            ? ordre + ". "
                            : ""
                    ) +
                    texteHistorique;


                question.appendChild(strong);

                blocReponse.appendChild(question);

                blocReponse.appendChild(
                    creerParagraphe(
                        "Réponse : " + choix,
                        "reponse-choisie"
                    )
                );

                blocReponse.appendChild(
                    creerParagraphe(
                        "👥 " + reponse.points_amis +
                        "   •   🌙 " + reponse.points_un_soir +
                        "   •   ❤️ " + reponse.points_couple +
                        " points",
                        "points-reponse"
                    )
                );


                reponsesParticipant.appendChild(
                    blocReponse
                );
            }
        );


        fondPopup.classList.remove("cache");
        ficheParticipant.classList.remove("cache");
    }
);


// ========================================
// FILTRES
// ========================================

boutonClassementAmis.addEventListener(
    "click",
    async function () {

        categorieClassement = "amis";

        await chargerResultats();
    }
);


boutonClassementUnSoir.addEventListener(
    "click",
    async function () {

        categorieClassement = "un-soir";

        await chargerResultats();
    }
);


boutonClassementCouple.addEventListener(
    "click",
    async function () {

        categorieClassement = "couple";

        await chargerResultats();
    }
);


boutonTop5.addEventListener(
    "click",
    async function () {

        nombreResultats = 5;

        await chargerResultats();
    }
);


boutonTop10.addEventListener(
    "click",
    async function () {

        nombreResultats = 10;

        await chargerResultats();
    }
);


boutonTous.addEventListener(
    "click",
    async function () {

        nombreResultats = "tous";

        await chargerResultats();
    }
);


// ========================================
// POPUP
// ========================================

boutonFermerFiche.addEventListener(
    "click",
    fermerFicheParticipant
);

croixFermerFiche.addEventListener(
    "click",
    fermerFicheParticipant
);

fondPopup.addEventListener(
    "click",
    fermerFicheParticipant
);


// ========================================
// CHARGER LE TABLEAU DE BORD
// ========================================

async function chargerTableauDeBord() {

    const profilOk =
        await chargerProfil();


    if (!profilOk) {
        return false;
    }


    await chargerLienQuestionnaire();
    await chargerPersonnalisation();
    await chargerQuestions();
    await chargerResultats();


    connexionAdmin.classList.add("cache");
    tableauDeBord.classList.remove("cache");


    return true;
}


// ========================================
// CONNEXION
// ========================================

formulaireConnexion.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const motDePasse =
            document
                .getElementById("mot-de-passe")
                .value;


        const {
            error
        } = await supabaseClient.auth
            .signInWithPassword({
                email: email,
                password: motDePasse
            });


        if (error) {

            alert(
                "Adresse e-mail ou mot de passe incorrect."
            );

            return;
        }


        const ok =
            await chargerTableauDeBord();


        if (!ok) {

            await supabaseClient.auth.signOut();

            alert(
                "Impossible de charger le profil administrateur."
            );
        }
    }
);


// ========================================
// RESTAURER LA SESSION APRÈS ACTUALISATION
// ========================================

async function restaurerSession() {

    const {
        data
    } = await supabaseClient.auth
        .getSession();


    if (
        data &&
        data.session
    ) {

        await chargerTableauDeBord();
    }
}


restaurerSession();


// ========================================
// DÉCONNEXION
// ========================================

boutonDeconnexion.addEventListener(
    "click",
    async function () {

        await supabaseClient.auth.signOut();


        profilConnecte = null;


        fermerFicheParticipant();
        fermerFormulaireQuestion();


        formulaireAdministrateur.classList.add(
            "cache"
        );

        boutonAjouterAdministrateur.classList.remove(
            "cache"
        );

        sectionAdministrateurs.classList.add(
            "cache"
        );


        lienQuestionnaire.value = "";

        zoneQrCode.replaceChildren();


        tableauDeBord.classList.add(
            "cache"
        );

        connexionAdmin.classList.remove(
            "cache"
        );


        document.getElementById(
            "mot-de-passe"
        ).value = "";
    }
);