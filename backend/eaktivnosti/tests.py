
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from estudenti.models import User, AcademicYear, Teams
from eaktivnosti.serializers import IDSerializer
from eaktivnosti.models import Activity, ActivityType, UserActivity

class ActivityTypeViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.activity_type = ActivityType.objects.create(name="Predavanje")

    def test_list_activity_types(self):
        url = reverse('types-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_activity_type(self):
        url = reverse('types-list')
        data = {'name': 'Radionica', 'has_hour': True}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        

class ActivityViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.team = Teams.objects.create(name="Test Tim")
        self.academic_year = AcademicYear.objects.create(description="2023/2024", active=True,             start_date="2022-09-01",
            end_date="2023-06-30",)
        self.activity_type = ActivityType.objects.create(name="Predavanje")
        self.activity = Activity.objects.create(
            title="Testna aktivnost",
            description="Opis",
            academic_year=self.academic_year,
            team=self.team,
            activity_type=self.activity_type
        )

    def test_list_activities_for_active_year(self):
        url = reverse('activity-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Testna aktivnost", str(response.data))

    def test_create_activity(self):
        url = reverse('activity-list')
        data = {
            "title": "Nova aktivnost",
            "academic_year": self.academic_year.id,
            "team": self.team.id,
            "activity_type": self.activity_type.id
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class UserOnActivityViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.activity = Activity.objects.create(title="Aktivnost", academic_year=None)
        self.user_activity = UserActivity.objects.create(user=self.user, activity=self.activity)

    def test_list_user_on_activity(self):
        url = reverse('user-activity-list')
        response = self.client.get(url, {'id': self.activity.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user_on_activity(self):
        url = reverse('user-activity-list')
        data = {
            "user": self.user.id,
            "activity": self.activity.id
        }
        response = self.client.post(url, data)
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_201_CREATED])
        
class TeamLeadRecomendationViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.academic_year = AcademicYear.objects.create(description="2023/2024", active=True,start_date="2022-09-01",
            end_date="2023-06-30")

    def test_create_team_lead_recomendation(self):
        url = reverse('recomendations-list')
        data = {
            "user": self.user.id,
            "recommender": self.user.id,  # Simplified for test
            "academic_year": self.academic_year.id,
            "recommendation": "Odličan član!"
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_team_lead_recommendations(self):
        url = reverse('recomendations-list')
        response = self.client.get(url)
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_400_BAD_REQUEST])