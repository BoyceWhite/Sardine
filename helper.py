import requests
import json

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

camera_list = []
for loc in locations:
    loc_clean = loc.strip().lower()
    camera_id = None
    for cam in cameraData:
        cam_loc = cam.get('Location', '').strip().lower()
        if cam_loc == loc_clean:
            camera_id = cam.get('Id')
            break
    if camera_id:
        camera_list.append([loc, camera_id])
    else:
        camera_list.append([loc, None])  # or skip if you prefer

# Write JSON file
with open("camera_list.json", "w") as json_file:
    json.dump(camera_list, json_file, indent=2)

# Write JavaScript file exporting the array
with open("camera_list.js", "w") as js_file:
    js_file.write("const cameraList = ")
    json.dump(camera_list, js_file, indent=2)
    js_file.write(";\n\nexport default cameraList;\n")

print("Files created: camera_list.json and camera_list.js")


