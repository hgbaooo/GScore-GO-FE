# GScores - Frontend

This repository contains the frontend code for **G-Scores**, an online platform that allows students, parents, and teachers to quickly and accurately check National High School Exam scores for 2024. Additionally, the system provides detailed statistical reports on score distribution.

## Features

- **Score Lookup by Registration Number**
- **Score Classification into 4 Levels**
- **Rank the top 10 highest-scoring students in Group A**

## Technologies

- **Frontend:** React, Material-UI
- **Code Formatting:** ESLint, Prettier
- **Version Control:** Git
- **Deployment:** Vercel

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hgbaooo/GScore-GO-FE
   cd GScore-GO-FE
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Copy the `.env.example` file to `.env` and update the values as needed.

   ```bash
   cp .env.example .env
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

## Environment Variables

```bash
# URL for connecting to the server
VITE_SERVER_CONNECTION_URL=https://example.com
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
