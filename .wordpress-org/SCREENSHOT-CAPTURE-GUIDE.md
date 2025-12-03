# Screenshot Capture Guide - XFN Link Extension

## Quick Screenshot Workflow (30-45 minutes)

### Setup (5 minutes)

1. **Install on Local WordPress**
   ```bash
   # If you have a local WordPress site
   # Upload and activate xfn-link-extension.zip
   ```

2. **Set Browser Window Size**
   - Open Chrome DevTools (F12)
   - Toggle device toolbar (Ctrl+Shift+M or Cmd+Shift+M)
   - Click "Responsive" dropdown → "Edit..."
   - Add custom device: 1390×864
   - Select this size

3. **Use Clean Theme**
   - Activate Twenty Twenty-Four (default block theme)
   - Ensures consistent, professional appearance

### Screenshot 1: Floating Toolbar XFN Interface (PRIMARY)

**What to capture**: XFN button in toolbar with popover open

**Steps**:
1. Create new post
2. Add Button block
3. Type some button text
4. Click "XFN" button in toolbar
5. Click "XFN" toggle to expand the collapsible section
6. Select 2-3 relationships (e.g., "Friend" + "Met" + "Colleague")
7. **Take screenshot** (Cmd+Shift+4 on Mac, Win+Shift+S on Windows)

**File**: `screenshot-1.png`
**Caption**: "Access XFN relationships directly from the block toolbar"

---

### Screenshot 2: Inspector Controls Panel

**What to capture**: Block sidebar with XFN panel expanded

**Steps**:
1. Keep Button block selected
2. Open Inspector (right sidebar) if not already open
3. Find "XFN Relationships" panel
4. Expand the panel
5. Select different relationships
6. **Take screenshot**

**File**: `screenshot-2.png`
**Caption**: "Comprehensive XFN controls in the block sidebar"

---

### Screenshot 3: Link Advanced Panel

**What to capture**: Link popover with XFN section

**Steps**:
1. Create Paragraph block
2. Type some text, highlight a word
3. Click link button (or Cmd+K / Ctrl+K)
4. Enter URL: https://example.com
5. Click "Advanced" at bottom
6. Find and expand "XFN" collapsible section
7. Select relationships
8. **Take screenshot**

**File**: `screenshot-3.png`
**Caption**: "XFN options integrated into the link popover"

---

### Screenshot 4: Active Relationships Display

**What to capture**: XFN interface showing active relationship pills

**Steps**:
1. In any XFN interface (toolbar popover works best)
2. Select 4-5 different relationships
3. Expand section to show "Active Relationships" with colored pills
4. **Take screenshot** - focus on the pills display

**File**: `screenshot-4.png`
**Caption**: "Visual pills show active relationships at a glance"

---

### Screenshot 5: All Relationship Categories

**What to capture**: Inspector panel showing all XFN categories

**Steps**:
1. Open Inspector Controls (screenshot 2 setup)
2. Scroll through entire XFN Relationships panel
3. If possible, take screenshot showing multiple categories
4. OR take multiple screenshots and stitch together

**File**: `screenshot-5.png`
**Caption**: "Complete XFN 1.1 specification with all relationship types"

---

## Screenshot Tips

### Quality
- ✅ Use Retina/HiDPI display if possible (sharper)
- ✅ 100% browser zoom (no zoom in/out)
- ✅ Clean workspace (close unnecessary browser tabs)
- ✅ Hide personal information (if any)

### Composition
- ✅ Show relevant interface only
- ✅ Don't include entire screen (crop to editor area)
- ✅ Make sure text is readable
- ✅ Highlight the feature being demonstrated

### File Format
- ✅ Save as PNG (best for UI screenshots)
- ✅ Optimize with TinyPNG or ImageOptim after capture
- ✅ Target: 200-500KB per screenshot
- ✅ Maximum: 1MB per screenshot

---

## Screenshot Tools

### Mac
- **Built-in**: Cmd+Shift+4 (select area)
- **Full window**: Cmd+Shift+4, then Space
- **Advanced**: Use Preview → File → Take Screenshot

### Windows
- **Built-in**: Win+Shift+S (Snipping Tool)
- **Alt method**: Print Screen, paste in Paint

### Cross-Platform Tools
- **Firefox Screenshot Tool**: Built into browser (Shift+F2, type "screenshot")
- **Chrome Extension**: "Awesome Screenshot"
- **Dedicated Apps**: Snagit, Monosnap, Lightshot

---

## After Capture

### Optimize Screenshots
```bash
# Option 1: Online (easiest)
# Visit https://tinypng.com/
# Upload all screenshots
# Download optimized versions

# Option 2: Command line (Mac)
brew install imageoptim-cli
imageoptim screenshot-*.png

# Option 3: Manual app
# Use ImageOptim (Mac) or FileOptimizer (Windows)
```

### Verify
```bash
# Check file sizes
ls -lh screenshot-*.png

# Should be under 500KB each
# If over 1MB, optimize more aggressively
```

### Save to Directory
```bash
# Move to .wordpress-org directory
mv screenshot-*.png .wordpress-org/
```

---

## Can't Install Plugin Locally?

### Alternative: Use Mockups/Wireframes

If you can't install the plugin to take real screenshots:

1. **Use Figma/Sketch**
   - Design WordPress editor interface
   - Add your plugin UI elements
   - Export as images

2. **Use WordPress Editor Screenshots**
   - Find WordPress editor screenshots online
   - Photoshop your plugin UI into them
   - Less authentic but acceptable

3. **Wait Until Testing**
   - Test plugin on local WordPress
   - Take screenshots during testing
   - Add to WordPress.org after approval

---

## Screenshot Checklist

Before saving screenshots:

- [ ] Browser at 1390×864 (or similar 16:10 ratio)
- [ ] Twenty Twenty-Four theme active
- [ ] Clean editor interface (no unrelated plugins visible)
- [ ] Feature being demonstrated is clear
- [ ] Text is readable at actual size
- [ ] No personal/sensitive information visible
- [ ] All 5+ screenshots captured
- [ ] Files named correctly (screenshot-1.png, etc.)
- [ ] Files optimized (under 1MB each)
- [ ] Saved to .wordpress-org/ directory

---

## Time Estimate

- Setup: 5 minutes
- Capture 5 screenshots: 15-20 minutes
- Optimize and organize: 10 minutes
- **Total: 30-45 minutes**

---

**Next**: After screenshots, move on to icon and banners (see ICON-BANNER-GUIDE.md)
