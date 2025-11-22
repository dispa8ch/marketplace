# Backend Integration Guide for Dispa8ch

This guide explains how to integrate the Dispa8ch frontend with your backend API.

## API Structure

All API functions are located in:
- `/lib/api/vendor.ts` - Vendor dashboard APIs
- `/lib/api/admin.ts` - Admin dashboard APIs

## Integration Steps

### 1. Update API Base URL

Create an environment variable for your API endpoint:

\`\`\`
NEXT_PUBLIC_API_URL=https://api.dispa8ch.com
\`\`\`

### 2. Implement API Functions

Each API function is marked with `// TODO: Implement API call` and includes a `console.log("[v0] ...")` statement.

Replace the placeholder implementation with actual API calls using `fetch` or your preferred HTTP client.

Example:

\`\`\`typescript
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(\`\${process.env.NEXT_PUBLIC_API_URL}/vendor/products\`, {
    headers: {
      'Authorization': \`Bearer \${getAuthToken()}\`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
}
\`\`\`

### 3. Connect Modals to API

All modals include placeholder API calls. Update the `handle*` functions in each modal component to call the appropriate API functions.

Example from edit-product-modal.tsx:

\`\`\`typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await updateProduct(product.id, formData);
    toast({ title: "Product updated successfully" });
    onOpenChange(false);
  } catch (error) {
    toast({ title: "Error updating product", variant: "destructive" });
  }
};
\`\`\`

### 4. Implement Authentication

Add authentication logic to protect routes and API calls:

1. Create an auth provider context
2. Store JWT tokens securely
3. Add token to all API requests
4. Implement token refresh logic

### 5. Add Error Handling

Implement global error handling for API calls:

\`\`\`typescript
export async function apiCall<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(\`API error: \${response.status}\`);
    }
    
    return response.json();
  } catch (error) {
    console.error('[API Error]', error);
    throw error;
  }
}
\`\`\`

### 6. Add Loading States

Update components to show loading states during API calls:

\`\`\`typescript
const [isLoading, setIsLoading] = useState(false);

const fetchData = async () => {
  setIsLoading(true);
  try {
    const data = await getProducts();
    setProducts(data);
  } finally {
    setIsLoading(false);
  }
};
\`\`\`

### 7. Implement Real-time Updates (Optional)

For real-time features, integrate WebSocket or Server-Sent Events:

- Order status updates
- New notifications
- Live analytics

## API Endpoints Reference

### Vendor Endpoints

- \`GET /vendor/dashboard/stats\` - Dashboard statistics
- \`GET /vendor/products\` - List products
- \`POST /vendor/products\` - Create product
- \`PUT /vendor/products/:id\` - Update product
- \`DELETE /vendor/products/:id\` - Delete product
- \`GET /vendor/orders\` - List orders
- \`PUT /vendor/orders/:id/status\` - Update order status
- \`GET /vendor/wallet\` - Wallet balance
- \`POST /vendor/wallet/withdraw\` - Request withdrawal
- \`GET /vendor/analytics\` - Analytics data

### Admin Endpoints

- \`GET /admin/dashboard/stats\` - Dashboard statistics
- \`GET /admin/vendors\` - List vendors
- \`PUT /admin/vendors/:id/approve\` - Approve vendor
- \`PUT /admin/vendors/:id/suspend\` - Suspend vendor
- \`GET /admin/withdrawals\` - List withdrawal requests
- \`PUT /admin/withdrawals/:id/approve\` - Approve withdrawal
- \`GET /admin/platform/fees\` - Get platform fees
- \`PUT /admin/platform/fees\` - Update platform fees

## Testing

1. Use the console.log statements to verify API calls are triggered
2. Test all modals and forms
3. Verify error handling works correctly
4. Test loading states
5. Check authentication flows

## Deployment

Before deploying:
1. Remove all `console.log("[v0] ...")` debug statements
2. Ensure all environment variables are set
3. Test on staging environment
4. Enable production error tracking (Sentry, etc.)
\`\`\`
