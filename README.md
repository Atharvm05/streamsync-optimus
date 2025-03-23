
# StreamSync - Synchronized Video Streaming Platform

![StreamSync Logo](https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80)

StreamSync is a modern video streaming platform that enables perfectly synchronized viewing experiences across multiple devices and locations. This project aims to solve the "Did you see that?!" problem by ensuring everyone sees the exact same frame at the same time, regardless of their network conditions or device.

## 🚀 Features

- **Real-time Synchronization**: Perfect frame-by-frame synchronization for all viewers
- **Global Viewer Timeline**: See where other viewers are in the video
- **Custom Video Support**: Add and watch your own videos via URL
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on all devices and screen sizes
- **Video Controls**: Full playback controls including volume, fullscreen, and seeking

## 🛠️ Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API and React Query
- **Routing**: React Router
- **Video Playback**: HTML5 Video API with custom synchronization logic
- **Icons**: Lucide React
- **Charts**: Recharts (for analytics)

## 📋 Project Structure

```
src/
├── components/         # Reusable UI components
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── services/           # Service layer for data fetching and manipulation
```

## 🔧 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/streamsync.git
cd streamsync
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎥 Using StreamSync

### Adding Custom Videos

1. Navigate to the main page
2. Enter a valid video URL in the input field
3. Click "Add Video"
4. Your video will begin playing immediately

### Synchronizing with Other Viewers

The Global Viewer Timeline shows where other viewers are currently watching. The platform automatically handles synchronization in the background, ensuring everyone sees the same content at the same time.

### Controlling Playback

- Play/Pause: Click the play/pause button
- Volume: Adjust using the volume slider
- Seek: Click anywhere on the progress bar to jump to that position
- Fullscreen: Click the fullscreen button

## 🧩 Key Components

- **SyncContext**: Manages global state for video synchronization
- **VideoService**: Handles video playback and synchronization
- **GlobalTimelineService**: Tracks and updates viewer positions
- **VideoPlayer**: The main video playback component with controls

## 🌐 Deployment

The project can be deployed to any static hosting service such as Netlify, Vercel, or GitHub Pages. Build the production version with:

```bash
npm run build
# or
yarn build
```

## 🛣️ Roadmap

- [ ] Add authentication for user accounts
- [ ] Implement chat functionality for synchronized viewing
- [ ] Add support for live streaming
- [ ] Develop mobile applications
- [ ] Add analytics dashboard for content creators

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Authors

- [Your Name](https://github.com/yourusername)

## 🙏 Acknowledgments

- Sample videos provided by [Peach Open Movie Project](https://peach.blender.org/)
- UI Components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
