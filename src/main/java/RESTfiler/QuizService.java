package RESTfiler;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;

//Liten kommentar:
//Vet vi ikke skal tenke så mye sikkerhet, men det er lett å jukse...
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

//Velger dette siden det er enklere. Kan oppdateres senere.

@Path("/QuizService")
public class QuizService {

    static ArrayList<Quiz> quizArray = new ArrayList<Quiz>();
    static int antQuizGenerert = 0;


    @PUT
    @Path("/quiz/{quizId}")
    @Produces(MediaType.APPLICATION_JSON)
    public int leggInnPoeng(@PathParam("quizId") int quizId, Spiller spiller) {
        for (int i = 0; i < quizArray.size(); i++) {
            if (quizArray.get(i).getId() == quizId) {
                return quizArray.get(i).oppdaterPoeng(spiller);
            }
        }
        return -1;
    }


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
    @Path("/quiz/{quizId}/spillere")
    @Produces(MediaType.APPLICATION_JSON)
    public Spiller[] getSpillere(@PathParam("quizId") int id) {
        //Produser tekstbeskjed
        for (int i = 0; i < quizArray.size(); i++) {
            if (quizArray.get(i).getId() == id) {
                Spiller[] spillere = new Spiller[quizArray.get(i).getSpillere().size()];
                spillere = quizArray.get(i).getSpillere().toArray(spillere);
                return spillere;
            }
        }
        return null;
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
    public void oppdaterSporsmaalNr(Quiz quizInn) {
        for (int i = 0; i < quizArray.size(); i++) {
            if (quizInn.getId() == quizArray.get(i).getId()) {
                quizArray.get(i).setSporsmaalNaa(quizInn.getSporsmaalNaa());
            }
        }
    }

    @POST
    @Path("/quiz/{quizId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void addSpiller(@PathParam("quizId") int quizId, String kallenavn) {
        Spiller nySpiller = new Spiller();
        nySpiller.setKallenavn(kallenavn);
        for (int i = 0; i < quizArray.size(); i++) {
            if (quizArray.get(i).getId() == quizId) {
                quizArray.get(i).addSpiller(nySpiller);
            }
        }
    }


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void leggInQuiz(Quiz quiz) {
        quiz.setId(antQuizGenerert);
        antQuizGenerert = antQuizGenerert +1;
        quizArray.add(quiz);
    }

    @DELETE
    @Path("quiz/{quizId}")
    public int slettKunde(@PathParam("quizId") int quizId) {
        for (int i = 0; i < quizArray.size(); i++) {
            if (quizArray.get(i).getId() == quizId) {
                quizArray.remove(i);
                return i;
            }
        }
        return -1;
    }

}
