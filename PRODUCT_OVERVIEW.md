# DecisionEase — Product & User Journey Design

> A companion to the [architecture README](./README.md). This document describes *what the product does for a person* and *how its user journeys are designed* — the thinking behind every screen.
>
> 🎬 Prefer watching? See the [demo videos](./README.md#-demo) — a 40-second overview plus short walkthroughs of capture and smart scheduling.

---

## 1. Who It's For

DecisionEase is built for people whose biggest productivity problem isn't a missing feature — it's **cognitive overload**:

- Too many open loops ("I need to email the dentist, call mom, finish that invoice…")
- Decision fatigue ("Should I take this job? Which course? I keep going back and forth.")
- Task abandonment (started strong, drifted, now the backlog feels like guilt)
- Context loss ("What was I even working on yesterday?")

It is designed with particular care for **ADHD and executive-function-challenged users** — people for whom standard productivity tools quietly become shame machines. Every design decision is tested against that persona, not against generic best practice.

### The problem clusters the product addresses

| Cluster | The lived experience | What DecisionEase does |
|---|---|---|
| **Decision fatigue** | Rethinking the same choice for the tenth time | Structured pros/cons analysis, connected to your own past decisions, ending in one recommendation |
| **Task abandonment** | Plans made, plans dropped, silence | One-at-a-time focus flow, struggle detection, gentle restart paths |
| **Context switching** | Notes app + calendar + journal + chat, none talking to each other | One loop: capture → review → decide → place → reflect, in a single app |
| **Memory load** | Re-explaining your life to your tools every day | 4-layer memory that carries context across days and resurfaces what matters |
| **Loss of trust** | Tools that claim success but silently failed | An honesty contract: the AI may only claim what verifiably happened |
| **Loss of control** | AI that does things you didn't ask for | Every autonomous behavior has an off-switch (Full Auto / Suggest First / Notify Only / Off) |

---

## 2. The Core Loop

```
capture → compress → review → decide → place → reflect
```

A thought enters the system in under two seconds (text, voice, or pasted link). The system compresses it (auto-tag, categorize, deduplicate, match against goals). The user reviews it when *they* choose to, turns it into a decision or a commitment, places it into real time on the schedule, and reflects on the pattern later. Nothing requires immediate triage — the whole point is that capturing must cost almost nothing, so nothing stays stuck in your head.

---

## 3. The Surfaces — Journey Design by Screen

The app is a tab-based PWA with five surfaces plus a floating chat. Each surface is designed around **one question** the user is implicitly asking when they land on it.

### 🏠 Today — *"What should I focus on right now?"*

The "now" screen. Its job is to **shrink the day into something startable**.

- **Focus Card** — one task, highlighted. Not a list of twelve. One. With Done / Skip / Start Focus actions.
- **Quick Capture** — a single input box; anything typed lands in the system and gets out of your head.
- **Morning Brief** (first open of the day) — top priorities, an energy forecast based on your patterns, curated content suggestions, and yesterday's wins celebrated.
- **Evening Recap** (after 5pm) — what got done, what didn't, mood summary, and a reflection prompt that actually persists what you write.
- **Focus sessions** — start a task, and the system quietly watches for struggle signals (stall time vs. estimate, mood deltas). If you're stuck, it offers a gentle nudge — an *optional* interruption, never a forced one.
- **Skip with a reason** — skipping isn't failure; the reason picker feeds the pattern engine, and the wording stays kind.
- **Restart paths** — a missed task gets a visible "restart" affordance with a new placement, not a red overdue badge.

### 📅 Plan — *"Where does this fit, and how strongly does it matter?"*

The time screen. Turns intent into visible commitment.

- **Timeline view** with a NOW card highlighting the current block.
- **AI Time Boxing** — one tap generates a proposed schedule. Critically, it shows a **preview diff with per-block reasoning** before anything is saved. The user approves; the AI doesn't unilaterally rewrite your day.
- **Life-area awareness** — the generated plan respects your declared life balance (Health / Career / Learning / Relationships / Finance weights).
- **Goal trajectory selection** — pick which goals this day should serve, and the plan biases toward them.
- **Block editing** — long-press any block to adjust title, duration, or goal linkage.
- **Timezone-correct by design** — schedules resolve against your stored IANA timezone, so an 11pm block lands on the right calendar day even for night owls and across DST changes.

### 🤔 Decide — *"What should I do with this thought, task, or resource?"*

The review-and-choose screen, with four sub-areas:

- **Decisions** — create a decision card ("Should I…?" + 2–3 options). The Coach agent produces per-option pros/cons, alignment scores against your goals (1–10), and a recommendation. "Choose This" closes the loop and can spawn a follow-up goal or task. Old decisions archive — never delete — so your decision history remains queryable.
- **Library** — saved links, videos, and articles, each with a type badge, duration, and an AI-computed match score against your goals. Swipe to schedule it, complete it, or archive it.
- **Goals** — goal list with progress bars, milestone roadmaps, and a "break this step down" flow that decomposes a milestone into schedulable sub-steps.
- **Balance** — a Life Wheel visualization of where your committed time actually goes versus where you said you wanted it to go, with sliders to adjust.

### 🌱 Reflect — *"What keeps happening, and what affects my follow-through?"*

The pattern-and-memory screen.

- **KPI strip** — streak, completion rate, mood trend. Deliberately small: three numbers, not a dashboard.
- **Worth Considering** — at most four AI suggestion cards ("Try this"), each derived from detected patterns and dismissible without guilt.
- **Drift / Steady grouping** — which life areas are drifting from your stated intentions, and which are holding.
- **Still Echoing** — thoughts and decisions that were captured but never closed, gently resurfaced.
- **Memory Lane** — automatically detected "big moments" (milestones, streaks, mood highs), grouped by month. The product remembers your wins for you.

### 💬 Chat — *"What kind of help do I need right now?"*

Not a tab — a **floating button** that raises a bottom sheet from anywhere. It's the universal entry point and the highest-traffic surface: roughly 40% of all user journeys begin here.

- **Mixed-intent understanding** — "add a task to email the dentist and remind me to call mom and I want to start saving" is recognized as *three* intents. The system fans the message out into separate proposals (a task, a reminder, a goal), each with its own confirm chip — instead of silently acting on one and dropping the rest.
- **Capture in any modality** — text, voice (transcribed), or a pasted URL (metadata auto-extracted into the Library).
- **Decision questions** — "Should I X?" routes to structured decision analysis with a draft card you can open in Decide.
- **Planning requests** — "Plan my day" generates schedule blocks with an "Open Plan" chip that navigates you to the result.
- **Action chips, not silent actions** — when chat proposes something mutating, it renders a confirmation chip. Clicking it executes, shows an explicit success or failure message, reveals the changed surface, and offers undo where applicable.
- **Emotional routing** — "I'm overwhelmed, too much on my plate" is detected as an overload signal and routes to narrowing help, not a task list.

### ⚙️ Settings — *"Who is in control here?"* (Answer: you.)

- **Tone** — Direct / Warm / Analytical / Playful. Every AI response is rewritten in your chosen voice.
- **Autonomy gates** — per-agent control: Full Auto / Suggest First / Notify Only / Off.
- **Quiet hours** — the system doesn't ping you at night (default 22:00–07:00).
- **Working hours** — scheduling respects when your day actually starts and ends.
- **Themes** — three complete visual themes (Nature / Minimal / Modern).
- **Integrations** — Google Calendar, Notion sync, push notifications: all opt-in, all reversible.

---

## 4. The Onboarding Journey

Five animated steps, each persisting one foundational piece of context — so the product is personalized from minute one rather than starting cold:

1. **Life Areas** — slide weights across Health / Career / Learning / Relationships / Finance.
2. **First goal** — free text or a quick template; the system immediately seeds a first actionable step from it.
3. **Tone preference** — choose how the AI should talk to you.
4. **Capture tutorial** — perform one real capture, so the core gesture is in muscle memory.
5. **Working hours** — when your day runs.

After onboarding, the first visit to Today triggers a morning brief — the user's first experience is the product *giving* them something, not asking for more setup.

---

## 5. Example End-to-End Journeys

**The brain dump.**
User opens chat and types: *"email Sarah about the contract, gym at 8pm, and I really want to start saving for a trip."* → The system detects three intents and shows three proposal rows: a task, a schedule block, a goal. → User taps Commit on each. → A success toast deep-links to each created item; Today, Plan, and Goals all reflect the changes immediately. Nothing was lost, and nothing was created without consent.

**The stuck decision.**
User types: *"Should I take the contract role or stay full-time?"* → Coach builds a decision card: pros/cons per option, alignment with the user's stated goals, three similar past decisions with their outcomes, a recommendation with confidence. → User clicks "Choose This" → optionally spawns a follow-up goal. The decision is archived into memory, so six months later "didn't I already think about this?" has an answer.

**The overwhelmed evening.**
At 9pm the user opens the app to a recap: 3 done, 2 not. Each unfinished item asks for an *intentional outcome* — Tomorrow / Later / Not now / Make smaller — instead of silently rolling into tomorrow's guilt pile. The reflection prompt captures how the day actually felt, and that signal feeds next week's pattern detection.

**The morning re-entry.**
7am, the user's local time: a brief assembles top tasks, an energy forecast from their learned daily rhythm, one or two curated items from their Library, and a celebration of yesterday's completed milestone — tone-matched to how they asked to be spoken to.

---

## 6. Journey Design Principles

These are the rules every journey is checked against before it ships:

1. **One next move.** Every surface ends in a single clear action, never a wall of equal-weight choices.
2. **Capture must be free.** Getting a thought out of your head costs one input and zero decisions. Triage happens later, when the user chooses.
3. **Structure without shame.** Unfinished work needs an explicit outcome, repeated slippage gets noticed — but the language never punishes. No red badges, no overdue guilt, no streak-breaking dramatics.
4. **Consent before mutation.** AI proposes; the user disposes. Anything that changes state shows a confirmation, a result, and an undo.
5. **Honesty over smoothness.** If an action failed, the user sees a clear failure message — never a cheerful claim of success backed by nothing. This is enforced at the contract level, not by convention.
6. **The loop must close visibly.** Every creation journey ends with the user *seeing* the created thing — a reveal that navigates to it, not a toast that evaporates.
7. **Carry context across days.** Tomorrow starts where today actually ended, not from a blank page.
8. **Every automation has an off-switch.** Autonomy is a setting, not a default the user must fight.

---

## 7. Design System & Accessibility

The visual system is built to *reduce* sensory load, not decorate:

- **Biophilic, calm-first palette** — the default theme uses forest greens, sage, sand, and cream. **No red anywhere in the interface.** Warnings are warm amber; gentle alerts are muted rose. Missed items render in quiet grey, never alarm colors.
- **Three full themes** — Nature (warm, default), Minimal (clean monochrome), Modern (card-based) — switchable live via CSS custom properties.
- **Calm motion only** — spring-based transitions tuned to feel settled, no flashing, no aggressive bounces, and full `prefers-reduced-motion` support that disables all animation.
- **WCAG AA throughout** — 8.2:1 primary text contrast, complete keyboard navigation, ARIA landmarks, 44px+ touch targets, layouts verified at 200% text zoom.
- **Mobile-native gestures** — swipe right to complete, left to skip, pull down to capture; with tap and long-press alternatives for every gesture.
- **Typography for focus** — a single typeface (Inter) at a deliberate scale: one display size, restrained heading hierarchy, generous line height for body text.

---

## 8. How Journeys Are Engineered

A note on process, because it shapes the product: every user journey in DecisionEase is specified and verified as a **three-layer contract**:

1. **UI promise** — the button's label and context accurately describe what's about to happen.
2. **Durable effect** — clicking it produces the real mutation (database row, schedule change, goal update).
3. **Downstream UI** — every surface that depends on that change reflects it immediately, and both success *and failure* are visible to the user.

A feature is not "done" when its tests pass. It is done when a real user — who doesn't know the API, can't see IDs, and never reads logs — can complete the entire loop from the visible UI in a browser. Every journey is mapped in a journey table (action → promise → effect → downstream UI), test-gated at the layer that owns each claim, and finally driven end-to-end in a live browser before merge.

Two test layers split the contract: an **acceptance layer** drives real HTTP routes against a real database and asserts the backend told the truth (no fabricated success, durable rows actually changed), while a **browser E2E layer** asserts the user-visible half (the text rendered, the control was clickable, navigation landed). Neither layer is allowed to re-assert the other's claims — a deliberate division that catches the classic failure mode where the backend is correct but the user-facing promise is broken.

---

*DecisionEase: get things out of your head, decide what matters, and follow through — more gently and clearly.*
