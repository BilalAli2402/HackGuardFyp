from django.contrib import admin
from .models import User, Role, Permission, Question, Answer

admin.site.register(User)
admin.site.register(Role)
admin.site.register(Permission)
admin.site.register(Question)
admin.site.register(Answer)
