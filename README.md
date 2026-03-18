# Advanced Countdown App - Loofers React Native Test Case

Session 1: 06:52 to 08:46, architecture and initial implementation.  
Session 2: 11:13 to 13:05, cross-platform picker and state flow.  
Session 3: 14:52 to 15:54, tests, bug fixes, polish.  
Session 4: 20:30 to 21:45, final hardening, requirement validation, and delivery prep.

---

## Initial Thoughts

The feature scope is intentionally modest. A date picker, a simulated API call, a list of countdowns, and a persistent global banner. The real exercise is architecture: how the code is structured, how state flows, how business logic is isolated, and whether the result is something a team can maintain and extend.

My first instinct was to just build it. Instead I spent the first 15 minutes mapping out how state needs to flow across the two tabs and the global view before writing a single line of code. That decision shaped everything.

The key architectural observation: the global countdown banner must live _outside_ the navigator, which means countdown state cannot be local to any screen. It needs to be global from the start. That immediately rules out `useState` + prop drilling, and points clearly toward a lightweight global store.

---

## Architecture Decisions

### Folder Structure - Feature-based

```
src/
  features/
    configuration/        # Tab 1 - date picker + start button
      components/
      hooks/
    countdowns/           # Tab 2 - active countdown list
      components/
      hooks/
  shared/
    components/           # GlobalCountdownBanner, etc.
    hooks/                # useCountdownTick, etc.
    utils/                # time calculations, formatters
  services/
    countdownService.ts   # simulated API, swappable for real one
  store/
    countdownStore.ts     # global state
  navigation/
    RootNavigator.tsx
```

Feature-based structure rather than type-based (`/components`, `/hooks`, `/screens` at root level). The distinction matters at scale: when a feature grows or is removed, everything related to it lives in one place. A new developer can navigate by intent rather than by file type.

### State Management - Zustand

Zustand over Redux. The reasons are practical:

- No boilerplate. Actions, state, and selectors in one file.
- Trivially testable, the store is just a function.
- No provider wrapping required, which matters for the global banner pattern.
- The resulting code reads clearly, which matters for a small team doing code reviews.

Zustand scales further than its reputation suggests. Devtools are available via middleware, stores can be split by domain as the app grows, and the lack of boilerplate means less surface area to maintain as the team expands. Redux adds complexity that has to be justified by concrete requirements. None exist here yet.

### Navigation - Expo Router

File-based routing that maps directly to the mental model of screens and tabs. It also means the navigation structure is visible in the file system, which is useful when presenting the codebase. The global banner is rendered in the root `_layout.tsx`, outside the tab navigator, so it persists regardless of which tab or subpage is active.

### Simulated API - Service Layer

The API simulation is behind a proper service interface:

```ts
// services/countdownService.ts
export const requestCountdown = async (date: Date): Promise<CountdownEntry> => {
	await simulateNetworkDelay(800);
	return {
		id: crypto.randomUUID(),
		expiresAt: addMinutes(date, 2),
		createdAt: new Date(),
	};
};
```

Replacing this with a real API call requires changing one file and zero components. This is the boundary between UI and network concerns, and keeping it explicit is what makes the app testable and maintainable.

### Date Handling - date-fns

`date-fns` over `dayjs` or `moment`. It is tree-shakeable, purely functional (no mutation), and the function signatures are explicit and easy to test. Relevant functions used: `addMinutes`, `differenceInSeconds`, and formatted output helpers for consistent countdown labels.

### Countdown Tick - Shared Hook

A single `useCountdownTick` hook owns the `setInterval`, but the interval orchestration itself lives in a tiny pure module. That makes the timing behavior testable without mounting UI while still keeping one app-level tick for the running application.

The shared tick updates a single `now` value in the store and removes expired entries in the same pass. Rows and the global banner render against that shared store time instead of creating their own intervals, so everything stays in sync.

### Cross-platform Date Input

The original implementation used Expo's SwiftUI date picker, which is iOS-oriented. The app now uses `@react-native-community/datetimepicker` behind a small `DateTimeField` wrapper so both iOS and Android can use the same configuration flow while keeping the screen component focused on business behavior.

---

## Testing Strategy

The business logic is isolated enough to test directly with Jest. The time helpers, service layer, Zustand store, and shared ticker module are all covered without needing end-to-end UI tests.

**Units tested:**

| Module             | What is tested                                                                   |
| ------------------ | -------------------------------------------------------------------------------- |
| `countdownService` | Returns correct `expiresAt` (+2 min), resolves after delay                       |
| `countdownStore`   | Add entry, remove entry, expired entry auto-removal, closest-expiring selector   |
| `utils/time`       | `getSecondsRemaining`, `formatCountdown`, edge cases at zero and negative values |
| `countdownTicker`  | Immediate tick, repeated tick every second, cleanup clears the interval          |

Tests are colocated with source files (`*.test.ts` alongside the module) rather than in a separate `/tests` directory. This keeps the feedback loop tight during development.

---

## What I Would Do Differently With More Time

- **Persistence.** Countdowns are lost on app restart. `AsyncStorage` or `expo-sqlite` would fix this with minimal changes to the store.
- **Haptics and sound on expiry.** Relevant for a gaming context, `expo-haptics` and `expo-av` are straightforward additions.
- **Animations.** Row removal in the countdown list would benefit from a fade/slide exit using `Reanimated`. Currently it just disappears.
- **Failure simulation.** The configuration flow now has loading and error state handling, but the service still always resolves. A fuller version would support deterministic failure testing and retry UX.
- **Accessibility.** `accessibilityLabel` and live region announcements for the countdown banner are missing.

---

## Running the Project

```bash
npm install
npx expo start
```

```bash
npm test
```

The project is configured for iOS and Android, and the date picker is now cross-platform. Verification completed in this repository consists of unit tests and static checks; native simulator verification is still pending.
