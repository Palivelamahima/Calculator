const display = document.getElementById('display');
    const lastResult = document.getElementById('last-result');

    function appendToDisplay(value) {
      if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = value;
      } else {
        display.textContent += value;
      }
    }

    function clearDisplay() {
      display.textContent = '0';
      display.style.color = "#00d4ff";
    }

    function calculate() {
      try {
        let expression = display.textContent.replace(/÷/g, '/').replace(/×/g, '*');
        expression = expression.replace(/[^0-9+\-*/().%]/g, '');
        const result = eval(expression);
        lastResult.textContent = `Last result: ${display.textContent}`;
        display.textContent = Number.isInteger(result) ? result : result.toFixed(2);
        display.style.color = "#22c55e";
        setTimeout(() => { display.style.color = "#00d4ff"; }, 500);
      } catch {
        display.textContent = 'Error';
        display.style.color = "#ef4444";
        setTimeout(() => { display.style.color = "#00d4ff"; }, 1000);
      }
    }

    function square() {
      try {
        const value = parseFloat(display.textContent);
        if (!isNaN(value)) {
          lastResult.textContent = `Last result: ${value}²`;
          display.textContent = (value * value).toFixed(2);
          display.style.color = "#22c55e";
          setTimeout(() => { display.style.color = "#00d4ff"; }, 500);
        }
      } catch {
        display.textContent = 'Error';
      }
    }

    function backspace() {
      if (display.textContent.length === 1 || display.textContent === 'Error') {
        display.textContent = '0';
      } else {
        display.textContent = display.textContent.slice(0, -1);
      }
    }

    document.addEventListener('keydown', (e) => {
      const key = e.key;
      if ((/\d|\+|\-|\*|\/|\(|\)|\.|%/).test(key)) {
        appendToDisplay(key);
      } else if (key === 'Enter') {
        e.preventDefault();
        calculate();
      } else if (key === 'Backspace') {
        backspace();
      } else if (key.toLowerCase() === 'c') {
        clearDisplay();
      }
    });