# GitHub Repositories Explorer

A modern web application that allows users to search for GitHub users and explore their repositories. Built with React, Redux Toolkit, and Tailwind CSS.

![GitHub Repositories Explorer](https://res.cloudinary.com/aldyazarya/image/upload/v1742226825/Screenshot_2025-03-17_at_22.43.50_dar2vn.png)


## Live Preview
`https://github-repositories-explorer-coral.vercel.app/`

## Features

- Search for GitHub users by username
- View user profiles with avatar and basic information
- Browse repositories for selected users
- Sort repositories by most recently updated
- View repository details including:
  - Description
  - Programming language
  - Star count
  - Last updated date
  - Fork status
- Responsive design for mobile and desktop
- Error handling with toast notifications

## Technologies Used

- **React**: Frontend library for building user interfaces
- **Redux Toolkit**: State management with simplified Redux setup
- **RTK Query**: Data fetching and caching
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **Lucide React**: Beautiful icons
- **TypeScript**: Static type checking
- **Vite**: Fast build tool and development server

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aldyazarya/github-explorer.git
   cd github-repositories-explorer
2. Install dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm run dev
4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Enter a GitHub username in the search bar
2. Click on a user from the search results to view their details
3. Browse through the user's repositories
4. Click on repository names to visit them on GitHub
5. Use the "Show More" button to load additional repositories

## Project Structure

```plaintext
src/
├── components/         # UI components
├── features/           # Redux slices
├── services/           # API services
├── types/              # TypeScript type definitions
├── hooks/              # Custom hooks
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── store.ts            # Redux store configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing the data
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide React](https://lucide.dev/) for the icons