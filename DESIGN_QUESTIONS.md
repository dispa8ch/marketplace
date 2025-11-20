# Design Questions & Ambiguities

This document tracks any ambiguities or questions encountered while implementing the Dispa8ch marketplace from the PDF design specifications.

## Typography

### Font Sizes
- **Product card titles**: PDF appears to show ~14-15px. Using 14px for consistency.
- **Product prices**: Using 20px for main price, 16px for strikethrough original price.
- **Body text**: Using 14px as standard, 12px for small text (reviews, metadata).

### Line Heights
- **Not explicitly specified in PDF**: Using 1.5 (150%) for body text, 1.2 (120%) for headings.
- **Product descriptions**: Using `leading-relaxed` (1.625) for better readability.

### Font Weights
- **Product titles**: PDF shows medium weight - using 500.
- **Prices**: PDF shows bold weight - using 700.
- **Regular text**: Using 400 (regular).

## Spacing & Layout

### Product Grid
- **Gap between cards**: Appears to be 16px in PDF. Confirmed and implemented.
- **Card padding**: Using 12px internal padding for product cards.
- **Section spacing**: Using 24px between major sections on homepage.

### Category Pills
- **Horizontal padding**: Using 12px (estimated from PDF).
- **Vertical padding**: Using 6px (estimated from PDF).
- **Gap between pills**: Using 8px.

### Inputs & Forms
- **Label spacing above input**: Using 8px (sm) - measured from PDF screens.
- **Input padding**: Using 12px horizontal, 10px vertical.
- **Form field gap**: Using 16px between fields.

## Colors

### Borders
- **Input borders**: PDF shows very light gray - using `#E6E6E6`.
- **Card borders**: Not visible in PDF - using subtle border `#F5F5F5` for definition.
- **Dividers**: Using `#E5E5E5` for section dividers.

### Focus States
- **Focus ring**: Not specified - using `rgba(228,31,71,0.12)` at 4px offset.
- **Focus ring animation**: Using 150ms transition for smooth effect.

### Hover States
- **Button hover**: Darkening primary by 5% - `#D11C3F`.
- **Card hover**: Adding subtle shadow - not specified in PDF.

## Iconography

### Badge Positioning
- **Cart/Like badges**: PDF shows badge slightly overlapping icon top-right. Using -8px offset.
- **Badge size**: Using 18px diameter with 10px font size.
- **Badge only shown when count > 0** (as per requirements).

### Star Ratings
- **Half stars**: Not clearly visible in PDF. Implementing full stars only for simplicity.
- **Star size**: Using 16px for product cards, 20px for detail pages.
- **Star color**: Using `#FFA500` (orange) for filled, `#E5E5E5` for empty.

### Icons
- **Icon sizes**: Using 20px for navigation, 16px inline, 24px for large actions.
- **Line weight**: Using 2px stroke width for Lucide icons.

## Interactions

### Modals
- **Animation**: PDF doesn't show - using fade-in with scale (150ms).
- **Backdrop**: Using `rgba(0,0,0,0.5)` overlay.
- **Modal max-width**: Using 600px for forms, 400px for confirmations.

### Dropdown Menus
- **Search dropdown**: Shows top 3 results - implemented.
- **Animation**: Using slide-down effect (200ms).

### Loading States
- **Skeletons**: Not shown in PDF - using shimmer animation for loading cards.
- **Button loading**: Using spinner icon when processing.

## Responsive Breakpoints

**Not specified in PDF - using standard practice:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Mobile adjustments:**
- Hide secondary navigation items
- Stack product cards in 2 columns (1 column on very small screens)
- Collapse filter sidebar to drawer

## Images & Assets

### Product Images
- **Aspect ratio**: Using 1:1 (square) for product cards based on PDF grid.
- **Fallback**: Using `/placeholder.svg` with descriptive queries.

### Shop Logos
- **Size**: Using 80px diameter for shop cards, 120px for vendor profile.
- **Border radius**: Using full circle (rounded-full).

### Banners
- **Aspect ratio**: Using 3:1 for vendor profile banners (estimated from PDF).
- **Height**: Using 200px for mobile, 300px for desktop.

## Edge Cases

### Empty States
- **No products**: Not shown in PDF - using friendly message with icon.
- **No search results**: Showing "No results found" with suggestion to adjust filters.
- **Empty cart**: Showing "Your cart is empty" with CTA to browse products.

### Long Text
- **Product titles**: Truncating after 2 lines with ellipsis.
- **Descriptions**: Showing first 100 characters with "Read more" link.
- **Reviews**: Showing first 150 characters with "See more" expansion.

### Validation
- **Form errors**: Not styled in PDF - using red text below fields with icon.
- **Required fields**: Adding asterisk (*) to labels.

## Notes

- All measurements are approximations based on visual analysis of the PDF
- When exact values couldn't be determined, standard web practices were used
- Mobile-first approach prioritized as per requirements
- All interactive states (hover, focus, active) implemented even if not shown in static PDF

---

**Status:** Phase 1 (Customer Marketplace UI) - Complete  
**Last Updated:** 2025-01-XX  
**Next:** Phase 2 will implement vendor dashboard and admin console scaffolds
