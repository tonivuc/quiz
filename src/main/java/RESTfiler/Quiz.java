package RESTfiler;

import java.io.Serializable;
import java.util.Date;

public class Quiz implements Serializable{

    String tittel;
    Sporsmaal sporsmaalArray;

    public String getTittel() {
        return tittel;
    }

    public void setTittel(String tittel) {
        this.tittel = tittel;
    }

    public Sporsmaal getSporsmaalArray() {
        return sporsmaalArray;
    }

    public void setSporsmaalArray(Sporsmaal sporsmaalArray) {
        this.sporsmaalArray = sporsmaalArray;
    }

    public Date getStartTidspunkt() {
        return startTidspunkt;
    }

    public void setStartTidspunkt(Date startTidspunkt) {
        this.startTidspunkt = startTidspunkt;
    }

    Date startTidspunkt; //Litt usikker på hva slags objekt jeg skal bruke her

}
