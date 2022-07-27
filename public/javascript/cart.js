async function deleteItemCart(event) {
    // event.preventDefault();
    // console.log(event.target, event.target.dataset);
    if (event.target.dataset.product_id) {
        event.preventDefault();

        const product_id = event.target.dataset.product_id;

        try {
            const response = await fetch(`/api/cart/${product_id}`, {
                method: 'DELETE'
            });

            // check response status
            if (response.ok) {
                document.location.reload();
            } else {
                alert(response.statusText);
            }
        } catch (error) {
            alert(error);
        }
    }
}

document.querySelector('#checkout').addEventListener('click',deleteItemCart);