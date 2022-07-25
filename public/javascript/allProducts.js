// create new product
async function allProductsFormHandler(event) {
    event.preventDefault();

    const product_name = document.querySelector('#product-name').value;
    const product_image = document.querySelector('#product-image');
    const select = document.querySelector('#product-choice');
    const product_choice = select.options[select.selectedIndex].text;
    const product_description = document.querySelector(
        '#product-description'
    ).value;
    const product_manufacturer = document.querySelector(
        '#product-manufacturer'
    ).value;
    const product_stock = document.querySelector('#product-stock').value;
    const product_price = document.querySelector('#product-price').value;
    const product_weight = document.querySelector('#product-weight').value;
    const product_form = document.querySelector('.allProducts-product-form');

    const product_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(product_image.files[0]);

    const formData = new FormData();
    formData.append('product_id', product_id);
    formData.append('product_name', product_name);
    // If there is a new file, change the url (filename) and submit the image for upload
    if (product_image.files.length > 0) {
        formData.append('product_url', product_image.files[0].name);
        formData.append('product_image', product_image.files[0]);
    }
    formData.append('product_choice', product_choice);
    formData.append('product_description', product_description);
    formData.append('product_manufacturer', product_manufacturer);
    formData.append('product_stock', product_stock);
    formData.append('product_price', product_price);
    formData.append('product_weight', product_weight);

    try {
        const response = await fetch(`/api/products/${product_id}`, {
            method: 'POST',
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

document
    .querySelector('.allProducts-product-form')
    .addEventListener('submit', editFormHandler);
