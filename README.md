# Specialized Showdown

A fast, dependency-free 2v2 hero arena game built for GitHub Pages.

## Play locally

Open `index.html` in a modern browser. No install or build command is required.

For a local server, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Game modes

- **Solo Command:** Player 1 and an AI teammate fight two AI opponents.
- **Local Duel:** Player 1 and Player 2 fight on opposite teams, each with an AI teammate.
- First team to 8 eliminations wins. If the three-minute timer expires, the highest score wins.

## Controls

| Player | Move | Basic attack | Ability | Ultimate |
| --- | --- | --- | --- | --- |
| Player 1 | W A S D | F | G | R |
| Player 2 | Arrow keys | K | L | O |

The game uses smart targeting: attacks lock onto the nearest enemy in range.

## Publish with GitHub Pages

1. Upload every file in this folder to the root of a GitHub repository.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the `main` branch and `/ (root)`, then save.
5. GitHub will show the public game URL after deployment finishes.

## Starting fighters

- **Gale — Wind:** Clearing Gust pushes opponents, redirects bullets, and moves cover. Tornado Run carries enemies and objects across the arena.
- **Tidal — Water:** Crashing Wave damages opponents and throws them backward. Riptide repeatedly pushes everyone out of a flooded zone.
- **Pyre — Fire:** Fire Burst explodes around the fighter. Inferno Crown burns a wide area over time.
- **Volt — Thunder:** Thunder Strike calls lightning onto the nearest opponent. Storm Cage repeatedly strikes a targeted zone.
- **Seraph — Angel:** Angel Grace heals both teammates. Divine Revival fully restores and shields the team.
- **Reverb — Sound:** Sound Jump teleports to the nearest recent gunshot. Sonic Collapse jumps through both opponents and damages them.
- **Mirage — Illusion:** False Squad creates two targetable moving decoys. Mirror Army creates five.
- **Hemlock — Blood:** Every elimination permanently increases damage by 12% for that match. Blood Rush trades health for speed; Red Harvest drains opponents.
- **Glacier — Ice:** Ice Slick makes opponents slide uncontrollably. Deep Freeze covers a massive part of the arena.
- **Drakon — Dragon:** Dragon Hunt sends a dragon through opponents and destroys cover in its path. Twin Dragons releases two at once.
- **Havoc — Insanity:** Triple Vision makes opponents see three Havocs. Mass Delusion surrounds the battle with even more false versions.

Arena cover now has durability. Wind can move smaller cover objects, while Dragon attacks instantly tear through cover in their path.
