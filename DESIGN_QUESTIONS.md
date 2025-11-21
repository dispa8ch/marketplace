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

## Phase 2: Vendor & Admin Portal Design Questions

### Iconex Icon Library
**Question:** PDF specifies "Iconex" for vendor/admin icons, but this is not a standard npm package or icon library.

**Resolution:** Using **Lucide React** as a high-quality alternative with matching visual style. Lucide provides:
- Consistent 24px grid system
- Clean, modern aesthetic matching PDF examples
- Excellent React/Next.js integration
- Wide icon coverage for all vendor/admin needs

**Action Required:** If Iconex is a custom or proprietary icon set, please provide:
- npm package name or CDN link
- Icon mapping guide (which Iconex icon corresponds to which UI element)

### Satoshi Font Implementation
**Specification:** Project requires Satoshi font family for vendor/admin portals.

**Implementation:**
- Using `Satoshi-Variable.woff2` (variable font, 300-900 weight range)
- Loaded via `next/font/local` for optimal performance
- Applied globally via `--font-sans` CSS variable
- Replaces SF Pro Display/Text

**Status:** Complete

### Vendor/Admin Design Tokens
**Colors - Confirmed from PDF:**
- Primary: `#E41F47`
- Dark: `#171717`
- Gray: `#757575`
- Light Pink: `#FFEDF0`
- Background: `#FDFDFD`

**Spacing - Confirmed from PDF:**
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px

**Border Radius - Confirmed from PDF:**
- Cards: 8px
- Buttons: 6px
- Inputs: 6px

**Status:** All implemented exactly per PDF

### Navigation Structure
**Team & Support Placement:** PDF shows Team Management and Support under Settings submenu, not as top-level navigation items.

**Implementation:**
- Removed Team and Support from top-level vendor sidebar
- Both accessible via `/vendor/settings/team` and `/vendor/settings/support`
- Settings shows 7 sub-pages: General, Security, Compliance, Billing, Notifications, Team, Support

**Status:** Complete

### Order Details Display
**Question:** Should order details open in a modal or dedicated page?

**Resolution:** Implemented as dedicated page at `/vendor/orders/[id]` for better UX:
- More space for order information, customer details, and delivery address
- Easier to bookmark and share specific orders
- Better mobile experience
- Follows standard e-commerce patterns

**Alternative:** Can be converted to modal using Dialog component if PDF specifically shows modal pattern.

---

**Phase 2 Status:** Vendor & Admin UI Alignment - Complete  
**Last Updated:** January 2024
