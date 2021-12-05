# Scope

This document includes complete documentation of currently used data model inside the Assistant application.

# Justification

Useful for understaning the project.

# Data Models

## Budget

Budget is a part of assistant app, which helps users track their money and enabling them optimize money management by giving them insight based on data they previously added to the app.

### Income

When you make money, you input it as an Income.

Fields:
- Date: Date
- Source: string
- Destination: PaymentMethod
- Amount: float(2)
- Currency: string

### Expense (deprecated, migration to new expense ongoing)

When you spend money, you input it as a Expenses.

- Category: string
- Subcategory: string
- Product: string
- Price: float(2)
- Currency: string
- Payment method (source): string
- Date: Date
- Vendor Type: string
- Vendor: string
- Location: string

### Loans

When you take a Loan or Loan somebody your money, you input it as a Loan.

- Lender: string
- Borrower: string
- Amount: float(2)
- Currency: string
- Account: PaymentMethod
- Date: Date
- Due: Date
- Description: string

### Inner Transfers

When you transfer money between your accounts, you input an Inner Transfer.

- TransferDate: Date
- Source: PaymentMethod
- Source amount: float(2)
- Source currency: string
- Destination: PaymentMethod
- Destination amount: float(2)
- Destination currency: currency_id
- Reason: string

### Bill

- Location_id: string
- Vendor_id: string
- Date: Date
- PaymentMethod_id: string
- Currency_id: string
- Expenses: string[]

### Vendor
- ID: string
- Name: string
- TypeId: string 

### VendorType
- ID: string
- Name: string

### Location
- ID: string
- Country: string
- City: string

### Currency
- ID: string
- Name: string

### PaymentMethod
- ID: string
- Name: string

### NewExpense
- Product: Product_id
- Price: float(2)

### Product
- ID
- Category_id
- Subcategory_id
- Name

### Category
- ID: string
- Name: string
- Labels: string[]

