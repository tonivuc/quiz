package RESTfiler;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/oppgv2/")
public class restTest {

    //String lagretUtMelding;
    static String lagretMeldingInn = "kake";

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getKunde() {
        //Produser tekstbeskjed
        return lagretMeldingInn;
    }

    @POST
    @Consumes(MediaType.TEXT_PLAIN)
    public void addKunde(String kundeId) {
        lagretMeldingInn = kundeId;
    }
}
