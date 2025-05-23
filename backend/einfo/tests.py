from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from einfo.utils import add_user_activity
from estudenti.models import Roles, TeamGroups, Teams, User, AcademicYear, UsersPositions, VirtualTeams
from einfo.models import CertificateRequirements
from eaktivnosti.models import ActivityType, ActivityTypeRequirements, UserActivity, Activity
from enums.ActivityTypeEnums import ActivityTypeEnums


class CertificateRequirementsViewTests(APITestCase):
    def setUp(self):
        # Create a test user and authenticate
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        # Create a sample academic year that is active
        self.academic_year = AcademicYear.objects.create(
            description="2023/2024",  
            start_date="2023-09-01",
            end_date="2024-06-30",
            active=True,
            )
        # Create role and teams
        self.role = Roles.objects.create(name="Participant")
        self.team_group = TeamGroups.objects.create(name="Engineering")
        self.team = Teams.objects.create(name="Backend Team", TeamGroups=self.team_group)
        self.virtual_team = VirtualTeams.objects.create(name="Virtual Team A", TeamGroups=self.team_group)

        # Create a UsersPosition for additional testing
        self.users_position = UsersPositions.objects.create(
            user=self.user,
            team=self.team,
            team_group=self.team_group,
            virtual_team=self.virtual_team,
            role=self.role,
            academic_year=self.academic_year
        )

        # Create CertificateRequirement
        self.certificate_requirement = CertificateRequirements.objects.create(
            user=self.user,
            academic_year=self.academic_year
        )
        
        self.activity_type_sastanak = ActivityType.objects.create(
            name=ActivityTypeEnums.SASTANAK.value
        )
        self.activity_type_standiranje = ActivityType.objects.create(
            name=ActivityTypeEnums.STANDIRANJE.value
        )
        self.activity_req_sastanak = ActivityTypeRequirements.objects.create(
            academic_year=self.academic_year,
            activity_type=self.activity_type_sastanak,
            role_group=self.role.role_group,
            value=5,  # ispravno!
        )
        self.activity_req_standiranje = ActivityTypeRequirements.objects.create(
            academic_year=self.academic_year,
            activity_type=self.activity_type_standiranje,
            role_group=self.role.role_group,
            value=2,  # ispravno!
        )


    def test_list_certificate_requirements(self):
        url = reverse("admin-list")  # Adjust this name
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_certificate_requirements(self):
        url = reverse("admin-detail", kwargs={"pk": self.user.pk})  # Adjust name
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("certificate_requirements", response.data)

    def test_create_new_empty_requirements(self):
        url = reverse("admin-create-new-empty-requirements")
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_set_all_true_suprach_1(self):
        url = reverse("admin-set-all-true-for-suprach1")
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.certificate_requirement.refresh_from_db()
        self.assertTrue(self.certificate_requirement.suprach_1)

    def test_set_all_true_suprach_2(self):
        url = reverse("admin-set-all-true-for-suprach2")
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.certificate_requirement.refresh_from_db()
        self.assertTrue(self.certificate_requirement.suprach_2)

    def test_set_all_true_zivotopis(self):
        url = reverse("admin-set-all-true-for-zivotopis")
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.certificate_requirement.refresh_from_db()
        self.assertTrue(self.certificate_requirement.zivotopis)

    def test_set_all_true_bootcamp(self):
        url = reverse("admin-set-all-true-for-bootcamp")
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.certificate_requirement.refresh_from_db()
        self.assertTrue(self.certificate_requirement.bootcamp)

    def test_retrieve_certificate_requirements_not_found(self):
        CertificateRequirements.objects.all().delete()
        url = reverse("admin-detail", kwargs={"pk": self.user.pk})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
    def test_create_new_empty_requirements_idempotent(self):
        url = reverse("admin-create-new-empty-requirements")
        response1 = self.client.post(url)
        response2 = self.client.post(url)
        self.assertEqual(response1.status_code, status.HTTP_200_OK)
        self.assertEqual(response2.status_code, status.HTTP_200_OK)
        self.assertEqual(CertificateRequirements.objects.filter(user=self.user).count(), 1)

    def test_anonymous_user_cannot_access(self):
        self.client.force_authenticate(user=None)
        url = reverse("admin-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_retrieve_certificate_requirements_invalid_user(self):
        url = reverse("admin-detail", kwargs={"pk": 9999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_certificate_requirements_json_data_correct(self):
        # Dodaj 3 sastanka i 1 standiranje
        for _ in range(3):
            add_user_activity(
                self.user,
                self.activity_type_sastanak,
                self.academic_year,
                self.team,
                self.virtual_team
            )
        add_user_activity(
            self.user,
            self.activity_type_standiranje,
            self.academic_year,
            self.team,
            self.virtual_team
        )

        url = reverse("clan-list") + f"?id={self.user.id}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        

        sastanak = next((it for it in data if it['aktivnost'] == self.activity_type_sastanak.name), None)
        standiranje = next((it for it in data if it['aktivnost'] == self.activity_type_standiranje.name), None)
        self.assertIsNotNone(sastanak)
        self.assertIsNotNone(standiranje)
        self.assertEqual(sastanak['potrebno'], self.activity_req_sastanak.value)
        self.assertEqual(standiranje['potrebno'], self.activity_req_standiranje.value)
        self.assertEqual(sastanak.get('prisustvovao', None), 3) 
        self.assertEqual(standiranje.get('prisustvovao', None), 0)