# Meal Pairing Recommendation Engine

The Pairing Co. meal prep app helps with recipes, desserts, spirits, and pairings for hosting events, college students, and people working on the road.

A full-stack web application that helps users discover meal recommendations based on ingredients they have. Users input primary ingredients, receive personalized recommendations with pricing, and can add complementary pairings (wine, spirits, desserts, flowers).

**Contributors:** Start with [CONTRIBUTING.md](CONTRIBUTING.md) for local backend setup, the frontend API contract, current limitations, and prioritized backend work.

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (via Supabase)
- **Authentication:** NextAuth with OAuth (Google, GitHub)

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (https://supabase.com)

### Installation

1. Clone the repository
   ```bash
   cd meal-pairing-app
   npm install
   ```

2. Set up environment variables
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your Supabase credentials and OAuth provider keys.

3. Set up the database
   - Create a Supabase project
   - Run the SQL schema in `db/schema.sql`
   - Seed initial data with `db/seed.sql`

4. Start the development server
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
meal-pairing-app/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── api/                     # API routes
│   │   ├── auth/                # NextAuth configuration
│   │   ├── recommendations/     # Recommendation endpoint
│   │   └── meals/               # Meal endpoints
│   ├── dashboard/               # User dashboard (protected)
│   └── recommendations/         # Recommendations page
├── components/                  # Reusable React components
│   ├── IngredientInput.tsx
│   ├── PriceSlider.tsx
│   ├── RecommendationCard.tsx
│   ├── PairingPanel.tsx
│   └── SeasonalFilter.tsx
├── lib/                         # Utility functions
│   ├── supabase.ts             # Supabase client
│   ├── api.ts                  # API helper functions
│   └── types.ts                # TypeScript types
├── db/                         # Database files
│   ├── schema.sql              # Database schema
│   └── seed.sql                # Initial data
├── public/                     # Static assets
└── styles/                     # Global styles
```

## Features

- ✨ **Ingredient Input:** Search and select ingredients
- 🍽️ **Smart Recommendations:** Get meal suggestions based on your ingredients
- 💰 **Price Filtering:** Filter meals by price range
- 🍷 **Pairing Suggestions:** Wine, spirits, desserts, and flower pairings
- 🌱 **Seasonal Options:** View seasonal availability
- 👤 **User Accounts:** Save favorites and manage preferences
- 👥 **Guest Mode:** Limited features without creating an account

## Development

### Running Tests
```bash
npm run test
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

### Building for Production
```bash
npm run build
npm start
```

## API Routes

### GET /api/recommendations
Get meal recommendations based on ingredients.

**Query Parameters:**
- `ingredients`: comma-separated ingredient IDs
- `maxPrice`: maximum price filter
- `season`: filter by season

**Response:**
```json
{
  "meals": [
    {
      "id": "uuid",
      "name": "Chicken Parm",
      "description": "...",
      "basePrice": 14.99,
      "cuisineType": "Italian",
      "pairings": {...]
    }
  ]
}
```

## Database Schema

See `db/schema.sql` for the complete schema including:
- Users & authentication
- Meals & ingredients
- Pairings (wine, spirits, desserts, flowers)
- User saved meals & preferences

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Submit a pull request

## License

MIT
