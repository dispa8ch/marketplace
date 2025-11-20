export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  vendorName: string;
}

export interface LikedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

// Cart functions
export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem('dispa8ch_cart');
  return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('dispa8ch_cart', JSON.stringify(cart));
  // Trigger storage event for other components
  window.dispatchEvent(new Event('cart-updated'));
}

export function addToCart(item: Omit<CartItem, 'quantity'>): boolean {
  const cart = getCart();
  const existingItem = cart.find((i) => i.productId === item.productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
    saveCart(cart);
    return false; // item already existed, quantity incremented
  } else {
    cart.push({ ...item, quantity: 1 });
    saveCart(cart);
    return true; // newly added
  }
}

export function removeFromCart(productId: string): void {
  const cart = getCart().filter((item) => item.productId !== productId);
  saveCart(cart);
}

export function updateCartQuantity(productId: string, quantity: number): void {
  const cart = getCart().map((item) =>
    item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item
  );
  saveCart(cart);
}

export function clearCart(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('dispa8ch_cart');
  window.dispatchEvent(new Event('cart-updated'));
}

// Likes/Wishlist functions
export function getLikes(): LikedProduct[] {
  if (typeof window === 'undefined') return [];
  const likes = localStorage.getItem('dispa8ch_likes');
  return likes ? JSON.parse(likes) : [];
}

export function saveLikes(likes: LikedProduct[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('dispa8ch_likes', JSON.stringify(likes));
  window.dispatchEvent(new Event('likes-updated'));
}

export function toggleLike(product: LikedProduct): boolean {
  const likes = getLikes();
  const index = likes.findIndex((item) => item.id === product.id);
  
  if (index >= 0) {
    likes.splice(index, 1);
    saveLikes(likes);
    return false;
  } else {
    likes.push(product);
    saveLikes(likes);
    return true;
  }
}

export function isLiked(productId: string): boolean {
  return getLikes().some((item) => item.id === productId);
}

// Auth functions (mock)
export interface MockUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('dispa8ch_token');
}

export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('dispa8ch_token', token);
}

export function clearAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('dispa8ch_token');
  localStorage.removeItem('dispa8ch_user');
}

export function getCurrentUser(): MockUser | null {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('dispa8ch_user');
  return user ? JSON.parse(user) : null;
}

export function setCurrentUser(user: MockUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('dispa8ch_user', JSON.stringify(user));
}

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
