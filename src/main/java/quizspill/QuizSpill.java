package quizspill;

import RESTfiler.FerdigQuiz;
import RESTfiler.LiveQuiz;
import RESTfiler.Sporsmaal;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.Optional;

public class QuizSpill {

    public static ArrayList<LiveQuiz> liveQuizes = new ArrayList<LiveQuiz>();
    public static ArrayList<FerdigQuiz> ferdigQuizes = new ArrayList<FerdigQuiz>();
    private static int antQuizGenerert = 0;

    static {
        new Thread(() -> {
            while (true) {
                for (Iterator<LiveQuiz> quizIterator = liveQuizes.iterator(); quizIterator.hasNext();) {
                    LiveQuiz quiz = quizIterator.next();
                    LocalDateTime expires = quiz.getSluttTid().plusMinutes(30);
                    if (LocalDateTime.now().isAfter(expires)) {
                        System.out.println("Removing expired quiz " + quiz.getTittel());
                        quizIterator.remove();
                    }
                }

                try {
                    Thread.sleep(60000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();


        FerdigQuiz ferdigQuiz = new FerdigQuiz();
        ferdigQuiz.setId(1);
        ferdigQuiz.setTittel("FerdigQuiz1");
        Sporsmaal spm = new Sporsmaal();
        spm.setSporsmaalTekst("Hva er meningen med livet?");
        spm.setSvarArray(new String[]{
                "Ja", "Nei", "42", "43"
        });
        spm.setRiktigSvar(2);
        spm.setVarighet(10);
        ferdigQuiz.setSporsmaalArray(new Sporsmaal[]{spm});
        ferdigQuizes.add(ferdigQuiz);
    }

    public static void addQuiz(LiveQuiz liveQuiz) {
        int newId = ++antQuizGenerert;

        liveQuiz.setId(newId);
        liveQuizes.add(liveQuiz);

        FerdigQuiz ferdigQuiz = new FerdigQuiz();
        ferdigQuiz.setId(newId);
        ferdigQuiz.setTittel(liveQuiz.getTittel());
        ferdigQuiz.setSporsmaalArray(liveQuiz.getSporsmaalArray());
        ferdigQuizes.add(ferdigQuiz);
    }

    public static LiveQuiz startFerdigQuiz(int quizId, long startTid) {
        Optional<FerdigQuiz> optionalTemplate = ferdigQuizes.stream()
                .filter(quiz -> quiz.getId() == quizId).findFirst();
        if (!optionalTemplate.isPresent()) {
            return null;
        }
        FerdigQuiz template = optionalTemplate.get();

        LiveQuiz quiz = new LiveQuiz();
        quiz.setId(++antQuizGenerert);
        quiz.setSpillere(new ArrayList<>());
        quiz.setSporsmaalArray(template.getSporsmaalArray());
        quiz.setTittel(template.getTittel());
        quiz.setStartDate(new Date(startTid));

        liveQuizes.add(quiz);
        return quiz;
    }
}
