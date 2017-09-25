package RESTfiler;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

//Dette objektet brukes bare for å kunne ta imot litt Ajax
public class KallenavnQuiz implements Serializable {

    int quizId;
    String kallenavn;

    public int getQuizId() {
        return quizId;
    }

    public void setQuizId(int quizId) {
        this.quizId = quizId;
    }

    public String getKallenavn() {
        return kallenavn;
    }

    public void setKallenavn(String kallenavn) {
        this.kallenavn = kallenavn;
    }


}
