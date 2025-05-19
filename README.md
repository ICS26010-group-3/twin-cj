# Twin CJ Riverside Glamping Resort Booking System

A web-based booking system for managing reservations at Twin CJ Riverside Glamping Resort.

## 🚀 Getting Started

### 📦 Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) (v20.15.1)
- [Git](https://git-scm.com/)

### Setup

##### 1. Clone your fork locally:
   ```bash
   git clone git@github.com:ICS26010-group-3/twin-cj.git
   cd twin-cj
   ```
#### 2. Install dependencies

   **Backend**

   ```bash
   cd backend
   npm install # or yarn install / pnpm install
   ```

   **Frontend**
   ```bash
   cd ../frontend
   npm install # or yarn install / pnpm install
   ```

#### 3. Set up your environment variables
   - Create a `.env` file in both the frontend and backend directories.
   - Copy values from the respective `.env.example` file
   - Example variables:
   ```bash
   API_KEY=your-api-key
   DATABASE_URL=your-database-url
   ```


#### 4. Set up Database (Prisma) 
   - Generate prisma client
   ```bash
   cd ../backend
   npx prisma generate --schema prisma/
   npx prisma migrate reset --schema prisma/
   ```
   ⚠️ Warning: `prisma migrate reset` will erase all data in the database

#### 5. Run the development server

   Start both frontend and backend:

   #### Frontend:
   ```bash
   cd ../frontend
   npm run dev # or yarn install / pnpm install
   ```

   #### Backend:
   ```bash
   cd ../backend
   npm run dev # or yarn install / pnpm install
   ```


## 👥 Project Contributors

- Arellano, Patricia Bianca G.
- De Vera, Winfrey James G.
- Duterte, Kurt Emmanuel D.L.C.
- Feliciano, Chrizelle C.

## 📚 Project Documentation
- 📄[Project Documentation]()
- 🗃️[Exported Database](./backend/prisma/schema/exported_databse.sql)

## 🤝 How to Contribute

Follow the [Project Guidelines](https://se-group-3.gitbook.io/se-group-3-project-workflow) to contribute to this project.

## 📄License

This project is licensed under [MIT License](LICENSE.txt).
