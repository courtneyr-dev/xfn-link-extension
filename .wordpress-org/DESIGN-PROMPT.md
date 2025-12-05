# XFN Link Extension - Design Assets Prompt

## Plugin Overview

**Name**: Link Extension for XFN
**Tagline**: Add XFN relationships to any WordPress block with links
**Purpose**: Extends WordPress block editor link interface with XFN (XHTML Friends Network) relationship options
**Target Audience**: WordPress content creators, bloggers, and developers who want to add semantic relationship metadata to their links
**Brand Personality**: Modern, accessible, professional, semantic web focused

## Design Concept

The plugin is about **connections and relationships** between people. Visual design should reflect:
- Human connections and networks
- Links and relationships
- Semantic web / structured data
- WordPress integration (feels native)
- Accessibility (inclusive design)

## Color Palette

### Primary Colors
- **WordPress Blue**: `#2271B1`, `#0073AA`, `#1E3A8A`
- **Accent Purple**: `#8B5CF6` (relationships/connections)
- **Accent Teal**: `#14B8A6` (links)

### Supporting Colors
- **White**: `#FFFFFF`
- **Light Gray**: `#F3F4F6`
- **Dark Gray**: `#1F2937`

### Usage
- Background gradients: WordPress blue shades
- Highlight elements: Purple and teal
- Text: White (on dark), dark gray (on light)

## Icon Requirements (256×256px)

### Design Concept
Create a simple, recognizable icon that represents:
1. **Links** (chain/connection)
2. **Relationships** (people/network)
3. **XFN standard** (industry-recognized)

### Recommended Approach
Use official WordPress Dashicons:
- **Primary Icon**: `dashicons-admin-links` (link chain)
- **Secondary Element**: `dashicons-groups` (people/relationships) OR small "XFN" text badge
- **Style**: Clean, minimal, 2-3 colors maximum
- **Background**: Transparent
- **Padding**: 10-15% from edges

### Icon Composition Options

**Option 1: Link Chain + Badge**
- Main element: Link chain icon (dashicons-admin-links) in WordPress blue
- Small badge: "XFN" text in white on purple circle
- Position: Top-right or bottom-right corner

**Option 2: Connected Nodes**
- Three circles connected by lines (representing relationships)
- WordPress blue and teal colors
- Simple, geometric, recognizable at 32×32px

**Option 3: Link + People**
- Link chain icon with subtle people silhouette
- Layered design showing connection between individuals

### Must Test At
- 256×256px (original)
- 128×128px (common display size)
- 32×32px (smallest display in plugin lists)

**Critical**: Icon must be clear and recognizable at 32×32px!

## Banner Requirements

### Standard Banner (772×250px)
### Retina Banner (1544×500px)

Both use same design, just different resolutions.

### Layout Structure

**Left Side (50%)**:
- Plugin name: "Link Extension for XFN"
- Tagline: "Add XFN relationships to any WordPress block with links"
- Subtle feature highlights (optional)

**Right Side (50%)**:
- Visual element representing the plugin
- Options:
  1. Mockup of WordPress editor with XFN interface
  2. Network diagram showing connected nodes
  3. Collection of relationship icons (official Dashicons)
  4. Collapsible panel mockup showing XFN options

### Typography
- **Plugin Name**: Bold, 36-42px, white
- **Tagline**: Regular, 16-18px, white with 90% opacity
- **Font Family**: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif (system fonts)

### Background
- Gradient from WordPress blue to darker shade
- Suggested: `linear-gradient(135deg, #2271B1 0%, #1E3A8A 100%)`
- OR solid WordPress blue `#2271B1`

### Visual Elements

**Option 1: Editor Mockup**
- Screenshot-style visual of the XFN interface
- Show collapsible XFN panel with relationship options
- White rounded container on gradient background

**Option 2: Relationship Icons Grid**
- Grid of XFN relationship icons using official Dashicons:
  - `dashicons-groups` (friendship)
  - `dashicons-admin-users` (professional)
  - `dashicons-location` (geographical)
  - `dashicons-heart` (romantic)
  - `dashicons-admin-home` (family)
  - `dashicons-admin-site` (identity)
- Arranged in visually pleasing layout

**Option 3: Network Diagram**
- Connected nodes representing relationships
- Lines showing connections between people/entities
- Purple and teal accent colors for nodes

### Badge Elements (Optional)
- "WordPress 6.4+" badge
- "Fully Accessible" badge with accessibility icon
- "100% Free" badge

## Official WordPress Dashicons to Use

**IMPORTANT**: Use ONLY official WordPress Dashicons for consistency.

### XFN Relationship Icons
1. **Links**: `dashicons-admin-links`, `dashicons-editor-break`
2. **Friendship**: `dashicons-groups`, `dashicons-admin-users`
3. **Professional**: `dashicons-businessman`, `dashicons-building`
4. **Geographical**: `dashicons-location`, `dashicons-location-alt`
5. **Family**: `dashicons-admin-home`, `dashicons-heart`
6. **Identity**: `dashicons-admin-site`, `dashicons-admin-users`

### Resources
- [Official Dashicons](https://developer.wordpress.org/resource/dashicons/)
- [Dashicons GitHub](https://github.com/WordPress/dashicons)

## Screenshot Specifications

### Recommended Screenshots (5-8 total)

**Screenshot 1: Floating Toolbar XFN Interface**
- **Caption**: "Access XFN relationships directly from the block toolbar"
- **What to Show**:
  - Block selected (Button or Paragraph)
  - Toolbar visible with XFN button highlighted
  - XFN popover open showing collapsible interface
  - Active relationships displayed as pills

**Screenshot 2: Inspector Controls Panel**
- **Caption**: "Comprehensive XFN controls in the block sidebar"
- **What to Show**:
  - Inspector panel open
  - XFN Relationships panel expanded
  - All relationship categories visible
  - Radio buttons and checkboxes for selection

**Screenshot 3: Link Advanced Panel**
- **Caption**: "XFN options integrated into the link popover"
- **What to Show**:
  - Inline link being edited
  - Link popover with Advanced section open
  - Collapsible XFN section visible
  - Relationship selection buttons

**Screenshot 4: Active Relationships Display**
- **Caption**: "Visual pills show active relationships at a glance"
- **What to Show**:
  - XFN panel with multiple relationships selected
  - Color-coded relationship pills
  - Count badge showing number of active relationships

**Screenshot 5: Relationship Categories**
- **Caption**: "Complete XFN 1.1 specification with all relationship types"
- **What to Show**:
  - Expanded view of all relationship categories
  - Friendship, Physical, Professional, Geographical, Family, Romantic, Identity
  - Clear grouping and organization

**Screenshot 6: Accessibility Features (Optional)**
- **Caption**: "Fully accessible with keyboard navigation and screen reader support"
- **What to Show**:
  - Focus indicators visible
  - Keyboard shortcuts or navigation hints
  - High contrast mode compatibility (if possible)

**Screenshot 7: Block Compatibility (Optional)**
- **Caption**: "Works with all WordPress blocks that support links"
- **What to Show**:
  - Multiple block types with XFN: Button, Navigation, Paragraph, List
  - Shows versatility across different blocks

**Screenshot 8: Published Result (Optional)**
- **Caption**: "XFN relationships appear in your published HTML rel attributes"
- **What to Show**:
  - Browser inspector showing HTML with rel attribute
  - rel="friend met colleague" example
  - Demonstrates semantic output

### Screenshot Guidelines
- **Browser**: Use Chrome with clean interface
- **Theme**: Twenty Twenty-Four (default block theme)
- **Resolution**: 1390×864px (16:10 ratio)
- **Zoom**: 100% (no browser zoom)
- **Quality**: PNG for crisp text and UI elements
- **File Size**: Optimize to under 500KB each (use TinyPNG or ImageOptim)

## Design Tools

### Option 1: Design Software (Recommended)
1. **Figma**: Install "WordPress Icons" plugin for Dashicons
2. **Sketch**: Use Dashicons library
3. **Adobe Illustrator**: Import Dashicons SVG files

### Option 2: AI Tools
- Can use ChatGPT, Claude, or Midjourney with this prompt
- Specify exact Dashicon names
- Request vector formats (SVG) for editing

### Option 3: Manual Creation
- Take actual screenshots from WordPress editor
- Use graphic design software for icon and banners
- Ensures authentic look and feel

## Asset Optimization

Before saving:
1. **Optimize PNG files**: Use TinyPNG or ImageOptim
2. **Check file sizes**: All assets under 1MB (required)
3. **Test icon clarity**: View at 32×32px to ensure readability
4. **Verify transparency**: Icon should have transparent background
5. **Check dimensions**: Exact pixel dimensions required

## Deliverables Checklist

- [ ] `icon-256x256.png` - Plugin icon with transparent background
- [ ] `banner-772x250.png` - Standard resolution banner
- [ ] `banner-1544x500.png` - Retina resolution banner (2×)
- [ ] `screenshot-1.png` - Floating toolbar interface
- [ ] `screenshot-2.png` - Inspector controls
- [ ] `screenshot-3.png` - Link advanced panel
- [ ] `screenshot-4.png` - Active relationships display
- [ ] `screenshot-5.png` - Relationship categories overview
- [ ] `screenshot-6.png` - (Optional) Accessibility features
- [ ] `screenshot-7.png` - (Optional) Block compatibility
- [ ] `screenshot-8.png` - (Optional) Published HTML output

## Design Philosophy

**DO**:
- ✅ Use official WordPress Dashicons
- ✅ Follow WordPress design patterns
- ✅ Keep designs clean and professional
- ✅ Ensure accessibility (high contrast, clear focus)
- ✅ Test icon at multiple sizes
- ✅ Use WordPress color palette
- ✅ Show real interface elements (screenshots)

**DON'T**:
- ❌ Create custom icons (use Dashicons)
- ❌ Use non-WordPress colors or branding
- ❌ Include fake reviews or testimonials
- ❌ Use copyrighted images without permission
- ❌ Make banners too text-heavy
- ❌ Use low-quality or pixelated graphics
- ❌ Exceed 1MB file size limits

## Example Text for Banners

**Main Heading**: Link Extension for XFN
**Tagline Options**:
- "Add XFN relationships to any WordPress block with links"
- "Semantic web relationships for WordPress"
- "Extend WordPress links with XFN metadata"

**Feature Bullets** (if space allows):
- Complete XFN 1.1 Specification
- Three Interface Options
- Fully Accessible (WCAG 2.2 AA)
- Works with All Link Blocks

## Need Help?

If hiring a designer:
1. Provide this entire document
2. Share links to official Dashicons
3. Request vector source files (AI, SVG, Figma)
4. Request 2-3 mockup iterations before final
5. Verify all dimensions and file sizes

If using AI tools:
1. Use this prompt with specific Dashicon names
2. Generate multiple variations
3. Refine based on output
4. Export at exact dimensions required
5. Optimize file sizes before committing

## Quality Standards

Before considering assets "done":
1. ✅ All files at exact required dimensions
2. ✅ All files under 1MB
3. ✅ Icon clear at 32×32px when scaled
4. ✅ Banners use WordPress colors
5. ✅ Screenshots show actual plugin functionality
6. ✅ No placeholder or Lorem Ipsum text
7. ✅ Professional, polished appearance
8. ✅ Consistent visual style across all assets

---

**Author**: Courtney Robertson
**Plugin**: Link Extension for XFN
**Version**: 1.0.0
**Last Updated**: December 2024
