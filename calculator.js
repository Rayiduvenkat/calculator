let input = document.getElementById('input');
let output = document.getElementById('output');

function appendToInput(value) {
  input.value += value;
}

function clearInput() {
  input.value = '';
  output.value = '';
}

function calculate() {
  try {
    if (input.value.includes('/0')) {
      throw new Error('Division by zero is not allowed');
    }

    if (/([+\-*/]){2,}/.test(input.value)) {
      throw new Error('Multiple operators are not allowed');
    }

    if (input.value.includes('√')) {
      let number = parseFloat(input.value.substr(1));
      if (isNaN(number)) {
        throw new Error('Invalid input for square root');
      }
      output.value = Math.sqrt(number);
      return;
    }

    if (input.value.includes('%')) {
      let number = parseFloat(input.value);
      if (isNaN(number)) {
        throw new Error('Invalid input for percentage');
      }
      output.value = number / 100;
      return;
    }

    output.value = eval(input.value);
  } catch (error) {
    output.value = 'Error: ' + error.message;
  }
}

document.addEventListener('keydown', function(event) {
  const key = event.key;
  if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '.', 'Enter'].includes(key)) {
    event.preventDefault();
    if (key === 'Enter') {
      calculate();
    } else {
      appendToInput(key);
    }
  } else if (key === 'Backspace') {
    event.preventDefault();
    input.value = input.value.slice(0, -1);
  }
  else if(key=='Del'){
    input.value='';
  }
});

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function() {
    const value = this.dataset.value;
    if (value === '=') {
      calculate();
    } else if (value === 'C') {
      clearInput();
    } else if (value === 'B') {
      input.value = input.value.slice(0, -1);
    } else {
      appendToInput(value);
    }
  });
});
