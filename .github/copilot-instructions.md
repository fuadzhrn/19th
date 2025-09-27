# Copilot Instructions for AI Coding Agents

## Project Overview
This codebase is a static web application mimicking a Netflix-like interface. It consists of two main UI components:
- **loading_screen/**: Contains the initial loading screen logic and styles.
- **netflix/**: Contains the main app UI, including home and login pages, styles, and user assets.

## Key Directories & Files
- `index.html`: Entry point, likely routes to main UI components.
- `loading_screen/app.js` & `style.css`: Handles loading animation and its appearance.
- `netflix/home.html`, `login.html`, `home.css`, `style.css`: Main app pages and their styles.
- `netflix/asset/`: User and logo images for UI personalization.

## Architecture & Data Flow
- No backend or API integration detected; all logic is client-side JavaScript and static assets.
- Navigation is likely handled via HTML links or JavaScript events.
- User selection and login are simulated using static images and pages.

## Developer Workflow
- **No build tools or package managers detected.**
  - Directly edit HTML, CSS, and JS files.
  - No test framework or scripts present.
- **Debugging:**
  - Use browser dev tools for inspecting UI and JS errors.
  - Refresh browser to see changes.

## Project-Specific Patterns
- **Asset Management:**
  - All images are stored in `netflix/asset/` and referenced by relative paths in HTML/CSS.
- **Styling:**
  - Each major UI component has its own CSS file.
  - Shared styles may exist in `netflix/style.css`.
- **JavaScript:**
  - Only `loading_screen/app.js` detected; main app pages do not appear to use JS.

## Integration Points
- No external libraries, frameworks, or APIs detected.
- All dependencies are local static files.

## Example Patterns
- To add a new user avatar, place the image in `netflix/asset/` and update the relevant HTML page.
- To change the loading animation, edit `loading_screen/app.js` and `style.css`.
- To update the home page UI, modify `netflix/home.html` and `home.css`.

## Conventions
- Use relative paths for all asset references.
- Keep UI logic in the corresponding directory (e.g., loading logic in `loading_screen/`).
- Maintain separation between loading and main app UI components.

---
**If you discover new workflows, build steps, or integration points, update this file to keep instructions current.**
