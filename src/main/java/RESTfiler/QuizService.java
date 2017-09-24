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
    /*
    @POST
    @Path("/{navnInput}")
    @Consumes(MediaType.TEXT_PLAIN)
    public void addKunde(@PathParam("navnInput") String kundeId) {
        //lagretMeldingInn = kundeId;
        //System.out.println(kundeId);
    }
    */

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
