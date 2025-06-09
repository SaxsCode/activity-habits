# Habit Tracker - WORK IN PROGRESS

A modern, full-stack habit tracking app built with Next.js, MySQL, and Tailwind CSS. Track your daily habits, visualize your progress, and manage your routines securely with user authentication.

---

## Features

- **User Authentication:** Secure login and registration (NextAuth.js or Clerk recommended)
- **Personalized Habits:** Each user has their own set of habits and logs
- **Daily Tracking:** Mark habits as complete/incomplete for each day
- **GitHub-Style Activity Grid:** Visualize your habit streaks and progress with an activity grid inspired by GitHub and GitLab’s contribution graphs
- **Responsive UI:** Built with Tailwind CSS for a clean, mobile-friendly interface
- **API-Driven:** All data interactions via RESTful API routes

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/habit-tracker.git
cd habit-tracker
```
### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file with your database and authentication settings:
```
DATABASE_URL=mysql://user:password@localhost:3306/habits_db
NEXTAUTH_URL=http://localhost:3000
Add other relevant variables for your auth provider
```

### 4. Set Up the Database

- Import the provided SQL schema (see `/prisma/schema.sql` or `/db/schema.sql`)
- Ensure `habits` and `habits_log` tables include a `user_id` column

### 5. Run the Development Server

```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

- **Sign up or log in** to create your personal habit list.
- **Add new habits** using the input field.
- **Mark habits as complete** each day in the table.
- **View your activity grid** to see your progress over time, in a style similar to GitHub/GitLab’s contribution graphs.

---

## Security & Multi-User Support

- All habits and logs are associated with the currently authenticated user.
- API routes check authentication and only allow access to the user's own data.
- No one else can view or modify your habits.

---

## Technologies Used

- **Next.js** (App Router)
- **MySQL** (or compatible SQL database)
- **Tailwind CSS** (UI)
- **NextAuth.js** or **Clerk** (authentication)
- **React** (frontend)

---

## Contributing

Pull requests and issues are welcome! Please open an issue to discuss major changes.

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Acknowledgments

- Inspired by GitHub and GitLab’s activity grids for visual habit tracking.
- Built using modern web best practices.

---

*Happy tracking!*
