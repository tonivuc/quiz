package RESTfiler;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/QuizService")
public class QuizService {

    //String lagretUtMelding;
    static String lagretMeldingInn = "kake";

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getKunde() {
        //Produser tekstbeskjed
        return lagretMeldingInn;
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
    public void leggInnNavn(Person person) {
        System.out.println("INITIATED!");
        lagretMeldingInn = person.getNavn();
        System.out.println(person.getNavn());
    }

}
