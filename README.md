# Assignment

## 1. Auto Delete Todo List

```
    [
        {
            type: 'Fruit',
            name: 'Apple',
        },
        {
            type: 'Vegetable',
            name: 'Broccoli',
        },
        {
            type: 'Vegetable',
            name: 'Mushroom',
        },
        {
            type: 'Fruit',
            name: 'Banana',
        },
        {
            type: 'Vegetable',
            name: 'Tomato',
        },
        {
            type: 'Fruit',
            name: 'Orange',
        },
        {
            type: 'Fruit',
            name: 'Mango',
        },
        {
            type: 'Fruit',
            name: 'Pineapple',
        },
        {
            type: 'Vegetable',
            name: 'Cucumber',
        },
        {
            type: 'Fruit',
            name: 'Watermelon',
        },
        {
            type: 'Vegetable',
            name: 'Carrot',
        },
    ]
```

Please make a todo list that
- Take text input
- Show data by type from array based on text input.
- Each text input will have 5 second on the screen then will be auto removed
- If that data already exists, it must be moved back.

See example in the link below
[https://drive.google.com/file/d/11PUfxCc3wRvsBd5DBS-FvTz2AMRLgRMW/view?usp=sharing](https://drive.google.com/file/d/1o1prsZjBSHDsfcrDFsuxH6U261UM0BOI/view?usp=drive_link)

Please do your best to show your best solution
we are looking for
1. Answer the need of question
2. Clean code easy to read

Bonus: if you have multiple solutions we could discuss those theories in our interview (no need to submit multiple versions, just send us the best one you think.)

## 2. Create data from API 

API from <https://dummyjson.com/users>

- Your project must use Typescript, Typescript module, and HTTP framework (GRPC is plus)
- Tranforms JSON data from API to new data groupBy department
- We encourage you to write tests, which we will give you some extra score
- We will give you an extra score if you focus on performance.

--- sample response --

```json

[Department]: 
    {
        "male": 1,                      // ---> Male Summary
        "female": 1,                    // ---> Female Summary
        "ageRange": "XX-XX",            // ---> Range
        "ageMode": 1,                   // ---> Mode ฐานนิยม
        "hair": {                       // ---> "Color": Color Summary
        "Black": 1,                
        "Blond": 1,
        "Chestnut": 1,
        "Brown": 1,
        "addressUser": {                // ---> "firstNamelastName": postalCode (address)
                "TerryMedhurst": "XXXXX",
            }
        },
    }, 
    ...
```
