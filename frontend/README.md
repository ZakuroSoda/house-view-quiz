# The House View Quiz!

> Inspired by Bloomberg's Pointed Quiz, with additional game features.

## 🧭 Vision
Create a risk-based news & knowledge quiz platform that blends trivia with portfolio management mechanics — designed to assess not just what users know, but how they think under uncertainty.

## 🎯 Mission
Make learning and testing current affairs, finance, and decision-making skills feel engaging, strategic, and (possibly) competitive. Mainly for the quiz nerds who (I have no clue why they are so obsessed with this) play Sporcle.

## 🔧 Tech Stack

- Frontend: React + Tailwind
- Backend: (Probably Express or Flask or FastAPI) + SQLite
- Hosting: Don't Care
- Graphing: Chart.js, D3, or Recharts or Plot.ly
- Auth: Google Identity Services + Our own DB
- CMS for quiz editing: Sanity Panel (likely not direct DB-admin for non-technical people)

### API Routes
- `/api/auth/login` - where the google jwt gets sent, returns a session token
- `/api/auth/logout` - where the session token gets invalidated
- `/api/auth/me` - where the session token gets validated

`id` shall be the date of creation of the quiz in YYYYMMDD format.
- `/api/quiz/latest` - gets the latest quiz (free users), must also check if we have done before
- `/api/quiz/:id` - only for paid users who can access all past quizzes
- `/api/quiz/:id/submit` - where the quiz answers get sent
- `/api/quiz/:id/results` - retrieve past quiz results

---

Built with ❤️ using React Router.
