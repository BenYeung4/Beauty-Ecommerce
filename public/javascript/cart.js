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
            document.location.replace('/user');
        } else {
            alert(response.statusText);
        }
    } catch (error) {
        alert(error);
    }
}

// let btnHeart = document.querySelector('#Like');
// btnHeart.addEventListener(
//     'click',
//     () => (btnHeart.style.backgroundColor = 'red')
// );

document.querySelector('#delete').addEventListener('click', deleteFormHandler);
