# Local Storage Stats - Boilerexams Take-Home Assessment

**Project: <u>3</u>** | Local Storage Stats

Created by Anthony Dierkes

A React application for displaying statistics and analytics from exam submission data.

**AI USAGE NOTE**
This project <u>does</u> include AI usage. It was only used for
optimizing certain functions, mostly filtering ones, and formatting. Additionally, it was used
to create the groundwork for styling and its applications (e.g responsiveness, animations, coloring).
which were then further tweaked and reviewed by me. I marked place, outside of the css files, where AI was implemented.
All components, schemas, loaders, and calculations were handbuilt.

**ADDITIONAL NOTES**
Some things could definitely be optimized (e.g rendering the cards dynamically), however it adds an unnecessary complexity with generics and types for a small take-home project like this, so it was left out.

Although there is only one attempt type in the example data, I thought it would be interesting to show that there could be specific data per attempt type and can be filtered through that, hence the dropdown.

## Getting Started

To run this project locally after cloning from GitHub:

1. **Install dependencies:**

   ```bash
   npm install
   ```

   Or if you're using Bun:

   ```bash
   bun install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

   Or with Bun:

   ```bash
   bun run dev
   ```

3. **Open your browser:**
   The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## Technologies Used

### React

Used here to create a component-based architecture for displaying statistics in a modular and maintainable way.

### TypeScript

Provides type safety throughout the application, preventing runtime errors and improving code quality.

### Vite

A modern build tool and development server that provides fast and optimized production builds.

### Zod

A TypeScript-first schema validation library. Used to define and validate the structure of submission data and statistics, ensuring data integrity at runtime.

## Design Decisions

### Color Scale for Success Rates

The application uses a green color gradient to visualize accuracy and success rates on the total questions number. The color scale ranges from darkest green (excellent performance) to lightest green (poor performance), providing immediate visual feedback:

- **90-100%**: `#1B5E20` (Darkest green - Excellent)
- **80-89%**: `#2E7D32` (Very dark green - Very good)
- **70-79%**: `#388E3C` (Dark green - Good)
- **60-69%**: `#43A047` (Medium-dark green - Above average)
- **50-59%**: `#4CAF50` (Medium green - Average)
- **40-49%**: `#66BB6A` (Medium-light green - Below average)
- **30-39%**: `#81C784` (Light green - Poor)
- **20-29%**: `#A5D6A7` (Lighter green - Very poor)
- **10-19%**: `#C8E6C9` (Very light green - Very low)
- **0-9%**: `#E8F5E9` (Lightest green - Extremely low)

This color scale is applied dynamically to statistics cards based on their correct rate, making it easy to see preformance based on the color of total questions answered.

### Attempt Types System

The application supports filtering statistics by different attempt types (e.g., "Multiple Choice", "Free Response", etc.). The system:

- **Automatically discovers** attempt types from the submission data
- **Formats display names** by converting snake_case or space-separated types into Title Case (e.g., "MULTIPLE_CHOICE" → "Multiple Choice")
- **Provides filtering** through a custom dropdown selector that allows users to view statistics for specific attempt types or all attempts combined
- **Maintains type safety** throughout the filtering process using TypeScript

### Glass Morphism UI

The interface uses a modern glassmorphism design with:

- Semi-transparent backgrounds with backdrop blur effects
- Subtle borders and shadows for depth
- A dark color scheme with warm gradient accents
- Smooth animations and transitions for interactive elements

### Component Architecture

The application follows a modular component structure:

- **OverallStats**: Displays aggregate statistics across all questions
- **AttemptTypeStats**: Shows statistics filtered by attempt type with a custom selector
- **AttemptDistribution**: Visualizes the distribution of attempts (1, 2, or 3+ attempts per question)
- **StatCard**: Reusable card component for displaying individual metrics
- **AttemptTypeSelector**: Custom dropdown component for filtering by attempt type

### Statistics Calculation

- **Per-question metrics**: Total attempts, incorrect attempts, first-try success, and correct answer status
- **Overall metrics**: Aggregated statistics including total questions, attempts, correct/incorrect answers, first-try rate, and correct rate
- **Attempt distribution**: Breakdown of questions by number of attempts required (1, 2, or 3+)
- **Filtering support**: All statistics can be filtered by attempt type while maintaining accurate calculations

### Type Safety with Zod

All data structures are validated using Zod schemas, ensuring:

- Submission data matches expected structure
- Statistics calculations produce valid results
- Type inference throughout the application
- Runtime validation for data integrity

Zod is technically not necessary, however if I was recieving data from an API i would use it,
so I implemented it to show how i would structure my schemas and typing.
