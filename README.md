# Azure Chalet Romandie - GitHub Copilot Challenge

## Pre-requisites

### Preliminary note

> [!IMPORTANT]
> **Avoid using your corporate GitHub accounts** for this challenge as you will need to submit a public URL to your GitHub Pages to participate.

### Getting Started Checklist

1. ✅ Use your existing GitHub account with an active GitHub Subscription or use [Copilot Free plan](https://github.com/github-copilot/signup) (no credit card required!)
2. ✅That's it! The challenge can be achieved on github.com. _Alternatively_ you can also:
   1. ☑️ Download and install VS Code for your platform
   2. ☑️ Install additional components (Git, Node.js, language runtimes)
   3. ☑️ Enable AI features and sign in to GitHub Copilot
   4. ☑️ Explore Copilot Chat and inline chat features

See below for the alternative steps:

<details>
<summary>📥 Setup Steps (click to expand)</summary>

### Step 1: Download and Install VS Code

Follow the official [VS Code Setup Guide](https://code.visualstudio.com/docs/setup/setup-overview) for detailed platform-specific instructions.

Download and install Visual Studio Code for your platform:

- [macOS](https://code.visualstudio.com/docs/setup/mac)
- [Linux](https://code.visualstudio.com/docs/setup/linux)
- [Windows](https://code.visualstudio.com/docs/setup/windows)

VS Code is lightweight (< 200 MB download) and ships monthly releases with auto-update support.

> **Note:** If you choose to use VS Code Insiders, you will have access to the latest features but you may encounter occasional instability.

### Step 2: Enable AI Features with GitHub Copilot

Follow the [Copilot Setup Guide](https://code.visualstudio.com/docs/copilot/setup) to enable AI-powered coding:

1. Hover over the **Copilot icon** in the Status Bar and select **Use AI Features**
2. Choose a sign-in method and follow the prompts
3. If you don't have a Copilot subscription, you'll be signed up for the [Copilot Free plan](https://github.com/github-copilot/signup) with a monthly limit of inline suggestions and chat interactions
4. Start using Copilot in VS Code!

Learn more about [GitHub Copilot plans](https://docs.github.com/en/copilot/get-started/plans).

### Step 3: Install Additional Components

> [!TIP]
> **Pro-tip**: Now that GitHub Copilot is enabled in your Visual Studio Code you can go to the Copilot chat in agent mode and ask Copilot to install dependencies for you.

Install development tools based on your project needs:

- [Git](https://git-scm.com/) for version control
- [Node.js](https://nodejs.org/) for JavaScript/TypeScript development
- Language runtimes for Python, Java, Go, or other languages you plan to use

See the full list of [additional components](https://code.visualstudio.com/docs/setup/additional-components).

### Step 4 (optional): Install VS Code Extensions

Customize VS Code with extensions from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/VSCode):

- Formatters
- Language extensions and debuggers
- Tools for your favorite frameworks

</details>

## Challenge

The challenge consists in creating an application with the following requirements:

- REQ01: The application is a "meteo" des neiges application that displays weather information for skiing resorts in the Geneva region (e.g. Chamonix, Verbier, Zermatt, etc.)
- REQ02: The application is a static web application
- REQ03: The application is automatically deployed in GitHub Pages
- REQ04: Deployment to the GitHub Pages associated with the repository must happen automatically upon push in the `main` branch
- REQ05: The application must have a responsive design that works on both desktop and mobile devices, use visual indicators (icons or images) for weather conditions, and organize resort information in a clear, scannable layout (e.g., cards or a dashboard grid).
- REQ06: The application must be built securely following best practices for web application development
- REQ07: The application must use publicly available APIs to retrieve weather data

There are several ways to interact with GitHub Copilot to build the application.

### Use Copilot Coding Agent (recommended if you have a GitHub Copilot subscription)

The Copilot Coding Agent is a powerful tool that can write code for you following your specification. Click on the "Copilot" icon next to the green "<> Code" icon (only available in paying GitHub Copilot subscriptions).

### Use Copilot in Visual Studio Code in Codespaces (recommended if you have GitHub Copilot Free)

You can can of course install Visual Studio Code locally and use GitHub Copilot there, but for the sake o time and simplicity, we recommend using GitHub Codespaces which provides a fully cloud-based development environment with GitHub Copilot enabled out of the box.

> [!IMPORTANT]
> If you have a GitHub Copilot Free Subscription use the Claude Haiku model (click on the "Add Models" dropdown at the bottom right of the Copilot Chat pane and when the models are available select "Claude Haiku 4.5"). Use the "Agent" mode.

### Use Copilot CLI

An alternative that works for both GitHub Copilot Free and paying users is the Copilot CLI which allows you to interact with GitHub Copilot from the command line. 

Install it by following those instructions: https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli

## Challenge submission

To submit your challenge got to https://github.com/dbroeglin/ghcp-car-challenge-judge/issues and submit a new issue. Share the sfollowing information:

- A name (or nickname) to identity the submitter
- The URL to your GitHub repository containing the code for your application
- The URL to the GitHub Pages where your application is deployed.

Make sure that both URLs are publicly accessible.
