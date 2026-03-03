import requests

url = "http://127.0.0.1:5000/register"

data = {
    "username": "testuser",
    "password": "1234"
}

response = requests.post(url, json=data)

print("Status code:", response.status_code)
print("Response JSON:", response.json())