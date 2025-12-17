const API_BASE = "https://dummyjson.com";

export async function fetchProducts(limit = 12) {
  const url = `${API_BASE}/products?limit=${limit}`;
  const env = typeof window === 'undefined' ? '[Server]' : '[Client]';
  console.log(`${env} Fetching products from:`, url);
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Failed products fetch: ${response.status}`);
  const payload = await response.json();
  console.log(`${env} Products loaded:`, payload.products?.length || 0);
  return payload.products ?? [];
}

export async function fetchProduct(id = "1") {
  const url = `${API_BASE}/products/${id}`;
  const env = typeof window === 'undefined' ? '[Server]' : '[Client]';
  console.log(`${env} Fetching product from:`, url);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed product fetch: ${response.status}`);
  const product = await response.json();
  console.log(`${env} Product loaded:`, product.title);
  return product;
}

export { API_BASE };