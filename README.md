# All Around

All Around is a polished frontend prototype for a future unified super-app experience. The current release focuses on delivering a high-fidelity product demo for stakeholder review, design validation, and technical presentation.

## Overview

This application presents a premium, responsive experience that combines mock flows for:
- messaging and social interactions
- food and grocery ordering
- rides and mobility
- payments and wallet experiences
- profile, settings, and service discovery

The solution is intentionally frontend-focused and uses local mock data to provide a realistic and visually refined experience without backend dependencies.

## Objectives

- Showcase a concept product experience with strong visual polish
- Validate information architecture and navigation patterns
- Provide a demo-friendly environment for presentations and reviews
- Support local development, testing, and containerized delivery

## Technology Stack

- React 19
- TypeScript
- Vite
- React Router
- Lucide icons
- Vitest + Testing Library
- Docker

## Project Structure

- src/components: reusable UI elements and app shell layout
- src/contexts: shared state and mock-data provider
- src/data: local JSON datasets for demo content
- src/pages: route-based demo screens and experiences
- src/types: shared TypeScript models
- src/test: shared test setup

## Prerequisites

Ensure the following tools are installed:
- Node.js 20+
- npm
- Docker (optional, for containerized runs)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The application will be available in your browser at the local Vite URL shown in the terminal.

## Build, Test, and Quality Checks

### Production build

```bash
npm run build
```

### Unit tests

```bash
npm test
```

### Coverage report

```bash
npm run coverage
```

## Containerization

A Docker image is available for running the application in a containerized environment.

### Build the image

```bash
docker build -t all-around-demo .
```

### Run the container

```bash
docker run -p 5173:80 all-around-demo
```

Then open:

```text
http://localhost:5173
```

### Push to Docker Hub

```bash
docker tag all-around-demo <your-dockerhub-username>/all-around-demo:latest
docker push <your-dockerhub-username>/all-around-demo:latest
```

### Run from Docker Hub

```bash
docker run -p 5173:80 <your-dockerhub-username>/all-around-demo:latest
```

## Deployment Notes

This repository is currently designed for frontend-only demo deployment. It does not include authentication, real payment processing, backend APIs, or production-grade security controls.

## Security and Data Handling

The application uses mock data only. No real user credentials, financial information, or personal data are collected or processed in the current implementation.

## Future Roadmap

- Expand into richer AI assistant interactions
- Introduce more realistic service flows and state persistence
- Prepare the experience for future backend integration
- Add CI/CD pipelines and automated deployment workflows

## Contribution Guidance

Contributions should remain focused on clarity, usability, and demo readiness. Keep changes maintainable, accessible, and easy to explain during reviews or stakeholder presentations.
