# Supabase authentication setup

The website uses Supabase Auth as its backend for account creation, login, and password recovery.

Before deploying, open **Supabase Dashboard → Authentication → URL Configuration** and add each website URL where the app will run to **Redirect URLs**. For example:

```
http://localhost:5173/index.html
https://your-domain.example/index.html
https://your-domain.example/programs.html
```

Also configure the production **Site URL** in the same section and enable Email authentication under **Authentication → Providers**.

Run [supabase-schema.sql](supabase-schema.sql) in Supabase SQL Editor to create the protected `profiles` table and signup trigger. The browser uses the publishable key in `supabase-config.js`; never place a Supabase service-role key in this project or in client-side JavaScript.
