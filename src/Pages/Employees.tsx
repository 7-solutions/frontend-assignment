import Layout from "../Components/Layout"
import Pagination from "../Components/Pagination"
import { CompanyProvider } from "../Contexts/Company"

function Employees() {
    

    return <>
        <CompanyProvider>
            <Layout>
                <Pagination/>
            </Layout>
        </CompanyProvider>
    </>
}

export default Employees