# WordPress.org Assets

This directory contains all assets used for the WordPress.org plugin listing page.

## Important Notes

- ✅ **Tracked in Git**: Assets are version controlled
- ❌ **NOT in Plugin ZIP**: Excluded via `.distignore`
- 📦 **Uploaded to SVN**: Goes to separate `/assets` directory in WordPress.org SVN

## Asset Requirements

### Icon (Required)
- **Filename**: `icon-256x256.png`
- **Dimensions**: 256×256 pixels
- **Format**: PNG with transparent background
- **Max Size**: 1MB
- **Purpose**: Displayed in plugin search results and plugin page
- **Design**: Simple, recognizable at small sizes (32×32px), uses official WordPress Dashicons

### Banners (Highly Recommended)
- **Standard Banner**: `banner-772x250.png` (772×250px)
- **Retina Banner**: `banner-1544x500.png` (1544×500px, 2× resolution)
- **Format**: PNG or JPG with opaque background
- **Max Size**: 1MB each
- **Purpose**: Displayed at top of plugin page
- **Design**: Professional, includes plugin name and tagline

### Screenshots (Required)
- **Naming**: `screenshot-1.png`, `screenshot-2.png`, etc.
- **Recommended Dimensions**: 1390×864px (16:10 ratio)
- **Format**: PNG or JPG
- **Max Size**: 1MB each
- **Purpose**: Show plugin features in action
- **Captions**: Defined in `readme.txt` under `== Screenshots ==` section

## Current Status

- [ ] icon-256x256.png
- [ ] banner-772x250.png
- [ ] banner-1544x500.png
- [ ] screenshot-1.png (Format selection modal)
- [ ] screenshot-2.png (Inspector Controls)
- [ ] screenshot-3.png (Link Advanced Panel)
- [ ] screenshot-4.png (Active relationships display)
- [ ] screenshot-5.png (Accessibility features)

## Design Specifications

See `DESIGN-PROMPT.md` for detailed design specifications and requirements.

## Asset Checklist

See `ASSETS-CHECKLIST.md` for pre-submission verification checklist.

## Workflow

1. **Create assets** using design specifications
2. **Save to this directory** (.wordpress-org/)
3. **Commit to Git** for version control
4. **Build plugin ZIP** (assets automatically excluded)
5. **After WordPress.org approval**, upload assets to SVN `/assets` directory separately

## SVN Upload (After Approval)

```bash
# After your plugin is approved on WordPress.org
cd plugin-slug-svn/assets

# Copy assets
cp /path/to/.wordpress-org/*.png .

# Add to SVN
svn add *.png

# Commit
svn ci -m "Add plugin assets (icon, banners, screenshots)"
```

Assets are separate from plugin code and don't increase download size for users.
