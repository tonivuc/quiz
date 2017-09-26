package RESTfiler;

import java.io.Serializable;
import java.util.ArrayList;

public class Quiz implements Serializable{

    String tittel;
    int id;
    Sporsmaal[] sporsmaalArray;
    int sporsmaalNaa; //Sier oss hvilket spørsmål vi er på, index til array.
    String startDato;
    String startTid;
    ArrayList<Spiller> spillere = new ArrayList<>();

    public void addSpiller(Spiller spiller) {
        spillere.add(spiller);
    }

    public int oppdaterPoeng(Spiller spiller) {
        System.out.println("Size på spillere tabell: "+spillere.size());
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

    public ArrayList<Spiller> getSpillere() {
        return spillere;
    }

    public void setSpillere(ArrayList<Spiller> spillere) {
        this.spillere = spillere;
    }

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
