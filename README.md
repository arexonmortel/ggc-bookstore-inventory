# GGC BOOKSTORE INVENTORY

Welcome to the GGC Bookstore Inventory!

This inventory system allows you to manage books available for sale from various publishers associated with the Garcia Group of Companies (GGC). Currently, the following publishers are part of our inventory:

- **Merryland Publishing Corporation (MPC):** Offers story books (small and medium) and SciLINKS (TIMSS-Based Learning Materials) for Secondary Level.
- **B2G2:** Provides SciENERGY (TIMSS-Based Learning Materials), Math Modules, Activity/Workbook, and pre-elementary books for Elementary Level.
- **Jedigar Interprises, Inc:** Specializes in WORKBOOKS.

## Features

The GGC Bookstore Inventory system provides the following features:

1. **Create Books:** Add new books to the inventory, specifying details such as title, author, genre, publisher, approved by, educational level, publication year, ISBN, book size, number of pages, and availability.
   
2. **Update Books:** Modify existing book entries, including updating any of the details mentioned above.

3. **Delete Books:** Remove books from the inventory that are no longer available for sale.

4. **Get Book/Books:** Retrieve information about specific books or a list of all books available in the inventory.

## Usage

To interact with the GGC Bookstore Inventory, you can make use of the provided API endpoints. Here's a brief overview of how to use each feature:

- **Create Book:**
  - Endpoint: `/books/create`
  - Request Type: POST
  - Parameters: JSON object containing book details
  - Example: `POST /books/create` with JSON body `{ "title": "Sample Book", "author": "John Doe", ... }`

- **Update Book:**
  - Endpoint: `/books/update/:id`
  - Request Type: PUT
  - Parameters: Book ID in the URL path, JSON object containing updated book details
  - Example: `PUT /books/update/123` with JSON body `{ "title": "Updated Book Title", ... }`

- **Delete Book:**
  - Endpoint: `/books/delete/:id`
  - Request Type: DELETE
  - Parameters: Book ID in the URL path
  - Example: `DELETE /books/delete/123`

- **Get Book/Books:**
  - Endpoint: `/books/:id` (for a specific book) or `/books` (for all books)
  - Request Type: GET
  - Parameters: Book ID (for specific book) or none (for all books)
  - Example: `
