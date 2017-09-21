package RESTfiler;

import java.io.Serializable;

public class Person implements Serializable{

    String navn;
    String etternavn;

    public String getNavn() {
        return navn;
    }

    public String getEtternavn() {
        return etternavn;
    }

    public void setNavn(String navn) {
        this.navn = navn;
    }

    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }
}
