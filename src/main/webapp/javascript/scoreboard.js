var spillere=[];

//IF quiz spørsmål er siste spørsmål, slett quiz.
var tid = window.setInterval(hentSpillere,2000);

var spiller = {
    kallenavn:"",
    poeng:0
};

var quiId = 0;
var kallenavn = "";
var spillereLagtTil = 0;
var quizferdig = false;
var lagtTilAllerede = false; //Sier oss

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

function addSpillere(startIndeks) {
    for (i=startIndeks; i < spillere.length; i++) {
        //console.log("Legger spiller inn i HTML, spiller nr. "+spillereLagtTil)
        spillereLagtTil++; //Holder oversikt over hvor mange spillere vi har lagt til
        //console.log("SpillerereLagtTil er np: "+spillereLagtTil);
        console.log("Spiller sine poeng: "+spillere[i].poeng);
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
    oppdaterSpillerPoeng();
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



function hentSpillere() {
    $.ajax({
        url: 'rest/QuizService/quiz/'+quizId+'/spillere',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(result) {
            spillere = result;
            //if (lagtTilAllerede === false) {
            console.log("Vi er i hentSpillere. Spillere lagt til: "+spillereLagtTil)
            addSpillere(spillereLagtTil); //Legg inn de spillerne som ikke allerede er der
            lagtTilAllerede = true;
            //}
            //Kan returnere ID til spilleren kanskje?/quiz/{quizId}
        },
        error: function(error) {
            console.log(error);
        }
    })
}
