package RESTfiler;

import java.io.Serializable;
import java.util.Date;

public class Quiz implements Serializable{

    String tittel;
    int id;
    Sporsmaal[] sporsmaalArray;
    int sporsmaalNaa; //Sier oss hvilket spørsmål vi er på, index til array.
    String startDato;
    String startTid;

    public String getStartDato() {
        return startDato;
    }

    public void setStartDato(String startDato) {
        this.startDato = startDato;
    }

    public String getStartTid() {
        return startTid;
    }

    public void setStartTid(String startTid) {
        this.startTid = startTid;
    }

    public int getSporsmaalNaa() {
        return sporsmaalNaa;
    }

    public void setSporsmaalNaa(int sporsmaalNaa) {
        this.sporsmaalNaa = sporsmaalNaa;
    }

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



}
