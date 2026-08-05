# LOOP

LOOP is a productivity workspace for planning tasks, protecting focus time, tracking goals, and using AI assistance to understand your work.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The main workspace is available at `/dashboard`.

## Application features

| Feature | Route | Main implementation |
| --- | --- | --- |
| Dashboard | `/dashboard` | `app/(app)/dashboard/page.tsx` |
| Tasks | `/tasks` | `components/FeaturePages.tsx` |
| Calendar | `/calendar` | `components/FeaturePages.tsx` |
| Focus Mode | `/focus` | `components/FeaturePages.tsx` |
| Goals | `/goals` | `components/FeaturePages.tsx` |
| Analytics | `/analytics` | `components/FeaturePages.tsx` |
| Notes | `/notes` | `components/FeaturePages.tsx` |
| AI Assistant | `/ask` | `components/AIAssistant.tsx` |
| Integrations | `/integrations` | `components/FeaturePages.tsx` |
| Settings | `/settings` | `app/(app)/settings/page.tsx` |

## Team implementation notes

- Shared layout and navigation are in `app/(app)/layout.tsx`.
- New feature page screens are intentionally grouped in `components/FeaturePages.tsx` so team members can replace mock data with API calls incrementally.
- The AI Assistant route uses `components/AIAssistant.tsx`. Its chat implementation lives in `components/AskLoopChat.tsx`; replace the mock `handleSend` response with the production AI endpoint when it is ready.
- Legacy Inbox, Reports, and Trends routes were removed because they are outside the current navigation design.

## Verification

```bash
npm run build
```
