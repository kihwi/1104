# Vida Hostel Lisbon Website PRD

## Vision
- Position Vida Hostel Lisbon as a design-forward, photography-led hostel that merges Lisbon’s creative energy with a refined boutique tone.
- Encourage direct bookings through a confident hero CTA while keeping page-to-page navigation lightweight.
- Build visitor trust by surfacing real-time availability notes, policies, and contact details across focused pages instead of a single long scroll.

## Target Audience
- Digital-native travelers (25–40) seeking stylish communal stays with reliable remote-work amenities.
- Backpackers upgrading to design-led hostels that retain social spaces.
- Couples or small groups planning long weekends who need clarity on private vs. shared options.
- Travel agents or partners vetting the property for curated Lisbon itineraries.

## Success Metrics
- Increase direct booking CTA clicks by 40% against current performance (baseline to be provided).
- From the Home page, drive at least 60% of visitors to open the Rooms & Rates page within the first 10 seconds.
- Keep mobile bounce rate below 35%.
- Capture email/loyalty opt-ins from ≥5% of visitors engaging with secondary CTAs.

## Experience Principles
- Preserve the fixed left vertical navigation with a single highlighted accent for clarity across dedicated pages.
- Center hero copy and CTA over a darkened, full-bleed slideshow on the Home page to maintain legibility.
- Pair geometric uppercase headlines with warm serif body copy for boutique-meets-traveler personality.
- Use subtle grain overlays and dotted dividers to deliver tactile depth without overpowering photography.
- Maintain consistent hero modules and typography treatments where applicable so each page feels related while loading separately.

## Page Structure
- **Home**
  - Background slideshow cycling through `/img/aayush-gupta-ljhCEaHYWJ8-unsplash.jpg` (Tram 28 street scene), `/img/andreas-brucker-X87yB-jvYHw-unsplash.jpg` (Lisbon skyline sunset), and `/img/elisadventure-iljCg5q6WEY-unsplash.jpg` (graffiti alley).
  - Welcome copy (placeholder tone TBD), reception hours, breakfast/service notes, and “Book Now” button (opens new blank tab until external booking channel is integrated).
  - Snapshot news highlights with link through to the News page.
- **News**
  - Paginated or filterable list of timestamped updates with dashed-rule styling and a “View All” archive navigation.
- **Rooms & Rates**
  - Card or stacked layout describing room categories (Private Doubles, Shared Pods, Suites) with placeholder price ranges and amenity bullets ready for swap when final data arrives.
  - Optional comparison table and booking CTA repeated per room type.
- **Facilities**
  - Feature blocks referencing: Calma Lounge (`img_facility/alexandra-gorn-JIUjvqe2ZHg-unsplash.jpg`), Winter Garden Atrium (`img_facility/andy-vult-zwZpdhoTbU0-unsplash.jpg`), Private Nook Rooms (`img_facility/christopher-jolly-GqbU78bdJFM-unsplash.jpg`), Brickwork Kitchen & Bar (`img_facility/drew-coffman-jUOaONoXJQk-unsplash.jpg`), and Sunlit Commons (`img_facility/jon-stebbe-paydk0JcIOQ-unsplash.jpg`).
  - Each block includes concise copy, key amenities, and optional CTA to gallery or booking.
- **Reservation**
  - Placeholder copy covering booking policy, cancellation window, loyalty mention, and explanation of the temporary external window behavior.
  - FAQs specific to booking conditions (deposit, group reservations, age policy).
- **Access**
  - Map embed stub, transit directions (airport, tram, metro) with placeholder text to be refined later, plus downloadable PDF map option.
- **FAQ**
  - Thematic FAQ sets (Stay Experience, Services, Policies) with accordions for readability; cross-link to Reservation and Access pages where needed.
- **Footer (global)**
  - Contact info (phone/email placeholders), social links, legal notices, and future Portuguese toggle placeholder.

## Key Features
- Full-bleed background slideshow with timed transitions; mobile fallback to static hero image of Tram 28 (`/img/aayush-gupta-ljhCEaHYWJ8-unsplash.jpg`).
- Hero CTA styled per reference; opens a new blank browser tab for future external booking integration.
- Sticky side navigation with accent color highlight (#fff100); each item loads a dedicated page instead of scrolling to anchors.
- Lightweight news list supporting manual CMS edits and dashed-rule styling.

## Content Requirements
- Brand story copy (150–200 words) highlighting Lisbon neighborhood vibe, design philosophy, and community feel (initial draft can be placeholder text).
- High-resolution hero assets from `/img` plus facility images listed above.
- Provisional availability statements, booking policies, and contact details (use placeholder text until confirmed).
- Room specs and amenity lists with clear markings for items pending confirmation.

## Visual & Brand Guardrails
- Base palette anchored in charcoal/near-black backgrounds with white typography.
- Accent color fixed at `#fff100` for navigation highlight, hover states, and CTA borders.
- Typography pairing: geometric sans (Futura or similar) for headings/navigation; warm serif for hero and narrative copy.
- Maintain dotted/dashed dividers and translucent overlays to echo the reference aesthetic.
- Apply accessible hover states with bright accent fill and dark text.

## Technical & SEO Considerations
- Responsive implementation optimized for 360–1920 px widths with consistent navigation behavior.
- Performance targets: ≤2.5 s LCP on 4G; lazy-load media; serve WebP/AVIF where supported.
- Implement LodgingBusiness schema, address markup, and FAQ structured data; craft English meta descriptions.
- Integrate consent-managed analytics (GA4 or equivalent) and booking conversion tracking hooks.

## Accessibility & Compliance
- Meet WCAG 2.1 AA contrast ratios, particularly for yellow on dark backgrounds.
- Ensure keyboard-accessible navigation and visible focus states compatible with accent color.
- Provide descriptive alt text for hero and facility imagery (indicate alt text placeholders tied to each filename).
- Include EU-compliant privacy, cookies, and terms messaging.

## Dependencies
- Final brand identity kit (logos, patterns) to align overlays and navigation marks.
- External booking channel details to replace the temporary blank-window behavior.
- Confirmed amenity list and room inventory data for accurate copy.
- Baseline metrics for the current booking funnel to benchmark success metrics.

## Open Questions
- Confirm definitive amenity inclusions (breakfast availability, coworking setup, bar/lounge hours, etc.).
- Provide booking funnel baseline metrics (current CTR, bounce, email opt-in) for validation.
- Share brand voice guidance (tone, keywords) to replace placeholder text effectively.
