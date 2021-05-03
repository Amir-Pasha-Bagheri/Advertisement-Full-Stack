import {Route , Switch} from 'react-router-dom'
import * as page from './Components'

const Routes = () =>{
    return(
        <div>
            <Switch>
                <Route exact path="/" component={page.homepage}/>
                <Route path="/Add-Product" component={page.addproduct}/>
                <Route path="/Contact-Us" component={page.contactus}/>
                <Route path="/Create-Account" component={page.signin}/>
                <Route path="/Log-In" component={page.login}/>
                <Route path="/Account" component={page.account}/>
                <Route component={page.notfound}/>
            </Switch>
        </div>
    )
}

export default Routes