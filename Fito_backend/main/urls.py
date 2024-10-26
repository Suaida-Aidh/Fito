from django.urls import path
from . import views

urlpatterns = [

    path('user/activate/<uidb64>/<token>/', views.activate, name='activate'),
    path("user/register/", views.UserRegisteration.as_view(), name="create-user"),
    path("user/login/", views.UserLogin.as_view(), name="login-user"),


   
]