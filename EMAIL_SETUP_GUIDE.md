# Email Setup Guide for Contact Form

## Option 1: EmailJS (Recommended - Already Implemented)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note down your **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Submission - {{user_name}}

Hello,

You have received a new contact form submission:

Name: {{user_name}}
Email: {{user_email}}
Phone: {{user_phone}}
Service Interest: {{service_type}}
Message: {{message}}

Best regards,
Arnav Engineering Services Website
```

4. Save the template and note down your **Template ID**

### Step 4: Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### Step 5: Update Your Code
Replace these placeholders in `script.js`:
- `YOUR_PUBLIC_KEY` → Your actual public key
- `YOUR_SERVICE_ID` → Your service ID
- `YOUR_TEMPLATE_ID` → Your template ID

### Step 6: Test
1. Open your website
2. Fill out the contact form
3. Submit and check if you receive the email

---

## Option 2: Formspree (Alternative - Simpler)

If you prefer a simpler solution, you can use Formspree:

### Step 1: Create Formspree Account
1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account
3. Create a new form

### Step 2: Update HTML
Replace the form tag in `index.html`:

```html
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Step 3: Remove EmailJS Code
Remove the EmailJS initialization and form handling code from `script.js` and replace with:

```javascript
// Simple form submission for Formspree
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Form will submit normally to Formspree
        // You can add success/error handling if needed
    });
}
```

---

## Option 3: Netlify Forms (If hosting on Netlify)

If you're hosting on Netlify, you can use their built-in form handling:

### Step 1: Add netlify attribute
Add `netlify` attribute to your form:

```html
<form id="contact-form" netlify>
```

### Step 2: Add hidden input
Add this hidden input field inside the form:

```html
<input type="hidden" name="_subject" value="New Contact Form Submission">
```

### Step 3: Remove EmailJS
Remove EmailJS code and let Netlify handle the form submission.

---

## Testing Your Setup

1. **Test the form**: Fill out all fields and submit
2. **Check your email**: You should receive the form submission
3. **Check browser console**: Look for any error messages
4. **Test validation**: Try submitting with empty fields

## Troubleshooting

### Common Issues:
1. **"EmailJS is not defined"**: Make sure the EmailJS script is loaded
2. **"Invalid service ID"**: Double-check your service ID
3. **"Template not found"**: Verify your template ID
4. **No emails received**: Check spam folder, verify email service setup

### Debug Mode:
Add this to your script.js to enable debug mode:
```javascript
emailjs.init('YOUR_PUBLIC_KEY', { debug: true });
```

## Security Notes

1. **Public Key**: The public key is safe to expose in frontend code
2. **Rate Limiting**: EmailJS has rate limits on free accounts
3. **Spam Protection**: Consider adding reCAPTCHA for production use
4. **Email Validation**: The current setup includes basic validation

## Next Steps

1. Choose your preferred option (EmailJS is already implemented)
2. Follow the setup steps for your chosen option
3. Test thoroughly
4. Consider adding reCAPTCHA for spam protection
5. Monitor form submissions and adjust as needed
