from django.urls import path
from . import views

urlpatterns = [
    path('user/activate/<uidb64>/<token>/', views.activate, name='activate'),
    path("user/register/", views.UserRegisteration.as_view(), name="create-user"),
    path("user/login/", views.UserLogin.as_view(), name="login-user"),

    # Admin
    path('admin/subscriptions/', views.SubscriptionCreateList.as_view(), name='subscription-create-list'),
    path('admin/subscriptions/<int:pk>/', views.SubscriptionDetailView.as_view(), name='subscription-detail'),
    path('admin/trainers/', views.TrainerListCreateView.as_view(), name='trainer-list-create'),
    path('admin/trainers/<int:pk>/', views.TrainerDetailView.as_view(), name='trainer-detail'),

    # USER
    path('user/subscriptions/', views.UserSubscriptionListView.as_view(), name='user-subscription-list'),
    path('trainersList/', views.UserTrainerListView.as_view(), name='user-trainer-list'),
]
