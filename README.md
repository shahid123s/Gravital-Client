# Gravital Frontend

Frontend client for Gravital, a social media system with authentication, feed browsing, post interactions, messaging, profile management, and admin moderation screens.

This repository is used as the frontend submodule inside the `Gravital-system` monorepo.

## Overview

The frontend is the interaction layer for the Gravital backend. It handles user onboarding, authenticated API calls, feed rendering, post actions, messaging, settings, and admin workflows.

The implementation focuses on:

- Routing user and admin flows clearly.
- Keeping auth state in Redux.
- Centralizing API access through Axios instances.
- Retrying expired access-token requests through refresh-token flow.
- Loading feed data incrementally instead of rendering everything at once.
- Sharing realtime socket access through context providers.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | React 18 |
| Build Tool | Vite |
| Routing | React Router DOM |
| State Management | Redux Toolkit |
| API Client | Axios |
| Realtime | Socket.IO Client |
| Styling | Tailwind CSS |
| Media UI | react-dropzone, react-easy-crop, react-image-crop |
| Feedback | Sonner / React Toast |
| UI Support | Lucide React, Heroicons, Framer Motion |
| Streaming Experiment | mediasoup-client |

## System Architecture

```text
Browser
  |
  v
React App
  |
  |-- App.jsx route tree
  |-- Redux auth slices
  |-- Axios user/admin clients
  |-- Request/response interceptors
  |-- Socket and chat context providers
  |-- Feature hooks and services
  v
Gravital Backend
```

## User Flow

```text
Register
  -> Send OTP
  -> Verify OTP
  -> Add personal information
  -> Login
  -> Home feed
  -> Create / like / comment / save / share posts
  -> Profile / messages / settings / archive / favourites
```

Main routes:

- `/login` for user login.
- `/register` and `/otp-verification` for onboarding.
- `/home` for feed and suggestions.
- `/profile` and `/:username` for current/public profiles.
- `/post/:postId` for shared post view.
- `/message` for chat.
- `/settings/*` for profile, privacy, and archive screens.
- `/admin/*` for admin dashboard, users, posts, and reports.

## Request Flow

```text
User action
  |
  v
Component / hook / service
  |
  v
Axios instance
  |
  |-- request interceptor attaches access token
  v
Backend API
  |
  |-- if access token is expired
  v
response interceptor dispatches refresh token action
  |
  |-- retry original request with new access token
  v
UI updates from response
```

This keeps token refresh behavior outside individual components.

## Core Features

- Login, registration, OTP verification, and password reset.
- Home feed with infinite scrolling.
- Post creation with media selection/cropping flow.
- Like, comment, save, share, archive, report, block, and restrict actions.
- User profile and public profile pages.
- Search and suggested users.
- One-to-one chat flow with Socket.IO integration.
- Admin screens for users, posts, and reports.
- Settings pages for profile and account privacy.

## API Integration

- `src/utilities/axios.js` creates separate user and admin clients.
- `src/app/store.js` attaches interceptors after Redux store creation.
- Access tokens are stored in Redux and sent as Bearer tokens.
- Refresh tokens are handled by the backend through HttpOnly cookies.
- User actions call backend APIs through services, hooks, context providers, and selected page components.

## Rendering Optimizations

- `React.lazy` and `Suspense` are used for selected route-level screens.
- `useInfiniteScroll` keeps feed loading paginated and append-only.
- Scroll-triggered loading is debounced to avoid duplicate requests.
- Server `hasMore` response controls whether more feed requests are made.
- Sidebar rendering is memoized.
- Reusable components isolate post cards, interactions, modals, tables, and admin UI.

## Design Decisions

- Redux Toolkit is limited to shared auth state instead of pushing all UI state globally.
- Axios interceptors centralize token handling and retry logic.
- User and admin clients are separated because the backend exposes separate route groups.
- Socket.IO is provided through context so realtime features can share one connection.
- Feed pagination is implemented as a hook because loading, page state, debounce, and `hasMore` are shared concerns.
- Vite keeps development startup and production builds simple.

## Scalability Considerations

- Infinite scroll avoids loading the full feed at once.
- Admin list screens are already separated into table and pagination components.
- Realtime events should remain scoped to users or rooms.
- Profile/feed/admin data can be moved to React Query caching for better repeated reads.
- Media upload should move to backend-issued pre-signed URLs so cloud credentials are not exposed in the client.

## Folder Structure

```text
frontend/
├── public/
├── src/
│   ├── app/              Redux store and auth slices
│   ├── assets/           Static assets
│   ├── Components/       Shared UI components
│   ├── contextApi/       Socket and chat providers
│   ├── hooks/            Fetching and interaction hooks
│   ├── Pages/            Route-level user/admin pages
│   ├── services/         API services
│   ├── utilities/        Axios, AWS, validation, helpers
│   ├── App.jsx           Route tree
│   └── main.jsx          React entry point
├── package.json
└── vite.config.js
```

## Setup / Getting Started

```bash
cd Gravital-system/frontend
npm install
cp .env.example .env
npm run dev
```

Local development URL:

```text
http://localhost:3000
```

Build commands:

```bash
npm run build
npm run preview
```

Required environment variables:

```text
VITE_USER_BASE_URL=http://localhost:8000/api
VITE_ADMIN_BASE_URL=http://localhost:8000/admin/api
VITE_SOCKET_URL=http://localhost:8000
```

## Future Improvements

- Move remaining page-level API calls into dedicated service files.
- Add route guards consistently for user and admin pages.
- Add React Query caching for feed, profile, and admin list data.
- Add optimistic UI updates for likes, saves, follows, and comments.
- Replace client-side AWS credentials with backend-issued pre-signed upload URLs.
- Add component and integration tests for auth, feed, interactions, and admin workflows.
