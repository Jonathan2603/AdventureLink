# AdventureLink

A platform designed to enhance the travel planning experience by connecting like-minded adventurers. This project goes beyond simple itinerary creation by aiming to build a community among travelers.

## Table of Contents
- [Description](#description)
- [Motivation](#motivation)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contact](#contact)

## Description
AdventureLink is a web application that provides users with a seamless and intuitive travel planning experience. It allows users to register, search destinations, generate itineraries, and connect with other travelers through messages based on shared travel interests.

## Motivation
The concept of AdventureLink was sparked by the desire for a more connected travel planning experience. It aims to facilitate connections between potential travel companions before the journey begins, rather than relying on chance encounters.

## Installation
To get a local copy up and running, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/AdventureLink.git
    ```

2. Navigate to the project directory:
    ```bash
    cd AdventureLink
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage
To start the development server:
```bash
npm start
```

Open http://localhost:3000 in your browser to view the application.

## Features

- Interactive Maps: Explore locations using interactive maps.
- User Profiles: Manage personal profiles and track adventures.
- Social Sharing: Share experiences with friends.
- Event Scheduling: Schedule and join events.
- Itinerary Generator: Generate personalised travel plans based on preferences.

## Technical Overview

### User Authentication

User authentication is handled using JWT for secure sessions and bcrypt for password hashing. The backend verifies tokens to ensure authorised access.

### Redux State Management

The frontend uses Redux for state management. The userSlice.js handles user authentication states, while itinerarySlice.js manages itinerary data. This setup ensures predictable state updates and easier debugging.

### Itinerary Generation

Users can input travel preferences in ItineraryForm.js. The backend processes this data in itinerary.js, using algorithms to generate customised itineraries.

### Backend and Code Structure

The backend endpoints handle requests and send responses utilised by the frontend. Key files include:

- auth.js: Manages user authentication.
- itinerary.js: Handles itinerary generation logic.

### Redux Store Configuration

The Redux store, defined in store.js, integrates various slices of state, using middleware and enhancers for asynchronous actions and debugging.

## Contact

If you have any questions or suggestions, feel free to reach out:

- Jonathan Nazareth
- Email: jgnazareth26@gmail.com
- LinkedIn: https://www.linkedin.com/in/jonathan-nazareth/
- GitHub: https://github.com/Jonathan2603

Thank you for using AdventureLink! I hope you enjoy exploring new adventures with this application.

