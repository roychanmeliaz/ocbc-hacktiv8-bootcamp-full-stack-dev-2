from selenium import webdriver
import time
import argparse
from Crypto.Cipher import AES

def padding_msg(msg):
    while len(msg)%16 != 0:
        msg = msg + " "
    return msg

key = padding_msg('chl!gV1SY!9Pl')
iv = padding_msg('%4wEp)l+g61b$Nh')

pass_enc = b'\xb6V\xf5\xbb\xf8\xaf\xa1\xf9\xd3\x1f\xbfi\xbb\xf9\xc6\x98'

dec = AES.new(key.encode("utf8"), AES.MODE_CBC, iv.encode("utf8"))
my_pass = dec.decrypt(pass_enc).rstrip().decode()

ap = argparse.ArgumentParser()
ap.add_argument("-c", "--clock", type=str, default="out", help="in / out")

args = vars(ap.parse_args())

chrome_driver_path = "E:\SOFTWARE\Chrome Webdriver\chromedriver_win32 baru\chromedriver.exe"
driver = webdriver.Chrome(executable_path=chrome_driver_path)

login_data = {
'nik': '820013',
'password': my_pass
}
driver.get('https://attendance.onelabs.co/login')

nik = driver.find_element_by_xpath('//*[@id="root"]/div/div/form/div[1]/div/div/input')
nik.send_keys(login_data['nik'])

password = driver.find_element_by_xpath('//*[@id="root"]/div/div/form/div[2]/div/div[1]/input')
password.send_keys(login_data['password'])

login_button = driver.find_element_by_xpath('//*[@id="root"]/div/div/form/button')
login_button.click()

time.sleep(5)

if(args['clock'] == 'out'):
	clock_out_button = driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/button[2]')
	clock_out_button.click()

	yes_button = driver.find_element_by_xpath('//*[@id="modal-portal"]/div/div/div/div/div/div/div[2]/button[1]')
	yes_button.click()

elif(args['clock'] == 'in'):
	yes_feeling_healthy = driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/button[1]')
	yes_feeling_healthy.click()

	next_button_1 = driver.find_element_by_xpath('//*[@id="root"]/div/button')
	next_button_1.click()

	no_trip = driver.find_element_by_xpath('//*[@id="root"]/div/div[3]/div[2]/input')
	no_trip.click()

	next_button_2 = driver.find_element_by_xpath('//*[@id="root"]/div/button')
	next_button_2.click()

	clock_in_button = driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/button[1]')
	clock_in_button.click()

	yes_location = driver.find_element_by_xpath('//*[@id="root"]/div/div[4]/div[1]/button')
	yes_location.click()
	# feeling healthy
	# choice
	# //*[@id="root"]/div/div[2]/button[1]
	# btn
	# //*[@id="root"]/div/button

	# trip
	# no
	# //*[@id="root"]/div/div[3]/div[2]/input
	# btn
	# //*[@id="root"]/div/button


	# clockin
	# //*[@id="root"]/div/div[2]/button[1]
	# location -> yes
	# //*[@id="root"]/div/div[4]/div[1]/button
	# print(clock_in_button)


# //*[@id="modal-portal"]/div/div/div/div/div/div/div[2]/button[1]
# yes

# cancel_button = driver.find_element_by_xpath('//*[@id="modal-portal"]/div/div/div/div/div/div/div[2]/button[2]')
# cancel_button.click()
# //*[@id="modal-portal"]/div/div/div/div/div/div/div[2]/button[2]
# cancel

# profile_button = driver.find_element_by_xpath('//*[@id="root"]/div/div[1]/div/div[2]/button')
# profile_button.click()

# time.sleep(3)
# logout_button = driver.find_element_by_xpath('//*[@id="root"]/div/div[2]/button[2]')
# logout_button.click()

# driver.quit()

