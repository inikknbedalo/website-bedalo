# Content Collections Migration Plan

## Overview
This document outlines the plan to migrate all hardcoded values in the website-bedalo project into Astro Content Collections following best practices.

## Current State Analysis

### Already Using Content Collections ✅
- Site configuration (site.json)
- Navigation menu
- Contact information
- Social media links
- Statistics data
- Government officials data
- Page content (home, profile, gallery, tentang-kkn)

### Hardcoded Values to Migrate 🔄

## 1. Dashboard Configuration
**Location:** `src/config/dashboard.ts`

**Hardcoded Values:**
- Google Sheets Spreadsheet ID
- Sheet name
- Refresh interval (5 minutes)
- Max retries (3)
- Retry delay (2000ms)
- Password hash
- Session key
- Session duration (24 hours)
- Items per page (10)
- API URL construction

**Migration Target:** Create `src/content/config/dashboard.json`

**Schema Requirements:**
- spreadsheetId: string
- sheetName: string
- refreshInterval: number (in milliseconds)
- maxRetries: number
- retryDelay: number (in milliseconds)
- passwordHash: string
- sessionKey: string
- sessionDuration: number (in milliseconds)
- itemsPerPage: number

---

## 2. Form Configuration
**Location:** `src/pages/kontak.astro` & `src/pages/survei.astro`

**Hardcoded Values:**

### Aspirasi Form (kontak.astro)
- Form action URL (Google Forms)
- Entry field IDs (entry.2116275708, entry.175133211, etc.)
- Subject options dropdown values
- Success modal messages

### Survey Forms (survei.astro)
- Multiple Google Forms URLs (8 different forms)
- Form titles and descriptions
- Team configurations
- Database spreadsheet URL
- Color schemes for teams
- Schedule data (briefing times, session times)
- Guidelines and instructions

**Migration Target:** Create `src/content/forms/` collection

**Schema Requirements:**
- forms.json for aspirasi form
- surveys.json for survey configuration
- Each form should contain:
  - formUrl: string (URL)
  - formType: enum
  - fields: array of field configurations
  - successMessage: string
  - errorMessage: string

---

## 3. External Resources Configuration
**Location:** `src/layouts/BaseLayout.astro`

**Hardcoded Values:**
- Google Fonts URL (Poppins font)
- Font Awesome CDN URL and version (6.7.1)
- CDN preconnect URLs
- Theme color (#2563eb)
- Favicon paths

**Migration Target:** Create `src/content/config/resources.json`

**Schema Requirements:**
- fonts: array of font configurations
- cdns: array of CDN configurations
- theme:
  - primaryColor: string
  - favicon: string
  - manifest: string

---

## 4. SEO and Structured Data Configuration
**Location:** `src/components/seo/StructuredData.astro`

**Hardcoded Values:**
- Schema.org URLs
- Organization name and details
- Logo URLs
- Hard-coded product availability schema

**Migration Target:** Extend `src/content/config/site.json`

**Schema Requirements:**
- Add seo object:
  - organization: object with name, type, url, logo
  - structuredData: object for schema configurations
  - defaultImage: string

---

## 5. UI Configuration Values

### Animation Configuration
**Location:** Various components (StatsGrid.astro)

**Hardcoded Values:**
- CountUp duration: 2.5 seconds
- Intersection observer threshold: 0.5
- Animation easing settings

**Migration Target:** Create `src/content/config/ui.json`

**Schema Requirements:**
- animations:
  - countUpDuration: number
  - intersectionThreshold: number
  - useEasing: boolean
- transitions:
  - defaultDuration: number (300ms typical)
  - hoverScale: number (1.05 typical)

---

## 6. Privacy Policy Content
**Location:** `src/pages/kebijakan-privasi.astro`

**Hardcoded Values:**
- Last updated date
- All policy text and sections
- Contact references

**Migration Target:** Create `src/content/pages/privacy-policy.json`

**Schema Requirements:**
- page: "privacy-policy"
- lastUpdated: date string
- sections: array of section objects
  - Each section: id, title, icon, content

---

## 7. Error Page Content
**Location:** `src/pages/404.astro`

**Hardcoded Values:**
- Error title and message
- Icon class
- Button texts and links

**Migration Target:** Create `src/content/pages/404.json`

**Schema Requirements:**
- page: "404"
- title: string
- message: string
- icon: string
- actions: array of action objects

---

## 8. Survey Schedule and Teams
**Location:** `src/pages/survei.astro`

**Hardcoded Values:**
- Team configurations (3 teams)
- Team names, colors, descriptions
- Schedule for 2 days with specific times
- Guidelines with icons and descriptions

**Migration Target:** Create `src/content/surveys/` collection

**Schema Requirements:**
- teams.json:
  - Array of team objects with id, name, color, description, forms
- schedule.json:
  - Array of day objects with sessions and timings
- guidelines.json:
  - Array of guideline objects with icons and descriptions
- database.json:
  - URL and metadata for survey database

---

## 9. Social Share Configuration
**Location:** `src/components/content/SocialShare.astro`

**Hardcoded Values:**
- Facebook share URL template
- Twitter share URL template
- Platform-specific icons and labels

**Migration Target:** Create `src/content/config/sharing.json`

**Schema Requirements:**
- platforms: array of platform objects
  - name: string
  - urlTemplate: string
  - icon: string
  - label: string
  - enabled: boolean

---

## 10. Map Configuration
**Location:** `src/content/pages/profile.json`

**Current:** mapUrl is already in content but URL is hardcoded

**Enhancement:** Could create a dedicated maps config if multiple maps are needed

---

## 11. Constants and Magic Numbers
**Location:** `src/config.ts` and various components

**Hardcoded Values:**
- ARTICLES_PER_PAGE = 6
- Various CSS duration values (300ms, 2.5s)
- Threshold values (0.5)
- Retry counts and delays

**Migration Target:** Extend `src/content/config/site.json`

**Schema Requirements:**
- Add constants object:
  - pagination:
    - articlesPerPage: number
    - itemsPerPage: number
  - timing:
    - transitionDuration: number
    - animationDuration: number

---

## Implementation Strategy

### Phase 1: Core Configuration (Priority: High)
1. Create dashboard.json for dashboard configuration
2. Create resources.json for external CDN/fonts
3. Extend site.json with constants and SEO config
4. Create ui.json for animation/UI settings

### Phase 2: Forms and Dynamic Content (Priority: High)
1. Create forms collection with aspirasi and survey forms
2. Create surveys collection with teams, schedule, guidelines
3. Update kontak.astro and survei.astro to use collections

### Phase 3: Static Pages (Priority: Medium)
1. Create privacy-policy.json
2. Create 404.json
3. Create sharing.json for social share configs

### Phase 4: Refinement (Priority: Low)
1. Extract any remaining hardcoded values
2. Create utilities for accessing config values
3. Add validation and type safety
4. Documentation updates

---

## Collection Schema Updates

### New Collections to Create:

#### 1. forms Collection
Path: `src/content/forms/`
Type: JSON
Purpose: Store form configurations

#### 2. surveys Collection  
Path: `src/content/surveys/`
Type: JSON
Purpose: Store survey-related data (teams, schedule, guidelines)

### Extend Existing Collections:

#### config Collection
Add new files:
- dashboard.json
- resources.json
- ui.json
- sharing.json

Update schema in `src/content/config.ts` to support these new configurations.

---

## Schema Definitions Required

### Add to config.ts:

New schemas needed for:
1. dashboard configuration schema
2. resources configuration schema (fonts, CDNs)
3. UI configuration schema (animations, transitions)
4. forms configuration schema
5. surveys configuration schema
6. sharing configuration schema

Each schema should use Zod validation with appropriate types and optional fields where needed.

---

## Benefits of Migration

1. **Centralized Configuration**: All settings in one place
2. **Type Safety**: Zod validation ensures data integrity
3. **Easy Updates**: Non-developers can update JSON files
4. **Version Control**: Track configuration changes
5. **Environment Flexibility**: Easy to have different configs for dev/prod
6. **Testing**: Easier to mock and test with structured data
7. **Documentation**: Self-documenting through schema
8. **Performance**: Astro optimizes content collection loading

---

## Best Practices to Follow

1. **Schema Design**:
   - Use descriptive field names
   - Add optional fields where appropriate
   - Use enums for limited choices
   - Validate URLs, emails, dates properly
   - Include descriptions in schema

2. **File Organization**:
   - Group related configs in subdirectories
   - Use consistent naming conventions
   - Keep files focused and single-purpose
   - Separate concerns (forms vs content vs config)

3. **Data Structure**:
   - Prefer flat structures when possible
   - Use arrays for repeating data
   - Normalize when appropriate (avoid duplication)
   - Include metadata (version, lastUpdated)

4. **Type Safety**:
   - Export collection entry types
   - Use TypeScript for accessing collections
   - Leverage Astro's generated types
   - Add JSDoc comments for clarity

5. **Default Values**:
   - Define sensible defaults in schema
   - Document why defaults were chosen
   - Make critical values required
   - Use optional for truly optional data

6. **Validation**:
   - Validate at schema level (Zod)
   - Add runtime checks where needed
   - Provide helpful error messages
   - Fail fast on invalid data

7. **Migration Path**:
   - Migrate incrementally, test each phase
   - Keep old code until new is verified
   - Document breaking changes
   - Provide migration scripts if needed

---

## Testing Strategy

1. Verify each collection loads correctly
2. Test that pages render with new data sources
3. Validate form submissions still work
4. Check dashboard functionality
5. Ensure SEO metadata is preserved
6. Test social sharing functionality
7. Verify animations and UI behavior
8. Check error handling and fallbacks

---

## Rollback Plan

1. Keep original files with `.backup` extension
2. Use git branches for migration work
3. Test thoroughly before merging
4. Document any breaking changes
5. Have rollback commit ready if needed

---

## Notes

- All external URLs should be validated
- Sensitive data (like password hashes) should remain in env vars or server config, not in collections
- Consider creating a config validation utility
- Document how to add new config values
- Keep this plan updated as migration progresses
