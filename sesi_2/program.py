# Conditionals
x=0
y=5
if x < y:
    print('x < y true')

if y < x:
    print('y < x true')

if x:
    print('x true')

if y:
    print('y true')

if 'aul' in 'grault':
    print('aul in grault is true')

if 'quux' in ['foo','bar','quux']:
    print('quux in list')


weather = 'cloudy'
weather = 'nice'
if  weather == 'nice':
    print('Mow the lawn')
    print('Weed the garden')
    print('Take the dog for a walk')
else:
    print('Read a book')
    print('Watch the movies')

if 'foo' in ['bar', 'baz', 'qux']:
    print('Expression was true')
    print('Executing statement in suite')
    print('...')
    print('Done.')
    
print('After conditional')

# Does line execute?                        Yes    No
#                                           ---    --
if 'foo' in ['foo', 'bar', 'baz']:        #  x
    print('Outer condition is true')      #  x

    if 10 > 20:                           #  x
        print('Inner condition 1')        #        x

    print('Between inner conditions')     #  x

    if 10 < 20:                           #  x
        print('Inner condition 2')        #  x

    print('End of outer condition')       #  x
print('After outer condition')            #  x


x = 120

if x < 50:
    print('(first suite)')
    print('x is small')
else:
    print('(second suite)')
    print('x is large')


hargaBuku = 20000
hargaMajalah = 5000
uang = 2000

if uang > hargaBuku:
    print("beli buku")
elif uang > hargaMajalah:
    print("beli majalah")
else:
    print("uang tidak cukup")


name = 'Hacktiv8'
if name == 'Fred':
    print('Hello Fred')
elif name == 'Xander':
    print('Hello Xander')
elif name == 'Hacktiv8':
    print('Hello Hacktiv8')
elif name == 'Arnold':
    print('Hello Arnold')
else:
    print("I don't know who you are!")


if 'a' in 'bar':
    print('foo')
elif 1/0:
    print("This won't happen")
elif var:
    print("This won't either")


if 'f' in 'foo': print('1'); print('2'); print('3')


x = 2

if x == 1: print('foo'); print('bar'); print('baz')
elif x == 2: print('qux'); print('quux')
else: print('corge'); print('grault')

x = 3
if x == 1:
    print('foo')
    print('bar')
    print('baz')
elif x == 2:
    print('qux')
    print('quux')
else:
    print('corge')
    print('grault')

raining = False
print("Let's go to the", 'beach' if not raining else 'library')


# looping
n = 5
while n > 0:
    n -= 1
    print(n)


i = 1
while i < 6:
  print(i)
  i += 1


n = 5
while n > 0:
    n -= 1
    if n == 2:
        break # Break Statement
    print(n)
print('Loop ended.')


n = 5
while n > 0:
    n -= 1
    if n == 2:
        continue
    print(n)
print('Loop ended.')


n = 5
while n > 0:
    n -= 1
    print(n)
else:
    print('Loop done.')


n = 5
while n > 0:
    n -= 1
    print(n)
    if n == 2:
        break
else:
    print('Loop done.')


a = ['foo', 'bar']

while len(a):
    print(a.pop(0))
    
    b = ['baz', 'qux']

    while len(b):
        print('>', b.pop(0))


n = 5
while n > 0: n -= 1; print(n)


a = ['foo', 'bar', 'baz']
for i in a:
    print(i)

d = {'foo': 1, 'bar': 2, 'baz': 3}
for k in d:
    print(k)

for k in d:
    print(d[k])

for k in d.values():
    print(k)

for k, v in d.items(): 
    print(k, ":", v) 
