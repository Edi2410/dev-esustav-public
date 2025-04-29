from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from estudenti.models import User, AcademicYear
from eizbori.models import Elections, VotingDocuments

# Create your tests here.


class ElectionsViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.academic_year = AcademicYear.objects.create(description='2023/2024', active=True, start_date="2022-09-01",
            end_date="2023-06-30",)


    def test_return_active_election(self):
        Elections.objects.create(
            description="Izbori 2024", 
            academic_year=self.academic_year,
            active=True,
            vote_active=True,
        ).save()
        url = reverse('elections-list') 
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['description'], "Izbori 2024")

    def test_no_active_election(self):
        # Nema aktivnih izbora
        url = reverse('elections-list')  
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('error', response.data)
        self.assertEqual(response.data['error'], 'Nema izbora')

    def test_user_must_be_authenticated(self):
        self.client.force_authenticate(user=None)
        url = reverse('elections-list')  
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
class ElectionsDocumentsViewTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.academic_year = AcademicYear.objects.create(
            description='2023/2024',
            active=True,
            start_date="2022-09-01",
            end_date="2023-06-30"
        )
        self.election = Elections.objects.create(
            description="Izbori 2023/24",
            academic_year=self.academic_year,
            active=True
        )

    def test_returns_documents_for_active_election(self):
        VotingDocuments.objects.create(
            elections=self.election,
            document_title="Statut",
            document_link="http://statut.pdf",
            deleted=False
        ).save
        url = reverse('elections-documents-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['document_title'], "Statut")

    def test_returns_empty_list_if_no_documents(self):
        url = reverse('elections-documents-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_user_must_be_authenticated(self):
        self.client.force_authenticate(user=None)
        url = reverse('elections-documents-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)