package RESTfiler;

public class Sporsmaal {

    String sporsmaalTekst;
    String[] svarArray;
    String bildeURL;
    int riktigSvar;
    int varighet;

    public String getBildeURL() {
        return bildeURL;
    }

    public void setBildeURL(String bildeURL) {
        this.bildeURL = bildeURL;
    }

    public String getSporsmaalTekst() {
        return sporsmaalTekst;
    }

    public void setSporsmaalTekst(String sporsmaalTekst) {
        this.sporsmaalTekst = sporsmaalTekst;
    }

    public String[] getSvarArray() {
        return svarArray;
    }

    public void setSvarArray(String[] svarArray) {
        this.svarArray = svarArray;
    }

    public int getRiktigSvar() {
        return riktigSvar;
    }

    public void setRiktigSvar(int riktigSvar) {
        this.riktigSvar = riktigSvar;
    }

    public int getVarighet() {
        return varighet;
    }

    public void setVarighet(int varighet) {
        this.varighet = varighet;
    }


}
