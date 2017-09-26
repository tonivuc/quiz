
//Placeholder metode for å vise at det går an å legge inn rader
//Skal hente inn rad-informasjon v.h.a. AJAX senere.
var serverQuizzer; //Quiz[]
var lokaleQuizzer = []; //Quiz[]

//Kan bruke det her til å få opp scoreboard senere
$(document).on("click", ".quizButton", function(event){
    if ($("#kallenavnInput") != "" || $("#kallenavnInput") != " ") {
        //Legg inn valgt quiz som en slags cookie
        valgtQuiz = $(this).attr('id');
        localStorage.setItem("quizId", valgtQuiz);
        localStorage.setItem("kallenavn", $("#kallenavnInput").val());
        document.location.href = "quiz.html";
    }

});


var tid = window.setInterval(refresh,2000)

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

function sjekkMotLokalt() {
    //Sletter først, mindre å gå gjennom etterpå


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
            fjernQuiz();
        }
    }


    //Sammenlign alle quizIDer i serverquizzer med quizIDer i lokaleQuizzer
    //Legg inn nye quizzer
    var fant = false;
    //Gå gjennom alle quizzer i serverQuizzer
    for (i = 0; i < serverQuizzer.length; i++) {
        console.log("Går inn i loop "+i);
        //Sammenlign element i i serverquizzer, med alle element i lokalequizzer
        for (j = 0; j < lokaleQuizzer.length; j++) {
            console.log("Går inn i indre loop "+j)
            fant = false;
            //Hvis element j har en match i lokaleQuizzer
            if (serverQuizzer[i].id == lokaleQuizzer[j].id) {
                //MÅ FINNE MINST EN!
                //Når den har funnet en, ikke let etter samme igjen!
                //Når den har funnet en instans av serverQuiz[0] i lokalequiz
                //Ikke sjekk serverQuiz[0] igjen
                fant = true;
                console.log("Vi sjekker om "+serverQuizzer[i].tittel+" er lik "+lokaleQuizzer[j].tittel)
                console.log("Fant quiz "+lokaleQuizzer[j].tittel+" i lokale quizzer");
                break;
            }
        }
        //Hvis det ikke har en match i lokale quizzer
        if (fant != true) {
            console.log("Legger inn quiz "+serverQuizzer[i].tittel+" i websiden")
            //Legg inn ny quiz i lokaleQuizzer array og i HTML
            leggInnQuiz(serverQuizzer[i]);
        }
    }
}

function leggInnQuiz(quiz) {
    lokaleQuizzer.push(quiz);

    var startTid = new Date(quiz.startDato+"T"+quiz.startTid+":00+02:00");
    //Legacy-kode: onclick="location.href='http://google.com';" value="Go to Google"

    //Alt herfra er bare for å få med hvilken quiz man har klikket på
    var markupStart = "<tr><td>"+quiz.tittel+"</td><td>" + startTid.toDateString() + "</td><td>8/20</td><td class='knappfelt'><form action='quiz.html?id='><button id='";
    var markupMiddle = quiz.id;
    var markupLast = "' type='submit' class='btn btn-success btn-block quizButton' >Bli med!</button></form></td></tr>";
    var con1 = markupStart.concat(markupMiddle);
    var con2 = con1.concat(markupLast);
    $("table tbody").append(con2);
}

function fjernQuiz() {

}