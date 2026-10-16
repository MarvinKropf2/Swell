# SWELL

Mobile-first workout tracker for personal gym and surf preparation. Version 14.

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
- Open the app on today and resume an active workout after reopening it.
- Start today's workout directly from the top of the Training tab.
- Keep the full training week collapsed until the weekly-plan card is opened.
- Review completed exercises, sets, reps, weights, failure sets, and notes in the calendar.
- Delete a saved workout directly from its calendar entry.
- Keep today's workout at the top of Training and show only genuinely unfinished sessions underneath.
- Show the last completed values as placeholders when repeating an exercise.
- Suggest conservative load or repetition progress based on the last sessions, target range, failure sets, and today's readiness.
- Add or swap exercises for the current workout without changing the weekly plan, using either a new exercise or a quick picker containing saved exercises.
- Expand concise technique instructions for every exercise, including a concrete five-minute mobility flow.
- Ask for sleep, energy, and soreness once per local day, never before 05:00, and show the saved scores as compact icons beside Today.
- Show a workout summary with completed exercises, sets, volume, duration, and new records after saving and in the calendar.
- Track bodyweight and mobility exercises without an unnecessary weight field.
- Add structured food entries with meal, item, quantity, unit, calories, and protein.
- Show brief confirmations in the top-right corner.
- Use iOS-friendly dropdowns, inputs, sheets, and navigation controls.
- Install the app from Safari with a dedicated SWELL home-screen icon and standalone display.
- Keep the app shell available offline and save workout changes locally until a connection returns.
- Use the selected Medium layout throughout the app.
- Save completed workouts, history, calendar, and training progress.
- External exercise demonstration videos where available.

## Storage / privacy

By default your information is saved in **localStorage on your browser and domain** only, **not** in GitHub or Vercel. Export a JSON backup through the app. Browser-data deletion or changing to a different Vercel domain can erase access to saved local workouts.

Optional Google/Firebase synchronization is **prepared but not configured**. To activate the Google login and cross-device sync once:

1. Create a Firebase project and register a web app.
2. Enable **Google** under Firebase Authentication → Sign-in method.
3. Create a Firestore database and publish the included `firestore.rules`.
4. Add the public Firebase web-app configuration to `firebase-config.js`.
5. Add the production Vercel domain to Firebase Authentication → Authorized domains.

Firebase's web-app configuration identifies the project but is not an admin credential. Never commit service-account credentials, private keys, workout exports, or other secrets.

The repository is public; **do not commit personal workout exports**, Firebase admin secrets, or other private data.

## Technical

Static HTML/CSS/JavaScript. No npm install or build required. Exercise-video retrieval uses the public wger API; not all exercises will have playable videos.
