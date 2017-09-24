package RESTfiler;

import java.io.Serializable;

//En spiller har ingen quizzer
//En quiz får spillere når de joiner.
//F.eks kan nick sendes som parameter når man skal GET quiz-spørsmål og sånn
//Så kan spiller lagres i en tabell i quiz
//Spiller har nickname og poeng

public class Spiller implements Serializable{

    String kallenavn;
    int poeng;

    public String getKallenavn() {
        return kallenavn;
    }

    public void setKallenavn(String kallenavn) {
        this.kallenavn = kallenavn;
    }

    public int getPoeng() {
        return poeng;
    }

    public void setPoeng(int poeng) {
        this.poeng = poeng;
    }
}
