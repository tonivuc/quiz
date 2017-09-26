
//Hoved-objekt, inneholder mange spørsmål med svar.
    var quiz = {
        tittel:"",
        id:0,
        sporsmaalArray:[],
        sporsmaalNaa:0,
        startDato:"",
        startTid:"",
    };

    $('#manglerRiktig').hide();
    $('#manglerSvar').hide();

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
    });

    $(document).on("click", ".radioknapp", function(event){
        selectedKnapp = $(this).attr('id');
        selectedKnappNr = selectedKnapp.substr(selectedKnapp.length - 1); //Last index
        $('#manglerRiktig').hide();
    });

    $("#sporsmaalFerdig").click(function () {
        console.log(knappnr);
        if (knappnr <= 0) {
            $('#manglerSvar').show();
        }
        else if (selectedKnappNr == -1) {
            $('#manglerRiktig').show();
        }
        else {
            console.log("Else kjører")
            //$("#hovedModal").modal('hide');

            var sporsmaal = {
                sporsmaalTekst:"",
                svarArray:[],
                bildeURL:"",
                riktigSvar:0,
                varighet:0
            };

            sporsmaal.sporsmaalTekst =$("#nyttSporsmaalInput").val();
            sporsmaal.riktigSvar = selectedKnappNr;
            sporsmaal.varighet = $("#spmVarighet").val();
            sporsmaal.bildeURL = $("#spmBildeURL").val();
            //Fyll spørsmål-objektet  med svar og fjern stuff fra "Modal"
            for(i = 0; i < midlertidligSvarArray.length; i++){
                $("#radioParent"+i+"").remove();
                sporsmaal.svarArray[i] = midlertidligSvarArray[i];
            }
            midlertidligSvarArray = [];

            $("#nyttSporsmaalInput").val("");
            $("#spmVarighet").val("");
            $("#nyttSvar").val("");
            $("#spmBildeURL").val("http://www.petmd.com/sites/default/files/what-does-it-mean-when-cat-wags-tail.jpg")
            console.log("Array length: "+quiz.sporsmaalArray.length);
            quiz.sporsmaalArray.push(sporsmaal);
            console.log(quiz.sporsmaalArray[quiz.sporsmaalArray.length-1]);
            $("#quizSporsmaalListe").append("<a href='' class='list-group-item'>"+sporsmaal.sporsmaalTekst+"</a>");
        }
    });


    //var myVar = setInterval(getFunksjon, 1000);

    //Send inn Quiz til REST-serveren
    $("#submitQuiz").click(function () {
        console.log(JSON.stringify(quiz));

        quiz.tittel = $("#navnInput").val();
        quiz.startDato = $("#quizStartDato").val();
        quiz.startTid = $("#quizStartTid").val();

        console.log("Quiz stringified"+JSON.stringify(quiz));

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

        /*
        $.ajax({
            url: 'rest/lagquiz/' + $("#navnInput").val(),
            type: 'POST',
            success: function (result) {
                alert("Post success!");
            }
        })

        alert("test");

        */
    });