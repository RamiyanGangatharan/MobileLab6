const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

app.get('/blog', (req, res) => {
    const jsonPath = path.join(__dirname, 'src', 'blogpost', 'data.json');
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    // Pagination logic
    const pageSize = 3; // Number of items per page
    const currentPage = parseInt(req.query.page) || 1; // Get current page from query parameter
    const totalItems = data.data.length; // Total items
    const totalPages = Math.ceil(totalItems / pageSize); // Total pages
    const start = (currentPage - 1) * pageSize; // Start index
    const end = start + pageSize; // End index
    const paginatedItems = data.data.slice(start, end); // Get paginated items

    // Render the view with pagination data
    res.render('blog', {
        pagination: {
            items: paginatedItems,
            currentPage: currentPage,
            totalPages: totalPages,
            hasPreviousPage: currentPage > 1,
            hasNextPage: currentPage < totalPages,
            previousPage: currentPage - 1,
            nextPage: currentPage + 1
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
