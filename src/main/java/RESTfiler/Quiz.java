package RESTfiler;

import java.io.Serializable;
import java.util.Date;

public class Quiz implements Serializable{

    String tittel;
    int id;
    Sporsmaal[] sporsmaalArray;
    String startTidspunkt;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTittel() {
        return tittel;
    }

    public void setTittel(String tittel) {
        this.tittel = tittel;
    }

    public Sporsmaal[] getSporsmaalArray() {
        return sporsmaalArray;
    }

    public void setSporsmaalArray(Sporsmaal[] sporsmaalArray) {
        this.sporsmaalArray = sporsmaalArray;
    }

    public String getStartTidspunkt() {
        return startTidspunkt;
    }

    public void setStartTidspunkt(String startTidspunkt) {
        this.startTidspunkt = startTidspunkt;
    }

}
