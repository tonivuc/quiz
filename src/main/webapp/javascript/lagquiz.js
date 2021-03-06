
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
    function leggTilSvar() {
        var svar = $("#nyttSvar").val();
        midlertidligSvarArray.push(svar);
        $(".funkyradio").append("<div class='funkyradio-primary' id='radioParent" + knappnr + "'> <input class='radioknapp' type='radio' name='radio' id='radio" + knappnr + "'/> <label for='radio" + knappnr + "'>" + svar + "</label></div>");
        knappnr++;

        $('#manglerSvar').hide();
        $("#nyttSvar").val("");
        $("#nyttSvar").focus(); //Setter fokus tilbake til input for å legge til nytt svar
    }

    $("#nyttSvarKnapp").click(leggTilSvar); //Legger til et svar når du trykker på "legg til svar"-knappen

    //Hvis input for å legge til svar er i fokus kan man trykke enter for å legge til det svaret
    $(document).keypress(function (event) {
        var code = event.keyCode;
       if(code == 13 && $("#nyttSvar").is(":focus")) {
           leggTilSvar();
       }
    });

    $(document).on("click", ".radioknapp", function(event){
        selectedKnapp = $(this).attr('id');
        selectedKnappNr = selectedKnapp.substr(selectedKnapp.length - 1); //Last index
        $('#manglerRiktig').hide();
    });

    $(document).on("click", ".fjern-knapp", function(event){
        var knappFjernet = $(this).parent().attr('id');
        var knappFjernetId = knappFjernet.substr(knappFjernet.length - 1); //Last index
        quiz.sporsmaalArray.splice(knappFjernetId, 1);   //Må også fjernes fra spørsmålarray
        $(this).parent().remove();
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

            //Append av liste med fjern-knapp
            var linje1 = "<li class='customButtonList list-group-item' id='sporsmaalOutput"+(quiz.sporsmaalArray.length-1)+"'>";
            var linje2 = "<span class='name'>"+sporsmaal.sporsmaalTekst+"</span>";
            var linje3 = "<button type='button' class='btn btn-default btn-sm date fjern-knapp'>";
            var linje4 = "<span class='glyphicon glyphicon-remove fjern-knapp'></span> Fjern";
            var linje5 = "</button></li>";

            $("#quizSporsmaalListe").append(linje1+linje2+linje3+linje4+linje5);

            knappnr = 0;
            selectedKnappNr = -1;
            $("#sporsmalLagtTil").show();
            $("#sporsmalLagtTil").fadeTo(2000, 500).slideUp(500, function(){
                $("#sporsmalLagtTil").slideUp(500);
            });

        }
    });

    //Send inn Quiz til REST-serveren
    $("#submitQuiz").click(function () {

        quiz.tittel = $("#navnInput").val();
        quiz.startDate = new Date($("#quizStartDato").val());

        var link = "<a href='/Quizprogram/'></a>"
        $("#hovedSkjema").append(link);

        submitAjax();
        console.log(JSON.stringify(quiz));
        document.location.href = "/Quizprogram/";
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
                console.log("Quiz posted!")
            },
            error: function (err) {
                console.log(err)
            }
        })
    }