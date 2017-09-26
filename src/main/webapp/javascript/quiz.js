// www.mysite.com/my_app.html?Use_Id=abc


//Kan bruke det her til å få ut QuizID fra URLen
//var GET = {};
/*
var query = window.location.search.substring(1).split("&");
for (var i = 0, max = query.length; i < max; i++)
{
    if (query[i] === "") // check for trailing & with no param
        continue;

    var param = query[i].split("=");
    //GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
}
*/
var tid = window.setInterval(tellNed,1000);


//Objekt og variabler
var quiz = {
    tittel:"",
    id:0,
    sporsmaalArray:[],
    sporsmaalNaa:0,
    startTidspunkt:""
};

var sporsmaal = {
    sporsmaalTekst:"",
    svarArray:[],
    bildeURL:"",
    riktigSvar:0,
    varighet:0
};

var tidIgjen = 0;
var quizId = 0; //Lar denne være manuell for testing
var kallenavn;
var poeng = 0;


//Hent stuff fra localstorage
function getQuizId() {
    quizId = localStorage.getItem("quizId");
    console.log("QuizID= "+quizId);
}

function getKallenavn() {
    kallenavn = localStorage.getItem("kallenavn");
    console.log("Kallenavn: "+kallenavn)
    $("#kallenavnOutput").text(kallenavn);
}

//Interaksjon med REST-server
//Hent quiz-objekt fra server
function hentQuiz(id) {
    $.ajax({
        url: 'rest/QuizService/quiz/'+id+'',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {
            quiz = result;
            console.log("Hentet ut "+quiz.tittel);
            setupLayout();
            leggInnSpiller();
        }
    })
}

function oppdaterSporsmaalNaa() { //Altså spørsmålnr
    $.ajax({
        url: 'rest/QuizService/sporsmaal',
        type: 'POST',
        data: JSON.stringify(quiz),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(result) {
            console.log("Oppdaterte serveren med nåværende indeksen til nåværende spørsmål")
        }
    })
}

function leggInnSpiller() {
    $.ajax({
        url: 'rest/QuizService/quiz/'+quizId+'',
        type: 'POST',
        data: JSON.stringify(kallenavn),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(result) {
            alert("Kallenavn "+kallenavn+" lagt på server!")
            //Kan returnere ID til spilleren kanskje?/quiz/{quizId}
        },
        error: function(error) {
            console.log(error);
        }
    })
}

function oppdaterSpillerPoeng() {
    //Hvis svar er riktig
    poeng=poeng+10;


    $.ajax({
        url: 'rest/QuizService/quiz/'+quizId+'',
        type: 'PUT',
        data: JSON.stringify({
            kallenavn:kallenavn,
            poeng:poeng,
        }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(result) {
            alert("OppdaterPoeng returnerte "+result);
            //Kan returnere ID til spilleren kanskje?/quiz/{quizId}
        },
        error: function(error) {
            console.log(error);
        }
    })
}

//Generelle metoder
function main() {
    getQuizId();
    getKallenavn();
    hentQuiz(quizId);
}

main();

//Oppdater layout

function setupLayout() {
    sporsmaal = quiz.sporsmaalArray[quiz.sporsmaalNaa];
    console.log(sporsmaal.varighet);
    tidIgjen = sporsmaal.varighet;
    $("#sporsmaalTekst").text(sporsmaal.sporsmaalTekst);
    $("#poeng").text("Poeng: "+poeng);
    nyeSvar();
}

function tellNed() {
    tidIgjen = tidIgjen-1;
    $("#tid").text(tidIgjen);

    //Logikk for å gå til neste quiz, ish?
    if (tidIgjen === 0) {
        nesteSporsmaal();
    }
}

function nesteSporsmaal() {
    oppdaterSpillerPoeng();
    quiz.sporsmaalNaa++;
    console.log("Vi er næ på spørsmål: "+quiz.sporsmaalNaa);
    setupLayout();

    console.log("Spørsmåltittel: "+sporsmaal.sporsmaalTekst);
    oppdaterSporsmaalNaa(); //Fortell serveren hvilket spørsmål vi er på
    fjernAlleSvar();
    nyeSvar();
}

function fjernAlleSvar() {
    $("#listgroup").empty();
}



function byttSporsmaal() {
    $("#sporsmaalTekst").text(sporsmaal.sporsmaalTekst);
}

function nyeSvar() {
    //For lengden av spørsm
    console.log("Legger inn nye svar")
    for(i = 0; i < sporsmaal.svarArray.length; i++) {
        console.log(sporsmaal.svarArray[i]);
        var markup = "<li class='list-group-item'>"+sporsmaal.svarArray[i]+"</li>";
        $(".list-group").append(markup);
    }


    //For løke end
}




