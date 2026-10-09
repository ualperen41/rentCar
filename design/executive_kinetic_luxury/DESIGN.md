---
name: Executive Kinetic Luxury
colors:
  surface: '#f9f9ff'
  surface-dim: '#d4daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e8eeff'
  surface-container-high: '#e3e8f9'
  surface-container-highest: '#dde2f3'
  on-surface: '#161c27'
  on-surface-variant: '#434654'
  inverse-surface: '#2a303d'
  inverse-on-surface: '#ecf0ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#1d52d8'
  primary: '#0848d0'
  on-primary: '#ffffff'
  primary-container: '#3563e9'
  on-primary-container: '#f0f1ff'
  inverse-primary: '#b6c4ff'
  secondary: '#00629d'
  on-secondary: '#ffffff'
  secondary-container: '#5eb4ff'
  on-secondary-container: '#00446f'
  tertiary: '#4d5667'
  on-tertiary: '#ffffff'
  tertiary-container: '#656e80'
  on-tertiary-container: '#edf1ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164f'
  on-primary-fixed-variant: '#003ab1'
  secondary-fixed: '#cfe5ff'
  secondary-fixed-dim: '#99cbff'
  on-secondary-fixed: '#001d33'
  on-secondary-fixed-variant: '#004a78'
  tertiary-fixed: '#dae2f8'
  tertiary-fixed-dim: '#bec7db'
  on-tertiary-fixed: '#131c2b'
  on-tertiary-fixed-variant: '#3e4758'
  background: '#f9f9ff'
  on-background: '#161c27'
  surface-variant: '#dde2f3'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 46px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: '0'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: '0'
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-numeric:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-tablet: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system embodies the intersection of high-performance automotive precision and fluid, contemporary tech luxury. Tailored for discerning travelers, premium fleet enthusiasts, and executive clients, the interface evokes velocity, immaculate craftsmanship, and frictionless agency. 

The aesthetic is anchored in an elevated hybrid of Modern Corporate Minimal and Sleek Glassmorphism:
- **Atmosphere:** Deep obsidian and slate foundations contrast against crystalline surfaces, punctuated by hyper-focused electric cobalt strokes and crisp white structural canvas.
- **Rhythm:** Generous breathing room, structural hierarchy, and deliberate micro-interactions that mirror the responsive, tactile dashboard of an ultra-luxury vehicle.
- **Emotional Resonance:** Confident, sovereign, pristine, and effortlessly rapid.

## Colors

The palette leverages a commanding electric cobalt blue as the core driving force, tempered by architectural darks and pristine, radiant neutrals.

- **Primary (`#3563E9`)**: Electric Cobalt. Used for decisive calls to action, active indicators, and high-priority brand signifiers. Its deep variant (`#254EDB`) serves interactive hover and pressed states.
- **Secondary (`#54ACF7`)**: Sky Azure. Deployed for subtle gradients, energetic status highlights, micro-glows, and key metric badges.
- **Tertiary (`#101928`)**: Obsidian Night. Anchor for deep-luxury cards, dark-mode surfaces, hero banners, and high-impact structural containers.
- **Neutral Core (`#1A202C` to `#FFFFFF`)**:
  - `Surface Canvas`: `#F6F7F9` (cool, expansive off-white ground)
  - `Card Background`: `#FFFFFF` (crisp, elevated pure white)
  - `Border / Hairline`: `#E2E8F0` with alpha variants for dark modes (`rgba(255, 255, 255, 0.08)`)
  - `Text Muted`: `#90A3BF` (supporting metadata, secondary specs)
  - `Text Primary`: `#1A202C` (high-contrast legibility)

## Typography

The typography couples the fluid, organic geometric clarity of **Plus Jakarta Sans** with the razor-sharp telemetry of **Space Grotesk**.

- **Editorial & Core Hierarchy:** Plus Jakarta Sans drives primary readability across all scales, delivering a confident, contemporary stance without corporate sterility.
- **Instrumental Data & Telemetry:** Space Grotesk governs car specifications, gear ratios, fuel capacities, speed badges, pricing structures, and categorical micro-eyebrows.
- **Typographic Rules:** Headlines utilize tight negative tracking to maintain visual density against spacious layouts. Numbers must always use tabular figures where telemetry grids or rental tariffs are being compared.

## Layout & Spacing

The layout is built upon a 12-column responsive fluid grid with maximum canvas clamping at 1440px to retain luxury balance and prevent expansive content stretching.

- **Desktop (1024px and above):** 12-column structure with `1.5rem` gutters and `3rem` section margins. Complex dual-pane workflows (e.g., live vehicle telemetry/booking form docked beside a high-resolution showroom view).
- **Tablet (768px - 1023px):** 8-column layout with `1.25rem` gutters, collapsing secondary analytics and shifting booking drawers into stacked modular units.
- **Mobile (below 768px):** 4-column layout with `1rem` gutters and `1.25rem` screen margins. Filtering bars collapse into a horizontal floating pill track with sticky bottom-anchored booking CTAs.

## Elevation & Depth

Visual hierarchy combines tonal layering with translucent glass surfaces and colored ambient light, ensuring objects feel suspended with mechanical precision.

- **Surface Levels:**
  - `Level 0 (Canvas)`: Flat `#F6F7F9` background.
  - `Level 1 (Card & Modular Panel)`: Pure white `#FFFFFF` or dark slate `#1A202C` with a crisp 1px micro-border (`rgba(226, 232, 240, 0.8)` on light, `rgba(255, 255, 255, 0.08)` on dark) and an ultra-diffused drop shadow: `0 8px 24px -4px rgba(16, 25, 40, 0.04)`.
  - `Level 2 (Active/Floating Panels & Filter Bars)`: Subtle glassmorphism using `backdrop-filter: blur(16px)`, background fill `rgba(255, 255, 255, 0.85)` or `rgba(16, 25, 40, 0.85)`, backed by `0 16px 32px -8px rgba(16, 25, 40, 0.08)`.
  - `Level 3 (Modals, Overlays, Floating Bookings)`: Elevated with an ambient blue-tinted rim shadow: `0 24px 48px -12px rgba(53, 99, 233, 0.15)`.

- **Electric Halo Glows:** High-priority elements (e.g., active drive modes, instant booking triggers) receive a soft radial backlight: `box-shadow: 0 0 20px 2px rgba(53, 99, 233, 0.25)`.

## Shapes

The shape system leverages Level 2 curvature (standard corner radius of `0.5rem` / `8px` up to `1rem` / `16px` for structural cards), combined with precise pill silhouettes (`9999px`) for badges, actions, and status meters.

- **Vehicle Cards & Surfaces:** Standardized at `rounded-lg` (`1rem` / `16px`), establishing a refined balance between architectural strength and aerodynamic curvature.
- **Interactive Badges & Status Indicators:** Fully rounded pills (`rounded-full` / `9999px`) provide contrast to rectilinear card structures.
- **Form Fields & Inputs:** Radius set at `0.625rem` (`10px`), providing a comfortable, modern ergonomic feel for continuous typing and date-time selection.

## Components

### Buttons
- **Primary:** Electric Cobalt background (`#3563E9`), white text, `0.625rem` border radius, padding `0.75rem 1.5rem`. Smooth hover transition shifting to `#254EDB` accompanied by a localized ambient glow (`0 8px 18px rgba(53, 99, 233, 0.28)`).
- **Secondary / Ghost:** Transparent canvas, 1px hairline border (`#E2E8F0`), text in `#1A202C`. Hover initiates a light tint fill (`rgba(53, 99, 233, 0.06)`) with border transition to `#3563E9`.
- **Hero Dark Variant:** For dark luxury cards, obsidian glass button with 1px border `rgba(255, 255, 255, 0.15)` and text `#FFFFFF`.

### Chips & Badges
- Pill-shaped (`rounded-full`), padding `0.25rem 0.75rem`.
- Specification chips use `Space Grotesk` (`label-caps`), subtle slate backgrounds (`#F6F7F9`), and muted icon pairing (e.g., fuel tank, transmission, seating).
- Promotional and status tags ("Electric", "Sport", "Available") feature soft cyan/blue fills with vibrant type (`rgba(53, 99, 233, 0.1)` fill, `#3563E9` text).

### Vehicle Listing Cards
- Built on a pure white or obsidian foundation (`rounded-lg`, 16px).
- Upper metadata header: Vehicle name, category label, and a subtle favorite heart toggle with micro-scale animations.
- Center stage: High-definition car render displayed with an dynamic perspective angle, bleeding subtly beyond horizontal container padding.
- Base footer: Inline telemetry specs (gas/battery capacity, drivetrain, passengers) styled in `body-sm` and muted slate, alongside a sharp daily pricing figure in `Space Grotesk` paired with an immediate "Rent Now" action button.

### Form & Search Inputs
- Pick-up / Drop-off location selectors employ a dual-radio indicator design with embedded timeline markers.
- Backgrounds set to `#F6F7F9`, transitioning to pure `#FFFFFF` with a 1.5px `#3563E9` ring on focus.
- Labels set in semi-bold `Plus Jakarta Sans`, auxiliary helper text in `Space Grotesk`.

### Car Spec HUD (Product Details)
- A segmented modular cluster displaying 0–100 km/h, top speed, horsepower, and torque.
- Styled as miniature high-tech gauges utilizing dark graphite surfaces (`#101928`), glass borders, and electric blue micro-accent bars.