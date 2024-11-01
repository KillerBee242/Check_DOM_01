document.addEventListener('DOMContentLoaded', function() {

    // Sélection des éléments nécessaires
    const plusBtns = document.querySelectorAll('.plus-btn');
    const minusBtns = document.querySelectorAll('.minus-btn');
    const deleteBtns = document.querySelectorAll('.delete-btn');
    const likeBtns = document.querySelectorAll('.like-btn');
    const totalPriceElement = document.getElementById('total-price'); // Élément du total général

    // Fonction de calcul du total global du panier
    function calculateTotal() {
        let sum = 0;
        const cartItems = document.querySelectorAll('.cart-item');

        cartItems.forEach(item => {
            const unitPrice = parseFloat(item.querySelector('.price').getAttribute('data-unit-price')); // Prix unitaire
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            const itemTotal = unitPrice * quantity; // Total pour cet article
            
            // Mettre à jour le prix total de cet article dans le DOM
            item.querySelector('.price').textContent = itemTotal.toFixed(2);

            sum += itemTotal; // Ajouter au total global
        });

        // Mise à jour du total global dans le HTML
        totalPriceElement.textContent = sum.toFixed(2);
    }

    // Boucle pour ajouter des événements aux boutons +, -, et supprimer
    plusBtns.forEach((button, index) => {
        button.addEventListener('click', () => {
            const quantityElement = button.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            quantityElement.textContent = quantity + 1;
            calculateTotal();
        });
    });

    minusBtns.forEach((button, index) => {
        button.addEventListener('click', () => {
            const quantityElement = button.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {  // Empêche la quantité d'être inférieure à 1
                quantityElement.textContent = quantity - 1;
                calculateTotal();
            }
        });
    });

    deleteBtns.forEach((button, index) => {
        button.addEventListener('click', () => {
            const cartItem = button.closest('.cart-item');
            cartItem.remove();
            calculateTotal(); // Mise à jour du total après suppression
        });
    });

    // Activation/désactivation de l'icône de like
    likeBtns.forEach((icon) => {
        icon.addEventListener('click', () => {
            icon.classList.toggle('active'); // Toggle de la classe "active" pour styliser le like
        });
    });

    // Calcul initial du total au chargement de la page
    calculateTotal();

});
