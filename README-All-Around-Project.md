# All Around — Unified Super-App Frontend

**All Around** is a responsive React + TypeScript frontend prototype for a unified super-app experience. It brings multiple everyday experiences into a single interface, including communication, food and grocery ordering, mobility, payments, wallet, bookings, services, profile, and settings.

The project is currently a **frontend-focused product prototype**. It uses local JSON mock data and client-side state to demonstrate realistic user flows without a backend, authentication system, real payment processing, or external service integrations.

## Project Highlights

- Unified application shell with responsive desktop and mobile navigation
- Messaging and chat flows
- Contacts, calls, and communities
- Food ordering experience
- Grocery shopping experience
- Ride/mobility experience
- Payments and wallet views
- Offers, bookings, and service discovery
- Profile and settings
- Global search across demo content
- Light/dark theme support with browser local storage
- Client-side state management using React Context
- Route-based navigation using React Router
- Automated unit/component testing with Vitest and Testing Library
- Test coverage reporting with V8
- Static code quality checks with Oxlint
- Production Docker image using a multi-stage build
- Nginx-based production serving of the Vite build

## Technology Stack

| Area | Technology |
|---|---|
| UI | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Routing | React Router |
| Icons | Lucide React |
| State Management | React Context + React Hooks |
| Testing | Vitest + Testing Library |
| Coverage | V8 |
| Linting | Oxlint |
| Containerization | Docker |
| Production Web Server | Nginx |
| Runtime/Data | Local JSON mock data |

## Application Modules

The current prototype exposes the following application routes:

```text
/              Home
/chats         Chats
/chats/:chatId Chat detail
/contacts      Contacts
/calls         Calls
/communities   Communities
/food          Food
/grocery       Grocery
/rides         Rides
/payments      Payments
/wallet        Wallet
/offers        Offers
/bookings      Bookings
/services      Services
/profile       Profile
/settings      Settings
```

Unknown routes are handled by a dedicated Not Found page.

## Architecture

At a high level, the application follows a component-based React architecture:

```text
                    ┌─────────────────────────┐
                    │      React Application  │
                    │        (Vite)           │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │    React Router         │
                    │    Route Management      │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │       App Shell          │
                    │ Navigation + Search      │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │    React Context        │
                    │ Shared Application State │
                    └────────────┬────────────┘
                                 │
              ┌──────────────────▼──────────────────┐
              │          Local JSON Data             │
              │ users / chats / messages / rides    │
              │ restaurants / products / services  │
              │ transactions                         │
              └─────────────────────────────────────┘
```

## Repository Structure

```text
All-Around-Project/
├── .github/                 # GitHub automation (when configured)
├── public/                  # Static assets
├── src/
│   ├── assets/              # Application assets
│   ├── components/
│   │   └── layout/          # Application shell and navigation
│   ├── contexts/             # Shared React application state
│   ├── data/                 # Local JSON mock datasets
│   ├── pages/                # Route-level application pages
│   ├── test/                 # Test configuration
│   ├── types/                # Shared TypeScript models
│   ├── App.tsx               # Application routing and composition
│   ├── App.css               # Application styles
│   ├── index.css             # Global styles
│   └── main.tsx              # Application entry point
├── Dockerfile
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Prerequisites

Install the following before running the project locally:

- Node.js 20+
- npm
- Docker (optional, for containerized execution)

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/Shannu-sys/All-Around-Project.git
cd All-Around-Project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

## Build the Application

Create a production build:

```bash
npm run build
```

The optimized frontend bundle is generated in:

```text
dist/
```

## Preview the Production Build

```bash
npm run preview
```

## Code Quality

Run Oxlint:

```bash
npm run lint
```

## Testing

Run the automated test suite:

```bash
npm test
```

The repository contains tests covering application behavior, context logic, and demo page functionality.

## Test Coverage

Generate the coverage report:

```bash
npm run coverage
```

Coverage output is generated under:

```text
coverage/
```

The configured coverage thresholds are:

- Statements: 70%
- Branches: 60%
- Functions: 60%
- Lines: 70%

## Docker

The project uses a **multi-stage Docker build**.

### Docker architecture

```text
Node.js 20 Alpine
       │
       ├── Install dependencies
       ├── Copy source code
       └── npm run build
              │
              ▼
        Production dist/
              │
              ▼
        Nginx Alpine
              │
              └── Serve static application
```

### Build the Docker image

```bash
docker build -t all-around .
```

### Run the container

```bash
docker run -p 5173:80 all-around
```

Open:

```text
http://localhost:5173
```

## Containerization Details

The Dockerfile follows a multi-stage pattern:

1. Uses Node.js Alpine to install dependencies and build the application.
2. Produces the Vite production bundle.
3. Uses Nginx Alpine as the lightweight runtime image.
4. Copies only the generated `dist` files into the Nginx image.
5. Exposes port `80`.

This keeps build tooling out of the final runtime image.

## State Management

Shared application state is implemented using React Context.

The application context manages data and interactions including:

- Users
- Chats
- Messages
- Restaurants
- Products
- Rides
- Transactions
- Services
- Notifications
- Theme
- Global search
- Cart count
- Sent messages
- Selected service

The selected theme is persisted using browser `localStorage`.

## Data Model

The prototype uses local JSON datasets instead of a backend API:

```text
src/data/
├── chats.json
├── messages.json
├── products.json
├── restaurants.json
├── rides.json
├── services.json
├── transactions.json
└── users.json
```

This makes the application self-contained and easy to run for demonstrations.

## Security & Data Handling

This is a frontend prototype and currently does not implement:

- User authentication
- Authorization
- Backend APIs
- Real payment processing
- Production database
- Real-time messaging infrastructure
- External service integrations

The application should therefore be treated as a **demo/prototype**, not as a production financial, messaging, or mobility platform.

Do not add real credentials, API keys, access tokens, or other secrets to the repository.

## Current Project Status

**Status: Frontend Prototype / Demo**

The current implementation focuses on:

- Product concept validation
- UI/UX demonstration
- Frontend architecture
- Client-side state management
- Automated testing
- Code quality
- Docker-based containerization

## DevOps Roadmap

The project can be extended into a full DevOps portfolio implementation with:

- [ ] GitHub Actions CI pipeline
- [ ] Automated linting and tests on pull requests
- [ ] Docker image build in CI
- [ ] Trivy container security scanning
- [ ] SonarQube/SonarCloud code analysis
- [ ] Docker image publishing to a container registry
- [ ] Terraform infrastructure provisioning
- [ ] Kubernetes deployment manifests
- [ ] Helm-based Kubernetes deployment
- [ ] Automated deployment to a cloud environment
- [ ] Prometheus/Grafana observability
- [ ] Deployment and rollback strategy
- [ ] Environment-specific configuration

These items should be marked complete only after they are actually implemented and tested.

## Why This Project Is Useful as a DevOps Portfolio

The application provides a realistic frontend workload that can be used to demonstrate an end-to-end DevOps delivery lifecycle:

```text
Source Code
    │
    ▼
GitHub
    │
    ▼
GitHub Actions
    │
    ├── Lint
    ├── Test
    ├── Build
    ├── Security Scan
    │
    ▼
Docker Image
    │
    ▼
Container Registry
    │
    ▼
Kubernetes
    │
    ▼
Cloud Environment
    │
    ▼
Monitoring & Observability
```

The CI/CD, security, infrastructure, Kubernetes, and observability stages will be added incrementally as part of the DevOps implementation.

## Author

**Shanmukham Chowdary**

Cloud & DevOps Engineer

AWS | Azure | Terraform | GitHub Actions | GitLab CI/CD | Docker | Kubernetes | DevSecOps
