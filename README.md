# AgentDesk

A modern platform for finding and connecting with skilled professionals. Search our database of agents and professionals using natural language queries powered by PrismPHP.

## 🎯 About

AgentDesk is a talent discovery platform that makes it easy to find skilled professionals based on their expertise, experience, and qualifications. Users can search using natural language queries, and the system intelligently matches them with the right professionals.

## ✨ Features

### For Job Seekers / Professionals
- **Profile Creation**: Register with your skills, interests, and availability
- **Skill Management**: Select from categorized skills (Backend, Frontend, Mobile, DevOps, Data & AI, etc.)
- **Interest Tracking**: Specify your professional interests
- **Profile Visibility**: Make yourself discoverable to potential employers/clients

### For Employers / Recruiters
- **Natural Language Search**: Search for professionals using plain English queries
  - Example: "Find developers skilled in React and TypeScript"
  - Example: "Show me managers with 5+ years of experience"
- **Advanced Filtering**: Search by skills, experience, location, availability, or any combination
- **Contact & Connect**: View profiles and contact information to reach out to professionals

### Technical Features
- **Multi-step Registration**: Streamlined onboarding process
- **Real-time Validation**: Client-side form validation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Beautiful UI with light/dark theme support
- **Type-safe Forms**: Built with Inertia.js and React

## 🛠️ Tech Stack

### Backend
- **Laravel 12** - PHP framework
- **MySQL 8.0** - Database
- **Inertia.js** - Modern monolith approach
- **PrismPHP** - Natural language to database query translation

### Frontend
- **React** - UI library
- **Inertia.js React** - Server-driven React components
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vite** - Build tool and dev server

### Development Tools
- **Docker** - Containerization
- **PropTypes** - Runtime type checking
- **Pest** - PHP testing framework

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- PHP 8.2+ (for local development)
- Composer (for local development)

## 🚀 Installation

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AgentDesk
   ```

2. **Start the containers**
   ```bash
   docker-compose up --build
   ```

   This will:
   - Build the Docker images
   - Install PHP and Node.js dependencies
   - Run database migrations
   - Start the Laravel server on port 8000
   - Start the Vite dev server on port 5173

3. **Seed the database** (in a new terminal)
   ```bash
   docker-compose exec app php artisan db:seed
   ```

4. **Access the application**
   - Application: http://localhost:8000
   - Vite Dev Server: http://localhost:5173

### Local Development

1. **Install dependencies**
   ```bash
   composer install
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database setup**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

4. **Start development servers**
   ```bash
   # Terminal 1: Laravel server
   php artisan serve

   # Terminal 2: Vite dev server
   npm run dev
   ```
### Search Functionality

1. Navigate to the home page
2. Enter a natural language query in the search box
3. Examples:
   - "Find developers skilled in React and TypeScript"
   - "Show me managers with 5+ years of experience"
   - "I need agents available in the US timezone"
4. View search results and contact information

## 🧪 Testing

```bash
# Run PHP tests
php artisan test

# Or with Pest
./vendor/bin/pest
```

## 📝 Development

### Available Commands

```bash
# Install dependencies
composer install
npm install

# Run migrations
php artisan migrate

# Seed database
php artisan db:seed

# Start dev servers
npm run dev          # Vite dev server
php artisan serve    # Laravel server

# Build for production
npm run build
```

### Docker Commands

```bash
# Start containers
docker-compose up

# Stop containers
docker-compose down

# Rebuild containers
docker-compose up --build

# Run commands in container
docker-compose exec app php artisan <command>
docker-compose exec app npm <command>
```

## 🎨 Styling

The project uses Tailwind CSS 4 with a custom color scheme:
- Primary: `#1b1b18` / `#f53003`
- Dark mode: `#0a0a0a` / `#FF4433`
- Text: `#706f6c` / `#A1A09A`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 🙏 Acknowledgments

- Built with [Laravel](https://laravel.com)
- UI powered by [React](https://react.dev) and [Inertia.js](https://inertiajs.com)
- Styled with [Tailwind CSS](https://tailwindcss.com)
