
//Hoved-objekt, inneholder mange spørsmål med svar.
    var quiz = {
        tittel:"",
        id:0,
        sporsmaalArray:[],
        sporsmaalNaa:0,
        startDate:""
    };

    var knappnr = 0;
    var midlertidligSvarArray = [];
    var selectedKnapp;
    var selectedKnappNr = -1;

    //Legger inn nytt
    $("#nyttSvarKnapp").click(function () {
        var svar = $("#nyttSvar").val();
        midlertidligSvarArray.push(svar);
        $(".funkyradio").append("<div class='funkyradio-primary' id='radioParent"+knappnr+"'> <input class='radioknapp' type='radio' name='radio' id='radio"+knappnr+"'/> <label for='radio"+knappnr+"'>"+svar+"</label></div>");
        knappnr++;

        $('#manglerSvar').hide();
        $("#nyttSvar").val("");
    });

    $(document).on("click", ".radioknapp", function(event){
        selectedKnapp = $(this).attr('id');
        selectedKnappNr = selectedKnapp.substr(selectedKnapp.length - 1); //Last index
        $('#manglerRiktig').hide();
    });

    $("#sporsmaalFerdig").click(function () {
        if (knappnr <= 1) {
            $('#manglerSvar').show();
        }
        else if (selectedKnappNr == -1) {
            $('#manglerRiktig').show();
        }
        else {

            var sporsmaal = {
                sporsmaalTekst:"",
                svarArray:[],
                bildeURL:"",
                riktigSvar:0,
                varighet:0
            };

            var value1=$.trim($("#nyttSporsmaalInput").val());
            var value2=$.trim($("#spmVarighet").val());


            if(value1.length>0) {sporsmaal.sporsmaalTekst =value1;}
            else {sporsmaal.sporsmaalTekst = "Stefortredende tekst"}
            if(value2.length>0) {sporsmaal.varighet = value2;}
            else { sporsmaal.varighet = 10;}
            sporsmaal.bildeURL = $("#spmBildeURL").val();
            sporsmaal.riktigSvar = selectedKnappNr;

            //Fyll spørsmål-objektet  med svar og fjern stuff fra "Modal"
            for(i = 0; i < midlertidligSvarArray.length; i++){
                $("#radioParent"+i+"").remove();
                sporsmaal.svarArray[i] = midlertidligSvarArray[i];
            }
            midlertidligSvarArray = [];

            $("#nyttSporsmaalInput").val("");
            $("#spmVarighet").val("");
            $("#nyttSvar").val("");
            $("#spmBildeURL").val("");
            quiz.sporsmaalArray.push(sporsmaal);
            $("#quizSporsmaalListe").append("<a href='' class='list-group-item'>"+sporsmaal.sporsmaalTekst+"</a>");
            knappnr = 0;
            selectedKnappNr = -1;
        }
    });


    //var myVar = setInterval(getFunksjon, 1000);

    //Send inn Quiz til REST-serveren
    $("#submitQuiz").click(function () {

        quiz.tittel = $("#navnInput").val();
        quiz.startDate = new Date($("#quizStartDato").val());

        var link = "<a href='quizoversikt.html'>Se live quizzer! </a>"
        $("#hovedSkjema").append(link);

        submitAjax();
        console.log(JSON.stringify(quiz));
    });

    function submitAjax() {
        //AJAX
        $.ajax({
            url: 'rest/QuizService',
            type: 'POST',
            data: JSON.stringify(quiz),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (result) {
                alert("Stringify success!");
            },
            error: function (err) {
                console.log(err)
            }
        })
    }