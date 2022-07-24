// edit this post
async function editFormHandler(event) {
    event.preventDefault();

    const product_name = document.querySelector('#product-name').value;
    const product_image = document.querySelector('#product-image').value;
    const product_description = document.querySelector('#product-description').value;
    const product_manufacturer = document.querySelector('#product-manufacturer').value;
    const product_stock = document.querySelector('#product-stock').value;
    const product_price = document.querySelector('#product-price').value;
    const product_weight = document.querySelector('#product-weight').value;


    const product_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    try {
        const response = await fetch(`/api/products/${product_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: product_name,
                description: product_description,
                manufacturer: product_manufacturer,
                stock: product_stock,
                price: product_price,
                weight: product_weight
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // check response status
        if (response.ok) {
            document.location.replace('/admin');
        } else {
            alert(response.statusText);
        }
    } catch (error) {
        alert(error);
    }
}

// delete this product
async function deleteFormHandler(event) {
    event.preventDefault();

    const product_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    try {
        const response = await fetch(`/api/products/${product_id}`, {
            method: 'DELETE',
        });

        // check the response status
        if (response.ok) {
            document.location.replace('/admin');
        } else {
            alert(response.statusText);
        }
    } catch (error) {
        alert(error);
    }
}

document
    .querySelector('.edit-post-form')
    .addEventListener('submit', editFormHandler);
document.querySelector('#delete').addEventListener('click', deleteFormHandler);
