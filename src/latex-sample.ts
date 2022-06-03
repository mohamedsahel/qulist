export default `\\documentclass{article}

\\usepackage[latin1]{inputenc}
\\usepackage[T1]{fontenc}

\\usepackage[bloc,completemulti]{automultiplechoice}
\\usepackage{multicol}
\\begin{document}

\\AMCrandomseed{1237893}

\\element{amc}{
  \\begin{question}{licence}\\bareme{b=2}
    Sous quelle licence AMC est-il distribué ?
    \\begin{multicols}{2}
      \\begin{reponses}
        \\bonne{GNU General Public License V3}
        \\mauvaise{GNU General Public License V2}
        \\mauvaise{Licence commerciale AMC}
        \\mauvaise{Licence Apache}
      \\end{reponses}
    \\end{multicols}
  \\end{question}
}

\\element{amc}{
  \\begin{questionmult}{logiciels}\\bareme{haut=3}
    Sur quels logiciels repose l'implémentation d'AMC version 0.199 ?
    \\begin{multicols}{2}
      \\begin{reponses}
        \\bonne{\\LaTeX}
        \\bonne{Perl}
        \\bonne{ImageMagick ou GraphicsMagick}
        \\mauvaise{Apache}
        \\mauvaise{Firefox}
        \\mauvaise{Gimp}
      \\end{reponses}
    \\end{multicols}
  \\end{questionmult}
}

\\element{amc}{
  \\begin{questionmult}{taches}\\bareme{haut=3}
    Quelles sont les tâches qui peuvent êtres effectuées de manière
    automatique par AMC ?
    \\begin{multicols}{2}
      \\begin{reponses}
        \\bonne{La saisie à partir des scans des copies}
        \\bonne{La notation des copies}
        \\bonne{La production d'une correction individualisée des copies}
        \\bonne{La production d'un fichier de notes au format OpenOffice}
        \\mauvaise{La préparation d'une tasse de café pour l'enseignant}
      \\end{reponses}
    \\end{multicols}
  \\end{questionmult}
}

\\element{amc}{
  \\begin{question}{paquet}\\bareme{b=2}
    Un paquet logiciel est fourni sur le site d'AMC. Quel en est le format ?
    \\begin{reponseshoriz}
      \\bonne{deb}
      \\mauvaise{rpm}
      \\mauvaise{exe}
      \\mauvaise{slp}
    \\end{reponseshoriz}
  \\end{question}
}

\\exemplaire{10}{

%%% debut de l'en-tête des copies :

\\noindent{\\bf Classe d'application d'AMC  \\hfill Examen du 01/01/2010}

\\vspace{2ex}


  Cet examen a pour but d'illustrer l'utilisation d'\\emph{Auto
    Multiple Choice}. Vous pourrez trouver sur le site d'AMC les
  copies de Jojo Boulix et André Roullot afin de tester la saisie
  automatique, ainsi que le fichier listant les étudiants de la classe
  d'application d'AMC (dont font partie Jojo et André) afin de tester
  l'association automatique à partir des numéros d'étudiants.

  Si vous choisissez une note maximale de 10 et l'arrondi normal pour
  cet examen, Jojo obtiendra la note 5/10 et André la note
  6/10.


\\vspace{3ex}

\\noindent\\AMCcode{etu}{8}\\hspace*{\\fill}
\\begin{minipage}{.5\\linewidth}
$\\longleftarrow{}$ codez votre numéro d'étudiant ci-contre, et écrivez votre nom et prénom ci-dessous.

\\vspace{3ex}

\\champnom{\\fbox{
    \\begin{minipage}{.9\\linewidth}
      Nom et prénom :

      \\vspace*{.5cm}\\dotfill
      \\vspace*{1mm}
    \\end{minipage}
  }}\\end{minipage}

\\vspace{1ex}

\\noindent\\hrulefill

\\vspace{2ex}

\\begin{center}
  Les questions faisant apparaître le symbole \\multiSymbole{} peuvent
  présenter zéro, une ou plusieurs bonnes réponses. Les autres ont une
  unique bonne réponse.
\\end{center}

\\noindent\\hrulefill

\\vspace{2ex}
%%% fin de l'en-tête

\\melangegroupe{amc}
\\restituegroupe{amc}

\\clearpage

}

\\end{document}`
