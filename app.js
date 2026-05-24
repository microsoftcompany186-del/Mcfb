// ════════════════════════════════════════════════════════════
// MSN LEAGUE APP
// ════════════════════════════════════════════════════════════

// Mock player data
const mockPlayers = [
  { id: 1, name: 'ShadowNinja', team: 'RED', kills: 2845, wins: 156, headshots: 892, winStreak: 12, rating: 2847 },
  { id: 2, name: 'PhantomStrike', team: 'BLU', kills: 2721, wins: 149, headshots: 756, winStreak: 9, rating: 2756 },
  { id: 3, name: 'EchoKing', team: 'GRN', kills: 2634, wins: 142, headshots: 723, winStreak: 7, rating: 2689 },
  { id: 4, name: 'VortexMaster', team: 'YEL', kills: 2512, wins: 135, headshots: 681, winStreak: 5, rating: 2534 },
  { id: 5, name: 'IceQueen', team: 'PUR', kills: 2398, wins: 128, headshots: 645, winStreak: 11, rating: 2421 },
  { id: 6, name: 'ThunderBolt', team: 'ORG', kills: 2245, wins: 119, headshots: 598, winStreak: 6, rating: 2267 },
  { id: 7, name: 'NovaForce', team: 'CYN', kills: 2156, wins: 112, headshots: 564, winStreak: 8, rating: 2178 },
  { id: 8, name: 'InfernoX', team: 'MAG', kills: 2034, wins: 105, headshots: 521, winStreak: 4, rating: 2056 },
  { id: 9, name: 'FrostByte', team: 'LIM', kills: 1923, wins: 98, headshots: 487, winStreak: 3, rating: 1945 },
  { id: 10, name: 'CrimsonRage', team: 'TAN', kills: 1812, wins: 91, headshots: 451, winStreak: 2, rating: 1834 },
];

// Stat categories with colors and icons
const statCategories = [
  { key: 'kills', label: 'Kills', icon: '💥', color: '#FF6B00' },
  { key: 'wins', label: 'Wins', icon: '🏆', color: '#FFD700' },
  { key: 'headshots', label: 'Headshots', icon: '🎯', color: '#FF4444' },
  { key: 'winStreak', label: 'Win Streak', icon: '⚡', color: '#00FF88' },
  { key: 'rating', label: 'Rating', icon: '⭐', color: '#00CCFF' },
];

// App state
const state = {
  players: [...mockPlayers],
  searchQuery: '',
  sortOrder: 'desc',
  activeFilter: null,
};

// ────────────────────────────────────────────────────────────
// RENDER FUNCTIONS
// ────────────────────────────────────────────────────────────

/**
 * Render a single stat card with player leaderboard
 */
function renderStatCard(category) {
  const sorted = [...state.players].sort((a, b) => {
    const aVal = a[category.key];
    const bVal = b[category.key];
    return state.sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
  });

  const card = document.createElement('div');
  card.className = 'stat-card';
  card.style.setProperty('--card-glow', category.color);

  // Card header
  const header = document.createElement('div');
  header.className = 'card-header';
  header.innerHTML = `
    <span class="card-icon">${category.icon}</span>
    <span class="card-title">${category.label}</span>
    <span class="card-count">${sorted.length}</span>
  `;

  // Accent line
  const accentLine = document.createElement('div');
  accentLine.className = 'card-accent-line';
  accentLine.style.backgroundColor = category.color;

  // Player list
  const playerList = document.createElement('div');
  playerList.className = 'player-list';

  sorted.slice(0, 5).forEach((player, index) => {
    const row = document.createElement('div');
    row.className = 'player-row';

    const rankColor = index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : 'inherit';
    const value = player[category.key];
    const valueColor = getValueColor(value, category.key);

    row.innerHTML = `
      <div class="player-rank" style="color: ${rankColor}">${index + 1}</div>
      <div class="team-logo-placeholder" style="background: ${getTeamColor(player.team)}">${player.team.charAt(0)}</div>
      <div class="player-name">${player.name}</div>
      <div class="player-value" style="color: ${valueColor}">${formatNumber(value)}</div>
    `;

    playerList.appendChild(row);
  });

  card.appendChild(header);
  card.appendChild(accentLine);
  card.appendChild(playerList);

  return card;
}

/**
 * Render all stat cards
 */
function renderLeaderboard() {
  const grid = document.getElementById('leaderboardGrid');
  grid.innerHTML = '';

  statCategories.forEach(category => {
    grid.appendChild(renderStatCard(category));
  });
}

// ────────────────────────────────────────────────────────────
// UTILITY FUNCTIONS
// ────────────────────────────────────────────────────────────

/**
 * Get color for stat value based on performance
 */
function getValueColor(value, key) {
  const allValues = state.players.map(p => p[key]);
  const max = Math.max(...allValues);
  const min = Math.min(...allValues);
  const percent = (value - min) / (max - min);

  if (percent > 0.7) return '#00FF88'; // Green
  if (percent > 0.4) return '#FFD700'; // Yellow
  return '#FF6B00'; // Orange
}

/**
 * Get team color
 */
function getTeamColor(team) {
  const colors = {
    RED: '#FF4444',
    BLU: '#4488FF',
    GRN: '#44FF44',
    YEL: '#FFDD44',
    PUR: '#CC44FF',
    ORG: '#FF8844',
    CYN: '#44FFCC',
    MAG: '#FF44CC',
    LIM: '#CCFF44',
    TAN: '#CCAA88',
  };
  return colors[team] || '#999999';
}

/**
 * Format large numbers with commas
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ────────────────────────────────────────────────────────────
// EVENT HANDLERS
// ────────────────────────────────────────────────────────────

/**
 * Search players
 */
function handleSearch(query) {
  state.searchQuery = query.toLowerCase();
  state.players = mockPlayers.filter(p =>
    p.name.toLowerCase().includes(state.searchQuery)
  );
  renderLeaderboard();
}

/**
 * Toggle sort order
 */
function handleSort() {
  state.sortOrder = state.sortOrder === 'desc' ? 'asc' : 'desc';
  renderLeaderboard();
}

/**
 * Filter (example: only players with 100+ wins)
 */
function handleFilter() {
  if (state.activeFilter === 'high') {
    state.players = [...mockPlayers];
    state.activeFilter = null;
  } else {
    state.players = mockPlayers.filter(p => p.wins >= 100);
    state.activeFilter = 'high';
  }
  renderLeaderboard();
}

/**
 * Refresh data (simulate API call)
 */
function handleRefresh() {
  console.log('Refreshing data...');
  // Simulate slight variations in data
  state.players = state.players.map(p => ({
    ...p,
    kills: Math.max(p.kills, p.kills + Math.floor(Math.random() * 20 - 10)),
    rating: Math.max(p.rating, p.rating + Math.floor(Math.random() * 30 - 15)),
  }));
  renderLeaderboard();
}

// ────────────────────────────────────────────────────────────
// INITIALIZATION
// ────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Attach event listeners
  document.getElementById('searchInput').addEventListener('input', (e) => {
    handleSearch(e.target.value);
  });

  document.getElementById('sortBtn').addEventListener('click', handleSort);
  document.getElementById('filterBtn').addEventListener('click', handleFilter);
  document.getElementById('refreshBtn').addEventListener('click', handleRefresh);

  // Initial render
  renderLeaderboard();
});