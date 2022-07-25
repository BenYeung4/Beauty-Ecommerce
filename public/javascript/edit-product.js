// edit this post
async function editFormHandler(event) {
    event.preventDefault();

    const product_name = document.querySelector('#product-name').value;
    const product_image = document.querySelector('#product-image');
    const product_description = document.querySelector('#product-description').value;
    const product_manufacturer = document.querySelector('#product-manufacturer').value;
    const product_stock = document.querySelector('#product-stock').value;
    const product_price = document.querySelector('#product-price').value;
    const product_weight = document.querySelector('#product-weight').value;
    const product_form = document.querySelector('.edit-post-form');


    const product_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(product_image.files[0]);

    const formData = new FormData();
    formData.append('product_id', product_id);
    formData.append('product_name', product_name);
    // If there is a new file, change the url (filename) and submit the image for upload
    if (product_image.files.length>0) {
        formData.append('product_url', product_image.files[0].name);    
        formData.append('product_image', product_image.files[0]);
    } else {
        // product-url is a hidden value, contains the previous filename as /images/filename.jpg
        const product_url = document.querySelector('#product-url').value;
        if (product_url.includes('/')) {
            // set product_url to the old filename
            formData.append('product_url', product_url.split('/')[2]);
        }
    }
    formData.append('product_description', product_description);
    formData.append('product_manufacturer', product_manufacturer);
    formData.append('product_stock', product_stock);
    formData.append('product_price', product_price);
    formData.append('product_weight', product_weight);

    try {
        const response = await fetch(`/api/products/${product_id}`, {
            method: 'PUT',
            body: formData,
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

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
document.querySelector('#delete').addEventListener('click', deleteFormHandler);