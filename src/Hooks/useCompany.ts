import { useContext } from "react";
import { CompanyContext, CompanyDispatchContext } from "../Contexts/Company";

function useCompany():any {
    const companyContext = useContext(CompanyContext)
    const dispatch = useContext(CompanyDispatchContext)

    return {company: companyContext, dispatch}
}

export default useCompany