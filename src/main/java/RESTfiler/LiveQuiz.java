package RESTfiler;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;

public class LiveQuiz implements Serializable{

    String tittel;
    int id;
    Sporsmaal[] sporsmaalArray;
    int sporsmaalNaa; //Sier oss hvilket spørsmål vi er på, index til array.
    Date startDate;
    ArrayList<Spiller> spillere = new ArrayList<>();


    public void addSpiller(Spiller spiller) {
        spillere.add(spiller);
    }

    public int oppdaterPoeng(Spiller spiller) {
        for (int i = 0; i < spillere.size(); i++) {
            //Når man sammenligner strings fra serveren med vanlige strings må serverstring sine /" fjernes.
            String omformetServerNavn = spillere.get(i).getKallenavn().replaceAll("\"","");
            if (omformetServerNavn.equals(spiller.getKallenavn())) {
                spillere.get(i).setPoeng(spiller.getPoeng());
                return spillere.get(i).getPoeng();
            }
        }
        return -1;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public ArrayList<Spiller> getSpillere() {
        return spillere;
    }

    public void setSpillere(ArrayList<Spiller> spillere) {
        this.spillere = spillere;
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

    public LocalDateTime getSluttTid() {
        LocalDateTime sluttTid = LocalDateTime.ofInstant(startDate.toInstant(), ZoneId.systemDefault());
        for (Sporsmaal question : sporsmaalArray) {
            sluttTid = sluttTid.plusSeconds(question.varighet);
        }
        return sluttTid;
    }

}
