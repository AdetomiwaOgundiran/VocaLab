# Vocalab

**Turn Your Product Idea or customer feedback Into Actionable Plan**

Vocalab is a web application that helps entrepreneurs and startup founders transform their ideas into structured product roadmaps. Simply record your pitch, and Vocalab's AI-powered analysis breaks down your concept into a comprehensive product development framework visualized as an interactive Kanban board.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## Features

### 1. Pitch Recording
- Browser-based audio recording using the Web Audio API
- Real-time recording timer
- Visual pulse animation during recording
- No server required - runs entirely in the browser

### 2. AI-Powered Analysis
- Intelligent framework selection from industry-standard methodologies
- Generates customized roadmap based on your pitch
- Supports 5 product development frameworks:
  - **Lean Startup**: Build-Measure-Learn approach for rapid iteration
  - **Design Thinking**: Human-centered approach to innovation
  - **Agile Scrum**: Iterative development with regular sprints
  - **Jobs-to-be-Done**: Focus on customer goals and outcomes
  - **Double Diamond**: Divergent and convergent thinking in problem-solving

### 3. Interactive Kanban Board
- Three-column layout: Backlog, In Progress, Completed
- Drag-and-drop functionality for task management
- Color-coded priority system (High, Medium, Low)
- Category tags for better organization
- Real-time item counters
- Framework badge showing selected methodology

## Design

Vocalab features a modern, professional SaaS design with:
- **Color Scheme**: Aqua Green (#14b8a6) and Amber (#f59e0b)
- **Typography**: System font stack for optimal readability
- **Responsive Layout**: Works on desktop and mobile devices
- **Smooth Animations**: Polished user experience with subtle transitions

## Technology Stack

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients, shadows, and animations
- **Vanilla JavaScript**: No frameworks or dependencies
- **Web Audio API**: Browser-based audio recording
- **Drag and Drop API**: Native browser drag-and-drop functionality

## Installation

1. Clone the repository:
```bash
git clone https://gitlab.com/YOUR_USERNAME/vocalab.git
cd vocalab
```

2. Open `index.html` in your browser:
```bash
open index.html
```

That's it! No build process or dependencies required.

## Usage

1. **Launch the App**: Open `index.html` in a modern web browser
2. **Start Recording**: Click "Start Recording Your Pitch" button
3. **Grant Permissions**: Allow microphone access when prompted
4. **Record Your Pitch**: Speak about your startup idea (30 seconds to 2 minutes recommended)
5. **Stop Recording**: Click "Stop Recording" when finished
6. **Analyze**: Click "Analyze Pitch" to generate your roadmap
7. **Manage Tasks**: Drag and drop cards between columns to track progress
8. **Start Over**: Click "Record New Pitch" to create a new roadmap

## File Structure

```
vocalab/
├── index.html          # Main HTML structure
├── styles.css          # All styling and design
├── app.js             # Application logic and functionality
└── README.md          # Project documentation
```

## Browser Compatibility

Vocalab works best on modern browsers that support:
- Web Audio API (MediaRecorder)
- Drag and Drop API
- CSS Grid and Flexbox
- ES6 JavaScript

**Recommended Browsers:**
- Chrome 70+
- Firefox 65+
- Safari 14+
- Edge 79+

## Future Enhancements

Potential features for future versions:
- [ ] Real AI integration with OpenAI or similar APIs
- [ ] Speech-to-text transcription
- [ ] Export roadmap as PDF or image
- [ ] Save roadmaps to local storage
- [ ] User accounts and cloud sync
- [ ] Collaborative roadmaps
- [ ] Custom framework creation
- [ ] Timeline view option
- [ ] Integration with project management tools (Jira, Trello, Asana)
- [ ] Analytics and progress tracking

## Development

### Current Implementation
The AI analysis is currently **simulated** - it randomly selects from predefined frameworks and generates appropriate roadmap items. This allows the app to work without external API dependencies or costs.

### Adding Real AI
To integrate real AI analysis:
1. Add API integration in `app.js` (OpenAI, Anthropic Claude, etc.)
2. Send audio or transcribed text to AI service
3. Parse AI response to extract roadmap items
4. Update `generateRoadmap()` function with AI-generated data

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 Vocalab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Acknowledgments

- Inspired by lean startup methodology and agile development practices
- Built with modern web standards and best practices
- Designed for entrepreneurs and startup founders

## Contact

For questions or feedback, please open an issue on GitLab.

---

**Built with passion for entrepreneurs who want to turn ideas into reality.**
