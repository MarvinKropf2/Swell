# Swell Surf Year v6 · Approved 12-month training split

## Weekly structure

| Day | Exercises | Time target |
| --- | --- | --- |
| Tuesday | Pull-ups / assist, hammer curls, chest-supported rows, face pulls, straight-arm pulldown, 2 sets push-ups, monthly short jog | Up to 75 minutes |
| Wednesday | 2 sets regular surf pop-ups followed by leg press, leg curl, leg extension, hip thrust machine, calf raises, Pallof press | Around 50 minutes |
| Friday | Bench press, cable lateral raises, incline dumbbell press, rope triceps pushdowns, high-to-low or low-to-high cable fly, cable external rotation, monthly run intervals | Up to 75 minutes |
| Saturday | Surf pop-ups (reactive months 7–11), single-arm cable paddle pulls, medicine-ball rotational throws, hanging knee raises, side plank, monthly long jog | Up to 75 minutes |

The individual set/rep prescriptions for all 12 months are specified in `surf-year-plan-v6.js`.
Running prescriptions remain from v4. The six Wednesday leg-machine/core exercises and their progression remain from v5. Extra regular Wednesday pop-up sets are technique work and complement Saturday's power-oriented drills. Wednesday removes the separately listed warm-up, not necessary ramp-up sets or safe movement preparation.

## Months and progression

- Months 1–3: Technique, accessible rep ranges and controlled pop-ups.
- Months 4–6: Greater resistance with some lower repetition ranges; Saturday gains rotational workload.
- Months 7–9: Reactive pop-ups Saturday, sustained paddle strength and more challenging core.
- Months 10–11: Higher performance targets, longest planned cardio; cap gym time by monitoring actual workout duration.
- Month 12: Reduced sets, running and explosive work for a recovery/taper month.
- Every fourth week: existing automatic deload in SWELL remains in effect.

## Data preservation / migration

- `window.SWELL_SURF_YEAR` v6 is loaded **after v5**, not as a new program: plan IDs, program ID and calendar history remain stable.
- The migration upgrades only generated Surf Year plans below version 6; all unrelated plans and explicitly deleted plan IDs stay as they are.
- Saved exercise weights transfer by stable exercise ID across days, with user-added exercises appended before each day's running finish.
- No saved log, active session, personal notes on logs, readiness, food, weight history or old timeline snapshot is altered by v6.
- If there is already a workout log today or an active workout session, the changed active plan timeline becomes effective tomorrow.
- The update is idempotent. Previous plan snapshots are retained; old generated exercises are replaced only in planned templates, never in completed logs.
- Automatic deployment from GitHub main is configured by the hosting integration; the web service worker cache identifier is incremented to pick up the new file.

## Follow-up to validate in real workouts

The Friday session could exceed 75 minutes in late months once 25+ minutes of intervals are added. Use actual workout times and equipment availability after the user's next training; do not remove sets prematurely.
