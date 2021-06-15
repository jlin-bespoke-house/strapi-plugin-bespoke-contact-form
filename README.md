# Strapi plugin bespoke-contact-form

Strapi plugin allowing for contact form submission (with Bespoke) along with an email notification.

## Required ENV VARIABLES

```
GOOGLE_CAPTCHA_SECRET_KEY
BESPOKE_CONTACT_FORM_EMAIL - email where notification will be sent, you can list multiple emails by using a space delimited string i.e. "john@smith.com jane@smith.com"
MAILCHIMP_SERVER_PREFIX - i.e. us19
MAILCHIMP_SECRET_KEY - Mailchimp API Key
MAILCHIMP_LIST_ID - Mailchimp [Audience List](https://mailchimp.com/help/find-audience-id/)
```