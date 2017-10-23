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


        FerdigQuiz geoQuiz = new FerdigQuiz();
        geoQuiz.setId(++antQuizGenerert);
        geoQuiz.setTittel("Geografiquiz");
        Sporsmaal spm1 = new Sporsmaal(), spm2 = new Sporsmaal(), spm3 = new Sporsmaal();
        spm1.setSporsmaalTekst("Hva er hovedstaden i Frankrike?");
        spm1.setSvarArray(new String[]{
                "Bordeaux", "Paris", "Lyon", "Marseille"
        });
        spm1.setBildeURL("https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Tour_eiffel_at_sunrise_from_the_trocadero.jpg/1200px-Tour_eiffel_at_sunrise_from_the_trocadero.jpg");
        spm1.setRiktigSvar(1);
        spm1.setVarighet(10);

        spm2.setSporsmaalTekst("Hva er verdens nest høyeste fjell?");
        spm2.setSvarArray(new String[]{
                "Glittertinden", "Mont Blanc", "K2", "Denali"
        });
        spm2.setBildeURL("http://theubpost.mn/wp-content/uploads/2017/06/01BookTalkK2.jpg");
        spm2.setRiktigSvar(2);
        spm2.setVarighet(15);

        spm3.setSporsmaalTekst("Hvor lang er Cháng Jiāng, Asias lengste elv?");
        spm3.setSvarArray(new String[]{
                "7107 km", "5464 km", "6671 km", "6357 km"
        });
        spm3.setBildeURL("https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Dusk_on_the_Yangtze_River.jpg/1200px-Dusk_on_the_Yangtze_River.jpg");
        spm3.setRiktigSvar(3);
        spm3.setVarighet(20);
        geoQuiz.setSporsmaalArray(new Sporsmaal[]{spm1, spm2, spm3});

        ferdigQuizes.add(geoQuiz);


        FerdigQuiz bodyQuiz = new FerdigQuiz();
        bodyQuiz.setId(++antQuizGenerert);
        bodyQuiz.setTittel("Bodøquiz");
        Sporsmaal spm = new Sporsmaal();
        spm.setSporsmaalTekst("Hvor bor rottene?");
        spm.setSvarArray(new String[] {"Glasshuset", "Mørkved", "Nordsida", "Kjøttkjelleren"});
        spm.setVarighet(5);
        spm.setRiktigSvar(0);
        bodyQuiz.setSporsmaalArray(new Sporsmaal[]{spm});

        ferdigQuizes.add(bodyQuiz);
    }

    public static void addQuiz(LiveQuiz liveQuiz) {
        liveQuiz.setId(++antQuizGenerert);
        liveQuizes.add(liveQuiz);

        FerdigQuiz ferdigQuiz = new FerdigQuiz();
        ferdigQuiz.setId(++antQuizGenerert);
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
