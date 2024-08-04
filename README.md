# Japan Dahwa Foundation Application Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Project Setup](#project-setup)
3. [Environment Variables](#environment-variables)
4. [Deployment](#develop)

## Introduction

This documentation provides an overview of the Japan Dahwa Foundation application built with Next.js. It covers project setup, environment variables, state management with Redux Toolkit, components, API integration, and deployment.

## Project Setup

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/japanmuslim/jdf-next-app.git
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Start the Development Server:**
    ```bash
    npm run dev
    ```

## Environment Variables

Create a `.env.local` file in the root of the project and add the necessary environment variables:

### Development

```env
NEXT_PUBLIC_APP_NAME="Japan Dahwa Foundation"
NEXT_PUBLIC_APP_DESCRIPTION="Japan Dahwa Foundation is a non-profit organization that aims to promote the teachings of the Islam in Japan."
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_BASE_URL="http://localhost:3000/"
NEXT_PUBLIC_API_URL="https://admin.xn--eckzbvg9a.jp/api/v1/"
NEXT_PUBLIC_APP_AUTHOR="Megan"
NODE_ENV="development"
```

## Develop Project

1. Build Project
```
npm run build
```
2. Develop Project
```
npm run dev
```



