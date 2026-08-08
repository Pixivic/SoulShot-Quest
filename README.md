# Soulshot Quest

Soulshot Quest is a static HTML5 browser game by Pixivic. This package is ready to host with GitHub Pages.

## Play locally

Open `index.html` in a browser. For the most consistent browser behavior, you can also serve the folder with any simple local HTTP server.

## Controls

- Desktop: move the mouse to aim and click to shoot.
- Mobile: rotate the phone to landscape, then tap where you want to aim and shoot.
- Pause: use the pause button or press `P` on desktop.

## Publish with GitHub Pages

1. Create a GitHub repository for the game.
2. Upload the **contents of this folder** to the root of the repository. `index.html` must remain at the repository root.
3. Commit the files to the `main` branch.
4. Open **Settings > Pages** in the repository.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/(root)` folder, then save.
7. After GitHub Pages finishes deploying, open the Pages URL shown by GitHub.

All game assets use relative paths, so the game works correctly from a project Pages URL such as `https://USERNAME.github.io/REPOSITORY/`.

## Main files

- `index.html` — GitHub Pages entry point
- `style.css` — game interface and responsive styling
- `game.js` — game logic
- `assets/` — sprites, UI graphics, fonts, music, and sound effects
- `.nojekyll` — tells GitHub Pages to serve the static files directly

## Credits

Soulshot Quest is a non-commercial Soul Knight fangame made by Pixivic for fun. See the in-game Credits screen for music and project credits.
