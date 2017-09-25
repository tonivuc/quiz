package RESTfiler;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;

//Liten kommentar:
//Vet vi ikke skal tenke så mye sikkerhet, lett å jukse...
//To måter å ordne sjekking av svar på quiz.

//REMOTE:
//Serveren må vite hva hver eneste spiller valgte? Og gi poeng derretter?
//Kunne jo sendt den valgte indeksen lokalt til svar-array til serveren.
//Serveren kunne så oppdatert poengene til hver spiller på servern hvis de svarte riktig
//Returnert en array med SpillerPoeng-objekter.
//Så henter klienten ut sin egen poengsum

//LOKALT:
//Vi sjekker om valgt svarindeks matcher riktigSvarIndeks
//Hvis ja, poeng+10
//Send spillerens poengsum til serveren som en UPDATE.

//Velger dette siden det er enklere.
//Man kan jo si OH, så mane UPDATE-queries til serveren!
//Men er jo like mange som må sendes tilbake hvis det andre hadde vært valgt.

@Path("/QuizService")
public class QuizService {

    static ArrayList<Quiz> quizArray = new ArrayList<Quiz>();
    static int antQuizGenerert = 0;

    @GET
    @Path("/quiz")
    @Produces(MediaType.APPLICATION_JSON)
    public Quiz[] getQuizzer() {
        //Produser tekstbeskjed
        Quiz[] quizzer = new Quiz[quizArray.size()];
        for (int i = 0; i < quizArray.size(); i++) {
            quizzer[i] = quizArray.get(i);
        }
        return quizzer;
    }

    @GET
    @Path("/quiz/{quizId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Quiz getQuiz(@PathParam("quizId") int quizId) {
        for (int i = 0; i < quizArray.size(); i++) {
            if (quizArray.get(i).getId() == quizId) {
                System.out.println("Returnerer "+quizArray.get(i).getTittel());
                return quizArray.get(i);
            }
        }
        return null;
    }



    //Metoden oppdaterer quizzen på serveren så den vet hvilket spørsmål den er på
    @POST
    @Path("/sporsmaal")
    @Consumes(MediaType.APPLICATION_JSON)
    public void addKunde(Quiz quizInn) {
        for (int i = 0; i < quizArray.size(); i++) {
            if (quizInn.getId() == quizArray.get(i).getId()) {
                quizArray.get(i).setSporsmaalNaa(quizInn.getSporsmaalNaa());
            }
        }
    }

    @POST
    @Path("/quiz")
    @Consumes(MediaType.APPLICATION_JSON)
    public void addSpiller(KallenavnQuiz kallenavnquiz) {
        Spiller nySpiller = new Spiller();
        nySpiller.setKallenavn(kallenavnquiz.getKallenavn());
        for (int i = 0; i < quizArray.size(); i++) {
            if (quizArray.get(i).getId() == kallenavnquiz.quizId) {
                quizArray.get(i).addSpiller(nySpiller);
            }
        }
    }


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void leggInQuiz(Quiz quiz) {
        System.out.println(quiz.getTittel());
        System.out.println("WE HAVE ENTERED THE QUIZ METHOD!");

        System.out.println("antQuizGenerert: "+antQuizGenerert);
        quiz.setId(antQuizGenerert);
        antQuizGenerert = antQuizGenerert +1;
        System.out.println("antQuizGenerert (andre linje): "+antQuizGenerert);

        quizArray.add(quiz);
        System.out.println(quiz.getTittel()+" sin ID = "+quiz.getId());
    }

}
