async function checkOutCart(event) {
    event.preventDefault();

    const product_quantity = document.querySelector('#quantity').value;
    const product_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    try {
        const response = await fetch(`/api/checkout-cart/${product_id}`, {
            method: 'POST',
            body: JSON.stringify({ quantity: product_quantity }),
            headers: { 'Content-Type': 'application/json' },
        });

        // check response status
        if (response.ok) {
            alert('Checkout Complete!');
        } else {
            alert(response.statusText);
        }
    } catch (error) {
        alert(error);
    }
}

document
    .querySelector('.checkout-cart')
    .addEventListener('submit', checkOutCart);
