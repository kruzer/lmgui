# LTEMonitor Angular Gui

This is a gui part of LTEMonitor: https://github.com/kruzer/LTEMonitor

## Requirements

Node.js `^22.22.3 || ^24.15.0 || >=26` (required by Angular 22).

## Usage

Run `npm start` (or `ng serve`) for a dev server. Navigate to `http://localhost:4200/`. The app will
automatically reload if you change any of the source files.

The dev build talks to the backend at `http://localhost:8080` (`src/environments/environment.ts`);
production builds use same-origin requests.

## Build

Run `npm run build`. The build artifacts will be stored in the `dist/` directory. `ng build` produces
a production build by default; use `--configuration development` for an unoptimised one.

## Test and lint

- `npm test` — unit tests (Vitest, run via `ng test`)
- `npm run lint` — ESLint

## Notes on the Angular 22 upgrade

The app was migrated from Angular 7 to Angular 22, which resolved CVE-2026-69151 in
`@angular/compiler`/`@angular/core`. Things worth knowing if you come from the old code:

- **Standalone components.** `AppModule`/`AppRoutingModule` are gone; the app bootstraps from
  `src/main.ts` via `bootstrapApplication` with `src/app/app.config.ts` and `src/app/app.routes.ts`.
- **Zoneless change detection.** Angular 22 no longer refreshes a view just because a plain property
  changed, so state that is updated asynchronously (HTTP responses, polling) is held in signals.
  Templates read them as `myTraffic()`, `sig()['rssi']`, and so on. If you add new async state, use a
  signal — assigning to a plain field will not update the UI.
- **`ngx-bootstrap` was dropped.** It has no Angular 22 build. `tooltip` was imported but never used,
  the `typeahead` on the console URL field is now a native `<datalist>`, and `tabset` is a small set
  of Bootstrap `nav-tabs` buttons driven by the `activeTab` signal.
- **Reactive form state** in `configr` is exposed through `computed()` wrappers (see `track()`), which
  is what keeps the validation classes in sync without zone.js.
- Bootstrap stays on 4.6.2 — the templates use Bootstrap 4 class names throughout, so moving to
  Bootstrap 5 would be a separate visual migration.
