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
var tidIgjen = 0;

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

var quizId = 0; //Lar denne være manuell for testing


//Hent quizId fra localstorage
function getQuizId() {
    quizId = localStorage.getItem("quizId");
    console.log("QuizID= "+quizId);
}

//Interaksjon med REST-server
//Hent quiz-objekt fra server
function hentQuiz(id) {
    $.ajax({
        url: 'rest/QuizService/'+id+'',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (result) {
            quiz = result;
            console.log("Hentet ut "+quiz.tittel);
            setupLayout();
        }
    })
}

function oppdaterSporsmaalNaa() {
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

//Generelle metoder
function main() {
    getQuizId();
    hentQuiz(quizId);
}

main();

//Oppdater layout

function setupLayout() {
    sporsmaal = quiz.sporsmaalArray[quiz.sporsmaalNaa];
    tidIgjen = sporsmaal.varighet;
    $("#sporsmaalTekst").text(sporsmaal.sporsmaalTekst);
    nyeSvar();
}

function tellNed() {
    tidIgjen = tidIgjen-1;
    $("#tid").text(tidIgjen);

    //Logikk for å gå til neste quiz, ish?
    if (tidIgjen <= 0) {
        //Gå til neste quiz
    }
}

function fjernAlleSvar() {
    $(".list-group").empty();
}



function byttSporsmaal() {
    $("#sporsmaalTekst").text();
}

function nyeSvar() {
    //For lengden av spørsm
    for(i = 0; i < sporsmaal.svarArray.length; i++) {
        var markup = "<li class='list-group-item'>"+sporsmaal.svarArray[i]+"</li>";
        $(".list-group").append(markup);
    }


    //For løke end
}




