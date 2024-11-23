from rest_framework import serializers
from .models import Payment
from main.serializers import SubscriptionSerializer

class PaymentSerializer(serializers.ModelSerializer):
    subscription = SubscriptionSerializer()
    order_date = serializers.DateTimeField(format="%d %B %Y %I:%M %p")

    class Meta:
        model = Payment
        fields = '__all__'