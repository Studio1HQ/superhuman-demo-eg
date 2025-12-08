# Superhuman Mail Velt Example (Next.js)

A collaborative email client built with Next.js, React, Tailwind CSS, and [Velt](https://velt.dev), demonstrating real-time commenting and multi-user collaboration for modern email applications.

---

## Features

- ✉️ **Email Client**: Browse, preview, and manage emails with a modern inbox interface.

- 🧑‍🤝‍🧑 **Multi-User Support**: Switch between predefined users with avatars.

- 💬 **Real-Time Comments**: Add and view collaborative comments on email content using Velt.

- 🌓 **Dark/Light Theme**: Toggle between dark and light modes.

- 📊 **Sidebar Navigation**: Collapsible sidebar with inbox, labels, and email organization.

- 🔔 **Notifications**: In-app notifications powered by Velt.

- 👥 **User Presence**: See who's viewing emails in real-time.

- 🧩 **Reusable UI Components**: Built with shadcn/ui and Radix primitives.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)

- **UI**: [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)

- **Editor**: [Tiptap](https://tiptap.dev/)

- **Collaboration**: [Velt](https://velt.dev/)

- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

- **Icons**: [Lucide React](https://lucide.dev/)

- **Other**: [Shad CN](https://ui.shadcn.com/)

---

## Prerequisites

- **Node.js** (v16+ recommended)

- **npm** (v8+ recommended)

---

## Getting Started

1. Clone the repository

   ```bash

   git clone <repository-url>

   ```

2. Navigate to the `superhuman` directory

   ```bash

   cd superhuman

   ```

3. Install dependencies:

   ```bash

   npm install

   ```

4. Create a `.env.local` file with your Velt API key:

   ```

   NEXT_PUBLIC_VELT_ID=your_api_key_here

   ```

   > Note: You can get your API key from the [Velt Dashboard](https://app.velt.dev)

5. Run the development server:

   ```bash

   npm run dev

   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```

superhuman/

├── app/                 # Next.js app directory

│   ├── (app)/          # Main app routes

│   └── layout.tsx      # Root layout

├── components/          # React components

│   ├── email-list.tsx  # Email inbox list component

│   ├── email-preview.tsx # Email preview component

│   ├── sidebar.tsx     # Navigation sidebar

│   ├── top-navigation.tsx # Top navigation bar

│   ├── theme-toggle.tsx # Theme toggle component

│   └── ui/             # UI components (shadcn/ui)

├── helper/              # Helper functions

│   └── userdb.ts       # User database/store

├── hooks/              # Custom React hooks

│   └── use-theme.tsx   # Theme management hook

├── lib/                # Utility functions

│   └── utils.ts        # Utility functions

└── public/             # Static assets

```

## Velt Integration

This project uses Velt SDK v4.5.2-beta.11 and v4.5.0-beta.14 for real-time collaboration features:

### Core Features

- User presence and cursor tracking

- Comments and annotations on email content

- Notifications

- Real-time updates

### Velt Components Used

- `VeltProvider`: Main provider component for Velt integration

- `VeltComments`: Inline commenting system for email content

- `VeltCommentsSidebar`: Comments management sidebar

- `VeltNotificationsTool`: Notification system

- `VeltPresence`: User presence indicators

- `VeltSidebarButton`: Button to toggle comments sidebar

- `TiptapVeltComments`: Tiptap extension for Velt comments integration

### Configuration

The application uses the following Velt configurations:

- Document ID: "superhuman-velt"

- User authentication with predefined users (Nany, Mary)

- Custom comment bubble styling with purple theme

- Dark/Light mode support

- Tiptap editor integration for rich text email content

## Troubleshooting

### Common Issues

1. **Velt API Key Issues**

   - Ensure your API key is correctly set in `.env.local`

   - Verify the key is active in your Velt Dashboard

2. **Collaboration Features Not Working**

   - Check browser console for errors

   - Verify network connectivity

   - Ensure you're using a supported browser

3. **Build Issues**

   - Clear `.next` directory and node_modules

   - Run `npm install` again

   - Check Node.js version compatibility

4. **Theme Issues**

   - Clear browser localStorage if theme persists incorrectly
## Documentation

### Velt Resources

- [Velt Documentation](https://docs.velt.dev/getting-started/introduction)

- [Velt API Reference](https://docs.velt.dev/api-reference)

- [Velt Dashboard](https://app.velt.dev)

- [Velt GitHub](https://github.com/veltdev)

### UI Components

- [Shadcn UI Documentation](https://ui.shadcn.com/docs)

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

- [Tiptap Documentation](https://tiptap.dev/docs)

## Contributing

Feel free to submit issues and enhancement requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

