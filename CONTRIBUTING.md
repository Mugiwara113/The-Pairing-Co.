# Contributing to Meal Pairing

This project is a Next.js meal recommendation app. The current backend is intentionally small: Next.js API route handlers call the Supabase database and return meal recommendations, ingredients, meals, and pairings. The frontend can be built in the same Next.js application.

## Current Status

### Working backend surface

- `POST /api/recommendations` matches ingredient names to meals and returns pairings.
- `GET /api/recommendations` provides the same recommendation flow through query parameters.
- `GET /api/ingredients` returns ingredients for autocomplete and selection.
- `POST /api/meals` returns meals filtered by cuisine, price, and difficulty.
- Supabase schema and seed data are provided in `db/schema.sql` and `db/seed.sql`.
- Recommendation matching is case-insensitive and requires at least 60% of a meal's required ingredients.

### Not implemented yet

- Authentication route and session handling. `app/api/auth` is currently empty.
- Saving meals, user preferences, and search history. The database tables exist, but no API routes use them.
- Real automated tests. `__tests__/recommendations.test.ts` contains documented examples, not executable test cases.
- Seasonal filtering in the recommendation algorithm. The API accepts `season`, but the current algorithm does not filter meals, ingredients, or pairings by season.
- Pagination, rate limiting, request schemas, and production observability.

Treat the sections above as the source of truth when choosing frontend work. A screen for login, saved meals, or seasonal-only results will need backend work before it can be fully functional.

## Recommended Frontend Approach

Stay with the existing stack:

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Existing API helpers in `lib/api.ts`

This is the best fit because the backend already runs as Next.js route handlers under `app/api`. A separate frontend framework would add deployment, CORS, authentication, and environment-variable work without improving the current product. Use client components for interactive ingredient selection and filters, and call the local API routes rather than querying Supabase directly from UI components.

## Run the Backend Locally

### Prerequisites

- Node.js 18 or newer
- npm
- A Supabase project
- Git

From the repository root:

```bash
cd meal-pairing-app
npm install
```

Create local environment variables:

```bash
cp .env.local.example .env.local
```

At minimum, set these values in `.env.local`:

```text
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

The `NEXTAUTH_*` and OAuth variables are not required for the current ingredient, meal, and recommendation endpoints because authentication has not been implemented.

### Create the local database

1. Create a Supabase project.
2. Open the Supabase SQL Editor.
3. Run all of `db/schema.sql`.
4. Run all of `db/seed.sql` after the schema succeeds.
5. Confirm that the tables contain data before starting the app.

Start the development server:

```bash
npm run dev
```

The app is available at `http://localhost:3000`. If that port is busy:

```bash
npm run dev -- -p 3001
```

## API Contract for Frontend Work

All endpoints are relative to the current app origin, for example `http://localhost:3000/api`.

### `POST /api/recommendations`

Request:

```json
{
  "ingredients": ["Chicken breast", "Spaghetti", "Mozzarella"],
  "maxPrice": 20,
  "season": "summer"
}
```

- `ingredients` is required and must be a non-empty array of ingredient names.
- `maxPrice` is optional and is parsed as a number.
- `season` is optional. Valid intended values are `spring`, `summer`, `fall`, and `winter`.
- The response contains `success`, `recommendations`, `count`, and (for POST) `query`.

Each recommendation currently includes:

```text
id, name, description, basePrice, cuisineType, difficultyLevel,
prepTimeMins, matchPercentage, matchedIngredients, missingIngredients,
pairings.wine, pairings.spirits, pairings.desserts, pairings.flowers
```

Example request:

```bash
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{"ingredients":["Chicken breast","Spaghetti","Mozzarella"],"maxPrice":20}'
```

### `GET /api/recommendations`

Useful for shareable URLs:

```text
/api/recommendations?ingredients=Chicken%20breast,Spaghetti&maxPrice=20
```

`ingredients` is a required comma-separated list. The response shape is the same recommendation result, but the GET response does not include the POST `query` object.

### `GET /api/ingredients`

Returns:

```json
{
  "success": true,
  "ingredients": [
    { "id": "uuid", "name": "Chicken breast", "category": "protein" }
  ],
  "count": 1
}
```

Use this endpoint to populate autocomplete. Do not hard-code the ingredient list in the frontend.

### `POST /api/meals`

Request:

```json
{
  "cuisineType": "Italian",
  "maxPrice": 20,
  "difficulty": "easy"
}
```

All fields are optional. The response contains `success`, `meals`, and `count`. Meal records use the database column names in this response (`base_price`, `cuisine_type`, `difficulty_level`, and `prep_time_mins`), unlike recommendation records, which use camelCase fields.

### Errors

A failed request normally returns:

```json
{ "error": "Error message" }
```

The frontend should handle non-2xx responses and empty result arrays. Unknown ingredient names currently produce an empty recommendation list rather than a validation error.

## Backend Layout

- `app/api/*/route.ts`: HTTP handlers and basic request validation.
- `lib/recommendations.ts`: Supabase queries and matching algorithm.
- `lib/supabase.ts`: Supabase client, created from environment variables.
- `lib/api.ts`: client-side fetch helpers.
- `lib/types.ts`: TypeScript domain types.
- `db/schema.sql`: tables, constraints, and indexes.
- `db/seed.sql`: development data.
- `docs/ALGORITHM.md`: algorithm notes.

The recommendation flow is:

1. Convert submitted ingredient names to database IDs.
2. Load meal-to-ingredient relationships.
3. Score each meal using matched required ingredients.
4. Remove meals below the 60% required-ingredient threshold.
5. Apply the price filter when provided.
6. Load wine, spirit, dessert, and flower pairings.
7. Return results sorted by match percentage.

## Backend Work Still Needed

### Priority 1: Make the current contract reliable

- Add an executable test runner and integration tests for all four API handlers.
- Validate JSON types, numeric ranges, season values, and empty strings with a shared schema library such as Zod.
- Normalize response field names so the frontend does not need separate database and API models.
- Fix zero-value filters and invalid numeric input; current truthiness checks can silently ignore `0` or pass `NaN`.
- Return consistent error bodies without exposing raw server error strings.
- Add database error handling that distinguishes an unavailable database from a legitimate empty result.

### Priority 2: Finish documented behavior

- Implement seasonal filtering for meal ingredients and pairings, including the default current season.
- Decide whether seasonal filtering excludes a meal, excludes only a pairing, or only changes ranking, then document that decision.
- Add the meal ingredients and quantities to meal detail responses if the frontend needs recipe information.
- Add pagination and explicit result limits before the dataset grows.

### Priority 3: Add accounts and saved content

- Implement NextAuth configuration and provider callbacks.
- Define how NextAuth users map to the custom `users` table, or replace the custom table with Supabase Auth data.
- Add authenticated routes for saved meals, preferences, and search history.
- Add authorization checks so one user cannot read or modify another user's records.
- Add Supabase Row Level Security policies before using a public anon key in production.

### Priority 4: Production readiness

- Add migrations instead of relying only on manually pasted SQL files.
- Add environment validation at startup with clear messages.
- Add rate limiting, request logging, monitoring, and a deployment checklist.
- Add seed/data-management guidance for staging and production.

## Frontend Contribution Starting Points

Good first frontend tasks that work with the current backend:

- Ingredient autocomplete using `GET /api/ingredients`.
- Recommendation results using `POST /api/recommendations`.
- Loading, empty, error, and retry states.
- Price and cuisine filters backed by the meals endpoint.
- Recommendation detail views that display match percentage and pairing groups.
- Responsive layout and accessibility improvements.

Coordinate before building login, saved meals, user preferences, or strict seasonal-only views because those need backend changes listed above.

## Local Checks

The package currently defines these scripts:

```bash
npm run type-check
npm run lint
npm run build
```

There is currently no `test` script in `package.json`, and the file under `__tests__` is an example/specification rather than a runnable test suite. Contributors adding backend behavior should add a real test setup and update the package scripts at the same time.

## Pull Requests

Keep changes focused and include:

- What behavior changed.
- Which API route or database table is affected.
- Setup or environment-variable changes.
- A curl example or test covering the changed endpoint.
- Any frontend contract changes, including response shape changes.

Never commit `.env.local`, Supabase service-role keys, OAuth secrets, or production data.
