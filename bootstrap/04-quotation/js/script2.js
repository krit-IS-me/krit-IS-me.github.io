// Product data loaded from data.json
let products = [];
let tableItems = [];
const VAT_RATE = 0.07;

// Load products from data.json
$(document).ready(function() {
    $.getJSON('data/data.json', function(data) {
        products = data;
        populateProductSelect();
    });

    // Open modal on Add Item button
    $('#btnAdd').click(function() {
        $('#modalError').text('');
        $('#productSelect').val('');
        $('#productQty').val(1);
        $('#exampleModal').modal('show');
    });

    // Handle form submit
    $('#addProductForm').submit(function(e) {
        e.preventDefault();
        const prodIdx = $('#productSelect').val();
        const qty = parseFloat($('#productQty').val());
        if (prodIdx === '' || isNaN(qty) || qty <= 0) {
            $('#modalError').text('Please select a product and enter a valid quantity.');
            return;
        }
        const product = products[prodIdx];
        addItemToTable(product, qty);
        $('#exampleModal').modal('hide');
    });

    // Delegate delete button click
    $('#dataTable').on('click', '.btn-delete', function() {
        const idx = $(this).data('idx');
        tableItems.splice(idx, 1);
        renderTable();
    });
});

function populateProductSelect() {
    const $select = $('#productSelect');
    $select.empty();
    $select.append('<option value="">Select a product</option>');
    products.forEach((p, i) => {
        $select.append(`<option value="${i}">${p.description} ($${p.unitPrice})</option>`);
    });
}

function addItemToTable(product, qty) {
    // Check if already in table (by description)
    const existingIdx = tableItems.findIndex(item => item.description === product.description);
    if (existingIdx !== -1) {
        // If exists, just increase quantity
        tableItems[existingIdx].quantity += qty;
    } else {
        tableItems.push({
            quantity: qty,
            description: product.description,
            unitPrice: product.unitPrice
        });
    }
    renderTable();
}

function renderTable() {
    const $tbody = $('#dataTable');
    $tbody.empty();
    let subtotal = 0;
    tableItems.forEach((item, idx) => {
        const amount = item.quantity * item.unitPrice;
        subtotal += amount;
        $tbody.append(`
            <tr>
                <td class="data">${item.quantity}</td>
                <td class="data">${item.description}</td>
                <td class="data">${item.unitPrice.toFixed(2)}</td>
                <td class="data">${amount.toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm btn-delete" data-idx="${idx}">Delete</button></td>
            </tr>
        `);
    });
    // Update totals
    const vat = subtotal * VAT_RATE;
    const total = subtotal + vat;
    // Find the subtotal, vat, and total cells in the table and update
    $("#sub-total td:last").text(subtotal.toFixed(2));
    $("tr:contains('Vat') td:last").text(vat.toFixed(2));
    $("tr:contains('Total Due') td:last").text(total.toFixed(2));
} 