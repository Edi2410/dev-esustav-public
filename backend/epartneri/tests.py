import json
from django.test import TestCase

from estudenti.models import AcademicYear, User
from epartneri.models import PartnerNotes, Partners, PartnersContact, Projects
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse

from rest_framework import status


#Unit Test for Models
class PartnersModelTest(TestCase):
    def test_create_partner(self):
        partner = Partners.objects.create(
            legal_name="Legal Co",
            brand_name="Brand Co",
            oib="123456789",
            address="123 Main St",
            black_list=False
        )
        self.assertEqual(partner.legal_name, "Legal Co")
        self.assertEqual(partner.brand_name, "Brand Co")
        self.assertEqual(partner.oib, "123456789")
        
        
#Integration Tests for Views
class PartnersViewTest(APITestCase):
    
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        # Create sample data
        self.partner = Partners.objects.create(
            legal_name="Legal Co",
            brand_name="Brand Co",
            oib="123456789",
            address="123 Main St",
            black_list=False
        )
    
    def test_list_partners(self):
        # URL to access the list endpoint
        url = reverse('partners-list')

        # Make a request to the endpoint
        response = self.client.get(url)

        # Assert the response status and data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['partner']['legal_name'], "Legal Co")

    def test_retrieve_partner(self):
            url = reverse('partners-detail', kwargs={'pk': self.partner.id})
            response = self.client.get(url)

            self.assertEqual(response.status_code, status.HTTP_200_OK)

            # Load JSON content
            response_data = json.loads(response.content)
            self.assertEqual(response_data['partner']['legal_name'], "Legal Co")
            self.assertEqual(response_data['partner']['brand_name'], "Brand Co")
            self.assertEqual(response_data['partner']['oib'], "123456789")
            self.assertEqual(response_data['partner']['address'], "123 Main St")
            
            
            
class PartnersContactsViewTest(APITestCase):

    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        # Create a sample partner
        self.partner = Partners.objects.create(
            legal_name="Legal Co",
            brand_name="Brand Co",
            oib="123456789",
            address="123 Main St",
            black_list=False
        )

    def test_list_partner_contacts(self):
        # Create a sample contact
        PartnersContact.objects.create(
            partner=self.partner,
            name="Contact Person",
            position="Manager",
            email="contact@example.com",
            phone_number="1234567890",
        )

        # URL to access the list endpoint
        url = reverse('partners-contacts-list')

        # Make a GET request to list contacts
        response = self.client.get(url)

        # Assert the response status and data
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
            
class PartnersContactModelTest(TestCase):
    def setUp(self):
        # Create a sample partner for the foreign key relationship
        self.partner = Partners.objects.create(
            legal_name="Legal Co",
            brand_name="Brand Co",
            oib="123456789",
            address="123 Main St",
            black_list=False
        )

    def test_create_partner_contact(self):
        # Create a new PartnersContact instance
        contact = PartnersContact.objects.create(
            partner=self.partner,
            name="Contact Person",
            position="Manager",
            email="contact@example.com",
            phone_number="1234567890"
        )

        # Assertions to ensure the contact is created and has the correct data
        self.assertEqual(contact.partner, self.partner)
        self.assertEqual(contact.name, "Contact Person")
        self.assertEqual(contact.position, "Manager")
        self.assertEqual(contact.email, "contact@example.com")
        self.assertEqual(contact.phone_number, "1234567890")            


class ProjectsViewTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        # Create a sample project
        Projects.objects.create(
            project_name="Sample Project",
            short_project_name="SP",
            is_deleted=False
        )

    def test_list_projects(self):
        url = reverse('projects-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
        


class NotesViewTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        # Create necessary foreign key objects
        self.partner = Partners.objects.create(
            legal_name="Legal Co",
            brand_name="Brand Co",
            oib="123456789",
            address="123 Main St",
            black_list=False
        )

        self.academic_year = AcademicYear.objects.create(
            description="2022/2023",
            start_date="2022-09-01",
            end_date="2023-06-30",
        )

        self.project = Projects.objects.create(
            project_name="Sample Project",
            short_project_name="SP",
            is_deleted=False
        )

        # Create a sample note
        PartnerNotes.objects.create(
            partner=self.partner,
            academic_year=self.academic_year,
            project=self.project,
            notes="Sample note"
        )

    def test_list_partner_notes(self):
        url = reverse('notes-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)