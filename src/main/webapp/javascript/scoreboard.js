var spillere=[];

//IF quiz spørsmål er siste spørsmål, slett quiz.
var tid = window.setInterval(hentSpillere,1500);

var spiller = {
    kallenavn:"",
    poeng:0
};

var quiId = 0;
var kallenavn = "";
var spillereLagtTil = 0;
var quizferdig = false;

//Hent stuff fra localstorage
function getQuizId() {
    quizId = localStorage.getItem("quizId");
    console.log("QuizID= "+quizId);
}

function getKallenavn() {
    kallenavn = localStorage.getItem("kallenavn");
    console.log("Kallenavn: "+kallenavn);
    $("#kallenavnOutput").text(kallenavn);
}


//HUSK: Trenger metode for sortering av spillere etter score!

function addSpillere(spillereLagtTil) {
    for (i=spillereLagtTil; i < spillere.length; i++) {
        console.log("Spiller sine poeng: "+spillere[i].poeng)
        var markup = "<li class='list-group-item justify-contentbetween'>"+spillere[i].kallenavn+"<span class='badge badge-default badge-pill' id='"+i+"'>"+spillere[i].poeng+"</span></li>";
        var spesialMarkup = "<li class='list-group-item justify-contentbetween active'>"+spillere[i].kallenavn+"<span class='badge badge-default badge-pill' id='"+i+">"+spillere[i].poeng+"</span></li>";
        console.log(spillere[i].kallenavn);

        //Gjør så kallenavnavn kan sammenlignes
        var gaasoyne = '"';
        var fiksetKallenavn  = gaasoyne;
        fiksetKallenavn  += kallenavn;
        fiksetKallenavn  += gaasoyne;

        if (spillere[i].kallenavn === fiksetKallenavn) {
            $(".list-group").append(spesialMarkup);
            $("#tittel").text("Din score: "+spillere[i].poeng);
        }
        else {
            $(".list-group").append(markup);
        }

    }
}

//Live oppdatering av poeng
function oppdaterSpillerPoeng() {
    for (i=0; i < spillere.length; i++) {
        var selector = "#"+i;
        $(selector).text(spillere[i].poeng);
    }
}

getKallenavn();
getQuizId();
hentSpillere();

var lagtTilAllerede = false;

function hentSpillere() {
    $.ajax({
        url: 'rest/QuizService/quiz/'+quizId+'/spillere',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(result) {
            spillere = result;
            if (lagtTilAllerede == false) {
                addSpillere(spillereLagtTil);
                lagtTilAllerede = true;
            }

            console.log("Returnerte spiller med kallenavn "+spillere[0].kallenavn);
            //Kan returnere ID til spilleren kanskje?/quiz/{quizId}
        },
        error: function(error) {
            console.log(error);
        }
    })
}
