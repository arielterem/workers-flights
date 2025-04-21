# Workers Flights Viewer

An Angular-based (version 19) application that displays flight information for system workers.  
Presents detailed flight schedules and flight information for selected workers.

## ✈️ Application Overview

The application is divided into three main sections:

1. **Workers List**  
   A list of all workers in the system. Clicking on a worker's name loads their flight information.

2. **Flights Table**  
   Displays all flights related to the selected worker with the following columns:
   - **Flight Number**
   - **Origin**
   - **Origin Date**
   - **Destination**
   - **Destination Date**  
   The table updates every 1 minute for the currently selected worker. Selecting a different worker resets the timer.

3. **Flight Information Panel**  
   Displays additional details of the selected flight:
   - **Plane Number**
   - **Duration of the Flight** (formatted via a custom pipe, e.g., `350` ➔ `5h 50m`)
   - **Origin Gate**
   - **Destination Gate**  
   The first row in the flight table is selected by default, displaying its flight information automatically.

## 🛠️ Technologies Used

- **Angular 19**
- **Angular Material**
- **Bootstrap**
- **PrimeIcons**

These libraries were used to enhance the UI and improve user interaction.

## 🚀 Getting Started

### Prerequisites

Ensure you have Angular CLI and Node.js installed.

### Installation

```bash
npm install
```

### Running the App

Start the development server:

```bash
ng serve
```

By default, the application runs on:

```
http://localhost:4200/
```

### Proxy Configuration for API

> **Note:** The application uses a proxy configuration for `/api` requests during development to avoid CORS issues. This setup allows seamless communication with the backend API without requiring CORS headers.

## 👨‍💻 Developer

**Ariel Terem**  
📧 arielterem@gmail.com  
🔗 [GitHub Profile](https://github.com/arielterem)

---

Feel free to contribute!
