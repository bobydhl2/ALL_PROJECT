const display = document.getElementById('display');
const keys = document.querySelector('.keys');

let current = '0';

const updateDisplay = () => {
  display.value = current;
};

const appendValue = (value) => {
  if (current === '0' && value !== '.') {
    current = value;
  } else {
    const lastNumber = current.split(/[+\-*/%]/).pop();
    if (value === '.' && lastNumber.includes('.')) {
      return;
    }
    current += value;
  }
  updateDisplay();
};

const safeEvaluate = () => {
  try {
    const result = Function(`"use strict"; return (${current});`)();
    if (!Number.isFinite(result)) {
      throw new Error('Invalid result');
    }
    current = String(Number(result.toFixed(10)));
  } catch {
    current = 'Error';
  }
  updateDisplay();
};

keys.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const { value, action } = button.dataset;

  if (action === 'clear') {
    current = '0';
    updateDisplay();
    return;
  }

  if (action === 'backspace') {
    current = current.length <= 1 || current === 'Error' ? '0' : current.slice(0, -1);
    updateDisplay();
    return;
  }

  if (action === 'equals') {
    safeEvaluate();
    return;
  }

  if (current === 'Error') {
    current = '0';
  }

  appendValue(value);
});
