import { useEffect, useRef, useState } from "react"
import useCompany from "../Hooks/useCompany"
import _ from 'lodash'

function Pagination() {
    const [selected, setSelected] = useState<string>("Marketing")
    const {company, dispatch } = useCompany()
    const dRef = useRef<HTMLSelectElement>(null);

    const fetchUsers = async () => {
        let cached = localStorage.getItem('users')
        if (cached) {
            dispatch({
                type: 'populate',
                users: JSON.parse(cached)
            })
        } else {
            let total = Infinity
            let skip = 0
            let limit = 30
            let users:any = []
            while (skip <= total) {
                const url = `https://dummyjson.com/users?skip=${skip}&limit=${limit}`
                const res = await fetch(url)
                const page = await res.json()
                users = _.uniqBy([...users, ...page.users], 'id')

                skip += limit
                total = page.total
            }

            localStorage.setItem('users', JSON.stringify(users))
            dispatch({
                type: 'populate',
                users: users
            })
        }
        
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    function onChange() {
        setSelected(dRef.current?.value as string)
    }


    return <>
    <div className="mt-5 col-start-1 w-full">
        <select name="department" id="department" className="" onChange={onChange} ref={dRef}>            
            {company.departments.map((d:any)=> <option value={d}>{d}</option>)}
        </select>

        <table className="mt-10 border-separate border-spacing-1 border border-slate-500">
            <thead>
                <tr>
                    {company.department ? Object.keys((Object.values(company.department[0])[0]) as any).map((d:string) => {
                        const result = d.replace(/([A-Z])/g, " $1")
                        const final = result.charAt(0).toUpperCase() + result.slice(1);
                        return <th className="border border-slate-500">{final}</th>
                    }): undefined}
                </tr>
            </thead>
            <tbody className="text-center">
                <tr>
                    {company.department ? _.values(_.values(company.department).filter((d) => _.keys(d)[0] === selected)[0][selected]).map((v:any) => <td className="break-all whitespace-pre-wrap w-[5%] border border-slate-500">{_.isObject(v) ? JSON.stringify(v).replace(/\"/gm, '').replace(/[{ }]/gm, "").replace(/,/gm, "\n") : String(v)}</td>): undefined}
                </tr>
            </tbody>
        </table>
    </div>
        <div>{}</div>
    </>
}

export default Pagination