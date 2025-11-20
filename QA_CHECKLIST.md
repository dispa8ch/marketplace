# Dispa8ch Quality Assurance Checklist

## Acceptance Criteria (Must Pass)

### 1. Development Server
- [ ] `npm run dev` starts successfully
- [ ] Home page loads at http://localhost:3000
- [ ] No console errors on page load
- [ ] All assets load correctly (favicon, images, fonts)

### 2. Home Page (/) - Exact PDF Match
- [ ] Top banner/ad grid displays correctly
- [ ] Category strip with all categories
- [ ] Flash sale section with countdown timer
- [ ] Featured shops carousel with "See More" button
- [ ] "Products You May Like" grid (responsive)
- [ ] Footer with all sections (Company, Customer, Vendor)
- [ ] Email subscription input and button
- [ ] Mobile: Elements stack appropriately
- [ ] Colors match: Primary #E41F47, Text #171717, Muted #757575

### 3. Navigation
- [ ] Top nav: Logo, Categories, Search, Like icon, Cart icon, Account
- [ ] Cart badge shows count only when > 0
- [ ] Like badge shows count only when > 0
- [ ] Account dropdown shows: Wallet, Orders, Settings, Logout
- [ ] Mobile: Navigation collapses appropriately

### 4. Search Functionality
- [ ] Search input shows placeholder
- [ ] Typing triggers realtime dropdown
- [ ] Dropdown shows top 3 products/shops
- [ ] "See more results" button navigates to /search?q=...
- [ ] Keyboard navigation works (arrow keys, enter, escape)
- [ ] Clicking outside closes dropdown

### 5. Category Page (/categories/[slug])
- [ ] Left sidebar: Custom filters (Location, Category, Price, Quantity, Ratings, Reviews, Verification)
- [ ] "Clear All" button resets filters
- [ ] Results count updates dynamically
- [ ] Product grid displays filtered results
- [ ] Filters persist when navigating back
- [ ] Mobile: Filters collapse to drawer/modal

### 6. Product Detail Page (/product/[id])
- [ ] Image gallery with thumbnails
- [ ] Product name, price (current and original), discount %
- [ ] Stock indicator and quantity selector
- [ ] "Add to Cart" button (adds and shows toast)
- [ ] Tabs: Overview, Reviews, Vendor, Recently Viewed, Similar Products
- [ ] Variants displayed (Color, Size, etc.)
- [ ] Specifications table
- [ ] Review section with ratings breakdown
- [ ] Vendor mini-card links to /vendor/[id]
- [ ] Like button toggles wishlist

### 7. Vendor Profile Page (/vendor/[id])
- [ ] Instagram-style layout: Banner, Avatar, Rating, Contact
- [ ] Verified badge if applicable
- [ ] "Follow" button (mock interaction)
- [ ] "Report" button opens modal
- [ ] Contact information (email, phone, address)
- [ ] Product grid for vendor's products
- [ ] "Share" button (copies link)
- [ ] Map showing vendor location (placeholder)

### 8. Vendor Report Modal
- [ ] Opens when "Report" clicked
- [ ] Shows vendor preview info
- [ ] Form fields: Reason dropdown, Message textarea
- [ ] "Submit" triggers mailto:dispa8ch@gmail.com
- [ ] Also POSTs to /api/stub/complaint (mock)
- [ ] Success toast after submission
- [ ] Close button and escape key work

### 9. Cart Page (/cart)
- [ ] Lists all cart items with images
- [ ] Quantity increase/decrease buttons
- [ ] Remove item button (trash icon)
- [ ] Cart summary: Subtotal, Delivery Fee, Total
- [ ] "Continue to Checkout" button
- [ ] Empty cart shows placeholder message
- [ ] Cart persists in localStorage

### 10. Checkout Flow (/checkout)
- [ ] Auth guard: Redirects to /login?returnUrl=/checkout if not logged in
- [ ] After login, returns to checkout with cart preserved
- [ ] 3-step indicator: 1) Personal Details, 2) Shipping/Delivery, 3) Payment
- [ ] Step 1: Name, Email, Phone fields
- [ ] Step 2: Country, State, LGA, Street Address, Postal Code
- [ ] Step 3: Shows shipping info, "Continue to Payment Via Paystack" button
- [ ] Right sidebar: Order summary (Edit link, products, totals)
- [ ] Discount code input (Apply button - mock)
- [ ] Mock Paystack redirect (shows success page)

### 11. Order Tracking (/order/[id]/tracking)
- [ ] Tracking number input at top
- [ ] Order details card: Order number, courier, status, dates
- [ ] Timeline: Moving From → In Transit → Out for Delivery → Delivered
- [ ] Checkmarks for completed steps (red #E41F47)
- [ ] Pickup and drop-off addresses
- [ ] Items in order with quantities
- [ ] "Rate This Vendor" button (after delivery)

### 12. Rating Modal (Order Tracking)
- [ ] Opens after clicking "Rate This Vendor"
- [ ] Star rating selector (1-5 stars)
- [ ] Review textarea (0-100% score mention)
- [ ] Stars turn orange on hover and selection
- [ ] "Submit" button posts review (mock)
- [ ] "Close" button and escape key work
- [ ] Success toast after submission

### 13. Likes/Wishlist (/likes)
- [ ] Displays all liked products in grid
- [ ] "You've liked X items" count at top
- [ ] Heart icon on each card to unlike
- [ ] Removes from list when unliked
- [ ] Persists in localStorage
- [ ] Empty state if no items

### 14. Settings (/settings)
- [ ] Single layout with left sidebar
- [ ] Tabs: Account, Wallet, Orders, Notifications, Languages & Currency
- [ ] Clicking tab updates right pane (no full page reload)
- [ ] Account: Editable name, email, phone, shipping address
- [ ] Wallet: Current balance, recent transactions, quick actions
- [ ] Orders: Total/Completed/Processing/Cancelled counts, recent orders list
- [ ] Order Details modal opens (not separate page)
- [ ] Notifications: Alert Settings with SMS/Email toggles
- [ ] **SMS toggle is OFF and DISABLED** (as per requirements)
- [ ] Languages: Preferred language, currency, timezone with Edit buttons

### 15. Order Details Modal (Settings → Orders)
- [ ] Opens as overlay (modal)
- [ ] Shows complete order info: Tracking number, items, metadata
- [ ] Shipping information: Recipient, address, etc.
- [ ] Payment information: Method, amount, third-party fees
- [ ] "Cancel Order" and "Track Order" buttons
- [ ] Close button (X) and escape key work
- [ ] Backdrop click closes modal

### 16. Authentication (Mock)
- [ ] Login page (/auth/login) with email/password fields
- [ ] Signup page (/auth/register) with form
- [ ] "Login" stores token in localStorage (dispa8ch_token)
- [ ] After login, redirects to returnUrl or home
- [ ] Cart state preserved across login
- [ ] Logout clears token and redirects to home
- [ ] Account dropdown shows correct state (logged in/out)

### 17. Input Styling (Global)
- [ ] All inputs have 1px border #E6E6E6
- [ ] NO box shadows on inputs
- [ ] Focus ring: rgba(228,31,71,0.12) with smooth transition
- [ ] Label spacing 8px above input (consistent everywhere)
- [ ] Error states show red text below field
- [ ] Disabled inputs have reduced opacity

### 18. Pricing Engine (Mock)
- [ ] Checkout shows delivery estimate
- [ ] Uses data/seed/logistics-seed.json
- [ ] Calculates based on pickup and drop-off LGAs
- [ ] Shows provider name, price, estimated time, reliability score
- [ ] Ranks providers by price (deterministic)
- [ ] Handles zone types: mainland, island, outskirts

### 19. Responsive Design
- [ ] Mobile (< 768px): Single column, hamburger menu
- [ ] Tablet (768px - 1024px): 2-3 column grid
- [ ] Desktop (> 1024px): Full layout as per PDF
- [ ] Text remains readable at all breakpoints
- [ ] Touch targets minimum 44x44px on mobile
- [ ] Images scale appropriately

### 20. Performance
- [ ] Page load < 3 seconds on 3G
- [ ] Images lazy load
- [ ] No layout shift (CLS)
- [ ] Smooth scrolling and animations
- [ ] No memory leaks (cart/likes persist correctly)

### 21. Accessibility
- [ ] Semantic HTML (header, main, nav, footer)
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works (tab, enter, escape)
- [ ] Focus trap in modals
- [ ] Screen reader friendly (alt text on images)
- [ ] Color contrast meets WCAG AA standards

### 22. API Stubs (Serverless)
- [ ] POST /api/payments/initiate returns mock auth URL
- [ ] POST /api/webhooks/paystack returns 200 (stub)
- [ ] POST /api/vendor-update-requests stores to JSON (mock)
- [ ] POST /api/complaints returns success (stub)
- [ ] GET /api/search filters products.json and shops.json

### 23. Edge Cases
- [ ] Long product names truncate with ellipsis
- [ ] No products: Shows empty state
- [ ] No search results: Shows "No results" message
- [ ] Cart overflow: Scrolls properly
- [ ] Invalid route: Shows 404 page
- [ ] Network error: Shows error toast

### 24. Consistency
- [ ] All buttons use same styling (6px radius)
- [ ] All cards use same styling (8px radius)
- [ ] Spacing consistent across pages (using tokens)
- [ ] Icons same size within context (20px nav, 16px inline)
- [ ] Typography hierarchy maintained

## Build & Deploy

- [ ] `npm run build` completes without errors
- [ ] `npm start` runs production build
- [ ] All environment variables documented in .env.example
- [ ] README has complete setup instructions
- [ ] DESIGN_QUESTIONS.md lists any ambiguities

## Documentation

- [ ] README.md: Complete setup and feature list
- [ ] .env.example: All required variables with placeholders
- [ ] DESIGN_QUESTIONS.md: Tracked ambiguities
- [ ] Inline code comments for complex logic
- [ ] API stub documentation

---

**Test Date:** _________  
**Tester:** _________  
**Pass Rate:** ___ / 120 checks  
**Notes:** _________
