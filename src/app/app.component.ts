import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  equation: any = '';
  title = 'bmw-calculator';
  answer: number;


  ngOnInit() {

  }

  onControlPressed(type: any, operatorValue: any) {
    this.isMainOPerators(operatorValue);
    if(type === 'NUMBER' || operatorValue === 'PERIOD' || operatorValue === 'MINUS') {
      if(operatorValue === 'PERIOD') {
        this.equation += !this.checkIfOpertorExists('.') ?  '.' : '';
      }
      else if(this.isMainOPerators(operatorValue) && operatorValue === 'MINUS') {
        this.equation += '-';
      }
      else if(this.equation.charAt(this.equation.length-1) == ')') {
        this.equation += '*' + operatorValue.toString();
      }
      else { 
        this.equation += operatorValue.toString();
      }
    }
    else if(type === 'CONTROL' && this.isMainOPerators(operatorValue)) {
      if(operatorValue === 'DIVIDER') {
        this.equation += (this.equation !== '' && !this.avoidDoubleOperators()) ? '/' : '';
      }
      else if(operatorValue === 'TIMES') {
        this.equation += (this.equation !== '' && !this.avoidDoubleOperators()) ? '*' : '';
      }
      else if(operatorValue === 'MINUS') {
        this.equation += (this.equation !== '' && !this.avoidDoubleOperators()) ? '-' : '';
      }
      else if(operatorValue === 'PLUS') {
        this.equation += (this.equation !== '' && !this.avoidDoubleOperators()) ? '+' : '';
      }
    }
    else if(type === 'CONTROL' && !this.isMainOPerators(operatorValue) && operatorValue === 'BRACKECTS') {

      if(
        !this.checkIfBracketIsOpen() && !this.parenthesesAreBalanced(this.equation) || this.equation === '' ||
        (isNaN(this.equation.charAt(this.equation.length-1)))
      ) {
        this.equation += '(';
      }
      else if(
        (!isNaN(this.equation.charAt(this.equation.length-1)) && !this.parenthesesAreBalanced(this.equation)) ||
        (!this.parenthesesAreBalanced(this.equation))
      ) {
        this.equation += ')';
      }
      else if(!isNaN(this.equation.charAt(this.equation.length-1))) {
        this.equation += '*(';
      }
    }

    else if(type === 'CONTROL' && operatorValue === 'CLEAR') {
      this.clearOperator();
    }
    else if(type === 'CONTROL' && operatorValue === 'EQUALS') {
      if(this.equation !== '') {
        this.calculate();
      }
    }
  }

isMainOPerators(operator) {
  return operator === 'DIVIDER' || operator === 'TIMES' || operator === 'MINUS' || operator === 'PLUS';
}

clearOperator() {
  this.equation = '';
  this.answer = null;
}

delete() {
  this.equation = this.equation.slice(0, -1);
  this.answer = this.equation.length === 0 ? null : this.answer;
}

checkIfOpertorExists(operator) {
  return this.equation.indexOf(operator) !== -1;
}

avoidDoubleOperators() {
  return  this.equation[this.equation.length -1] === '/' ||
          this.equation[this.equation.length -1] === '*' ||
          this.equation[this.equation.length -1] === '-' ||
          this.equation[this.equation.length -1] === '+' ||
          this.equation[this.equation.length -1] === '.';
}

checkIfBracketIsOpen() {
  return this.equation.indexOf('(') !== -1;
}

parenthesesAreBalanced(string){
  let parentheses = '()', stack = [], i, c;

  for (i = 0; c = string[i++];) {
      let bracePosition = parentheses.indexOf(c),
      braceType;
      if (!~bracePosition)
      continue;

      braceType = bracePosition % 2 ? 'closed' : 'open';

      if (braceType === 'closed') {
        if (!stack.length || parentheses.indexOf(stack.pop()) != bracePosition - 1)
            return false;
      }
      else {
        stack.push(c);
      }
    }
    return !stack.length;
  }

  
  calculate() {
    this.answer = null;
    if(this.equation !== '') {
      this.answer = eval(this.equation);
      this.equation = this.answer.toString();
    }
  }
}
