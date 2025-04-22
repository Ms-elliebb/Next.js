# Next.js Projects Repository

Here I share web development projects built with Next.js and React. This collection includes server-side rendered (SSR) applications, static websites (SSG), API routes, and modern frontend implementations utilizing the power of the Next.js framework.

## Planned Projects

### 1. AI Text Tool
*   **Concept:** A web tool utilizing an external AI API for text generation/manipulation.
*   **Features:**
    *   Integration with an external AI API (e.g., OpenAI) via Next.js API Routes.
    *   Secure management of API keys.
    *   Handling of loading and error states for API calls.

### 2. Data Visualization Dashboard
*   **Concept:** A dashboard displaying data from an external source, potentially financial data.
*   **Features:**
    *   Fetching data from an external API (e.g., a financial API like CoinGecko).
    *   Optimized performance using Server-Side Rendering (SSR) or Incremental Static Regeneration (ISR).
    *   Interactive charts using libraries like `Recharts` or `Chart.js`.
    *   Data filtering capabilities.

### 3. Headless CMS Blog/Portfolio
*   **Concept:** A blog or portfolio website powered by a headless CMS.
*   **Features:**
    *   Integration with a chosen Headless CMS (e.g., Strapi, Sanity, Contentful).
    *   Content delivery using Static Site Generation (SSG) or ISR for performance and scalability.
    *   Rendering content written in Markdown.
    *   Image optimization using `next/image`.

*Note: The `.gitkeep` file in the root is a placeholder to ensure the main directory is tracked by Git, even when initially empty.*

# AI Text Tool

A web application built with Next.js and React that utilizes an external AI API for various text generation and manipulation tasks. This project serves as a portfolio piece demonstrating full-stack development capabilities with Next.js, including API integration, secure key management, and asynchronous operation handling.

## Screenshot

![AI Text Tool Screenshot](public/screenshot.png)

## Features

*   **External AI API Integration:** Connects to services like OpenAI via Next.js API Routes for powerful text processing.
*   **Secure API Key Management:** Implements secure handling of sensitive API credentials.
*   **Asynchronous State Handling:** Manages loading and error states effectively during API calls for a smooth user experience.
*   **Responsive UI:** Built with React for a modern and interactive user interface.

## Technologies Used

*   **Framework:** Next.js
*   **Library:** React
*   **API:** [Specify the AI API used, e.g., OpenAI API]
*   **Styling:** [Specify styling solution, e.g., Tailwind CSS, CSS Modules]

## Getting Started

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone [your-repository-link]
    cd ai-text-tool
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add your AI API key:
    ```
    AI_API_KEY=your_api_key_here
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

[Briefly describe how to use the tool, e.g., Enter text into the input field, select an operation, and click the button to get the AI-generated result.] 