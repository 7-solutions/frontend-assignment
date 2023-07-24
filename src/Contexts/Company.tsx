import { Dispatch, createContext, useReducer } from 'react'
import _ from 'lodash'
import employees from '../employees.json'

type Department = Record<string, string | number | Record<string, string | number>>

type Company = Record<string, 
    Department | string[]
>

type CompanyAction = {
    type: 'populate'
    state: Company
    skip: number
    limit: number
    users: any[]
}

export const CompanyContext = createContext<Company>({})
export const CompanyDispatchContext = createContext<Dispatch<Partial<CompanyAction>> | undefined>(undefined)

function getDepartments(users:any): string[] {
    return Array.from(new Set(_.map(users, user => _.get(user, 'company.department'))))
}

function genderByDepartment(users:any, department: string):Record<string, unknown> {
    const male = _.countBy(users, e => e.gender === 'male' && e.company.department === department)
    const female = _.countBy(users, e => e.gender === 'female' && e.company.department === department)
    return {
        male: male.true,
        female: female.true
    } 
}

function agesByDepartment(users: any, department: string) {
    const usrs = _.filter(users, u => u.company.department === department)
    return _.map(usrs, u => u.age)
}

function ageRangeByDepartment(users: any, department: string) {
    const ages = agesByDepartment(users, department)
    return `${_.min(ages)}-${_.max(ages)}`
}

function ageModeByDepartment(users: any, department: string) {
    const ages = agesByDepartment(users, department)

    return _.max(_.values(_.countBy(ages)))
}

function hairColorByDepartment(users: any, department: string) {
    return _.countBy(Array.from(new Set(_.map(_.filter(users, u => u.company.department === department), user => _.get(user, 'hair.color')))))
}

function addressesByDepartment(users: any, department: string) {
    const addressUsers = _.map(_.filter(users, u => u.company.department === department), u => ({[`${u.firstName}${u.lastName}`]: u.address.postalCode}))
    return _.assign({}, {
        addressUser: _.reduce(addressUsers, (obj:any, param:any) => {
            obj[_.keys(param)[0]] = _.values(param)[0]

            return obj
        }, {})
    })
}

/**
 * 
 * @param users 
 * @param departments 
 * @returns following pattern from requirement
 * 
 * department: [
    {
        "Marketing": {
            "male": 1,                      // ---> Male Summary
            "female": 1,                    // ---> Femlae Summary
            "ageRange": "XX-XX",            // ---> Range
            "ageMode": 1,                   // ---> Mode ฐานนิยม
            "hair": {                       // ---> "Color": Color Summary
                "Black": 1,                
                "Blond": 1,
                "Chestnut": 1,
                "Brown": 1
            },
            "addressUser": {                // ---> "firstNamelastName": postalCode (address)
                "TerryMedhurst": "XXXXX",
            }
        }
    }, 
 * 
 * 
 * 
 */

function handleParse(users:any[], departments: string[]) {
    return {
        department: _.map(departments, d => {
            return _.assign({},  { [`${d}`]: {
                    ...genderByDepartment(users, d),
                    ageRange: ageRangeByDepartment(users, d),
                    ageMode: ageModeByDepartment(users, d),
                    hair: hairColorByDepartment(users, d),
                    ...addressesByDepartment(users, d)
                }
            })
        })
    }
}

function handlePopulate(state: Company, action: CompanyAction) {
    const department = _.assign({}, handleParse(action.users, state.departments as string[])) as any //Fix Department
    state = _.assign(state, department)
    
    return _.assign({}, state)
}


function companyReducer(state: Company, action:CompanyAction): Company {
    switch (action.type) {
      case 'populate': {
        return handlePopulate(state, action)
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }

const initialContext: Company = {
    departments: [
        'Marketing', 
        'Services', 
        'Business Development', 
        'Support', 
        'Accounting', 
        'Product Management', 
        'Human Resources', 
        'Research and Development', 
        'Sales', 
        'Legal', 
        'Engineering', 
        'Training'
    ]
}

export function CompanyProvider({ children }:any) {
    const [company, dispatch ] = useReducer(companyReducer, initialContext)

    return <>
        <CompanyContext.Provider value={company}>
            <CompanyDispatchContext.Provider value={dispatch as Dispatch<Partial<CompanyAction>>}>
                { children }
            </CompanyDispatchContext.Provider>
        </CompanyContext.Provider>
    </>
}