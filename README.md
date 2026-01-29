# AgentDesk

AgentDesk is a modern platform for discovering skilled professionals and interacting with them through **safe, tool-based AI assistants**.

It combines structured profiles, public messaging, and strictly controlled AI agents to enable talent discovery and inbox management without hallucinations or hidden logic.

---

## 🎯 What is AgentDesk?

AgentDesk allows professionals to create structured profiles (skills, interests, availability) and makes them discoverable.

Visitors can:

- Search for professionals using natural language
- View public profiles
- Send messages to professionals (even without an account)

Authenticated users can:

- View their unread inbox messages
- Ask natural language questions about their inbox
- Manage messages using AI assistants that operate through explicit backend tools

AgentDesk intentionally avoids free-form chatbots.  
Every AI action is constrained, auditable, and backed by server-side logic.

---

## ✨ Core Features

### 👤 Profiles

- Create a professional profile with:
    - Skills (level + years of experience)
    - Interests
    - Availability (day, time block, mode)
- Profiles are publicly viewable and searchable

---

### 🔍 Talent Discovery

- Natural language search powered by LarAgent
- Example queries:
    - "Find developers skilled in React and TypeScript"
    - "Show me backend engineers available on weekends"
    - "Who has experience with Laravel and Docker?"

---

### ✉️ Public Messaging

- Anyone (including unauthenticated visitors) can send a message to a professional
- No sender identity is required
- Messages are stored securely and delivered to the recipient’s inbox

This lowers friction for first contact and outreach.

---

## 🤖 AI Assistants

AgentDesk includes **purpose-built AI assistants**, not generic chatbots.

### 📥 Inbox Assistant (Authenticated Users Only)

The Inbox Assistant helps users manage **unread messages** using natural language.

Supported questions include:

- "Did someone text me today?"
- "Any unread messages yesterday?"
- "Do I have new messages this week?"
- "Did I receive messages last week?"
- "How many unread messages do I have?"

---

### 🕒 Time-Based Queries

The Inbox Assistant currently supports:

- Today
- Yesterday
- This week
- Last week

If the user asks about an unsupported time range (e.g. last month, last year), the assistant responds clearly:

"I don’t support that time range yet."

No guessing. No fallback logic.

---

### ✅ Mark All as Read

Authenticated users can ask the assistant to mark all unread messages as read:

- "Mark all my unread messages as read"
- "Clear my inbox"

The assistant executes this through a single backend tool and confirms the result.

---

### 🛡️ Safety & Accuracy Guarantees

- AI assistants never invent data
- Sender identity is never guessed
- Unsupported requests are explicitly rejected
- Each request can trigger at most one backend tool
- Authentication and authorization are enforced server-side

---

## 🧠 AI Architecture (Important)

AgentDesk uses a **tool-driven AI architecture powered by LarAgent**.

- AI assistants cannot access the database directly
- They can only call explicitly defined tools
- Each request allows at most one tool call
- The backend controls authentication, authorization, and data access

This design prevents hallucinations and ensures predictable behavior.

---

## 🛠️ Tech Stack

### Backend

- Laravel 12
- MySQL 8.0
- Inertia.js
- LarAgent (tool-based AI execution)

### Frontend

- React
- Inertia.js (React adapter)
- Tailwind CSS 4
- Vite

### Development & Tooling

- Docker & Docker Compose
- Pest (PHP testing)
- Faker (database seeding)

---

## 📋 Prerequisites

- Docker & Docker Compose (recommended)

Or for local development:

- PHP 8.2+
- Node.js 18+
- Composer

---

## 🚀 Installation

### Docker (Recommended)

```bash
git clone <repository-url>
cd AgentDesk
docker-compose up --build
```

## Seed the database

docker-compose exec app php artisan db:seed

## Current Limitations (By Design)

- Message sender identity is not stored yet
- Inbox assistant only works with unread messages
- Time ranges are intentionally limited
- No automatic message replies yet
- These are deliberate choices to keep the system safe and predictable.
