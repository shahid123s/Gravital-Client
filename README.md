# Gravital Client

Gravital Client is the frontend application for the Gravital platform. Built with React and Vite, it delivers a high-performance, dynamic user interface for managing user experiences, posts, live streaming, real-time messaging, and administrative tasks.

## 🚀 Features

### User Interface
- **Authentication:** Login, Registration, OTP Verification, and Password Recovery.
- **Feeds & Posts:** View, create, and interact (like/comment) with posts. Includes image cropping and media uploads.
- **Real-Time Messaging:** Socket.io integrated chat platform for instant messaging between users.
- **Live Streaming & Video:** WebRTC (Mediasoup) powered live streaming and video sharing capabilities.
- **Profile Management:** Edit profile, manage personal information, view liked posts, favorites, and archived content.
- **Discover & Trending:** Explore trending content and connect with other users.

### Admin Dashboard
- **User Management:** View and manage registered users.
- **Content Moderation:** Review posts, handle user reports, and manage platform interactions.
- **Analytics & Reporting:** Track active users, posts, and overall platform metrics.

## 🛠 Tech Stack

- **Core:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM v6
- **State Management:**
  - Redux Toolkit (Global slices and UI state)
  - React Query `@tanstack/react-query` (Server state caching and fetching)
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Networking:** Axios (HTTP client), Socket.io-client (Real-time events), Mediasoup-client (WebRTC)
- **UI Components & Animations:** Framer Motion, Headless UI (via various extensions), Lucide React & Heroicons, Sonner/React Toast (Notifications)
- **Media Handling:** React Dropzone, React Easy Crop, React Image Crop
- **Cloud/Object Storage Integration:** AWS SDK (Client-side presigned uploads/direct uploads)

## 🏗 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v16+ recommended) and npm/yarn installed.

### Installation

1. Navigate to the client directory:
   ```bash
   cd Gravital-Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root of `Gravital-Client` based on the `.env.example` file provided:
```bash
cp .env.example .env
```

Populate `.env` with your actual backend URLs, socket URLs, and AWS configuration.

### Development Server

Run the local development server:
```bash
npm run dev
```
The application will be accessible at `http://localhost:3000`.

### Build for Production

To create a production-ready build:
```bash
npm run build
```
You can preview the built files using:
```bash
npm run preview
```

## 📂 Project Structure

```
src/
├── app/               # Redux store and global feature slices
├── assets/            # Static assets like images and SVG icons
├── Components/        # Reusable UI components (Admin, User, Modals, Buttons)
├── constants/         # Global constants
├── contextApi/        # React Context providers (e.g., SocketProvider)
├── enum/              # Enumeration definitions
├── hooks/             # Custom React hooks
├── Pages/             # Route-level page components (Admin, User)
├── Route/             # React Router definitions and route wrappers
├── services/          # API call services for admin and user features
├── utilities/         # Helper functions, Axios interceptors, AWS configuration
├── App.jsx            # Formulates routes and global layouts
└── main.jsx           # React app entry point
```

## 📝 Scripts
- `npm run dev` - Starts the development server using Vite.
- `npm run build` - Builds the app for production.
- `npm run lint` - Lints code with ESLint.
- `npm run preview` - Previews the production build locally.
