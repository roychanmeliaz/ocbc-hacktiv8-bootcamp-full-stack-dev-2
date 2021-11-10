# konverter celsius-kelvin
def celsiusKelvinConverter(temp, type="celsiusToKelvin"):
    '''
    Fungsi ini digunakan untuk mengkonversi suhu celsius ke kelvin atau kelvin ke celsius
    :param temp: nilai temperatur yang ingin di convert | int or float
    :param type: gunakan "celsiusToKelvin" (default) atau "kelvinToCelsius" | string

    :return: temp: hasil konversi | float
    '''            
    if type=="celsiusToKelvin":
        return temp + 273.15 # return formula konversi celsius ke kelvin
    elif type=="kelvinToCelsius":
        return temp - 273.15 # return formula konversi kelvin ke celsius

# konversi ke fahrenheit
def toFahrenheit(temp, type):
    '''
    Fungsi ini digunakan untuk mengkonversi suhu ke fahrenheit dari celsius atau kelvin
    :param temp: nilai temperatur yang ingin di convert | int or float
    :param type: tujuan konversi, "celsius" atau "kelvin" | string

    :return: temp: hasil konversi | float
    '''            
    if type == 'celsius': # jika dari celsius
        return (temp * 9/5) + 32 # return formula konversi celsius ke fahrenheit seperti biasa
    elif type == 'kelvin': # jika dari kelvin
        return (celsiusKelvinConverter(temp,"kelvinToCelsius") * 9/5) + 32 # konversi kelvin ke celsius dulu lalu return formula konversi celsius ke fahrenheit

# konversi dari fahrenheit
def fromFahrenheit(temp, type):
    '''
    Fungsi ini digunakan untuk mengkonversi suhu dari fahrenheit ke celsius atau kelvin
    :param temp: nilai temperatur yang ingin di convert | int or float
    :param type: asal konversi, "celsius" atau "kelvin" | string

    :return: temp: hasil konversi | float
    '''            
    if type == 'celsius': # jika ke celsius
        return (temp - 32) * 5/9 # return formula konversi fahrenheit ke celsius seperti biasa
    elif type == 'kelvin': # jika ke kelvin
        return celsiusKelvinConverter((temp - 32) * 5/9,"celsiusToKelvin") # return formula konversi fahrenheit ke celsius dulu lalu hasilnya dikonversi ke kelvin

print("-------- Program Konversi Temperatur --------")
print("Menu: ")
print("1. Konversi celsius ke kelvin")
print("2. Konversi kelvin ke celsius")
print("3. Konversi celsius ke fahrenheit")
print("4. Konversi kelvin ke fahrenheit")
print("5. Konversi fahrenheit ke celsius")
print("6. Konversi fahrenheit ke kelvin")
print("Masukkan angka dari 1-6:")
inp = int(input().strip())
print("Masukkan suhu:")
temp = float(input().strip())
print("Hasil konversi adalah:")
if inp==1:
    print(celsiusKelvinConverter(temp,"celsiusToKelvin"))
elif inp==2:
    print(celsiusKelvinConverter(temp,"kelvinToCelsius"))
elif inp==3:
    print(toFahrenheit(temp,'celsius'))
elif inp==4:
    print(toFahrenheit(temp,'kelvin'))
elif inp==5:
    print(fromFahrenheit(temp,'celsius'))
elif inp==6:
    print(fromFahrenheit(temp,'kelvin'))

# demo cepat,silahkan di uncomment
# print(celsiusKelvinConverter(100,"celsiusToKelvin"))    # hasilnya 373.5
# print(celsiusKelvinConverter(373.15,"kelvinToCelsius")) # hasilnya 100
# print(toFahrenheit(0,'celsius'))                        # hasilnya 32
# print(toFahrenheit(273.15,'kelvin'))                    # hasilnya 32
# print(fromFahrenheit(32,'celsius'))                     # hasilnya 0
# print(fromFahrenheit(32,'kelvin'))                      # hasilnya 273.15
