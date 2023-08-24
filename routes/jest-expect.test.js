test('Resolves to user object', async() =>{
    await expect(Promise.resolve({ username: 'Jane' }))
    .resolves.toStrictEqual({ username: 'Jane'})
})

test('rejects to input error', async() =>{
    await expect(Promise.reject(new Error('Input Error')))
            .rejects.toThrow('Input Error')
})

test('two decimal numbers are almost equal' , () =>{
    expect(3.142).toBeCloseTo(3.14)
    expect(Object.is(3.142, 3.142)).toBe(true)
})

test('Rejects octopus drinks and returns last with something', () =>{
    const drinkAll = (drinks, callback) =>{
        return drinks.map(drink =>({ drink, flavor: callback(drink) }))
    }

    const cbmock = jest.fn(drink => `${drink} new flavor`)

    drinkAll(['w', 'b', 'c', 'r'], cbmock)

    expect(cbmock).toHaveBeenCalled()
    expect(cbmock).toHaveBeenCalledTimes(4)
    expect(cbmock).toHaveBeenLastCalledWith('r')
    expect(cbmock).toHaveLastReturnedWith('r new flavor')
    expect(cbmock).toHaveNthReturnedWith(2, 'b new flavor')
    expect(cbmock).toHaveBeenNthCalledWith(2, 'b')
})

test('Returns something', () =>{
    const mockfn = jest.fn().mockReturnValue(true)
    mockfn()
    expect(mockfn).toHaveReturned()
})

test('Returns time 10', () =>{
    const mockfn = jest.fn().mockReturnValue(true)
    let index = 0
    while (index < 10){
        mockfn()
        index++
    }

    expect(mockfn).toHaveBeenCalledTimes(10)
    expect(mockfn).toHaveReturnedTimes(10)
    
})

test('Returns user object', () =>{
    const mockfn = jest.fn(name => ({ user: name }))

    mockfn('Jane')

    expect(mockfn).toHaveReturnedWith({ user: 'Jane' })
})

test('Returns string snd array of length 4', () =>{
    const mockfn = jest.fn(string => string)
    expect(mockfn('word')).toHaveLength(4)
})

test('this house has my desired features', () =>{
    const houseForSale = {
        bath: true,
        bedrooms: 4,
        garrage: true,
        cabinet: true,
        store:{
            area: 200,
            design: 'East African'
        },
        tools: ['Jembe', 'saw', 'panga'],
        kitchen: {
          amenities: ['sink', 'gas', 'cooker'],
          area: 20,
          wallColor: 'white',
          'nice.oven': true,
        },
        livingroom: {
          amenities: [
            {
              couch: [
                ['large', {dimensions: [20, 20]}],
                ['small', {dimensions: [10, 10]}],
              ],
            },
          ],
        },
        'ceiling.height': 2,
      };

      expect(houseForSale).toHaveProperty('bedrooms', 4)
      expect(houseForSale).toHaveProperty('cabinet')
      
      expect(houseForSale).toHaveProperty('garrage')
      expect(houseForSale).toHaveProperty('store.area', 200)
      expect(houseForSale).toHaveProperty('store.design', 'East African')
      expect(houseForSale).toHaveProperty('tools', ['Jembe', 'saw', 'panga'])
      expect(houseForSale).toHaveProperty( ['kitchen', 'amenities'], ['sink', 'gas', 'cooker'])


})

test('Adding works sanely with decimals' ,() =>{
    expect(.1 + .3).toBeCloseTo(.4)
})

test('Values is undefined', () =>{
    const name = undefined

    expect(name).not.toBeDefined()
})

test('Value is falsy', () =>{
    const count = 0

    expect(count).toBeFalsy()
})

test('Ounces per can is greater than 10', () =>{
    const ouncesPerCan = jest.fn().mockReturnValue(23)
    expect(ouncesPerCan()).toBeGreaterThan(10)
})

test('Age is less than 18', () =>{
    const getAge = jest.fn().mockReturnValue(4)

    expect(getAge()).toBeLessThan(18)
})

test('Height is less than or equal to 100', () =>{
    const getHeight = jest.fn().mockReturnValue(90)

    expect(getHeight()).toBeLessThanOrEqual(100)
})

test('Value is instance of a particular type', () =>{
    const getAge = () =>{}
    class Model{}

    expect(getAge).toBeInstanceOf(Function)
    expect( new Model ()).toBeInstanceOf(Model)
    expect(new Model()).not.toBeInstanceOf(Function)
})

test('Value is null', () =>{
    const getUser = jest.fn().mockReturnValue(null)

    expect(getUser()).toBeNull()
    expect(getUser()).toBe(null)
})


test('Value is truthy', () =>{
    const getValue = () =>{
        return { name: 'Jane', age: 20, houseAddress: '47th and North'}
    }
    expect(getValue()).toBeTruthy()
})

test('Octopus flavoured drink is undefined', () =>{
    const getDrink = () =>{}

    expect(getDrink()).toBeUndefined()
})

test('Flavors contain lime', () =>{
    const getFlavors = jest.fn(id =>(
        ['orange', 'mango', 'lime']
        )) 

    expect(getFlavors('mjdi23i34nd')).toContain('lime')
})

test('Beverages contain sour melon', () =>{
    const beverages = [
        {bev: 'Tea', flavor:'Sweet'},
        { bev: 'melon', flavor: 'sour'}
    ]

    expect(beverages).toContainEqual({bev: 'melon', flavor: 'sour'})
})

test('House for sale exctly matches desired features', () =>{
    const houseForSale = {
        bath: true,
        bedrooms: 4,
        kitchen: {
          amenities: ['oven', 'stove', 'washer'],
          area: 20,
          wallColor: 'white',
        },
      };
      const desiredHouse = {
        bath: true,
        kitchen: {
          amenities: ['oven', 'stove', 'washer'],
          wallColor: expect.stringMatching(/white|yellow/),
        },
      };
    expect(houseForSale).toMatchObject(desiredHouse)
})

test('Array matches array with extra elements', () =>{
    subjectLeaders = [
        {name: 'John', stream: 'ty'},
        { name: 'Ken', stream: 't4'},
    ]
    studentsList = [
        { name: 'John', stream: 'ty'},
        { name: 'Ken', stream: 't4'},
    ]
    expect(subjectLeaders).toMatchObject(studentsList)
})

test('beverage cans are not of the same type', () =>{
    class Can {
        constructor(flavor){
            this.flavor = flavor
        }
    }

    expect(new Can('lemon')).not.toStrictEqual({flavor: 'lemon'})
})

test('Throws error', () =>{
    const getIssues = () =>{
        throw new Error('Issues are not possible')
    }
    expect(getIssues).toThrow(/not possible/)
})

test('function is called with anything truthy', () =>{
    const mockfn = jest.fn(x => x)

    mockfn('English')

    expect(mockfn).toHaveBeenCalledWith(expect.anything())
})

test('Function is called with any String', () =>{
    const mockfn = jest.fn(text => text)

    mockfn('English')

    expect(mockfn).toHaveBeenCalledWith(expect.any(String))
})

test('Function called with array containing first 3 planets', () =>{
    const planets = ['Mercury', 'Venus', 'Earth']
    const mockfn = jest.fn(arr1 =>{
        arr1.map((val, index) =>({planet: val, position: index}))
    })
    mockfn(['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter'])
    expect(mockfn).toHaveBeenCalledWith(
        expect.arrayContaining(['Mercury', 'Venus', 'Earth'])
    )    
})

test('Names list is an array not containing Jane', () =>{
    const names = ['Erlot', 'Elsas']
    expect(names).toStrictEqual(expect.not.arrayContaining(
        ['Jane']
    ))
})

test('Expect value of sum in object to be close to 5.6', () =>{
    const obj1={
        title: 'gross ratio',
        sum: 5.6000004
    }
    

    expect(obj1).toEqual({
        title: 'gross ratio',
        sum: expect.closeTo(5.6)
    })
})

test('function is called with sting containing \'rex\'',() =>{
    const mockfn = jest.fn(comapnyName => comapnyName)

    mockfn('Retrex')
    expect(mockfn).toHaveBeenCalledWith(expect.stringContaining('rex'))
    expect(mockfn).toHaveBeenCalledWith(expect.stringMatching('rex'))
})

test('Assertions called twics', async() =>{
    const mockfn = jest.fn().mockResolvedValue(23)

    await expect(mockfn()).resolves.toEqual(23)
    await expect(mockfn()).resolves.toEqual(23)
    await expect.assertions(2)
    await expect.hasAssertions()
})