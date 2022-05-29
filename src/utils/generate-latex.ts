import { ExamType, QuestionType } from 'types'

export const generateLatex = (exam: ExamType) => {
  return `\\documentclass[${exam.format.toLowerCase()}paper,landscape,10pt]{article}
%\\usepackage{xltxtra}
\\usepackage[utf8x]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[francais,bloc]{automultiplechoice}
\\usepackage{multicol}
%\\setmainfont{Linux Libertine O}
\\geometry{hmargin=2.5cm,headheight=2.5cm,headsep=.3cm,footskip=1cm,top=2.5cm,bottom=2.5cm}
% les plus
\\usepackage{tabto}
\\usepackage{tikz}
\\setlength\\multicolsep{3pt}
ewcommand{\\tmtextbf}[1]{{\\bfseries{#1}}}
%
%%%
\\begin{document}
\\AMCrandomseed{1527384}
\\AMCtext{none}{None of the above.}
\\def\\AMCbeginQuestion#1#2{\\par \\hspace*{0mm}{\\bf #1:} #2}
%\\def\\AMCbeginAnswer#1#2{\\tabto{13cm}\\hspace{0mm}#2}
\\def\\AMCbeginAnswer#1#2{\\tabto{13cm}\\tabto{13cm}#2}
\\AMCformHSpace=.5em
\\AMCinterBrep=5.5ex
\\def\\AMCanswer#1#2{#1\\hspace{2mm}#2\\hspace{1cm}}
%%%%

\\AMCinterIrep=2pt
\\AMCinterBrep=2pt
\\AMCinterIquest=2pt
\\AMCinterBquest=1.5pt
%
%\\baremeDefautM{formula=NBC-NMC, p=0}
%\\baremeDefautS{e=0,v=0,b=1,m=-1}
%\\bareme{b=2,m=0,e=0,v=0}
%\\AMCformHSpace=.1em
%\\AMCformVSpace=0.2ex
% \\bareme{formula=(NB==N?NBC:NBC+NMC==N ? 0 : NBC/2-NMC/2),p=0,e=0,v=0}%

\\AMCrandomseed{1527384}

${exam.questions
  .map(
    (question, index) =>
      `% ---------------  Question  ${index + 1}  --------------- \n` +
      generateQuestion(question, index + 1)
  )
  .join('\n')}


%----------------------------------------
\\element{PartieA}{

\\restituegroupe{general}
}


%%% fabrication des copies

\\exemplaire{10}{

%%% debut de l'en-tête des copies : QCM
\\begin{multicols}{3}

%\\columnseprule=1.0pt
%oindent
\\begin{center}
\\includegraphics[scale=0.35]{LOGOFSM.jpg} \\\\

\\vspace{2ex}

\\noindent{\\bf \\emph{Département de ${exam.department}}  } \\\\

\\vspace{2ex}

\\noindent{\\bf \\emph{Filière : ${exam.filiere}}  } \\\\

\\vspace{2ex}

\\noindent{\\bf \\emph{Session : ${exam.session}}  } \\\\

\\vspace{2ex}

\\noindent{\\bf \\emph{Module : ${exam.module}}  } \\\\

\\vspace{2ex}

\\noindent{\\bf Durée : ${exam.duration} } \\\\
\\end{center}

%%%%%%%%%%%%%  Début Saisie information étudiant

{
\\setlength{\\parindent}{0pt}\\hspace*{\\fill}\\AMCcode{CNE}{10}\\hspace*{\\fill}
\\begin{center}


\\begin{minipage}[b]{11cm}
$ \\Longleftarrow $ Codez les \\textbf{10 chiffres} de votre \\textbf{Code National \\underline{d'Etudiant} } (\\tmtextbf{C.N.E.}) ou \\tmtextbf{Massar} ci-contre de la \\tmtextbf{gauche} vers la \\tmtextbf{droite}. \\textbf{Attention} à ne noircir \\textbf{qu'UN chiffre par colonne}. Pour le \\tmtextbf{Massar} remplacer \\textbf{la première} lettre en cochant le \\tmtextbf{0} de \\textbf{la première colonne} et remplir obligatoirement le cadre ci-dessous :

\\vspace{1ex}
\\hfill\\champnom{\\fbox{
\\begin{minipage}{.9\\linewidth}
\\vspace*{5mm}
\\tmtextbf{Nom :}
\\vspace*{.5cm}\\dotfill

\\tmtextbf{Prénom :}
\\vspace*{.5cm}\\dotfill

\\tmtextbf{C.N.E. ou Massar :}
\\vspace*{.5cm}\\dotfill

\\tmtextbf{Local :}
\\vspace*{.2cm}\\dotfill
\\tmtextbf{N° examen :}
\\dotfill

\\end{minipage}
}}\\hfill\\vspace{-1ex}\\end{minipage}\\hspace*{\\fill}
\\end{center}
}
%%%%%%%%%%%%%  Fin Saisie information étudiant


%%% fin de l'en-tête QCM
\\end{multicols}

\\begin{center}\\em
\\begin{center} \\large \\bf \\emph{Consignes} \\end{center}
\\begin{center}
%Les questions faisant apparaître le symbole \\multiSymbole{} présentent plusieurs bonnes réponses.
Vous devez   \\textbf{ \\underline{colorier}} les cases au \\textbf{\\underline{stylo noir}} ou au \\textbf{\\underline{stylo bleu}} pour répondre aux questions.
%Des points négatifs seront affectés aux mauvaises réponses.
En cas d'erreur, il faut simplement effacer au « \\textbf{blanco} » mais ne pas redessiner la case.
\\end{center}
\\end{center}

\\begin{center}
\\begin{minipage}[c]{.2\\linewidth}
\\includegraphics[width=1\\textwidth]{Att.jpg}
\\end{minipage}
\\end{center}

\\hrule\\vspace{0.2ex}

\\begin{multicols}{3}
\\columnseprule=1.0pt
          % Pour mélanger
\\restituegroupe{PartieA}

%\\AMCnumero{1}


%\\AMCnumero{1}


%\\AMCcleardoublepage

\\end{multicols}

}

\\end{document}
`
}

//
const generateQuestion = (question: QuestionType, index: number) => {
  if (question.type === 'long') return getLongLatex(question, index)
  if (question.type === 'true_false')
    return getTrueFalseLatex(question, index)
  if (question.type === 'multiple_choices')
    return getMultipleLatex(question, index)
}

//
const getLongLatex = (question: QuestionType, index: number) => {
  const baremeList = Object.entries(question.longBareme)
  baremeList.sort(([_, value1], [__, value2]) => value1 - value2)

  return `\\element{general}{
\\begin{question}{Q${String(index).padStart(3, '0')}}\\bareme{haut=${
    baremeList[baremeList.length - 1][1]
  }}}
${question.question}
\\AMCOpen{lines=${question.lines}}{
  ${baremeList.reduce((acc, [key, value], index) => {
    return (
      acc +
      `\\${
        index === baremeList.length - 1
          ? 'correctchoice'
          : 'wrongchoice'
      }[${key}]{${value}}\\scoring{${value}}\n`
    )
  }, '')}
\\vspace{−1.75cm}
\\end{question}
`
}

//
const getTrueFalseLatex = (question: QuestionType, index: number) => {
  return `\\element{general}{
  \\begin{question}{${String(index).padStart(3, '0')}}
${question.question} :
    \\begin{reponses} \\bareme{${question.bareme}}
      \\${question.true ? 'correct' : 'wrong'}{Vrai}
      \\${question.true ? 'wrong' : 'correct'}{Faux}
    \\end{reponses}
  \\end{question}
 \\vspace{2ex}
}`
}

//
const getMultipleLatex = (question: QuestionType, index: number) => {
  const isMutipleCorrect =
    (question.choices || []).filter((choice) => choice.correct)
      .length > 1

  return `\\element{general}{
\\begin{${isMutipleCorrect ? 'questionmult' : 'question'}}{Q${String(index).padStart(3, '0')}}
${question.question} :
%\\begin{${question.choicesAlignement}}{2}
    \\begin{reponses} \\bareme{formula=(NB==N?NBC:NBC+NMC==N ? 0 : NBC*${
      question.bareme.correctChoice
    }-NMC*${question.bareme.wrongChoice}),p=0,e=0,v=0}
    ${question.choices
      ?.map(
        (choice, index) =>
          `${index > 0 ? '\t\t' : '\t'} \\${
            choice.correct ? 'correct' : 'wrong'
          } {${choice.value}}`
      )
      .join('\n')}
    \\end{reponses}
%\\end{${question.choicesAlignement}}
  \\end{question}
 \\vspace{2ex}

}
    `
}
