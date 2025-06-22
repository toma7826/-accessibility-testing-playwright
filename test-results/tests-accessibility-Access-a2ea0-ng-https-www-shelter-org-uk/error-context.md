# Page snapshot

```yaml
- region "Cookie preferences":
  - dialog "Help us improve your experience with Shelter":
    - heading "Help us improve your experience with Shelter" [level=1]
    - paragraph: By accepting our recommended cookies, you will help us improve your own experience by remembering your settings
    - button "I accept cookies"
    - button "I reject cookies"
    - button "Cookie settings"
- main:
  - img
  - article:
    - heading "Please select your location" [level=2]
    - link "England":
      - /url: https://england.shelter.org.uk
    - link "Scotland":
      - /url: https://scotland.shelter.org.uk
    - link "Wales":
      - /url: https://sheltercymru.org.uk/
    - link "Northern Ireland":
      - /url: https://www.housingadviceni.org/
    - paragraph: We need to know this because housing laws differ between countries in the UK
  - heading "We're here for everyone, but only with your help" [level=3]
  - text: Donate amount, suggest £50
  - textbox "Donate amount, suggest £50"
  - button "Donate now"
```