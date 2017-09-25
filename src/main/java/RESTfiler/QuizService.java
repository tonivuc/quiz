package RESTfiler;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;

@Path("/QuizService")
public class QuizService {

    static ArrayList<Quiz> quizArray = new ArrayList<Quiz>();
    static int antQuizGenerert = 0;

    @GET
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
    @Path("/{quizId}")
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
