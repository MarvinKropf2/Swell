# SWELL

Mobile-first workout tracker for personal gym and surf preparation. Version 8.

## Deploy on Vercel

1. Open https://vercel.com/new and select **Import Git Repository**.
2. Select `MarvinKropf2/Swell` (authorize repository access if prompted).
3. Choose **Other** as the framework preset (this is a static site), leave the root directory as `./`, and deploy. No build command is needed.
4. Open the generated `*.vercel.app` address in Safari. Future pushes to `main` automatically deploy after the project is linked.

## App features

- Create and switch between multiple editable weekly workout plans.
- Change training days, exercises, weights, reps, and sets.
- Check off sets automatically by entering weight/reps, or manually for bodyweight movements.
- Save weight, reps, notes, and completed sets in the calendar for every workout.
- Show the last completed values as placeholders when repeating an exercise.
- Track bodyweight and mobility exercises without an unnecessary weight field.
- Compare five temporary Food concepts from the selector in the Food tab.
- Save completed workouts, history, calendar, and training progress.
- External exercise demonstration videos where available.

## Storage / privacy

By default your information is saved in **localStorage on your browser and domain** only, **not** in GitHub or Vercel. Export a JSON backup through the app. Browser-data deletion or changing to a different Vercel domain can erase access to saved local workouts.

Optional Google/Firebase synchronization is **not configured**. Add public Firebase web-app settings to `firebase-config.js`, enable Firestore/Authentication and publish `firestore.rules` to activate it. Never commit service-account credentials.

The repository is public; **do not commit personal workout exports**, Firebase admin secrets, or other private data.

## Technical

Static HTML/CSS/JavaScript. No npm install or build required. Exercise-video retrieval uses the public wger API; not all exercises will have playable videos.
