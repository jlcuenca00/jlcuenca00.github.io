/**
 * Space Engine v2.0
 * Handles manual parallax scroll sync and live console feedback.
 */

window.addEventListener('scroll', () => {
    // Get current scroll position
    const scrollValue = window.scrollY;
    
    // Pass to CSS for parallax calculations
    document.documentElement.style.setProperty('--scroll', scrollValue);
});

// Logs for verification
console.log("Galaxy Background: Live Drift & Parallax Active.");
console.log("Card Reactive Glow: Initialized.");