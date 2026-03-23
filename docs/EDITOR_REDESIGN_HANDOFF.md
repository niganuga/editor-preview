# PrintReady Flow — Editor Redesign Handoff

**Version:** 2.0 — Corrected
**Date:** 2026-03-23
**Status:** Implementation-ready

---

## What is PrintReady Flow?

PrintReady Flow is a web app at `editor.printreadyflow.com` that helps people who design in Canva, Kittl, Midjourney, or similar tools get their artwork physically print-ready. Users upload a design file, the app runs AI-powered analysis (resolution, transparency, background, format, sharpness), explains problems in plain language via an AI chat agent called "Print Ready," and offers a one-click "Fix All" to resolve everything. Think of it as the missing step between "I made a design" and "this will print correctly on a t-shirt."

**Codebase:** `/Users/makko/Code/OneFlow/flow-editor/`
**Stack:** Next.js 16 (App Router), React 19, Tailwind 4, Supabase, TypeScript, Zustand
**Prototype:** `/Users/makko/Code/OneFlow/editor-preview/` — static Next.js preview, no backend
**Prototype live:** `niganuga.github.io/editor-preview/editor`

---

## What is the editor page?

The editor is the core product screen. After uploading a design file, users see: their image on a canvas, an AI chat that talks them through issues, a print readiness report with pass/fail checks, and tools for fixing problems.

**Route:** `/editor`
**File:** `flow-editor/app/editor/page.tsx` (253 lines)
**This file is an orchestrator.** It renders 17+ components, coordinates multiple Zustand stores, handles keyboard shortcuts, manages CSS layout variables, processes Stripe checkout redirects, and wraps tool panels in error boundaries. This is not a simple page — it's the product's nervous system.

---

## Goal

Replace the visual presentation and layout of the editor page. Same features, same stores, same API layer — new layout and styling. The user experience shifts from "multiple floating windows you arrange yourself" to "everything has a clear home, chat is front and center, dark chrome floats over a warm canvas."

**This is NOT a visual-only reskin.** The redesign relocates UI controls, changes the component hierarchy, and restructures how panels are accessed. Every feature currently on the editor page must be explicitly accounted for — carried forward, relocated, or consciously deferred.

---

## Scope decisions (locked)

| Feature | Decision | Notes |
|---|---|---|
| Tool panels (BG Remover, Upscaler, etc.) | **Keep existing panel UI as-is** | Only the trigger point changes (chat bar icons instead of sidebar). Panel components stay unchanged. |
| Undo/Redo | **Move to canvas controls bar** | Centered pill below header, alongside zoom and theme toggle |
| Export | **Keep in header** | Single export button, triggers existing `ExportDialog` |
| POD Export | **Remove from v2** | Deferred — can be re-added to right panel Export tab later |
| Theme toggle | **Move to canvas controls bar** | Canvas-level view preference, not header-level |
| Gang Sheet | **Defer** | Not in v2 scope. Remove toggle from header. |
| Print Intelligence | **Move to right panel** | Becomes a tab in the right panel alongside Print Readiness, Export, History |
| Onboarding | **Update target IDs** | Must preserve or remap `onboarding-upload-area`, `onboarding-report-panel`, `onboarding-toolbar`, `onboarding-export-button` |
| Upgrade flows | **Carry forward unchanged** | `UpgradeModal` and `GlobalApiInterceptor` render as-is |
| Error boundaries | **Carry forward unchanged** | `PanelErrorBoundary` wraps all tool panels |
| Keyboard shortcuts | **Carry forward unchanged** | `useKeyboardShortcuts` hook stays wired to undo/redo/save/zoom/space-pan |

---

## What exists today — complete component inventory

Every component currently rendered by `flow-editor/app/editor/page.tsx`:

| Component | File | What it does | v2 fate |
|---|---|---|---|
| `TopBar` | `components/top-bar.tsx` (212 lines) | Logo, undo/redo, export, POD export, print readiness check, print intelligence toggle, gang sheet toggle, theme toggle, auth (desktop), overflow menu (mobile) | **Replaced** — split into Header + Canvas Controls |
| `BackgroundCanvas` | `components/background-canvas.tsx` | Upload zone, image display, zoom controls, canvas background, drag-and-drop | **Restyled** — becomes ImageCanvas with dot-pattern bg |
| `PrintReadinessReport` | `components/print-readiness-report.tsx` (1178 lines) | Full analysis lifecycle: print context selectors (method/fabric/color), 8 checks with per-check fix actions, Fix All confirm/outcome, upgrade prompts, progress tracking, transparency map | **Mounted inside right panel** — component stays as-is, wrapped in new dark chrome container |
| `ChatMessageArea` | `components/chat/chat-message-area.tsx` (333 lines) | Renders: MarkdownMessage, ConfidenceBadge, ToolExecutionCard, ImageResultDisplay, AIClarificationMessage, workflow approvals, timestamps, clear-history | **Mounted inside chat history panel** — component stays as-is, wrapped in new dark chrome container |
| `ChatInputBar` | `components/chat/chat-input-bar.tsx` | Message input, attached images, send button | **Restyled** — becomes part of ChatBar with integrated tools row |
| `ProToolbar` | `components/pro-toolbar.tsx` | Vertical icon strip, 6 tool buttons, credit counter | **Removed** — tools move to chat bar bottom row |
| `MobileBottomSheet` | `components/mobile-bottom-sheet.tsx` | Bottom sheet with Chat/Report/Tools tabs for mobile. Uses `--chat-bar-height` CSS variable. | **Keep unchanged** — mobile layout not in v2 scope |
| `FileValidatorPanel` | `components/panels/file-validator-panel.tsx` | File validation tool UI | **Keep as-is** — opens as overlay when triggered from chat bar |
| `BgRemoverPanel` | `components/panels/bg-remover-panel.tsx` | Background removal tool UI | **Keep as-is** |
| `UpscalerPanel` | `components/panels/upscaler-panel.tsx` | Upscaling tool UI | **Keep as-is** |
| `ColorKnockoutPanel` | `components/panels/color-knockout-panel.tsx` | Color knockout tool UI | **Keep as-is** |
| `RecolorPanel` | `components/panels/recolor-panel.tsx` | Color recolor tool UI | **Keep as-is** |
| `TextureCutPanel` | `components/panels/texture-cut-panel.tsx` | Texture/cut tool UI | **Keep as-is** |
| `PrintIntelligencePanel` | `components/panels/print-intelligence-panel.tsx` (468 lines) | Print method recommendations, manual overrides, substrate database | **Move trigger to right panel** — panel component stays as-is |
| `GangSheetPanel` | `components/panels/gang-sheet-panel.tsx` | Gang sheet layout builder | **Deferred** — remove from v2 |
| `UpgradeModal` | `components/upgrade-modal.tsx` | Global paywall modal | **Keep unchanged** — renders from upgrade-store |
| `GlobalApiInterceptor` | `components/global-api-interceptor.tsx` | 403 UPGRADE_REQUIRED safety net | **Keep unchanged** |
| `OnboardingOverlay` | `components/onboarding/onboarding-overlay.tsx` | Tour overlay with hard-coded element IDs | **Update target IDs** to match new DOM structure |
| `ImagePreviewModal` | `components/image-preview-modal.tsx` | Full-screen preview with Apply button | **Keep unchanged** |
| `PanelErrorBoundary` | Inline in `app/editor/page.tsx` (lines 35-55) | Error recovery wrapper for tool panels | **Keep unchanged** — extract to shared component |

---

## Key stores and services (DO NOT MODIFY)

| Store/Service | File | What it manages |
|---|---|---|
| Image store | `lib/image-store.ts` | Current image URL, dimensions, metadata, undo/redo history |
| Chat store | `lib/chat-store.ts` | Messages, attachedImages, previewImage, latestPreviewResult |
| Print readiness store | `lib/print-readiness-store.ts` | Check results, scores, print context (method/fabric/color), fix status |
| Tool panel store | `lib/tool-panel-store.ts` | Active tool, panel open/close |
| Canvas store | `lib/canvas-store.ts` | Zoom level, pan state, isSpacePanning |
| Print intelligence store | `lib/print-intelligence-store.ts` | Print context from AI, isOpen, manual overrides |
| Session usage store | `lib/session-usage-store.ts` | Free tier tracking (Fix All runs remaining) |
| Fix actions | `lib/fix-actions.ts` | `buildFixAllPlan()`, `executeFixAll()`, `executeFixAction()` |
| Print readiness service | `lib/print-readiness-service.ts` | Runs the analysis checks |
| Image analyzer | `lib/image-analyzer.ts` | Reads image metadata (DPI, dimensions, format, transparency) |
| Chat actions hook | `hooks/use-chat-actions.ts` | `handleSendMessage()` — sends messages with context |
| Keyboard shortcuts hook | `hooks/use-keyboard-shortcuts.ts` | Binds Cmd+Z, Cmd+Shift+Z, Cmd+S, Cmd+/-, Space |
| Analytics | `lib/analytics.ts` | `trackReportGenerated()`, `trackFixExecuted()`, `trackUpgradeCompleted()` |

---

## New layout — floating dark chrome over warm canvas

All floating UI uses `position: fixed`. The canvas background is the only light element. Dark glassmorphic panels create clear foreground/background separation.

### Position map

| Element | Position | z-index | Width |
|---|---|---|---|
| Canvas background | `fixed inset-0` | 0 | 100vw |
| Image card | `fixed inset-0` centered | 5 | Content-sized |
| Chat history | `fixed left-4 top-20 bottom-28` | 20 | `w-[340px]` — **collapses to hidden below 1280px** |
| Right panel | `fixed right-4 top-20 bottom-4` | 30 | `w-12` collapsed, `w-[380px]` expanded |
| Canvas controls | `fixed top-20 left-1/2 -translate-x-1/2` | 30 | Content-sized |
| Chat bar | `fixed bottom-4 left-1/2 -translate-x-1/2` | 40 | `w-[640px] max-w-[calc(100vw-2rem)]` |
| Tool panels (existing) | Existing position behavior | 45 | Existing |
| Header | `fixed top-4 left-1/2 -translate-x-1/2` | 50 | Content-sized, `min-w-[280px]` |
| Modals (upgrade, image preview) | Existing | 60 | Existing |
| Onboarding overlay | Existing | 70 | Existing |

### Responsive strategy

| Viewport | Behavior |
|---|---|
| >= 1440px | Full layout: chat history visible, right panel expanded, centered chat bar |
| 1280-1439px | Chat history hidden by default (toggle button in header), chat bar narrows to `w-[560px]`, right panel collapsed to icon strip |
| 768-1279px | Chat history hidden, right panel icon strip only, chat bar full-width with margins, canvas controls pill |
| < 768px | **Existing mobile layout unchanged** — `MobileBottomSheet` with tabs, `mobile-tab-bar`, bottom sheets for chat/report/tools. Desktop chrome hidden via `hidden md:block`. |

**Critical:** The `MobileBottomSheet` component reads `--chat-bar-height` CSS variable to coordinate spacing. The new `ChatBar` must set this variable identically: `document.documentElement.style.setProperty('--chat-bar-height', '<height>px')`.

**Critical:** The `MobileReportSheet` directly mounts `<PrintReadinessReport />`. The report component must remain importable and functional without the right panel wrapper. Do not couple report logic to the new panel chrome.

---

## Design tokens — dark chrome

Add these as **namespaced CSS custom properties** in `globals.css` under a new block. Do NOT overwrite existing `:root` tokens — they're used by landing pages, settings, and auth.

```css
/* Editor v2 dark chrome — scoped to .editor-v2 parent */
.editor-v2 {
  --chrome-bg: rgba(30, 30, 28, 0.95);
  --chrome-bg-solid: #1E1E1C;
  --chrome-border: #3A3935;
  --chrome-blur: 16px;
  --chrome-shadow: 0 4px 16px rgba(0,0,0,0.3), 3px 3px 0px 0px #1A1A1A;
  --chrome-shadow-lg: 0 8px 32px rgba(0,0,0,0.4), 4px 4px 0px 0px #1A1A1A;
  --chrome-text: #EDE9E0;
  --chrome-text-muted: #9B9589;
  --chrome-text-placeholder: #6B6660;
  --chrome-input-bg: rgba(20, 20, 19, 0.6);
  --chrome-hover-bg: #3A3935;
  --chrome-icon-inactive: #9B9589;
  --chrome-icon-active-bg: #E8863A;
  --chrome-icon-active-text: #1A1A1A;
  --chrome-accent: #E8863A;
  --chrome-status-pass: #4CAF6A;
  --chrome-status-fail: #D64045;
  --chrome-status-warn: #D4943D;
  --chrome-status-info: #3B8DB0;
}
```

The editor v2 page wraps everything in `<div className="editor-v2 canvas-bg h-screen overflow-hidden">` to scope these tokens.

---

## Component specs

### 1. Header

**Replaces:** Top portion of `components/top-bar.tsx`
**File to create:** `components/editor-v2/header.tsx`

**Position:** `fixed top-4 left-1/2 -translate-x-1/2 z-50`
**Style:** `bg-[var(--chrome-bg)] backdrop-blur-[var(--chrome-blur)] border border-[var(--chrome-border)] rounded-2xl shadow-[var(--chrome-shadow)]`
**Size:** `h-11 min-w-[280px] px-5`

**Contents (left to right):**
- Logo — `<Link href="/">` wrapping the existing logo image from `public/prflow-logo-white.svg` (or invert the black one). Height `h-6`.
- Vertical separator — `w-px h-4 bg-[var(--chrome-border)]`
- Usage display — reads from `useSessionUsageStore()`. Display as "X runs left" (never say "credits"). `text-xs font-medium text-[var(--chrome-text-muted)]`
- Export button — **only visible when `imageUrl` exists**. `text-xs font-semibold text-[var(--chrome-text)]` with Download icon. `onClick` opens `ExportDialog`. Give it `id="onboarding-export-button"` for onboarding targeting.
- Vertical separator
- Auth — render `<AuthButton />` from `components/auth/auth-button.tsx` as-is. It handles logged-in (UserMenu) and logged-out (Sign In button) states internally.
- Chat history toggle — **visible only below 1440px.** MessageSquare icon, toggles chat panel visibility via local state or a layout store.

**Wiring:**
- `useImageStore()` — read `imageUrl` to conditionally show export
- `useSessionUsageStore()` — read usage for display
- `ExportDialog` — import and render, controlled by local `useState`
- `AuthButton` — import directly, no changes needed

**Auth note:** `AuthButton` renders `<UserMenu />` when logged in (which returns null if no user, and owns its own dropdown trigger). It renders a Sign In button when logged out. It handles the full sign-in/sign-up/forgot-password dialog flow internally. Just render `<AuthButton />` — don't try to decompose it.

---

### 2. Canvas Controls

**Replaces:** Zoom controls from `BackgroundCanvas`, theme toggle from `TopBar`, undo/redo from `TopBar`
**File to create:** `components/editor-v2/canvas-controls.tsx`

**Position:** `fixed top-20 left-1/2 -translate-x-1/2 z-30`
**Style:** Same dark chrome pill. `rounded-2xl`.

**Contents (icon buttons in a row):**
- Undo — `Undo2` icon. Calls `useImageStore().undo()`. Disabled when `!canUndo()`. `opacity-40` when disabled.
- Redo — `Redo2` icon. Calls `useImageStore().redo()`. Disabled when `!canRedo()`.
- Separator — `w-px h-4 bg-[var(--chrome-border)]`
- Zoom In — calls `useCanvasStore().zoomIn()`
- Zoom Out — calls `useCanvasStore().zoomOut()`
- Separator
- Theme toggle — reads `useTheme()` from `next-themes`. Toggles `light`/`dark`. `Sun`/`Moon` icon.

**Button style:** `min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center` — meets 44px touch target. Icons `w-4 h-4`. Inactive: `text-[var(--chrome-icon-inactive)]`. Hover: `text-[var(--chrome-text)] bg-[var(--chrome-hover-bg)]`.

**Note:** `useKeyboardShortcuts` hook must still be initialized in the page component with the same bindings. Canvas controls are the visible affordance; keyboard shortcuts are the power-user path.

---

### 3. Chat History Panel

**Replaces:** `ChatMessageArea` as a floating draggable panel
**File to create:** `components/editor-v2/chat-history-panel.tsx`

**Position:** `fixed left-4 top-20 bottom-28 z-20 w-[340px]`
**Style:** Dark chrome. `overflow-hidden` with internal scroll.
**Visibility:** `hidden` below 1280px unless toggled from header.

**Structure:**
- Panel header — "Conversation" label, `text-xs font-bold tracking-widest uppercase text-[var(--chrome-text-muted)]`
- Scroll area — `flex-1 overflow-y-auto`
- Content — **Mount `<ChatMessageArea />` directly inside.** Do not rewrite message rendering.

**Why mount the existing component:** `ChatMessageArea` handles MarkdownMessage, ConfidenceBadge, ToolExecutionCard, ImageResultDisplay, AIClarificationMessage, workflow approvals, timestamps, and clear-history. Rewriting this would be a separate project. The dark chrome wrapper provides the container; the existing component provides the content.

**Styling bridge:** `ChatMessageArea` currently uses light-theme colors from CSS variables. For v2, override the relevant variables within the `.editor-v2` scope, or add a `dark-chat` class that the message components respond to. Test that markdown rendering, code blocks, image previews, and tool cards are readable against the dark background.

**Critical test:** Verify that `AIClarificationMessage` (workflow approval flow with multi-step confirmations) renders correctly in the dark container. This is the most complex chat state.

---

### 4. Chat Bar

**Replaces:** `ProToolbar` + `ChatInputBar`
**File to create:** `components/editor-v2/chat-bar.tsx`

**Position:** `fixed bottom-4 left-1/2 -translate-x-1/2 z-40`
**Width:** `w-[640px] max-w-[calc(100vw-2rem)]`
**Style:** Dark chrome with `shadow-[var(--chrome-shadow-lg)]` (larger shadow for primary surface).

**Structure — two rows:**

**Top row — message input:**
- Attachment button — Paperclip icon. **This attaches reference images to chat context**, not the main canvas upload. Calls the same logic as `chat-input-form.tsx` line 200: opens a file input, adds to `useChatStore().attachedImages`. Min `44px` touch target.
- Attached images indicator — if `attachedImages.length > 0`, show count badge
- Input field — inset dark background `bg-[var(--chrome-input-bg)] border border-[var(--chrome-border)] rounded-xl`. Placeholder: "Type your message here..." Wired to chat input state.
- Send button — `bg-[var(--chrome-accent)] text-[var(--chrome-icon-active-text)]` rounded-full. Calls `handleSendMessage()` from `useChatActions()` hook. Min `44px` touch target.

**Divider:** `border-t border-[var(--chrome-border)]`

**Bottom row — tools (always visible):**
- 6 tool icons evenly spaced (`flex-1` each):
  - `FileCheck` → "File Validator" → `toggleTool("validator")`
  - `Eraser` → "BG Remover" → `toggleTool("bg-remover")`
  - `ArrowUpCircle` → "Upscaler" → `toggleTool("upscaler")`
  - `Droplet` → "Color Knockout" → `toggleTool("color-knockout")`
  - `Palette` → "Recolor" → `toggleTool("recolor")`
  - `Layers` → "Texture+Cut" → `toggleTool("blend")`
- Each wrapped in `Tooltip`. Icon: `w-[18px] h-[18px]`. Button: `min-h-[44px]`.
- Give this row `id="onboarding-toolbar"` for onboarding targeting.
- Active tool: `bg-[var(--chrome-icon-active-bg)] text-[var(--chrome-icon-active-text)] rounded-xl`. Read from `useToolPanelStore().activeTool`.

**Paid tool handling:** BG Remover and Upscaler are paid tools. When a free user clicks them, `toggleTool()` is called which opens the panel — the panel itself handles the upgrade prompt internally via `useAuthContext().isPro`. No change needed in the chat bar.

**CSS variable:** On mount, set `document.documentElement.style.setProperty('--chat-bar-height', '<measured height>px')`. On unmount, reset to `0px`. The `MobileBottomSheet` depends on this.

---

### 5. Right Panel

**Replaces:** Report sidebar wrapper + Print Intelligence toggle
**File to create:** `components/editor-v2/right-panel.tsx`

**Position:** `fixed right-4 top-20 bottom-4 z-30`
**Style:** Dark chrome.

**Two states:**

**Collapsed (icon strip, w-12):**
- 4 icon buttons stacked vertically:
  - `CheckCircle` → "Print Readiness" — `id="onboarding-report-panel"` for onboarding
  - `Download` → "Export" — opens `ExportDialog` directly (no panel expansion needed)
  - `Cpu` → "Print Intelligence" — toggles `usePrintIntelligenceStore().toggleOpen()`
  - `History` → "History" — expands to show revision list
- Print Readiness icon shows red badge with fail count when not active. Read from `usePrintReadinessStore()`.
- Button style: `min-w-[44px] min-h-[44px]`.

**Expanded (icon strip + content area, total ~380px):**
- Click Print Readiness icon → panel expands, **mounts `<PrintReadinessReport />` directly inside**
- Click Print Intelligence icon → calls `toggleOpen()` which opens `PrintIntelligencePanel` as a separate floating panel (existing behavior)
- Click History icon → shows simple revision list from image store history
- X button to collapse

**Why mount PrintReadinessReport directly:** It's 1178 lines. It owns the complete analysis lifecycle: print context selectors (method, fabric type, fabric color dropdowns), 8 checks with individual fix buttons that build chat messages, Fix All confirmation with step preview, Fix All outcome display (success/partial/failure), upgrade prompts for paid fixes, progress tracking, and transparency map visualization. Rewriting this would be a multi-week project. Mount it as-is and style the wrapper.

**Styling bridge for the report:** `PrintReadinessReport` uses light-theme CSS variables (bg-card, text-foreground, border-foreground, etc.). Options:
- **Option A (recommended):** Override CSS variables within the right panel container using a scoped class
- **Option B:** Add a `variant="dark"` prop to PrintReadinessReport (requires modifying the component)
- **Option C:** Use CSS `filter: invert()` as a quick hack (not recommended — breaks status colors)

Test thoroughly. The report renders complex states: loading spinners, progress bars, Fix All confirmation modals, per-check expand/collapse with fix action buttons, and transparency map image overlays.

**Print context controls:** The print method, fabric type, and fabric color selectors (lines 500-560 of `print-readiness-report.tsx`) render inside the report component. They stay where they are — the right panel just wraps the report.

**Mobile note:** `mobile-report-sheet.tsx` mounts `<PrintReadinessReport />` directly. The report component must remain importable standalone without requiring the right panel wrapper. Do not nest report logic inside the panel.

---

### 6. Image Canvas

**Replaces:** `BackgroundCanvas` + `Canvas`
**Approach:** Restyle `BackgroundCanvas`, do not rewrite.

`BackgroundCanvas` (`components/background-canvas.tsx`) handles:
- File upload dropzone with drag-and-drop
- Image display with zoom/pan
- Canvas background styling
- Zoom controls bar (bottom center on desktop)
- `id="onboarding-upload-area"` for onboarding

**Changes needed:**
- Apply `.canvas-bg` class (dot pattern) to the canvas background instead of existing styling
- Image card: wrap in off-white mat with `bg-[#F5F2EC]` padding, `border 2px solid #C4BFB4`, `rounded-2xl`
- Remove the built-in zoom controls bar — those actions move to Canvas Controls component
- Keep all upload, drag-and-drop, and image display logic unchanged

---

### 7. Page orchestrator

**File to create:** `app/editor-v2/page.tsx`

This is the new version of `app/editor/page.tsx`. It must carry forward everything the current page does:

```tsx
"use client"

// All existing imports from current page.tsx PLUS new v2 components
// See current page.tsx lines 1-33 for the full import list

export default function EditorV2Page() {
  // ===== All existing hooks from current page.tsx =====
  // useImageStore: undo, redo, canUndo, canRedo, imageUrl, imageName
  // useCanvasStore: zoomIn, zoomOut, setIsSpacePanning
  // useChatStore: previewImage, setPreviewImage, setLatestPreviewResult, messages
  // useToolPanelStore: activeTool, closePanel
  // usePrintIntelligenceStore: isOpen, setIsOpen, setPrintContext
  // useKeyboardShortcuts: binds Cmd+Z, Cmd+Shift+Z, Cmd+S, zoom, space-pan

  // ===== Existing effects that MUST be preserved =====
  // 1. Print context sync: lines 93-98 — syncs AI print context to intelligence store
  // 2. Report panel width CSS var: lines 102-114 — sets --report-panel-width
  // 3. Stripe checkout redirect: lines 117-127 — shows success toast, cleans URL

  return (
    <div className="editor-v2 canvas-bg h-screen overflow-hidden">
      {/* New v2 components */}
      <Header />
      <CanvasControls />
      <ChatHistoryPanel />
      <ImageCanvas />  {/* Restyled BackgroundCanvas */}
      <ChatBar />
      <RightPanel />

      {/* Existing components — carried forward unchanged */}
      <MobileBottomSheet />

      {/* Tool panels — existing, wrapped in PanelErrorBoundary */}
      {activeTool === "validator" && <PanelErrorBoundary onClose={closePanel}><FileValidatorPanel onClose={closePanel} zIndex={45} /></PanelErrorBoundary>}
      {activeTool === "bg-remover" && <PanelErrorBoundary onClose={closePanel}><BgRemoverPanel onClose={closePanel} zIndex={45} /></PanelErrorBoundary>}
      {activeTool === "upscaler" && <PanelErrorBoundary onClose={closePanel}><UpscalerPanel onClose={closePanel} zIndex={45} /></PanelErrorBoundary>}
      {activeTool === "color-knockout" && <PanelErrorBoundary onClose={closePanel}><ColorKnockoutPanel onClose={closePanel} zIndex={45} /></PanelErrorBoundary>}
      {activeTool === "recolor" && <PanelErrorBoundary onClose={closePanel}><RecolorPanel onClose={closePanel} zIndex={45} /></PanelErrorBoundary>}
      {activeTool === "blend" && <PanelErrorBoundary onClose={closePanel}><TextureCutPanel onClose={closePanel} zIndex={45} /></PanelErrorBoundary>}

      {/* Print Intelligence — existing panel, opened from right panel */}
      {printIntelIsOpen && <PanelErrorBoundary onClose={() => setPrintIntelOpen(false)}><PrintIntelligencePanel onClose={() => setPrintIntelOpen(false)} zIndex={44} /></PanelErrorBoundary>}

      {/* Global overlays — unchanged */}
      <UpgradeModal />
      <GlobalApiInterceptor />
      <OnboardingOverlay />

      {/* Image Preview Modal — unchanged */}
      {previewImage && <ImagePreviewModal ... />}
    </div>
  )
}
```

**Note:** Gang Sheet is intentionally excluded. `useGangSheetStore` import and `GangSheetPanel` rendering are removed from v2.

---

## Onboarding target IDs

The onboarding tour in `components/onboarding/onboarding-overlay.tsx` uses hard-coded element IDs. These must exist in the v2 DOM:

| Target ID | Current location | v2 location |
|---|---|---|
| `onboarding-upload-area` | `BackgroundCanvas` | Same — preserved in restyled canvas |
| `onboarding-report-panel` | Report sidebar wrapper | Right panel Print Readiness icon/container |
| `onboarding-toolbar` | `ProToolbar` | Chat bar tools row |
| `onboarding-export-button` | `TopBar` export button | Header export button |

---

## Execution order

1. **Namespace tokens** — Add `.editor-v2 { ... }` block to `globals.css`. Add `.canvas-bg` if not already present.
2. **Create `app/editor-v2/page.tsx`** — Copy current `app/editor/page.tsx`, replace TopBar/ProToolbar/BottomDock with new component imports. Keep everything else. This is the scaffold.
3. **Build Header** — Simplest new component. Wire auth, export, usage.
4. **Build Canvas Controls** — Undo/redo + zoom + theme. Wire to stores.
5. **Build Chat Bar** — Wire to chat actions hook, tool panel store, attached images. Set `--chat-bar-height`.
6. **Build Chat History Panel** — Dark chrome wrapper around existing `ChatMessageArea`. Test all message types render correctly against dark background.
7. **Build Right Panel** — Dark chrome wrapper with icon tabs. Mount existing `PrintReadinessReport` inside. Test full analysis lifecycle.
8. **Restyle BackgroundCanvas** — Apply dot pattern, image card mat styling. Remove built-in zoom controls.
9. **Extract PanelErrorBoundary** — Move from inline in page.tsx to `components/editor-v2/panel-error-boundary.tsx`.
10. **Update onboarding IDs** — Verify all 4 target IDs exist in new DOM.
11. **Test end-to-end** — Upload file → analysis runs → chat populates → checks display → Fix All triggers → tool panels open → export works → mobile bottom sheet still works → onboarding tour completes → upgrade flow triggers correctly.
12. **Responsive testing** — Verify at 1280, 1366, 1440, 1920. Verify mobile unchanged.
13. **Swap routes** — Move `editor-v2` to `editor`. Keep old page as `editor-legacy` temporarily.
14. **Clean up** — Remove `pro-toolbar.tsx`, `bottom-dock.tsx` if no longer imported anywhere. Remove `editor-legacy` after validation period.

---

## Known risks

| Risk | Mitigation |
|---|---|
| PrintReadinessReport (1178 lines) may not style correctly in dark container | Test every state: loading, checks, Fix All confirm, Fix All outcome, upgrade prompt, transparency map. Use CSS variable overrides, not component rewrites. |
| ChatMessageArea rich states (markdown, tool cards, clarification flows) may break on dark bg | Test MarkdownMessage code blocks, ImageResultDisplay, ToolExecutionCard, AIClarificationMessage individually against dark background. |
| Tool panels open as brutalist light-theme overlays on top of dark chrome | Accepted for v2 — these are existing panels kept as-is. Visual mismatch exists but tool panels are transient (open → use → close). Restyling them is a future pass. |
| Mobile layout breaks if CSS variables change | `--chat-bar-height` must be set. `--report-panel-width` must be set. `MobileBottomSheet` and `MobileReportSheet` must not be affected by `.editor-v2` scoped styles. |
| Onboarding tour fails silently if target IDs are missing | Verify all 4 IDs exist before shipping. The tour doesn't crash — it just skips steps — but users miss the onboarding. |

---

## Files the developer needs

| Resource | Location |
|---|---|
| Prototype source | `github.com/niganuga/editor-preview` → `components/preview/` |
| Prototype live | `niganuga.github.io/editor-preview/editor` |
| Current editor page | `flow-editor/app/editor/page.tsx` |
| Current top bar | `flow-editor/components/top-bar.tsx` |
| Current report | `flow-editor/components/print-readiness-report.tsx` |
| Current chat | `flow-editor/components/chat/chat-message-area.tsx` |
| Current chat input | `flow-editor/components/chat/chat-input-bar.tsx` |
| Current canvas | `flow-editor/components/background-canvas.tsx` |
| Current toolbar | `flow-editor/components/pro-toolbar.tsx` |
| Current mobile sheet | `flow-editor/components/mobile-bottom-sheet.tsx` |
| Brand bible | `flow-editor/docs/brand/PRINTREADY_FLOW_BRAND_BIBLE.md` |
| Design tokens (TS) | `flow-editor/lib/design-tokens.ts` |
| Drift report | `flow-editor/docs/drift-report.md` |

---

*This document supersedes the previous handoff (v1.0). Every component, feature, route, and API reference has been verified against the actual codebase as of 2026-03-23.*
