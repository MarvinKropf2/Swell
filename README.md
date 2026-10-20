# SWELL

Mobile-first workout tracker for personal gym and surf preparation. Version 49.

Version 49 adds corrected workout timing when a finished session is reopened: only additional edit-session time is added, with a manual calendar duration correction option for older saved logs. A new optional `Krank` checkbox in Tagesform marks the relevant calendar date without affecting workouts or recommendations.

Version 48 implements the approved 12-month surf workout: one weekly leg-strength day, complete upper-body and core coverage, complementary exercise ordering, and separate progressive short-run, long-run and interval exercises for every month. It preserves saved workout history and the completed update-day plan snapshot. See [the v4 training-plan reference](docs/surf-year-plan-v4.md).

Version 40 adds the non-destructive **World Trip Surf Performance** program: twelve editable monthly plans with four 72–75 minute sessions on Tuesday, Wednesday, Friday and Saturday, surf-specific power and shoulder-prehab work, progressive running, conservative starting loads, exercise rest targets, monthly benchmarks and an automatic every-fourth-week deload. Existing plans and workout history remain available. The complete rationale and prescription are documented in [`docs/surf-year-plan.md`](docs/surf-year-plan.md).

Training separates the weekly gym plan and optional stretching into two sections. On rest days stretching comes first and the gym plan starts collapsed; on gym days stretching follows the gym plan. Stretching management supports creating, editing, copying and deleting routines, editing individual guided stretches, and assigning routines to rest weekdays. Routine settings synchronize with the account; saved calendar entries retain their original exercises and instructions.

Optional rest-day stretching rotates upper body, hips/legs, and back/posterior-chain routines across the active plan's rest days. Each stretch has an expandable guide and a single completion check, with no weight, repetition, or timer fields. Sessions resume, sync, and save in the calendar; they do not count toward strength-workout totals or missed-workout completion. Guide references: [NHS flexibility exercises](https://www.nhs.uk/live-well/exercise/flexibility-exercises/), [NHS post-exercise stretches](https://www.nhs.uk/live-well/exercise/how-to-stretch-after-exercising/).

## Deploy on Vercel

1. Open https://vercel.com/new and select **Import Git Repository**.
2. Select `MarvinKropf2/Swell` (authorize repository access if prompted).
3. Choose **Other** as the framework preset (this is a static site), leave the root directory as `./`, and deploy. No build command is needed.
4. Open the generated `*.vercel.app` address in Safari. Future pushes to `main` automatically deploy after the project is linked.

## App features

- Create and switch between multiple editable weekly workout plans.
- Follow a progressive 12-month surf-performance program without replacing existing plans.
- See planned session duration, exercise blocks, rest periods, starting-load estimates and automatic deload reductions inside the workout logger.
- Change training days, exercises, weights, reps, and sets.
- Check off sets automatically by entering weight/reps, or manually for bodyweight movements.
- Save weight, reps, notes, and completed sets in the calendar for every workout.
- Keep the planned weekly schedule historically stable by saving the effective plan revision for each date; activating or editing a plan applies from that day forward.
- Synchronize plans, workouts, food days, readiness days, bodyweight records, plan history, and the active session as individual Firestore documents, while retaining the original `current` document as a migration backup.
- Undo deleting a workout, exercise, cleared training day, or food entry from the confirmation toast for a short time.
- Open the app on today and resume an active workout after reopening it.
- Start today's workout directly from the top of the Training tab.
- Keep rest days out of the Training landing page and manage plan editing, duplication, activation, and deletion in one dedicated screen.
- Show the training week directly, with weekly-plan management immediately below the page heading.
- Show the active plan name in a dedicated panel below weekly-plan management.
- Review completed exercises, sets, reps, weights, failure sets, and notes in the calendar.
- Start missed-workout tracking only when Google sync is first linked, then mark past scheduled days without a saved workout in the calendar.
- Show each day's saved food entries, calories, and protein in the calendar.
- Reset the calendar to today after leaving it, including when another month or date was selected.
- Delete a saved workout directly from its calendar entry.
- Keep today's workout at the top of Training and show only genuinely unfinished sessions underneath.
- Show the last completed values as placeholders when repeating an exercise.
- Suggest conservative load or repetition progress based on the last sessions, target range, failure sets, and today's readiness.
- Add or swap exercises for the current workout without changing the weekly plan, using either a new exercise or a quick picker containing saved exercises.
- Expand curated technique instructions for built-in exercises, including a concrete five-minute mobility flow.
- Add optional personal "So geht's" instructions to custom exercises; exercises without guidance never show placeholder advice.
- Keep workout start actions above long exercise lists so starting never requires scrolling to the bottom.
- Ask for sleep, energy, and soreness once per local day, never before 05:00, and show the saved scores as compact icons beside Today.
- Show a workout summary with completed exercises, sets, volume, duration, and new records after saving and in the calendar.
- Track bodyweight and mobility exercises without an unnecessary weight field.
- Add structured food entries with meal, item, quantity, unit, calories, and protein.
- Show Liquid Glass-style confirmations with a spring entrance, clear exit, and a visible lifetime indicator.
- Use the fluid Apple-inspired Glass interface and motion style throughout the app.
- Float the rounded bottom navigation just above the screen edge and blur the protected area beneath it, so scrolling content cannot reappear below the bar.
- Use iOS-friendly dropdowns, inputs, sheets, and navigation controls.
- Swipe from the left screen edge to use the visible in-app back action on iPhone and other touch devices; the page follows the gesture, vertical scrolling cancels it, and the back button remains available.
- Temporarily compare the existing Training layout with a more clearly grouped version using the Home chooser; the choice lasts only for the current browser session and is never synchronized.
- Install the app from Safari with a dedicated SWELL home-screen icon and standalone display.
- Keep the app shell available offline and save workout changes locally until a connection returns.
- Use the selected Medium layout throughout the app.
- Save completed workouts, history, calendar, and training progress.
- External exercise demonstration videos where available.

## Storage / privacy

By default your information is saved in **localStorage on your browser and domain** only, **not** in GitHub or Vercel. Export a JSON backup through the app. Browser-data deletion or changing to a different Vercel domain can erase access to saved local workouts.

Google/Firebase synchronization is configured for `swell-747e4`. Sign in from Settings with the same Google account on each device. Analytics is not loaded. The following console settings are required:

1. Create a Firebase project and register a web app.
2. Enable **Google** under Firebase Authentication → Sign-in method.
3. Create a Firestore database and publish the included `firestore.rules`.
4. Public Firebase web-app configuration is included in `firebase-config.js`.
5. Add the production Vercel domain to Firebase Authentication → Authorized domains.

Firebase's web-app configuration identifies the project but is not an admin credential. Never commit service-account credentials, private keys, workout exports, or other secrets.

The repository is public; **do not commit personal workout exports**, Firebase admin secrets, or other private data.

## Technical

Static HTML/CSS/JavaScript. No npm install or build required. Exercise-video retrieval uses the public wger API; not all exercises will have playable videos.

The optional Apple-inspired comparison uses original SWELL CSS and icons, informed by Apple's public design guidance and the open Apple Design System Catalog. No protected Apple artwork or proprietary assets are bundled.
