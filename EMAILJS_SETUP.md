# Email Configuration Setup

## Current Setup: PHP Backend with send-email.php

This website uses a **PHP backend** to handle contact form submissions. The form data is sent to `support@kenyadiasporabanking.com`.

## How It Works

1. **Form Submission**: User fills out the contact form on the website
2. **Validation**: Form data is validated on both client-side and server-side
3. **Email Sent**: PHP script sends an HTML-formatted email to the configured email address
4. **Response**: User sees a success/error message on the website

## Files Involved

- **Frontend**: `index.html` - Contact form HTML
- **Backend**: `send-email.php` - Email handler script
- **JavaScript**: `main.js` - Form submission handling and notifications
- **Styling**: `style.css` - Notification styles

## Server Requirements

Your hosting provider (GoDaddy or cPanel) must have:
- ✅ PHP support (version 5.6+)
- ✅ mail() function enabled (default on most hosts)
- ✅ SMTP server configured (usually automatic)

## Email Recipient

Currently configured to send emails to: **support@kenyadiasporabanking.com**

To change the recipient email, edit `send-email.php` line 71:
```php
$to = 'support@kenyadiasporabanking.com';  // Change this email
```

## Testing After Upload

1. Upload all files to your GoDaddy/cPanel hosting
2. Go to your website and scroll to the "Contact" section
3. Fill out the contact form and submit
4. You should receive an email at the configured address

## Features

✨ **Client-Side Validation**: Checks before sending
✨ **Server-Side Validation**: Extra security check
✨ **HTML Email Format**: Professional email template
✨ **Auto-Reply Handling**: Users can reply to the email
✨ **User Feedback**: Success/error messages on website
✨ **Error Handling**: Graceful error messages
✨ **Security**: Input sanitization & XSS protection

## Troubleshooting

**Emails not arriving?**
1. Check spam/junk folder
2. Contact your hosting provider's support
3. Ask them to verify mail() function is enabled

**Form shows error?**
1. Check browser console (F12 → Console tab) for errors
2. Verify send-email.php is uploaded to root directory
3. Check file permissions (should be readable)

## Support

If you need to switch to a different email service (like Mailgun, SendGrid), you can modify the send-email.php file or contact your developer.
