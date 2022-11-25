## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```
## Before Development Server
Before starting development server you need to create and connect database with prisma.
Make sure that you have your db link in environment variable called DATABASE_URL

then run
```bash
npx prisma push
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```
