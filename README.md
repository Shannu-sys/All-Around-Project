# All Around

## Vision
All Around is a polished frontend prototype for a future unified super-app experience. The current version focuses on social messaging and a selection of mock service experiences to help teams validate the product concept.

## Current Scope
- Modern responsive web and mobile demo shell
- Interactive chat experience with local mock messages
- Contacts, profile, settings, and notifications
- Food, grocery, rides, payments, and wallet mock modules
- Global search mock experience and a future AI placeholder entry

## Demo Features
- Local mock data and frontend-only interactions
- Theme switching with local storage persistence
- Responsive layout for desktop, tablet, and mobile
- Empty states, loading skeletons, and polished interactions

## Technology Stack
- React
- TypeScript
- Vite
- React Router
- Lucide icons

## Project Structure
- src/components for reusable UI and layout
- src/contexts for app-level state
- src/data for local mock datasets
- src/pages for route-based experience screens
- src/types for shared TypeScript models

## Running Locally
```bash
npm install
npm run dev
```

## Demo Limitations
This is a frontend-only demonstration. It does not include real authentication, payments, UPI, backend services, real maps, or external APIs.

## Future Roadmap
- Add richer AI assistant flows
- Expand service modules into more realistic mocks
- Introduce persistence for carts and conversations
- Prepare the frontend architecture for future backend integration

## Future Architecture
React -> Mock Data / Local State -> Future API Gateway -> Backend Services

## Security Considerations
No real credentials, financial information, or personal data are collected. The prototype intentionally avoids production-grade security requirements.

## Contribution Guidelines
This repository is intended for rapid prototyping and demo presentation. Keep changes focused, accessible, and easy to explain in a design review.
