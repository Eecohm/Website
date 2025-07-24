import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import UnderConstruction from '../Components/App/UnderConstruction';

const AppRoutes = () => (
    <Routes>
        {/* Public Routes */}
        <Route path='/*' element={<PublicRoutes/>} />

        {/* Protected Routes */}
        <Route path='/dashboard/*' element={<PrivateRoutes />} />

        {/* Catch-all */}
        <Route path="*" element={<UnderConstruction />} />
    </Routes>
)

export default AppRoutes;