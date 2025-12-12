import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';


const AppRoutes = () => (
    <Routes>
        {/* Protected Routes */}
        <Route path='/dashboard/*' element={<PrivateRoutes />} />
        
        {/* Public Routes */}
        <Route path='/*' element={<PublicRoutes/>} />
       
    </Routes>
)

export default AppRoutes;
// comment