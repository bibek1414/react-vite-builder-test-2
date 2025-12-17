const API_BASE = "https://dummyjson.com";

export async function fetchProducts(limit = 12) {
  const url = `${API_BASE}/products?limit=${limit}`;
  console.log("[Client] Fetching products from:", url);
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Failed products fetch: ${response.status}`);
  const payload = await response.json();
  console.log("[Client] Products loaded:", payload.products?.length || 0);
  return payload.products ?? [];
}

export async function fetchProduct(id = "1") {
  const url = `${API_BASE}/products/${id}`;
  console.log("[Client] Fetching product from:", url);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed product fetch: ${response.status}`);
  const product = await response.json();
  console.log("[Client] Product loaded:", product.title);
  return product;
}

export { API_BASE };