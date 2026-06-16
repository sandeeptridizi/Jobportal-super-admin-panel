# JobPortal Admin Panel - Color Scheme Guide

## Color Palette

- **Black**: `#000000` - Sidebar, Header, Card Backgrounds
- **White**: `#f6f6f6` - Main Background, Primary Text on Dark
- **Dark Grey**: `#6f6f6f` - Borders, Secondary Elements, Hover States
- **Light Grey**: `#d3d3d3` - Disabled States, Tertiary Text
- **Dark Blue**: `#023047` - Primary Actions, Active States
- **Yellow**: `#FFC300` - Highlights, Important CTAs, Accents

## Component Color Usage

### Sidebar
- Background: Black (`#000000`)
- Border: Dark Grey (`#6f6f6f`)
- Logo Background: Yellow (`#FFC300`)
- Logo Icon: Black (`#000000`)
- Text: White (`#f6f6f6`)
- Secondary Text: Light Grey (`#d3d3d3`)
- Active Item Background: Dark Blue (`#023047`)
- Active Item Text: Yellow (`#FFC300`)
- Hover Background: Dark Grey (`#6f6f6f`)

### Header
- Background: Black (`#000000`)
- Border: Dark Grey (`#6f6f6f`)
- Text: White (`#f6f6f6`)
- Search Input Background: White (`#f6f6f6`)
- Search Input Border: Light Grey (`#d3d3d3`)
- Notification Dot: Yellow (`#FFC300`)
- User Avatar Background: Yellow (`#FFC300`)

### Cards & Containers
- Background: Black (`#000000`)
- Border: Dark Grey (`#6f6f6f`)
- Title Text: White (`#f6f6f6`)
- Description Text: Dark Grey (`#6f6f6f`) or Light Grey (`#d3d3d3`)

### Buttons
- **Primary Button**: 
  - Background: Dark Blue (`#023047`)
  - Text: White (`#f6f6f6`)
  - Hover: Yellow (`#FFC300`) background with Black (`#000000`) text
  
- **Secondary Button**:
  - Background: Transparent
  - Border: Dark Grey (`#6f6f6f`)
  - Text: White (`#f6f6f6`)
  - Hover: Dark Grey (`#6f6f6f`) background

- **Accent Button** (Important Actions):
  - Background: Yellow (`#FFC300`)
  - Text: Black (`#000000`)
  - Hover: Darken Yellow

### Status Badges
- **Active/Success**: Yellow (`#FFC300`) background, Black (`#000000`) text
- **Pending/Warning**: Dark Blue (`#023047`) background, White (`#f6f6f6`) text
- **Rejected/Error**: Dark Grey (`#6f6f6f`) background, White (`#f6f6f6`) text
- **Inactive**: Light Grey (`#d3d3d3`) background, Black (`#000000`) text

### Tables
- Header Background: Dark Grey (`#6f6f6f`)
- Header Text: White (`#f6f6f6`)
- Row Border: Dark Grey (`#6f6f6f`)
- Row Hover: Dark Grey (`#6f6f6f`) background
- Cell Text: White (`#f6f6f6`) for primary, Light Grey (`#d3d3d3`) for secondary

### Charts
- Primary Line/Bar: Dark Blue (`#023047`)
- Secondary Line/Bar: Yellow (`#FFC300`)
- Tertiary Line/Bar: Dark Grey (`#6f6f6f`)
- Quaternary Line/Bar: Light Grey (`#d3d3d3`)
- Grid Lines: Dark Grey (`#6f6f6f`)
- Axis Labels: Light Grey (`#d3d3d3`)

### Forms
- Input Background: White (`#f6f6f6`)
- Input Border: Light Grey (`#d3d3d3`)
- Input Text: Black (`#000000`)
- Input Focus Border: Dark Blue (`#023047`)
- Label Text: White (`#f6f6f6`) or Light Grey (`#d3d3d3`)

### Icons
- Primary Icons: White (`#f6f6f6`)
- Secondary Icons: Light Grey (`#d3d3d3`)
- Accent Icons: Yellow (`#FFC300`)
- On Yellow Background: Black (`#000000`)

## Implementation Notes

1. All white backgrounds should use `#f6f6f6` instead of `#ffffff`
2. Remove all Tailwind color classes (blue, green, red, etc.) and replace with custom colors
3. Use inline styles or CSS variables for custom colors
4. Maintain hover and active states with appropriate color transitions
5. Ensure sufficient contrast for accessibility (especially text on backgrounds)
