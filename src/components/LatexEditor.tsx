import 'mathlive'
import { MathfieldComponent } from 'react-mathlive'

export default function LatexEditor() {
  return (
    <MathfieldComponent
      initialLatex='f(x)=\\log _10 x'
      onChange={console.log}
    />
  )
}
// export default function LatexEditor() {
//   const useEffect(() => {
//     const mf = document.querySelector('#formula');
// const latexField = document.querySelector('#latex');
// latexField.addEventListener('input', () =>
//   mf.setValue(latexField.value)
// );
// function updateLatex() {
//   document.querySelector('#latex').value = mf.value;
// }
// mf.addEventListener('input', updateLatex);
// updateLatex();

//   }, [])

//   return (
//     <>
//       {/* @ts-ignore */}
//       <math-field id='formula' virtual-keyboard-mode='manual'></math-field>
//       <textarea id='latex'></textarea>
//     </>
//   )
// }
