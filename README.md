# Customer Portal UI

React frontend for the Customer Portal — displays and manages customer data sourced from the [Customer Service API](../customer-service-api).

## Tech Stack

- React 18
- React Router v6
- Axios
- Functional components + Hooks

## Pages

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Dashboard` | Metric cards: Total / Active / Premium customers |
| `/customers` | `CustomersPage` | Searchable customer list with status badges |
| `/add` | `AddCustomerPage` | Form to create a new customer |

## Components

| Component | Description |
|-----------|-------------|
| `StatusBadge` | Colour-coded badge for ACTIVE / INACTIVE / PREMIUM |
| `CustomerTable` | Filterable table of customers |

## Folder Structure

```
src/
├── pages/
│   ├── Dashboard.jsx
│   ├── CustomersPage.jsx
│   └── AddCustomerPage.jsx
├── components/
│   ├── StatusBadge.jsx
│   └── CustomerTable.jsx
├── services/
│   └── customerApi.js
├── models/
│   ├── Customer.js
│   └── mockCustomers.js
├── hooks/
│   └── useCustomers.js
└── App.jsx
```

## Running Locally

```bash
npm install
npm start
```

App: `http://localhost:3000`

Set `REACT_APP_API_URL` to point at the backend (default: `http://localhost:5000`).

## Shared Business Rules

Status values, badge colours, and validation rules are derived from the [shared-business-rules](../shared-business-rules) reference repository.
