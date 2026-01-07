# Buyers POC - IDX Broker Integration

## Overview

This is a Proof of Concept (POC) for a "Buyers" flow powered by IDX Broker. It allows users to search for properties using common criteria (location, price, beds, baths, property type) or directly by MLS Number, view results in a clean grid/list layout, and access detailed listing pages.

## Features

### ✅ Complete (MVP)

- **Search Interface**
  - Standard search with filters (location, price range, bedrooms, bathrooms, property type)
  - Direct MLS Number / Listing ID search
  - Clean, user-friendly form interface

- **Results View**
  - Grid/list layout displaying property cards
  - Each card shows: photo, price, address, beds/baths, square footage
  - "View Details" action on each property
  - Load more pagination

- **Listing Details Page**
  - Full property details with image gallery
  - Property information (type, size, features, description)
  - Clean layout with content on left, sticky broker card on right

- **Sticky Broker Card**
  - Appears exactly once on each page
  - Desktop: Sticky position on the right sidebar
  - Mobile: Normal block above content
  - Contains: "Schedule a showing" button, broker image, title, and phone number

- **Layout & Styling**
  - Two-column layout on desktop (content + sticky broker card)
  - Single column on mobile
  - Max-width container (~1200px)
  - Scoped styles that don't affect other pages
  - Brand colors (#98c257 green)

### ⚠️ Out of Scope (Future Enhancements)

- Advanced filters (lot size, year built, etc.)
- Saved searches / favorites
- Email alerts
- Map view integration
- Virtual tour integration
- Advanced sorting options
- Print/export functionality
- Social sharing
- Mortgage calculator integration
- Property comparison tool

## Configuration

### Environment Variables

The POC uses the existing IDX Broker API configuration. Ensure these are set in your `.env.local`:

```env
NEXT_PUBLIC_API_KEY=your_idx_broker_api_key
```

If you need to configure additional IDX Broker settings, you can add:

```env
IDX_BROKER_API_KEY=your_api_key
IDX_BROKER_SITE_ID=your_site_id
```

**Note:** The POC will gracefully handle missing credentials by showing appropriate error messages and empty states.

### API Endpoints Used

- `/api/idxbroker` - Main IDX Broker API wrapper
- `/api/idxbroker/property/[id]` - Individual property details

## How to Run

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to the POC:**
   ```
   http://localhost:3000/buyers-poc
   ```

3. **Test the flow:**
   - Try a standard search with filters
   - Try searching by MLS Number
   - View results and click on a property
   - Verify the sticky broker card appears on all pages

## File Structure

```
app/buyers-poc/
├── page.tsx                    # Main search page
├── results/
│   └── page.tsx               # Results listing page
├── listing/
│   └── [id]/
│       └── page.tsx           # Individual listing detail page
├── buyers-poc.css             # Scoped styles for POC
└── README.md                  # This file

components/buyers-poc/
├── broker-card.tsx            # Sticky broker card component
├── search-form.tsx            # Search form component
└── property-results.tsx       # (Future: Results grid component)
```

## Testing Checklist

### Desktop Testing
- [ ] Two-column layout displays correctly
- [ ] Broker card is sticky on the right
- [ ] Search form works with all filters
- [ ] MLS # search works
- [ ] Results grid displays properly
- [ ] Clicking a property opens details page
- [ ] Details page shows all property information
- [ ] No duplicate broker cards
- [ ] No IDX header/phone line above content

### Mobile Testing
- [ ] Single column layout
- [ ] Broker card appears above content (not sticky)
- [ ] Search form is usable on mobile
- [ ] Results grid stacks properly
- [ ] Property details page is readable
- [ ] All buttons are tappable

### Functional Testing
- [ ] Standard search returns results
- [ ] MLS # search navigates to correct listing
- [ ] Results pagination works (load more)
- [ ] Property images load (or show placeholder)
- [ ] "Schedule a showing" button works
- [ ] Navigation between pages works
- [ ] Back buttons work correctly

### Edge Cases
- [ ] Empty search results show appropriate message
- [ ] Invalid MLS # shows error
- [ ] Missing API key shows error (not crash)
- [ ] Network errors handled gracefully

## Design Decisions

1. **Scoped Styles**: All styles are scoped to `.buyers-poc-wrapper` to prevent affecting other pages
2. **API Wrapper**: Reuses existing IDX Broker API wrapper for consistency
3. **Component Reuse**: Broker card component is reusable across all POC pages
4. **Responsive First**: Mobile layout is the default, desktop adds columns
5. **Error Handling**: Graceful degradation with user-friendly error messages

## Known Limitations

1. **Search Filters**: Basic implementation - advanced filtering would require more API parameters
2. **Image Handling**: Relies on IDX Broker image URLs - some may fail to load
3. **Pagination**: Simple "load more" - full pagination would require more UI work
4. **MLS Search**: Direct lookup - doesn't validate MLS format before searching

## Next Steps (If Moving to Production)

1. Add advanced search filters
2. Implement saved searches
3. Add map view integration
4. Improve image loading/fallbacks
5. Add analytics tracking
6. Implement A/B testing for layout
7. Add accessibility improvements (ARIA labels, keyboard navigation)
8. Performance optimization (image lazy loading, code splitting)

## Support

For issues or questions about this POC, refer to:
- IDX Broker API Documentation: https://middleware.idxbroker.com/docs/api/overview.php
- Project README: `/README.md`












