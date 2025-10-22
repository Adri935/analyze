// Fetch and display the results
async function loadResults() {
    try {
        const response = await fetch('result.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Display summary
        const summaryContent = document.getElementById('summary-content');
        summaryContent.innerHTML = `
            <div class="metric-card">
                <div class="metric-value">${data.row_count}</div>
                <div class="metric-label">Total Rows</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${data.regions}</div>
                <div class="metric-label">Regions</div>
            </div>
        `;
        
        // Display top products
        const topProductsContent = document.getElementById('top-products-content');
        let topProductsHTML = '<table><thead><tr><th>Product</th><th>Revenue</th></tr></thead><tbody>';
        data.top_n_products_by_revenue.forEach(item => {
            topProductsHTML += `<tr><td>${item.product}</td><td>$${item.revenue.toLocaleString(undefined, {maximumFractionDigits: 2})}</td></tr>`;
        });
        topProductsHTML += '</tbody></table>';
        topProductsContent.innerHTML = topProductsHTML;
        
        // Display rolling revenue
        const rollingRevenueContent = document.getElementById('rolling-revenue-content');
        let rollingRevenueHTML = '<dl>';
        for (const [region, revenue] of Object.entries(data.rolling_7d_revenue_by_region)) {
            rollingRevenueHTML += `<dt>${region}</dt><dd>$${revenue.toLocaleString(undefined, {maximumFractionDigits: 2})}</dd>`;
        }
        rollingRevenueHTML += '</dl>';
        rollingRevenueContent.innerHTML = rollingRevenueHTML;
    } catch (error) {
        console.error('Error loading results:', error);
        document.getElementById('summary-content').innerHTML = '<p>Error loading data. Please check the console for details.</p>';
        document.getElementById('top-products-content').innerHTML = '<p>Error loading data.</p>';
        document.getElementById('rolling-revenue-content').innerHTML = '<p>Error loading data.</p>';
    }
}

// Load results when the page loads
document.addEventListener('DOMContentLoaded', loadResults);