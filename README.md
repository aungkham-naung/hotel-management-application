# Hotel Management Application

## Overview

This application is designed for hotel employees to manage cabins, bookings, and guest information. Built with React and styled using Styled Components, it integrates Supabase for backend services, React Query for data handling, React Router for navigation, and Recharts for data visualization.

## Deployment

The app is deployed and accessible at [https://hotel-management-application-mu.vercel.app/](https://hotel-management-application-mu.vercel.app/) -- Login Credential has been preset for testing purposes.

## Features

- **User Authentication**:

1. Hotel employees log in to access the application.
2. Only in-app sign-up, ensuring only employees gain access.
3. Users can update their profile with an avatar, and change their name and password.

- **Cabin Management**:

1. View all cabins with relevant details: photo, name, capacity, price, and any current discounts.
2. Create, update, or delete cabins, including photo uploads for new entries.

- **Booking Management**:

1. View all bookings with essential data: arrival/departure dates, status, paid amount, cabin, and guest details.
2. Filter bookings by status ("unconfirmed," "checked in," or "checked out").
3. Manage booking actions: delete, check in, or check out, with payment confirmation required on check-in.

- **Dashboard**:

1. Overview of guests checking in/out for the current day with quick check-in/out options.
2. Key statistics on recent bookings, sales, check-ins, and occupancy rates.
3. Charts for daily sales (with breakdown of "total" and "extras" sales) and average stay duration.

- **App Settings**:

1. Configurable settings: breakfast price, min/max nights per booking, and max guests per booking.

## Technology Stack

- **Front-End**: React with Styled Components for styling

- **Back-End**: Supabase for database and authentication

- **State & Data Management**: React Query

- **Routing**: React Router

- **Data Visualization**:
  Data Visualization: Recharts

## Project Structure

```plaintext
hotel-management-application/
│
├── index.html                   # Root HTML file for the app
├── node_modules                 # Installed dependencies (auto-generated)
├── package-lock.json            # Locks dependencies to specific versions
├── package.json                 # Project metadata, scripts, and dependencies
├── README.md                    # Project documentation
├── dist                         # Build output folder for production (auto-generated)
├── vite.config.js               # Configuration file for Vite (build tool)
├── public/                      # Public assets available to the app
│   ├── default-user.jpg
│   ├── logo-dark.png
│   └── logo-light.png
└── src/                         # Main source code for the application
│   ├── App.jsx                  # Main app component, sets up app routes
│   ├── main.jsx                 # Entry point for React, renders the app
│   └── data/                    # Static or mock data for testing
|        ├----
│   ├── features/                # Components for the "featured" functionality
|        ├----
│   ├── hooks/                   # Reusable Custom React hooks
|        ├----
│   └── pages/                   # Top-level pages & layout for the application
|        ├----
│   ├── services/                # API calls and Supabase integration
|        ├----
│   ├── styles/                  # Global and theme styles
|        ├----
│   └── ui/                      # Reusable UI components
|        ├----
│   ├── utils                    # Utility functions for the app
        ├----
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
