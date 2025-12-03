# Next.js REST API Project

![Next.js](https://img.shields.io/badge/Next.js-16.0.6-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-blue?style=for-the-badge&logo=tailwind-css)
![REST API](https://img.shields.io/badge/API-REST-green?style=for-the-badge&logo=api)

A modern REST API built with Next.js 16, TypeScript, and Tailwind CSS. This project provides a solid foundation for building scalable APIs with the latest web technologies.

## 🖼️ Project Overview

![Project Screenshot](./public/landing-page.png)
_Example of the API in action - replace with your own screenshot or diagram_

## 🚀 Features

- **Next.js 16** - Latest version with enhanced performance
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **REST API** - Clean and scalable API endpoints
- **ESLint & Prettier** - Code quality and formatting
- **Modern JavaScript** - ES2017+ support
- **React 19** - Latest React features

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16.0.6
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5+
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 4+
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: Radix UI primitives

## 📦 Dependencies

### Core Dependencies

- `next` - React framework
- `react` & `react-dom` - UI library
- `@radix-ui/react-slot` - Component composition
- `lucide-react` - Icons
- `framer-motion` - Animations
- `next-themes` - Theme management
- `class-variance-authority` - Class composition
- `clsx` & `tailwind-merge` - Class utility functions

### Dev Dependencies

- `@types/node`, `@types/react`, `@types/react-dom` - Type definitions
- `eslint` & `eslint-config-next` - Code linting
- `tailwindcss` - Styling
- `typescript` - Type checking
- `prettier` - Code formatting

## 🚀 Quick Start

1. **Clone the repository**

    ```bash
    git clone https://github.com/seaavey/restapi.git
    cd restapi
    ```

2. **Install dependencies**

    ```bash
    bun install
    # or
    npm install
    ```

3. **Run the development server**

    ```bash
    bun dev
    # or
    npm run dev
    ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Project Structure

```
.
├── app/                    # Next.js 13+ app directory
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/            # Reusable components
├── lib/                   # Utility functions
└── public/                # Static assets
```

## 🛠️ Available Scripts

- `bun dev` - Start the development server
- `bun build` - Build the application for production
- `bun start` - Start the production server
- `bun lint` - Run ESLint to check for code issues

## 🧪 API Development

For API routes, you can use either approach depending on your needs:

### App Router (Recommended - `app` directory)

API routes in the `app` directory provide more flexibility and are the current recommended approach:

```typescript
// Example: app/api/users/route.ts
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    // Handle GET request
    return new Response(JSON.stringify({ message: 'Hello World' }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function POST(request: NextRequest) {
    // Handle POST request
    const body = await request.json();
    return new Response(JSON.stringify({ message: 'Data received', data: body }), {
        status: 201,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
```

### Pages Router (Legacy - `pages/api` directory)

The traditional approach using the `pages/api` directory:

```typescript
// Example: pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'Hello World' });
    } else if (req.method === 'POST') {
        const { name } = req.body;
        res.status(201).json({ message: `Hello ${name}` });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
```

The **App Router approach** (`app/api`) is recommended for new projects as it provides:

- Better route organization with nested routing
- More flexible request/response handling
- Support for React Server Components
- Better performance with streaming capabilities

## 🌐 Repository

Check out the project repository for the latest updates and to contribute: [https://github.com/seaavey/restapi](https://github.com/seaavey/restapi)

## 🎨 Styling

This project uses Tailwind CSS for styling. You can customize the styles in `app/globals.css` and use Tailwind classes throughout your components.

## 🔄 Environment Variables

For environment variables, create a `.env.local` file in the root directory:

```env
DATABASE_URL=your_database_url
API_KEY=your_api_key
```

## 🚀 Deployment

### Vercel (Recommended)

Deploy your Next.js app to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seaavey/restapi)

### Other Platforms

- Netlify
- AWS
- Google Cloud
- Railway
- Render

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Muhammad Adriansyah**

- Website: [https://seaavey.my.id](https://seaavey.my.id)
- Project: [restapi](https://github.com/seaavey/restapi)

## ✨ Acknowledgments

- Thanks to the [Next.js team](https://nextjs.org/) for creating an amazing framework
- The [TypeScript team](https://www.typescriptlang.org/) for type safety
- [Tailwind CSS team](https://tailwindcss.com/) for the utility-first approach
- All the contributors to the open-source libraries used in this project
