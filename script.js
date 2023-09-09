// Primary navigation
const primaryNav = document.querySelector('.primary-nav');
const hamburgerButton = document.querySelector('.hamburger-button');
const closeNavButton = document.querySelector('.close-nav-button');

hamburgerButton.addEventListener('click', () => {
  const isNavExpanded = primaryNav.getAttribute('aria-expanded') === 'true';
  if (!isNavExpanded) {
    primaryNav.setAttribute('aria-expanded', 'true');
  }
});

closeNavButton.addEventListener('click', () => {
  const isNavExpanded = primaryNav.getAttribute('aria-expanded') === 'true';
  if (isNavExpanded) {
    primaryNav.setAttribute('aria-expanded', 'false');
  }
});

// Item price
const productPrice = document.querySelector('.current-price');

// Cart status
const cartButton = document.querySelector('.cart-button');
const cartStatus = document.querySelector('.cart-status');
const cartStatusItemsList = document.querySelector('.cart-status__items-list');
const emptyCartMessage = document.querySelector('.empty-cart');
const deleteItemButton = document.querySelector('.js-delete-item-button');
const cartStatusQuantity = document.querySelector('.cart-status__quantity');
const cartStatusTotalPrice = document.querySelector('.cart-status__total-price');

function setQuantityInCart(toAddQuantity) {
  const currentQuantityInCart = parseInt(cartStatusQuantity.innerHTML);
  const newQuantityInCart = currentQuantityInCart + toAddQuantity;

  const price = parseFloat(productPrice.innerHTML.substring(1));

  cartButton.setAttribute('data-before', newQuantityInCart);
  cartStatusQuantity.innerHTML = newQuantityInCart;
  cartStatusTotalPrice.innerHTML = '$' + (newQuantityInCart * price).toFixed(2);

  if (newQuantityInCart === 0) {
    cartButton.classList.add('hide-after');
    cartStatusItemsList.classList.add('display-none');
    emptyCartMessage.classList.remove('display-none');
  }
  else {
    cartButton.classList.remove('hide-after');
    cartStatusItemsList.classList.remove('display-none');
    emptyCartMessage.classList.add('display-none');
  }
}

cartButton.addEventListener('click', () => {
  const isExpanded = cartStatus.getAttribute('aria-expanded') === 'true';
  if (isExpanded) {
    cartStatus.setAttribute('aria-expanded', 'false');
  }
  else {
    cartStatus.setAttribute('aria-expanded', 'true');
  }
});

deleteItemButton.addEventListener('click', () => {
  const currentQuantityInCart = parseInt(cartStatusQuantity.innerHTML);
  setQuantityInCart(-1 * currentQuantityInCart);
});

// Product quantity
const reduceQuantityButton = document.querySelector('.js-reduce-quantity-button');
const increaseQuantityButton = document.querySelector('.js-increase-quantity-button');
const addToCartButton = document.querySelector('.add-to-cart');
const quantity = document.querySelector('.quantity');

function changeQuantity(toAdd) {
  const currentQuantity = parseInt(quantity.innerHTML);
  const newQuantity = currentQuantity + toAdd;
  if (newQuantity >= 1) {
    quantity.innerHTML = newQuantity;
  }
  if (newQuantity > 1) {
    reduceQuantityButton.removeAttribute('disabled')
  }
  else {
    reduceQuantityButton.setAttribute('disabled', '');
  }
}

reduceQuantityButton.addEventListener('click', () => {
  changeQuantity(-1);
});
increaseQuantityButton.addEventListener('click', () => {
  changeQuantity(1);
});

addToCartButton.addEventListener('click', () => {
  const newQuantity = parseInt(quantity.innerHTML);
  setQuantityInCart(newQuantity);
});


// Pictures and thumbnails
const mainPictureContainer = document.querySelectorAll('.product__main-pictures-container');
const mainPictures = document.querySelectorAll('.product__main-pictures');
const thumbnails = document.querySelectorAll('.product__thumbnail');

const previousImageButton = document.querySelectorAll('.previous-image-button');
const nextImageButton = document.querySelectorAll('.next-image-button');

function setActiveImage(index) {
  if (index > 4) {
    index = 1
  } else if (index < 1) {
    index = 4
  }
  mainPictureContainer.forEach((mpc) => {
    mpc.setAttribute('data-active-image', 'image-' + index);
  })
  const activeThumbnails = document.querySelectorAll(`.product__thumbnail[data-thumbnail-counter="${index}"]`);

  thumbnails.forEach((thumb) => {
    thumb.removeAttribute('data-active');
  });

  activeThumbnails.forEach((thumb) => {
    thumb.setAttribute('data-active', '');
  });
}

thumbnails.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    const thumbnailCounter = parseInt(thumb.getAttribute('data-thumbnail-counter'));
    setActiveImage(thumbnailCounter);
  });
});

function moveImage(indexChange) {
  const activeImageAttribute = mainPictureContainer[0].getAttribute('data-active-image');
  const currentActiveImage = parseInt(activeImageAttribute.substring(activeImageAttribute.indexOf("-") + 1));

  let newActiveImage = currentActiveImage + indexChange;
  setActiveImage(newActiveImage);
}

previousImageButton.forEach((btn) => {
  btn.addEventListener('click', () => {
    moveImage(-1);
  });
});
nextImageButton.forEach((btn) => {
  btn.addEventListener('click', () => {
    moveImage(1);
  });
});

// Popup
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup .close-popup-button');

mainPictures[0].addEventListener('click', () => {
  popup.setAttribute('data-visible', '');
});
closePopupButton.addEventListener('click', () => {
  popup.removeAttribute('data-visible');
});
