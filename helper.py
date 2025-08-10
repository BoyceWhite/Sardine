import requests
import pyperclip

url = "https://yl3hltj9mf.execute-api.us-east-2.amazonaws.com/dev/SardineAPIHandler"

try:
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()
    cameraData = data.get("cameras", [])
except requests.exceptions.RequestException as e:
    print(f"Error fetching data: {e}")
    cameraData = []

locations = [
    "US-91 / 1100 S @ 775 W, BRC",
    "1100 S / US-89/91 @ Main St / US-89 / SR-13, BRC",
    "US-89/91 @ 100 S / MP 5.61, MTU",
    "US-89/91 @ Sardine Summit / MP 10.05, BE",
    "US-89/91 @ Milepost 12.26, CA",
    "US-89/91 @ Milepost 13.93, WVL",
    "US-89/91 @ Milepost 15.17, WVL",
    "US-89/91 @ 950 S / MP 17.18, WVL",
    "US-89/91 @ Main St / SR-101 / MP 19.18, WVL",
    "US-89/91 RWIS SB @ Milepost 19.9, WVL",
    "US-89/91 @ 3200 S / 2000 W, LGN",
    "US-89/91 @ 1000 W / SR-252, LGN",
    "US-89/91 @ 1700 S / Park Ave / 600 W, LGN",
    "Main St / US-89/91 @ 100 S, LGN",
    "Main St / US-89/91 @ 200 N / SR-30, LGN",
    "Main St / US-89/91 @ 400 N / US-89, LGN",
    "US-89 RWIS EB @ USU / 900 E / MP 460.2, LGN",
    "US-89 @ 1200 E, LGN"
]

shortNames = [
  "1100 S 775 W, Brigham City",
  "1100 S Main St, Brigham City",
  "100 S, Mantua",
  "Sardine Summit, Bear River",
  "MP 12.26, Cache Valley",
  "MP 13.93, Wellsville",
  "MP 15.17, Wellsville",
  "950 S, Wellsville",
  "Main St, Wellsville",
  "MP 19.9, Wellsville",
  "3200 S & 2000 W, Logan",
  "1000 W (SR-252), Logan",
  "1700 S & 600 W, Logan",
  "100 S Main St, Logan",
  "200 N Main St, Logan",
  "400 N Main St, Logan",
  "900 E, USU, Logan",
  "1200 E, Logan"
]


camera_list = []

for long_name, short_name in zip(locations, shortNames):
    long_clean = long_name.strip().lower()
    camera_id = None
    for cam in cameraData:
        if cam.get('Location', '').strip().lower() == long_clean:
            camera_id = cam.get('Id')
            break
    if camera_id:
        camera_list.append([short_name, camera_id])

# Build the JS array string
js_array_lines = ["const cameraList = ["]
for name, cam_id in camera_list:
    js_array_lines.append(f'    ["{name}", {cam_id}],')
js_array_lines.append("];")

js_array_str = "\n".join(js_array_lines)

pyperclip.copy(js_array_str)
print(js_array_str)
print('Copied to Clipboard')