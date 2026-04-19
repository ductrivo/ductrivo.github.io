/**
 * quiz-engine.js — Moodle XML Quiz Engine for Jekyll
 * Supports: multichoice, truefalse, shortanswer, numerical, matching
 * Usage: QuizEngine.init(config) — called by _includes/quiz.html
 */

(function() {
'use strict';

// ─── Utilities ────────────────────────────────────────────────

function getText(el, sel) {
  const c = el.querySelector(sel + ' > text');
  return c ? c.textContent.trim() : '';
}

function fisherYates(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    const j = buf[0] % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ─── XML Parser ────────────────────────────────────────────────

function parseQuestions(xmlDoc) {
  const questions = [];
  xmlDoc.querySelectorAll('question').forEach(function(q) {
    const type = q.getAttribute('type');
    if (!type || type === 'category' || type === 'essay') return;
    const base = {
      type:            type,
      name:            getText(q, 'name'),
      text:            getText(q, 'questiontext'),
      generalFeedback: getText(q, 'generalfeedback'),
      defaultGrade:    parseFloat(getText(q, 'defaultgrade')) || 1,
    };
    if (type === 'multichoice' || type === 'truefalse') {
      const single = getText(q, 'single') !== 'false';
      const answers = [...q.querySelectorAll('answer')].map(a => ({
        text:     (a.querySelector('text') || {}).textContent?.trim() || '',
        fraction: parseFloat(a.getAttribute('fraction')) || 0,
        feedback: (a.querySelector('feedback text') || {}).textContent?.trim() || '',
      }));
      questions.push({...base, single, answers});
    } else if (type === 'shortanswer') {
      const usecase = (q.querySelector('usecase') || {}).textContent === '1';
      const answers = [...q.querySelectorAll('answer')].map(a => ({
        pattern:  (a.querySelector('text') || {}).textContent?.trim() || '',
        fraction: parseFloat(a.getAttribute('fraction')) || 0,
        feedback: (a.querySelector('feedback text') || {}).textContent?.trim() || '',
      }));
      questions.push({...base, usecase, answers});
    } else if (type === 'numerical') {
      const answers = [...q.querySelectorAll('answer')].map(a => ({
        value:     parseFloat((a.querySelector('text') || {}).textContent || '0'),
        tolerance: parseFloat((a.querySelector('tolerance') || {}).textContent || '0'),
        fraction:  parseFloat(a.getAttribute('fraction')) || 0,
        feedback:  (a.querySelector('feedback text') || {}).textContent?.trim() || '',
      }));
      questions.push({...base, answers});
    } else if (type === 'matching') {
      const pairs = [];
      q.querySelectorAll('subquestion').forEach(function(sq) {
        const t = sq.querySelector('text');
        const d = sq.querySelector('answer text');
        if (t && d) pairs.push({ term: t.textContent.trim(), definition: d.textContent.trim() });
      });
      questions.push({...base, pairs});
    }
  });
  return questions;
}

// ─── Select & Shuffle ─────────────────────────────────────────

function selectAndShuffle(questions, cfg) {
  let pool = [...questions];
  if (cfg.shuffleQuestions) fisherYates(pool);
  pool = pool.slice(0, Math.min(cfg.count || pool.length, pool.length));
  pool.forEach(function(q) {
    if (cfg.shuffleAnswers && q.answers) fisherYates(q.answers);
    if (q.pairs) {
      q._shuffledDefs = q.pairs.map(p => p.definition);
      if (cfg.shuffleAnswers) fisherYates(q._shuffledDefs);
    }
  });
  return pool;
}

// ─── Renderer ─────────────────────────────────────────────────

function renderQuestion(q, i, total) {
  const id = 'q' + i;
  let body = '';
  if (q.type === 'multichoice' || q.type === 'truefalse') {
    const t = q.single !== false ? 'radio' : 'checkbox';
    body = q.answers.map((a, ai) => `
      <label class="quiz-choice-label" data-ai="${ai}" data-fraction="${a.fraction}"
             data-feedback="${encodeURI(a.feedback)}">
        <input type="${t}" name="${id}" value="${ai}" class="quiz-choice-input">
        <span class="quiz-choice-text">${a.text}</span>
      </label>`).join('');
  } else if (q.type === 'shortanswer') {
    body = `<div class="quiz-shortanswer">
      <input type="text" class="quiz-text-input form-control" id="${id}-input"
             placeholder="Type your answer…"
             data-answers="${encodeURI(JSON.stringify(q.answers))}"
             data-usecase="${q.usecase ? 1 : 0}">
      <button class="btn btn-sm btn-outline-dark mt-2 quiz-submit-text" data-qid="${id}">Submit</button>
    </div>`;
  } else if (q.type === 'numerical') {
    body = `<div class="quiz-numerical">
      <input type="number" step="any" class="quiz-num-input form-control" id="${id}-input"
             placeholder="Enter a number…"
             data-answers="${encodeURI(JSON.stringify(q.answers))}">
      <button class="btn btn-sm btn-outline-dark mt-2 quiz-submit-num" data-qid="${id}">Submit</button>
    </div>`;
  } else if (q.type === 'matching') {
    const rows = q.pairs.map((p, pi) => {
      const opts = ['<option value="">— choose —</option>',
        ...q._shuffledDefs.map(d => `<option value="${encodeURI(d)}">${d}</option>`)].join('');
      return `<tr><td class="quiz-match-term">${p.term}</td>
        <td><select class="form-control form-control-sm quiz-match-select"
          data-pi="${pi}" data-correct="${encodeURI(p.definition)}">${opts}</select></td></tr>`;
    }).join('');
    body = `<table class="table table-sm quiz-match-table"><tbody>${rows}</tbody></table>
      <button class="btn btn-sm btn-outline-dark quiz-submit-match" data-qid="${id}">Submit</button>`;
  }
  return `<div class="quiz-question" id="${id}" data-type="${q.type}" data-answered="false"
         data-grade="${q.defaultGrade}" data-gfeedback="${encodeURI(q.generalFeedback)}">
    <p class="quiz-q-header">
      <span class="quiz-q-num">${i + 1} / ${total}</span>
      <span class="badge badge-light ml-1 quiz-q-type">${q.type}</span>
    </p>
    <div class="quiz-q-text">${q.text}</div>
    <div class="quiz-choices">${body}</div>
    <div class="quiz-feedback-box" style="display:none"></div>
    <div class="quiz-gfeedback-box" style="display:none"></div>
  </div>`;
}

// ─── Scoring ──────────────────────────────────────────────────

function scoreQuestion(qEl, q) {
  if (q.type === 'multichoice' || q.type === 'truefalse') {
    const sel = [...qEl.querySelectorAll('input:checked')].map(e => parseInt(e.value));
    if (!sel.length) return null;
    qEl.querySelectorAll('.quiz-choice-label').forEach(function(lbl, ai) {
      const frac  = parseFloat(lbl.dataset.fraction);
      const fb    = decodeURI(lbl.dataset.feedback);
      const chose = sel.includes(ai);
      lbl.classList.add(frac > 0 ? 'quiz-correct' : (chose ? 'quiz-wrong' : 'quiz-neutral'));
      (lbl.querySelector('input') || {}).disabled = true;
      if (fb && (chose || frac > 0)) {
        const s = document.createElement('small');
        s.className = 'quiz-answer-feedback d-block mt-1';
        s.innerHTML = fb; lbl.appendChild(s);
      }
    });
    const tot = sel.reduce((s, ai) => s + (q.answers[ai]?.fraction || 0), 0);
    return Math.max(0, Math.min(100, tot)) / 100;
  }
  if (q.type === 'shortanswer') {
    const inp = qEl.querySelector('.quiz-text-input');
    if (!inp || !inp.value.trim()) return null;
    let val = inp.value.trim();
    const answers = JSON.parse(decodeURI(inp.dataset.answers));
    const cs = inp.dataset.usecase === '1';
    if (!cs) val = val.toLowerCase();
    let frac = 0, fb = '';
    for (const a of answers) {
      const r = new RegExp('^' + (cs ? a.pattern : a.pattern.toLowerCase())
        .replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$');
      if (r.test(val)) { frac = a.fraction; fb = a.feedback; break; }
    }
    inp.disabled = true; inp.classList.add(frac > 0 ? 'quiz-input-correct' : 'quiz-input-wrong');
    const b = qEl.querySelector('.quiz-feedback-box');
    b.style.display = 'block'; b.className = 'quiz-feedback-box alert ' + (frac > 0 ? 'alert-success' : 'alert-warning');
    b.innerHTML = (frac > 0 ? '✓ ' : '✗ ') + (fb || 'Try again.');
    return Math.max(0, frac) / 100;
  }
  if (q.type === 'numerical') {
    const inp = qEl.querySelector('.quiz-num-input');
    if (!inp || inp.value === '') return null;
    const v = parseFloat(inp.value);
    const ans = JSON.parse(decodeURI(inp.dataset.answers)).sort((a, b) => b.fraction - a.fraction);
    let frac = 0, fb = '';
    for (const a of ans) { if (Math.abs(v - a.value) <= a.tolerance) { frac = a.fraction; fb = a.feedback; break; } }
    inp.disabled = true; inp.classList.add(frac > 0 ? 'quiz-input-correct' : 'quiz-input-wrong');
    const b = qEl.querySelector('.quiz-feedback-box');
    b.style.display = 'block'; b.className = 'quiz-feedback-box alert ' + (frac > 0 ? 'alert-success' : 'alert-danger');
    b.innerHTML = (frac > 0 ? '✓ ' : '✗ Incorrect. ') + fb;
    return Math.max(0, frac) / 100;
  }
  if (q.type === 'matching') {
    const sels = [...qEl.querySelectorAll('.quiz-match-select')];
    if (sels.some(s => !s.value)) return null;
    let ok = 0;
    sels.forEach(function(s) {
      const correct = decodeURI(s.value) === decodeURI(s.dataset.correct);
      s.disabled = true; s.style.borderColor = correct ? '#28a745' : '#dc3545';
      if (correct) ok++;
      else { const h = document.createElement('small'); h.className = 'text-danger d-block'; h.textContent = '→ ' + decodeURI(s.dataset.correct); s.parentNode.appendChild(h); }
    });
    return ok / sels.length;
  }
  return 0;
}

// ─── Results Panel ────────────────────────────────────────────

function showResults(container, totalScore, maxScore, cfg) {
  const pct    = Math.round(totalScore / maxScore * 100);
  const passed = pct >= (cfg.passPercent || 70);
  const panel  = container.querySelector('#quiz-results');
  const icon   = passed ? '🎉' : '📚';
  const cls    = passed ? 'alert-success' : 'alert-warning';
  panel.className = 'alert mt-4 ' + cls;
  panel.innerHTML = `
    <h5>${icon} Score: ${pct}% (${totalScore.toFixed(1)} / ${maxScore})</h5>
    <p class="mb-1">${passed ? 'Excellent work! You passed.' : `Aim for ${cfg.passPercent || 70}% to pass.`}</p>
    <div class="progress mt-2" style="height:8px">
      <div class="progress-bar ${passed ? 'bg-success' : 'bg-warning'}"
           style="width:${pct}%"></div>
    </div>
    <button class="btn btn-sm btn-outline-dark mt-3 quiz-retry-btn">Try Again</button>
  `;
  panel.style.display = 'block';

  if (cfg.lessonSlug) {
    try {
      localStorage.setItem('quiz_result_' + cfg.lessonSlug,
        JSON.stringify({ pct, passed, date: new Date().toISOString() }));
      if (passed) localStorage.setItem('lesson_done_' + cfg.lessonSlug, '1');
    } catch(e) {}
  }
}

// ─── Public API ───────────────────────────────────────────────

window.QuizEngine = {
  init: async function(cfg) {
    const container = document.getElementById(cfg.containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="quiz-loading text-center py-4">
        <div class="spinner-border text-success" role="status"></div>
        <p class="mt-2 text-muted">Loading questions…</p>
      </div>`;

    let questions;
    try {
      const resp = await fetch(cfg.bankUrl);
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const xmlStr = await resp.text();
      const doc    = new DOMParser().parseFromString(xmlStr, 'text/xml');
      if (doc.querySelector('parsererror')) throw new Error('XML parse error');
      questions = selectAndShuffle(parseQuestions(doc), cfg);
    } catch(err) {
      container.innerHTML = `<div class="alert alert-danger">
        Failed to load questions: ${err.message}
        <br><small>Bank: ${cfg.bankUrl}</small></div>`;
      return;
    }

    if (!questions.length) {
      container.innerHTML = '<div class="alert alert-warning">No questions found in this bank.</div>';
      return;
    }

    const html = `
      <div class="quiz-header mb-3">
        <span class="badge badge-success">${questions.length} question${questions.length !== 1 ? 's' : ''}</span>
        <span class="text-muted small ml-2">Select answers, then click Submit.</span>
      </div>
      ${questions.map((q, i) => renderQuestion(q, i, questions.length)).join('')}
      <div id="quiz-results" style="display:none"></div>
      <div class="quiz-submit-row mt-4">
        <button class="btn btn-success quiz-submit-all">Submit All</button>
        <span class="quiz-answered-count text-muted ml-3 small">0 / ${questions.length} answered</span>
      </div>`;
    container.innerHTML = html;

    const state = { scores: new Array(questions.length).fill(null), submitted: false };

    function updateCount() {
      const done = state.scores.filter(s => s !== null).length;
      container.querySelector('.quiz-answered-count').textContent = done + ' / ' + questions.length + ' answered';
    }

    function submitQuestion(qEl, i) {
      if (qEl.dataset.answered === 'true') return;
      const s = scoreQuestion(qEl, questions[i]);
      if (s === null) { alert('Please answer this question first.'); return; }
      state.scores[i] = s;
      qEl.dataset.answered = 'true';
      const gf = decodeURI(qEl.dataset.gfeedback);
      if (gf) {
        const b = qEl.querySelector('.quiz-gfeedback-box');
        b.style.display = 'block'; b.className = 'quiz-gfeedback-box alert alert-info mt-2 small'; b.innerHTML = gf;
      }
      updateCount();
      if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise([qEl]);
    }

    questions.forEach(function(q, i) {
      const qEl = container.querySelector('#q' + i);
      if ((q.type === 'multichoice' || q.type === 'truefalse') && q.single !== false) {
        qEl.querySelectorAll('.quiz-choice-input').forEach(function(inp) {
          inp.addEventListener('change', () => submitQuestion(qEl, i));
        });
      }
    });

    container.querySelectorAll('.quiz-submit-text,.quiz-submit-num').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const qEl = btn.closest('.quiz-question');
        const idx = questions.findIndex((q, i) => container.querySelector('#q' + i) === qEl);
        btn.disabled = true;
        submitQuestion(qEl, idx);
      });
    });

    container.querySelectorAll('.quiz-submit-match').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const qEl = btn.closest('.quiz-question');
        const idx = questions.findIndex((q, i) => container.querySelector('#q' + i) === qEl);
        const s = scoreQuestion(qEl, questions[idx]);
        if (s === null) { alert('Please fill all dropdowns.'); return; }
        state.scores[idx] = s; qEl.dataset.answered = 'true'; btn.disabled = true;
        updateCount();
      });
    });

    container.querySelector('.quiz-submit-all').addEventListener('click', function() {
      if (state.submitted) return;
      questions.forEach(function(q, i) {
        const qEl = container.querySelector('#q' + i);
        if (qEl.dataset.answered !== 'true') {
          const s = scoreQuestion(qEl, q);
          state.scores[i] = s ?? 0;
          qEl.dataset.answered = 'true';
        }
      });
      state.submitted = true;
      this.disabled = true;
      const totalScore = state.scores.reduce((s, v) => s + (v || 0), 0);
      const maxScore   = questions.length;
      showResults(container, totalScore, maxScore, cfg);
      if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise([container]);
    });

    container.addEventListener('click', function(e) {
      if (e.target.classList.contains('quiz-retry-btn')) {
        window.QuizEngine.init(cfg);
      }
    });

    if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise([container]);
  }
};

})();
