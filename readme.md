# xkcd Web Comic Viewer : https://xkcd-web-ef3c3a00da2f.herokuapp.com

## Overview
The xkcd Web Comic Viewer is a web application that allows users to view and navigate through xkcd comic strips using the xkcd API. This project is built with React for the frontend and Node.js with Express for the backend.

## Features
- **Latest Comic**: The homepage displays the latest xkcd comic.
- **Single Comic View**: Each comic strip is displayed on its own page.
- **Navigation**: Buttons to navigate to the previous and next comic strips.
- **Specific Comic Access**: Navigate directly to a comic by entering its number in the URL.
- **Comic Details**: Displays the creation date of each comic strip.
- **Readable Transcripts**: Parses and formats comic transcripts for better readability.
- **Vanilla CSS**: All styling is done using vanilla CSS (no CSS frameworks).
- **Bonus Features**:
  - A random button that navigates to a random comic strip.
  - Responsive design for optimal viewing on various devices.
  - View counter for each comic strip, tracking how many times it has been viewed.

## Technologies Used
- React.js
- Node.js
- Express
- Axios for API calls
- CSS for styling

## Project Structure

```plaintext
xkcd-web/
├── client/               # React frontend
├── server.js             # Express server
├── package.json          # Node dependencies and scripts
└── README.md             # Project documentation
```

## Steps to run locally

1. **Clone the repository:**

    ```bash
    git clone https://github.com/nipunh/xkcd-web.git
    cd xkcd-web
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

## Running the Application Locally

1. **Start the development server:**

    ```bash
    npm start
    ```

2. Open your browser and navigate to `http://localhost:8080` to see the application in action.