var spillere=[];

var spiller = {
    kallenavn:"",
    poeng:0
};

var quiId = 0;
var kallenavn = "";

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


function addSpillere() {
    for (i=0; i < spillere.length; i++) {
        var markup = "<li class='list-group-item justify-contentbetween'>"+spillere[i].kallenavn+"<span class='badge badge-default badge-pill'>"+spillere[i].poeng+"</span></li>";
        var spesialMarkup = "<li class='list-group-item justify-contentbetween active'>"+spillere[i].kallenavn+"<span class='badge badge-default badge-pill'>"+spillere[i].poeng+"</span></li>";
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
            addSpillere();
            console.log("Returnerte spiller med kallenavn "+spillere[0].kallenavn);
            //Kan returnere ID til spilleren kanskje?/quiz/{quizId}
        },
        error: function(error) {
            console.log(error);
        }
    })
}
