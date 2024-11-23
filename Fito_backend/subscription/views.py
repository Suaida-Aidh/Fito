import json

import environ
import razorpay
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Payment
from .serializers import PaymentSerializer
from main.models import Subscription


env = environ.Env()

# you have to create .env file in same folder where you are using environ.Env()
# reading .env file which located in api folder
environ.Env.read_env()


@api_view(['POST'])
def start_payment(request):
    if not request.user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=401)

    user = request.user  # Get logged-in user
    subscription_id = request.data['subscription_id']
    subscription = Subscription.objects.get(id=subscription_id)

    client = razorpay.Client(auth=(env('PUBLIC_KEY'), env('SECRET_KEY')))
    payment = client.order.create({
        "amount": int(subscription.price) * 100,
        "currency": "INR",
        "payment_capture": "1"
    })

    order = Payment.objects.create(
        subscription=subscription,
        order_payment_id=payment['id'],
        user=user  # Link payment to the logged-in user
    )

    serializer = PaymentSerializer(order)

    data = {
        "payment": payment,
        "order": serializer.data,
        "user_email": user.email,
        "user_username": user.username
    }
    return Response(data)

@api_view(['POST'])
def handle_payment_success(request):
    if not request.user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=401)

    res = json.loads(request.data["response"])

    ord_id = ""
    raz_pay_id = ""
    raz_signature = ""

    for key in res.keys():
        if key == 'razorpay_order_id':
            ord_id = res[key]
        elif key == 'razorpay_payment_id':
            raz_pay_id = res[key]
        elif key == 'razorpay_signature':
            raz_signature = res[key]

    order = Payment.objects.get(order_payment_id=ord_id)

    data = {
        'razorpay_order_id': ord_id,
        'razorpay_payment_id': raz_pay_id,
        'razorpay_signature': raz_signature
    }

    client = razorpay.Client(auth=(env('PUBLIC_KEY'), env('SECRET_KEY')))
    check = client.utility.verify_payment_signature(data)

    if check is not None:
        return Response({'error': 'Something went wrong'})

    order.isPaid = True
    order.save()

    res_data = {
        'message': 'payment successfully received!'
    }

    return Response(res_data)



