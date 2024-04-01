from rest_framework.urls import path
from .views import UserAPIView, RoleView, RolePermissionView, PermissionView, UserLoginView, CreateQuestionsView, GetQuizView, AttemptQuizView, UserLogoutView, GetLeaderboardView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/', UserAPIView.as_view(), name='signup'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('roles/', RoleView.as_view(), name='create-role'),
    path('permissions/', PermissionView.as_view(), name='create-permission'),
    path('role-permissions/', RolePermissionView.as_view(), name='assign-permissions-to-role'),
    path('create-question/', CreateQuestionsView.as_view(), name='create-question'),
    path('get-quiz/', GetQuizView.as_view(), name='get-quiz'),
    path('attempt-quiz/', AttemptQuizView.as_view(), name='attempt-quiz'),
    path('leaderboard/', GetLeaderboardView.as_view(), name='leaderboard'),
]