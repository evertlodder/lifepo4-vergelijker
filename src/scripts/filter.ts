/**
 * Client-side filter logic for the LiFePO4 comparator.
 * Runs in the browser; compiled by Astro/Vite.
 */

interface FilterState {
  voltage: string;      // '0' = all
  brand: string;        // '0' = all
  warranty: number;     // 0 = all
  cycles: number;       // 0 = all
  bt: boolean;
  lt: boolean;
  heat: boolean;
  can: boolean;
  flex: boolean;
  sp: boolean;
  app: string;          // '' = all
}

const state: FilterState = {
  voltage: '0',
  brand: '0',
  warranty: 0,
  cycles: 0,
  bt: false,
  lt: false,
  heat: false,
  can: false,
  flex: false,
  sp: false,
  app: '',
};

// ── Helpers ──────────────────────────────────────────────────────

function setActive(groupId: string, matchFn: (btn: HTMLElement) => boolean) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll<HTMLElement>('.volt-btn').forEach(btn => {
    btn.classList.toggle('active', matchFn(btn));
  });
}

function render() {
  const cards = document.querySelectorAll<HTMLElement>('.card[data-brand]');
  let visible = 0;

  cards.forEach(card => {
    const v   = card.dataset.voltage   ?? '';
    const b   = card.dataset.brand     ?? '';
    const w   = parseInt(card.dataset.warranty ?? '0');
    const cy  = parseInt(card.dataset.cycles   ?? '0');
    const bt  = card.dataset.bt   === 'true';
    const lt  = card.dataset.lt   === 'true';
    const heat= card.dataset.heat === 'true';
    const can = card.dataset.can  === 'true';
    const flex= card.dataset.flex === 'true';
    const sp  = card.dataset.sp   === 'true';
    const apps= (card.dataset.apps ?? '').split(',');

    const show =
      (state.voltage === '0' || v === state.voltage) &&
      (state.brand   === '0' || b === state.brand)   &&
      (state.warranty === 0  || w >= state.warranty)  &&
      (state.cycles   === 0  || cy >= state.cycles)   &&
      (!state.bt   || bt)   &&
      (!state.lt   || lt)   &&
      (!state.heat || heat) &&
      (!state.can  || can)  &&
      (!state.flex || flex) &&
      (!state.sp   || sp)   &&
      (state.app === '' || apps.includes(state.app));

    card.dataset.hidden = show ? 'false' : 'true';
    if (show) visible++;
  });

  // Update count
  const countEl = document.getElementById('results-count');
  if (countEl) {
    const total = cards.length;
    countEl.textContent = countEl.dataset.tpl!
      .replace('{n}', String(visible))
      .replace('{t}', String(total));
  }

  // Show/hide no-results message
  const noResults = document.getElementById('no-results');
  if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
}

// ── Event bindings ────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

  // Voltage
  document.getElementById('voltageFilters')?.addEventListener('click', e => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('.volt-btn');
    if (!btn) return;
    state.voltage = btn.dataset.v ?? '0';
    setActive('voltageFilters', b => b.dataset.v === state.voltage);
    render();
  });

  // Brand
  document.getElementById('brandFilters')?.addEventListener('click', e => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('.volt-btn');
    if (!btn) return;
    state.brand = btn.dataset.b ?? '0';
    setActive('brandFilters', b => b.dataset.b === state.brand);
    render();
  });

  // Warranty
  document.getElementById('warrantyFilters')?.addEventListener('click', e => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('.volt-btn');
    if (!btn) return;
    state.warranty = parseInt(btn.dataset.w ?? '0');
    setActive('warrantyFilters', b => parseInt(b.dataset.w ?? '0') === state.warranty);
    render();
  });

  // Cycles
  document.getElementById('cyclesFilters')?.addEventListener('click', e => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('.volt-btn');
    if (!btn) return;
    state.cycles = parseInt(btn.dataset.c ?? '0');
    setActive('cyclesFilters', b => parseInt(b.dataset.c ?? '0') === state.cycles);
    render();
  });

  // Feature checkboxes
  (['bt','lt','heat','can','flex','sp'] as const).forEach(feat => {
    document.getElementById(`feat-${feat}`)?.addEventListener('change', e => {
      state[feat] = (e.target as HTMLInputElement).checked;
      render();
    });
  });

  // Application filter
  document.getElementById('appFilters')?.addEventListener('click', e => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('.volt-btn');
    if (!btn) return;
    state.app = btn.dataset.app ?? '';
    setActive('appFilters', b => b.dataset.app === state.app);
    render();
  });

  // Reset
  document.getElementById('resetBtn')?.addEventListener('click', () => {
    state.voltage = '0'; state.brand = '0';
    state.warranty = 0;  state.cycles = 0;
    state.bt = false; state.lt = false; state.heat = false;
    state.can = false; state.flex = false; state.sp = false;
    state.app = '';

    setActive('voltageFilters',  b => b.dataset.v === '0');
    setActive('brandFilters',    b => b.dataset.b === '0');
    setActive('warrantyFilters', b => b.dataset.w === '0');
    setActive('cyclesFilters',   b => b.dataset.c === '0');
    setActive('appFilters',      b => b.dataset.app === '');

    (['bt','lt','heat','can','flex','sp'] as const).forEach(feat => {
      const el = document.getElementById(`feat-${feat}`) as HTMLInputElement | null;
      if (el) el.checked = false;
    });

    render();
  });

  // Initial render
  render();
});
