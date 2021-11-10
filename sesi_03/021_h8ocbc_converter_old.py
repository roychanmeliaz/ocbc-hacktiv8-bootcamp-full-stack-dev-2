# konversi dari celsius ke kelvin
def celsiusToKelvin(temp):
    return temp + 273.15 # return formula konversi celsius ke kelvin

# konversi dari kelvin ke celsius
def kelvinToCelsius(temp):
    return temp - 273.15 # return formula konversi kelvin ke celsius

# konversi ke fahrenheit
def toFahrenheit(temp, type):
    if type == 'celsius': # jika dari celsius
        return (temp * 9/5) + 32 # return formula konversi celsius ke fahrenheit seperti biasa
    elif type == 'kelvin': # jika dari kelvin
        return (kelvinToCelsius(temp) * 9/5) + 32 # konversi kelvin ke celsius dulu lalu return formula konversi celsius ke fahrenheit

# konversi dari fahrenheit
def fromFahrenheit(temp, type):
    if type == 'celsius': # jika ke celsius
        return (temp - 32) * 5/9 # return formula konversi fahrenheit ke celsius seperti biasa
    elif type == 'kelvin': # jika ke kelvin
        return celsiusToKelvin((temp - 32) * 5/9) # return formula konversi fahrenheit ke celsius dulu lalu hasilnya dikonversi ke kelvin


print(celsiusToKelvin(100))             # hasilnya 373.5
print(kelvinToCelsius(373.15))          # hasilnya 100
print(toFahrenheit(0,'celsius'))        # hasilnya 32
print(toFahrenheit(273.15,'kelvin'))    # hasilnya 32
print(fromFahrenheit(32,'celsius'))     # hasilnya 0
print(fromFahrenheit(32,'kelvin'))      # hasilnya 273.15
