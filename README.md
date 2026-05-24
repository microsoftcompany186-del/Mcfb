# 🎮 MSN League — Real-Time Leaderboard App

A modern, high-performance gaming leaderboard dashboard with real-time player stats, search, sort, and filter capabilities.

## 🚀 Features

- **5 Stat Categories**: Kills, Wins, Headshots, Win Streak, Rating
- **Dynamic Leaderboards**: Top 5 players per stat category
- **Search Players**: Real-time search by player name
- **Sort & Filter**: Toggle ascending/descending order, filter by performance
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Staggered card entrance, hover effects, transitions
- **Color-Coded Performance**: Green (high), yellow (medium), orange (low)
- **Team Badges**: Color-coded team indicators

## 📁 File Structure

```
msn-league/
├── index.html          # Main HTML structure
├── app.js              # JavaScript app logic
├── styles.css          # Complete styling
└── README.md           # Documentation
```

## 🎨 Design Highlights

- **Dark Theme**: Deep blacks (#0a0a0c) with orange accents (#FF6B00)
- **Custom Fonts**: Barlow Condensed (display) + Barlow (body)
- **Modern Effects**: Noise overlay, shine sweep, smooth scrollbar
- **Grid Layout**: 5 columns on desktop, responsive down to 1 column on mobile
- **Sticky Toolbar**: Search, filter, sort, and refresh controls
- **Geometric Header**: Decorative corner elements with gradient background

## 🎯 How to Use

### Local Development
1. Clone the repository
2. Open `index.html` in a web browser
3. No build process needed — vanilla HTML/CSS/JS

### Interact with the App
- **Search**: Type a player name in the search bar to filter
- **Sort**: Click "Sort" to toggle ascending/descending order
- **Filter**: Click "Filter" to show only high-performing players
- **Refresh**: Click "Refresh" to simulate API data updates

## 🔄 API Integration

To connect to a real backend, replace the mock data in `app.js`:

```javascript
// Replace this:
const mockPlayers = [...];

// With an API call:
async function fetchPlayers() {
  const response = await fetch('/api/players');
  return await response.json();
}
```

## 📊 Data Structure

Each player object contains:
```javascript
{
  id: 1,
  name: 'PlayerName',
  team: 'RED',          // Team identifier
  kills: 2845,          // Total kills
  wins: 156,            // Total wins
  headshots: 892,       // Headshot count
  winStreak: 12,        // Current win streak
  rating: 2847          // Overall rating
}
```

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --accent-orange: #FF6B00;
  --bg-base: #0a0a0c;
  --text-primary: #f0f0f5;
  /* ... more variables */
}
```

### Stat Categories
Add or modify in `app.js`:
```javascript
const statCategories = [
  { key: 'kills', label: 'Kills', icon: '💥', color: '#FF6B00' },
  // Add more...
];
```

## 📱 Responsive Breakpoints

- **1200px**: 4-column grid
- **960px**: 3-column grid
- **680px**: 2-column grid
- **420px**: 1-column grid

## 🚀 Deployment Options

### GitHub Pages
```bash
git push origin main
# Enable Pages in repo settings
```

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
- Connect GitHub repo to Netlify
- Auto-deploy on push

## 📦 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## 🔧 Performance

- **No external dependencies** — Pure vanilla JS
- **Optimized animations** — GPU-accelerated transforms
- **Efficient rendering** — DOM updates only when needed
- **Small bundle size** — ~15KB total (uncompressed)

## 📄 License

MIT License — Feel free to use and modify

---

**Made with ❤️ for gamers**