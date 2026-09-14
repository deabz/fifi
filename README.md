# Fifi's Little Corner

A self-contained static website made by Arian for Fifi.

## Run it

Open `index.html` directly, or serve the folder with any static server:

```powershell
python -m http.server 8000 --directory .
```

Then visit `http://localhost:8000`.

## Add the music

The player is paused by default and is intentionally wired to a local file that the site owner supplies:

`assets/on-the-square-by-mac-demarco.mp3`

The player is labeled for Fifi's favourite song, “On the Square” by Mac DeMarco.
Add a copy of the song at `assets/on-the-square-by-mac-demarco.mp3` only if you
have permission to use it before
playing it on the site. The repository does not include or fetch the copyrighted
recording.

Only add audio you have permission to use. The project does not download, scrape,
or embed copyrighted songs.

## Easy edits

- Change facts, compliments, lore, and messages in `script.js`.
- Adjust colors and layout tokens at the top of `styles.css`.
- Edit the visible copy and section structure in `index.html`.
