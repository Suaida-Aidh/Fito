from django.urls import path
from . import views

urlpatterns = [
    
    # Authentication
    path("user/register/", views.UserRegisteration.as_view(), name="create-user"),
    path("user/login/", views.UserLogin.as_view(), name="login-user"),
    path('activate/<uidb64>/<token>/', views.ActivateAccountView.as_view(), name='activate-account'),

    # subscripiton
    path('admin/subscriptions/', views.SubscriptionCreateList.as_view(), name='subscription-create-list'),
    path('admin/subscriptions/<int:pk>/', views.SubscriptionDetailView.as_view(), name='subscription-detail'),
    path('user/subscriptions/', views.UserSubscriptionListView.as_view(), name='user-subscription-list'),

    # user list
    path('users/list/', views.UserListView.as_view(), name='user-list'),

    #trainers
    path('admin/create-trainer/', views.TrainerRegistration.as_view(), name='trainer_register'),
    path('list-trainers/', views.TrainerListView.as_view(), name='admin-list-trainers'),
    path('admin/trainer/<int:pk>/', views.TrainerDetailView.as_view(), name='admin-trainer-detail'),

]
