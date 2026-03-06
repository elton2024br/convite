#!/usr/bin/env python3
"""
Backend API Tests for Monte Verde Invitation Website
Testing all endpoints for the digital invitation landing page
"""

import requests
import json
import sys
from datetime import datetime

class MonteVerdeAPITester:
    def __init__(self):
        self.base_url = "https://mv-prelaunch-digital.preview.emergentagent.com/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.session = requests.Session()
        self.session.headers.update({'Content-Type': 'application/json'})

    def log_test(self, name, success, response_data=None, error=None):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
            if response_data:
                print(f"   Response: {json.dumps(response_data, indent=2)}")
        else:
            print(f"❌ {name} - FAILED")
            if error:
                print(f"   Error: {error}")

    def test_api_root(self):
        """Test root API endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/")
            success = response.status_code == 200
            data = response.json() if success else {}
            
            if success and "message" in data:
                self.log_test("API Root Endpoint", True, data)
            else:
                self.log_test("API Root Endpoint", False, error=f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_test("API Root Endpoint", False, error=str(e))
            return False

    def test_get_event_info(self):
        """Test GET /api/event endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/event")
            success = response.status_code == 200
            data = response.json() if success else {}
            
            # Validate event info structure
            if success:
                required_fields = ["title", "date", "time", "location", "whatsapp", "maps_url"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    # Validate specific values
                    if (data.get("date") == "21/03" and 
                        data.get("time") == "15:00" and
                        "Fazenda da Mata" in data.get("location", "") and
                        data.get("whatsapp") == "5535991232422"):
                        self.log_test("GET Event Info", True, data)
                    else:
                        self.log_test("GET Event Info", False, error="Event data values don't match expected")
                else:
                    self.log_test("GET Event Info", False, error=f"Missing fields: {missing_fields}")
            else:
                self.log_test("GET Event Info", False, error=f"Status: {response.status_code}")
            
            return success
        except Exception as e:
            self.log_test("GET Event Info", False, error=str(e))
            return False

    def test_create_rsvp(self):
        """Test POST /api/rsvp endpoint"""
        try:
            test_rsvp = {
                "name": "João Silva",
                "phone": "5535999887766",
                "email": "joao@example.com",
                "guests": 2
            }
            
            response = self.session.post(f"{self.base_url}/rsvp", json=test_rsvp)
            success = response.status_code == 200
            data = response.json() if success else {}
            
            if success:
                # Validate RSVP response structure
                required_fields = ["id", "name", "phone", "email", "guests", "confirmed_at"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    # Validate values match input
                    if (data.get("name") == test_rsvp["name"] and
                        data.get("phone") == test_rsvp["phone"] and
                        data.get("email") == test_rsvp["email"] and
                        data.get("guests") == test_rsvp["guests"] and
                        data.get("confirmed_at")):
                        self.log_test("POST RSVP Creation", True, data)
                        return data.get("id")  # Return ID for further testing
                    else:
                        self.log_test("POST RSVP Creation", False, error="RSVP data doesn't match input")
                else:
                    self.log_test("POST RSVP Creation", False, error=f"Missing fields: {missing_fields}")
            else:
                self.log_test("POST RSVP Creation", False, error=f"Status: {response.status_code}")
            
            return False
        except Exception as e:
            self.log_test("POST RSVP Creation", False, error=str(e))
            return False

    def test_get_rsvps(self):
        """Test GET /api/rsvps endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/rsvps")
            success = response.status_code == 200
            data = response.json() if success else []
            
            if success:
                if isinstance(data, list):
                    self.log_test("GET RSVPs List", True, {"count": len(data), "sample": data[:2] if data else []})
                else:
                    self.log_test("GET RSVPs List", False, error="Response is not a list")
            else:
                self.log_test("GET RSVPs List", False, error=f"Status: {response.status_code}")
            
            return success
        except Exception as e:
            self.log_test("GET RSVPs List", False, error=str(e))
            return False

    def test_rsvp_validation(self):
        """Test RSVP validation with invalid data"""
        try:
            # Test missing required fields
            invalid_rsvp = {"name": "Test User"}  # Missing phone
            
            response = self.session.post(f"{self.base_url}/rsvp", json=invalid_rsvp)
            success = response.status_code == 422  # Validation error expected
            
            if success:
                self.log_test("RSVP Validation (missing phone)", True, {"status": "Validation error as expected"})
            else:
                self.log_test("RSVP Validation (missing phone)", False, error=f"Status: {response.status_code}")
            
            return success
        except Exception as e:
            self.log_test("RSVP Validation (missing phone)", False, error=str(e))
            return False

    def run_all_tests(self):
        """Run comprehensive backend API tests"""
        print("🚀 Starting Monte Verde Backend API Tests")
        print(f"📍 Base URL: {self.base_url}")
        print("=" * 60)
        
        # Test API root
        self.test_api_root()
        
        # Test event info endpoint
        self.test_get_event_info()
        
        # Test RSVP creation
        rsvp_id = self.test_create_rsvp()
        
        # Test RSVP list
        self.test_get_rsvps()
        
        # Test validation
        self.test_rsvp_validation()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"✅ Success Rate: {success_rate:.1f}%")
        
        if success_rate == 100:
            print("🎉 All backend tests passed!")
        elif success_rate >= 80:
            print("⚠️  Most tests passed, minor issues detected")
        else:
            print("❌ Critical backend issues detected")
        
        return success_rate >= 80

def main():
    tester = MonteVerdeAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())