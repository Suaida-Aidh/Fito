from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings

def send_verification_email(user, activation_url):
    mail_subject = 'Activate Your Account'

    message = render_to_string('email_verrification.html', {
        'user': user,
        'activation_url': activation_url,
    })