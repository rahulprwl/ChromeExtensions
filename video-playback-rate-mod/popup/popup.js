
function $(id) { return document.getElementById(id); }

document.addEventListener('DOMContentLoaded', () => {
  const rateRange = $('rateRange');
  const rateInput = $('rateInput');
  const setBtn = $('setBtn');
  const incBtn = $('incBtn');
  const decBtn = $('decBtn');
  const resetBtn = $('resetBtn');
  const status = $('status');

  let statusTimeout;

  function setStatus(msg, color = '#22863a') {
	status.textContent = msg;
	status.style.color = color;
	status.style.animation = 'none';
	setTimeout(() => {
	  status.style.animation = 'slideIn 0.3s ease';
	}, 10);
	clearTimeout(statusTimeout);
	statusTimeout = setTimeout(() => { status.textContent = ''; }, 2000);
  }

  // keep range and number input in sync
  rateRange.addEventListener('input', () => { 
	rateInput.value = Number(rateRange.value).toFixed(2);
  });
  rateInput.addEventListener('input', () => { 
	const val = Number(rateInput.value);
	if (val >= 0.1 && val <= 6) {
	  rateRange.value = val;
	}
  });

  function sendRate(rate) {
	const r = Math.max(0.1, Math.min(6, Number(rate)));
	// send message to background which forwards to the active tab
	chrome.runtime.sendMessage({ type: 'setRate', rate: r }, (response) => {
	  if (response && response.updated) {
		setStatus(`✓ Applied: ${r}x on ${response.count} video(s)`, '#22863a');
	  } else {
		setStatus(`✓ Applied: ${r}x`, '#2d3748');
	  }
	});
  }

  setBtn.addEventListener('click', () => {
	const r = Number(rateInput.value) || 1;
	sendRate(r);
  });

  incBtn.addEventListener('click', () => {
	let r = Number(rateInput.value) || 1;
	r = Math.min(6, Math.round((r + 0.1) * 100) / 100);
	rateInput.value = r.toFixed(2); 
	rateRange.value = r; 
	sendRate(r);
  });

  decBtn.addEventListener('click', () => {
	let r = Number(rateInput.value) || 1;
	r = Math.max(0.1, Math.round((r - 0.1) * 100) / 100);
	rateInput.value = r.toFixed(2); 
	rateRange.value = r; 
	sendRate(r);
  });

  resetBtn.addEventListener('click', () => {
	rateInput.value = '1.00'; 
	rateRange.value = 1; 
	sendRate(1);
  });

  // Allow Enter key to apply rate
  rateInput.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') sendRate(Number(rateInput.value) || 1);
  });
});