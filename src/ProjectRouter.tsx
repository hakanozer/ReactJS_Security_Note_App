import { Provider } from 'react-redux'
import { BrowserRouter, Routes ,Route } from 'react-router-dom'
import { store } from './use_redux/ReductStore'

// import pages
import Login from './Login'
import Note from './Note'
import Security from './Security'


export const projectRouter = 
<Provider store={store}>
    <BrowserRouter>
        <Routes>
            <Route path='' element={<Login />} ></Route>
            <Route path='/notes' element={ <Security component={ <Note /> }/>  } ></Route>
        </Routes>
    </BrowserRouter>
</Provider>