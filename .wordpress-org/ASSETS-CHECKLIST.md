# WordPress.org Assets - Pre-Submission Checklist

Use this checklist to verify all assets are ready before WordPress.org submission.

## Icon Requirements

### icon-256x256.png

- [ ] **File exists** in `.wordpress-org/` directory
- [ ] **Exact dimensions**: 256×256 pixels (verify with `file` command or image editor)
- [ ] **Format**: PNG format
- [ ] **Transparency**: Background is transparent (not white or colored)
- [ ] **File size**: Under 1MB (preferably under 100KB)
- [ ] **Design quality**:
  - [ ] Uses official WordPress Dashicons (not custom icons)
  - [ ] Simple and recognizable design
  - [ ] High contrast for visibility
  - [ ] Padding: 10-15% from edges
- [ ] **Scaling test**: Clear and recognizable when scaled to 32×32px
- [ ] **Color scheme**: Uses WordPress blue, purple, or teal (brand colors)
- [ ] **Optimization**: Compressed with TinyPNG, ImageOptim, or similar
- [ ] **No text**: Avoid text in icon (or minimal, highly readable)

**Verification Commands**:
```bash
file .wordpress-org/icon-256x256.png
# Should show: PNG image data, 256 x 256

ls -lh .wordpress-org/icon-256x256.png
# Should show file size under 1MB
```

---

## Banner Requirements

### banner-772x250.png

- [ ] **File exists** in `.wordpress-org/` directory
- [ ] **Exact dimensions**: 772×250 pixels
- [ ] **Format**: PNG or JPG
- [ ] **Background**: Opaque (not transparent)
- [ ] **File size**: Under 1MB (preferably 300-500KB)
- [ ] **Design quality**:
  - [ ] Plugin name clearly visible
  - [ ] Tagline readable
  - [ ] Professional appearance
  - [ ] WordPress color palette
  - [ ] High contrast text
- [ ] **Typography**: Readable at actual size
- [ ] **Visual elements**: Uses official Dashicons or authentic screenshots
- [ ] **Optimization**: Compressed to reduce file size

**Verification Commands**:
```bash
file .wordpress-org/banner-772x250.png
# Should show: PNG/JPEG image data, 772 x 250

ls -lh .wordpress-org/banner-772x250.png
# Should show file size under 1MB
```

### banner-1544x500.png

- [ ] **File exists** in `.wordpress-org/` directory
- [ ] **Exact dimensions**: 1544×500 pixels (exactly 2× of standard banner)
- [ ] **Format**: PNG or JPG
- [ ] **Background**: Opaque
- [ ] **File size**: Under 1MB (preferably 800KB-1MB)
- [ ] **Design**: Same design as standard banner, just 2× resolution
- [ ] **Text**: Crisp and clear at 2× resolution
- [ ] **Consistency**: Matches standard banner design exactly
- [ ] **Optimization**: Compressed but maintains quality

**Verification Commands**:
```bash
file .wordpress-org/banner-1544x500.png
# Should show: PNG/JPEG image data, 1544 x 500

ls -lh .wordpress-org/banner-1544x500.png
# Should show file size under 1MB
```

---

## Screenshot Requirements

### General Screenshot Requirements

- [ ] **Naming**: `screenshot-1.png`, `screenshot-2.png`, etc. (numbered sequentially)
- [ ] **Dimensions**: 1390×864px recommended (or 16:10 aspect ratio)
- [ ] **Format**: PNG or JPG
- [ ] **File size**: Each under 1MB (preferably 200-500KB each)
- [ ] **Quality**: High quality, crisp text, no pixelation
- [ ] **Browser**: Clean browser chrome (Chrome recommended)
- [ ] **Theme**: Default WordPress theme (Twenty Twenty-Four)
- [ ] **Zoom**: 100% browser zoom (no scaling)
- [ ] **Content**: Real plugin functionality (no mockups or fake content)
- [ ] **Captions**: Corresponding captions added to `readme.txt`

### Screenshot 1: Primary Feature

- [ ] **File exists**: `screenshot-1.png`
- [ ] **Shows**: Main plugin interface (floating toolbar recommended)
- [ ] **Caption in readme.txt**: Descriptive, benefit-focused
- [ ] **Highlights**: Key value proposition
- [ ] **Clear**: Interface elements clearly visible
- [ ] **Optimized**: File size under 500KB

### Screenshot 2: Secondary Feature

- [ ] **File exists**: `screenshot-2.png`
- [ ] **Shows**: Inspector Controls or alternative interface
- [ ] **Caption in readme.txt**: Explains what user sees
- [ ] **Complements**: Different from screenshot 1
- [ ] **Clear**: All text and UI elements readable

### Screenshot 3: Additional Feature

- [ ] **File exists**: `screenshot-3.png`
- [ ] **Shows**: Link Advanced Panel or another key feature
- [ ] **Caption in readme.txt**: Clear explanation
- [ ] **Progressive**: Shows progression of using the plugin

### Screenshots 4-8 (Optional but Recommended)

- [ ] **Additional screenshots** showcase:
  - [ ] Active relationships display
  - [ ] All relationship categories
  - [ ] Accessibility features
  - [ ] Block compatibility
  - [ ] Published HTML output
- [ ] **Each has caption** in readme.txt
- [ ] **Tell a story**: Show complete feature set
- [ ] **Optimized**: All under 1MB each

**Verification Commands**:
```bash
# List all screenshots with sizes
ls -lh .wordpress-org/screenshot-*.png

# Check dimensions of each screenshot
file .wordpress-org/screenshot-*.png

# Total size of all assets
du -sh .wordpress-org/
```

---

## readme.txt Screenshot Captions

Verify captions are added to `readme.txt`:

```txt
== Screenshots ==

1. Caption for screenshot-1.png - Descriptive and benefit-focused
2. Caption for screenshot-2.png - Explains what users see
3. Caption for screenshot-3.png - Highlights key feature
4. Caption for screenshot-4.png - (if applicable)
5. Caption for screenshot-5.png - (if applicable)
```

- [ ] **Captions exist** in readme.txt for all screenshots
- [ ] **Captions are descriptive** (not just "Screenshot 1")
- [ ] **Captions focus on benefits** (what user can do)
- [ ] **Captions match screenshot order** (1, 2, 3, etc.)
- [ ] **No spelling errors** in captions

---

## .distignore Configuration

Verify `.distignore` excludes `.wordpress-org/` from plugin ZIP:

- [ ] **`.distignore` exists** in plugin root
- [ ] **Contains line**: `/.wordpress-org`
- [ ] **Assets won't be included** in plugin ZIP (verify with `npm run plugin-zip`)

**Verification**:
```bash
# Check .distignore contains .wordpress-org
grep "wordpress-org" .distignore

# Build plugin ZIP
npm run plugin-zip

# Verify .wordpress-org is NOT in ZIP
unzip -l xfn-link-extension.zip | grep wordpress-org
# Should return nothing!
```

---

## Git Configuration

Assets should be tracked in Git but excluded from ZIP:

- [ ] **`.wordpress-org/` tracked in Git**
- [ ] **All assets committed** to version control
- [ ] **`.wordpress-org/` NOT in `.gitignore`**
- [ ] **`.wordpress-org/` IS in `.distignore`**

**Verification**:
```bash
# Check Git tracking
git status .wordpress-org/

# Verify not in .gitignore
grep "wordpress-org" .gitignore
# Should return nothing (or commented line)

# Verify in .distignore
grep "wordpress-org" .distignore
# Should return: /.wordpress-org
```

---

## Asset Quality Standards

### Visual Quality
- [ ] **Professional appearance**: No amateur or rushed designs
- [ ] **Consistent branding**: All assets use same colors/style
- [ ] **High contrast**: Text readable against backgrounds
- [ ] **No placeholder content**: No "Lorem Ipsum" or dummy text
- [ ] **No copyright violations**: Only use authorized images/icons
- [ ] **Authentic**: Screenshots show real functionality, not mockups

### Technical Quality
- [ ] **Correct dimensions**: All assets exact pixel dimensions
- [ ] **Optimized file sizes**: All under 1MB, optimized as much as possible
- [ ] **Correct formats**: PNG for icons, PNG/JPG for banners/screenshots
- [ ] **No corruption**: All files open without errors
- [ ] **Cross-platform**: Assets display correctly on Mac, Windows, Linux

### WordPress.org Guidelines
- [ ] **No promotional content**: No "5 stars!" or fake reviews
- [ ] **No pricing**: Don't mention "free" or pricing in screenshots
- [ ] **No external branding**: Focus on WordPress integration
- [ ] **Follow WP design**: Use WordPress colors and Dashicons
- [ ] **Accurate representation**: Assets show actual plugin features

---

## Pre-Upload Final Check

Before uploading to WordPress.org SVN:

- [ ] **All required assets created**:
  - [ ] icon-256x256.png
  - [ ] banner-772x250.png
  - [ ] banner-1544x500.png
  - [ ] At least 3 screenshots
- [ ] **All files under 1MB**
- [ ] **All files optimized**
- [ ] **Screenshot captions in readme.txt**
- [ ] **No assets in plugin ZIP**
- [ ] **Assets committed to Git**
- [ ] **Documentation complete** (README.md, DESIGN-PROMPT.md)

**Final Verification Script**:
```bash
#!/bin/bash

echo "=== XFN Assets Verification ==="
echo ""

# Check required files exist
echo "Checking required files..."
for file in icon-256x256.png banner-772x250.png banner-1544x500.png screenshot-1.png screenshot-2.png screenshot-3.png; do
  if [ -f ".wordpress-org/$file" ]; then
    echo "✅ $file exists"
    size=$(ls -lh ".wordpress-org/$file" | awk '{print $5}')
    echo "   Size: $size"
  else
    echo "❌ $file MISSING"
  fi
done

echo ""
echo "Checking file sizes..."
find .wordpress-org -name "*.png" -size +1M -exec echo "⚠️  {} exceeds 1MB" \;

echo ""
echo "Checking .distignore..."
if grep -q "wordpress-org" .distignore; then
  echo "✅ .wordpress-org excluded from ZIP"
else
  echo "❌ .wordpress-org NOT in .distignore"
fi

echo ""
echo "Total assets size:"
du -sh .wordpress-org/

echo ""
echo "=== Verification Complete ==="
```

Save as `bin/verify-assets.sh` and run:
```bash
chmod +x bin/verify-assets.sh
./bin/verify-assets.sh
```

---

## After WordPress.org Approval

Once your plugin is approved:

1. **Checkout SVN repository**:
   ```bash
   svn co https://plugins.svn.wordpress.org/xfn-link-extension xfn-svn
   cd xfn-svn/assets
   ```

2. **Copy assets to SVN**:
   ```bash
   cp /path/to/.wordpress-org/*.png .
   ```

3. **Add to SVN**:
   ```bash
   svn add *.png
   svn status
   ```

4. **Commit to SVN**:
   ```bash
   svn ci -m "Add plugin assets (icon, banners, screenshots)"
   ```

5. **Verify on WordPress.org**:
   - Visit plugin page
   - Check icon displays in search
   - Check banner displays on plugin page
   - Check screenshots display correctly
   - Allow 15 minutes for CDN cache refresh

---

## Troubleshooting

### Icon Not Displaying
- Verify filename is exactly `icon-256x256.png`
- Verify dimensions are exactly 256×256 pixels
- Check file is in SVN `/assets` directory
- Clear browser cache and wait 15 minutes

### Banner Not Displaying
- Verify filenames: `banner-772x250.png` and `banner-1544x500.png`
- Verify dimensions are exact
- Check files uploaded to SVN `/assets`
- Clear cache

### Screenshots Not Displaying
- Verify sequential naming: `screenshot-1.png`, `screenshot-2.png`, etc.
- Verify captions in readme.txt match number of screenshots
- Check files in SVN `/assets`
- Verify file sizes under 1MB

### File Size Too Large
- Use TinyPNG (https://tinypng.com/)
- Use ImageOptim (Mac)
- Use Squoosh (https://squoosh.app/)
- Reduce JPEG quality to 85-90%
- For PNG, reduce colors if possible

---

**Plugin**: Link Extension for XFN
**Author**: Courtney Robertson (courane01)
**Version**: 1.0.0
**Last Updated**: December 2024
