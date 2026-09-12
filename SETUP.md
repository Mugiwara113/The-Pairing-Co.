# Setup Guide for Meal Pairing App

## Prerequisites

- Node.js 18+ ([download](https://nodejs.org))
- Supabase account ([create free account](https://supabase.com))

## Step 1: Install Dependencies

```bash
cd meal-pairing-app
npm install
```

## Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Choose your region and password
4. Wait for the project to be created (2-3 minutes)

## Step 3: Set Up Database

1. In your Supabase project, go to **SQL Editor**
2. Create a new query
3. Copy the entire contents of `db/schema.sql` into the SQL editor
4. Click **Run** to create all tables and indexes
5. Create another new query
6. Copy the entire contents of `db/seed.sql` into the SQL editor
7. Click **Run** to seed the initial data

## Step 4: Configure Environment Variables

1. In Supabase, go to **Settings > API**
2. Copy your project URL and anon key
3. In the project root, copy `.env.local.example` to `.env.local`
4. Fill in the Supabase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXTAUTH_SECRET=generate_a_random_secret_here
NEXTAUTH_URL=http://localhost:3000
```

To generate a random secret:
```bash
openssl rand -base64 32
```

## Step 5: (Optional) Set Up OAuth Providers

For Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add `http://localhost:3000/api/auth/callback/google` as authorized redirect URI
6. Copy Client ID and Secret to `.env.local`

For GitHub OAuth:
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Secret to `.env.local`

## Step 6: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Content Summary

✅ **58 Ingredients** across 6 categories:
- Proteins (12): Chicken, beef, salmon, shrimp, duck, lamb, etc.
- Carbs (11): Various pastas, risotto rice, potatoes, couscous
- Vegetables (16): Seasonal vegetables including asparagus, tomatoes, mushrooms
- Dairy (8): Cheeses and cream
- Spices & Herbs (9): Basil, oregano, thyme, rosemary, saffron

✅ **20 Meals** across multiple cuisines:
- Italian (12): Pastas, risottos, ravioli
- French (4): Salmon, duck confit, beef tenderloin
- Mediterranean (2): Lamb chops
- North African (1): Lamb tagine
- Asian (1): Jasmine rice

✅ **12 Wine Pairings**:
- Italian reds: Chianti, Barbera, Valpolicella
- International reds: Pinot Noir, Cabernet Sauvignon
- White wines: Pinot Grigio, Sauvignon Blanc, Chardonnay, Albariño, Riesling
- Sparkling: Prosecco

✅ **8 Spirit Pairings**:
- Liqueurs: Limoncello, Amaretto, Frangelico
- Spirits: Pisco, Vermouth, Grappa, Sambuca

✅ **10 Dessert Pairings**:
- Gelatos (3): Lemon, pistachio, and more
- Custards: Tiramisu, Panna Cotta, Zabaglione
- Seasonal: Panettone, strawberry semifreddo

✅ **8 Flower Pairings**:
- Edible flowers with seasonal availability
- Nasturtiums, rose petals, violets, basil flowers, pansies, borage, chamomile, calendula

## Troubleshooting

### "Table already exists" error
- This is fine if running the schema multiple times. Drop tables first:
  ```sql
  DROP TABLE IF EXISTS meal_pairings CASCADE;
  DROP TABLE IF EXISTS user_saved_meals CASCADE;
  DROP TABLE IF EXISTS user_preferences CASCADE;
  DROP TABLE IF EXISTS meal_ingredients CASCADE;
  DROP TABLE IF EXISTS pairings CASCADE;
  DROP TABLE IF EXISTS meals CASCADE;
  DROP TABLE IF EXISTS ingredients CASCADE;
  DROP TABLE IF EXISTS users CASCADE;
  ```

### "Foreign key constraint" error
- Make sure schema.sql runs completely before seed.sql
- Check that all UUIDs exist before creating relationships

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

## Next Steps

1. ✅ Database is seeded with meals and ingredients
2. ⏳ Build recommendation algorithm in `/api/recommendations`
3. ⏳ Create recommendation display component
4. ⏳ Add price slider and seasonal filters
5. ⏳ Implement user authentication
6. ⏳ Create user dashboard

---

Questions? Check the main README.md or see the plan.md file in the session state folder.
