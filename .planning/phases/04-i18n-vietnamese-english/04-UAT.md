---
status: testing
phase: 04-i18n-vietnamese-english
source: 04-01-SUMMARY.md, 04-02-SUMMARY.md, 04-03-SUMMARY.md
started: 2026-03-23T10:00:00Z
updated: 2026-03-23T10:00:00Z
---

## Current Test

number: 1
name: Default Locale Redirect
expected: |
  Opening the site root URL (/) redirects to /en/ without any manual intervention.
awaiting: user response

## Tests

### 1. Default Locale Redirect
expected: Opening the site root URL (/) redirects to /en/ without any manual intervention.
result: [pending]

### 2. URL-Based Locale Routing
expected: Navigating directly to /en/ loads the English version. Navigating to /vi/ loads the Vietnamese version. Both URLs work independently.
result: [pending]

### 3. LanguageSwitcher Toggle
expected: A visible VI|EN toggle exists on the page. Clicking it switches to the other locale and the URL updates to match (e.g., /en/ → /vi/).
result: [pending]

### 4. English Content Display
expected: With locale set to English (/en/), all section titles, bio, story text, project descriptions, value titles, and social labels display in English.
result: [pending]

### 5. Vietnamese Content Display
expected: With locale set to Vietnamese (/vi/), all section titles, bio, story text, project descriptions, value titles, and social labels display in Vietnamese.
result: [pending]

### 6. LanguageSwitcher Visual State
expected: The current locale is visually highlighted (bold or distinct style) in the switcher. The inactive locale is muted or dimmed.
result: [pending]

### 7. Navbar Name Display
expected: The navbar shows the site name ("Kazuha") regardless of locale. This is a proper noun and should not be translated.
result: [pending]

### 8. Page Title Localization
expected: The browser tab title changes based on locale. English shows English title, Vietnamese shows Vietnamese title.
result: [pending]

### 9. Skills Section Not Translated
expected: Skills section shows technical terms (Python, Docker, SIEM, etc.) in their original form regardless of locale.
result: [pending]

## Summary

total: 9
passed: 0
issues: 0
pending: 9
skipped: 0

## Gaps

[none yet]
