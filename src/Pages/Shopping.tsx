import Layout from "../Components/Layout"
import { ShelfProvider } from "../Contexts/Shelf"
import Sidebar from "../Components/Sidebar"
import Main from "../Components/Main"
import InputBox from "../Components/InputBox"
import Baskets from "../Components/Baskets"

function Shopping() {
    return <>
     <Layout>
          <ShelfProvider>
            <Sidebar/>
            <Main>
              <InputBox/>
              <Baskets />
            </Main>
          </ShelfProvider>
      </Layout>
    </>
}

export default Shopping