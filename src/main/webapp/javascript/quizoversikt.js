
//Variabler
var serverQuizzer; //Quiz[]
var lokaleQuizzer = []; //Quiz[]
var tid = window.setInterval(refresh,2000);
var tid2 = window.setInterval(oppdaterTid,1000);

//Generelle metoder

//Legger til og fjerner quizzer lokalt avhengig av hvordan det ser ut på serveren
function sjekkMotLokalt() {
    //Sletter først, mindre å gå gjennom etterpå

    /* Fjernekoden fungerer ikke enda. Men man kan refreshe for å fjerne
    var fant2 = false;
    //Sjekk om det finnes et element i lokaleQuizzer som ikke finnes i serverQuizzer
    //Gå gjennom alle elementer i lokaleQuizzer
    for (i = 0; i < lokaleQuizzer.length; i++) {
        //Sjekk om hver i i lokaleQuizzer finnes i serverQuizzer
        for (j = 0; j < serverQuizzer.length; j++) {
            //Hvis vi fant den lokale quizzen i serverquizzlisten
            if (lokaleQuizzer[i].id == serverQuizzer[j].id) {
                fant2 = true;
                break;
            }
        }
        //Hvis vi ikke fant den lokale quizzen i serverQuizzlisten
        if (fant2 != true) {
            //Fjern den lokale quizzen fra den lokale quizlisten og HTML
            fjernQuiz(lokaleQuizzer[i].id);
        }
    }
    /*


    //Sammenlign alle quizIDer i serverquizzer med quizIDer i lokaleQuizzer
    //Legg inn nye quizzer
    var fant = false;
    //Gå gjennom alle quizzer i serverQuizzer
    for (i = 0; i < serverQuizzer.length; i++) {

        //Sammenlign element i i serverquizzer, med alle element i lokalequizzer
        for (j = 0; j < lokaleQuizzer.length; j++) {

            fant = false;
            //Hvis element j har en match i lokaleQuizzer
            if (serverQuizzer[i].id == lokaleQuizzer[j].id) {
                //MÅ FINNE MINST EN!
                //Når den har funnet en, ikke let etter samme igjen!
                //Når den har funnet en instans av serverQuiz[0] i lokalequiz
                //Ikke sjekk serverQuiz[0] igjen
                fant = true;
                break;
            }
        }
        //Hvis det ikke har en match i lokale quizzer
        if (fant != true) {

            //Legg inn ny quiz i lokaleQuizzer array og i HTML
            leggInnQuiz(serverQuizzer[i]);
        }
    }
}

//Endre layout/html

//Oppdater tiden det er igjen til quizzen starter
function oppdaterTid() {

    //If (tidfelt regn ut hvor mange sekunder som er igjen) < 100

    for (i=0; i < lokaleQuizzer.length; i++) {
        var selector = "#tidFelt";
        selector += i;
        var tidNaa = $(selector).text();
        if (tidNaa < -30000 || tidNaa === "Ugyldig tid") {
            $(selector).text("Ugyldig tid");
        }
        else if (tidNaa < 0 || tidNaa === "Startet") {
            $(selector).text("Startet");
        }
        else {
            tidNaa--;
            $(selector).text(tidNaa);
        }

    }
}

//Knapp for å navigere til quiz
$(document).on("click", ".quizButton", function(event){
    if (!($("#kallenavnInput").val().length === 0)) {
        //Legg inn valgt quiz som en slags cookie
        valgtQuiz = $(this).attr('id');
        localStorage.setItem("quizId", valgtQuiz);
        localStorage.setItem("kallenavn", $("#kallenavnInput").val());
        document.location.href = "venteside.html";
    }
    else {
        alert("Skriv inn et kallenavn :)")
    }

});

//Knapp for å åpne scoreboardet til en quiz
$(document).on("click", ".scoreboardKnapp", function(event){
        valgtQuiz = $(this).attr('id');
        localStorage.setItem("quizId", valgtQuiz);
        localStorage.setItem("kallenavn", $("#kallenavnInput").val());
        document.location.href = "scoreboard.html";

});


//Legg inn en quiz i tabellen
function leggInnQuiz(quiz) {
    lokaleQuizzer.push(quiz);

    var startTid = new Date(quiz.startDate);
    var tidnaa = new Date();
    var sekundertil = startTid.getTime() - tidnaa.getTime();
    sekundertil = Math.round(sekundertil/1000);

    //Brukes til å finne <td> som skal oppdateres
    var tidFeltId = "tidFelt";
    tidFeltId += quiz.id;

    //Alt herfra er bare for å få med hvilken quiz man har klikket på
    var markupStart = "<tr id='rad"+quiz.id+"'><td><img style='margin-left:5px; float:left' class='scoreboardKnapp' id='"+i+"' border='0' alt='scorebaord' src='img/scoreboard-symbol.png' width='20' height='20'>"+quiz.tittel+"</td><td id='"+tidFeltId+"'>" + sekundertil + "</td><td>8/20</td><td class='knappfelt'><button id='";
    var markupMiddle = quiz.id;
    var markupLast = "' type='submit' class='btn btn-success btn-block quizButton' >Bli med!</button></form></td></tr>";
    var con1 = markupStart.concat(markupMiddle);
    var con2 = con1.concat(markupLast);
    $("table tbody").append(con2);
}

//Fjern quiz fra tabellen
function fjernQuiz(quizID) {
    console.log("Inne i fjernQuiz");
    var rad = "#rad"+quizID;
    console.log("Rad: "+rad);
    $(rad).remove();
}

//AJAX, koding mot serveren

//Henter inn en array med quizzer fra serveren
function refresh() {
    $.ajax({
        url: 'rest/QuizService/quiz',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {
            serverQuizzer = result; //Dette er en array med quizzer
            console.log("Lengde serverquiz: "+serverQuizzer.length);
            if (typeof lokaleQuizzer == 'undefined') {
                console.log("Undefined found. Setting to serverquizzer!")
                //lokaleQuizzer = serverQuizzer;
            }
            sjekkMotLokalt();
        }
    })
}


// Find and remove selected table rows
/* WTF IS DIS
$(".delete-row").click(function(){
    $("table tbody").find('input[name="record"]').each(function(){
        if($(this).is(":checked")){
            $(this).parents("tr").remove();
        }
    });
});
*/