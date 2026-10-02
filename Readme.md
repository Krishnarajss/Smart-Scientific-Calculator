# Smart Scientific Calculator

## Project Overview
The **Smart Scientific Calculator** is a full-stack web application engineered following an **Incremental Software Development Model**. The architecture cleanly separates the core calculation logic, user interface presentation, input control, error handling, and database persistence layers.

---

## Incremental Development Life Cycle

### Iteration 1: Basic Calculation (UN-01)
* **Features:** Core arithmetic computations (`+`, `-`, `*`, `/`), basic percentages (`%`), screen clearing (`AC`), and backspace character deletion (`DEL`).
* **Implementation Code Tag:** `// Iteration 1: start1` to `// Iteration 1: end1`

### Iteration 2 & 3: Advanced & Scientific Calculation (UN-02 & UN-03)
* **Features:** Advanced power scaling (`x^y`) and scientific operations including square root (`√`), sine (`sin`), and cosine (`cos`).
* **Implementation Code Tag:** `// Iteration 2 & 3: start2_3` to `// Iteration 2 & 3: end2_3`

### Iteration 4: Error Handling (UN-04)
* **Features:** Graceful runtime exception catching that intercepts division by zero, invalid mathematical domains (e.g., negative square roots), and syntax errors, returning a clean "Error" screen output instead of crashing.
* **Implementation Code Tag:** `// Iteration 4: start4` to `// Iteration 4: end4`

### Iteration 5: Easy Interaction (UN-05)
* **Features:** Responsive grid-based user interface layout, real-time expression rendering, and immediate visual touch feedback for clear readability.
* **Implementation Code Tag:** `// Iteration 5: start5` to `// Iteration 5: end5`

### Iteration 6: Calculation History & Database Integration (UN-06)
* **Features:** Backend server built with **Node.js** and **Express**, paired with a **MongoDB** database via **Mongoose** to permanently store and retrieve past calculation logs.
* **Implementation Code Tag:** `// Iteration 6: start6` to `// Iteration 6: end6`

---

## Project Directory Structure
```text
Smart-Scientific-Calculator/
│
├── server.js             # Iteration 6: Backend server & MongoDB connection
├── package.json          # Node.js dependencies configuration
└── public/               # Frontend directory
    ├── index.html        # Main markup structure
    ├── style.css         # UI stylesheet
    └── script.js         # Frontend controller and DB API requests